
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import Header from './Header';
import Cart from './Cart';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Layout = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {showSidebar ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}

      {/* Sidebar */}
      <div 
        className={`
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`
            : 'w-64 flex-shrink-0'
          }
        `}
      >
        <SidebarNav onItemClick={() => isMobile && setShowSidebar(false)} />
      </div>

      {/* Main content */}
      <div className={`flex-1 flex flex-col ${isMobile ? 'w-full' : 'ml-0'}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <div className="mb-6 flex justify-end">
            <Cart />
          </div>
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {isMobile && showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default Layout;
