import { useEffect, useState } from 'react'
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where
} from 'firebase/firestore'

import { getStorage } from 'firebase/storage'
import { TClothingItem } from './ClothingItem'

const useSearchItems = () => {
  const [clothingData, setClothingData] = useState<TClothingItem[]>([])
  const [filteredClothingData, setFilteredClothingData] = useState<
    TClothingItem[]
  >([])
  const db = getFirestore()
  const storage = getStorage()

  const searchItems = async (search: string, size?: string) => {
    const q = size
      ? query(collection(db, 'products'), where('size', '==', size))
      : query(collection(db, 'products'))
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

  useEffect(() => {
    searchItems('')
  }, [db, storage])

  return { filteredClothingData, searchItems }
}

export default useSearchItems
