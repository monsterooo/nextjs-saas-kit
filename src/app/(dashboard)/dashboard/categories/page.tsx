import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { CategoriesPageClient } from "./page-client"

export default function CategoriesPage() {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/categories/new">
            <Button>
              <Icons.plus />
              New Category
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <CategoriesPageClient />
      </div>
    </div>
  )
}
