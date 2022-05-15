import CircleText from '~/components/CircleText'
import { truncateString } from '~/utils/truncateString'

interface NodeLabelProps {
  depth: number
  r: number
  text: string
  x: number
  y: number
}

/**
 * Render the label of a Tree node.
 * It is a CircleText with a white background.
 */
const NodeLabel = ({ depth, r, text, x, y }: NodeLabelProps) => {
  const truncatedText = truncateString(
    text,
    r < 30 ? Math.floor(r / 2.7) + 3 : 100
  )
  const offsetR = r + 12 - depth * 4
  const fontSize = 16 - depth

  return (
    <g
      style={{ pointerEvents: 'none', transition: 'all 0.5s ease-out' }}
      transform={`translate(${x}, ${y})`}
    >
      <CircleText
        style={{ fontSize, transition: 'all 0.5s ease-out' }}
        r={Math.max(20, offsetR - 3)}
        fill="#374151"
        stroke="white"
        strokeWidth="6"
        rotate={depth * 1 - 0}
        text={truncatedText}
      />
      <CircleText
        style={{ fontSize, transition: 'all 0.5s ease-out' }}
        fill="#374151"
        rotate={depth * 1 - 0}
        r={Math.max(20, offsetR - 3)}
        text={truncatedText}
      />
    </g>
  )
}

export default NodeLabel
