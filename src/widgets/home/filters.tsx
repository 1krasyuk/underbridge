import { SetStateAction, Dispatch, useState } from 'react'

interface TClothingItem {
  id: string
  name: string
  size: string
  // Другие свойства товара...
}

interface FiltersProps {
  clothingData: TClothingItem[] | undefined
  setFilteredClothingData: React.Dispatch<
    React.SetStateAction<TClothingItem[] | undefined>
  >
}

const Filters: React.FC<FiltersProps> = ({
  clothingData,
  setFilteredClothingData
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('')

  // Функция для фильтрации товаров по размеру
  const filterBySize = (size: string) => {
    setSelectedSize(size)
    if (clothingData) {
      if (size === '') {
        setFilteredClothingData(clothingData)
      } else {
        const filtered = clothingData.filter(
          (item) => item.size.toLowerCase() === size.toLowerCase()
        )
        setFilteredClothingData(filtered)
      }
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Фильтры:</h2>
      <div className="flex flex-col space-y-2">
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedSize === 'S' ? 'bg-gray-200' : 'bg-white'
          }`}
          onClick={() => filterBySize('S')}
        >
          Размер S
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedSize === 'M' ? 'bg-gray-200' : 'bg-white'
          }`}
          onClick={() => filterBySize('M')}
        >
          Размер M
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedSize === 'L' ? 'bg-gray-200' : 'bg-white'
          }`}
          onClick={() => filterBySize('L')}
        >
          Размер L
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedSize === 'XL' ? 'bg-gray-200' : 'bg-white'
          }`}
          onClick={() => filterBySize('XL')}
        >
          Размер XL
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedSize === '' ? 'bg-gray-200' : 'bg-white'
          }`}
          onClick={() => filterBySize('')}
        >
          Сбросить фильтр
        </button>
      </div>
    </div>
  )
}

export default Filters
