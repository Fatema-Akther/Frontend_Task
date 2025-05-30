// app/collection/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Product {
  _id: string
  name: string
  price: number
  image: string // Adjust this key if your API returns a different field name
}

export default function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://glore-bd-backend-node-mongo.vercel.app/api/product')
        const data = await res.json()
        setProducts(data.products || []) // Make sure `data.products` is the actual array
      } catch (err) {
        console.error('Failed to fetch products:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white text-black p-4 rounded shadow">
            <div className="relative w-full h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-sm text-gray-600 mt-1">৳ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
