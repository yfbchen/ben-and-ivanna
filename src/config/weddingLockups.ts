import type { WeddingTheme } from "@/config/weddingThemeTokens";

export const SUPABASE_MISC_WEDDING_ASSETS =
  "https://fpcnecyggvzhcoigoegf.supabase.co/storage/v1/object/public/misc";

const lockup = (name: string) =>
  `${SUPABASE_MISC_WEDDING_ASSETS}/lockup-${name}.png`;

const miscAsset = (filename: string) =>
  `${SUPABASE_MISC_WEDDING_ASSETS}/${filename}`;

/**
 * Decorative icons in “Our Wedding” (left → right: date, venue, schedule).
 * Supabase `misc`: `calendar_{red|orange|green}.png`, same for `pasta_*` and `rings_*`.
 */
export type WeddingOurWeddingIcons = readonly [string, string, string];

const ourWeddingIcons = (color: "red" | "orange" | "green"): WeddingOurWeddingIcons => [
  miscAsset(`calendar_${color}.png`),
  miscAsset(`pasta_${color}.png`),
  miscAsset(`rings_${color}.png`),
];

export const WEDDING_OUR_WEDDING_ICONS: Record<WeddingTheme, WeddingOurWeddingIcons> = {
  red: ourWeddingIcons("red"),
  orange: ourWeddingIcons("orange"),
  green: ourWeddingIcons("green"),
};

/** Hero wordmark — orange uses orange asset; green uses yellow. */
export const WEDDING_HERO_LOCKUP_URLS: Record<WeddingTheme, string> = {
  red: lockup("red"),
  orange: lockup("orange"),
  green: lockup("yellow"),
};

/** Navbar wordmark — orange uses wine asset; green uses yellow (same as hero). */
export const WEDDING_NAV_LOCKUP_URLS: Record<WeddingTheme, string> = {
  red: lockup("red"),
  orange: lockup("wine"),
  green: lockup("yellow"),
};

/** His Proposal section still image — `proposal_frame_{red|orange|green}.png` on `misc`. */
export const WEDDING_PROPOSAL_FRAME_URLS: Record<WeddingTheme, string> = {
  red: miscAsset("proposal_frame_red.png"),
  orange: miscAsset("proposal_frame_orange.png"),
  green: miscAsset("proposal_frame_green.png"),
};

export function weddingThemeFromDataAttr(value: string | null): WeddingTheme {
  if (value === "orange" || value === "green") return value;
  return "red";
}
