import type { MenuItem } from "../types/menu";

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
  console.log("href: ", href);

  const item = prestationsMenuItems.find(
    (item) => import.meta.env.BASE_URL + item.href === href
  );
  return item?.label;
}
