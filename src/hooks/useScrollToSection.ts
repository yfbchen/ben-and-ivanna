import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SECTION_IDS = [
  "hero",
  "our-wedding",
  "our-story",
  "his-proposal",
  "gallery",
  "gift",
  "faq",
  "rsvp",
];
const NAV_OFFSET = 72;

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

export function useScrollToSection() {
  const location = useLocation();

  // When navigating to /#section (e.g. from Layout nav), smooth-scroll to that section
  useEffect(() => {
    const id = location.hash.slice(1);
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => scrollToSection(id));
      }
    }
  }, [location.pathname, location.hash]);

  // Update URL hash when user scrolls to a section (so refresh keeps them there)
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const updateHashFromScroll = () => {
      const scrollY = window.scrollY + NAV_OFFSET + 100;
      let activeId = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          activeId = id;
          break;
        }
        if (scrollY < top) break;
        activeId = id;
      }
      const newHash = `#${activeId}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${newHash}`
        );
      }
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
  }, []);
}
