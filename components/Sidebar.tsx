// components/Sidebar.tsx
import Link from 'next/link';
import { X, ChevronDown, ChevronUp } from 'lucide-react'; // Import ChevronDown and ChevronUp
import { useState } from 'react'; // Import useState for managing sub-menu state

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isWomenClothingOpen, setIsWomenClothingOpen] = useState(false); // State for Women Clothing dropdown

  const toggleWomenClothing = () => {
    setIsWomenClothingOpen(!isWomenClothingOpen);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <div
                className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-pink-600 font-medium"
                onClick={toggleWomenClothing} // Click to toggle dropdown
              >
                Women Clothing
                {isWomenClothingOpen ? (
                  <ChevronUp size={16} className="shrink-0" />
                ) : (
                  <ChevronDown size={16} className="shrink-0" />
                )}
              </div>
              {/* Sub-menu for Women Clothing */}
              {isWomenClothingOpen && (
                <ul className="pl-4 mt-2 space-y-1"> {/* Indent sub-items */}
                  <li>
                    <Link href="/categories/women-clothing/jamdhani-sharee" onClick={onClose} className="block text-gray-600 hover:text-pink-600 text-sm">
                      Jamdhani Sharee
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/women-clothing/three-prics" onClick={onClose} className="block text-gray-600 hover:text-pink-600 text-sm">
                      Three Prios {/* Assuming 'Prics' is a typo for 'Prios' or similar */}
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/women-clothing/unsticthed-party-dress" onClick={onClose} className="block text-gray-600 hover:text-pink-600 text-sm">
                      unstitched party dress
                    </Link>
                  </li>
                  {/* Add more sub-categories here */}
                </ul>
              )}
            </li>
            {/* Add more main categories here as needed */}
          </ul>
        </nav>
      </div>
    </>
  );
}