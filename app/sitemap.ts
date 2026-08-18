import type { MetadataRoute } from "next";

export const baseUrl = "https://digo-sa.vercel.app";

const locales = ["ar", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,

    lastModified: new Date(),

    changeFrequency: "weekly",

    priority: 1,

    alternates: {
      languages: {
        ar: `${baseUrl}/ar`,
        en: `${baseUrl}/en`,
      },
    },
  }));
}
