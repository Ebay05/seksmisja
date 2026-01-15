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
  // Load current session
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

  // Login
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

  // Register
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

  // Logout
  const logout = async () => {
    authError.value = null

    const { error } = await supabase.auth.signOut()

    if (error) {
      authError.value = { message: error.message }
      return
    }

    session.value = null
  }

  // Init
  onBeforeMount(async () => {
    await loadSession()

    // Listen for auth changes
    authListener = supabase.auth.onAuthStateChange(async () => {
      await loadSession()
    }).data
  })

  // Cleanup
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
