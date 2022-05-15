import { defaultColor, extensionColors } from '~/config'
import type { ExtendedFileNode, FileNode } from '~/interfaces'
import { isLeaf, isRoot } from '~/utils/tree'

import mockTree from '../../mocks/tree.json'

/**
 * Pre-process the Tree by adding some properties to each nodes.
 * @param tree A basic representation of the Tree.
 */
const extendTree = (tree: FileNode): ExtendedFileNode => {
  let { children, name, path, size } = tree

  if (children) {
    children = children.map((child) => extendTree(child))

    /**
     * Merge folder and unique content in it.
     */
    if (children.length === 1) {
      name = `${name}/${children[0].name}`
      path = children[0].path
      children = children[0].children
    }
  }

  const extension = name?.split('.').slice(-1)[0]

  /**
   * Group all loose files in a virtual folder.
   */
  if (isRoot(tree) && children) {
    children = [
      ...children.filter((child) => !isLeaf(child)),
      {
        name: '',
        path: '',
        size: 0,
        children: children.filter(isLeaf),
      },
    ]
  }

  const extendedTree = {
    ...tree,
    children,
    color: defaultColor,
    extension,
    name,
    path,
    size,
  }

  extendedTree.color = getColor(extendedTree)

  return extendedTree
}

/**
 * Get the color of node given its properties.
 * @param tree node to get the color
 */
const getColor = (tree: ExtendedFileNode): string => {
  const { extension } = tree
  if (isLeaf(tree))
    return extension && Object.keys(extensionColors).includes(extension)
      ? extensionColors[extension]
      : defaultColor
  return defaultColor
}

/**
 * Retrieve the Tree, ready to be displayed.
 */
export const getTree = (): ExtendedFileNode => extendTree(mockTree)
