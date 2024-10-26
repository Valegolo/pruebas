import './App.css';
import ItemListContainer from './components/ItemList';
import NavBartest from './components/navBartest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeView from './views/Homeview';
import SkincareView from './views/SkincareView'; // Corrige la mayúscula
import MaquillajeView from './views/MaquillajeView'; // Corrige la mayúscula
import CabelloView from './views/CabelloView'; // Corrige la mayúscula
import ProductView from './Views/ProductView/ProductView'; 

function App() {
  return (
    <BrowserRouter>
      <NavBartest />
      <Routes>
        <Route exact path='/' element={<HomeView />} />
        <Route exact path='/Home' element={<HomeView />} /> 
        <Route exact path='/category/:categoryId' element={<SkincareView />} />
        <Route exact path='/:category/:id' element={<ProductView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
