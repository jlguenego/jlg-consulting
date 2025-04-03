type Locale = "fr" | "en";

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname.includes("/en/")) return "en";
  if (pathname.includes("/fr/")) return "fr";
  return "fr"; // fallback par défaut
}
