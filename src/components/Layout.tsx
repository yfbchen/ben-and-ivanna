import { Outlet, useLocation } from "react-router-dom";
import { MainNav, type NavItemConfig } from "@/components/MainNav";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const navItems: NavItemConfig[] = [
  { label: "Our Wedding", to: "/#our-wedding" },
  { label: "Our Story", to: "/#our-story" },
  { label: "His Proposal", to: "/#his-proposal" },
  { label: "Gallery", to: "/#gallery" },
  { label: "Registry", to: "/#gift" },
  { label: "FAQ", to: "/#faq" },
];

/**
 * Mobile: compact RSVP pill (default `Button` size was fighting `h-9` via `h-10`).
 * `size="sm"` on `MainNav` + these classes keep the bar balanced on small screens.
 */
const rightCtaClassName =
  `h-8 min-h-8 max-h-8 rounded-full px-3 bg-theme-button text-theme-button-text wedding-cta-hover-bright shadow-soft font-wedding-nav-link font-semibold text-[14px] leading-none tracking-brand sm:h-9 sm:min-h-9 sm:max-h-none sm:px-4 sm:text-[17px] hover:bg-theme-button hover:text-theme-button-text active:bg-theme-button active:text-theme-button-text active:brightness-100 focus-visible:ring-0 focus-visible:ring-offset-0 lg:h-10 lg:min-h-10 lg:px-6 lg:text-[18px]`;

const Layout = () => {
  const location = useLocation();

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
      <div key={location.pathname} className="route-page-fade">
        <Outlet />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
