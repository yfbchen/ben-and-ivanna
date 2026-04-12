import { WEDDING_PALETTE, type WeddingTheme } from "@/config/weddingThemeTokens";

/** Inline fill colors — Tailwind cannot JIT `bg-[${var}]`; palette stays the source of truth. */
const WEDDING_THEME_SWATCHES: Array<{
  key: WeddingTheme;
  label: string;
  swatchColor: string;
}> = [
  { key: "red", label: "Red", swatchColor: WEDDING_PALETTE.wineRed },
  { key: "green", label: "Green", swatchColor: WEDDING_PALETTE.green },
  { key: "orange", label: "Orange", swatchColor: WEDDING_PALETTE.orange },
];

type WeddingThemeSwatchesProps = {
  selectedTheme: WeddingTheme;
  onThemeChange: (theme: WeddingTheme) => void;
};

/**
 * Fixed row under the nav — same position as the hero so theme stays consistent
 * across the home page and `/gallery`.
 */
export function WeddingThemeSwatches({
  selectedTheme,
  onThemeChange,
}: WeddingThemeSwatchesProps) {
  return (
    <div className="fixed inset-x-0 top-20 md:top-24 z-40 pointer-events-none">
      <div className="container relative mx-auto flex w-full max-w-full justify-start px-4 md:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-2.5 pointer-events-auto">
          {WEDDING_THEME_SWATCHES.map(({ key, label, swatchColor }) => {
            const isActive = selectedTheme === key;
            return (
              <button
                key={key}
                type="button"
                aria-label={`Set site theme to ${label}`}
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
  );
}
