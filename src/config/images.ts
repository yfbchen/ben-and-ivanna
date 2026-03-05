/**
 * Image URLs from Supabase Storage (images bucket).
 * Update this list if you add/remove images in the bucket.
 */
const STORAGE_BASE =
  "https://fpcnecyggvzhcoigoegf.supabase.co/storage/v1/object/public/images";

const url = (path: string) =>
  `${STORAGE_BASE}/${path.replace(/ /g, "%20")}`;

export const images = {
  heroHorizontal: url("photo1.png"),
  heroVertical: url("photo1-copy.png"),
  calendar: "/calendar.png", // still local
  gallery: [
    "IMG_1199 copy 2.png",
    "IMG_1199 copy 3.png",
    "IMG_1199 copy.png",
    "IMG_1199.png",
    "photo1 copy 2.png",
    "photo1 copy 3.png",
    "photo1 copy 4.png",
    "photo1 copy 5.png",
    "photo1-copy.png",
    "photo1.png",
  ].map((f) => url(f)),
};
