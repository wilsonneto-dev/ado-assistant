import React from 'react'
import ReactDOM from 'react-dom/client'
import './ui/shared/theme/theme.scss'
import App from "./ui/shared/App.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
