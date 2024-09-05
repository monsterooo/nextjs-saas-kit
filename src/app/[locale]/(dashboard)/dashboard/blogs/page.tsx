import { Link } from "@/i18n/routing"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function BlogsPage() {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Blogs</h1>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/blogs/new">
            <Button>
              <Icons.plus />
              New Blog
            </Button>
          </Link>
        </div>
      </div>

      <div>blog content</div>
    </div>
  )
}
