/**
 * Shared layout for wedding page sections so vertical rhythm and gutters stay consistent.
 */
export const weddingSectionClassName = "w-full py-16 md:py-24";

export const weddingSectionContainerClassName =
  "container mx-auto px-6 md:px-10 lg:px-14";

/** Default space below section `h2` titles (when not paired with a subtitle). */
export const weddingSectionTitleMarginClassName = "mb-6 md:mb-8";

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
 * “Add to calendar” / “See Gallery” elegant pills — identical label size (matches hero RSVP link scale).
 */
export const weddingElegantCtaButtonClassName =
  "border-0 h-14 min-w-[220px] rounded-full px-10 text-[17px] md:text-[18px] normal-case leading-none";
