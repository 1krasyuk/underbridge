import { useAppSelector } from '@/lib'
import { selectFavouriteItems } from '@/store/favouriteSlice'
import ClothingItem, { TClothingItem } from '@/widgets/home/ClothingItem'
import SizeFilter from '@/widgets/home/SizeFilter'
import BrandFilter from '@/widgets/home/BrandFilter'
import ColorFilter from '@/widgets/home/ColorFilter'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export default function Favourites() {
  const favouriteItems = useAppSelector(selectFavouriteItems)

  // const handleSearch = (query: string) => {
  //   searchItems(query)
  // }

  return (
    <div>
      <p className="mx-auto tracking-wider text-4xl font-bold mt-10 mb-5 text-center">
        Избранное
      </p>

      <Popover>
        <Button
          variant="outline"
          className="sm:w-5/12 grid w-2/12 mx-auto  mb-5"
        >
          <PopoverTrigger className="text-base">Открыть фильтры</PopoverTrigger>
        </Button>
        <PopoverContent className="sm:grid w-full ">
          <div className="grid sm:grid-cols-1 sm:space-y-5 grid-cols-3 items-center text-center font-semibold mx-auto">
            <div className="  ">
              <SizeFilter />
            </div>
            <div className="sm:mx-auto ml-7 w-10/12 ">
              <BrandFilter />
            </div>
            <div className="sm:mx-auto ml-5 w-10/12 ">
              <ColorFilter />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* <SearchBar onSearch={handleSearch} className="" /> */}
      <div className="flex-1 container grid gap-4">
        <div className="grid sm:grid-cols-2 grid-cols-6 gap-6 auto-rows-max">
          {favouriteItems.map((item) => (
            <ClothingItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
