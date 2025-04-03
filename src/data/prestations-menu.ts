import type { MenuItem } from "../types/menu";
import { getLocaleFromPathname } from "../utils/i18n";

export const prestationsMenuItems: MenuItem[] = [
  { label: "Conseil stratégique", href: "prestations/conseil-strategique" },
  {
    label: "Développement logiciel",
    href: "prestations/developpement-logiciel",
  },
  { label: "Formation", href: "prestations/formation" },
  { label: "Accessibilité numérique", href: "prestations/accessibilite" },
  {
    label: "Architecture technique",
    href: "prestations/architecture-technique",
  },
  {
    label: "Design UX/UI",
    href: "prestations/design-ux-ui",
  },
];

export function getLabelFromHref(href: string): string | undefined {
  const path = href.replace(/\/$/, "");
  const locale = getLocaleFromPathname(path);
  const item = prestationsMenuItems.find(
    (item) => import.meta.env.BASE_URL + locale + "/" + item.href === path,
  );
  return item?.label;
}
