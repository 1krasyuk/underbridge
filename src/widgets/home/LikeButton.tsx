import { Heart } from 'lucide-react'
import { doc, updateDoc } from 'firebase/firestore'
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
import Product from '@/pages/product'

type LikeButtonProps = { isLiked: boolean; id: string }

export default function LikeButton({ isLiked, id }: LikeButtonProps) {
  const productsRef = doc(db, 'products', '2ItgoCqpcGPgPO5AdasC')

  const likeHandler = async () => {
    await updateDoc(productsRef, {
      isLiked: true
    })
  }

  return (
    <Button
      size="icon"
      variant="link"
      onClick={likeHandler}
      className="h-max w-max select-none"
    >
      <Heart
        size={24}
        strokeWidth={1.5}
        className={isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-black-500'}
      />
    </Button>
  )
}
