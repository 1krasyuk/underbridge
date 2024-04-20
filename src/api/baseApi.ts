import { createApi } from '@reduxjs/toolkit/query/react'

import baseQueryWithReauth from './baseQueryWithReauth'

const baseApi = createApi({
  tagTypes: [],
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
})

export default baseApi
