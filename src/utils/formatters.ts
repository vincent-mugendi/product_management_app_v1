
// Format currency with currency symbol
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};

// Format date to display in UI
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Format time to display in UI
export const formatTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

// Generate CSV content for order data
export const generateOrderCsv = (order: any): string => {
  // Create header row
  let csv = 'Product,Quantity,Price Each,Total Price\n';
  
  // Add items
  order.items.forEach((item: any) => {
    csv += `"${item.product.title}",${item.quantity},${formatCurrency(item.product.price)},${formatCurrency(item.product.price * item.quantity)}\n`;
  });
  
  // Add summary rows
  csv += `\nSubtotal,,,"${formatCurrency(order.subtotal)}"\n`;
  csv += `Delivery Fee,,,"${formatCurrency(order.deliveryFee)}"\n`;
  csv += `Total,,,"${formatCurrency(order.total)}"\n`;
  
  // Add customer details
  csv += `\nCustomer Information\n`;
  csv += `Name:,"${order.customerDetails.name}"\n`;
  csv += `Phone:,"${order.customerDetails.phone}"\n`;
  csv += `Address:,"${order.customerDetails.deliveryAddress.line}, ${order.customerDetails.deliveryAddress.buildingName}, ${order.customerDetails.deliveryAddress.streetName}, ${order.customerDetails.deliveryAddress.postcode}"\n`;
  
  return csv;
};

// Download content as a file
export const downloadFile = (content: string, fileName: string, contentType: string): void => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};
