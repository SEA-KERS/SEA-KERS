import type { ReactNode } from "react";
import { ThemeContext, useTheme } from "../../hooks/useTheme";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface AppShellProps {
  children: ReactNode;
}

/** Shared page chrome for the home page and the /wins, /projects and /team
 *  detail pages: fixed navbar, main content landmark and footer. Theme state
 *  lives here so every route toggles from the same source of truth. */
export default function AppShell({ children }: AppShellProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-(--background) text-(--foreground)">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
