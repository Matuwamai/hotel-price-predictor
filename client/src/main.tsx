import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './index.css'
// import HomePage from './pages/Home'
import Home from './componets/Home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Router>
    <Routes>
    <Route path='/' element={<Home/>} />
    </Routes>
  </Router>
  </StrictMode>,
)
