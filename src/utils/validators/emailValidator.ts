export function validateEmailFormat(
  email: string,
  isRequired: boolean = true,
): { isValid: boolean; message?: string } {
  if (!email) {
    return isRequired ? { isValid: false, message: '本欄不可空白' } : { isValid: true }
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Check validity
    const isValid = emailRegex.test(email)

    // Return result with or without error message
    return isValid ? { isValid } : { isValid, message: '請輸入電子信箱。' }
  }
}
