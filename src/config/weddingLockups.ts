import type { WeddingTheme } from "@/config/weddingThemeTokens";

export const SUPABASE_MISC_WEDDING_ASSETS =
  "https://fpcnecyggvzhcoigoegf.supabase.co/storage/v1/object/public/misc";

/** Theme lockups (transparent PNG) — hero + nav use the same URLs. */
export const WEDDING_LOCKUP_URLS: Record<WeddingTheme, string> = {
  red: `${SUPABASE_MISC_WEDDING_ASSETS}/lockup-red.png`,
  /** “Yellow” swatch in the UI (`WeddingTheme` is still `orange`). */
  orange: `${SUPABASE_MISC_WEDDING_ASSETS}/lockup-yellow.png`,
  green: `${SUPABASE_MISC_WEDDING_ASSETS}/lockup-orange.png`,
};

export function weddingThemeFromDataAttr(value: string | null): WeddingTheme {
  if (value === "orange" || value === "green") return value;
  return "red";
}
