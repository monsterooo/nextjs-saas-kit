import ContentSection from "@/components/dashboard/content-section"

import { BlogsForm } from "../form"

export default function NewBlogPage() {
  return (
    <ContentSection title="Blogs" desc="Create a new blog">
      <BlogsForm />
    </ContentSection>
  )
}
