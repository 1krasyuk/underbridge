import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Button
      size="icon"
      variant="link"
      onClick={() => setIsLiked(!isLiked)}
      className="h-max w-max"
    >
      <Heart
        size={24}
        strokeWidth={1.5}
        className={isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-black-500'}
      />
    </Button>
  )
}
