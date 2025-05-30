// components/Header.tsx
import Link from 'next/link';
import { ShoppingBag, Menu, Search, X } from 'lucide-react';

import Sidebar from './Sidebar';

// Add new props to Header component
interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isSearchBarOpen: boolean;
  toggleSearchBar: () => void;
  cartItemCount: number; // New prop for cart item count
  toggleCartSidebar: () => void; // New prop to toggle cart sidebar
}

export default function Header({
  isSidebarOpen,
  toggleSidebar,
  isSearchBarOpen,
  toggleSearchBar,
  cartItemCount, // Destructure new prop
  toggleCartSidebar, // Destructure new prop
}: HeaderProps) {

  // Removed local state for sidebar and search bar, now managed by parent
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);


  return (
    <header className="bg-[#FFD5DF] shadow-md py-3 px-4 sm:px-6 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section - Menu & Search */}
        <div className="flex items-center space-x-4">
          {/* Menu Button - Toggles sidebar */}
          <button
            onClick={toggleSidebar}
            className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
          >
            <Menu size={22} className="shrink-0" />
            <span className="text-sm">Menu</span>
          </button>

          {/* Search Button - Toggles search bar */}
          <button
            onClick={toggleSearchBar}
            className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
          >
            <Search size={22} className="shrink-0" />
            <span className="text-sm">Search</span>
          </button>
        </div>

        {/* Center Logo */}
        <div className="flex flex-col items-center mx-2 sm:mx-4">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-pink-600 transition-colors">
          <span className="text-pink-500">G&apos;</span>LORE

          </Link>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-[-2px] tracking-wider">
            CLOTHES THAT SMILE
          </p>
        </div>

        {/* Right Section - Shopping Bag */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button // Changed from Link to button to open sidebar, but still can navigate
            onClick={toggleCartSidebar} // Call the new prop to open cart sidebar
            className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors relative"
          >
            <ShoppingBag size={20} className="shrink-0 fill-black stroke-black" />
            <span className="text-sm">Shop</span>
            <span className="bg-pink-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center absolute -right-2 top-0 transform -translate-y-1/2">
              {cartItemCount} {/* Display dynamic cart count */}
            </span>
          </button>
          {/* If you still want the "Shop" button to be a Link to /shop page, but also open the sidebar:
              You might use Link with a button inside, or handle navigation programmatically in toggleCartSidebar
              For now, I made it a button to prioritize sidebar opening.
              If you want to keep it as a Link to /shop, you'd make the cart count badge itself clickable or a separate button.
           */}
        </div>
      </div>

      {/* Dynamic Search Bar (remains in Header as it's directly related to header actions) */}
      {isSearchBarOpen && (
        <div className="absolute left-0 right-0 top-full bg-[#FFD5DF] py-3 px-4 sm:px-6 shadow-md z-40">
          <div className="max-w-md mx-auto flex items-center bg-gray-800 rounded-full overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow py-2 px-4 text-white focus:outline-none placeholder-gray-400"
            />
            <button className="p-2 text-white hover:text-gray-200 focus:outline-none">
              <Search size={20} />
            </button>
            <button onClick={toggleSearchBar} className="p-2 text-white hover:text-gray-200 focus:outline-none">
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Component (Categories) */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      {/* Shopping Cart Sidebar is now rendered in the parent (HomePage) */}
    </header>
  );
}