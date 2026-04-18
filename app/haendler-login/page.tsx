import { redirect } from "next/navigation";

export default function LegacyHaendlerLoginRedirect() {
  redirect("/partner-login");
}
