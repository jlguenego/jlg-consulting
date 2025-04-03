type Locale = "fr" | "en";

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname.includes("/en/")) return "en";
  if (pathname.includes("/fr/")) return "fr";
  return "fr"; // fallback par défaut
}

export function getLocaleFromCache(): Locale {
  const locale = localStorage.getItem("locale") as Locale;
  if (locale === "en" || locale === "fr") return locale;
  localStorage.setItem("locale", "fr");
  return "fr"; // fallback par défaut
}
