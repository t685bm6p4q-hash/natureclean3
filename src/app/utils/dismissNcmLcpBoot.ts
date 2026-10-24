/** Retire l’image hero bootstrap (#ncm-lcp-hero) une fois le héros React peint. */
export function dismissNcmLcpBoot(): void {
  document.getElementById('ncm-lcp-hero')?.remove();
}
