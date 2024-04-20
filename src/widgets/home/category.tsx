import { Link } from 'react-router-dom'

const imagePaths = [
  './image1.jpg',
  './image2.jpg',
  './image3.jpg',
  './image4.jpg',
  './image5.jpg',
  './image6.jpg'
  // Добавьте пути к другим картинкам по мере необходимости
]

const CategoryName = [
  'Верх',
  'Низ',
  'Верхняя одежда',
  'Сумки',
  'Аксессуары',
  'Обувь'
  // Добавьте описания к другим картинкам по мере необходимости
]

const CategoriesList: React.FC = () => {
  return (
    <div className="flex justify-between">
      {/* Используем функцию map для рендеринга каждой картинки */}

      {imagePaths.map((imagePath, index) => (
        <div key={index} className="flex flex-col items-center">
          <Link to="/shop">
            {' '}
            <img
              key={imagePath}
              src={`src/images/home/categories/${imagePath}`}
              alt={`Картинка ${imagePath + 1}`}
              className="h-64 w-48 mb-4  object-cover select-none"
            />
          </Link>

          <Link to="/shop">
            <span className="text-lg font-semibold tracking-tight">
              {CategoryName[index]}
            </span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CategoriesList
