import useFetchProducts from '../hooks/useFetchProducts';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products, loading } = useFetchProducts();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
