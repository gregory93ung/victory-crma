import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { FnPair, InfiniteQueryOptionsType, QueryOptionsType } from '@/api/fetcherHook/api.types'

export const defaultOptions = {
  retry: 0,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  keepPreviousData: true,
}

export const query = <Data, FetchProps>(
  pair: FnPair<Data, FetchProps>,
  fetchData: FetchProps,
  options: QueryOptionsType<Data> = defaultOptions
) => {
  const query = useQuery<Data>([pair.key, fetchData], () => pair.fn(fetchData), { ...defaultOptions, ...options })

  return {
    data: query.data,
    loading: query.isLoading,
    isError: query.isError,
    error: query.error,
    success: query.isSuccess,
    fetching: query.isFetching,
    refetch: query.refetch,
  }
}

export const infiniteQuery = <Data, FetchProps>(
  pair: FnPair<Data, FetchProps>,
  fetchData: FetchProps,
  options: InfiniteQueryOptionsType<Data> = defaultOptions
) => {
  const infiniteQuery = useInfiniteQuery<Data, Error>({
    queryKey: [pair.key, fetchData],
    queryFn: ({ pageParam = 1 }) => pair.fn({ ...fetchData, pageParam }),
    getNextPageParam: (lastPage, allPages) => {},
    ...defaultOptions,
    ...options,
  })

  return {
    data: infiniteQuery.data,
    pages: infiniteQuery.data?.pages,
    fetchNextPage: infiniteQuery.fetchNextPage,
    hasNextPage: infiniteQuery.hasNextPage,
    isFetching: infiniteQuery.isFetching,
    isError: infiniteQuery.isError,
    error: infiniteQuery.error,
    isSuccess: infiniteQuery.isSuccess,
    refetch: infiniteQuery.refetch,
    remove: infiniteQuery.remove,
  }
}
