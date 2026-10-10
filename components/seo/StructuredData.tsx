import { siteConfig } from "@/lib/site";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "Organization",

    name: siteConfig.name,

    url: siteConfig.url,

    logo: siteConfig.url + "/logo.png",

    description:
      "Advertising, Branding, Digital Marketing and Web Development.",

    email: siteConfig.email,

    telephone: siteConfig.social.telephone,

    sameAs: [
      siteConfig.social.whatsapp,
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
