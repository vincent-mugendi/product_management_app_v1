
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  customerDetails: CustomerDetails;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled' | 'on-the-way';
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  bagOption: string;
  deliveryAddress: {
    line: string;
    buildingName: string;
    streetName: string;
    postcode: string;
  };
}
