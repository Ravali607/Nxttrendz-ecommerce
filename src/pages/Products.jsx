import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { Search, SlidersHorizontal, Sparkles, ShoppingBag } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('lowToHigh');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch max 194 products available on DummyJSON to ensure all fashion items load
        const response = await axios.get('https://dummyjson.com/products?limit=194');
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Category Configuration matching API category slugs accurately
  const categoryFilters = [
    { label: 'All', values: [] },
    { 
      label: "Men's Wear", 
      values: ['mens-shirts', 'mens-shoes', 'mens-watches'] 
    },
    { 
      label: "Women's Wear", 
      values: ['womens-dresses', 'tops', 'womens-shoes', 'womens-watches', 'womens-bags', 'womens-jewellery'] 
    },
    { 
      label: 'Kids & Tops', 
      values: ['tops', 'mens-shirts', 'womens-dresses'] 
    },
    { 
      label: 'Beauty & Fragrances', 
      values: ['beauty', 'fragrances', 'skin-care'] 
    },
    { 
      label: 'Electronics', 
      values: ['smartphones', 'laptops', 'mobile-accessories', 'tablets'] 
    },
    { 
      label: 'Groceries', 
      values: ['groceries'] 
    },
    { 
      label: 'Furniture', 
      values: ['furniture', 'home-decoration'] 
    },
  ];

  const filteredProducts = products
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => {
      if (category === 'All') return true;
      const selectedFilter = categoryFilters.find((c) => c.label === category);
      if (selectedFilter && selectedFilter.values.length > 0) {
        return selectedFilter.values.includes(item.category);
      }
      return true;
    })
    .sort((a, b) => (sortBy === 'lowToHigh' ? a.price - b.price : b.price - a.price));

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-6 mb-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/25 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Shopping Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Curated Fashion & Tech for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Modern Professionals</span>.
          </h1>
          <p className="text-slate-400 text-lg mt-3 max-w-2xl font-normal">
            Explore live REST API product data featuring Men's Wear, Women's Fashion, Electronics, and Home Goods with real-time filtering.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Control Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 absolute left-3.5 top-3.2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition font-medium"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto py-1">
            {categoryFilters.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setCategory(cat.label)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  category === cat.label
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="lowToHigh">Sort: Price Low to High</option>
              <option value="highToLow">Sort: Price High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-12">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching products</h3>
            <p className="text-slate-500 text-sm mt-1">Try clearing your search query or selecting another category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;