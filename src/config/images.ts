/**
 * Image URLs from Supabase Storage (images bucket).
 * Update this list if you add/remove images in the bucket.
 */
const STORAGE_BASE =
  "https://fpcnecyggvzhcoigoegf.supabase.co/storage/v1/object/public/images";

const MISC_BASE =
  "https://fpcnecyggvzhcoigoegf.supabase.co/storage/v1/object/public/misc";

const url = (path: string) =>
  `${STORAGE_BASE}/${path.replace(/ /g, "%20")}`;
const miscUrl = (path: string) =>
  `${MISC_BASE}/${path.replace(/ /g, "%20")}`;

/** Tabs on `/gallery`; `all` is UI-only (not stored on items). */
export const GALLERY_FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Wedding" },
  { id: "new-york", label: "New York" },
  { id: "china-glass-house", label: "China - Formal" },
  { id: "china-basketball", label: "China - Basketball" },
  { id: "china-garden", label: "China - Traditional" },
] as const;

export type GalleryFilterId = (typeof GALLERY_FILTER_TABS)[number]["id"];
export type GalleryCategoryId = Exclude<GalleryFilterId, "all">;

/**
 * Wedding-day (or other) photos in the `images` bucket — category `wedding` on `/gallery`.
 * The New York / China shoots load from the `gallery` bucket folders (see `useGalleryCatalog`).
 */
const WEDDING_GALLERY_FILES = [] as const satisfies readonly string[];

/** Static wedding entries for the grid (empty until you add filenames above). */
export function getStaticWeddingGalleryItems(): {
  src: string;
  category: Extract<GalleryCategoryId, "wedding">;
}[] {
  return WEDDING_GALLERY_FILES.map((file) => ({
    src: url(file),
    category: "wedding" as const,
  }));
}

export const images = {
  proposalGif: miscUrl("proposal-gif.gif"),
  passwordTicket: miscUrl("password_ticket.png"),
  galleryFrameByTheme: {
    red: miscUrl("gallery_frame_red.png"),
    orange: miscUrl("gallery_frame_orange.png"),
    green: miscUrl("gallery_frame_green.png"),
  },
  heroHorizontal: url("photo1.jpg"),
  heroVertical: url("photo1-copy.jpg"),
  timelineKiddos: miscUrl("timeline_kiddos.jpg"),
  timelineEighthGrade: miscUrl("timeline_eighth_grade.png"),
  timelineProm: miscUrl("timeline_prom.png"),
  timelineDating: miscUrl("timeline_dating.png"),
  timelineNyc: miscUrl("timeline_nyc.png"),
  timelineEngagement: miscUrl("timeline_engagement.png"),
  /** @deprecated Grid uses `useGalleryCatalog`; kept for any legacy reference. */
  gallery: [],
};
