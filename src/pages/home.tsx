import { useEffect, useState } from 'react'

import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { Link } from 'react-router-dom'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import BrandsList from '@/widgets/home/brandsWidget'
import CategoriesList from '@/widgets/home/category'
import ClothingItem, { TClothingItem } from '@/widgets/home/ClothingItem'

export default function Home() {
  const [clothingData, setClothingData] = useState<TClothingItem[]>([])
  const db = getFirestore() // Получение доступа к Cloud Firestore
  const storage = getStorage() // Получение доступа к Firebase Storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получение данных о товарах из Cloud Firestore
        const querySnapshot = await getDocs(collection(db, 'products'))
        const data: TClothingItem[] = []
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as TClothingItem)
        })

        // Получение URL-адресов изображений из Firebase Storage
        // const dataWithImages = await Promise.all(data.map(async item => {
        //   // Создаем ссылку на изображение, используя путь, хранящийся в imageUrlPath
        //   const imageRef = ref(storage, item.imageUrlPath);
        //   // Получаем URL загрузки для ссылки на изображение
        //   const imageUrl = await getDownloadURL(imageRef);
        //   // Обновляем элемент с imageUrl
        //   return { ...item, imageUrl };
        // }));

        setClothingData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [db, storage])

  return (
    <div className="sm:w-full relative container flex flex-col mt-7">
      <div className="">
        <p className=" my-4 text-left tracking-wide  text-base font-medium uppercase">
          Категории
        </p>

        <CategoriesList />
      </div>

      <div>
        <div className=" flex justify-between">
          <p className=" sm:tracking-tight my-4 text-left tracking-wide text-base font-medium uppercase">
            Бренды и дизайнеры
          </p>

          <Link to="/brands">
            <p className="my-4 text-left tracking-wide text-base font-medium text-red-500">
              Остальные
            </p>
          </Link>
        </div>

        <BrandsList />
      </div>

      <div className="flex flex-col">
        <div className=" mt-10 flex justify-between">
          <p className="sm:my-0 sm:tracking-tight sm:text-2xl my-4 text-left tracking-wide text-base font-medium uppercase">
            Новинки
          </p>
          <Link to="/shop">
            <p className="my-4 text-left tracking-wide text-base font-medium text-red-500">
              Остальные
            </p>
          </Link>
        </div>

        <Carousel className="w-[calc(100%-90px)] grid grid-cols-1 self-center">
          <CarouselContent className="grid auto-cols-max grid-flow-col">
            {clothingData.map((item) => (
              <CarouselItem key={item.id}>
                <ClothingItem item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
