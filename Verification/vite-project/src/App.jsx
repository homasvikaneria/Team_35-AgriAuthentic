// Team_35-AgriAuthentic/Verification/vite-project/src/App.jsx
// Verification/vite-project/src/App.jsx
import './index.css';
import './app.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QrScanner from './Components/QrScanner'
import ProductVerification from './Components/ProductVerification'


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QrScanner />} />
        <Route path="/product-verify" element={<ProductVerification />} />
      </Routes>
    </Router>
    
  )
}

export default App
