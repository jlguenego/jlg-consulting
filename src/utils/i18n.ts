export function getLocaleFromPathname(pathname: string): string {
  if (pathname.includes("/en/")) return "en";
  if (pathname.includes("/fr/")) return "fr";
  return "fr"; // fallback par défaut
}
