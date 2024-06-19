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

const BrandFilter = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [brandsAndDesignersList, setBrandsAndDesignersList] = useState<any[]>(
    []
  )
  const [searchParams, setSearchParams] = useSearchParams()

  const handleButtonClick = async () => {
    const q = query(collection(db, 'products'), where('brand', '==', 'S'))
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

  const brandFilterHandler = (value: string) => {
    searchParams.set('brand', value)
    setSearchParams(searchParams)
  }

  const brand = searchParams.get('brand') ?? ''

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBrandsAndDesignersList()
      setBrandsAndDesignersList(data.map((item: DocumentData) => item.name))
    }

    fetchData()
  }, [])

  return (
    <div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="brand">Бренд</Label>
        <Select onValueChange={brandFilterHandler}>
          <SelectTrigger id="brand">
            <SelectValue placeholder="Выберите бренд" />
          </SelectTrigger>
          <SelectContent position="popper">
            {brandsAndDesignersList.map((brand, index) => (
              <SelectItem id={brand} key={index} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default BrandFilter
