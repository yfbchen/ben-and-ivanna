import { Link } from "react-router-dom";
import { weddingNavLinkButtonTypographyClassName } from "@/config/weddingSectionLayout";
import type { WeddingTheme } from "@/config/weddingThemeTokens";
import { SUPABASE_MISC_WEDDING_ASSETS, WEDDING_HERO_LOCKUP_URLS } from "@/config/weddingLockups";
import { WeddingThemeSwatches } from "@/components/wedding/WeddingThemeSwatches";

const SUPABASE_MISC = SUPABASE_MISC_WEDDING_ASSETS;

const redHero = `${SUPABASE_MISC}/red-hero.jpeg`;
const orangeHero = `${SUPABASE_MISC}/orange-hero.jpeg`;
const greenHero = `${SUPABASE_MISC}/green-hero.jpeg`;

/** All wedding hero backgrounds — preload these so theme swaps don’t wait on the network. */
export const WEDDING_HERO_IMAGE_URLS = [redHero, orangeHero, greenHero] as const;

const HERO_THEME_IMAGES: Record<WeddingTheme, string> = {
  red: redHero,
  orange: orangeHero,
  green: greenHero,
};

interface HeroSectionProps {
  selectedTheme: WeddingTheme;
  onThemeChange: (theme: WeddingTheme) => void;
}

export function HeroSection({ selectedTheme, onThemeChange }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 md:scroll-mt-24"
    >
      {/*
        Keep `overflow-hidden` on the media wrapper only — not on this section.
        `position: fixed` swatches below are section children; an `overflow-hidden`
        ancestor + `relative` can make Safari vs Chrome resolve fixed/viewport width
        differently and misalign the swatch row vs the nav.
      */}
      <div className="relative w-full overflow-hidden">
        <img
          src={HERO_THEME_IMAGES[selectedTheme]}
          alt="Ivanna and Ben on a tennis court"
          fetchPriority="high"
          decoding="async"
          className="block w-full h-auto"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 md:gap-6 pointer-events-none px-6 md:px-10 lg:px-14">
          <img
            src={WEDDING_HERO_LOCKUP_URLS[selectedTheme]}
            alt=""
            aria-hidden
            className="h-auto w-[78%] max-w-[700px] shrink-0 object-contain opacity-0 md:w-[60%] md:opacity-100 lg:w-[52%]"
          />
          <Link
            to="/#rsvp"
            className={`pointer-events-auto hidden md:inline-flex items-center justify-center rounded-full bg-theme-button px-10 py-2.5 ${weddingNavLinkButtonTypographyClassName} text-theme-button-text shadow-soft transition-opacity wedding-cta-hover-bright focus-visible:outline-none focus-visible:ring-0 md:px-12 md:py-3`}
          >
            RSVP
          </Link>
        </div>

      </div>

      <WeddingThemeSwatches selectedTheme={selectedTheme} onThemeChange={onThemeChange} />
    </section>
  );
}
