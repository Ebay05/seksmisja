import { ref, onBeforeMount, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabase'

export interface UserProfile {
  username: string
  email: string
  sex: string
  avatar_url: string
  role: string
}

const userProfile = ref<UserProfile | null>(null)
const loading = ref<boolean>(true)
const errorMessage = ref<string | null>(null)

let authListener: { unsubscribe: () => void } | null = null

// --- SECURITY: Validate avatar URL ---
// Accepts:
// - absolute https URLs pointing to Supabase/CDN domains
// - relative paths (e.g., 'avatars/...') served from public or storage
const isValidAvatarUrl = (url: string | null | undefined): boolean => {
  if (!url) return false

  // If looks like URL (starts with http/https)
  if (/^https?:\/\//i.test(url)) {
    try {
      const parsed = new URL(url)

      // Block javascript:, data:, file:, blob: etc.
      const forbiddenProtocols = ['javascript:', 'data:', 'file:']
      if (forbiddenProtocols.includes(parsed.protocol)) return false

      // Allow only HTTPS
      if (parsed.protocol !== 'https:') return false

      // Allow supabase / cdn hostnames (more permissive)
      const allowedHostPattern = /(supabase|supabase\.co|supabase\.in|supabase\.app|cdn)/i
      if (!allowedHostPattern.test(parsed.hostname)) return false

      return true
    } catch {
      return false
    }
  }

  // Relative paths (no protocol) are allowed (e.g., stored as 'avatars/..' or public files)
  if (/^[a-z0-9_/.~-]+$/i.test(url)) return true

  return false
}

export function useUserProfile() {
  const loadProfile = async () => {
    loading.value = true
    errorMessage.value = null

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      errorMessage.value = 'Session error'
      loading.value = false
      return
    }

    if (!session?.user) {
      userProfile.value = null
      loading.value = false
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('username, email, sex, avatar_url, role')
      .eq('id', session.user.id)
      .single()

    if (error) {
      errorMessage.value = error.message
      loading.value = false
      return
    }

    // --- SECURITY: sanitize avatar_url ---
    const safeAvatarUrl = isValidAvatarUrl(data.avatar_url) ? data.avatar_url : ''

    userProfile.value = {
      ...data,
      avatar_url: safeAvatarUrl,
    }

    loading.value = false
  }

  onBeforeMount(async () => {
    await loadProfile()

    // Supabase v2 returns: { data: { subscription } }
    const { data } = supabase.auth.onAuthStateChange(async () => {
      await loadProfile()
    })

    authListener = {
      unsubscribe: () => data.subscription.unsubscribe(),
    }
  })

  onUnmounted(() => {
    if (authListener) {
      authListener.unsubscribe()
      authListener = null
    }
  })

  return {
    userProfile,
    loading,
    errorMessage,
    reloadProfile: loadProfile,
  }
}
