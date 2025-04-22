export const errorCodes: Record<string, string> = {
  ValidationError: '驗證錯誤',
  AuthenticationError: '身份驗證失敗',
}

export const getErrorCodes = (code: string): string => {
  return errorCodes[code] || '發生錯誤'
}
