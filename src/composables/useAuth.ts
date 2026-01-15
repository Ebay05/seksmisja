import { ref, onBeforeMount, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

interface AuthError {
  message: string
}

const session = ref<any | null>(null)
const loading = ref<boolean>(true)
const authError = ref<AuthError | null>(null)

let authListener: { unsubscribe: () => void } | null = null

export function useAuth() {
  /* -----------------------------------------------------
     LOAD CURRENT SESSION
  ----------------------------------------------------- */
  const loadSession = async () => {
    loading.value = true
    authError.value = null

    const {
      data: { session: currentSession },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      authError.value = { message: error.message }
      loading.value = false
      return
    }

    session.value = currentSession
    loading.value = false
  }

  /* -----------------------------------------------------
     LOGIN
  ----------------------------------------------------- */
  const login = async (email: string, password: string) => {
    authError.value = null

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      authError.value = { message: error.message }
      return null
    }

    session.value = data.session
    return data.session
  }

  /* -----------------------------------------------------
     REGISTER
  ----------------------------------------------------- */
  const register = async (email: string, password: string) => {
    authError.value = null

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      authError.value = { message: error.message }
      return null
    }

    return data.user
  }

  /* -----------------------------------------------------
     LOGOUT
  ----------------------------------------------------- */
  const logout = async () => {
    authError.value = null

    const { error } = await supabase.auth.signOut()

    if (error) {
      authError.value = { message: error.message }
      return
    }

    session.value = null
  }

  /* -----------------------------------------------------
     INIT — LISTEN FOR AUTH CHANGES
  ----------------------------------------------------- */
  onBeforeMount(async () => {
    await loadSession()

    const { data } = supabase.auth.onAuthStateChange(async () => {
      await loadSession()
    })

    // Supabase v2 returns: { subscription }
    authListener = {
      unsubscribe: () => data.subscription.unsubscribe(),
    }
  })

  /* -----------------------------------------------------
     CLEANUP
  ----------------------------------------------------- */
  onUnmounted(() => {
    if (authListener) {
      authListener.unsubscribe()
      authListener = null
    }
  })

  return {
    session,
    loading,
    authError,
    login,
    register,
    logout,
    reloadSession: loadSession,
  }
}
