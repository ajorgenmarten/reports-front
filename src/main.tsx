import ReactDOM from 'react-dom/client'
import Router from './router.tsx'
import { ToastContainer } from 'react-toastify'
import './assets/index.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import '@tailwindcss/typography'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
    <ToastContainer position='bottom-right' theme={window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'} />
  </React.StrictMode>,
)
