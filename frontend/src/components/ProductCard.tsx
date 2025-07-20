
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { addToCart } from '../store/cartSlice';
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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const imageUrl = product.images && product.images.length > 0 
    ? `http://localhost:5000${product.images[0]}` 
    : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400';

  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:-translate-y-2">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Wishlist Button */}
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
          </button>

          {/* Stock Badge */}
          <div className="absolute top-4 left-4">
            {product.stock > 0 ? (
              <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold rounded-full">
                In Stock
              </span>
            ) : (
              <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold rounded-full">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="mb-3">
            <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Rating Stars */}
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">(4.0)</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              <p className="text-xs text-gray-500">Free shipping</p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="group/btn bg-gradient-to-r from-primary to-purple-600 text-white p-3 rounded-xl hover:from-primary/90 hover:to-purple-600/90 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
            >
              <ShoppingCart className="w-5 h-5 group-hover/btn:animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
