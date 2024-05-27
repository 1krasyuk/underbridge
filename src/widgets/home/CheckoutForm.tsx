import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { string, z } from 'zod'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { setDefaultAutoSelectFamily } from 'net'
import { createEntityAdapter } from '@reduxjs/toolkit'

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

async function addOrderDataToFirestore(
  email: string,
  country: string,
  name: string,
  lastname: string,
  adress: string,
  city: string,
  postalCode: string,
  phoneNumber: string,
  deliveryMethod: string
) {
  try {
    const db = getFirestore() // Получаем доступ к Firestore
    const userRef = doc(db, 'orders', email) // Создаем ссылку на документ пользователя
    await setDoc(userRef, {
      email: email,
      country: country,
      name: name,
      lastname: lastname,
      adress: adress,
      city: city,
      postalCode: string,
      phoneNumber: string,
      deliveryMethod: string
    }) // Устанавливаем данные пользователя в Firestore
    console.log('Order data added to Firestore successfully!')
  } catch (error) {
    console.error('Error adding order data to Firestore:', error)
  }
}

async function createOrder(
  email: string,
  country: string,
  name: string,
  lastname: string,
  adress: string,
  city: string,
  postalCode: string,
  phoneNumber: string,
  deliveryMethod: string
) {
  console.log('Order was created via email:', email)
  try {
    const auth = getAuth()
    await createOrder(
      email,
      country,
      name,
      lastname,
      adress,
      city,
      postalCode,
      phoneNumber,
      deliveryMethod
    )
    await addOrderDataToFirestore(
      email,
      country,
      name,
      lastname,
      adress,
      city,
      postalCode,
      phoneNumber,
      deliveryMethod
    ) // Добавляем данные пользователя в Firestore
    console.log('Order registered successfully!')
    // Можно выполнить дополнительные действия после успешной регистрации, например, перенаправление на другую страницу.
  } catch (error) {
    console.error('Error registering order:', (error as Error).message)
    // Обработка ошибки, например, отображение сообщения об ошибке пользователю.
  }
}

// Схема для валидации формы
const formSchema = z.object({
  email: z.string({ required_error: 'Введите почту' }).email().min(2, {
    message: 'Введите существующую почту'
  }),
  country: z.string({ required_error: 'Введите страну' }).min(2, {
    message: ''
  }),
  name: z.string({ required_error: 'Введите имя' }).min(2, {
    message: ''
  }),
  lastname: z.string({ required_error: 'Введите фамилию' }).min(2, {
    message: ''
  }),
  adress: z.string({ required_error: 'Введите адрес' }).min(2, {
    message: ''
  }),
  city: z.string({ required_error: 'Введите город' }).min(2, {
    message: ''
  }),
  postalCode: z.string({ required_error: 'Введите почтовый индекс' }).min(2, {
    message: ''
  }),
  phoneNumber: z.string({ required_error: 'Введите номер телефона' }).min(2, {
    message: ''
  }),
  deliveryMethod: z
    .string({ required_error: 'Выберите способ доставки' })
    .min(2, {
      message: ''
    })
})

export function CheckoutForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // addOrderwithE
    createOrder(
      values.email,
      values.country,
      values.name,
      values.lastname,
      values.adress,
      values.city,
      values.postalCode,
      values.phoneNumber,
      values.deliveryMethod
    )
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl font-semibold my-8 tracking-wider ">
                Почта
              </FormLabel>

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

        <h1 className="text-2xl font-semibold my-8 tracking-wider ">
          Доставка
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
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
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="country"
                  placeholder="Страна"
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="postalCode"
                    placeholder="Почтовый код"
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="city"
                    placeholder="Город"
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
          name="adress"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}

                  type="adress"
                  placeholder="Адрес"
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}

                  type="phoneNumber"
                  placeholder="Номер телефона"
                  defaultValue={field.value || ''}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="comment">Комментарий</Label>
          <Textarea placeholder="Введите комментарий" id="comment" />
        </div>

        <FormField
          control={form.control}
          name="deliveryMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <Label htmlFor="deliveryMethod">Способ доставки</Label>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="self" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Самовывоз г. Москва
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Bpost" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      1.0-2.5кг (Bpost 7-12 дней)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="DHL" />
                    </FormControl>
                    <FormLabel className="font-normal">DHL</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Проверить данные
        </Button>
      </form>
    </Form>
  )
}
