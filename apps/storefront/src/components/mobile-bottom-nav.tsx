'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/cart-context'

function isShopActive(pathname: string) {
  return (
    pathname === '/shop' || pathname.startsWith('/category/') || pathname.startsWith('/product/')
  )
}

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { openCart, itemCount } = useCart()

  const homeActive = pathname === '/'
  const shopActive = isShopActive(pathname)
  const accountActive = pathname.startsWith('/account')

  return (
    <nav
      aria-label="Mobile"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-[#E3E1DA] bg-white pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid h-16 grid-cols-4">
        <Link
          href="/"
          aria-current={homeActive ? 'page' : undefined}
          className={`flex min-h-[44px] flex-col items-center justify-center gap-0.5 transition-colors ${
            homeActive ? 'text-accent' : 'text-muted'
          }`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
          </svg>
          <span className="font-display text-[10px] font-semibold uppercase tracking-wider">
            Home
          </span>
        </Link>

        <Link
          href="/shop"
          aria-current={shopActive ? 'page' : undefined}
          className={`flex min-h-[44px] flex-col items-center justify-center gap-0.5 transition-colors ${
            shopActive ? 'text-accent' : 'text-muted'
          }`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 7h16l-1.5 13H5.5L4 7z" />
            <path d="M9 7V5a3 3 0 016 0v2" />
          </svg>
          <span className="font-display text-[10px] font-semibold uppercase tracking-wider">
            Shop
          </span>
        </Link>

        <button
          type="button"
          onClick={openCart}
          aria-label={`Basket, ${itemCount} items`}
          className="relative flex min-h-[44px] flex-col items-center justify-center gap-0.5 text-muted transition-colors"
        >
          <span className="relative">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 8h14l-1 12H6L5 8z" />
              <path d="M9 8a3 3 0 016 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-ink">
                {itemCount}
              </span>
            )}
          </span>
          <span className="font-display text-[10px] font-semibold uppercase tracking-wider">
            Basket
          </span>
        </button>

        <Link
          href="/account"
          aria-current={accountActive ? 'page' : undefined}
          className={`flex min-h-[44px] flex-col items-center justify-center gap-0.5 transition-colors ${
            accountActive ? 'text-accent' : 'text-muted'
          }`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
          </svg>
          <span className="font-display text-[10px] font-semibold uppercase tracking-wider">
            Account
          </span>
        </Link>
      </div>
    </nav>
  )
}
