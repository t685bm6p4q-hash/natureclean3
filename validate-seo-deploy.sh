#!/usr/bin/env bash
# validate-seo-deploy.sh — Audit SEO post-deploy (HTML brut, sans JS)
#
# Usage :
#   chmod +x validate-seo-deploy.sh
#   ./validate-seo-deploy.sh https://natureclean.fr
#   ./validate-seo-deploy.sh https://natureclean.fr --ssg-only
#   ./validate-seo-deploy.sh https://natureclean.fr --local
#
# Vérifie par URL : HTTP 200, title ≤60, canonical, 1 seul H1, contenu texte suffisant.

set -euo pipefail

BASE_URL="${1:-https://natureclean.fr}"
MODE="${2:---all}"
MAX_TITLE_LEN=60
MIN_TEXT_LEN=800

SSG_ROUTES=(
  "/"
  "/services"
  "/services/entretien-bureaux"
  "/services/nettoyage-commerces"
  "/services/nettoyage-coproprietes"
  "/services/nettoyage-chantiers"
  "/services/nettoyage-evenementiel"
  "/services/remise-etat-sols"
  "/services/nettoyage-graffitis"
  "/services/nettoyage-vitre"
  "/services/nettoyage-diogene"
  "/services/nettoyage-gros-chantiers"
  "/nettoyage-bureaux-marseille"
  "/nettoyage-fin-chantier-marseille"
  "/nettoyage-industriel-marseille"
  "/nettoyage-medical-marseille"
  "/nettoyage-bureaux-aix-en-provence"
  "/nettoyage-coproprietes-aubagne"
  "/nettoyage-coproprietes-la-ciotat"
)

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

pass=0
fail=0
issues=()

url_to_path() {
  local url="$1"
  local path="${url#"$BASE_URL"}"
  if [[ -z "$path" || "$path" == "/" ]]; then
    echo "/"
  else
    echo "${path%/}"
  fi
}

strip_tags() {
  sed 's/<script[^>]*>.*<\/script>//g; s/<style[^>]*>.*<\/style>//g; s/<[^>]*>//g' | tr -s ' \n' ' ' | sed 's/^ *//;s/ *$//'
}

extract_title() {
  grep -oiE '<title[^>]*>[^<]+</title>' | head -1 | sed 's/<[^>]*>//g'
}

extract_canonical() {
  grep -oiE '<link[^>]+rel=["'\''']canonical["'\'''][^>]*>' | head -1 \
    | grep -oiE 'href=["'\'''][^"'\''']+["'\''']' | head -1 \
    | sed 's/href=//; s/["'\''']//g'
}

count_h1() {
  grep -oiE '<h1[^>]*>' | wc -l | tr -d ' '
}

text_length() {
  strip_tags | wc -c | tr -d ' '
}

check_url() {
  local path="$1"
  local full_url="${BASE_URL}${path}"
  [[ "$path" == "/" ]] && full_url="${BASE_URL}/"

  local html_file="$TMP_DIR/page.html"
  local http_code
  http_code=$(curl -sSL -o "$html_file" -w "%{http_code}" "$full_url" --max-time 30)

  local title canonical h1_count text_len
  title=$(extract_title < "$html_file")
  canonical=$(extract_canonical < "$html_file")
  h1_count=$(count_h1 < "$html_file")
  text_len=$(text_length < "$html_file")

  local title_len=${#title}
  local url_ok=true
  local url_issues=()

  if [[ "$http_code" != "200" ]]; then
    url_ok=false
    url_issues+=("HTTP $http_code")
  fi

  if [[ -z "$title" ]]; then
    url_ok=false
    url_issues+=("title absent")
  elif (( title_len > MAX_TITLE_LEN )); then
    url_ok=false
    url_issues+=("title ${title_len} car (> ${MAX_TITLE_LEN})")
  fi

  if [[ -z "$canonical" ]]; then
    url_ok=false
    url_issues+=("canonical absent")
  else
    local expected="${BASE_URL}${path}"
    [[ "$path" == "/" ]] && expected="${BASE_URL}/"
    if [[ "$canonical" != "$expected" && "$canonical" != "${expected%/}" ]]; then
      url_ok=false
      url_issues+=("canonical mismatch: $canonical")
    fi
  fi

  if [[ "$h1_count" -eq 0 ]]; then
    url_ok=false
    url_issues+=("H1 absent")
  elif [[ "$h1_count" -gt 1 ]]; then
    url_ok=false
    url_issues+=("${h1_count} H1 (attendu: 1)")
  fi

  if (( text_len < MIN_TEXT_LEN )); then
    url_ok=false
    url_issues+=("texte ${text_len} car (< ${MIN_TEXT_LEN}) — shell SPA ?")
  fi

  if $url_ok; then
    echo -e "${GREEN}✓${NC} $path"
    echo "    title (${title_len}c): $title"
    echo "    canonical: $canonical | H1: ${h1_count} | texte: ${text_len} car"
    pass=$((pass + 1))
  else
    echo -e "${RED}✗${NC} $path"
    echo "    title (${title_len}c): ${title:-—}"
    echo "    canonical: ${canonical:-—} | H1: ${h1_count} | texte: ${text_len} car"
    for issue in "${url_issues[@]}"; do
      echo -e "    ${RED}→ $issue${NC}"
    done
    issues+=("$path: ${url_issues[*]}")
    fail=$((fail + 1))
  fi
  echo ""
}

echo "════════════════════════════════════════════════════════"
echo "  Nature Clean — Validation SEO post-deploy"
echo "  Base : $BASE_URL | Mode : $MODE"
echo "════════════════════════════════════════════════════════"
echo ""

urls=()

case "$MODE" in
  --ssg-only)
    urls=("${SSG_ROUTES[@]}")
    echo "→ ${#urls[@]} routes SSG"
    ;;
  --local)
    if [[ ! -f "public/sitemap.xml" ]]; then
      echo -e "${RED}Erreur : public/sitemap.xml introuvable${NC}"
      exit 1
    fi
    while IFS= read -r loc; do
      urls+=("$(url_to_path "$loc")")
    done < <(grep -oE '<loc>[^<]+</loc>' public/sitemap.xml | sed 's/<loc>//;s/<\/loc>//')
    echo "→ ${#urls[@]} URLs (sitemap local)"
    ;;
  *)
    sitemap_url="${BASE_URL}/sitemap.xml"
    echo "→ Lecture de $sitemap_url"
    while IFS= read -r loc; do
      urls+=("$(url_to_path "$loc")")
    done < <(curl -fsSL "$sitemap_url" | grep -oE '<loc>[^<]+</loc>' | sed 's/<loc>//;s/<\/loc>//')
    echo "→ ${#urls[@]} URLs (sitemap prod)"
    ;;
esac

echo ""

for path in "${urls[@]}"; do
  check_url "$path"
done

echo "════════════════════════════════════════════════════════"
echo -e "  Résultat : ${GREEN}${pass} OK${NC} | ${RED}${fail} KO${NC}"
echo "════════════════════════════════════════════════════════"

if (( fail > 0 )); then
  echo ""
  echo "URLs à corriger avant réindexation GSC :"
  for item in "${issues[@]}"; do
    echo "  • $item"
  done
  exit 1
fi

echo ""
echo -e "${GREEN}Prêt pour réindexation GSC.${NC}"
exit 0
