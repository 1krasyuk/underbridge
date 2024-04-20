import { type ReactElement } from 'react'

import { Navigate } from 'react-router-dom'

type AdminGuardProps = {
  children: ReactElement
}

export function AdminGuard({ children }: AdminGuardProps) {
  if (isAuthorized) return <Navigate to={iframePage ? `/${iframePage}` : '/'} />

  return children
}
