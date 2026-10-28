'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: string
  name: string
  variant?: string
  price: number // pence
  quantity: number
  tubColor?: string
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  itemCount: number
  subtotal: number // pence
  freeDeliveryThreshold: number // pence (£40 = 4000)
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 'prod_protein_01',
      name: 'Whey Isolate 90',
      variant: 'Vanilla · 1 kg',
      price: 3499,
      quantity: 1,
      tubColor: '#2B3440',
    },
    {
      id: 'prod_creatine_01',
      name: 'Creatine Monohydrate Pure',
      variant: '500 g · Unflavoured',
      price: 1499,
      quantity: 1,
      tubColor: '#19C3A6',
    },
  ])

  // Free delivery over £40
  const freeDeliveryThreshold = 4000

  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0)
  const itemCount = items.reduce((acc, it) => acc + it.quantity, 0)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.variant === item.variant)
      const qty = item.quantity || 1
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.variant === item.variant
            ? { ...i, quantity: i.quantity + qty }
            : i
        )
      }
      return [...prev, { ...item, quantity: qty }]
    })
    setIsOpen(true)
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id)
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)))
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        itemCount,
        subtotal,
        freeDeliveryThreshold,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
