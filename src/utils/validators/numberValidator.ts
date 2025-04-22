export function validateInteger(
  value: string | number,
  isRequired: boolean = true,
): { isValid: boolean; message?: string } {
  if (!value) {
    return isRequired ? { isValid: false, message: '本欄不可空白' } : { isValid: true }
  } else {
    const isValid = /^[+-]?\d+$/.test(String(value))
    return isValid ? { isValid } : { isValid, message: '請輸入整數。' }
  }
}

export function validateFloat(
  value: string | number,
  isRequired: boolean = true,
): { isValid: boolean; message?: string } {
  if (!value) {
    return isRequired ? { isValid: false, message: '本欄不可空白' } : { isValid: true }
  } else {
    const isValid = /^[+-]?\d+(\.\d+)?$/.test(String(value))
    return isValid ? { isValid } : { isValid, message: '請輸入數字。' }
  }
}
