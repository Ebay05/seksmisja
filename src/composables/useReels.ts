import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export function useReels() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const videoFile = ref<File | null>(null)
  const reelsTitle = ref('')
  const reelsTags = ref<string[]>([])

  // --- VALIDATION ---
  function validateVideo(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      if (!file.type.startsWith('video/')) {
        error.value = 'Możesz dodać tylko pliki video.'
        return resolve(false)
      }

      const url = URL.createObjectURL(file)
      const video = document.createElement('video')
      video.src = url

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url)
        if (video.duration > 300) {
          error.value = 'Film może mieć maksymalnie 5 minut.'
          return resolve(false)
        }
        resolve(true)
      }

      video.onerror = () => {
        URL.revokeObjectURL(url)
        error.value = 'Nie można odczytać pliku wideo.'
        resolve(false)
      }
    })
  }

  // --- UPLOAD VIDEO ---
  async function uploadVideo(): Promise<string | null> {
    if (!videoFile.value) return null

    console.log('uploadVideo started', videoFile.value?.name)
    const file = videoFile.value
    const ext = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${ext}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('reels')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      })

    if (uploadError) {
      console.error('uploadVideo error', uploadError)
      error.value = 'Błąd podczas uploadu filmu.'
      return null
    }

    const { data } = supabase.storage.from('reels').getPublicUrl(fileName)
    console.log('uploadVideo success', data.publicUrl)
    return data.publicUrl
  }

  // --- SAVE METADATA ---
  async function saveReelsToDatabase(videoUrl: string, userId: string) {
    const { error: insertError } = await supabase.from('reels').insert({
      user_id: userId,
      title: reelsTitle.value,
      tags: reelsTags.value,
      video_url: videoUrl,
    })

    if (insertError) {
      error.value = 'Błąd podczas zapisu metadanych.'
      return false
    }

    return true
  }

  // --- MAIN FUNCTION ---
  async function saveReels(userId: string) {
    error.value = null
    loading.value = true
    console.log('saveReels start', { userId, title: reelsTitle.value, tags: reelsTags.value })
    try {
      if (!videoFile.value) {
        error.value = 'Musisz dodać film.'
        loading.value = false
        return false
      }

      if (!reelsTitle.value.trim()) {
        error.value = 'Tytuł jest wymagany.'
        loading.value = false
        return false
      }

      if (reelsTags.value.length === 0) {
        error.value = 'Wybierz przynajmniej jeden tag.'
        loading.value = false
        return false
      }

      const isValid = await validateVideo(videoFile.value)
      if (!isValid) {
        loading.value = false
        return false
      }

      const videoUrl = await uploadVideo()
      if (!videoUrl) {
        loading.value = false
        return false
      }

      const saved = await saveReelsToDatabase(videoUrl, userId)
      loading.value = false

      if (!saved) {
        console.error('saveReels: saving metadata failed')
        return false
      }
      console.log('saveReels: success')
      // reset formularza
      videoFile.value = null
      reelsTitle.value = ''
      reelsTags.value = []

      return true
    } catch (err) {
      console.error('saveReels unexpected error', err)
      error.value = 'Wystąpił nieoczekiwany błąd.'
      loading.value = false
      return false
    }
  }

  return {
    loading,
    error,
    videoFile,
    reelsTitle,
    reelsTags,
    saveReels,
  }
}
