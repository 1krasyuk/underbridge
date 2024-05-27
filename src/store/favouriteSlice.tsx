import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TClothingItem } from '@/widgets/home/ClothingItem'

export interface favouriteSliceState {
  favouriteItems: TClothingItem[]
}

const initialState: favouriteSliceState = {
  favouriteItems: []
}

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavouriteItem: (state, { payload }: PayloadAction<TClothingItem>) => {
      state.favouriteItems.push(payload)
    },
    deleteFavouriteItem: (state, { payload }: PayloadAction<string>) => {
      state.favouriteItems = state.favouriteItems.filter(
        (item) => item.id !== payload
      )
    }
  }
})

// Action creators are generated for each case reducer function
export const { addFavouriteItem, deleteFavouriteItem } = favouriteSlice.actions

export const selectFavouriteItems = (state: RootState) =>
  state.favourite.favouriteItems
