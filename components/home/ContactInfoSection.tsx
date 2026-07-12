import { useTranslations } from "next-intl";
import Reveal from "../motion/Reveal";
import Link from "next/link";
import GradientCircle from "./sub_component/GradientCircle";
import { siteConfig } from "@/lib/site";

export default function ContactInfoSection() {
  const t = useTranslations("contactInfoSection");
  const contacts = [
    {
      title: t("contactUs"),
      value: siteConfig.social.telephone,
      href: siteConfig.social.whatsapp,
    },
    {
      title: t("emailAddress"),
      value: siteConfig.email,
      href: "mailto:" + siteConfig.email,
    },
    {
      title: t("visitUs"),
      value: t("address"),
      href: siteConfig.address,
    },
  ];
  return (
    <Reveal
      className="
  flex items-center justify-center flex-wrap bg-muted
        gap-x-18 gap-y-8 md:gap-32 py-12 px-12 md:py-12 md:px-44 w-full relative"
    >
      {contacts.map((contact, item) => (
        <div key={item} className="flex flex-col gap-4 relative">
          <GradientCircle
            className="
          w-8 -top-1
                rtl:-right-4
                ltr:-left-4"
          />
          <h5 className="font-semibold text-lg z-20">{contact.title}</h5>
          <h6 className="text-sm hover:text-primary-dark duration-500 cursor-pointer">
            {contact.href == "" ? (
              contact.value
            ) : (
              <Link href={contact.href} target="_blank">
                {contact.value}
              </Link>
            )}
          </h6>
        </div>
      ))}
    </Reveal>
  );
}
