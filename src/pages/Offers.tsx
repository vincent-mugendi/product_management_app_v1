
import React from 'react';
import { Tag } from 'lucide-react';

const Offers = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Offers</h1>
        <p className="text-gray-600">View and manage special offers and promotions</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <Tag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">No Active Offers</h3>
        <p className="text-gray-500">
          There are no active offers or promotions at the moment.
          Check back later for special deals.
        </p>
      </div>
    </div>
  );
};

export default Offers;
