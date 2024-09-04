import ContentSection from "@/components/dashboard/content-section"

import { CategoryForm } from "../form"

export default function NewCategoryPage() {
  return (
    <ContentSection title="Categories" desc="Create a new category">
      <CategoryForm />
    </ContentSection>
  )
}
