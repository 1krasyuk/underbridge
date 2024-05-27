import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TClothingItem } from '@/widgets/home/ClothingItem'

export interface cartSliceState {
  cartItems: TClothingItem[]
}

const initialState: cartSliceState = {
  cartItems: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, { payload }: PayloadAction<TClothingItem>) => {
      state.cartItems.push(payload)
    },
    deleteCartItem: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload)
    },
    clearCart: (state) => {
      state.cartItems = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { addCartItem, deleteCartItem, clearCart } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.cartItems
