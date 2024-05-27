import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'

export interface TClothingItem {
  id: string
  name: string
  brand: string
  ImgURL: string
  size: string
  price: string
  isLiked: boolean
  color: string
}

interface ClothingItemProps {
  item: TClothingItem
}

const ClothingItem: React.FC<ClothingItemProps> = ({ item }) => {
  return (
    <Link to={`/product/${item.id}`}>
      <div className="flex flex-col p-1  w-full h-full border-2 border-transparent transition-all duration-500 hover:border-black ">
        <div className="w-full h-64 mb-4">
          <img
            src={item.ImgURL}
            alt={item.name}
            className="w-full h-full object-cover select-none"
          />
        </div>
        <hr></hr>
        <div className="flex flex-1 mt-2 ">
          <div className="flex flex-col w-full justify-between ">
            <div>
              <div className="flex justify-between ">
                <p className="tracking-wide text-md font-bold uppercase truncate">
                  {item.name}
                </p>
                <p className="tracking-widest text-md font-semibold uppercase mr-1 select-none">
                  {item.size}
                </p>
              </div>
              <p className="tracking-widest text-sm font-semibold uppercase">
                {item.brand}
              </p>
            </div>
            <div className="flex justify-between items-end">
              <p className="tracking-wider text-md font-bold uppercase select-none">
                {item.price} ₽
              </p>
              <LikeButton id={item.id} isLiked={item.isLiked} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ClothingItem
