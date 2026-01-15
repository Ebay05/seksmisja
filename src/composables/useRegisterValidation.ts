import { computed } from 'vue'

export function useRegisterValidation(
  username: () => string,
  password: () => string,
  confirmPass: () => string,
  city: () => string,
  birthDate: () => string,
) {
  // -------------------------------
  // REGEX DEFINITIONS
  // -------------------------------
  const usernameRegex = /^(?=[^0-9])(?=(.*[a-zA-Z]){3,})[a-zA-Z0-9_ ]+$/
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
  const cityRegex = /^[a-zA-ZĄ-ż\s]+$/

  // -------------------------------
  // USERNAME VALIDATION
  // -------------------------------
  const isUsernameValid = computed(() => {
    const value = username().trim()
    return usernameRegex.test(value)
  })

  // -------------------------------
  // PASSWORD VALIDATION
  // -------------------------------
  const isPasswordStrong = computed(() => strongPasswordRegex.test(password()))

  const doPasswordsMatch = computed(() => {
    return password() === confirmPass() && password().length > 0
  })

  // -------------------------------
  // CITY VALIDATION
  // -------------------------------
  const isCityValid = computed(() => {
    const value = city().trim()
    return cityRegex.test(value)
  })

  // -------------------------------
  // AGE VALIDATION (18+)
  // -------------------------------
  const isAdult = computed(() => {
    if (!birthDate()) return false

    const today = new Date()
    const birth = new Date(birthDate())

    const ageLimit = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

    return birth <= ageLimit
  })

  // -------------------------------
  // GLOBAL FORM VALIDATION
  // -------------------------------
  const isFormValid = computed(() => {
    return (
      isUsernameValid.value &&
      isPasswordStrong.value &&
      doPasswordsMatch.value &&
      isCityValid.value &&
      isAdult.value
    )
  })

  return {
    // exposed validators
    isUsernameValid,
    isPasswordStrong,
    doPasswordsMatch,
    isCityValid,
    isAdult,
    isFormValid,

    // regex (if needed in UI)
    usernameRegex,
    strongPasswordRegex,
    cityRegex,
  }
}
