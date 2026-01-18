import { supabase } from '@/lib/supabaseClient'

export async function getPublicUser(username: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, bio, created_at')
    .eq('username', username)
    .single()

  if (error) throw error
  return data
}
