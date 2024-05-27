import Header from '@/layout/header/header'
import Footer from '@/layout/footer/footer'
import { Button } from '@/components/ui/button'
import { addCartItem, deleteCartItem, selectCartItems } from '@/store/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib'
import { useParams } from 'react-router-dom'
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import { db } from 'firebase' // Замените на ваш файл конфигурации Firebase
import { useEffect, useState } from 'react'
import { TClothingItem } from '@/widgets/home/ClothingItem'

export default function Product() {
  const dispatch = useAppDispatch()

  const [product, setProduct] = useState<TClothingItem>()

  const [isLoading, setIsLoading] = useState(false)

  const [isError, setIsError] = useState(false)

  const { id } = useParams()

  const cartItems = useAppSelector(selectCartItems)

  const isInCart = cartItems.find((item) => item.id === id)

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
          ImgURL: data.ImgURL
        })
      })
      setProduct(products[0])
      setIsLoading(false)

      //   console.log(querySnapshot)
      //     const doc = Object.entries(
      //       querySnapshot
      //     )[0] as unknown as QueryDocumentSnapshot<DocumentData, DocumentData>
      //     const data = doc.data()
      //     setProduct(data as TClothingItem)
      //     setIsLoading(false)
    }

    fetchData().catch(() => setIsError(true))
  }, [])

  console.log(product)

  if (isLoading) {
    return <p className="">ЗАГРУЗКА...</p>
  }

  if (isError || !product) {
    return <p>404</p>
  }

  return (
    <div className="h-screen flex flex-col ">
      <Header />

      {isInCart ? (
        <Button
          type="submit"
          className="m-auto w-48"
          onClick={() => dispatch(deleteCartItem(product.id))}
        >
          Удалить из корзины
        </Button>
      ) : (
        <Button
          type="submit"
          className="m-auto w-48"
          onClick={() => dispatch(addCartItem(product))}
        >
          Добавить в корзину
        </Button>
      )}
      <Footer />
    </div>
  )
}
