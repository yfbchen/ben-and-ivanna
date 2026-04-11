import { Outlet } from "react-router-dom";
import { MainNav, type NavItemConfig } from "@/components/MainNav";

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
  "h-8 min-h-0 px-4 rounded-full bg-theme-button text-theme-button-text wedding-cta-hover-bright shadow-soft font-wedding-button-rsvp text-[14px] leading-none tracking-brand hover:bg-theme-button hover:text-theme-button-text active:bg-theme-button active:text-theme-button-text active:brightness-100 focus-visible:ring-0 focus-visible:ring-offset-0 lg:h-9 lg:px-6 lg:text-[17px]";

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
