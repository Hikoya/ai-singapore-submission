/**
 * Check whether the string is valid.
 *
 * The conditions of whether the string is valid is:
 * 1. Must not be null
 * 2. Must not be undefined
 * 3. Must not be empty string eg. ''
 *
 * @param data String
 * @return boolean on whether valid string
 */
export const checkerString = (data: string): boolean => {
  if (data !== null && data !== undefined) {
    const res = data.trim()

    return res !== ''
  }

  return false
}
