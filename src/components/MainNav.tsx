import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WEDDING_NAV_LOCKUP_URLS } from "@/config/weddingLockups";
import { useWeddingThemeFromDocument } from "@/hooks/useWeddingThemeFromDocument";
import { scrollToSectionWithRetry } from "@/hooks/useScrollToSection";

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
  const navigate = useNavigate();
  const location = useLocation();
  const weddingTheme = useWeddingThemeFromDocument();

  /** Hash links: avoid native jump + React Router hash desync; re-scroll when hash unchanged. */
  const handleNavHashLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: string | undefined,
  ): boolean => {
    if (!to?.includes("#")) return false;
    const sectionId = to.split("#")[1];
    if (!sectionId) return false;

    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: sectionId });
      scrollToSectionWithRetry(sectionId, { maxAttempts: 120, intervalMs: 40 });
      return true;
    }

    if (location.hash !== `#${sectionId}`) {
      navigate({ pathname: "/", hash: sectionId });
    }
    scrollToSectionWithRetry(sectionId);
    return true;
  };
  const lockupSrc = WEDDING_NAV_LOCKUP_URLS[weddingTheme];

  const brandLogo = (
    <img
      src={lockupSrc}
      alt=""
      className="h-5 sm:h-6 w-auto max-w-[min(8rem,34vw)] object-contain object-center lg:object-left"
      decoding="async"
    />
  );

  const brandControlClass =
    "shrink-0 hover:opacity-90 transition-opacity flex items-center justify-center lg:justify-start";

  const Brand = () =>
    brandOnClick ? (
      <button
        type="button"
        onClick={brandOnClick}
        className={brandControlClass}
        aria-label="Ivanna & Ben — go to top navigation"
      >
        {brandLogo}
      </button>
    ) : (
      <Link
        to={brandTo}
        className={brandControlClass}
        aria-label="Ivanna & Ben — go to top navigation"
      >
        {brandLogo}
      </Link>
    );

  const renderNavItem = (item: NavItemConfig, isMobile = false) => {
    const commonClasses =
      "font-wedding-nav-link font-semibold text-[17px] lg:text-[18px] leading-none tracking-brand text-theme-navbar hover:opacity-90 transition-opacity";

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
            onClick={(e) => {
              if (handleNavHashLinkClick(e, item.to)) return;
              handleClick();
            }}
            className={`${commonClasses} block w-full py-3 text-center`}
          >
            {item.label}
          </Link>,
        );
      } else {
        elements.push(
          <button
            key={item.label}
            onClick={handleClick}
            className={`${commonClasses} w-full py-3 text-center`}
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
              onClick={(e) => {
                if (handleNavHashLinkClick(e, child.to)) return;
                setIsMenuOpen(false);
              }}
              className="block w-full py-2 text-center font-wedding-nav-link font-semibold text-[14px] leading-none tracking-brand text-theme-navbar/90 hover:opacity-90 transition-opacity"
            >
              {child.label}
            </Link>,
          );
        });
      }

      return (
        <div
          key={item.label}
          className="flex w-full flex-col items-center"
        >
          {elements}
        </div>
      );
    }

    // Desktop: with or without dropdown
    if (item.children?.length) {
      const hasClick = !!item.onClick || !!item.to;

      return (
        <div key={item.label} className="relative group">
          {hasClick ? (
            item.to ? (
              <Link
                to={item.to}
                onClick={(e) => {
                  if (handleNavHashLinkClick(e, item.to)) return;
                  handleClick();
                }}
                className={commonClasses}
              >
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
                  onClick={(e) => {
                    if (handleNavHashLinkClick(e, child.to)) return;
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-2 font-wedding-nav-link font-semibold text-[14px] leading-none tracking-brand text-theme-navbar hover:opacity-95 hover:bg-white/10"
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
          onClick={(e) => {
            if (handleNavHashLinkClick(e, item.to)) return;
            handleClick();
          }}
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

  const renderRightCtaButton = () => {
    if (!rightCta) return null;
    return (
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
            onClick={(e) => {
              if (handleNavHashLinkClick(e, rightCta.to)) return;
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
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 wedding-nav-bar text-theme-navbar">
      {/*
        Wordmark must center in the full-width bar. Putting it inside `.container` only
        centers within that narrower box (often looks left vs the hero). This full-bleed
        strip is < lg; `lg:block` brand in the row handles desktop.
      */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-16 items-center justify-center lg:hidden">
        <div className="pointer-events-auto">
          <Brand />
        </div>
      </div>

      <div className="container relative mx-auto flex h-16 w-full max-w-full items-center justify-between gap-6 px-4 md:px-8 lg:justify-start lg:px-12">
        {rightCta && (
          <div className="relative z-20 shrink-0 lg:hidden">{renderRightCtaButton()}</div>
        )}

        <div className="hidden shrink-0 lg:block">
          <Brand />
        </div>

        {/* Desktop Menu */}
        {navItems.length > 0 && (
          <div className="hidden flex-1 items-center justify-end gap-10 pr-6 lg:flex">
            {navItems.map((item) => renderNavItem(item))}
          </div>
        )}

        {rightCta && (
          <div className="hidden shrink-0 lg:flex">{renderRightCtaButton()}</div>
        )}

        {navItems.length > 0 && (
          <button
            type="button"
            className="relative z-20 flex h-10 min-h-10 min-w-10 shrink-0 items-center justify-end p-0 text-theme-navbar lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6 shrink-0" /> : <Menu className="h-6 w-6 shrink-0" />}
          </button>
        )}
      </div>

      {/* Mobile Menu — nav links only; RSVP stays in the top bar */}
      {isMenuOpen && navItems.length > 0 && (
        <div className="border-t border-white/20 bg-theme-main animate-fade-in lg:hidden">
          <div className="container mx-auto flex w-full max-w-full flex-col items-center gap-2 px-4 py-4 md:px-8 lg:px-12">
            {navItems.map((item) => renderNavItem(item, true))}
          </div>
        </div>
      )}
    </nav>
  );
};

export type { NavItemConfig, NavChildConfig };
export { MainNav };

