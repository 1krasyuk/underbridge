/* eslint-disable no-underscore-dangle */
declare const _brand: unique symbol

declare global {
  declare type RootState = import('../app/appStore').RootState
  declare type AppDispatch = import('../app/appStore').AppDispatch
}

export {}
