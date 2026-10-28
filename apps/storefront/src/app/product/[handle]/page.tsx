import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products, getProductByHandle, getProductsByCategory } from '@/lib/data'
import ProductView from '@/components/product-view'

interface ProductPageProps {
  params: Promise<{ handle: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle })).concat(products.map((p) => ({ handle: p.id })))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params
  const product = getProductByHandle(handle) || products.find((p) => p.id === handle)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params
  const product = getProductByHandle(handle) || products.find((p) => p.id === handle)
  if (!product) notFound()

  const related = getProductsByCategory(product.categorySlug).filter((p) => p.id !== product.id)

  return <ProductView product={product} related={related} />
}
