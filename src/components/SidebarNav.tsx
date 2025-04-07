
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Clock,
  ShoppingBasket,
  Tag,
  PackageOpen,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavProps {
  onItemClick?: () => void;
}

const SidebarNav = ({ onItemClick }: SidebarNavProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const links = [
    {
      href: '/',
      icon: LayoutDashboard,
      label: 'Live Orders',
      active: pathname === '/' || pathname === '/index',
    },
    {
      href: '/order-history',
      icon: Clock,
      label: 'Order History',
      active: pathname === '/order-history',
    },
    {
      href: '/products',
      icon: ShoppingBasket,
      label: 'Products',
      active: pathname === '/products',
    },
    {
      href: '/offers',
      icon: Tag,
      label: 'Offers',
      active: pathname === '/offers',
    },
    {
      href: '/stock',
      icon: PackageOpen,
      label: 'Stock',
      active: pathname === '/stock',
    },
    {
      href: '/message',
      icon: MessageSquare,
      label: 'Message',
      active: pathname === '/message',
    },
    {
      href: '/settings',
      icon: Settings,
      label: 'Settings',
      active: pathname === '/settings',
    },
  ];

  const handleClick = () => {
    if (onItemClick) onItemClick();
  };

  return (
    <aside className="h-full bg-sidebar-background border-r border-sidebar-border overflow-y-auto">
      <div className="py-6 px-4 flex flex-col h-full">
        <div className="mb-6 px-2">
          <h2 className="text-2xl font-bold text-brand-red">Shop Smart</h2>
          <p className="text-sm text-gray-500">Dashboard</p>
        </div>
        
        <nav className="space-y-1 flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={handleClick}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                link.active
                  ? "bg-brand-red text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <link.icon className="mr-3 h-5 w-5" />
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="pt-4 pb-2 px-4 mt-auto">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-medium text-sm">Need Help?</h3>
            <p className="text-xs text-gray-600 mt-1">Contact support for assistance with your orders and products.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
