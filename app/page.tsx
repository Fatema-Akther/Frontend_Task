// app/page.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ShoppingCartSidebar from '@/components/ShoppingCartSidebar';
import { fetchProductsForDisplay, ProcessedProduct } from '@/lib/api';

// Corrected import path based on our previous discussion about Option B for types
import { CartItem, CartProduct } from '@/app/types/types';

export default function HomePage() {
  const [products, setProducts] = useState<ProcessedProduct[]>([]);
  const [loading, setLoading] = useState(true); // Corrected syntax

  // States for header functionality
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);

  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchProductsForDisplay();
      setProducts(data);
      setLoading(false);
    };

    getProducts();
  }, []);

  // Function to add item to cart
  const handleAddToCart = (productToAdd: ProcessedProduct) => {
    // Map ProcessedProduct to CartProduct (for cart item base)
    const cartProductData: CartProduct = {
      _id: productToAdd._id,
      name: productToAdd.name,
      price: productToAdd.discountedPrice > 0 ? productToAdd.discountedPrice : productToAdd.originalPrice,
      imageUrl: productToAdd.images[0]?.secure_url || '/placeholder.png',
    };

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === cartProductData._id); // Use _id
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === cartProductData._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...cartProductData, quantity: 1 }]; // Ensure it matches CartItem structure
      }
    });
    setIsCartSidebarOpen(true);
  };

  // Function to change quantity in cart
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item._id !== itemId); // Use _id
      }
      return prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item // Use _id
      );
    });
  };

  // Function to remove item from cart
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId)); // Use _id
  };

  // Function to clear all items from cart
  const handleClearAll = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen">
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSearchBarOpen={isSearchBarOpen}
        toggleSearchBar={() => setIsSearchBarOpen(!isSearchBarOpen)}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        toggleCartSidebar={() => setIsCartSidebarOpen(!isCartSidebarOpen)}
      />

      <main className="pt-16 bg-[#FFD5DF]">
        {/* ... Hero Section ... */}
        <section className="relative w-full max-w-7xl mx-auto h-[450px] bg-[#FFF2F5] flex items-center justify-center overflow-hidden rounded-xl">
          <div className="relative z-20 text-left pl-6 md:pl-16 lg:pl-24 max-w-lg flex-shrink-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
              নতুন <br /> কালেকশন
            </h2>
            <p className="text-gray-700 text-base md:text-lg lg:text-xl mb-8 leading-relaxed">
              <span className="text-pink-500 text-xl font-bold align-middle mr-1">
                &#10022;
              </span> GloreBD - এর সাথে ফ্যাশনে পা রাখুন নতুন ডিজাইনে। <span className="text-pink-500">&#10084;</span>
              <br />
              আমাদের এক্সক্লুসিভ নতুন কালেকশন এখন উপলব্ধ!
              <br />
              আপনার প্রিয় ফ্যাশন স্টাইলে নিজেকে সাজান অনন্যভাবে। <span className="text-pink-500">&#10084;</span>
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300 ease-in-out">
              অর্ডার করুন
            </button>
          </div>

          <div className="relative h-full w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] flex-shrink-0 flex items-center justify-end">
            <Image
              src="/images/model-banner.PNG"
              alt="New Collection Model"
              width={700}
              height={800}
              className="h-full w-auto max-w-full object-contain object-right"
              priority
            />
          </div>
        </section>

        {/* Products Section */}
        <section className="min-h-screen p-6 bg-[#FFEBF0]">
          <section className="w-full max-w-7xl mx-auto py-12 text-center mt-8">
            <h4 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
              LATEST COLLECTIONS <span className="inline-block h-1.5 w-28 bg-gray-400 align-middle ml-3"></span>
            </h4>
            <p className="text-pink-500 text-2xl font-bold mb-3">
              ✨ নতুন স্টাইল এখন ট্রেন্ড! ✨
            </p>
            <p className="text-gray-700 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              ট্রেন্ডি পোশাকের সাথে থাকুন সবসময়, এক ধাপ এগিয়ে আপনার ফ্যাশন, আপনার পরিব্র <span className="text-pink-500 font-bold">GloreBD</span> এর সাথে! 💖
            </p>
          </section>

          <h1 className="text-3xl font-bold mb-6 text-left text-gray-800">Women Clothing</h1>

          {loading ? (
            <p className="text-center text-gray-600">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600">No products found. Please check API or sample data.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 max-w-6xl mx-auto">
              {products.map((product) => {
                const discountPercentage =
                  (product.originalPrice > 0 && product.discountedPrice < product.originalPrice)
                    ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
                    : 0;

                return (
                  <div
                    key={product._id}
                    className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col group"
                  >
                    <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-t overflow-hidden">
                      <Image
                        src={product.images[0]?.secure_url || '/placeholder.png'}
                        alt={product.name}
                        fill
                        className="object-cover rounded-t transition-transform duration-300 ease-in-out group-hover:scale-90"
                      />
                      {/* Top Left Icon */}
                      <div className="absolute top-3 left-3 bg-gray-800 p-2 rounded-full z-10 shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M12 2a3 3 0 0 0-3 3v.1a3 3 0 0 0-2.4 2.5 3 3 0 0 0-.4 3.7C5 13 6 15 6 15c0 2-2 6-2 6a2 2 0 0 0 2 2 2 2 0 0 0 2-2c0 0 2-4 2-6h.08C14 15 15 17 15 17a2 2 0 0 0 2 2 2 2 0 0 0 2-2c0 0 1-2 1-4.2a3 3 0 0 0-.4-3.7 3 3 0 0 0-2.4-2.5V5a3 3 0 0 0-3-3z" />
                        </svg>
                      </div>

                      {discountPercentage > 0 && (
                        <div className="absolute top-3 right-3 bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10 shadow-md">
                          Save: {discountPercentage}%
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h2>

                      {/*
                         OLD PRICE DISPLAY - Keeping for reference, but the new structure below
                         will show the actual price next to the button.
                      */}
                      <div className="flex flex-col items-start mb-4">
                        {product.originalPrice > product.discountedPrice ? (
                          <>
                            <span className="text-gray-500 line-through text-sm mb-1">
                              ৳ {product.originalPrice.toLocaleString("en-IN")}
                            </span>
                            {/* <span className="text-xl font-bold text-pink-600">
                              ৳ {product.discountedPrice.toLocaleString("en-IN")}
                            </span> */}
                          </>
                        ) : (
                          // <span className="text-xl font-bold text-gray-800">
                          //   ৳ {product.originalPrice.toLocaleString("en-IN")}
                          // </span>
                          null // No need to show this price here if it's shown next to the button
                        )}
                      </div>



                      {/* NEW: Container for the button and price to place them side-by-side */}
                      <div className="flex justify-between items-center mt-auto"> {/* Added mt-auto to push to bottom */}
                        {/* Swapped order: Button first, then Price */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-pink-500 text-white font-semibold py-2 px-4 rounded-md text-base hover:bg-pink-600 transition duration-300 ease-in-out shadow-md"
                        >
                          অর্ডার করুন
                        </button>
                        <span className="text-xl font-bold text-pink-600">
                          ৳ {(product.discountedPrice > 0 ? product.discountedPrice : product.originalPrice).toLocaleString("en-IN")}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Shopping Cart Sidebar */}
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