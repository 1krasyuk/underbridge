import { ReactElement, useEffect, useState } from 'react'
import { getAuth, User } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

type AdminGuardProps = {
  children: ReactElement
}

export function AdminGuard({ children }: AdminGuardProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const auth = getAuth()
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
  }, [])

  if (!user) {
    // Пользователь еще не загрузился
    return null // или другое заглушечное значение, пока пользователь не загружен
  }

  if (user?.email !== 'qwe@gmail.com') return <Navigate to={'/'} />

  return children
}
