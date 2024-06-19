import { Heart } from 'lucide-react'
import { selectFavouriteItems } from '@/store/favouriteSlice'
import { deleteFavouriteItem, addFavouriteItem } from '@/store/favouriteSlice'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/lib'
import { toast } from 'sonner'

import { TClothingItem } from '@/widgets/home/ClothingItem'

type LikeButtonProps = { cardItem: TClothingItem }

export default function LikeButton({ cardItem }: LikeButtonProps) {
  const favouriteItems = useAppSelector(selectFavouriteItems)
  const dispatch = useAppDispatch()
  const isLiked = favouriteItems.find((item) => item.id === cardItem.id)
  const likeHandler = () => {
    if (isLiked) {
      dispatch(deleteFavouriteItem(cardItem.id))
      toast('Товар удален из избранного')
    } else {
      dispatch(addFavouriteItem(cardItem))
      toast('Товар добавлен в избранное')
    }
  }

  return (
    <Button
      size="icon"
      variant="link"
      className="h-max w-max select-none relative z-10"
      onClick={likeHandler}
    >
      <Heart
        size={24}
        strokeWidth={1.5}
        className={isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-black-500'}
      />
    </Button>
  )
}
