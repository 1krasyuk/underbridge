import Header from '@/layout/header/header'
import Footer from '@/layout/footer/footer'
import { Link } from 'react-router-dom'

export default function FAQ() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="h-screen flex self-center	justify-center mt-64">
        <p className=" font-bold text-4xl w-3/5  uppercase text-center	">
          скоро здесь появятся ответы на часто задаваемые вопросы
        </p>
      </div>
      <Footer />
    </div>
  )
}
