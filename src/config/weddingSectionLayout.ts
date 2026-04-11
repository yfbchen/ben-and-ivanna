/**
 * Shared layout for wedding page sections so vertical rhythm and gutters stay consistent.
 */
export const weddingSectionClassName = "w-full py-16 md:py-24";

export const weddingSectionContainerClassName =
  "container mx-auto px-6 md:px-10 lg:px-14";

/**
 * Barlow Condensed: slight top offset so titles don’t read flush to the section edge.
 */
export const weddingSectionTitleCapOffsetClassName = "pt-1 md:pt-1.5";

/**
 * Space between section `h2` and the following content (Registry is the reference).
 */
export const weddingSectionTitleToContentSpacingClassName = "mb-6 md:mb-8";

/**
 * Default section `h2` margin: cap offset + space to content below.
 * Use on every wedding section title (same rhythm as Registry).
 */
export const weddingSectionTitleMarginClassName = `${weddingSectionTitleCapOffsetClassName} ${weddingSectionTitleToContentSpacingClassName}`;

/**
 * RSVP band: same cap offset, less space under the title than cream sections — the dark band
 * and large `text-5xl` headline make the default `mb-6`/`mb-8` read as too loose next to the blurb.
 */
export const weddingSectionTitleMarginClassNameRsvp = `${weddingSectionTitleCapOffsetClassName} mb-3 md:mb-4`;

/**
 * Our Story: no margin under the title — timeline is nudged up with negative margin on its wrapper.
 */
export const weddingSectionTitleMarginClassNameOurStory = `${weddingSectionTitleCapOffsetClassName} mb-0`;

/**
 * Main cream-surface body copy (same as His Proposal paragraphs).
 * Use for section intros, gallery/registry blurbs, timeline story text, FAQ answers, etc.
 */
export const weddingBodyCopyClassName =
  "font-wedding-content text-base md:text-lg tracking-brand text-wedding-body leading-relaxed";

/** RSVP band body copy — same size/leading as `weddingBodyCopyClassName`, themed for dark band. */
export const weddingRsvpBodyCopyClassName =
  "font-wedding-content text-base md:text-lg tracking-brand text-wedding-rsvp-body leading-relaxed";

/**
 * Primary nav link label style (`MainNav` desktop/mobile top-level links).
 * Use for wedding CTAs so buttons match navbar size and weight.
 */
export const weddingNavLinkButtonTypographyClassName =
  "font-wedding-nav-link font-semibold text-[17px] lg:text-[18px] leading-none tracking-brand";

/**
 * “Add to calendar” / “See Gallery” elegant pills — typography matches navbar links.
 */
export const weddingElegantCtaButtonClassName =
  `border-0 h-14 min-w-[220px] rounded-full px-10 normal-case ${weddingNavLinkButtonTypographyClassName}`;
