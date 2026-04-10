import { useEffect, useState } from "react";

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function preloadImages(urls: readonly string[]): Promise<void> {
  return Promise.all(urls.map(preloadImage)).then(() => undefined);
}

const READY_FALLBACK_MS = 12_000;

/**
 * Resolves when every URL has loaded into the image cache (or on error / timeout),
 * so the first paint of hero `<img>` can use cache and avoid layout shift.
 */
export function useHeroImagesReady(urls: readonly string[]): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeoutId = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, READY_FALLBACK_MS);

    preloadImages(urls)
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [urls]);

  return ready;
}
