import { useEffect, useState } from 'react'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export interface ClothingItem {
  id: number
  name: string
  brand: string
  imageUrl: string
  size: string
  price: string
}

const useSearchItems = () => {
  const [clothingData, setClothingData] = useState<ClothingItem[]>([])
  const [filteredClothingData, setFilteredClothingData] = useState<
    ClothingItem[]
  >([])
  const db = getFirestore()
  const storage = getStorage()

  const searchItems = async (query: string) => {
    const querySnapshot = await getDocs(collection(db, 'products'))
    const data: ClothingItem[] = []
    querySnapshot.forEach((doc) => {
      data.push({ id: parseInt(doc.id), ...doc.data() } as ClothingItem)
    })

    setClothingData(data)

    const filteredItems = data.filter((item) => {
      return (
        (item.name && item.name.toLowerCase().includes(query.toLowerCase())) ||
        (item.brand && item.brand.toLowerCase().includes(query.toLowerCase()))
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
