import Header from '@/layout/header/header'
import Footer from '@/layout/footer/footer'
import { useEffect, useState } from 'react'
import ClothingItem, { TClothingItem } from '@/widgets/home/ClothingItem'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import SearchBar from '@/widgets/home/SearchBar'
import useSearchItems from '@/widgets/home/useSearchItems'

export default function Favourites() {
  const { filteredClothingData, searchItems } = useSearchItems()

  const handleSearch = (query: string) => {
    searchItems(query)
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <p className="mx-auto tracking-wider text-3xl font-bold my-10">
        Избранное
      </p>
      <SearchBar onSearch={handleSearch} className="" />
      <div className="flex-1 container w-2/3 grid gap-4">
        <div className="grid grid-cols-6 gap-6">
          {filteredClothingData.map((item) => (
            <ClothingItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
