import type { HierarchyCircularNode } from 'd3-hierarchy'

import type { ExtendedFileNode } from '~/interfaces'

export type TreeNodeType = HierarchyCircularNode<ExtendedFileNode>

export type ExtendedTreeNodeType = TreeNodeType & {
  originalX: number
  originalY: number
}
