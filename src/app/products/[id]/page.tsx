'use client'
import { use, useState } from 'react'
import { useProduct } from '@/app/products/[id]/hooks/use-product'

export interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params)
  const { data, isLoading, error } = useProduct(id)

  const [mainImage, setMainImage] = useState<string | null>(null)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!mainImage && data.images.length > 0) {
    setMainImage(data.images[0])
  }

  return (
    <div className="product-detail-page">
      <div className="container mx-auto px-4">

        <div className="flex flex-col lg:flex-row">

          <div className="w-full lg:w-1/4 flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-auto">
            {data.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="cursor-pointer w-24 h-24 object-cover border-2 border-gray-300 rounded hover:border-blue-500"
                onMouseEnter={() => setMainImage(image)}
              />
            ))}
          </div>


          <div className="w-full lg:w-3/4 mt-4 lg:mt-0 pl-0 lg:pl-4">
            {mainImage && (
              <img
                src={mainImage}
                alt="Main Product Image"
                className="w-full max-w-lg mx-auto object-contain rounded border border-gray-300"
              />
            )}
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-2xl lg:text-3xl font-bold">{data.title}</h1>
          <p className="mt-2 text-sm lg:text-base text-gray-700">
            {data.description}
          </p>
          <div className="mt-4">
            <p className="text-lg lg:text-xl font-semibold">${data.price}</p>
            <p className="text-sm lg:text-lg text-gray-500">
              Brand: {data.brand}
            </p>
            <p className="text-sm lg:text-lg text-gray-500">
              Stock: {data.stock}
            </p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl lg:text-2xl font-semibold">Reviews</h2>
          {data.reviews.length > 0 ? (
            data.reviews.map((review: any, index: number) => (
              <div key={index} className="mt-4">
                <p className="font-bold">{review.reviewerName}</p>
                <p className="text-sm lg:text-base">
                  Rating: {review.rating}/5
                </p>
                <p className="text-sm lg:text-base">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-sm lg:text-base">
              No reviews available for this product.
            </p>
          )}
        </div>


        <div className="mt-6">
          <p className="font-semibold text-sm lg:text-base">
            Return Policy: {data.returnPolicy}
          </p>
        </div>
      </div>
    </div>
  )
}

