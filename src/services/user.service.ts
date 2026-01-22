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
      username,
      avatar_url,
      birth_date,
      sex,
      city,
      created_at,
      description,
      searchFor,
      minAge,
      maxAge,
      searchCity,
      height,
      body,
      relationship
    `,
    )
    .eq('username', username)
    .single()

  if (error) throw error
  return data
}
