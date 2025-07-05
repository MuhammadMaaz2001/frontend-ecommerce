import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
// import ProductDetails from '../pages/ProductDetails';
// import Cart from '../pages/Cart';
// import Login from '../pages/Login';
// import Register from '../pages/Register';
// import Profile from '../pages/Profile';
// import Checkout from '../pages/Checkout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<Checkout />} /> */}
    </Routes>
  );
};

export default AppRoutes;
