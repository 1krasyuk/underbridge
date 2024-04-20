import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore' // Импорт необходимых функций Firestore

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { setDefaultAutoSelectFamily } from 'net'

// Инициализация вашего Firebase проекта
const firebaseConfig = {
  apiKey: 'AIzaSyBqkAl8XVUnMp0rae6Q7J1KFvbCBMgzEdo',
  authDomain: 'underbridge-1.firebaseapp.com',
  projectId: 'underbridge-1',
  storageBucket: 'underbridge-1.appspot.com',
  messagingSenderId: '662352504328',
  appId: '1:662352504328:web:4beb560e7b4953ed0993bd',
  measurementId: 'G-DMZRJ2Z1Q8'
}

// Инициализируем ваше Firebase приложение
const app = initializeApp(firebaseConfig)

async function addUserDataToFirestore(
  name: string,
  lastname: string,
  email: string,
  password: string
) {
  try {
    const db = getFirestore() // Получаем доступ к Firestore
    const userRef = doc(db, 'users', email) // Создаем ссылку на документ пользователя
    await setDoc(userRef, {
      name: name,
      lastname: lastname,
      email: email,
      password: password
    }) // Устанавливаем данные пользователя в Firestore
    console.log('User data added to Firestore successfully!')
  } catch (error) {
    console.error('Error adding user data to Firestore:', error)
  }
}

async function signUpWithEmailAndPassword(
  name: string,
  lastname: string,
  email: string,
  password: string
) {
  console.log('Signing up with email:', email)
  try {
    const auth = getAuth()
    await createUserWithEmailAndPassword(auth, email, password)
    await addUserDataToFirestore(name, lastname, email, password) // Добавляем данные пользователя в Firestore
    console.log('User registered successfully!')
    // Можно выполнить дополнительные действия после успешной регистрации, например, перенаправление на другую страницу.
  } catch (error) {
    console.error('Error registering user:', (error as Error).message)
    // Обработка ошибки, например, отображение сообщения об ошибке пользователю.
  }
}

// Схема для валидации формы
const formSchema = z.object({
  name: z.string({ required_error: 'Введите имя' }).min(2, {
    message: ''
  }),
  lastname: z.string({ required_error: 'Введите фамилию' }).min(2, {
    message: ''
  }),
  email: z.string({ required_error: 'Введите почту' }).email().min(2, {
    message: 'Введите существующую почту'
  }),
  password: z.string({ required_error: 'Введите пароль' }).min(8, {
    message: 'Пароль должен иметь не менее 8-ми символов'
  })
})

export function SignUpForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    signUpWithEmailAndPassword(
      values.name,
      values.lastname,
      values.email,
      values.password
    )
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/5">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input
                    type="name"
                    placeholder="Имя"
                    defaultValue={field.value || ''}
                    onChange={field.onChange}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input
                    type="lastname"
                    placeholder="Фамилия"
                    defaultValue={field.value || ''}
                    onChange={field.onChange}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}

                  type="email"
                  placeholder="Email"
                  defaultValue={field.value || ''}
                  onChange={field.onChange}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
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
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}

                  type="password"
                  placeholder="Пароль"
                  defaultValue={field.value || ''}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Создать аккаунт
        </Button>
      </form>
    </Form>
  )
}
