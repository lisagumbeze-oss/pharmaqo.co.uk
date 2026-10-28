import type { Meta, StoryObj } from '@storybook/react'
import { Modal, CartDrawer } from './modal-drawer'
import { Button } from './index'
import React, { useState } from 'react'

const meta: Meta = {
  title: 'Components/ModalAndDrawer',
  tags: ['autodocs'],
}

export default meta

export const InteractiveModal: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Lab Certificate Modal</Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Certificate of Analysis — Batch PQ-2401"
        >
          <div className="space-y-4 text-sm text-ink-muted">
            <p>
              Product: <strong className="text-ink">Whey Protein Isolate (Vanilla)</strong>
            </p>
            <p>
              Testing laboratory: <strong className="text-ink">ALS Life Sciences UK</strong> (ISO 17025 accredited)
            </p>
            <p>Status: <span className="font-semibold text-success">PASSED</span> (Purity: 91.4% dry basis, Heavy metals: &lt;0.05 mg/kg)</p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
              <Button onClick={() => setOpen(false)}>Download PDF</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  },
}

export const SlideOutCartDrawer: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([
      {
        id: '1',
        title: 'Whey Protein Isolate',
        variant: 'Vanilla · 1 kg',
        price: 3499,
        quantity: 1,
      },
      {
        id: '2',
        title: 'Creatine Monohydrate',
        variant: '500 g · Subscribe and save',
        price: 2499,
        quantity: 1,
      },
    ])

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Basket Drawer ({items.length})</Button>
        <CartDrawer
          isOpen={open}
          onClose={() => setOpen(false)}
          items={items}
          freeDeliveryThresholdPence={4000}
          onUpdateQuantity={(id, qty) => {
            setItems(items.map((it) => (it.id === id ? { ...it, quantity: qty } : it)))
          }}
          onRemoveItem={(id) => {
            setItems(items.filter((it) => it.id !== id))
          }}
          onCheckout={() => alert('Proceeding to checkout shell')}
        />
      </div>
    )
  },
}
