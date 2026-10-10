"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const t = useTranslations("contactSection");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData): Promise<void> => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error(t("error"));
        return;
      }

      toast.success(t("success"));
      reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form noValidate aria-busy={isLoading} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          id="contact-name"
          type="text"
          autoComplete="name"
          required
          placeholder={t("name")}
          error={errors.name?.message}
          {...register("name", { required: t("nameRequired"), minLength: { value: 2, message: t("nameRequired") } })}
        />

        <Field
          id="contact-email"
          type="email"
          autoComplete="email"
          required
          placeholder={t("email")}
          error={errors.email?.message}
          {...register("email", { required: t("emailRequired"), pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("emailRequired") } })}
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          id="contact-phoneNumber"
          type="tel"
          autoComplete="tel"
          required
          placeholder={t("phoneNumber")}
          error={errors.phoneNumber?.message}
          {...register("phoneNumber", { required: t("phoneNumberRequired"), minLength: { value: 8, message: t("phoneNumberRequired") } })}
        />

        <Field
          id="contact-subject"
          type="text"
          autoComplete="off"
          required
          placeholder={t("subject")}
          error={errors.subject?.message}
          {...register("subject", { required: t("subjectRequired"), minLength: { value: 2, message: t("subjectRequired") } })}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="sr-only">{t("message")}</label>
        <Textarea
          id="contact-message"
          required
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          placeholder={t("message")}
          className="min-h-37.5 resize-none"
          {...register("message", { required: t("messageToShort"), minLength: { value: 10, message: t("messageToShort") } })}
        />

        {errors.message && (
          <p id="contact-message-error" role="alert" className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
        {isLoading ? t("loading") : t("sendBtn")}
      </Button>
    </form>
  );
}

/* =========================
   🧩 Field Component
========================= */

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

function Field({ error, ...props }: FieldProps) {
  return (
    <div>
      <label htmlFor={props.id} className="sr-only">{props.placeholder}</label>
      <Input
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
        className="
          transition
          focus:ring-2 focus:ring-primary/20
        "
      />

      {error && <p id={`${props.id}-error`} role="alert" className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
