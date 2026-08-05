import { createRootRoute } from "@tanstack/react-router";
import { NotFoundPage, RootLayout } from "../components/RootLayout";
import headingFont from "@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2?url";
import appCss from "../index.css?url";

const themeBootstrap = `(() => {
  try {
    const stored = localStorage.getItem("sea-kers-theme");
    const dark = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
  } catch {}
})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "theme-color",
        content: "#f8f9fc",
        media: "(prefers-color-scheme: light)",
      },
      {
        name: "theme-color",
        content: "#0d0d0d",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    links: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
        sizes: "16x16 32x32 48x48 64x64",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
      {
        rel: "preload",
        href: headingFont,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [{ children: themeBootstrap }],
  }),
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});