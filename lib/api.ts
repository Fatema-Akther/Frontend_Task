// lib/api.ts
// This file will fetch actual product images but overlay sample data for names and prices.

interface ProductFromAPI {
  _id: string;
  name: string; // The original name from API (we'll override this with sample data)
  price: string; // The original price from API (we'll override this with sample data)
  images: { secure_url: string }[];
  // Assuming your API might have other fields you might want to preserve,
  // like description, category etc. if you ever use them.
  [key: string]: any; // Allows for other properties from the API
}

// Define the structure of the product data we want to *return* to the frontend
export interface ProcessedProduct { // This is already exported, which is good
  _id: string;
  name: string;
  images: { secure_url: string }[];
  originalPrice: number;
  discountedPrice: number;
}

// *** IMPORTANT: ADD 'export' KEYWORD HERE ***
export async function fetchProductsForDisplay(): Promise<ProcessedProduct[]> {
  try {
    const res = await fetch('https://glore-bd-backend-node-mongo.vercel.app/api/product');
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch products: ${res.status} ${res.statusText} - ${errorText}`);
      return []; // Return empty array on fetch failure
    }

    const json = await res.json();

    if (!Array.isArray(json.data)) {
      console.error("API response data is not an array:", json.data);
      return [];
    }

    const fetchedProducts: ProductFromAPI[] = json.data;

    const sampleProductData = [
      {
        name: "unready made Indian Embroidery Party dress",
        originalPrice: 2500,
        discountedPrice: 2200,
      },
      {
        name: "প্রিমিয়াম ইন্ডিয়ান জর্জেট পার্টি কালেকশন",
        originalPrice: 2800,
        discountedPrice: 2499,
      },
      {
        name: "জর্জেট হাতের কাজ থ্রি পিস", // Example third product
        originalPrice: 1800,
        discountedPrice: 1550,
      },
      {
        name: "আর্টিফিশিয়াল লেদার পার্স", // Example fourth product
        originalPrice: 1200,
        discountedPrice: 999,
      },
    ];

    const processedProducts: ProcessedProduct[] = fetchedProducts.slice(0, sampleProductData.length).map((product, index) => {
      const sample = sampleProductData[index];
      if (!sample) {
        const apiPrice = parseFloat(product.price);
        return {
          _id: product._id,
          name: product.name,
          images: product.images,
          originalPrice: apiPrice,
          discountedPrice: apiPrice,
        };
      }
      return {
        _id: product._id,
        name: sample.name,
        images: product.images,
        originalPrice: sample.originalPrice,
        discountedPrice: sample.discountedPrice,
      };
    });

    return processedProducts;
  } catch (error) {
    console.error("Error fetching products for display:", error);
    return [];
  }
}