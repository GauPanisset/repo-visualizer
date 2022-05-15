import React from 'react'

interface CircleTextProps {
  r: number
  rotate?: number
  text: string
  fill?: string
  stroke?: string
  strokeWidth?: string
  style?: any
}

/**
 * Render a svg circular text.
 */
const CircleText = ({
  r = 10,
  rotate = 0,
  text = '',
  ...props
}: CircleTextProps) => {
  const id = 'CircleText--' + React.useId()

  return (
    <>
      <path
        fill="none"
        d={[
          ['M', 0, r].join(' '),
          ['A', r, r, 0, 0, 1, 0, -r].join(' '),
          ['A', r, r, 0, 0, 1, 0, r].join(' '),
        ].join(' ')}
        id={id}
        transform={`rotate(${rotate})`}
        style={{ pointerEvents: 'none' }}
      />
      <text textAnchor="middle" {...props}>
        <textPath href={`#${id}`} startOffset="50%">
          {text}
        </textPath>
      </text>
    </>
  )
}

export default CircleText
