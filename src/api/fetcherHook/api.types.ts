import { UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query'

export type ReplaceUrl = { [key: string]: string | number }

export type QueryOptionsType<Data> = UseQueryOptions<Data, any, Data>

export type FnPair<Data, Body> = {
  key: string
  fn: (props: Body) => Promise<Data>
}

export type InfiniteQueryOptionsType<Data> = UseInfiniteQueryOptions<Data, any, Data, Data>
