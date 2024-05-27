import { useState } from 'react'
import { Link } from 'react-router-dom'

const brandsAndDesigners = [
  'Gucci',
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

  const filteredBrands = brandsAndDesigners.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex">
        {imagePaths.map((imagePath, index) => (
          <div key={index} className="flex flex-col justify-evenly mx-4 my-7">
            <Link to="/shop">
              <img
                key={imagePath}
                src={`src/images/home/brands/${imagePath}`}
                alt={`Картинка ${index + 1}`}
                className="w-40  shadow-lg"
              />
            </Link>
          </div>
        ))}
      </div>
      <hr className="mt-4 w-full border-gray-300" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded-md p-2 m-10 w-1/3"
        placeholder="Поиск..."
      />

      <div className="grid w-2/3 grid-cols-3 gap-x-24 gap-y-6">
        {filteredBrands.map((brand, index) => (
          <button
            key={index}
            className="text-xl  border border-gray-300 rounded-md p-2 w-46 transition-colors duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-500"
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BrandsList
