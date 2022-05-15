import uniq from 'lodash/uniq'

import { extensionColors, height, width } from '~/config'
import type { TreeNodeType } from '~/types'

interface ColorLegendProps {
  nodes: TreeNodeType[]
}

/**
 * Render the color legend of the Tree.
 * It lists the displayed file extensions with their color.
 */
const ColorLegend = ({ nodes = [] }: ColorLegendProps) => {
  const extensions = uniq(
    nodes.map(
      (node) => extensionColors[node.data.extension] && node.data.extension
    )
  )
    .filter(Boolean)
    .sort()

  return (
    <g
      transform={`translate(${width - 60}, ${
        height - extensions.length * 15 - 20
      })`}
    >
      {extensions.map((extension: string, i: number) => (
        <g key={extension} transform={`translate(0, ${i * 15})`}>
          <circle r="5" fill={extensionColors[extension]} />
          <text
            x="10"
            style={{ fontSize: '14px', fontWeight: 300 }}
            dominantBaseline="middle"
          >
            .{extension}
          </text>
        </g>
      ))}
    </g>
  )
}

export default ColorLegend
