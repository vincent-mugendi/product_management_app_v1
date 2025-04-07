import { useState, useEffect } from 'react';
import { OrderItem, Order, CustomerDetails } from '@/types';
import { toast } from 'sonner';

// Generate a random order number
const generateOrderNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Get the current date in ISO format
const getCurrentDate = () => {
  return new Date().toISOString();
};

// Generate a random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Calculate the total price of all items in the cart
const calculateTotal = (items: OrderItem[]) => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

// Default customer details for new orders
const defaultCustomerDetails: CustomerDetails = {
  name: '',
  phone: '',
  bagOption: 'No Bag',
  deliveryAddress: {
    line: '',
    buildingName: '',
    streetName: '',
    postcode: '',
  },
};

export const useOrderStore = () => {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Load cart and orders from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const savedOrders = localStorage.getItem('orders');
      
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);
  
  // Save orders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }, [orders]);
  
  // Add a product to the cart
  const addToCart = (item: OrderItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.product.id === item.product.id
      );
      
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, increment quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        toast.success(`Updated quantity of ${item.product.title}`);
        return updatedCart;
      } else {
        // Otherwise, add the new item to the cart
        toast.success(`Added ${item.product.title} to cart`);
        return [...prevCart, item];
      }
    });
  };
  
  // Remove a product from the cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const product = prevCart.find(item => item.product.id === productId);
      if (product) {
        toast.success(`Removed ${product.product.title} from cart`);
      }
      return prevCart.filter(item => item.product.id !== productId);
    });
  };
  
  // Update the quantity of a product in the cart
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  // Clear the cart
  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };
  
  // Get the total items in the cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  // Get the subtotal of the cart
  const getSubtotal = () => {
    return calculateTotal(cart);
  };
  
  // Create a new order from the cart
  const createOrder = (customerDetails: CustomerDetails) => {
    if (cart.length === 0) {
      toast.error('Cannot create an order with empty cart');
      return null;
    }
    
    const subtotal = getSubtotal();
    const deliveryFee = 0; // Free delivery
    const total = subtotal + deliveryFee;
    
    const newOrder: Order = {
      id: generateId(),
      orderNumber: generateOrderNumber(),
      items: [...cart],
      customerDetails,
      date: getCurrentDate(),
      status: 'pending',
      subtotal,
      deliveryFee,
      total,
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
    clearCart();
    toast.success(`Order #${newOrder.orderNumber} created successfully`);
    
    return newOrder;
  };
  
  // Update an existing order
  const updateOrder = (updatedOrder: Order) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    toast.success(`Order #${updatedOrder.orderNumber} updated`);
  };
  
  // Delete an order
  const deleteOrder = (orderId: string) => {
    setOrders(prevOrders => {
      const order = prevOrders.find(o => o.id === orderId);
      if (order) {
        toast.success(`Order #${order.orderNumber} deleted`);
      }
      return prevOrders.filter(order => order.id !== orderId);
    });
  };
  
  return {
    cart,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
    createOrder,
    updateOrder,
    deleteOrder,
    defaultCustomerDetails,
  };
};
