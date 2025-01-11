import { sanityClient } from '../lib/sanity';
import Hero from './components/Hero';

export interface CategoryDetails {
  name: string;
  slug: { current: string };
}

export interface FeaturedItem {
  name: string;
  slug: { current: string };
  image: { asset: { url: string } };
  price: number;
}

export default async function LandingPage() {
  const fetchFeaturedItemsQuery = `*[_type == "product" && isFeatured == true]{
    name,
    slug,
    image {
      asset -> { url }
    },
    price
  }`;

  const fetchCategoriesQuery = `*[_type == "category"]{
    name,
    slug
  }`;

  const featuredItems: FeaturedItem[] = await sanityClient.fetch(fetchFeaturedItemsQuery);
  const categoryDetails: CategoryDetails[] = await sanityClient.fetch(fetchCategoriesQuery);

  return <Hero categories={categoryDetails} featuredProducts={featuredItems} />;
}