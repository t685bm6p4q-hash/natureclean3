/** Retire l’image hero bootstrap (#ncm-lcp-hero) une fois le héros React chargé. */
export function dismissNcmLcpBoot(): void {
  document.getElementById('ncm-lcp-hero')?.remove();
  document.getElementById('ncm-lcp-preload')?.remove();
}
