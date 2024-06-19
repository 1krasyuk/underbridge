import { Input } from '@/components/ui/input'
import { SignInForm } from '@/widgets/auth/sign-in-form'
import { reactHooksModule } from '@reduxjs/toolkit/dist/query/react'
import { Link } from 'react-router-dom'
import Header from '@/layout/header/header'
import Footer from '@/layout/footer/footer'

export default function SignInPage() {
  return (
    <div className="container mx-auto  flex flex-col justify-center items-center h-full ">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl my-6">
        ВОЙТИ
      </h1>

      <SignInForm />

      <p className="my-4 text-right tracking-tight text-base font-medium">
        Еще нет аккаунта?
        <Link
          to="/sign-up"
          className="underline decoration-solid underline-offset-4"
        >
          Создать аккаунт
        </Link>
      </p>
    </div>
  )
}
