// services/auth.service.js  ← seul fichier à toucher pour brancher NestJS
export async function loginRequest({ email, password, remember }) {
  const res = await fetch('/api/auth/login', {          // endpoint NestJS
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',                              // si cookies httpOnly
  })

  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message ?? 'Authentication failed')
  }

  const { access_token } = await res.json()
  if (remember) localStorage.setItem('token', access_token)
  return access_token
}


export async function registerRequest({ firstName, lastName, email, role, password }) {
  const res = await fetch('/api/auth/register', {   // POST NestJS
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, role, password }),
  })

  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message ?? 'Registration failed')
  }

  return res.json()   // { access_token } si auto-login, ou {} si email de confirmation
}