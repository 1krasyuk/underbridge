import Header from '@/layout/header/header'
import Footer from '@/layout/footer/footer'
import { useEffect, useState } from 'react'
import ClothingItem, { TClothingItem } from '@/widgets/home/ClothingItem'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import SearchBar from '@/widgets/home/SearchBar'
import useSearchItems from '@/widgets/home/useSearchItems'
import Filters from '@/widgets/home/filters' // Импортируем компонент Filters

export default function Shop() {
  const { filteredClothingData, searchItems } = useSearchItems()
  const [clothingData, setClothingData] = useState<TClothingItem[]>([])
  const [filteredData, setFilteredData] = useState<TClothingItem[]>([])

  const handleSearch = (query: string) => {
    searchItems(query)
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <SearchBar onSearch={handleSearch} className="mt-10" />
      <div className="flex-1 container w-2/3 grid grid-cols-[1fr_3fr] gap-4 ">
        <Filters
          clothingData={clothingData}
          setFilteredClothingData={setFilteredData}
        />
        <div className="grid grid-cols-4 gap-6">
          {filteredClothingData.map((item) => (
            <ClothingItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
