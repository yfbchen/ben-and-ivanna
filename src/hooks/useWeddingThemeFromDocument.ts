import { useEffect, useState } from "react";
import type { WeddingTheme } from "@/config/weddingThemeTokens";
import { weddingThemeFromDataAttr } from "@/config/weddingLockups";

const ATTR = "data-wedding-theme";

/**
 * Reads the active wedding theme from `document.documentElement` so shared UI
 * (e.g. nav) can follow hero swatches without prop drilling.
 */
export function useWeddingThemeFromDocument(): WeddingTheme {
  const [theme, setTheme] = useState<WeddingTheme>(() =>
    weddingThemeFromDataAttr(document.documentElement.getAttribute(ATTR)),
  );

  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setTheme(weddingThemeFromDataAttr(el.getAttribute(ATTR)));
    const observer = new MutationObserver(sync);
    observer.observe(el, { attributes: true, attributeFilter: [ATTR] });
    sync();
    return () => observer.disconnect();
  }, []);

  return theme;
}
