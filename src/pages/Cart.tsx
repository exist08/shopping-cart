import React, { useState } from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cartItemsAtom, cartTotalAtom, removeFromCart, updateQuantity } from '../store/cartAtoms';
import CartItem from '../components/resuables/CartItem';
import { BASE_URL } from '../utils/BaseUrls';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const cartTotal = useAtomValue(cartTotalAtom);
  
  // User details form state
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    address: ''
  });
  
  // Order placement state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setCartItems(updateQuantity(cartItems, productId, newQuantity));
  };

  const handleRemoveItem = (productId: number) => {
    const item = cartItems.find(item => item.product.id === productId);
    setCartItems(removeFromCart(cartItems, productId));
    if (item) {
      toast.info(`${item.product.title} removed from cart`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    return userDetails.firstName.trim() !== '' && 
           userDetails.lastName.trim() !== '' && 
           userDetails.address.trim() !== '';
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderData = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        address: userDetails.address,
        products: cartItems,
      };

      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      toast.success('🎉 Order placed successfully! Thank you for your purchase.');
      setOrderSuccess(true);
      setCartItems([]); // Clear cart after successful order
      
      // Reset form
      setUserDetails({
        firstName: '',
        lastName: '',
        address: ''
      });
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Show success message if order was placed successfully
  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-xl font-semibold mb-2 text-green-600">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-4">Thank you for your order. We'll process it shortly.</p>
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
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.product.id} item={item} handleQuantityChange={handleQuantityChange} handleRemoveItem={handleRemoveItem} />
              ))}
            </div>
          </div>

          {/* User Details Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userDetails.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userDetails.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
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
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${(cartTotal).toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-colors font-medium mt-6"
            >
              {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
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
