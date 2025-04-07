
import React from 'react';
import { Bell, Search, ChevronDown, LogOut, Menu } from 'lucide-react';
import { useOrderStore } from '@/hooks/useOrderStore';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { getTotalItems } = useOrderStore();
  const { user, logout } = useAuth();
  const totalItems = getTotalItems();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <header className="bg-white shadow-sm px-4 py-3 md:px-6 md:py-4 flex items-center justify-between fixed md:relative top-0 left-0 right-0 z-10">
      {isMobile && toggleSidebar && (
        <div className="w-8" /> /* Spacer for the sidebar toggle button */
      )}
      
      <div className={`relative ${isMobile ? 'flex-1 ml-8' : ''}`}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 rounded-md border border-gray-200 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
        />
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-6">
        <div className="hidden md:flex items-center space-x-2">
          <span className="font-medium text-gray-700">Open For Order</span>
          <div className="w-8 h-5 bg-gray-200 rounded-full p-0.5 flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full transform duration-300 translate-x-3"></div>
          </div>
        </div>
        
        <Button variant="ghost" className="relative p-1 md:p-2">
          <Bell className="h-5 w-5 text-gray-600" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-0 md:space-x-2 p-1 md:p-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-sm md:font-medium">
                {user ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="hidden md:inline font-medium">{user ? user.name : 'User'}</span>
              <ChevronDown className="h-4 w-4 text-gray-500 hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Orders</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
