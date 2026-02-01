import { ref } from 'vue'
import { usePublicUser } from '@/composables/usePublicUser'
import { supabase } from '@/lib/supabase'

export interface FriendProfile {
  id: string
  username: string
  avatar_url: string | null
  sex: string | null
  role: string | null
}

export function useFriends() {
  const friends = ref<FriendProfile[]>([])
  const loadingFriends = ref(false)
  const errorFriends = ref<string | null>(null)

  const { user } = usePublicUser()

  async function loadFriends() {
    if (!user.value?.id) return

    loadingFriends.value = true
    errorFriends.value = null

    const { data, error } = await supabase
      .from('friends')
      .select(`
        friend_id,
        profiles:friend_id (
          id,
          username,
          avatar_url,
          sex,
          role
        )
      `)
      .eq('user_id', user.value.id)
      .eq('status', 'accepted')

    if (error) {
      errorFriends.value = 'Nie udało się pobrać znajomych.'
      friends.value = []
    } else {
      friends.value = (data?.flatMap(f => f.profiles) || []) as FriendProfile[]
    }

    loadingFriends.value = false
  }

  return {
    friends,
    loadingFriends,
    errorFriends,
    loadFriends,
  }
}
