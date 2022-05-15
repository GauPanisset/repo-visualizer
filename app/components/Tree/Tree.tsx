import ColorLegend from '~/components/ColorLegend'
import NodeLabel from '~/components/NodeLabel'
import TreeNode from '~/components/TreeNode'
import { maxDepth } from '~/config'
import type { TreeNodeType } from '~/types'
import { isLeaf } from '~/utils/tree'

interface TreeProps {
  nodes: TreeNodeType[]
}

/**
 * Render the nodes and the labels of the Tree.
 */
const Tree = ({ nodes }: TreeProps) => {
  return (
    <>
      {nodes
        .map((node) => {
          const { data, depth } = node
          if (depth <= 0) return null
          if (depth > maxDepth) return null
          if (!data.path) return null
          return <TreeNode key={data.path} node={node} />
        })
        .filter(Boolean)}
      {nodes
        .map((node) => {
          const { data, depth, r, x, y } = node
          if (depth <= 0) return null
          if (depth >= maxDepth) return null
          if (isLeaf(node)) return null
          if (!isLeaf(node) && depth === maxDepth) return null
          if (data.name.length > r * 0.5) return null

          return (
            <NodeLabel
              key={data.path}
              depth={depth}
              r={r}
              text={data.name}
              x={x}
              y={y}
            />
          )
        })
        .filter(Boolean)}
      <ColorLegend nodes={nodes} />
    </>
  )
}

export default Tree
