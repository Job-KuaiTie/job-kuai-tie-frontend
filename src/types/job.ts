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
  applied_at: string | null
  created_at: string
  updated_at: string
}

export interface JobPayload {
  name: string
  description?: string | null
  url?: string | null
  tier: number
  min_yearly_salary?: number | null
  max_yearly_salary?: number | null
  company_id?: string | null
  applied_at?: Date | null
}
