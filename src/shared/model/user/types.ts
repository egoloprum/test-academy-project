export interface User {
  id: number
  email: string
  email_verified_at: Date | null
  password: string
  phone_number: string | null
  city: string | null
  last_name: string | null
  first_name: string | null
  middle_name: string | null
  birthdate: Date | null
  user_role_id: number | null
  remember_token: string | null
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
