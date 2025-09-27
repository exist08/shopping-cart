import React from 'react';

// can be implemented later after backend is implemented for GET: /order

const Order: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-4">Your order history will appear here once you make your first purchase.</p>
        </div>
      </div>

      {/* Sample order structure for future implementation */}
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Order #12345</span>
            <span className="text-sm text-gray-500">Delivered</span>
          </div>
          <div className="text-sm text-gray-600">
            <p>Date: March 15, 2024</p>
            <p>Total: $99.99</p>
            <p>Items: 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
