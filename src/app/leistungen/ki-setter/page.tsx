import { redirect } from "next/navigation";
import { paths } from "@/lib/journey";

export default function KiSetterLegacyPage() {
  redirect(paths.annahme);
}
