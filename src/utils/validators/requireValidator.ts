export function validateRequire(value: string | number): {
  isValid: boolean
  message?: string
} {
  // Check if value provided
  const isValid = !value

  // Return result with or without error message
  return isValid ? { isValid } : { isValid, message: '本欄不可空白' }
}
