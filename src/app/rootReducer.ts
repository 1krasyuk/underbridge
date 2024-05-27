import { combineReducers } from '@reduxjs/toolkit'
import { cartSlice } from '@/store/cartSlice'
import { favouriteSlice } from '@/store/favouriteSlice'

import { baseApi } from '@/api'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [favouriteSlice.name]: favouriteSlice.reducer
})

export default rootReducer
