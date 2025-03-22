import Market from "./Pages/Market/Market"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/shop/market" element={<Market />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
