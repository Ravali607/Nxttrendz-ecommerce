import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, LogOut, Sparkles, UserCheck } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-xl border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/products" className="flex items-center gap-2 text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
          <Sparkles className="w-7 h-7 text-blue-400 animate-pulse" />
          <span>NxtTrendz<span className="text-blue-500">.ai</span></span>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-8">
          <Link to="/products" className="text-slate-300 hover:text-blue-400 font-semibold transition flex items-center gap-1">
            Explore Store
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition text-slate-200">
            <ShoppingBag className="w-6 h-6" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                {totalItemsCount}
              </span>
            )}
          </Link>

          {/* User Badge & Logout */}
          <div className="flex items-center gap-4 pl-4 border-l border-slate-800">
            <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full text-xs text-slate-300">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">Active Session</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition border border-rose-600/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;