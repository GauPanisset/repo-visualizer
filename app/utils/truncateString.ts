export const truncateString = (
  string: string = '',
  length: number = 20
): string => {
  return string.length > length + 3
    ? string.substring(0, length) + '...'
    : string
}
