/**
 * Per-theme UI tokens for the wedding site. Each theme has its own object so
 * you can diverge colors later; values are identical for now.
 */
export type WeddingTheme = "red" | "orange" | "green";

export type WeddingThemeTokens = {
  /** Navbar background and RSVP / “last band” section background */
  mainBackground: string;
  navbarTextColor: string;
  buttonColor: string;
  headingColor: string;
  contentColor: string;
  buttonTextColor: string;
  /** “RSVP” heading on the dark RSVP band (bright accent) */
  rsvpHeadingColor: string;
  /** Invite / deadline paragraph on the RSVP band (light, reads on wine) */
  rsvpBodyColor: string;
  /** RSVP form Search button fill (bright red) */
  rsvpButtonBackground: string;
  /** RSVP form Search button label */
  rsvpButtonText: string;
};

/** Official hex palette (see `index.css` `--wedding-palette-*`). */
export const WEDDING_PALETTE = {
  green: "#445026",
  yellow: "#cebf3a",
  wineRed: "#3a0e0e",
  brightRed: "#d10c02",
  orange: "#e26933",
  whiteBackground: "#dddad3",
} as const;

/** RSVP band: body copy on dark wine (light, not the cream page background). */
const RSVP_BODY_LIGHT = "#e8e4dd";

/** Red theme — official palette mapping. */
const RED_THEME_TOKENS: WeddingThemeTokens = {
  mainBackground: WEDDING_PALETTE.wineRed,
  navbarTextColor: WEDDING_PALETTE.brightRed,
  buttonColor: WEDDING_PALETTE.orange,
  headingColor: WEDDING_PALETTE.wineRed,
  contentColor: WEDDING_PALETTE.wineRed,
  buttonTextColor: WEDDING_PALETTE.whiteBackground,
  /** RSVP accent (orange) */
  rsvpHeadingColor: WEDDING_PALETTE.orange,
  rsvpBodyColor: RSVP_BODY_LIGHT,
  rsvpButtonBackground: WEDDING_PALETTE.orange,
  rsvpButtonText: WEDDING_PALETTE.whiteBackground,
};

/**
 * Orange theme — RSVP band matches hero orange; RSVP title + Search CTA use green.
 */
const ORANGE_THEME_TOKENS: WeddingThemeTokens = {
  mainBackground: WEDDING_PALETTE.orange,
  navbarTextColor: WEDDING_PALETTE.wineRed,
  buttonColor: WEDDING_PALETTE.green,
  headingColor: WEDDING_PALETTE.orange,
  contentColor: WEDDING_PALETTE.orange,
  buttonTextColor: WEDDING_PALETTE.whiteBackground,
  rsvpHeadingColor: WEDDING_PALETTE.green,
  rsvpBodyColor: RSVP_BODY_LIGHT,
  rsvpButtonBackground: WEDDING_PALETTE.green,
  rsvpButtonText: WEDDING_PALETTE.whiteBackground,
};

/**
 * Green theme — RSVP accent uses bright red so headings + CTA pop on green bands.
 */
const GREEN_THEME_TOKENS: WeddingThemeTokens = {
  mainBackground: WEDDING_PALETTE.green,
  navbarTextColor: WEDDING_PALETTE.yellow,
  buttonColor: WEDDING_PALETTE.brightRed,
  headingColor: WEDDING_PALETTE.green,
  contentColor: WEDDING_PALETTE.green,
  buttonTextColor: WEDDING_PALETTE.whiteBackground,
  rsvpHeadingColor: WEDDING_PALETTE.brightRed,
  rsvpBodyColor: RSVP_BODY_LIGHT,
  rsvpButtonBackground: WEDDING_PALETTE.brightRed,
  rsvpButtonText: WEDDING_PALETTE.whiteBackground,
};

export const WEDDING_THEME_TOKENS: Record<WeddingTheme, WeddingThemeTokens> = {
  red: RED_THEME_TOKENS,
  orange: ORANGE_THEME_TOKENS,
  green: GREEN_THEME_TOKENS,
};

/** Font stacks (CSS `font-family` values). One object per theme so you can diverge later. */
export type WeddingThemeTypography = {
  /** Top-left “Ivanna & Ben” wordmark */
  navBrandFont: string;
  /** Navbar section links (not the logo) */
  navLinkFont: string;
  /** Section `h1` / `h2` titles and uppercase eyebrow labels */
  sectionHeadingFont: string;
  /** Primary buttons (calendar, gallery CTA, elegant, etc.) */
  buttonFont: string;
  /** RSVP nav CTA + RSVP form submit only */
  buttonRsvpFont: string;
  /** Body copy, accordion, inputs, modal form text */
  contentFont: string;
};

const BARLOW = "'Barlow Condensed', sans-serif";
const INSTRUMENT = "'Instrument Serif', serif";

const BASE_TYPOGRAPHY: WeddingThemeTypography = {
  navBrandFont: BARLOW,
  navLinkFont: INSTRUMENT,
  sectionHeadingFont: BARLOW,
  buttonFont: BARLOW,
  buttonRsvpFont: INSTRUMENT,
  contentFont: INSTRUMENT,
};

export const WEDDING_THEME_TYPOGRAPHY: Record<WeddingTheme, WeddingThemeTypography> = {
  red: { ...BASE_TYPOGRAPHY },
  orange: { ...BASE_TYPOGRAPHY },
  green: { ...BASE_TYPOGRAPHY },
};

const TYPOGRAPHY_CSS_VARS = [
  ["--font-wedding-nav-brand", "navBrandFont"],
  ["--font-wedding-nav-link", "navLinkFont"],
  ["--font-wedding-section-heading", "sectionHeadingFont"],
  ["--font-wedding-button", "buttonFont"],
  ["--font-wedding-button-rsvp", "buttonRsvpFont"],
  ["--font-wedding-content", "contentFont"],
] as const satisfies ReadonlyArray<readonly [string, keyof WeddingThemeTypography]>;

const THEME_CSS_VARS = [
  ["--theme-main-background", "mainBackground"],
  ["--theme-navbar-text", "navbarTextColor"],
  ["--theme-button", "buttonColor"],
  ["--theme-heading", "headingColor"],
  ["--theme-content", "contentColor"],
  ["--theme-button-text", "buttonTextColor"],
  ["--theme-rsvp-heading", "rsvpHeadingColor"],
  ["--theme-rsvp-body", "rsvpBodyColor"],
  ["--theme-rsvp-button", "rsvpButtonBackground"],
  ["--theme-rsvp-button-text", "rsvpButtonText"],
] as const satisfies ReadonlyArray<readonly [string, keyof WeddingThemeTokens]>;

export function applyWeddingThemeCssVars(element: HTMLElement, theme: WeddingTheme): void {
  const tokens = WEDDING_THEME_TOKENS[theme];
  for (const [cssVar, key] of THEME_CSS_VARS) {
    element.style.setProperty(cssVar, tokens[key]);
  }
  const typo = WEDDING_THEME_TYPOGRAPHY[theme];
  for (const [cssVar, key] of TYPOGRAPHY_CSS_VARS) {
    element.style.setProperty(cssVar, typo[key]);
  }
}

export function clearWeddingThemeCssVars(element: HTMLElement): void {
  for (const [cssVar] of THEME_CSS_VARS) {
    element.style.removeProperty(cssVar);
  }
  for (const [cssVar] of TYPOGRAPHY_CSS_VARS) {
    element.style.removeProperty(cssVar);
  }
}
