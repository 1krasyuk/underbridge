import { useState } from 'react'
import { Link } from 'react-router-dom'

const brandsAndDesigners = [
  { name: 'Gucci', slug: 'Gucci' },
  'Chanel',
  'Balenciaga',
  'Prada',
  'Saint Laurent',
  'Rolex',
  'Audemars Piguet',
  'Cartier',
  'Hublot',
  'Patek Philippe',
  'Omega',
  'Vacheron Constantin',
  'Berluti',
  'Tseffano Ricci',
  'Rick Owens',
  'Burberry',
  'Santoni',
  'Casablanca',
  'Dolce & Gabbana',
  'Hermes',
  'Miu Miu',
  'Amiri',
  'CP Company',
  'Jacquemus',
  'Vetements',
  'Chrome Hearts',
  'Rimowa',
  'The North Face',
  'Van Cleef & Arpels',
  'Jil Sander',
  "Arc'teryx",
  'Supreme',
  'Kiton',
  'Zilli',
  'Moncler',
  'Celine',
  'Bearbrick',
  'Adidas',
  'Stussy',
  'Salomon',
  'Nike',
  'Corteiz'
]
brandsAndDesigners.sort()

const imagePaths = [
  './image1.png',
  './image2.png',
  './image3.png',
  './image4.png',
  './image5.png',
  './image6.png'
  // Добавьте пути к другим картинкам по мере необходимости
]

const BrandsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredBrands = brandsAndDesigners.filter((brand) => {
    const brandName = typeof brand === 'string' ? brand : brand.name
    return brandName.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="flex flex-col items-center select-none ">
      <div className="sm:grid sm:grid-rows-2 sm:grid-cols-3 flex">
        {imagePaths.map((imagePath, index) => (
          <div key={index} className="flex flex-col justify-evenly mx-4 my-7">
            <img
              src={`images/home/brands/${imagePath}`}
              alt={`Картинка ${index + 1}`}
              className="sm:w-28 w-40 shadow-lg"
            />
          </div>
        ))}
      </div>
      <hr className="mt-4 w-full border-gray-300" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className="sm:w-2/3 border border-gray-300 rounded-md p-2 m-10 w-1/3"
        placeholder="Поиск..."
      />
      <div className="sm:gap-x-2 sm:mx-2 grid grid-cols-3 gap-x-24 gap-y-6">
        {filteredBrands.map((brand, index) => {
          const brandName = typeof brand === 'string' ? brand : brand.name
          const brandSlug =
            typeof brand === 'string' ? brand.replace(/ /g, '+') : brand.slug

          return (
            <Link
              to={`/shop?brand=${brandSlug}`}
              key={index}
              className=" grid sm:text-lg  text-xl border border-gray-300 text-center items-center rounded-md p-2 w-46 transition-colors duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-500"
            >
              <button className="">{brandName}</button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BrandsList
