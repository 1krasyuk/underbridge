import { Link } from 'react-router-dom'

const imagePaths = [
  './image1.png',
  './image2.png',
  './image3.png',
  './image4.png',
  './image5.png',
  './image6.png'
  // Добавьте пути к другим картинкам по мере необходимости
]

const CategoriesList: React.FC = () => {
  return (
    <div className="flex justify-between">
      {/* Используем функцию map для рендеринга каждой картинки */}

      {imagePaths.map((imagePath, index) => (
        <div key={index} className="flex mx-2">
          <Link to="/shop">
            <img
              key={imagePath}
              src={`/images/home/brands/${imagePath}`}
              alt={`Картинка ${imagePath + 1}`}
              className="w-44 rounded-full shadow-lg select-none"
            />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CategoriesList
