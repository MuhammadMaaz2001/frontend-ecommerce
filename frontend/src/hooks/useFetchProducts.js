import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import ENDPOINTS from '../api/endpoints';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(ENDPOINTS.PRODUCTS)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { products, loading };
};

export default useFetchProducts;
