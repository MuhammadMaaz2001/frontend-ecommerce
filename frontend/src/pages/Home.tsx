
import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Sparkles, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Starting to fetch products...');
        const response = await productsAPI.getAll();
        console.log('Products fetched successfully:', response.data);
        
        setProducts(response.data);
        setFilteredProducts(response.data);
        
        toast({
          title: "Products loaded!",
          description: `Found ${response.data.length} products available.`,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error loading products",
          description: "Could not load products. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
        console.log('Finished fetching products');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-white rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="w-12 h-12 mr-4 animate-pulse" />
            <h1 className="text-6xl font-bold">
              Welcome to ShopHub
            </h1>
            <Sparkles className="w-12 h-12 ml-4 animate-pulse" />
          </div>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover amazing products at unbeatable prices. Your perfect shopping destination awaits with premium quality and exceptional service!
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
              <div className="flex items-center">
                <Search className="ml-4 text-white/80 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for amazing products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-4 bg-transparent text-white placeholder-white/70 focus:outline-none text-lg"
                />
                <button className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 mr-2">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full mb-6">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            Featured Products
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated collection of premium products, handpicked for quality and style
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl animate-pulse border border-white/30">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-56 rounded-2xl mb-6"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
                  <div className="flex justify-between items-center pt-4">
                    <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-24"></div>
                    <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-600 mb-6">
                  {searchTerm ? 'No products found' : 'No products available'}
                </h3>
                <p className="text-gray-500 mb-10 text-lg max-w-md mx-auto">
                  {searchTerm 
                    ? `We couldn't find any products matching "${searchTerm}". Try different keywords!`
                    : 'Check back later for new arrivals and exciting products!'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl hover:from-primary/90 hover:to-purple-600/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Browse All Products
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Results Info & Filter */}
                <div className="flex items-center justify-between mb-10 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div>
                    <p className="text-gray-700 text-lg font-medium">
                      Showing <span className="text-primary font-bold">{filteredProducts.length}</span> of <span className="text-primary font-bold">{products.length}</span> products
                    </p>
                    {searchTerm && (
                      <p className="text-gray-500 mt-1">for "{searchTerm}"</p>
                    )}
                  </div>
                  <button className="flex items-center space-x-3 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl">
                    <Filter className="w-5 h-5 text-primary" />
                    <span className="font-medium text-gray-700">Filter & Sort</span>
                  </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
