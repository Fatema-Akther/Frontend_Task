'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import ShoppingCartSidebar from '@/components/ShoppingCartSidebar';
import Footer from '@/components/Footer';
import { fetchProductById, ProcessedProduct } from "@/lib/api";
import { CartItem, CartProduct } from '@/app/types/types';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProcessedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      if (typeof id !== 'string') {
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };

    getProduct();
  }, [id]);

  const handleAddToCart = (productToAdd: ProcessedProduct) => {
    const cartProductData: CartProduct = {
      _id: productToAdd._id,
      name: productToAdd.name,
      price: productToAdd.discountedPrice || productToAdd.originalPrice,
      imageUrl: productToAdd.images[0]?.secure_url || '/placeholder.png',
    };

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === cartProductData._id);
      if (existing) {
        return prevItems.map((item) =>
          item._id === cartProductData._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...cartProductData, quantity: 1 }];
    });
    setIsCartSidebarOpen(true);
  };

  const handleQuantityChange = (itemId: string, qty: number) => {
    setCartItems((prev) =>
      qty <= 0 ? prev.filter((i) => i._id !== itemId) : prev.map((i) => i._id === itemId ? { ...i, quantity: qty } : i)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  const handleClearAll = () => {
    setCartItems([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFD5DF]">
        <p className="text-xl text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#FFD5DF]">
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSearchBarOpen={isSearchBarOpen}
          toggleSearchBar={() => setIsSearchBarOpen(!isSearchBarOpen)}
          cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          toggleCartSidebar={() => setIsCartSidebarOpen(!isCartSidebarOpen)}
        />
        <main className="flex-grow flex items-center justify-center p-6 text-center text-red-500 text-xl">
          Product not found.
        </main>
        <Footer />
        <ShoppingCartSidebar
          isOpen={isCartSidebarOpen}
          onClose={() => setIsCartSidebarOpen(false)}
          cartItems={cartItems}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
          onClearAll={handleClearAll}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFEBF0]">
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSearchBarOpen={isSearchBarOpen}
        toggleSearchBar={() => setIsSearchBarOpen(!isSearchBarOpen)}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        toggleCartSidebar={() => setIsCartSidebarOpen(!isCartSidebarOpen)}
      />

      <main className="flex-grow p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-lg my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md">
            <Image
              src={product.images[0]?.secure_url || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-2">
              <strong className="text-gray-800">Category:</strong> {product.category}
            </p>
            <div className="flex items-baseline mb-4">
              {product.originalPrice > product.discountedPrice ? (
                <>
                  <span className="text-gray-500 line-through text-xl mr-3">
                    ৳ {product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-pink-600 font-bold text-3xl">
                    ৳ {product.discountedPrice.toLocaleString("en-IN")}
                  </span>
                </>
              ) : (
                <span className="text-pink-600 font-bold text-3xl">
                  ৳ {product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <p className="text-gray-800 leading-relaxed mb-6">
              {product.description || "No description available."}
            </p>

            <button
              onClick={() => handleAddToCart(product)}
              className="bg-pink-500 text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-pink-600 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <ShoppingCartSidebar
        isOpen={isCartSidebarOpen}
        onClose={() => setIsCartSidebarOpen(false)}
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
