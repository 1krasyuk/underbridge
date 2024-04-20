import { Link } from 'react-router-dom'
import { Heart, Search, ShoppingBag, User, Instagram } from 'lucide-react'

export default function Header() {
  return (
    <div className="container w-2/3 flex flex-col uppercase">
      <div className="flex-row justify-between">
        <Link to="/">
          <p className="font-bold tracking-widest text-3xl my-2 text-red-500">
            UNDERBRIDGE
          </p>
        </Link>

        <div className="flex-row justify-between items-center space-x-5 ">
          <Search size={26} strokeWidth={1.5} />
          <Link to="/favourites">
            <Heart size={26} strokeWidth={1.5} />
          </Link>
          <Link to="/cart">
            <ShoppingBag size={26} strokeWidth={1.5} />
          </Link>
          <Link to="/sign-in">
            <User size={26} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <div className="flex-row justify-between border-y-2 tracking-widest text-sm font-bold">
        <p className="my-4 text-right  ">
          <Link to="/shop"> Бренды </Link>
        </p>
        <p className="my-4 text-right  ">
          <Link to="/shop"> Мужское </Link>
        </p>
        <p className="my-4 text-right  ">
          <Link to="/shop"> Женское</Link>
        </p>
        <p className="my-4 text-right  ">
          <Link to="/shop"> Аксессуары </Link>
        </p>
        <p className="my-4 text-right  ">
          <Link to="/shop"> Обувь </Link>
        </p>
        <p className="my-4 text-right  ">
          <Link to="/shop" className="text-red-500">
            Скидки
          </Link>
        </p>
      </div>
    </div>
  )
}
