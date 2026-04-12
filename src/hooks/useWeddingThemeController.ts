import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import {
  applyWeddingThemeCssVars,
  clearWeddingThemeCssVars,
  type WeddingTheme,
} from "@/config/weddingThemeTokens";
import { getStoredWeddingTheme, storeWeddingTheme } from "@/lib/weddingThemeStorage";

/**
 * Owns `data-wedding-theme` + theme CSS vars on `document.documentElement`.
 * Use on any full-page route that should match hero swatches (home, gallery).
 */
export function useWeddingThemeController() {
  const [selectedTheme, setSelectedTheme] = useState<WeddingTheme>(getStoredWeddingTheme);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-wedding-theme", selectedTheme);
    applyWeddingThemeCssVars(root, selectedTheme);
    storeWeddingTheme(selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    return () => {
      const root = document.documentElement;
      root.removeAttribute("data-wedding-theme");
      clearWeddingThemeCssVars(root);
    };
  }, []);

  const handleThemeChange = useCallback(
    (theme: WeddingTheme) => {
      if (theme === selectedTheme) return;
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (
        prefersReducedMotion ||
        typeof document.startViewTransition !== "function"
      ) {
        setSelectedTheme(theme);
        return;
      }
      document.startViewTransition(() => {
        flushSync(() => {
          setSelectedTheme(theme);
        });
      });
    },
    [selectedTheme],
  );

  return { selectedTheme, handleThemeChange };
}
