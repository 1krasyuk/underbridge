import Header from '@/layout/header/header'
import Footer from '@/layout/footer/footer'
import { Link } from 'react-router-dom'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import getBrandsAndDesignersList from '@/widgets/home/getBrandsAndDesignersList'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function AddProduct() {
  const [brandsAndDesignersList, setBrandsAndDesignersList] = useState<any[]>(
    []
  )

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBrandsAndDesignersList()
      setBrandsAndDesignersList(data.map((item: DocumentData) => item.name))
    }

    fetchData()
  }, [])

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-[600px] mt-10">
        <CardHeader>
          <CardTitle>Добавить товар</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Название</Label>
                <Input id="name" placeholder="Введите название товара" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="brand">Бренд</Label>
                <Select>
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Выберите бренд" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {brandsAndDesignersList.map((brand, index) => (
                      <SelectItem key={index} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Категория</Label>
                <Input id="category" placeholder="Введите категорию товара" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Описание</Label>
                <Textarea
                  placeholder="Введите описание товара"
                  id="description"
                />
              </div>

              <Select>
                <Label htmlFor="Color">Цвет</Label>

                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите цвет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="white">Белый</SelectItem>
                    <SelectItem value="black">Черный</SelectItem>
                    <SelectItem value="red">Красный</SelectItem>
                    <SelectItem value="blue">Синий</SelectItem>
                    <SelectItem value="green">Зеленый</SelectItem>
                    <SelectItem value="yellow">Желтый</SelectItem>
                    <SelectItem value="brown">Коричневый</SelectItem>
                    <SelectItem value="purple">Фиолетовый</SelectItem>
                    <SelectItem value="pink">Розовый</SelectItem>
                    <SelectItem value="grey">Серый</SelectItem>
                    <SelectItem value="orange">Оранжевый</SelectItem>
                    <SelectItem value="beige">Бежевый</SelectItem>
                    <SelectItem value="combo">Комбинированный</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Label htmlFor="Size">Размер</Label>

              <RadioGroup defaultValue="option-one" className="flex space-x-4">
                <div className="flex flex-col items-center space-y-2 ml-2">
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

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Цена</Label>
                <Input id="price" placeholder="Введите Цену товара" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Отменить</Button>
          <Button>Добавить</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
