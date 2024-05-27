import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  email: z.string({ required_error: 'Введите почту' }).email().min(2, {
    message: 'Введите существующую почту'
  }),
  password: z.string({ required_error: 'Введите пароль' }).min(8, {
    message: 'Пароль должен иметь не менее 8-ми символов'
  })
})

export function SignInForm() {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, values.email, values.password)
      console.log('User signed in successfully!')
      setError(null)
      navigate('/')
    } catch (error) {
      console.error('Error signing in:', (error as Error).message)
      setError((error as Error).message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-2/6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  defaultValue={field.value || ''}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Пароль"
                  defaultValue={field.value || ''}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        {error && (
          <p className="text-red-500">Вход не выполнен: Аккаунт не найден. </p>
        )}
        <Button type="submit" className="w-full">
          Войти
        </Button>
      </form>
    </Form>
  )
}
