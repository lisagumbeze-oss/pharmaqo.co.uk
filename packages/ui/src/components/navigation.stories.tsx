import type { Meta, StoryObj } from '@storybook/react'
import {
  Toast,
  Breadcrumbs,
  Pagination,
  ReviewStars,
  CookieBanner,
  AgeConfirmDialog,
} from './navigation'
import React, { useState } from 'react'
import { Button } from './index'

const meta: Meta = {
  title: 'Components/NavigationAndRegulatory',
  tags: ['autodocs'],
}

export default meta

export const BreadcrumbTrail: StoryObj = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/' },
        { label: 'Creatine', href: '/category/creatine' },
        { label: 'Creatine Monohydrate' },
      ]}
    />
  ),
}

export const PaginationControls: StoryObj = {
  render: () => {
    const [page, setPage] = useState(1)
    return <Pagination currentPage={page} totalPages={8} onPageChange={setPage} />
  },
}

export const ReviewRatingStars: StoryObj = {
  render: () => (
    <div className="space-y-3">
      <ReviewStars rating={5.0} count={142} />
      <ReviewStars rating={4.5} count={48} />
      <ReviewStars rating={3.8} count={12} />
    </div>
  ),
}

export const ToastAlerts: StoryObj = {
  render: () => (
    <div className="w-96 space-y-3">
      <Toast variant="success" message="Added to basket: Whey Protein Isolate (Vanilla · 1kg)" />
      <Toast variant="info" message="Free delivery threshold reached!" />
      <Toast variant="warning" message="Only 3 tubs remaining in stock" />
      <Toast variant="error" message="Please select a flavour before adding to basket" />
    </div>
  ),
}

export const UKCookieBanner: StoryObj = {
  render: () => (
    <div className="w-[600px]">
      <CookieBanner onAccept={() => {}} onReject={() => {}} />
    </div>
  ),
}

export const AgeConfirmationGate: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Simulate Stimulant Product Click</Button>
        <AgeConfirmDialog
          isOpen={open}
          productName="High-Stim Pre-Workout"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </div>
    )
  },
}
