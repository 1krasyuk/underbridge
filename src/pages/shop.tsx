import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import BrandFilter from '@/widgets/home/BrandFilter'
import ClothingItem, { TClothingItem } from '@/widgets/home/ClothingItem'
import SizeFilter from '@/widgets/home/SizeFilter' // Импортируем компонент Filter
import useSearchItems from '@/widgets/home/useSearchItems'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function Shop() {
  const { filteredClothingData, searchItems } = useSearchItems()
  const [filteredProducts, setFilteredProducts] = useState<TClothingItem[]>([])
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const resetFilter = () => {
    navigate('/shop')
  }

  useEffect(() => {
    const searchQuery = searchParams.get('search')
    const size = searchParams.get('size')
    const brand = searchParams.get('brand')
    searchItems(searchQuery ?? '', size || undefined)
    // searchItems(searchQuery ?? '', brand || undefined)
  }, [searchParams])

  const handleSearch = (query: string) => {
    searchItems(query)
  }

  return (
    <div className="flex-1 sm:grid-cols-1 sm:grid-rows-auto container grid grid-cols-[1fr_3fr] gap-4 sm:mt-12 mt-24">
      <div className="space-y-7">
        <SizeFilter />
        <BrandFilter />
        <Button onClick={resetFilter} className="w-full">
          Сбросить фильтры
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-4 gap-6 auto-rows-max">
        {filteredClothingData.map((item) => (
          <ClothingItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
