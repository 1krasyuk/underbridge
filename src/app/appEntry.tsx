import './global.css'

import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from '@/components/ui/sonner'

import appRouter from './appRouter'
import { appStore, persistedStore } from './appStore'

createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={appStore}>
    <PersistGate loading={null} persistor={persistedStore}>
      <RouterProvider router={appRouter} />
      <Toaster />
    </PersistGate>
  </ReduxProvider>
)
