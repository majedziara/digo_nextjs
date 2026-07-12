import { createServerSupabaseClient } from "@/app/utils/supabase/supabaseClientServer";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

export async function POST(req: Request) {
  const { email, locale } = await req.json();

  const t = await getTranslations({
    locale,
    namespace: "footer",
  });

  try {
    if (!email) {
      return Response.json({ message: t("missingFields") }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = await createServerSupabaseClient(cookieStore);

    const { error } = await supabase
      .from("digo_newsletter_subscribers")
      .insert([{ email }]);

    if (error) {
      // البريد موجود مسبقًا (Unique Constraint)
      if (error.code === "23505") {
        return Response.json(
          { message: t("alreadySubscribed") },
          { status: 409 },
        );
      }

      console.error(error);

      return Response.json({ message: t("error") }, { status: 500 });
    }

    return Response.json({ message: t("success") }, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json({ message: t("error") }, { status: 500 });
  }
}
