// lib/api.ts

interface ProductFromAPI {
  _id: string;
  name: string;
  price: string;
  images: { secure_url: string }[];
  category?: string | { name: string };
  description?: string;
  [key: string]: unknown;
}

export interface ProcessedProduct {
  _id: string;
  name: string;
  images: { secure_url: string }[];
  originalPrice: number;
  discountedPrice: number;
  category: string;
  description?: string;
}

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
    name: "জর্জেট হাতের কাজ থ্রি পিস",
    originalPrice: 1800,
    discountedPrice: 1550,
  },
  {
    name: "আর্টিফিশিয়াল লেদার পার্স",
    originalPrice: 1200,
    discountedPrice: 999,
  },
];

export async function fetchProductsForDisplay(): Promise<ProcessedProduct[]> {
  try {
    const res = await fetch('https://glore-bd-backend-node-mongo.vercel.app/api/product');
    if (!res.ok) {
      console.error(`Fetch failed: ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    const fetchedProducts: ProductFromAPI[] = Array.isArray(json.data) ? json.data : [];

    const processed = fetchedProducts.slice(0, sampleProductData.length).map((product, index) => {
      const sample = sampleProductData[index];
     type CategoryType = string | { name: string };

const category = typeof product.category === 'string'
  ? product.category
  : (product.category as { name?: string })?.name || 'Uncategorized';
      const description = typeof product.description === 'string' ? product.description : '';

      return {
        _id: product._id,
        name: sample?.name || product.name,
        images: product.images,
        originalPrice: sample?.originalPrice || parseFloat(product.price),
        discountedPrice: sample?.discountedPrice || parseFloat(product.price),
        category,
        description,
      };
    });

    return processed;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<ProcessedProduct | null> {
  const products = await fetchProductsForDisplay();
  const product = products.find((p) => p._id === id);
  if (!product) {
    console.error(`Product with ID ${id} not found`);
    return null;
  }
  return product;
}
