import { Link } from 'react-router-dom'

const imagePaths = [
  './image1.png',
  './image2.png',
  './image3.png',
  './image4.png',
  './image5.png',
  './image6.png'
]

const CategoriesList: React.FC = () => {
  return (
    <div className="grid sm:order-3 grid-cols-6 gap-4 mb-6">
      {/* Используем функцию map для рендеринга каждой картинки */}

      {imagePaths.map((imagePath, index) => (
        <div key={index} className="">
          <Link to="/shop">
            <img
              key={imagePath}
              src={`/images/home/brands/${imagePath}`}
              alt={`Картинка ${imagePath + 1}`}
              className="shadow-2xl"
            />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CategoriesList
