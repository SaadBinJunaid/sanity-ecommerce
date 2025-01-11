import Link from 'next/link';
import { sanityClient } from '../../../lib/sanity';

export interface ProductDetails {
  name: string;
  slug: { current: string };
  image: { asset: { url: string } };
  price: number;
  description: string;
  category: { name: string; slug: { current: string } };
}

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductView({ params }: ProductPageProps) {
  const { slug } = params;

  const fetchProductQuery = `*[_type == "product" && slug.current == $slug][0]{
    name,
    slug,
    image {
      asset -> { url }
    },
    price,
    description,
    category -> { name, slug }
  }`;

  const product: ProductDetails = await sanityClient.fetch(fetchProductQuery, { slug });

  if (!product) {
    return <h1 className="text-center text-2xl mt-10">Product Not Found</h1>;
  }

  return (
    <div>
      {/* Navigation */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ShopNow</h1>
          <Link href="/">
            <span className="hover:underline">Home</span>
          </Link>
        </div>
      </header>

      {/* Product Details */}
      <main className="container mx-auto py-12 grid sm:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image.asset.url}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-600">{product.name}</h1>
          <p className="text-2xl text-gray-700 mt-4">${product.price}</p>
          <p className="mt-6">{product.description}</p>
          <Link
            href={`/category/${product.category.slug.current}`}
            className="mt-10 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            More in {product.category.name}
          </Link>
        </div>
      </main>
    </div>
  );
}