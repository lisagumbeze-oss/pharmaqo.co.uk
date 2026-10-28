import type { Metadata } from 'next'
import { brand } from '@/lib/brand'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { CartProvider } from '@/context/cart-context'
import CartDrawerShell from '@/components/cart-drawer-shell'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: `${brand.name} is a UK-based supplement brand delivering lab-tested, transparently dosed performance nutrition. Shop protein, creatine, vitamins, pre-workout, and recovery products with free UK delivery over £40.`,
  metadataBase: new URL(brand.url),
  openGraph: {
    type: 'website',
    locale: brand.locale,
    siteName: brand.name,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen flex-col bg-paper text-ink selection:bg-accent selection:text-ink">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawerShell />
        </CartProvider>
      </body>
    </html>
  )
}
