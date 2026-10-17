import { useCart } from '../context/CartContext';
import { ShoppingBag, Star, Zap } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1">
      <div className="relative">
        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        {/* Image Container with Hover Effect */}
        <div className="h-56 w-full bg-slate-50 overflow-hidden flex items-center justify-center p-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{product.rating || '4.5'}</span>
            <span className="text-slate-400 font-normal">({product.stock} in stock)</span>
          </div>

          <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition truncate">
            {product.title}
          </h3>
          <p className="text-slate-500 text-sm mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer & Price */}
      <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-50 mt-2">
        <div>
          <span className="text-xs text-slate-400 block font-medium">Price</span>
          <span className="text-2xl font-black text-slate-900">${product.price}</span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 active:scale-95 transition"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;