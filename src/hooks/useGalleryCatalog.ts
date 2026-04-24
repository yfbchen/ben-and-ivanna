import { getStaticWeddingGalleryItems } from "@/config/images";
import {
  GALLERY_BUCKET,
  GALLERY_REMOTE_FOLDERS,
  isGalleryImageFileName,
} from "@/config/galleryStorage";
import { supabase } from "@/lib/supabase";
import type { GalleryCategoryId } from "@/config/images";
import { useEffect, useState } from "react";

export type GalleryCatalogItem = {
  src: string;
  category: GalleryCategoryId;
};

const LIST_PAGE_SIZE = 1000;

async function listImageNamesInPrefix(prefix: string): Promise<string[]> {
  const names: string[] = [];
  let offset = 0;

  for (;;) {
    const { data, error } = await supabase.storage.from(GALLERY_BUCKET).list(prefix, {
      limit: LIST_PAGE_SIZE,
      offset,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      throw error;
    }

    if (!data?.length) {
      break;
    }

    for (const entry of data) {
      if (isGalleryImageFileName(entry.name)) {
        names.push(entry.name);
      }
    }

    if (data.length < LIST_PAGE_SIZE) {
      break;
    }
    offset += LIST_PAGE_SIZE;
  }

  return names;
}

async function fetchRemoteGalleryItems(): Promise<GalleryCatalogItem[]> {
  const batches = await Promise.all(
    GALLERY_REMOTE_FOLDERS.map(async ({ prefix, category }) => {
      try {
        const fileNames = await listImageNamesInPrefix(prefix);
        return fileNames.map((name) => {
          const path = `${prefix}/${name}`;
          const { data } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);
          return { src: data.publicUrl, category };
        });
      } catch {
        return [];
      }
    }),
  );

  return batches.flat();
}

function sortCatalogForDisplay(items: GalleryCatalogItem[]): GalleryCatalogItem[] {
  const categoryRank = new Map<GalleryCategoryId, number>();
  categoryRank.set("wedding", 0);
  categoryRank.set("new-york", 1);
  categoryRank.set("china-glass-house", 2);
  categoryRank.set("china-basketball", 3);
  categoryRank.set("china-garden", 4);

  return [...items].sort((a, b) => {
    const ra = categoryRank.get(a.category) ?? 99;
    const rb = categoryRank.get(b.category) ?? 99;
    if (ra !== rb) return ra - rb;
    return a.src.localeCompare(b.src, undefined, { numeric: true, sensitivity: "base" });
  });
}

export function useGalleryCatalog() {
  const [items, setItems] = useState<GalleryCatalogItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setStatus("loading");
      setErrorMessage(null);

      try {
        const wedding = getStaticWeddingGalleryItems();
        const remote = await fetchRemoteGalleryItems();
        if (cancelled) return;
        setItems(sortCatalogForDisplay([...wedding, ...remote]));
        setStatus("ready");
      } catch (e) {
        if (cancelled) return;
        console.error("Gallery catalog load failed:", e);
        setErrorMessage(e instanceof Error ? e.message : "Could not load gallery.");
        setItems(sortCatalogForDisplay(getStaticWeddingGalleryItems()));
        setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, status, errorMessage };
}
