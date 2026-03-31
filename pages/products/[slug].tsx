import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import type { Product } from '@/types';
import { PRODUCTS, getProductBySlug } from '@/lib/data';
import PageContainer from '@/components/layout/PageContainer';
import ProductDetail from '@/components/products/ProductDetail';

interface ProductPageProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = PRODUCTS.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    return { notFound: true };
  }

  return { props: { product } };
};

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const freeTier = product.pricingTiers.find((t) => t.name === 'Free' && t.price === 0);
  const proTier = product.pricingTiers.find((t) => t.name === 'Pro' && t.price !== null);
  const startingPrice = freeTier
    ? 'Free plan available'
    : proTier?.price
    ? `From $${proTier.price}/mo`
    : 'Custom pricing';

  return (
    <>
      <Head>
        <title>{product.name} — {product.tagline} | Stacklist</title>
        <meta
          name="description"
          content={`${product.name}: ${product.tagline}. ${startingPrice}. Compare pricing, features, and alternatives on Stacklist.`}
        />
      </Head>
      <PageContainer>
        <ProductDetail product={product} />
      </PageContainer>
    </>
  );
};

export default ProductPage;
