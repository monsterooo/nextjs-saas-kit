"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useCategory, useCategoryById } from "@/lib/swr/use-category"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CategoryTree } from "@/components/category-tree"
import { Icons } from "@/components/icons"

const CategorySchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  parentId: z.any(),
})

interface IProps {
  id?: string
}

export function CategoryForm({ id }: IProps) {
  const { data: categories, mutate } = useCategory()
  const { data: categoryDetail, error, isLoading } = useCategoryById(id)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      parentId: "",
    },
  })

  const handleSubmit = async (values) => {
    try {
      setLoading(true)

      let response

      if (!id) {
        response = await fetch("/api/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
      } else if (id) {
        response = await fetch(`/api/category/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
      }

      if (response.ok) {
        toast.success("Category created successfully")
        await mutate()
        router.push("/dashboard/categories")
        return
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const findSubtreeById = (nodes, id) => {
    // 遍历数组中的每个节点
    for (let node of nodes) {
      // 如果找到匹配的 id，返回该节点
      if (node.id === id) {
        return node
      }

      // 如果当前节点有子节点，递归查找子节点
      if (node.children && node.children.length > 0) {
        const result = findSubtreeById(node.children, id)
        if (result) {
          return result
        }
      }
    }

    // 如果没有找到匹配的子树，返回 null
    return null
  }

  const parentId = form.watch("parentId")
  const selectedCategory = useMemo(() => {
    if (!parentId) return null
    return findSubtreeById(categories, parentId)
  }, [parentId, categories])

  useEffect(() => {
    if (id && categoryDetail) {
      form.setValue("name", categoryDetail.name)
      form.setValue("parentId", categoryDetail.parentId)
    }
  }, [categoryDetail, id])

  if (error && id) {
    toast.error(error.message)
    router.push("/dashboard/categories")
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                {/* <FormDescription>
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div
                        className={cn(
                          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          <div className="flex justify-between gap-4 w-full">
                            <span className="flex-1">
                              {selectedCategory.name}
                            </span>
                            <Icons.x
                              className="w-5 text-primary/50 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                field.onChange("")
                              }}
                            />
                          </div>
                        ) : (
                          <span>Select a category</span>
                        )}
                      </div>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-80 p-0" align="start">
                    <CategoryTree
                      value={field.value}
                      treeData={categories}
                      onChange={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                {/* <FormDescription>
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
