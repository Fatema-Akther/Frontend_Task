'use client'; // ✅ Add this at the very top
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCartSidebar from '@/components/ShoppingCartSidebar';
import Image from 'next/image';
import { fetchProductsForDisplay, ProcessedProduct } from '@/lib/api';
import { CartItem, CartProduct } from '../types/types';

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const [products, setProducts] = useState<ProcessedProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProcessedProduct[]>([]);
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

  useEffect(() => {
    if (category && products.length > 0) {
      const filtered = products.filter(p =>
        p.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  const handleAddToCart = (productToAdd: ProcessedProduct) => {
    const cartProductData: CartProduct = {
      _id: productToAdd._id,
      name: productToAdd.name,
      price: productToAdd.discountedPrice > 0 ? productToAdd.discountedPrice : productToAdd.originalPrice,
      imageUrl: productToAdd.images[0]?.secure_url || '/placeholder.png',
    };

    setCartItems(prev => {
      const existing = prev.find(item => item._id === cartProductData._id);
      return existing
        ? prev.map(item => item._id === cartProductData._id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { ...cartProductData, quantity: 1 }];
    });

    setIsCartSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFD5DF]">
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSearchBarOpen={isSearchBarOpen}
        toggleSearchBar={() => setIsSearchBarOpen(!isSearchBarOpen)}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        toggleCartSidebar={() => setIsCartSidebarOpen(!isCartSidebarOpen)}
      />

    <main className=" bg-[#FFD5DF]">
  <section className="py-8 px-4 bg-[#FFEBF0] min-h-[60vh]">

          {loading ? (
             <p className="text-center text-gray-600 text-lg">লোড হচ্ছে...</p>
) : filteredProducts.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {filteredProducts.map(product => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <Image
                    src={product.images[0]?.secure_url || '/placeholder.png'}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-md font-semibold mb-1">{product.name}</h3>
                    <div className="mb-2 flex items-center gap-2">
                      {product.discountedPrice > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                          ৳{product.originalPrice}
                        </span>
                      )}
                      <span className="text-pink-600 font-bold">
                        ৳{product.discountedPrice > 0 ? product.discountedPrice : product.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-auto px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[70vh]">
    <p className="text-center text-gray-700  text-base">
      কোনো প্রোডাক্ট পাওয়া যায়নি
    </p>
  </div>
          )}
        </section>
      </main>

      <ShoppingCartSidebar
        isOpen={isCartSidebarOpen}
        onClose={() => setIsCartSidebarOpen(false)}
        cartItems={cartItems}
        onQuantityChange={(id, qty) =>
          setCartItems(prev =>
            prev.map(item =>
              item._id === id ? { ...item, quantity: qty } : item
            )
          )
        }
        onRemoveItem={id =>
          setCartItems(prev => prev.filter(item => item._id !== id))
        }
        onClearAll={() => setCartItems([])}
      />

      <Footer />
    </div>
  );
}
