import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavChildConfig = {
  label: string;
  to: string;
};

type NavItemConfig = {
  label: string;
  onClick?: () => void;
  to?: string;
  children?: NavChildConfig[];
};

type MainNavProps = {
  brandTo?: string;
  brandOnClick?: () => void;
  navItems?: NavItemConfig[];
  rightCta?: NavItemConfig & { className?: string };
};

const MainNav = ({
  brandTo = "/",
  brandOnClick,
  navItems = [],
  rightCta,
}: MainNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Brand = () =>
    brandOnClick ? (
      <button
        onClick={brandOnClick}
        className="shrink-0 font-wedding-nav-brand font-[610] text-xl sm:text-2xl leading-none tracking-brand uppercase text-theme-navbar hover:opacity-90 transition-opacity"
        aria-label="Go to top navigation"
      >
        IVANNA &amp; BEN
      </button>
    ) : (
      <Link
        to={brandTo}
        className="shrink-0 font-wedding-nav-brand font-[610] text-xl sm:text-2xl leading-none tracking-brand uppercase text-theme-navbar hover:opacity-90 transition-opacity"
        aria-label="Go to top navigation"
      >
        IVANNA &amp; BEN
      </Link>
    );

  const renderNavItem = (item: NavItemConfig, isMobile = false) => {
    const commonClasses =
      "font-wedding-nav-link font-medium text-[16px] lg:text-[17px] leading-none tracking-brand text-theme-navbar hover:opacity-90 transition-opacity";

    const handleClick = () => {
      if (item.onClick) {
        item.onClick();
      }
      setIsMenuOpen(false);
    };

    // Mobile: flatten children under parent
    if (isMobile) {
      const elements = [];

      if (item.to) {
        elements.push(
          <Link
            key={item.label}
            to={item.to}
            onClick={handleClick}
            className={`${commonClasses} py-3 text-left`}
          >
            {item.label}
          </Link>,
        );
      } else {
        elements.push(
          <button
            key={item.label}
            onClick={handleClick}
            className={`${commonClasses} py-3 text-left w-full`}
          >
            {item.label}
          </button>,
        );
      }

      if (item.children?.length) {
        item.children.forEach((child) => {
          elements.push(
            <Link
              key={`${item.label}-${child.label}`}
              to={child.to}
              onClick={() => setIsMenuOpen(false)}
              className="pl-4 font-wedding-nav-link text-[14px] leading-none tracking-brand text-theme-navbar hover:opacity-90 transition-opacity py-2 text-left"
            >
              {child.label}
            </Link>,
          );
        });
      }

      return <div key={item.label}>{elements}</div>;
    }

    // Desktop: with or without dropdown
    if (item.children?.length) {
      const hasClick = !!item.onClick || !!item.to;

      return (
        <div key={item.label} className="relative group">
          {hasClick ? (
            item.to ? (
              <Link to={item.to} onClick={handleClick} className={commonClasses}>
                {item.label}
              </Link>
            ) : (
              <button onClick={handleClick} className={commonClasses}>
                {item.label}
              </button>
            )
          ) : (
            <span className={commonClasses}>{item.label}</span>
          )}
          <div className="absolute left-0 mt-2 min-w-[10rem] translate-y-1 rounded-sm border border-white/20 bg-theme-main opacity-0 invisible shadow-soft transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">
            <div className="py-2">
              {item.children.map((child) => (
                <Link
                  key={child.label}
                  to={child.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 font-wedding-nav-link text-[14px] leading-none tracking-brand text-theme-navbar hover:opacity-95 hover:bg-white/10"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (item.to) {
      return (
        <Link
          key={item.label}
          to={item.to}
          onClick={handleClick}
          className={commonClasses}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <button
        key={item.label}
        onClick={handleClick}
        className={commonClasses}
      >
        {item.label}
      </button>
    );
  };

  const renderRightCta = (placement: "desktop" | "mobile") => {
    if (!rightCta) return null;

    const baseButton = (
      <Button
        type="button"
        className={rightCta.className}
        asChild={!!rightCta.to}
        onClick={
          rightCta.to
            ? undefined
            : () => {
                rightCta.onClick?.();
                setIsMenuOpen(false);
              }
        }
      >
        {rightCta.to ? (
          <Link
            to={rightCta.to}
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            {rightCta.label}
          </Link>
        ) : (
          <span>{rightCta.label}</span>
        )}
      </Button>
    );

    if (placement === "desktop") {
      return <div className="hidden md:flex shrink-0">{baseButton}</div>;
    }

    return (
      <div className="pt-2 pb-1 md:hidden">
        {baseButton}
      </div>
    );
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 wedding-nav-bar backdrop-blur-md text-theme-navbar">
      <div className="container mx-auto px-6 h-16 flex items-center gap-6">
        <Brand />

        {/* Desktop Menu */}
        {navItems.length > 0 && (
          <div className="hidden md:flex flex-1 items-center justify-end gap-10 pr-6">
            {navItems.map((item) => renderNavItem(item))}
          </div>
        )}

        {/* Desktop Right CTA */}
        {renderRightCta("desktop")}

        {/* Mobile Menu Button */}
        {navItems.length > 0 && (
          <button
            className="md:hidden ml-auto p-2 text-theme-navbar"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && navItems.length > 0 && (
        <div className="md:hidden border-t border-white/20 bg-theme-main animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {navItems.map((item) => renderNavItem(item, true))}
            {renderRightCta("mobile")}
          </div>
        </div>
      )}
    </nav>
  );
};

export type { NavItemConfig, NavChildConfig };
export { MainNav };

