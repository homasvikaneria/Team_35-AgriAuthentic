import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Marketplace from './Pages/FarmerMarketplace/Marketplace'
import Products from './Pages/Products&Orders/Products'
import Analytics from './Pages/Analytics'
import Profile from './Pages/Profile'
import Products_Layout from './Pages/Products&Orders/Products_&_Orders'
import Orders from './Pages/Products&Orders/Orders'
import ProductDetails from './Pages/Products&Orders/Crop_Details'
import FarmerDetails from './Pages/FarmerMarketplace/FarmerDetails'
import FarmingNews from './Pages/FarmerMarketplace/FarmingNews'
import MarketPrices from './Pages/FarmerMarketplace/MarketPrices'
import HomePage from './Pages/HomePage'
import FarmerProfileSetup from './Components/ProfileSetup'
import FarmingNewsDashboard from './Pages/FarmerMarketplace/FarmingNews'
import ChatModal from './Components/AiChatBot/ChatModel'
import FloatingChatButton from './Components/AiChatBot/FloatingChatButton'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };
  return (
    <>
      <BrowserRouter>
        {location.pathname !== '/' && <Navbar />}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products_Layout />}>
              <Route index element={<Navigate to="Crops" replace />} />
              <Route path='Crops' element={<Products />} />
              <Route path='Orders' element={<Orders />} />
              <Route path='details/:id' element={<ProductDetails />} />
            </Route>
            <Route path="/marketplace" element={<Marketplace />}>
              <Route index element={<Navigate to="farmers" replace />} />
              <Route path='farmers' element={<FarmerDetails />} />
              <Route path='market' element={<MarketPrices />} />
              <Route path='news' element={<FarmingNewsDashboard />} />
            </Route>
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/profile-setup' element={<FarmerProfileSetup />} />
          </Routes>
        </main>
        {location.pathname !== '/' &&
          <div className="app">
            <FloatingChatButton onClick={handleChatButtonClick} />
            <ChatModal isOpen={isChatOpen} onClose={handleCloseChat} />
          </div>}

      </BrowserRouter>
    </>
  )
}

export default App
