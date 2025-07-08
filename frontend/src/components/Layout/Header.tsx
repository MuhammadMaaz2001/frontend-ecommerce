
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, Sparkles } from 'lucide-react';
import { logout } from '../../store/authSlice';
import { RootState } from '../../store/store';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-3 text-gray-600 hover:text-primary transition-all duration-200 hover:bg-primary/5 rounded-xl group"
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-purple-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse font-semibold shadow-lg">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:inline font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-6 py-2 text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl hover:from-primary/90 hover:to-purple-600/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
