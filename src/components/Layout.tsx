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

const rightCtaClassName =
  "h-9 px-6 rounded-full bg-theme-button text-theme-button-text border border-theme-button-text/20 hover:brightness-110 shadow-soft font-wedding-button-rsvp text-[16px] lg:text-[17px] leading-none tracking-brand";

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
