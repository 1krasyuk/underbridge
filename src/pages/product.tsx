import { useEffect, useState } from 'react'

import { cx } from 'class-variance-authority'
import { db } from 'firebase'
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where
} from 'firebase/firestore'
import { Heart } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { useAppDispatch, useAppSelector } from '@/lib'
import { addCartItem, deleteCartItem, selectCartItems } from '@/store/cartSlice'
import {
  addFavouriteItem,
  deleteFavouriteItem,
  selectFavouriteItems
} from '@/store/favouriteSlice'
import { TClothingItem } from '@/widgets/home/ClothingItem'
import LikeButton from '@/widgets/home/LikeButton'

export default function Product() {
  const dispatch = useAppDispatch()

  const [product, setProduct] = useState<TClothingItem>()

  const [isLoading, setIsLoading] = useState(false)

  const [isError, setIsError] = useState(false)

  const { id } = useParams()

  const cartItems = useAppSelector(selectCartItems)

  const isInCart = cartItems.find((item) => item.id === id)

  const favouriteItems = useAppSelector(selectFavouriteItems)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const q = query(collection(db, 'products'), where('id', '==', id))
      const querySnapshot = await getDocs(q)

      const products: TClothingItem[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        products.push({
          id: data.id,
          name: data.name,
          price: data.price,
          size: data.size,
          color: data.color,
          brand: data.brand,
          isLiked: data.IsLiked,
          ImgURL: data.ImgURL,
          description: data.description
        })
      })
      setProduct(products[0])
      setIsLoading(false)
    }

    fetchData().catch(() => setIsError(true))
  }, [])

  if (isLoading) {
    return <p className="">ЗАГРУЗКА...</p>
  }

  console.log(product)
  if (isError || !product) {
    return <p>404</p>
  }

  const isLiked = favouriteItems.find((item) => item.id === product.id)
  const likeHandler = () => {
    if (isLiked) {
      dispatch(deleteFavouriteItem(product.id))
      toast('Товар удален из избранного')
    } else {
      dispatch(addFavouriteItem(product))
      toast('Товар добавлен в избранное')
    }
  }

  return (
    <div className="grid grid-cols-[2.5fr_1fr] container mt-28">
      <div className="flex justify-center">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="  ">
              <img
                src={product.ImgURL}
                alt={product.name}
                className="w-full h-[550px]  object-cover  select-none"
              />
            </CarouselItem>
            {/* <CarouselItem>..lfkjhgofdlgdf.</CarouselItem>
            <CarouselItem>...</CarouselItem> */}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex flex-col mt-10  ">
        <div className="tracking-wide text-2xl font-semibold  underline mb-8">
          {product.name}
        </div>
        <div className="space-y-2 mb-8">
          <div className="tracking-wide text-xl   ">Бренд: {product.brand}</div>
          <div className="tracking-wide text-xl   ">Размер: {product.size}</div>
          <div className="tracking-wide text-xl  ">Цвет: {product.color}</div>
          <div className="tracking-wide text-xl  ">{product.description}</div>
        </div>
        <div className="tracking-wide text-xl font-bold mb-5 text-red-500 ">
          ₽ {product.price}
        </div>
        <div className="flex flex-row">
          {isInCart ? (
            <Button
              type="submit"
              className=" w-full h-12 uppercase"
              onClick={() => {
                dispatch(deleteCartItem(product.id))
                toast('Товар удален из корзины')
              }}
            >
              Удалить из корзины
            </Button>
          ) : (
            <Button
              type="submit"
              className=" w-full h-12 uppercase"
              onClick={() => {
                dispatch(addCartItem(product))
                toast('Товар добавлен в корзину')
              }}
            >
              Добавить в корзину
            </Button>
          )}

          <Button
            variant="outline"
            className={cx(
              'h-12 w-max border-5   border-black hover:border-red-500 hover:bg-white',
              {
                'border-red-500': isLiked
              }
            )}
            onClick={likeHandler}
          >
            <Heart
              size={30}
              strokeWidth={1.5}
              className={
                isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-black-500'
              }
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
