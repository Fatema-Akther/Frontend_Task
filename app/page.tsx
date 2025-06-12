// app/page.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ShoppingCartSidebar from '@/components/ShoppingCartSidebar';
import { fetchProductsForDisplay, ProcessedProduct } from '@/lib/api';
import Link from 'next/link'; // Import Link

import { CartItem, CartProduct } from './types/types';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [products, setProducts] = useState<ProcessedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);

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

  const handleAddToCart = (productToAdd: ProcessedProduct) => {
    const cartProductData: CartProduct = {
      _id: productToAdd._id,
      name: productToAdd.name,
      price: productToAdd.discountedPrice > 0 ? productToAdd.discountedPrice : productToAdd.originalPrice,
      imageUrl: productToAdd.images[0]?.secure_url || '/placeholder.png',
    };

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === cartProductData._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === cartProductData._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...cartProductData, quantity: 1 }];
      }
    });
    setIsCartSidebarOpen(true);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item._id !== itemId);
      }
      return prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  const handleClearAll = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen l">
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSearchBarOpen={isSearchBarOpen}
        toggleSearchBar={() => setIsSearchBarOpen(!isSearchBarOpen)}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        toggleCartSidebar={() => setIsCartSidebarOpen(!isCartSidebarOpen)}
      />

      <main className=" pt-1 bg-[#FFD5DF] ">
        {/* ... Hero Section ... */}
        <section className="relative w-full max-w-[85rem] mx-auto h-[770px] bg-[#FFF2F5] flex items-center justify-center overflow-hidden rounded-xl mb-20">
          <div className="relative z-20 text-center pl-6 md:pl-16 lg:pl-24 max-w-lg flex-shrink-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
              নতুন <br />

              <span className="text-pink-500"> কালেকশন</span>
            </h2>

            <div className="text-gray-700 text-sm md:text-base lg:text-lg mb-8 leading-relaxed space-y-2 whitespace-pre-line">
              <p>
                <span className="text-pink-500">&#10022;</span> <span className="text-pink-500"> GloreBD</span>-এর সাথে ফ্যাশনে পা রাখুন নতুন দিঙ্গেই!
                <span className="text-pink-500 ml-1">&#10084;</span>
              </p>
              <p>আমাদের এক্সক্লুসিভ নতুন কালেকশন এখন উপলব্ধ!</p>
              <p>
                আপনার প্রিয় ফ্যাশন স্টাইলে নিজেকে সাজান অনন্যভাবে
                <span className="text-pink-500 ml-1">&#10084;</span>
              </p>
            </div>

            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300 ease-in-out">
              অর্ডার করুন
            </button>
          </div>


          <div className="relative h-full w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] flex-shrink-0 flex items-center justify-end">
            <Image
              src="/images/model-banner.png"
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
    <p className="text-pink-500 text-2xl font-bold mb-3">✨ নতুন স্টাইল এখন ট্রেন্ড! ✨</p>
    <p className="text-gray-700 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
      ট্রেন্ডি পোশাকের সাথে থাকুন সবসময়, এক ধাপ এগিয়ে আপনার ফ্যাশন, আপনার পরিব্র
      <span className="text-pink-500 font-bold"> GloreBD</span> এর সাথে! 💖
    </p>
  </section>

  <h1 className="text-2xl font-bold mb-2 text-mostleft text-gray-800">Women Clothing</h1>

  {loading ? (
    <p className="text-center text-gray-600">Loading products...</p>
  ) : products.length === 0 ? (
    <p className="text-center text-gray-600">No products found. Please check API or sample data.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 max-w-8xl mx-auto">
      {products.map((product) => {
        const discountPercentage =
          (product.originalPrice > 0 && product.discountedPrice < product.originalPrice)
            ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
            : 0;

        return (
          <Link href={`/products/${product._id}`} key={product._id}>
            <div className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col group cursor-pointer">
              <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-t overflow-hidden">
                <Image
                  src={product.images[0]?.secure_url || '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t transition-transform duration-300 ease-in-out group-hover:scale-90"
                />

               
                {discountPercentage > 0 && (
                  <div className="absolute top-3 right-3 bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10 shadow-md">
                    Save: {discountPercentage}%
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>

                <div className="flex flex-col items-start mb-4">
                  {product.originalPrice > product.discountedPrice && (
                    <span className="text-gray-500 line-through text-sm mb-1">
                      ৳ {product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
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
          </Link>
        );
      })}
    </div>
  )}
</section>

        {/* NEWLY ADDED SECTION - MODIFIED FOR DEMO LOOK */}
        {/* Products Section */}
        <section className="min-screen p-10 bg-[#FFEBF0]">
          {/* ... (আপনার প্রোডাক্ট সেকশনের কনটেন্ট) ... */}
        </section>

        {/* NEWLY ADDED SECTION - MODIFIED FOR DEMO LOOK AND GAP */}
        <section className="bg-[#FFD5DF] py-8 mt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Column 1: Easy Exchange Policy */}
              <div className="flex flex-col items-center p-6 "> {/* Adjusted shadow */}
                <div className="mb-4">
                  {/* SVG for Easy Exchange Policy - Wavy M from demo */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    //className="text-pink-500"
                    className="text-black"

                  >
                    <path d="M4 21v-7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v7" />
                    <path d="M12 11h.01" />
                    <path d="M12 14v.01" />
                    <path d="M12 17v.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Exchange Policy</h3>
                <p className="text-gray-700">We Offer hassle free exchange policy</p>
              </div>

              {/* Column 2: 3 Days Return Policy - Checkmark Badge from demo */}
              <div className="flex flex-col items-center p-6 "> {/* Adjusted shadow */}
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black"

                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">3 Days Return Policy</h3>
                <p className="text-gray-700">We provide 3 days free return policy</p>
              </div>

              {/* Column 3: Best customer support - Headset from demo */}
              <div className="flex flex-col items-center p-6 "> {/* Adjusted shadow */}
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black"

                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
                    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Best customer support</h3>
                <p className="text-gray-700">we provide 24/7 customer support</p>
              </div>
            </div>
          </div>
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
      <Footer />
    </div>

  );
}