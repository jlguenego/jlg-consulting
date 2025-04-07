import en from "../locales/en";
import fr from "../locales/fr";
import { getLocaleFromPathname } from "../utils/i18n";

export function getLabelFromHref(href: string): string | undefined {
  const path = href.replace(/\/$/, "");
  const locale = getLocaleFromPathname(path);
  const localeFile = locale === "fr" ? fr : en;
  const prestationsMenuItems = localeFile.sidebar;
  const item = prestationsMenuItems.find(
    (item) =>
      import.meta.env.BASE_URL + locale + "/services/" + item.href === path,
  );
  return item?.label;
}
