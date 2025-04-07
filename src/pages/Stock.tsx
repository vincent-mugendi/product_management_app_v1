
import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Stock = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Stock Management</h1>
        <p className="text-gray-600">View and manage your inventory levels</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Stock Management Coming Soon</h3>
        <p className="text-gray-500">
          This feature is currently in development.
          Check back later for detailed inventory management.
        </p>
      </div>
    </div>
  );
};

export default Stock;
