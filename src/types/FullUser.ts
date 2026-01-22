export interface FullUser {
  id: string
  username: string
  avatar_url: string | null
  birth_date: string | null
  sex: string | null
  city: string | null
  created_at: string

  description: string | null
  searchFor: string | null
  minAge: number | null
  maxAge: number | null
  searchCity: string | null
  height: number | null
  body: string | null
  relationship: string | null
}
