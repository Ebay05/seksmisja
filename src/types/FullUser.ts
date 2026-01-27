export interface FullUser {
  id: string
  email: string
  username: string
  avatar_url: string | null
  birth_date: string | null
  sex: string | null
  city: string | null
  created_at: string
  role: string | null

  description: string | null
  height: number | null
  search_min_age: number | null
  body_type: string | null
  orientation: string | null
  relationship: string | null
  search_sex: string | null
  preferred_cities: string | null
  languages: string | null
  status: string | null
  search: string | null
  search_relation: string | null
  body_features: string | null
  sexual_preferences: string | null
  life_style: string | null
}
