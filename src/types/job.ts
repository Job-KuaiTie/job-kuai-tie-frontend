export interface Job {
  id: string
  name: string
  description: string | null
  url: string | null
  tier: number
  min_yearly_salary: number | null
  max_yearly_salary: number | null
  company_id: string | null
  owner_id: string
  applied_at: Date | null
  created_at: Date
  updated_at: Date
}

export interface JobPayload {
  id?: string | null
  name: string
  description?: string | null
  url?: string | null
  tier: number
  min_yearly_salary?: number | null
  max_yearly_salary?: number | null
  company_id?: string | null
  owner_id?: string | null
  applied_at?: Date | null
  created_at?: Date | null
  updated_at?: Date | null
}
