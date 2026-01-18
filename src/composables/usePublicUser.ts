import { ref } from 'vue'
import { getPublicUser } from '@/services/user.service'

export function usePublicUser() {
  interface PublicUser {
    id: string
    username: string
    avatar_url: string | null
    bio: string | null
    created_at: string
  }

  const user = ref<PublicUser | null>(null)
  const loading = ref(true)

  async function load(username: string) {
    loading.value = true
    user.value = await getPublicUser(username)
    loading.value = false
  }

  return { user, loading, load }
}
