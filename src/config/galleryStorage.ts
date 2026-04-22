import type { GalleryCategoryId } from "@/config/images";

/** Public bucket that holds `new_york`, `garden`, `basketball`, `glasshouse`, etc. */
export const GALLERY_BUCKET = "gallery" as const;

/**
 * Storage prefixes (folders) under the `gallery` bucket → gallery filter categories.
 * Client-side `list()` needs SELECT on `storage.objects` for this bucket (anon or public).
 */
export const GALLERY_REMOTE_FOLDERS: readonly {
  prefix: string;
  category: GalleryCategoryId;
}[] = [
  { prefix: "new_york", category: "new-york" },
  { prefix: "garden", category: "china-garden" },
  { prefix: "basketball", category: "china-basketball" },
  { prefix: "glasshouse", category: "china-glass-house" },
] as const;

const IMAGE_FILE_RE = /\.(jpe?g|png|webp|gif)$/i;

export function isGalleryImageFileName(name: string): boolean {
  return IMAGE_FILE_RE.test(name);
}
