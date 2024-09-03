import { Category } from "@prisma/client"
import useSWR from "swr"

import { ICategoryTree } from "@/types/dashboard"

import { fetcher } from "../fetcher"

export function useCategory() {
  const { data, isLoading, error, mutate } = useSWR<ICategoryTree[]>(
    "/api/category",
    fetcher
  )
  return { data, isLoading, error, mutate }
}
