import { useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Products from './Pages/Products_&_Orders'
import Marketplace from './Pages/Marketplace'
import Analytics from './Pages/Analytics'
import Profile from './Pages/Profile'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      </BrowserRouter>
    </>
  )
}

export default App
