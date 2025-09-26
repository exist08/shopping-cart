import { atom } from 'jotai';
import type { CartItem, Product } from '../types/product';

// Base cart items atom
export const cartItemsAtom = atom<CartItem[]>([]);

// Derived atom for cart count
export const cartCountAtom = atom((get) => {
  const cartItems = get(cartItemsAtom);
  return cartItems.reduce((total, item) => total + item.quantity, 0);
});

// Derived atom for cart total
export const cartTotalAtom = atom((get) => {
  const cartItems = get(cartItemsAtom);
  return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
});

// Helper functions for cart operations
export const addToCart = (cartItems: CartItem[], product: Product): CartItem[] => {
  const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);
  
  if (existingItemIndex >= 0) {
    // Item already exists, increase quantity
    const updatedItems = [...cartItems];
    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      quantity: updatedItems[existingItemIndex].quantity + 1
    };
    return updatedItems;
  } else {
    // New item, add to cart
    return [...cartItems, { product, quantity: 1 }];
  }
};

export const removeFromCart = (cartItems: CartItem[], productId: number): CartItem[] => {
  return cartItems.filter(item => item.product.id !== productId);
};

export const updateQuantity = (cartItems: CartItem[], productId: number, quantity: number): CartItem[] => {
  if (quantity <= 0) {
    return cartItems.filter(item => item.product.id !== productId);
  } else {
    return cartItems.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
  }
};

export const clearCart = (): CartItem[] => {
  return [];
};
