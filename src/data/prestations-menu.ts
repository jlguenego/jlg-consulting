import type { MenuItem } from "../types/menu";
import { getLocaleFromPathname } from "../utils/i18n";

export const prestationsMenuItems: MenuItem[] = [
  { label: "Conseil stratégique", href: "conseil-strategique" },
  {
    label: "Design UX/UI",
    href: "design-ux-ui",
  },
  {
    label: "Développement logiciel",
    href: "developpement-logiciel",
  },
  {
    label: "Architecture technique",
    href: "architecture-technique",
  },
  { label: "Accessibilité numérique", href: "accessibilite" },
  { label: "Formation", href: "formation" },
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
