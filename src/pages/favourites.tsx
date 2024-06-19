import { useEffect, useState } from 'react'

import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import Footer from '@/layout/footer/footer'
import Header from '@/layout/header/header'
import { useAppSelector } from '@/lib'
import { selectFavouriteItems } from '@/store/favouriteSlice'
import ClothingItem, { TClothingItem } from '@/widgets/home/ClothingItem'
import SearchBar from '@/widgets/home/SearchBar'

export default function Favourites() {
  const favouriteItems = useAppSelector(selectFavouriteItems)

  // const handleSearch = (query: string) => {
  //   searchItems(query)
  // }

  return (
    <div>
      <p className="mx-auto tracking-wider text-3xl font-bold my-10 text-center">
        Избранное
      </p>
      {/* <SearchBar onSearch={handleSearch} className="" /> */}
      <div className="flex-1 container grid gap-4">
        <div className="grid grid-cols-6 gap-6 auto-rows-max">
          {favouriteItems.map((item) => (
            <ClothingItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
