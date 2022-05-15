import { forceCollide, forceSimulation, forceX, forceY } from 'd3-force'
import { hierarchy, pack } from 'd3-hierarchy'
import { scaleSqrt } from 'd3-scale'

import { height, maxDepth, width } from '~/config'
import type { ExtendedFileNode, FileNode } from '~/interfaces'
import type { TreeNodeType, ExtendedTreeNodeType } from '~/types'
import { keepBetween } from '~/utils/keepBetween'
import { keepCircleInsideCircle } from '~/utils/keepCircleInsideCircle'

const repositionChildren = (
  node: ExtendedTreeNodeType,
  xDiff: number,
  yDiff: number
) => {
  const newNode = { ...node }
  newNode.x += xDiff
  newNode.y += yDiff
  if (newNode.children) {
    newNode.children = newNode.children.map((child) =>
      repositionChildren(child, xDiff, yDiff)
    )
  }
  return newNode
}

export const isLeaf = (tree: { children?: any[] }): boolean =>
  !tree?.children?.length

export const isRoot = (tree: FileNode): boolean => !tree.path

export const isVirtual = (tree: FileNode): boolean => !!tree.name

export const packTree = (tree: ExtendedFileNode) => {
  const hierarchicalTree = hierarchy(tree)
    .sum((node) => node.size)
    .sort((nodeA, nodeB) => (nodeB.data.name > nodeA.data.name ? 1 : -1))

  const packedTree = pack<ExtendedFileNode>()
    .size([width, height])
    .padding((node) => {
      if (node.depth <= 0) return 0
      /**
       * The node has children which are leaves.
       */
      if (node.children?.some(isLeaf)) return 5
      return 13
    })(hierarchicalTree)

  packedTree.children = reflowSiblings({}, maxDepth, packedTree.children)

  const treeDescendants = packedTree.descendants()

  return treeDescendants
}

export const reflowSiblings = (
  cachedPositions: Record<string, [number, number]> = {},
  maxDepth: number,
  nodes?: TreeNodeType[],
  parentRadius?: number,
  parentPosition?: [number, number]
) => {
  if (!nodes) return

  const extendedNodes: ExtendedTreeNodeType[] = nodes.map((node) => {
    return {
      ...node,
      x: cachedPositions[node.data.path]?.[0] || node.x,
      y: cachedPositions[node.data.path]?.[1] || node.y,
      originalX: node.x,
      originalY: node.y,
    }
  })

  const paddingScale = scaleSqrt()
    .domain([maxDepth, 1])
    .range([3, 8])
    .clamp(true)

  const simulation = forceSimulation(extendedNodes)
    .force(
      'centerX',
      forceX(width / 2).strength(extendedNodes[0].depth <= 2 ? 0.01 : 0)
    )
    .force(
      'centerY',
      forceY(height / 2).strength(extendedNodes[0].depth <= 2 ? 0.01 : 0)
    )
    .force(
      'centerX2',
      forceX(parentPosition?.[0]).strength(parentPosition ? 0.3 : 0)
    )
    .force(
      'centerY2',
      forceY(parentPosition?.[1]).strength(parentPosition ? 0.8 : 0)
    )
    .force(
      'x',
      forceX<ExtendedTreeNodeType>(
        (node) => cachedPositions[node.data.path]?.[0] || width / 2
      ).strength((node) =>
        cachedPositions[node.data.path]?.[1] ? 0.5 : (width / height) * 0.3
      )
    )
    .force(
      'y',
      forceY<ExtendedTreeNodeType>(
        (node) => cachedPositions[node.data.path]?.[1] || height / 2
      ).strength((node) =>
        cachedPositions[node.data.path]?.[0] ? 0.5 : (height / width) * 0.3
      )
    )
    .force(
      'collide',
      forceCollide<ExtendedTreeNodeType>((node) =>
        node.children ? node.r + paddingScale(node.depth) : node.r + 1.6
      )
        .iterations(8)
        .strength(1)
    )
    .stop()

  for (let i = 0; i < 280; i++) {
    simulation.tick()
    extendedNodes.forEach((node) => {
      node.x = keepBetween(node.r, node.x, width - node.r)
      node.y = keepBetween(node.r, node.y, height - node.r)

      if (parentPosition && parentRadius) {
        const containedPosition = keepCircleInsideCircle(
          parentRadius,
          parentPosition,
          node.r,
          [node.x, node.y],
          !isLeaf(node)
        )
        node.x = containedPosition[0]
        node.y = containedPosition[1]
      }
    })
  }

  for (const node of extendedNodes) {
    const nodeCachedPosition = cachedPositions[node.data.path] || [
      node.x,
      node.y,
    ]
    const nodePositionDiffFromCached = [
      node.x - nodeCachedPosition[0],
      node.y - nodeCachedPosition[1],
    ]

    if (node.children) {
      const repositionedCachedPositions = { ...cachedPositions }
      const nodeReflowDiff = [node.x - node.originalX, node.y - node.originalY]

      node.children = node.children.map((child) =>
        repositionChildren(child, nodeReflowDiff[0], nodeReflowDiff[1])
      )

      if (node.children.length > 4) {
        if (node.depth > maxDepth) return

        node.children.forEach((child) => {
          const childCachedPosition =
            repositionedCachedPositions[child.data.path]
          if (childCachedPosition) {
            repositionedCachedPositions[child.data.path] = [
              childCachedPosition[0] + nodePositionDiffFromCached[0],
              childCachedPosition[1] + nodePositionDiffFromCached[1],
            ]
          } else {
            repositionedCachedPositions[child.data.path] = [child.x, child.y]
          }
        })
        node.children = reflowSiblings(
          repositionedCachedPositions,
          maxDepth,
          node.children,
          node.r,
          [node.x, node.y]
        )
      }
    }
  }
  return extendedNodes
}
