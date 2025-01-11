import Link from 'next/link';

interface CategoryDetails {
  name: string;
  slug: { current: string };
}

interface FeaturedItem {
  name: string;
  slug: { current: string };
  image: { asset: { url: string } };
  price: number;
}

interface HeroProps {
  categories: CategoryDetails[];
  featuredProducts: FeaturedItem[];
}

const Hero = ({ categories = [], featuredProducts = [] }: HeroProps) => {
  return (
    <div>
      {/* Navigation */}
      <header className="bg-gradient-to-r from-purple-800 to-indigo-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ShopNow</h1>
          <nav className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Link key={index} href={`/category/${category.slug.current}`}>
                <span className="px-4 py-2 bg-white text-blue-800 rounded-md hover:bg-blue-600 hover:text-white transition-all">
                  {category.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Featured Products */}
      <main className="bg-gray-100 py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden"
              >
                <Link href={`/product/${product.slug.current}`}>
                  <div>
                    <img
                      src={product.image.asset.url}
                      alt={product.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;