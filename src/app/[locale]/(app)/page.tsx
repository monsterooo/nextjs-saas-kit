import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export default function Home() {
  const t = useTranslations("HomePage")

  return (
    <main className="">
      <section className="">{t("title")}</section>
      <Link href="/about">{t("about")}</Link>
    </main>
  )
}
