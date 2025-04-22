import axios from 'axios'
import { useFlashMessageStore } from '@/stores/flashMessageStore'
import { getErrorCodes } from '@/utils/errorCodes'

// Define a type for the API response
interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use environment variable for the base URL
  timeout: 10000, // Request timeout in milliseconds
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const flashMessageStore = useFlashMessageStore()

    if (error.response) {
      const { status, data } = error.response

      // 1. Handle non-field-specific validation errors
      if (data?.error?.code) {
        // Display the generic message (e.g., "Email already exists")
        flashMessageStore.setFlashMessage(getErrorCodes(data?.error?.code), 'error')
      }
      // 2. Handle authentication errors
      else if (status === 401 || status === 403) {
        flashMessageStore.setFlashMessage('您沒有權限執行此操作，請重新登入。', 'error')
      }

      // 3. Handle not found errors
      else if (status === 404) {
        flashMessageStore.setFlashMessage('指定的資訊不存在', 'error')
      }

      // 4. Handle generic server errors
      else if (status >= 500) {
        flashMessageStore.setFlashMessage('伺服器發生錯誤，請稍後再試。', 'error')
      }
    }
    // 5. Handle network issues
    else if (error.request) {
      flashMessageStore.setFlashMessage('無法連線到伺服器，請檢查您的網絡連線。', 'error')
    }
    // 6. Handle unexpected errors
    else {
      flashMessageStore.setFlashMessage('發生未知錯誤，請稍後再試。', 'error')
    }
    return Promise.reject(error)
  },
)

// GET method
const get = async <T>(url: string, config?: Record<string, unknown>): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.get<ApiResponse<T>>(url, config)
    return response.data
  } catch (error) {
    throw error
  }
}

// POST method
const post = async <T>(
  url: string,
  data: unknown,
  config?: Record<string, unknown>,
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config)
    console.log('response: ' + response)
    return response.data
  } catch (error) {
    throw error
  }
}

// Export methods for use in Vue components
export default {
  get,
  post,
}
