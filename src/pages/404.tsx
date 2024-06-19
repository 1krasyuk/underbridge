import Header from '@/layout/header/header'
import Footer from '@/layout/footer/footer'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center my-auto justify-center pb-24 ">
      <p className="text-4xl text-black-500 font-extrabold mb-10 z-50">
        ОШИБКА 404
      </p>
      <p className="text-3xl text-black-500 font-extrabold z-50">
        ТАКОЙ СТРАНИЦЫ НЕ СУЩЕСТВУЕТ
      </p>

      <img
        src="src\images\header\UNDERBRIDGE LOGO PNG.png"
        className="absolute top-25 left-25   blur-sm z-10"
      ></img>
    </div>
  )
}
