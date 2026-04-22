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
  timelineEighthGrade: miscUrl("timeline_eighth_grade.png"),
  timelineProm: miscUrl("timeline_prom.png"),
  timelineDating: miscUrl("timeline_dating.png"),
  timelineNyc: miscUrl("timeline_nyc.png"),
  timelineEngagement: miscUrl("timeline_engagement.png"),
  gallery: [
    "IMG_1199 copy 2.jpg",
    "IMG_1199 copy 3.jpg",
    "IMG_1199 copy.jpg",
    "IMG_1199.jpg",
    "photo1 copy 2.jpg",
    "photo1 copy 3.jpg",
    "photo1 copy 4.jpg",
    "photo1 copy 5.jpg",
    "photo1-copy.jpg",
    "photo1.jpg",
  ].map((f) => url(f)),
};
