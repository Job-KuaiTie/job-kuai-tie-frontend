export interface Company {
  id: string
  name: string
  description: string | null
  url: string | null
  size: number | null
  owner_id: string
  created_at: Date
  updated_at: Date
}

export interface CompanyPayload {
  id?: string | null
  name: string
  description?: string | null
  url?: string | null
  size: number | null
  owner_id?: string | null
  created_at?: Date | null
  updated_at?: Date | null
}
