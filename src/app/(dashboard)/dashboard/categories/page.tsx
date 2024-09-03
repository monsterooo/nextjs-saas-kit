import { Button } from "@/components/ui/button"
import { CategoryTable } from "@/components/dashboard/category-table"
import { Icons } from "@/components/icons"

export default function CategoriesPage() {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <div className="flex items-center space-x-2">
          <Button>
            <Icons.plus />
            New Category
          </Button>
        </div>
      </div>

      <div>
        <CategoryTable />
      </div>
    </div>
  )
}
