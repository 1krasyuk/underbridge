import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { getAuth, User } from 'firebase/auth'
import { Heart, Search, ShoppingBag, User as UserIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const auth = getAuth()
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
  }, [])

  const formSchema = z.object({
    search: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    searchParams.set('search', values.search)
    navigate(`/shop?${searchParams.toString()}`)
    setIsSearchOpen(false)
    console.log(values)
  }

  return (
    <div className=" container flex flex-col w-full uppercase select-none">
      <div className=" flex  flex-row justify-between">
        <Link to="/">
          <p className="font-bold  tracking-widest sm:text-2xl text-3xl my-2 text-red-500">
            UNDERBRIDGE
          </p>
        </Link>

        <div className="sm:ml-5 sm:space-x-2 flex flex-row justify-between items-center space-x-5 ">
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger>
              <Search
                size={26}
                strokeWidth={1.5}
                className="cursor-pointer focus:outline-none transition-transform duration-100 transform-gpu hover:scale-150 "
              />
            </DialogTrigger>
            <DialogContent className="sm:w-5/6 ">
              <DialogHeader>
                <DialogTitle className=" mb-2">Поиск</DialogTitle>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel /> */}
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Input {...field} />
                              <Button size="icon" variant="ghost">
                                <Search size={32} />
                              </Button>
                            </div>
                          </FormControl>
                          {/* <FormDescription /> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Link to="/favourites">
            <Heart
              size={26}
              strokeWidth={1.5}
              className="cursor-pointer focus:outline-none transition-transform duration-100 transform-gpu hover:scale-150"
            />
          </Link>
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

      <div className="sm:hidden flex flex-row justify-between border-y-2 tracking-widest text-sm font-bold ">
        <p className="my-4 text-right  ">
          <Link to="/brands"> Бренды </Link>
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
