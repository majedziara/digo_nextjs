"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { ArrowBigUp } from "lucide-react";

export default function ScrollButton() {
  const locale = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label={locale === "ar" ? "العودة إلى الأعلى" : "Back to top"}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      onClick={scrollToTop}
      className={`
        fixed
        right-5
        bottom-0
        z-50
        cursor-pointer
        p-5
        bg-black
        w-fit
        rounded-t-4xl
        duration-500
        transition-all
        ${
          show
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }
      `}
    >
      <ArrowBigUp color="white" height={40} size={24} />
    </button>
  );
}
