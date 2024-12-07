import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Details from './pages/Details.jsx';

import AddRecipe from './pages/AddRecipe.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/pages/:detailId',
    element: <Details />
  },
  {
    path: '/pages/addRecipe',
    element: <AddRecipe />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
