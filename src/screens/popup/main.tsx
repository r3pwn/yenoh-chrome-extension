import React from 'react'
import ReactDOM from 'react-dom/client'
import PopupRoot from './root.tsx'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PopupRoot />
  </React.StrictMode>,
)