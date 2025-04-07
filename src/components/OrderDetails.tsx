
import React from 'react';
import { formatCurrency, formatDate, formatTime, generateOrderCsv, downloadFile } from '@/utils/formatters';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Download, MessageSquare } from 'lucide-react';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const handleDownloadReport = () => {
    const csv = generateOrderCsv(order);
    downloadFile(csv, `order-${order.orderNumber}.csv`, 'text/csv');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            Order Number <span className="text-brand-red ml-2">#{order.orderNumber}</span>
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Customer
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-medium">Items summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600 text-sm">
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4 text-center">QTY</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-4 flex items-center">
                    <div className="h-12 w-12 mr-3 bg-gray-50 rounded flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <span className="line-clamp-1">{item.product.title}</span>
                  </td>
                  <td className="py-3 px-4 text-center">x {item.quantity}</td>
                  <td className="py-3 px-4 text-right">{formatCurrency(item.product.price)}</td>
                  <td className="py-3 px-4 text-right">{formatCurrency(item.product.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Customer And Order Details</h3>
          </div>
          <div className="divide-y">
            <div className="p-4 flex justify-between">
              <span className="text-gray-600">Customer Name</span>
              <span className="font-medium">{order.customerDetails.name}</span>
            </div>
            <div className="p-4 flex justify-between">
              <span className="text-gray-600">Phone Number</span>
              <span className="font-medium">{order.customerDetails.phone}</span>
            </div>
            <div className="p-4 flex justify-between">
              <span className="text-gray-600">Bag Option</span>
              <span className="font-medium">{order.customerDetails.bagOption}</span>
            </div>
            <div className="p-4 flex justify-between">
              <span className="text-gray-600">Type</span>
              <span className="font-medium">Delivery</span>
            </div>
            <div className="p-4 flex justify-between">
              <span className="text-gray-600">Note</span>
              <span className="font-medium">N/A</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">Rider Details</h3>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 mr-3 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                  R
                </div>
                <span className="font-medium">Rider Assigned</span>
              </div>
              <Button size="sm" className="bg-brand-yellow text-gray-800 hover:bg-yellow-400">
                Track Rider
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">Order summary</h3>
            </div>
            <div className="divide-y">
              <div className="p-4 flex justify-between">
                <span className="text-gray-600">Order Created</span>
                <span className="font-medium">{formatDate(order.date)}</span>
              </div>
              <div className="p-4 flex justify-between">
                <span className="text-gray-600">Order Time</span>
                <span className="font-medium">{formatTime(order.date)}</span>
              </div>
              <div className="p-4 flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="p-4 flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">{formatCurrency(order.deliveryFee)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 flex justify-between items-center">
              <div>
                <span className="text-gray-600">Total</span>
                <div className="text-xl font-bold">{formatCurrency(order.total)}</div>
              </div>
              <Button className="bg-brand-blue hover:bg-blue-600" onClick={handleDownloadReport}>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-medium">Delivery Address</h3>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex">
            <span className="w-40 text-gray-600">Address line:</span>
            <span className="font-medium">{order.customerDetails.deliveryAddress.line}</span>
          </div>
          <div className="flex">
            <span className="w-40 text-gray-600">Flat / Building Name:</span>
            <span className="font-medium">{order.customerDetails.deliveryAddress.buildingName}</span>
          </div>
          <div className="flex">
            <span className="w-40 text-gray-600">Street Name:</span>
            <span className="font-medium">{order.customerDetails.deliveryAddress.streetName}</span>
          </div>
          <div className="flex">
            <span className="w-40 text-gray-600">Postcode:</span>
            <span className="font-medium">{order.customerDetails.deliveryAddress.postcode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
