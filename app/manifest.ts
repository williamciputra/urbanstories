import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",

    name: "Urbanstories",

    short_name: "Urbanstories",

    description:
      "Cerita yang Menginspirasi.",

    start_url: "/",

    scope: "/",

    display: "standalone",

    background_color: "#FAF8F3",

    theme_color: "#FAF8F3",

    lang: "id-ID",

    orientation: "portrait",

    categories: [
      "news",
      "lifestyle",
      "technology",
      "business",
    ],

    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },

      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },

      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}