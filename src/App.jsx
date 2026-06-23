import ScrollToTop from "./components/scrollToTop"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import ProductInfo from "./pages/ProductInfo"
import NotFound from "./pages/NotFound"
import { BrowserRouter, Routes, Route } from 'react-router'
import Contacts from "./pages/Contacts"
import Beers from "./pages/Beers"


function App() {
  return (
    <>
      <BrowserRouter>

      <ScrollToTop />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products/:slug" element={<ProductInfo />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/products" element={<Beers />}/>
                <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

      </BrowserRouter>

    </>
  )
}

export default App