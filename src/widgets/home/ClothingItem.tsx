import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

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
  description: string
}

interface ClothingItemProps {
  item: TClothingItem
}

const ClothingItem: React.FC<ClothingItemProps> = ({ item }) => {
  return (
    <div className="sm:border-none sm:pr-3 w-full flex flex-col p-1 h-full  border-2 border-transparent transition-all duration-500 hover:border-black relative">
      <div className="sm:space-x-1 w-full h-64 mb-4">
        <img
          src={item.ImgURL}
          alt={item.name}
          className="w-full h-full object-cover select-none"
        />
      </div>
      <hr className=" " />
      <div className="flex flex-1 mt-2 ">
        <div className="flex flex-col w-full justify-between ">
          <div>
            <div className="flex justify-between ">
              <p className="sm:text-md tracking-wide text-lg font-bold uppercase truncate">
                {item.name}
              </p>
              <p className="tracking-widest text-lg font-semibold uppercase mr-1 select-none">
                {item.size}
              </p>
            </div>
            <p className="sm:text-sm tracking-widest text-sm font-semibold uppercase">
              {item.brand}
            </p>
          </div>
          <div className="flex justify-between items-end">
            <p className="sm:text-sm tracking-wider text-md font-bold uppercase select-none">
              {item.price} ₽
            </p>
            <LikeButton cardItem={item} />
          </div>
        </div>
      </div>
      <Link
        to={`/product/${item.id}`}
        className="absolute w-full h-full top-0 left-0"
      />
    </div>
  )
}

export default ClothingItem
