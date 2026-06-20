import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import ProductInfo from "./pages/ProductInfo"
import { BrowserRouter, Routes, Route } from 'react-router'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  element= {<MainLayout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<ProductInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App