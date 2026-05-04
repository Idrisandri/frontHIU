// hooks/useLoginForm.js
import { useState } from 'react'

const INITIAL_STATE = { email: '', password: '', remember: false }

export function useLoginForm(onSubmit) {
  const [values, setValues]   = useState(INITIAL_STATE)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  function validate({ email, password }) {
    const errs = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = 'Please enter a valid email address.'
    if (password.length < 8)
      errs.password = 'Password must be at least 8 characters.'
    return errs
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