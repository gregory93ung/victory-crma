import { QueryClient } from '@tanstack/react-query'
import { defaultOptions } from '@/api/fetcherHook/useQueryWrapper'

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultOptions },
})

export const invalidateQuery = (key: string) => {
  queryClient.invalidateQueries({ queryKey: [key] })
}

export const invalidateQuerys = (keys: string[]) => {
  keys.forEach((key) => {
    queryClient.invalidateQueries({ queryKey: [key], refetchType: 'all' })
  })
}
