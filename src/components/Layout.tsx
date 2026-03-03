import { Outlet } from "react-router-dom";
import { MainNav, type NavItemConfig } from "@/components/MainNav";

const navItems: NavItemConfig[] = [
  { label: "Our Wedding", to: "/#our-wedding" },
  { label: "Our Story", to: "/#our-story" },
  { label: "His Proposal", to: "/#his-proposal" },
  {
    label: "Gallery",
    to: "/#gallery",
    children: [{ label: "All Photos", to: "/gallery" }],
  },
  { label: "Registry", to: "/#gift" },
];

const rightCtaClassName =
  "h-9 px-6 rounded-full bg-gold-light text-wine border border-gold/80 hover:bg-gold-light/90 shadow-soft font-navLink text-[16px] lg:text-[17px] font-medium leading-none tracking-[0.08em]";

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
