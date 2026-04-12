import type { WeddingTheme } from "@/config/weddingThemeTokens";

const KEY = "wedding-hero-theme";

export function getStoredWeddingTheme(): WeddingTheme {
  if (typeof window === "undefined") return "red";
  try {
    const v = sessionStorage.getItem(KEY);
    if (v === "orange" || v === "green" || v === "red") return v;
  } catch {
    /* ignore */
  }
  return "red";
}

export function storeWeddingTheme(theme: WeddingTheme): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, theme);
  } catch {
    /* ignore */
  }
}
