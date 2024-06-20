import { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from 'firebase' // Замените на ваш файл конфигурации Firebase
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@radix-ui/react-label'
import useSearchItems from './useSearchItems'
import { useSearchParams } from 'react-router-dom'

interface Product {
  id: string
  name: string
  price: number
  size: string
}

const SizeFilter = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const [searchParams, setSearchParams] = useSearchParams()

  const handleButtonClick = async () => {
    const q = query(collection(db, 'products'), where('size', '==', 'L'))
    const querySnapshot = await getDocs(q)

    const products: Product[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      products.push({
        id: doc.id,
        name: data.name,
        price: data.price,
        size: data.size
      })
    })

    setFilteredProducts(products)
  }

  const sizeFilterHandler = (value: string) => {
    searchParams.set('size', value)
    setSearchParams(searchParams)
  }

  const size = searchParams.get('size') ?? ''

  return (
    <div className="select-none font-semibold">
      <Label>Размер</Label>
      <RadioGroup
        onValueChange={sizeFilterHandler}
        value={size}
        className="flex space-x-4 mt-2"
      >
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="XS">XS</Label>
          <RadioGroupItem value="XS" id="XS" />
        </div>
        <div className="flex flex-col  items-center space-y-2">
          <Label htmlFor="S">S</Label>
          <RadioGroupItem value="S" id="S" />
        </div>
        <div className="flex flex-col  items-center space-y-2">
          <Label htmlFor="M">M</Label>
          <RadioGroupItem value="M" id="M" />
        </div>
        <div className="flex flex-col  items-center space-y-2">
          <Label htmlFor="L">L</Label>
          <RadioGroupItem value="L" id="L" />
        </div>
        <div className="flex flex-col  items-center space-y-2">
          <Label htmlFor="XL">XL</Label>
          <RadioGroupItem value="XL" id="XL" />
        </div>
        <div className="flex flex-col  items-center space-y-2">
          <Label htmlFor="XXL">XXL</Label>
          <RadioGroupItem value="XXL" id="XXL" />
        </div>
      </RadioGroup>
    </div>
  )
}

export default SizeFilter
