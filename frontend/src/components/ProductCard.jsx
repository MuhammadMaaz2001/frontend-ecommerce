import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-xl overflow-hidden shadow hover:shadow-md transition bg-white">
      <img
        src={`http://localhost:5000/${product.images[0]}`}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>
        <p className="text-gray-600 text-sm">{product.category}</p>
        <p className="font-bold text-blue-600 mt-2">${product.price}</p>
        <Link
          to={`/product/${product._id}`}
          className="inline-block mt-3 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
