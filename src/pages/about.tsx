export default function About() {
  return (
    <div className="sm:flex-col sm:mr-0 sm:mt-16 container flex items-center mr-36">
      <img
        src="/images/header/UNDERBRIDGE LOGO.png"
        className="sm:w-8/12 w-2/6 sm:mb-10 rounded-full shadow-xl select-none"
      ></img>
      <div className="sm:ml-0 sm:w-full flex flex-col ml-24  w-1/3 ">
        <p className="sm:hidden  sm:text-3xl font-bold tracking-widest text-6xl my-2 text-red-500 uppercase self-center">
          Underbridge
        </p>
        <p className="sm:text-md font-semibold tracking-tight text-xl my-2 uppercase text-justify self-center">
          Магазин "Underbridge" - ваш идеальный выбор для модной и комфортной
          одежды. Мы предлагаем широкий ассортимент брендовой и дизайнерской
          одежды и аксессуаров по доступным ценам. У нас вы найдете все
          необходимое для создания своего уникального образа на каждый день.
        </p>
      </div>
    </div>
  )
}
