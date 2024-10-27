import './App.css';
import NavBartest from './components/navBartest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeView from './Views/HomeView';
import SkincareView from './Views/SkincareView'; 
import ProductView from './Views/ProductView/ProductView'; 
import { CartProvider } from './Context/CartContext';
import { ProductsProvider } from './Context/ProductsData';
import CartView from './Views/CartView';
import Checkout from './components/Checkout';
import Footer from './Views/Footer';

function App() {
  return (
    <BrowserRouter  basename="/React-60045">
    <ProductsProvider>
    <CartProvider>
      <NavBartest />
      <Routes>
        <Route exact path='/' element={<HomeView />} />
        <Route exact path='/Home' element={<HomeView />} />
        <Route exact path='/category/:categoryId' element={<SkincareView />} />
        <Route exact path='/:category/:id' element={<ProductView />} />
        <Route path="/cart" element={<CartView />} />
        <Route exact path="/checkout" element={<Checkout/>} />
      </Routes>
      <Footer />
      </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
