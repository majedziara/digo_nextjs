import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DIGO | Digital Marketing & Web Solutions",

    short_name: "DIGO",

    description:
      "Digital Marketing, Branding, SEO, Creative Content, Web Design & Digital Solutions.",

    start_url: "/",

    display: "standalone",

    background_color: "#ffffff",

    theme_color: "#7B3F98",

    lang: "en",

    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },

      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
