import ContentSection from "@/components/dashboard/content-section"

import { CategoryForm } from "../../form"

interface IProps {
  params: {
    id: string
  }
}

export default function EditCategoryPage({ params: { id } }: IProps) {
  return (
    <ContentSection title="Categories" desc="Edit a category">
      <CategoryForm id={id} />
    </ContentSection>
  )
}
