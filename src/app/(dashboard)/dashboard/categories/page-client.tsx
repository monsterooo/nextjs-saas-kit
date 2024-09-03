"use client"

import { useCategory } from "@/lib/swr/use-category"
import { CategoryTable } from "@/components/dashboard/category-table"

export function CategoriesPageClient() {
  const { data: categories } = useCategory()

  return <CategoryTable categories={categories} />
}
