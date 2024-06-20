import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useAppDispatch, useAppSelector } from '@/lib'
import { clearCart, deleteCartItem, selectCartItems } from '@/store/cartSlice'

export default function Cart() {
  const cartItems = useAppSelector(selectCartItems)

  const dispatch = useAppDispatch()

  const summ = cartItems.reduce((acc, current) => acc + +current.price, 0)

  return (
    <div className="sm:grid-cols-1 grid-cols-[3fr_1fr]  container grid ">
      <div className=" ">
        <div className="sm:justify-center h-28 flex justify-between items-center">
          <p className=" mx-6 text-4xl font-semibold tracking-wide uppercase ">
            Корзина
          </p>
          <Link to="/shop">
            <p className="sm:hidden font-semibold  underline">
              Продолжить покупки
            </p>
          </Link>
        </div>

        <Table className="sm:text-base text-lg ">
          <TableHeader>
            <TableRow>
              <TableHead className="sm:px-0 px-16">Товар</TableHead>
              <TableHead className="sm:px-0 px-20">Описание</TableHead>
              <TableHead className="sm:hidden text-center">
                Количество
              </TableHead>
              <TableHead className="text-left">Цена</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="px-0">
                  <img
                    src={item.ImgURL}
                    alt={item.name}
                    className="sm:h-36 sm:w-full h-64 w-48 object-cover "
                  />
                </TableCell>
                <TableCell className="sm:px-2 px-20 sm:space-y-2">
                  <div className="font-bold sm:text-sm"> {item.name} </div>
                  <div className="font-bold sm:text-sm ">{item.brand}</div>
                  <div className="font-bold sm:text-sm"> {item.size}</div>
                  <div className="font-bold sm:text-sm"> {item.color}</div>
                </TableCell>
                <TableCell className="sm:hidden text-center">1</TableCell>
                <TableCell className="text-left sm:text-xs ">
                  ₽ {item.price}
                </TableCell>
                <TableCell className="w-4">
                  <Button
                    type="submit"
                    className="m-auto w-12 px-10"
                    onClick={() => dispatch(deleteCartItem(item.id))}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter> */}
        </Table>
      </div>
      <div className="sm:text-2xl col-span-1 font-bold text-3xl sm:mx-0 mx-6  sm:mt-6 mt-28">
        Всего: ₽{summ}
        <Link to="/checkout">
          <Button className="sm:mt-6 mt-10 w-full">Оформить заказ</Button>
        </Link>
      </div>
      <div className="sm:mx-0">
        <Button
          className="sm:w-full  w-48 mt-5"
          onClick={() => dispatch(clearCart())}
        >
          ОЧИСТИТЬ КОРЗИНУ
        </Button>
      </div>
    </div>
  )
}
