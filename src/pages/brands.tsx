import Header from '@/layout/header/header'
import Footer from '@/layout/footer/footer'
import { Link } from 'react-router-dom'
import BrandsList from '@/widgets/home/BrandsList'

export default function Cart() {
  return (
    <div>
      <p className="tracking-wide text-3xl font-bold uppercase mx-auto mt-10 text-center">
        Бренды и дизайнеры
      </p>
      <BrandsList />
    </div>
  )
}
