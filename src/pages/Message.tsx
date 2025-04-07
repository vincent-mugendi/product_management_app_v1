
import React from 'react';
import { MessageSquare } from 'lucide-react';

const Message = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-gray-600">Communicate with customers and team members</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Messaging Coming Soon</h3>
        <p className="text-gray-500">
          This feature is currently in development.
          Check back later for customer and team communication.
        </p>
      </div>
    </div>
  );
};

export default Message;
