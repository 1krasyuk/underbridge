import { useEffect, useState } from 'react'
import getBrandsAndDesignersList from '@/widgets/home/getBrandsAndDesignersList'
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData
} from 'firebase/firestore'
import { db } from 'firebase' // Замените на ваш файл конфигурации Firebase
import { Label } from '@radix-ui/react-label'
import { useSearchParams } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select'

interface Product {
  id: string
  name: string
  price: number
  size: string
  brand: string // Предполагается, что каждый товар имеет поле размера
  // Другие поля товара
}
import getColorsList from './getColorsList'

const ColorFilter = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [ColorsList, setColorsList] = useState<any[]>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const handleButtonClick = async () => {
    const q = query(collection(db, 'products'), where('color', '==', 'S'))
    const querySnapshot = await getDocs(q)

    const products: Product[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      products.push({
        id: doc.id,
        name: data.name,
        price: data.price,
        size: data.size,
        brand: data.brand
      })
    })

    setFilteredProducts(products)
  }

  const colorFilterHandler = (value: string) => {
    searchParams.set('color', value)
    setSearchParams(searchParams)
  }

  const color = searchParams.get('color') ?? ''

  useEffect(() => {
    const fetchData = async () => {
      const data = await getColorsList()
      setColorsList(data.map((item: DocumentData) => item.name))
    }

    fetchData()
  }, [])

  return (
    <div>
      <div className="flex flex-col space-y-1.5 font-semibold">
        <Label htmlFor="color">Цвет</Label>
        <Select onValueChange={colorFilterHandler}>
          <SelectTrigger id="color">
            <SelectValue placeholder="Выберите цвет" />
          </SelectTrigger>
          <SelectContent position="popper">
            {ColorsList.map((color, index) => (
              <SelectItem id={color} key={index} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default ColorFilter
