import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: 'https://API'
  // prepareHeaders: (headers, { getState }) => {
  //   const { accessToken } = (getState() as RootState).session

  //   if (accessToken) {
  //     headers.set('Authorization', accessToken)
  //   }

  //   return headers
  // }
})

export default baseQuery
