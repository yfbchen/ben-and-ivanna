import type { WeddingTheme } from "@/config/weddingThemeTokens";

const SUPABASE_MISC =
  "https://fpcnecyggvzhcoigoegf.supabase.co/storage/v1/object/public/misc";

const HERO_THEME_SWATCHES: Array<{ key: WeddingTheme; label: string; swatchClass: string }> = [
  { key: "red", label: "Red", swatchClass: "bg-[#6b1111]" },
  { key: "orange", label: "Orange", swatchClass: "bg-[#c3a14d]" },
  { key: "green", label: "Green", swatchClass: "bg-[#355b31]" },
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

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6 md:px-10 lg:px-14">
          <img
            src="https://fpcnecyggvzhcoigoegf.supabase.co/storage/v1/object/public/misc/Lockup.png"
            alt="Ivanna and Ben"
            className="w-[78%] max-w-[700px] md:w-[60%] lg:w-[52%] h-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
          />
        </div>

        <div className="absolute left-6 right-6 bottom-6 md:bottom-10 mx-auto max-w-[460px] rounded-full border border-gold/55 bg-ivory/92 px-6 py-3 text-center shadow-elegant">
          <p className="font-wedding-content text-xs md:text-sm tracking-brand text-wedding-heading">
            Saturday, 21 December 2024 · San Francisco, CA
          </p>
        </div>
      </div>

      <div className="fixed left-4 md:left-6 top-20 md:top-24 z-40 flex flex-col items-center gap-2.5">
        {HERO_THEME_SWATCHES.map(({ key, label, swatchClass }) => {
          const isActive = selectedTheme === key;
          return (
            <button
              key={key}
              type="button"
              aria-label={`Set hero theme to ${label}`}
              aria-pressed={isActive}
              onClick={() => onThemeChange(key)}
              className={`h-7 w-7 md:h-8 md:w-8 rounded-sm border border-white/60 ${swatchClass} transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                isActive
                  ? "scale-105 outline outline-2 outline-white outline-offset-2"
                  : "scale-100"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
