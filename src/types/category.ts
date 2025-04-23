export interface Category {
  id: string
  name: string
  color: string
  description: string | null
  owner_id: string
  created_at: Date
  updated_at: Date
}

export interface CategoryPayload {
  id?: string | null
  name: string
  color: string
  description?: string | null
  owner_id?: string | null
  created_at?: Date | null
  updated_at?: Date | null
}
