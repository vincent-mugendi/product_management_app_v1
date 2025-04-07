
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  X,
  Download
} from 'lucide-react';
import { useOrderStore } from '@/hooks/useOrderStore';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { formatCurrency } from '@/utils/formatters';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getTotalItems, 
    getSubtotal,
    createOrder,
    defaultCustomerDetails
  } = useOrderStore();
  const { toast } = useToast();
  const [customerDetails, setCustomerDetails] = useState(defaultCustomerDetails);
  
  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleCreateOrder = () => {
    if (!customerDetails.name.trim() || !customerDetails.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide customer name and phone number",
        variant: "destructive",
      });
      return;
    }
    
    if (!customerDetails.deliveryAddress.line.trim() || 
        !customerDetails.deliveryAddress.postcode.trim()) {
      toast({
        title: "Missing Address",
        description: "Please provide delivery address details",
        variant: "destructive",
      });
      return;
    }

    createOrder(customerDetails);
    setCustomerDetails(defaultCustomerDetails);
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Shopping Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-2 px-4 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <ShoppingCart className="h-12 w-12 mb-2 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex border-b pb-4">
                  <div className="h-16 w-16 mr-3 bg-gray-50 rounded flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-800 text-sm line-clamp-1">{item.product.title}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-gray-500 hover:text-red-500"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-brand-red font-medium mt-1">
                      {formatCurrency(item.product.price)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-gray-600 text-sm font-medium">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <SheetFooter className="p-4 border-t mt-auto">
          <div className="w-full">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-semibold">{formatCurrency(0)}</span>
            </div>
            <div className="flex justify-between mb-6 text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold">{formatCurrency(subtotal)}</span>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="w-full bg-brand-red hover:bg-red-600"
                  disabled={cart.length === 0}
                >
                  Checkout
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Complete Your Order</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={customerDetails.deliveryAddress.line}
                      onChange={(e) => setCustomerDetails({
                        ...customerDetails, 
                        deliveryAddress: {
                          ...customerDetails.deliveryAddress,
                          line: e.target.value
                        }
                      })}
                      className="col-span-3"
                      placeholder="Street Address"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="building" className="text-right">
                      Building
                    </Label>
                    <Input
                      id="building"
                      value={customerDetails.deliveryAddress.buildingName}
                      onChange={(e) => setCustomerDetails({
                        ...customerDetails, 
                        deliveryAddress: {
                          ...customerDetails.deliveryAddress,
                          buildingName: e.target.value
                        }
                      })}
                      className="col-span-3"
                      placeholder="Apartment, Building, etc."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="street" className="text-right">
                      Street
                    </Label>
                    <Input
                      id="street"
                      value={customerDetails.deliveryAddress.streetName}
                      onChange={(e) => setCustomerDetails({
                        ...customerDetails, 
                        deliveryAddress: {
                          ...customerDetails.deliveryAddress,
                          streetName: e.target.value
                        }
                      })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="postcode" className="text-right">
                      Postcode
                    </Label>
                    <Input
                      id="postcode"
                      value={customerDetails.deliveryAddress.postcode}
                      onChange={(e) => setCustomerDetails({
                        ...customerDetails, 
                        deliveryAddress: {
                          ...customerDetails.deliveryAddress,
                          postcode: e.target.value
                        }
                      })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={handleCreateOrder} className="bg-brand-red hover:bg-red-600">
                      Place Order
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
