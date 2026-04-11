import { Link } from "react-router-dom";
import { WEDDING_PALETTE, type WeddingTheme } from "@/config/weddingThemeTokens";
import { SUPABASE_MISC_WEDDING_ASSETS, WEDDING_HERO_LOCKUP_URLS } from "@/config/weddingLockups";

const SUPABASE_MISC = SUPABASE_MISC_WEDDING_ASSETS;

/** Inline fill colors — Tailwind cannot JIT `bg-[${var}]`; palette stays the source of truth. */
const HERO_THEME_SWATCHES: Array<{
  key: WeddingTheme;
  label: string;
  swatchColor: string;
}> = [
  { key: "red", label: "Red", swatchColor: WEDDING_PALETTE.wineRed },
  { key: "green", label: "Green", swatchColor: WEDDING_PALETTE.green },
  { key: "orange", label: "Orange", swatchColor: WEDDING_PALETTE.orange },
];

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
      className="relative overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      <div className="relative w-full">
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
            className="pointer-events-auto hidden md:inline-flex items-center justify-center rounded-full bg-theme-button px-10 py-2.5 text-[17px] font-wedding-button-rsvp leading-none tracking-brand text-theme-button-text shadow-soft transition-opacity wedding-cta-hover-bright focus-visible:outline-none focus-visible:ring-0 md:px-12 md:py-3 md:text-[18px]"
          >
            RSVP
          </Link>
        </div>

      </div>

      <div className="fixed inset-x-0 top-20 md:top-24 z-40 pointer-events-none">
        <div className="container mx-auto px-3 flex justify-start">
          <div className="flex flex-col items-center gap-2.5 pointer-events-auto">
            {HERO_THEME_SWATCHES.map(({ key, label, swatchColor }) => {
              const isActive = selectedTheme === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-label={`Set hero theme to ${label}`}
                  aria-pressed={isActive}
                  onClick={() => onThemeChange(key)}
                  style={{ backgroundColor: swatchColor }}
                  className={`h-7 w-7 md:h-8 md:w-8 rounded-sm border border-white/60 transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                    isActive
                      ? "scale-105 outline outline-2 outline-white outline-offset-2"
                      : "scale-100"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
