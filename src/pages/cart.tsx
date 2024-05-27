import Header from '@/layout/header/header'
import Footer from '@/layout/footer/footer'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/lib'
import { selectCartItems } from '@/store/cartSlice'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/lib'
import { clearCart, deleteCartItem } from '@/store/cartSlice'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default function Cart() {
  const cartItems = useAppSelector(selectCartItems)

  const dispatch = useAppDispatch()

  return (
    <div className="h-screen flex flex-col select-none">
      <Header />
      <div className="">
        <div className="  container w-2/3 grid grid-cols-4">
          <div className="h-28 col-span-3  flex justify-between items-center">
            <p className=" mx-6  text-4xl font-semibold  tracking-wide uppercase ">
              Корзина
            </p>
            <Link to="/shop">
              <p className="font-semibold  underline">Продолжить покупки</p>
            </Link>
          </div>
          <div className="col-span-3 ">
            <Table className="text-lg ">
              <TableHeader>
                <TableRow>
                  <TableHead className="">Товар</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead className="text-center">Количество</TableHead>
                  <TableHead className="text-left">Цена</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-medium ">
                      <img
                        src={item.ImgURL}
                        alt={item.name}
                        className="h-64 w-48 object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-bold h-0"> {item.name} </div>
                      <br />
                      {item.brand} <br />
                      {item.size} <br />
                      {item.color}
                    </TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-left">₽ {item.price}</TableCell>
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
          <div className="col-span-1 font-bold text-3xl mx-6">
            Сумма заказа:
          </div>
          <Button className="w-48 mt-5" onClick={() => dispatch(clearCart())}>
            ОЧИСТИТЬ КОРЗИНУ
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
