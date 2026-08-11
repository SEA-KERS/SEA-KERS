import { createContext, useContext, useEffect, useState } from "react";
import type { Theme } from "../types";

const THEME_STORAGE_KEY = "sea-kers-theme";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

/** Theme context so AppShell can be the single owner of theme state while any
 *  descendant (e.g. Hero's CyberDotMatrix) reads the live value. */
export const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Reads theme state from the nearest ThemeContext.Provider (AppShell). */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within AppShell");
  }
  return context;
}

/** SSR-safe theme state. Initial state is always "light" on both server and
 *  client so hydration never mismatches; the stored / system preference is
 *  applied in an effect after mount. */
export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    setTheme(
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : media.matches
          ? "dark"
          : "light",
    );

    const syncSystemTheme = (event: MediaQueryListEvent) => {
      if (!window.localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", syncSystemTheme);
    return () => media.removeEventListener("change", syncSystemTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme: Theme = currentTheme === "light" ? "dark" : "light";
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      return nextTheme;
    });
  };

  return { theme, toggleTheme };
}
