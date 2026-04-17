import type { NavItem } from "@/types/navigation";

export const siteConfig = {
  name: "Portfolio Projet Master",
  description:
    "A fullstack application to manage technical projects privately and showcase selected work publicly.",
  tagline: "Private project management meets a public technical portfolio.",
  navigation: [
    { label: "Portfolio", href: "/" },
    { label: "Projects", href: "/" },
    { label: "Contact", href: "/" },
  ] satisfies NavItem[],
};

export type SiteConfig = typeof siteConfig;
