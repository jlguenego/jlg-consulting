import type { MenuItem } from "../types/menu";
import { getLocaleFromPathname } from "../utils/i18n";

export const prestationsMenuItems: MenuItem[] = [
  { label: "Conseil stratégique", href: "conseil-strategique" },
  {
    label: "Développement logiciel",
    href: "developpement-logiciel",
  },
  { label: "Formation", href: "formation" },
  { label: "Accessibilité numérique", href: "accessibilite" },
  {
    label: "Architecture technique",
    href: "architecture-technique",
  },
  {
    label: "Design UX/UI",
    href: "design-ux-ui",
  },
];

export function getLabelFromHref(href: string): string | undefined {
  const path = href.replace(/\/$/, "");
  const locale = getLocaleFromPathname(path);
  const item = prestationsMenuItems.find(
    (item) =>
      import.meta.env.BASE_URL + locale + "/services/" + item.href === path,
  );
  return item?.label;
}
