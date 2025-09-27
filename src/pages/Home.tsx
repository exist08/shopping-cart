import React from 'react';
import Card from '../components/resuables/Card';
import { useAtomValue } from 'jotai';
import { cartItemsAtom } from '../store/cartAtoms';
import useAxios from 'axios-hooks';
import type { Product } from '../types/product';
import { BASE_URL } from '../utils/BaseUrls';


const Home: React.FC = () => {

  const [{ data: products, loading, error } = { data: [], loading: false, error: null }] = useAxios<Product[]>(BASE_URL + '/products');

  const cartItems = useAtomValue(cartItemsAtom);

  console.table(cartItems);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.thumbnail}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
