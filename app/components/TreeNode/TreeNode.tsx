import type { TreeNodeType } from '~/types'
import { isLeaf } from '~/utils/tree'

interface TreeNodeProps {
  node: TreeNodeType
}

/**
 * Render a node of the Tree.
 */
const TreeNode = ({ node }: TreeNodeProps) => {
  const {
    r,
    x,
    y,
    data: { color },
  } = node

  return (
    <g
      style={{
        fill: color,
        transition: `transform ease-out, fill 0.1s ease-out`,
      }}
      transform={`translate(${x}, ${y})`}
    >
      {isLeaf(node) ? (
        <circle
          r={r}
          style={{
            transition: 'all 0.5s ease-out',
          }}
          stroke="#374151"
        />
      ) : (
        <>
          <circle
            r={r}
            style={{ transition: 'all 0.5s ease-out' }}
            stroke="#290819"
            strokeOpacity="0.2"
            strokeWidth="1"
            fill="white"
          />
        </>
      )}
    </g>
  )
}

export default TreeNode
