export function getStrength(password) {
  let score = 0
  if (password.length >= 8)         score++
  if (/[A-Z]/.test(password))       score++
  if (/[0-9]/.test(password))       score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  return {
    score,
    label: ['', '', 'Weak', 'Fair', 'Strong'][score],
    color: ['', '', 'text-red-500', 'text-orange-400', 'text-green-600'][score],
  }
}