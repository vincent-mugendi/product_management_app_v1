
import React, { useState } from 'react';
import { useOrderStore } from '@/hooks/useOrderStore';
import { formatCurrency, formatDate, formatTime } from '@/utils/formatters';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import OrderDetails from '@/components/OrderDetails';
import { FileText, ExternalLink, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Order } from '@/types';

import { Link } from 'react-router-dom';

const LiveOrders = () => {
  const { orders } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Filter pending and on-the-way orders (live orders)
  const liveOrders = orders.filter(
    (order) => order.status === 'pending' || order.status === 'on-the-way'
  );
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Live Orders</h1>
        <p className="text-gray-600">Manage your active orders</p>
      </div>
      
      {liveOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No Live Orders</h3>
          <p className="text-gray-500 mb-6">You don't have any active orders at the moment.</p>
          
          <Button className="bg-brand-red hover:bg-red-600" asChild>
            <Link to="/products">
            Browse Products
            </Link>
            
          </Button>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-medium">Order #{order.orderNumber}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  order.status === 'on-the-way' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace(/-/g, ' ')}
                </span>
              </div>
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date:</span>
                    <span>{formatDate(order.date)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Time:</span>
                    <span>{formatTime(order.date)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Customer:</span>
                    <span>{order.customerDetails.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Items:</span>
                    <span>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total:</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-brand-red hover:bg-red-600"
                  onClick={() => handleViewOrder(order)}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            <OrderDetails order={selectedOrder} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default LiveOrders;
