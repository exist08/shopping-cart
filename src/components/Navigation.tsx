import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartIcon from './resuables/CartIcon';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClass = (path: string) => {
    const baseClass = "px-4 py-2 rounded-lg transition-colors font-medium";
    return isActive(path)
      ? `${baseClass} bg-blue-500 text-white`
      : `${baseClass} text-gray-700 hover:bg-gray-100`;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              🛍️ ShopCart
            </Link>
          </div>
          
          <div className="flex md:gap-x-4 gap-x-2">
            <Link to="/portfolio" className={navLinkClass('/portfolio')}>
              Portfolio
            </Link>
            <Link to="/cart" className={`${navLinkClass('/cart')} flex items-center gap-2`}>
              <CartIcon />
              Cart
            </Link>
            <Link to="/order" className={navLinkClass('/order')}>
              Orders
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
