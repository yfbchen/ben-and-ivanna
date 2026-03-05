/**
 * Image URLs from Supabase Storage (images bucket).
 * Update this list if you add/remove images in the bucket.
 */
const STORAGE_BASE =
  "https://fpcnecyggvzhcoigoegf.supabase.co/storage/v1/object/public/images";

const url = (path: string) =>
  `${STORAGE_BASE}/${path.replace(/ /g, "%20")}`;

export const images = {
  heroHorizontal: url("photo1.jpg"),
  heroVertical: url("photo1-copy.jpg"),
  calendar: "/calendar.jpg", // still local
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
