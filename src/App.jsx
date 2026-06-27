import ScrollToTop from "./components/scrollToTop"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import ProductInfo from "./pages/ProductInfo"
import NotFound from "./pages/NotFound"
import { BrowserRouter, Routes, Route } from 'react-router'
import WishlistPage from "./pages/Wishlist";
import { WishlistProvider } from "./contexts/WishlistContext"
import Contacts from "./pages/Contacts"
import CheckoutPage from "./pages/CheckoutPage"
import Beers from "./pages/Beers"
import Checkout from "./components/Checkout"
import Cronache from "./pages/Cronache"
import { CartProvider } from "./contexts/CartContext"
import PaymentSuccess from "./pages/PaymentSuccess"


function App() {
  return (
    <>

      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<Cronache />} />
                <Route path="/products" element={<Beers/>}/> 
                <Route path="/products/:slug" element={<ProductInfo />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/payment-success-page" element={<PaymentSuccess />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>

    </>
  )
}

export default App