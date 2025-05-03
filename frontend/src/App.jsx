import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import Cart from './pages/Cart';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/cart' element={<Cart />} />

      </Routes>
    </div>
  );
}

export default App;
