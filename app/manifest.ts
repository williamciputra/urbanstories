import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Urbanstories",
    short_name: "Urbanstories",
    description: "Cerita yang Menginspirasi.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F3",
    theme_color: "#FAF8F3",
    lang: "id-ID",
    orientation: "portrait",
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
    ],
  };
}