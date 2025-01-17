import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const isDev = process.env.NODE_ENV === 'development';

createRoot(document.getElementById('root')).render(
  isDev ? <App /> : <StrictMode><App /></StrictMode>
);