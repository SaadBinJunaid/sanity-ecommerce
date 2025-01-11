import Link from 'next/link';
import Image from 'next/image';
import { sanityClient } from '../../../lib/sanity';

export interface CategoryDetails {
  name: string;
  slug: { current: string };
}

export interface ProductItem {
  name: string;
  slug: { current: string };
  image: { asset: { url: string } };
  price: number;
  category: CategoryDetails;
}

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryView({ params }: CategoryPageProps) {
  const { slug } = params;

  const fetchProductsQuery = `*[_type == "product" && category->slug.current == $slug]{
    name,
    slug,
    image {
      asset -> { url }
    },
    price,
    category -> { name, slug }
  }`;
  
  const fetchCategoryQuery = `*[_type == "category" && slug.current == $slug][0]{
    name
  }`;  

  const productItems: ProductItem[] = await sanityClient.fetch(fetchProductsQuery, { slug });
  const categoryDetails: CategoryDetails = await sanityClient.fetch(fetchCategoryQuery, { slug });

  if (!categoryDetails) {
    return <h1 className="text-center text-2xl mt-10">Category Not Found</h1>;
  }

  return (
    <div>
      {/* Navigation */}
      <header className="bg-gradient-to-r from-purple-800 to-indigo-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ShopNow</h1>
          <Link href="/">
            <span className="hover:underline text-sm">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Products */}
      <main className="container mx-auto py-12">
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-10">
          {categoryDetails.name}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {productItems.map((product, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md bg-white hover:scale-105 transform transition-transform"
            >
              <Link href={`/product/${product.slug.current}`}>
                <div>
                  <img
                    src={product.image.asset.url}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-indigo-800">{product.name}</h3>
                    <p className="text-gray-700">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}