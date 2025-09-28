import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "./Context/ThemeContext.jsx"
import ContextProvider from './Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <ThemeProvider>
    <App />
    </ThemeProvider>
    </ContextProvider>
  </StrictMode>,
)
