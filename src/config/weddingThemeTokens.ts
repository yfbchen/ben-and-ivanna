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
};

/** Red wine matches the red hero swatch (`#6b1111` in HeroSection). */
const RED_WINE = "#6b1111";

/** Bright red: navbar + all main content text (headings and body) for every theme. */
const BRIGHT_RED = "#d81b3c";

/** Primary CTA fill (Add to calendar, elegant buttons, nav RSVP) — warm yellow. */
const YELLOW = "#e4c35a";

/** Dark label on yellow buttons for contrast. */
const BUTTON_TEXT_ON_YELLOW = "#5c1010";

/** Shared palette | all themes match this for now. */
const BASE_TOKENS: WeddingThemeTokens = {
  mainBackground: RED_WINE,
  navbarTextColor: BRIGHT_RED,
  buttonColor: YELLOW,
  headingColor: BRIGHT_RED,
  contentColor: BRIGHT_RED,
  buttonTextColor: BUTTON_TEXT_ON_YELLOW,
};

export const WEDDING_THEME_TOKENS: Record<WeddingTheme, WeddingThemeTokens> = {
  red: { ...BASE_TOKENS },
  orange: { ...BASE_TOKENS },
  green: { ...BASE_TOKENS },
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
