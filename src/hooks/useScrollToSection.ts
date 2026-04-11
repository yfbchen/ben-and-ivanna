import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_OFFSET = 72;

/** Vertical order on the wedding home page — must match section `id`s. */
export const WEDDING_SECTION_IDS = [
  "hero",
  "our-wedding",
  "our-story",
  "his-proposal",
  "gallery",
  "gift",
  "faq",
  "rsvp",
] as const;

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const targetY =
    element.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const duration = 900;
  const startTime = performance.now();

  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeInOutQuad(progress);
    window.scrollTo(0, startY + distance * eased);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

const DEFAULT_RETRY = { maxAttempts: 100, intervalMs: 40 } as const;

/**
 * Scroll to `#id` once the element exists (hero loading, route transitions, etc.).
 */
export function scrollToSectionWithRetry(
  id: string,
  options?: { maxAttempts?: number; intervalMs?: number },
) {
  const maxAttempts = options?.maxAttempts ?? DEFAULT_RETRY.maxAttempts;
  const intervalMs = options?.intervalMs ?? DEFAULT_RETRY.intervalMs;
  let attempts = 0;

  const tryScroll = () => {
    const element = document.getElementById(id);
    if (element) {
      scrollToSection(id);
      return;
    }
    attempts += 1;
    if (attempts < maxAttempts) {
      window.setTimeout(tryScroll, intervalMs);
    }
  };

  requestAnimationFrame(() => {
    const element = document.getElementById(id);
    if (element) {
      scrollToSection(id);
      return;
    }
    window.setTimeout(tryScroll, intervalMs);
  });
}

/**
 * Hash in URL → smooth scroll. Scroll position → hash (React Router `replace`, not raw `replaceState`).
 * `contentReady`: skip hash-on-scroll until hero/sections exist (avoids wrong `#` during loading).
 */
export function useScrollToSection(contentReady = true) {
  const location = useLocation();
  const navigate = useNavigate();
  /** When we update the hash from scroll, skip the next “scroll to hash” effect (no feedback loop). */
  const scrollSyncedHashRef = useRef<string | null>(null);

  useEffect(() => {
    const id = location.hash.slice(1);
    if (!id) return;

    if (scrollSyncedHashRef.current === location.hash) {
      scrollSyncedHashRef.current = null;
      return;
    }

    scrollToSectionWithRetry(id);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!contentReady || location.pathname !== "/") return;

    let scrollTimeout: ReturnType<typeof setTimeout>;

    const updateHashFromScroll = () => {
      const scrollProbeY = window.scrollY + NAV_OFFSET + 100;
      let activeId: string = WEDDING_SECTION_IDS[0];

      for (const id of WEDDING_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const bottom = top + el.offsetHeight;
        if (scrollProbeY >= top && scrollProbeY < bottom) {
          activeId = id;
          break;
        }
        if (scrollProbeY < top) break;
        activeId = id;
      }

      const newHash = `#${activeId}`;
      if (window.location.hash === newHash) return;

      scrollSyncedHashRef.current = newHash;
      navigate({ pathname: "/", hash: activeId }, { replace: true });
    };

    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateHashFromScroll, 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHashFromScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [contentReady, location.pathname, navigate]);
}
