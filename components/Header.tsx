'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Sidebar from './Sidebar';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isSearchBarOpen: boolean;
  toggleSearchBar: () => void;
  cartItemCount: number;
  toggleCartSidebar: () => void;
}

export default function Header({
  isSidebarOpen,
  toggleSidebar,
  isSearchBarOpen,
  toggleSearchBar,
  cartItemCount,
  toggleCartSidebar,
}: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/Search?category=${encodeURIComponent(searchQuery.trim())}`);
      toggleSearchBar(); // Optional: close the search bar after search
    }
  };

  return (
    <header className="bg-[#FFD5DF] shadow-md py-3 px-4 sm:px-6 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section - Menu & Search */}
        <div className="flex items-center space-x-4">
          {/* Menu Button */}
          <button
            onClick={toggleSidebar}
            className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
          >
            <Menu size={22} className="shrink-0" />
            <span className="text-sm font-bold">Menu</span>
          </button>

          {/* Search Button */}
          <button
            onClick={toggleSearchBar}
            className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
          >
            <Search size={22} className="shrink-0" />
            <span className="text-sm font-bold">Search</span>
          </button>
        </div>

        {/* Center Logo */}
        <div className="flex flex-col items-center mx-2 sm:mx-4">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-pink-600 transition-colors"
          >
            <span className="text-pink-500">G&apos;</span>LORE
          </Link>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-[-2px] tracking-wider">
            CLOTHES THAT SMILE
          </p>
        </div>

        {/* Right Section - Cart */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={toggleCartSidebar}
            className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors relative"
          >
            <ShoppingBag size={20} className="shrink-0 fill-black stroke-black" />
            <span className="text-sm font-bold">Shop</span>
            <span className="bg-pink-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center absolute -right-2 top-0 transform -translate-y-1/2">
              {cartItemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchBarOpen && (
        <div className="absolute left-0 right-0 top-full bg-[#FFD5DF] py-3 px-4 sm:px-6 shadow-md z-40">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-md mx-auto flex items-center bg-gray-800 rounded-full overflow-hidden shadow-sm"
          >
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by category..."
              className="flex-grow py-2 px-4 text-white focus:outline-none placeholder-gray-400"
            />
            <button type="submit" className="p-2 text-white hover:text-gray-200 focus:outline-none">
              <Search size={20} />
            </button>
            <button
              type="button"
              onClick={toggleSearchBar}
              className="p-2 text-white hover:text-gray-200 focus:outline-none"
            >
              <X size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </header>
  );
}
