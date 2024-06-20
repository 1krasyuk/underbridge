import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import BrandFilter from '@/widgets/home/BrandFilter'
import ClothingItem, { TClothingItem } from '@/widgets/home/ClothingItem'
import SizeFilter from '@/widgets/home/SizeFilter' // Импортируем компонент Filter
import useSearchItems from '@/widgets/home/useSearchItems'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import ColorFilter from '@/widgets/home/ColorFilter'

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
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const color = searchParams.get('color')

    searchItems({
      search: searchQuery ?? '',
      size: size || undefined,
      category: category || undefined,
      brand: brand || undefined,
      color: color || undefined
    })
    // searchItems(searchQuery ?? '', category || undefined)
  }, [searchParams])

  return (
    <div className="sm:p-2 flex-1 sm:grid-cols-1 sm:grid-rows-auto container grid grid-cols-[1fr_3fr] gap-4 sm:mt-0 mt-16">
      <div className="space-y-7">
        <p className="sm:text-xl sm:hidden font-semibold text-center text-2xl underline">
          Фильтры
        </p>
        <SizeFilter />
        <BrandFilter />
        <ColorFilter />
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
