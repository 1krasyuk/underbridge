import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import LikeButton from './LikeButton'

export interface TClothingItem {
  id: number
  name: string
  brand: string
  imageUrl: string
  size: string
  price: string
}

interface ClothingItemProps {
  item: TClothingItem
}

const ClothingItem: React.FC<ClothingItemProps> = ({ item }) => {
  return (
    <div className="flex flex-col">
      <div className="bg-red-500 w-full h-64 mb-4" />
      <hr></hr>
      <div className="flex justify-between mt-2">
        <div className="flex flex-col ">
          <p className="tracking-wide text-md font-bold"> {item.name} </p>
          <p className="tracking-widest text-sm font-semibold">{item.brand}</p>
          <p className="tracking-wider text-md font-bold">{item.price} ₽</p>
        </div>

        <div className=" flex flex-col justify-between items-center ">
          <p className="tracking-widest text-md font-semibold">{item.size}</p>
          <LikeButton />
        </div>
      </div>
    </div>
  )
}

export default ClothingItem
