import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, Plus, Minus, Tag, Check, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'NXT10') {
      setDiscountPercent(10);
      setAppliedCode('NXT10');
      toast.success('10% Discount Applied!');
      setCouponCode('');
    } else {
      toast.error('Invalid Coupon! Try "NXT10"');
    }
  };

  const discountAmount = (totalAmount * discountPercent) / 100;
  const finalTotal = totalAmount - discountAmount;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center justify-center">
        <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Your Shopping Cart is Empty</h2>
        <p className="text-slate-500 mt-2 mb-6">Explore our curated collection and add items to your cart.</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Shopping Cart ({cartItems.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 border border-slate-200/80 rounded-2xl flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition">
              <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-contain rounded-xl bg-slate-50 p-2" />
              
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <p className="text-blue-600 font-bold mt-1">${item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-500 hover:text-black">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-slate-800 px-2 text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-500 hover:text-black">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-rose-500 hover:bg-rose-50 p-2.5 rounded-xl transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 border border-slate-200/80 rounded-2xl h-fit shadow-sm space-y-6">
          <h3 className="text-xl font-black text-slate-900">Order Summary</h3>

          {/* Coupon Input */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Promo code (e.g. NXT10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold uppercase outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-800 transition"
            >
              Apply
            </button>
          </form>

          {appliedCode && (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold p-3 rounded-xl border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Coupon "{appliedCode}" applied (10% OFF)</span>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="space-y-3 pt-2 text-sm">
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount (10%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Estimated Shipping</span>
              <span className="text-emerald-600 font-semibold">FREE</span>
            </div>
            <div className="border-t border-slate-100 pt-4 flex justify-between text-xl font-black text-slate-900">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => toast.success('Order placed successfully! Thank you for testing.')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25"
          >
            Proceed to Checkout
          </button>

          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-bit Encrypted SSL Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;