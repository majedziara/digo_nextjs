import { Rubik, Zain } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getDirection } from "@/i18n/getDirection";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "sonner";
import FooterSection from "@/components/FooterSection";
import ScrollButton from "@/components/ScrollButton";
import LanguageButton from "@/components/LanguageButton";
import { getMetadata } from "@/lib/metadata";
import Script from "next/script";
import { getMessages, setRequestLocale } from "next-intl/server";
import StructuredData from "@/components/seo/StructuredData";

export const rubik = Rubik({
  subsets: ["arabic", "latin"],
  variable: "--font-rubik",
});

export const zain = Zain({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "700", "800", "900"],
  variable: "--font-zain",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();
  return getMetadata(locale);
}

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const dir = getDirection(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      className={`${rubik.variable} ${zain.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="PNPw-FFy-OJowtOOJyXNngOL1AWrfvNVEtd_GczupYY"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden relative flex flex-col">
        <StructuredData />
        {process.env.NODE_ENV === "production" && (
          <>
            <Script id="google-analytics-init" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-RPCZRLDHZ9');`}
            </Script>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-RPCZRLDHZ9"
              strategy="lazyOnload"
            />
          </>
        )}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster richColors position="top-right" />
          <Navbar />
          {children}
          <FooterSection />
          <ScrollButton />
          <LanguageButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
