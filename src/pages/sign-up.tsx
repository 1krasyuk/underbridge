import { Input } from '@/components/ui/input'
import { SignUpForm } from '@/widgets/auth/sign-up-form'
import Header from '@/layout/header/header'
import Footer from '@/layout/footer/footer'
import { Link } from 'react-router-dom'

export default function SignUpPage() {
  return (
    <div className="container mx-auto  flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold my-8 tracking-wider">
        СОЗДАНИЕ АККАУНТА
      </h1>

      <SignUpForm />

      <p className="my-4 tracking-tight text-base font-medium">
        Уже есть аккаунт?
        <Link
          to="/sign-in"
          className="underline decoration-solid underline-offset-4"
        >
          Войти
        </Link>
      </p>
    </div>
  )
}
