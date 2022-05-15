/**
 * Return the `min` if the `value` is below the `min`, the `max` if the `value` is above the `max`
 * and the `value` otherwise.
 * @param min minimal value
 * @param max maximal value
 * @param value value to test
 */
export const keepBetween = (min: number, max: number, value: number) => {
  return Math.max(min, Math.min(max, value))
}
