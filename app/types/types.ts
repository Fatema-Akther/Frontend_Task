// types/index.ts (or types.ts)

// Matches the structure needed for the cart items
export interface CartProduct {
  _id: string; // From ProcessedProduct
  name: string;
  price: number; // The price displayed in the cart (e.g., discounted)
  imageUrl: string;
}

// The actual cart item, including quantity
export interface CartItem extends CartProduct {
  quantity: number;
}