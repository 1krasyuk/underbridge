import { useEffect, useState } from 'react'
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  or
} from 'firebase/firestore'

import { TClothingItem } from './ClothingItem'

const useSearchItems = () => {
  const [clothingData, setClothingData] = useState<TClothingItem[]>([])
  const [filteredClothingData, setFilteredClothingData] = useState<
    TClothingItem[]
  >([])
  const db = getFirestore()

  const searchItems = async ({
    search,
    size,
    category,
    color,
    brand
  }: {
    search: string
    size?: string
    category?: string
    color?: string
    brand?: string
  }) => {
    let q = collection(db, 'products')

    if (size) {
      // @ts-ignore
      q = query(q, where('size', '==', size))
    }

    if (category) {
      // @ts-ignore
      q = query(q, where('category', '==', category))
    }

    if (brand) {
      // @ts-ignore
      q = query(q, where('brand', '==', brand))
    }

    if (color) {
      // @ts-ignore
      q = query(q, where('color', '==', color))
    }

    const querySnapshot = await getDocs(q)

    const data: TClothingItem[] = []
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() } as TClothingItem)
    })

    setClothingData(data)

    const filteredItems = data.filter((item) => {
      return (
        (item.name && item.name.toLowerCase().includes(search.toLowerCase())) ||
        (item.brand && item.brand.toLowerCase().includes(search.toLowerCase()))
      )
    })

    setFilteredClothingData(filteredItems)
  }

  return { filteredClothingData, searchItems }
}

export default useSearchItems
