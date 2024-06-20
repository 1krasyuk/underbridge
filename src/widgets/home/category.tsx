import { Link } from 'react-router-dom'

const categories = [
  { id: 1, name: 'Верх', imagePath: './image1.jpg', slug: 'top' },
  { id: 2, name: 'Низ', imagePath: './image2.jpg', slug: 'bottom' },
  { id: 3, name: 'Верхняя одежда', imagePath: './image3.jpg', slug: 'outwear' },
  { id: 4, name: 'Сумки', imagePath: './image4.jpg', slug: 'bag' },
  { id: 5, name: 'Украшения', imagePath: './image5.jpg', slug: 'jewelry' },
  { id: 6, name: 'Обувь', imagePath: './image6.jpg', slug: 'shoes' }
]
const CategoriesList: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-6 gap-3 mb-12">
      {categories.map((category, index) => (
        <div key={index} className="w-full text-center">
          <Link to={`/shop?category=${category.slug}`}>
            <img
              key={category.id}
              src={`/images/home/categories/${category.imagePath}`}
              alt={`Картинка ${category.imagePath + 1}`}
              className="sm:h-48 h-64 w-full mb-4 object-cover"
            />
          </Link>

          <span className="text-lg  font-semibold tracking-tight">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CategoriesList
