import axios from 'axios'
import { useFlashMessageStore } from '@/stores/flashMessageStore'
import { getErrorCodes } from '@/utils/errorCodes'
import { useAuthStore } from '@/stores/authStore'
// Use environment variable for the base URL, empty string if not provided
const base = import.meta.env.VITE_API_BASE_URL || '/api'

// Define a type for the API response
// interface ApiResponse<T> {
//   data: T
//   status: number
//   message?: string
// }

const apiClient = axios.create({
  baseURL: base,
  timeout: 10000, // Request timeout in milliseconds
})

apiClient.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.token // Get the token from the store or storage

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
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
      else if (status === 401) {
        flashMessageStore.setFlashMessage('操作錯誤，請再試一次。', 'error')
      } else if (status === 403) {
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
const get = async <T>(url: string, config?: Record<string, unknown>): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url, config)
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
): Promise<T> => {
  try {
    const response = await apiClient.post<T>(url, data, config)
    return response.data
  } catch (error) {
    throw error
  }
}

// PATCH method
const patch = async <T>(
  url: string,
  data: unknown,
  config?: Record<string, unknown>,
): Promise<T> => {
  try {
    const response = await apiClient.patch<T>(url, data, config)
    return response.data
  } catch (error) {
    throw error
  }
}

// DELETE method
const remove = async <T>(url: string, config?: Record<string, unknown>): Promise<T> => {
  try {
    const response = await apiClient.delete<T>(url, config)
    return response.data
  } catch (error) {
    throw error
  }
}

// const setAuthToken = (token: string | null) => {
//   if (token) {
//     apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
//   } else {
//     delete apiClient.defaults.headers.common['Authorization']
//   }
// }

// Export methods for use in Vue components
export default {
  get,
  post,
  patch,
  delete: remove, // 'delete' is a reserved word, so we alias it
  // setAuthToken,
}
