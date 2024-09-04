import ContentSection from "@/components/dashboard/content-section"

import { SettingsPageClient } from "./page-client"

export default async function SettingsPage() {
  return (
    <ContentSection
      title="Profile"
      desc="This is how others will see you on the site."
    >
      <SettingsPageClient />
    </ContentSection>
  )
}
