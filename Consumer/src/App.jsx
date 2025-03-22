import BusinessLanding from "./Pages/BusinessLanding";
import ConsumerLanding from "./Pages/ConsumerLanding";
import KisanConnect from "./Pages/KisanConnect/KisanConnect";
import KisanDetail from "./Pages/KisanConnect/KisanDetail";
import Market from "./Pages/Market/Market"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BusinessLanding />} />
          <Route path="/market" element={<ConsumerLanding />} />
          <Route path="/shop/market" element={<Market />} />
          <Route path="/shop/kisan" element={<KisanDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
