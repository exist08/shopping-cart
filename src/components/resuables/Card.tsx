
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { cartItemsAtom, addToCart } from '../../store/cartAtoms';
import type { Product } from '../../types/product';

interface CardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  product: Product;
}

function Card({ title, description, price, image, product }: CardProps) {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);

  const handleAddToCart = () => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    setCartItems(addToCart(cartItems, product));
    
    if (existingItem) {
      toast.success(`${product.title} quantity increased in cart!`);
    } else {
      toast.success(`${product.title} added to cart!`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain rounded-md"
      />
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-600 line-clamp-3">{description}</p>
      <div className="flex flex-col gap-4 mt-4">
        <p className="text-gray-900 text-2xl font-bold">${price}</p>
        <button 
          onClick={handleAddToCart}
          className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg transition-colors font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
