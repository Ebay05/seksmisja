import { supabase } from '@/lib/supabaseClient'

export async function getPublicUser(username: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, birth_date, sex, city, created_at')
    .eq('username', username)
    .single()

  if (error) throw error
  return data
}

export async function getFullUser(username: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select(
      `
      id,
      email,
      username,
      created_at,
      sex,
      height,
      avatar_url,
      role,
      city,
      birth_date,
      search_min_age,
      search_max_age,
      height,
      body_type,
      orientation,
      relationship,
      description,
      search_sex,
      preferred_cities,
      languages,
      status,
      search,
      search_relation,
      body_features,
      sexual_preferences,
      life_style
    `,
    )
    .eq('username', username)
    .single()

  if (error) throw error
  return data
}
