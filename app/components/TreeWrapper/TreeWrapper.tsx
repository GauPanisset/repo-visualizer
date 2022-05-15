import React from 'react'

import { height, width } from '~/config'

interface TreeWrapperProps {
  children: React.ReactElement
}

/**
 * Wrap the Tree.
 */
const TreeWrapper = ({ children }: TreeWrapperProps) => {
  return (
    <svg
      width={width}
      height={height}
      style={{
        background: 'white',
        fontFamily: 'sans-serif',
        overflow: 'visible',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {children}
    </svg>
  )
}

export default TreeWrapper
