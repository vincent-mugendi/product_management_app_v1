
import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product, OrderItem } from '@/types';
import { useOrderStore } from '@/hooks/useOrderStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useOrderStore();

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const item: OrderItem = {
      product,
      quantity,
    };
    addToCart(item);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain p-4"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-800 truncate">{product.title}</h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-2">
          <span className="text-brand-red font-bold">{formatCurrency(product.price)}</span>
        </div>
        <div className="mt-2">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{product.category}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={decrementQuantity}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={incrementQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          variant="default" 
          size="sm" 
          className="bg-brand-red text-white hover:bg-red-600"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
