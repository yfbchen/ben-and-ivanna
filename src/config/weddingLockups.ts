import type { WeddingTheme } from "@/config/weddingThemeTokens";

export const SUPABASE_MISC_WEDDING_ASSETS =
  "https://fpcnecyggvzhcoigoegf.supabase.co/storage/v1/object/public/misc";

const lockup = (name: string) =>
  `${SUPABASE_MISC_WEDDING_ASSETS}/lockup-${name}.png`;

const miscAsset = (filename: string) =>
  `${SUPABASE_MISC_WEDDING_ASSETS}/${filename}`;

/**
 * Decorative icons in “Our Wedding” (left → right: date, venue, schedule).
 * Edit per theme when you add `calendar_red.png` / `pasta_green.png`, etc.
 */
export type WeddingOurWeddingIcons = readonly [string, string, string];

export const WEDDING_OUR_WEDDING_ICONS: Record<WeddingTheme, WeddingOurWeddingIcons> = {
  red: [
    miscAsset("calendar_orange.png"),
    miscAsset("pasta_orange.png"),
    miscAsset("rings_orange.png"),
  ],
  orange: [
    miscAsset("calendar_orange.png"),
    miscAsset("pasta_orange.png"),
    miscAsset("rings_orange.png"),
  ],
  green: [
    miscAsset("calendar_orange.png"),
    miscAsset("pasta_orange.png"),
    miscAsset("rings_orange.png"),
  ],
};

/** Hero wordmark — orange uses orange asset; green uses yellow. */
export const WEDDING_HERO_LOCKUP_URLS: Record<WeddingTheme, string> = {
  red: lockup("red"),
  orange: lockup("orange"),
  green: lockup("yellow"),
};

/** Navbar wordmark — orange uses red asset; green uses yellow (same as hero). */
export const WEDDING_NAV_LOCKUP_URLS: Record<WeddingTheme, string> = {
  red: lockup("red"),
  orange: lockup("red"),
  green: lockup("yellow"),
};

export function weddingThemeFromDataAttr(value: string | null): WeddingTheme {
  if (value === "orange" || value === "green") return value;
  return "red";
}
