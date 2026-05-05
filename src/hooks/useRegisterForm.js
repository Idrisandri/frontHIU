// hooks/useRegisterForm.js
import { useState } from 'react'

const INITIAL = { name: '', lastname: '', username: '', email: '', role: '', password: '', confirmPassword: '', terms: false }

export function useRegisterForm(onSubmit) {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate({ name, lastname, username, email, role, password, confirmPassword, terms }) {
    const e = {}
    if (!name.trim()) e.name = 'Required.'
    if (!lastname.trim()) e.lastname = 'Required.'
    if (!username.trim()) e.username = 'Required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email address.'
    if (!role) e.role = 'Please select your role.'
    if (password.length < 8) e.password = 'Must be at least 8 characters.'
    if (confirmPassword !== password) e.confirmPassword = 'Passwords do not match.'
    if (!terms) e.terms = 'You must accept the Terms of Service.'
    return e
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit() {
    const errs = validate(values)
    if (Object.keys(errs).length) return setErrors(errs)

    setLoading(true)
    try {
      await onSubmit(values)
    } catch (err) {
      setErrors({ form: err.message })
    } finally {
      setLoading(false)
    }
  }

  return { values, errors, loading, handleChange, handleSubmit }
}