import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DealerLoginForm from "@/components/DealerLoginForm";
import PageIntro from "@/components/PageIntro";
import {
  dealerSessionCookieName,
  verifyDealerSessionToken,
} from "@/lib/dealer-auth";
import { createPageMetadata } from "@/lib/site";

const baseMetadata = createPageMetadata({
  title: "Partner Login",
  description:
    "Geschützter Partner-Login für Carvoo Partner-Garagen mit intern freigegebenem Zugang.",
  path: "/partner-login",
});

export const metadata = {
  ...baseMetadata,
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PartnerLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(dealerSessionCookieName)?.value ?? "";
  const session = verifyDealerSessionToken(token);

  if (session?.username) {
    redirect("/partnerbereich");
  }

  return (
    <>
      <PageIntro
        eyebrow="Partner"
        title="Partner Login"
        description="Dieser Bereich ist nur für von Carvoo intern freigegebene Partner-Accounts."
      />

      <section className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
        <DealerLoginForm />
      </section>
    </>
  );
}
