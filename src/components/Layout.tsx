import { Outlet } from "react-router-dom";
import { MainNav, type NavItemConfig } from "@/components/MainNav";
import { weddingNavLinkButtonTypographyClassName } from "@/config/weddingSectionLayout";

const navItems: NavItemConfig[] = [
  { label: "Our Wedding", to: "/#our-wedding" },
  { label: "Our Story", to: "/#our-story" },
  { label: "His Proposal", to: "/#his-proposal" },
  { label: "Gallery", to: "/#gallery" },
  { label: "Registry", to: "/#gift" },
  { label: "FAQ", to: "/#faq" },
];

/** Overrides default Button variant `hover:bg-primary/90` so theme orange stays on hover/tap. */
const rightCtaClassName =
  `h-9 min-h-9 px-4 rounded-full bg-theme-button text-theme-button-text wedding-cta-hover-bright shadow-soft ${weddingNavLinkButtonTypographyClassName} hover:bg-theme-button hover:text-theme-button-text active:bg-theme-button active:text-theme-button-text active:brightness-100 focus-visible:ring-0 focus-visible:ring-offset-0 lg:h-10 lg:px-6`;

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainNav
        brandTo="/"
        navItems={navItems}
        rightCta={{
          label: "RSVP",
          to: "/#rsvp",
          className: rightCtaClassName,
        }}
      />
      <Outlet />
    </div>
  );
};

export default Layout;
