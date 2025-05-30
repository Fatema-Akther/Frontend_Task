// components/ShoppingCartSidebar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/app/types/types'; // Corrected import path

interface ShoppingCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[]; // Now uses the imported CartItem
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearAll: () => void;
}

export default function ShoppingCartSidebar({
  isOpen,
  onClose,
  cartItems,
  onQuantityChange,
  onRemoveItem,
  onClearAll,
}: ShoppingCartSidebarProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Shopping Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex items-center mb-4 pb-4 border-b last:border-b-0"> {/* Use item._id */}
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover mr-3"
                />
                <div className="flex-grow">
                  <h3 className="font-medium text-sm text-gray-800">{item.name}</h3>
                  <p className="text-pink-600 text-sm font-semibold">৳{item.price.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() => onQuantityChange(item._id, item.quantity - 1)} // Use item._id
                      disabled={item.quantity <= 1}
                      className="bg-gray-200 text-gray-700 p-1 rounded-sm hover:bg-gray-300 disabled:opacity-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="mx-2 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onQuantityChange(item._id, item.quantity + 1)} // Use item._id
                      className="bg-gray-200 text-gray-700 p-1 rounded-sm hover:bg-gray-300"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item._id)} // Use item._id
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Subtotal:</span>
            <span className="text-pink-600 text-xl font-bold">৳{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onClearAll}
              className="flex-grow py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
            <Link href="/checkout" onClick={onClose} className="flex-grow bg-pink-600 text-white py-2 px-4 rounded-md text-center hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2">
              <span>Checkout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}