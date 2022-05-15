export interface FileNode {
  children?: FileNode[]
  name: string
  path: string
  size: number
}

export interface ExtendedFileNode extends FileNode {
  color: string
  extension: string
}
