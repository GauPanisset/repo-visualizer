import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'

import Tree from '~/components/Tree'
import TreeWrapper from '~/components/TreeWrapper'
import type { ExtendedFileNode } from '~/interfaces'
import { packTree } from '~/utils/tree'
import { getTree } from '~/utils/tree.server'

type LoaderData = { tree: ExtendedFileNode }

export const loader: LoaderFunction = () => {
  const tree = getTree()
  const data: LoaderData = { tree }

  return json(data)
}

const Home = () => {
  const { tree } = useLoaderData<LoaderData>()

  const packedTree = React.useMemo(() => {
    return packTree(tree)
  }, [tree])

  return (
    <TreeWrapper>
      <Tree nodes={packedTree} />
    </TreeWrapper>
  )
}

export default Home
