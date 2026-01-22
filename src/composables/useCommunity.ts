import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

export function useCommunity() {
  /* -----------------------------------------------------
     STATE
  ----------------------------------------------------- */
  const newbies = ref<any[]>([])
  const loadingNewbies = ref(true)
  const loadingMore = ref(false)

  const page = ref(0)
  const pageSize = 12
  const hasMore = ref(true)

  const userProfile = ref<any>(null)
  const loadingProfile = ref(true)

  /* -----------------------------------------------------
     AGE CALCULATION (shared helper)
  ----------------------------------------------------- */
  const calculateAge = (date: string | null) => {
    if (!date) return null

    const birth = new Date(date)
    if (isNaN(birth.getTime())) return null

    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()

    const beforeBirthday =
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())

    if (beforeBirthday) age--

    return age
  }

  /* -----------------------------------------------------
     FETCH COMMUNITY USERS (INFINITE SCROLL)
  ----------------------------------------------------- */
  const fetchNewbiesPage = async () => {
    if (!hasMore.value) return

    loadingMore.value = true

    const from = page.value * pageSize
    const to = from + pageSize - 1

    const { data: auth } = await supabase.auth.getUser()
    const currentUserId = auth?.user?.id

    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar_url, birth_date, city, created_at')
      .order('created_at', { ascending: false })
      .order('id', { ascending: false }) // stabilne sortowanie
      .range(from, to)

    if (!error && data && data.length > 0) {
      // usuń zalogowanego użytkownika
      const filtered = data.filter((u) => u.id !== currentUserId)

      // połącz stare + nowe i usuń duplikaty
      const unique = new Map()
      ;[...newbies.value, ...filtered].forEach((u) => unique.set(u.id, u))

      newbies.value = Array.from(unique.values())
      page.value++
    } else {
      hasMore.value = false
    }

    loadingMore.value = false
    loadingNewbies.value = false
  }

  /* -----------------------------------------------------
     FETCH LOGGED-IN USER PROFILE
  ----------------------------------------------------- */
  const fetchProfile = async () => {
    loadingProfile.value = true

    const { data: auth } = await supabase.auth.getUser()
    const user = auth?.user
    if (!user) {
      loadingProfile.value = false
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('avatar_url, username, birth_date, city')
      .eq('id', user.id)
      .single()

    if (!error && data) {
      userProfile.value = data
    }

    loadingProfile.value = false
  }

  /* -----------------------------------------------------
     INITIAL LOAD
  ----------------------------------------------------- */
  onMounted(() => {
    fetchNewbiesPage()
  })

  return {
    newbies,
    loadingNewbies,
    loadingMore,
    hasMore,

    calculateAge,

    fetchNewbiesPage,
    fetchProfile,

    userProfile,
    loadingProfile,
  }
}
