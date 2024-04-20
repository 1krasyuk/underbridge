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

const formSchema = z.object({
  email: z.string({ required_error: 'Введите почту' }).email().min(2, {
    message: 'Введите существующую почту'
  }),
  password: z.string({ required_error: 'Введите пароль' }).min(8, {
    message: 'Пароль должен иметь не менее 8-ми символов'
  })
})

// var user = getAuth().currentUser

// if (user) {
//   // Пользователь вошел в систему
//   var uid = user.uid
//   var email = user.email
//   console.log// и так далее, в зависимости от того, какие данные о пользователе вы хотите получить
// } else {
//   // Пользователь не вошел в систему
// }

export function SignInForm() {
  const [error, setError] = useState<string | null>(null)

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
      // Можно выполнить дополнительные действия после успешного входа, например, перенаправление на другую страницу.
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
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full">
          Войти
        </Button>
      </form>
    </Form>
  )
}
