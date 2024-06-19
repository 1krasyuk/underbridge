import { Suspense } from 'react'

import { Outlet } from 'react-router-dom'

import Footer from './footer/footer'
import Header from './header/header'

export default function Layout() {
  return (
    <div className="min-h-screen grid grid-rows-[max-content_minmax(0,1fr)_max-content] ">
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  )
}
