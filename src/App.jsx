import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import ProductInfo from "./pages/ProductInfo"
import NotFound from "./pages/NotFound"
import { BrowserRouter, Routes, Route } from 'react-router'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:slug" element={<ProductInfo />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App