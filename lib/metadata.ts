import { Metadata } from "next";
import { siteConfig } from "./site";

const SITE_URL = siteConfig.url;

export function getMetadata(locale: string): Metadata {
  const isArabic = locale === "ar";

  const title = isArabic
    ? "ديجو | وكالة تسويق رقمي في السعودية لتنمية العلامات التجارية"
    : "DIGO | Saudi Digital Marketing Agency for Growing Brands";

  const description = isArabic
    ? "ديجو وكالة تسويق رقمي سعودية متخصصة في الخطط التسويقية، الهوية البصرية، كتابة المحتوى، تحسين محركات البحث (SEO)، تصميم المواقع الإلكترونية، وإدارة الحملات الإعلانية لمساعدة الشركات على بناء حضور رقمي قوي وتحقيق نمو مستدام."
    : "DIGO is a Saudi digital marketing agency specializing in branding, marketing strategy, creative content, SEO, website design, and paid advertising to help businesses build a stronger digital presence and achieve sustainable growth.";

  return {
    metadataBase: new URL(SITE_URL),

    title,

    description,

    applicationName: "DIGO|ديجو",

    keywords: isArabic
      ? [
          "ديجو",
          "وكالة تسويق رقمي",
          "شركة تسويق",
          "التسويق الرقمي",
          "الهوية البصرية",
          "تصميم المواقع",
          "تطوير المواقع",
          "كتابة المحتوى",
          "تحسين محركات البحث",
          "SEO",
          "إعلانات جوجل",
          "Google Ads",
          "إعلانات ميتا",
          "Meta Ads",
          "التسويق الإلكتروني",
          "الرياض",
          "السعودية",
          "Branding",
        ]
      : [
          "DIGO",
          "Digital Marketing",
          "Marketing Agency",
          "Saudi Arabia",
          "Riyadh",
          "Branding",
          "Creative Content",
          "Marketing Strategy",
          "SEO",
          "Search Engine Optimization",
          "Website Design",
          "Web Development",
          "UI UX",
          "Google Ads",
          "Meta Ads",
          "Paid Advertising",
        ],

    authors: [
      {
        name: "DIGO",
      },
    ],

    creator: "DIGO",

    publisher: "DIGO",

    category: "Business",

    alternates: {
      canonical: `${SITE_URL}/${locale}`,

      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
      },
    },

    openGraph: {
      title,

      description,

      url: `${SITE_URL}/${locale}`,

      siteName: "DIGO",

      locale: isArabic ? "ar_SA" : "en_US",

      type: "website",

      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "DIGO Digital Marketing Agency",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: ["/og-image.png"],
    },

    icons: {
      icon: [
        {
          url: "/favicon.ico",
        },
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
      ],

      shortcut: "/favicon.ico",

      apple: "/apple-touch-icon.png",
    },

    robots: {
      index: true,

      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    other: {
      "geo.region": "SA",
      "geo.placename": "Riyadh",
    },
  };
}
