import { ref, computed } from 'vue'
import type { FullUser } from '@/types/FullUser'
import { getFullUser } from '@/services/user.service'

export function useFullUser() {
  const user = ref<FullUser | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function load(username: string) {
    loading.value = true
    error.value = null

    try {
      const data = await getFullUser(username)
      user.value = data
    } catch (err) {
      error.value = 'Nie udało się pobrać pełnego profilu.'
      user.value = null
    }

    loading.value = false
  }

  /* -----------------------------------------------------
     AGE CALCULATION
  ----------------------------------------------------- */
  const age = computed(() => {
    const date = user.value?.birth_date
    if (!date) return null

    const birth = new Date(date)
    if (isNaN(birth.getTime())) return null // zabezpieczenie

    const today = new Date()
    let years = today.getFullYear() - birth.getFullYear()

    const beforeBirthday =
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())

    if (beforeBirthday) years--

    return years
  })

  return { user, loading, error, load, age }
}
