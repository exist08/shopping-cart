import React from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { cartItemsAtom, cartTotalAtom, removeFromCart, updateQuantity } from '../store/cartAtoms';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const cartTotal = useAtomValue(cartTotalAtom);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setCartItems(updateQuantity(cartItems, productId, newQuantity));
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(removeFromCart(cartItems, productId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-4">Add some products to get started!</p>
            <Link 
              to="/" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 p-4 border-b border-gray-200 last:border-b-0">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.product.description}</p>
                    <p className="text-lg font-bold text-gray-900">${item.product.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus size={12} />
                    </button>
                    
                    <span className="font-semibold text-lg min-w-8 text-center">{item.quantity}</span>
                    
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 transition-colors mt-2"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-colors font-medium mt-6">
              Proceed to Checkout
            </button>
            
            <Link 
              to="/" 
              className="block text-center text-blue-500 hover:text-blue-700 transition-colors mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
