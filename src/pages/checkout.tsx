import { Input } from '@/components/ui/input'
import { CheckoutForm } from '@/widgets/home/CheckoutForm'
import { Heart, Search, ShoppingBag, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

import Footer from '@/layout/footer/footer'
import { Link } from 'react-router-dom'

export default function CheckoutPage() {
  return (
    <div className="  flex flex-col bg-gradient-to-r from-white from-50% to-gray-100 to-50%">
      <div className="bg-white">
        <div className="container flex-row justify-between bg-white">
          <Link to="/">
            <p className="font-bold tracking-widest text-3xl my-2 text-red-500">
              UNDERBRIDGE
            </p>
          </Link>
          <div className="flex-row justify-between items-center space-x-5 ">
            <Link to="/cart">
              <ShoppingBag
                size={26}
                strokeWidth={1.5}
                className="cursor-pointer focus:outline-none transition-transform duration-100 transform-gpu hover:scale-150"
              />
            </Link>
            <Link to="/sign-in">
              <UserIcon
                size={26}
                strokeWidth={1.5}
                className="cursor-pointer focus:outline-none transition-transform duration-100 transform-gpu hover:scale-150"
              />
            </Link>
          </div>
        </div>
      </div>
      <hr></hr>

      <div className="container grid grid-cols-2 ">
        <div className=" w-11/12">
          <h1 className="text-4xl font-semibold my-8 tracking-wider text-center">
            Быстрая оплата
          </h1>

          <CheckoutForm />

          <p className="my-4 tracking-tight text-base font-medium">
            Уже есть аккаунт?
            <Link
              to="/sign-in"
              className="underline decoration-solid underline-offset-4 ml-1"
            >
              Войти
            </Link>
          </p>
        </div>

        <div className=" ">
          <p>PDSOGPSPG</p>
        </div>
      </div>
    </div>
  )
}
