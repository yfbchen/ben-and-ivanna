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

export const images = {
  proposalFrame: `${MISC_BASE}/proposal_frame.png`,
  proposalGif: `${MISC_BASE}/proposal-gif.gif`,
  galleryFrame: `${MISC_BASE}/gallery_frame.png`,
  heroHorizontal: url("photo1.jpg"),
  heroVertical: url("photo1-copy.jpg"),
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
