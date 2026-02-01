import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useRegisterValidation } from './useRegisterValidation'

export function useRegister() {
  // -----------------------------------------------------
  // STATE
  // -----------------------------------------------------
  const email = ref('')
  const username = ref('')
  const password = ref('')
  const confirmPass = ref('')
  const sex = ref<'M' | 'K' | 'I'>('M')
  const birthDate = ref('')
  const city = ref('')
  const role = ref('Vanilla')

  const isLoading = ref(false)
  const currentStep = ref<'home' | 'register' | 'otp'>('home')
  const otpCode = ref('')

  // -----------------------------------------------------
  // VALIDATION (imported from composable)
  // -----------------------------------------------------
  const { isUsernameValid, isPasswordStrong, doPasswordsMatch, isCityValid, isAdult, isFormValid } =
    useRegisterValidation(
      () => username.value,
      () => password.value,
      () => confirmPass.value,
      () => city.value,
      () => birthDate.value,
    )

  // -----------------------------------------------------
  // HELPERS
  // -----------------------------------------------------
  const getAvatarUrl = () =>
    sex.value === 'K' ? '/avatars/default_female_avatar.jpg' : '/avatars/default_male_avatar.jpg'

  // -----------------------------------------------------
  // STEP 1 — EMAIL CHECK
  // -----------------------------------------------------
  const goToRegisterStep = () => {
    if (email.value.trim() && email.value.includes('@')) {
      currentStep.value = 'register'
      return true
    }
    return false
  }

  // -----------------------------------------------------
  // STEP 2 — REGISTER USER
  // -----------------------------------------------------
  const submitRegistration = async () => {
    if (!isFormValid.value) return false

    isLoading.value = true

    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value,
          sex: sex.value,
          city: city.value,
          birth_date: birthDate.value,
          avatar_url: getAvatarUrl(),
          role: role.value,
        },
      },
    })

    isLoading.value = false

    if (error) return { success: false, error: error.message }

    currentStep.value = 'otp'
    return { success: true }
  }

  // -----------------------------------------------------
  // STEP 3 — OTP VERIFICATION
  // -----------------------------------------------------
  const verifyOtp = async () => {
    if (otpCode.value.length < 8) return false

    isLoading.value = true

    const { error } = await supabase.auth.verifyOtp({
      email: email.value,
      token: otpCode.value,
      type: 'signup',
    })

    isLoading.value = false

    if (error) return { success: false, error: error.message }

    currentStep.value = 'home'
    return { success: true }
  }

  // -----------------------------------------------------
  // RESEND OTP + COOLDOWN
  // -----------------------------------------------------
  const cooldownSeconds = ref(0)
  let cooldownInterval: ReturnType<typeof setInterval> | null = null

  const startCooldown = () => {
    cooldownSeconds.value = 300
    if (cooldownInterval) clearInterval(cooldownInterval)

    cooldownInterval = setInterval(() => {
      if (cooldownSeconds.value > 0) {
        cooldownSeconds.value--
      } else if (cooldownInterval) {
        clearInterval(cooldownInterval)
      }
    }, 1000)
  }

  const resendOtp = async () => {
    if (cooldownSeconds.value > 0 || isLoading.value) return false

    isLoading.value = true

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.value,
    })

    isLoading.value = false

    if (error) return { success: false, error: error.message }

    startCooldown()
    return { success: true }
  }

  // -----------------------------------------------------
  // RETURN API
  // -----------------------------------------------------
  return {
    // state
    email,
    username,
    password,
    confirmPass,
    sex,
    birthDate,
    city,
    role,
    otpCode,
    isLoading,
    currentStep,
    cooldownSeconds,

    // validation
    isUsernameValid,
    isPasswordStrong,
    doPasswordsMatch,
    isCityValid,
    isAdult,
    isFormValid,

    // actions
    goToRegisterStep,
    submitRegistration,
    verifyOtp,
    resendOtp,
  }
}
