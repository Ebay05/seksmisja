import { ref } from 'vue'
import type { PublicUser } from '@/types/PublicUser'
import { getPublicUser } from '@/services/user.service'

export function usePublicUser() {
  const user = ref<PublicUser | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function load(username: string) {
    loading.value = true
    error.value = null

    try {
      const data = await getPublicUser(username)
      user.value = data
    } catch (err) {
      error.value = 'Nie udało się pobrać publicznego profilu.'
      user.value = null
    }

    loading.value = false
  }

  return { user, loading, error, load }
}
