import { createBrowserRouter } from 'react-router-dom'

import Home from '@/pages/home'
import SignInPage from '@/pages/sign-in'
import SignUpPage from '@/pages/sign-up'
import Shop from '@/pages/shop'
import Favourites from '@/pages/favourites'
import Cart from '@/pages/cart'
import About from '@/pages/about'
import FAQ from '@/pages/faq'
import Contacts from '@/pages/contacts'
import Brands from '@/pages/brands'

const appRouter = createBrowserRouter([
  {
    element: <Home />,
    path: '/',
    errorElement: <div>404</div>
  },
  {
    element: <SignInPage />,
    path: '/sign-in',
    errorElement: <div>404</div>
  },
  {
    element: <SignUpPage />,
    path: '/sign-up',
    errorElement: <div>404</div>
  },
  {
    element: <Shop />,
    path: '/shop',
    errorElement: <div>404</div>
  },
  {
    element: <Favourites />,
    path: '/favourites',
    errorElement: <div>404</div>
  },
  {
    element: <Cart />,
    path: '/cart',
    errorElement: <div>404</div>
  },
  {
    element: <About />,
    path: '/about',
    errorElement: <div>404</div>
  },
  {
    element: <FAQ />,
    path: '/faq',
    errorElement: <div>404</div>
  },
  {
    element: <Contacts />,
    path: '/contacts',
    errorElement: <div>404</div>
  },
  {
    element: <Brands />,
    path: '/brands',
    errorElement: <div>404</div>
  }
])

export default appRouter
