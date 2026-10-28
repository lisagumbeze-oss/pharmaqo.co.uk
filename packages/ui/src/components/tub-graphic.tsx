import React from 'react'
import { cn } from '../utils'

export interface TubGraphicProps extends React.SVGProps<SVGSVGElement> {
  /** Hex or CSS color of the tub body */
  tubColor?: string
  /** Height or scale of the graphic */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Optional custom class */
  className?: string
  /** Whether to show the accent stripe */
  showAccentStripe?: boolean
  accentColor?: string
}

const sizeMap = {
  sm: 'h-12 w-auto',
  md: 'h-24 w-auto',
  lg: 'h-40 w-auto',
  xl: 'h-64 w-auto',
}

export function TubGraphic({
  tubColor = '#2B3440',
  size = 'md',
  className,
  showAccentStripe = true,
  accentColor = '#19C3A6',
  ...props
}: TubGraphicProps) {
  return (
    <svg
      viewBox="0 0 120 150"
      className={cn('drop-shadow-sm transition-transform duration-200', sizeMap[size], className)}
      aria-hidden="true"
      {...props}
    >
      {/* Tub body */}
      <rect x="14" y="22" width="92" height="112" rx="12" fill={tubColor} />
      {/* Black lid with subtle highlight */}
      <rect x="10" y="8" width="100" height="22" rx="7" fill="#0E1116" stroke="#E3E1DA" strokeWidth="0.5" />
      {/* Label white field */}
      <rect x="14" y="60" width="92" height="46" fill="#F6F5F1" />
      {/* Label text placeholders / branding bars */}
      <rect x="24" y="72" width="40" height="6" rx="3" fill="#0E1116" />
      <rect x="24" y="84" width="60" height="4" rx="2" fill="#5B6470" />
      {/* Label accent bar */}
      {showAccentStripe && (
        <rect x="14" y="106" width="92" height="6" fill={accentColor} />
      )}
    </svg>
  )
}
