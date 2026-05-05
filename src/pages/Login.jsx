// pages/Login.jsx
import { useLoginForm } from '../hooks/useLoginForm'
import { login } from '../services/authService'
import { Field } from '../components/Field'

const STATS = [['120+', 'Projects'], ['8yr', 'Experience'], ['40+', 'Awards']]

export default function Login({ navigate }) {
  const { values, errors, loading, handleChange, handleSubmit } = useLoginForm(
    async (vals) => {
      const data = await login(vals.email, vals.password)
      if (data && data.access_token) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('home')
      }
    }
  )

  return (
    <section className="min-h-screen grid md:grid-cols-2">

      {/* ── Branding ── */}
      <div className="flex flex-col justify-center gap-8 p-24 bg-[#f7f6f3] border-r border-black/10">
        <div>
          <p className="text-xs tracking-[0.35em] uppercase text-black/40 font-body mb-4">
            Creative Studio
          </p>
          <h1 className="font-display text-7xl font-black leading-[1.05] tracking-tight">
            We craft<br />
            <em className="not-italic relative">
              bold
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-black" />
            </em><br />
            experiences.
          </h1>
        </div>

        <p className="font-body text-black/60 text-sm leading-relaxed max-w-xs font-light">
          We blend strategy, design, and technology to build digital products
          that stand out in a crowded world. Your vision, amplified.
        </p>

        <div className="flex gap-10 pt-4 border-t border-black/10">
          {STATS.map(([num, label]) => (
            <div key={label}>
              <p className="font-display text-2xl font-bold">{num}</p>
              <p className="font-body text-xs text-black/40 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Form ── */}
      <div className="flex flex-col justify-center gap-6 p-24 bg-white">
        <div>
          <h2 className="font-display text-4xl font-black tracking-tight">Welcome back.</h2>
          <p className="font-body text-sm text-black/40 mt-1">Sign in to your account</p>
        </div>

        <div className="flex flex-col gap-5">
          <Field
            type="email" name="email"
            placeholder="Email address"
            autoComplete="email"
            value={values.email} onChange={handleChange} error={errors.email}
          />
          <Field
            type="password" name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={values.password} onChange={handleChange} error={errors.password}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-body text-xs text-black/50 cursor-pointer">
            <input type="checkbox" name="remember" checked={values.remember}
              onChange={handleChange} className="accent-black" />
            Remember me
          </label>
          <button type="button" className="font-body text-xs text-black/40 hover:text-black transition-colors">
            Forgot password?
          </button>
        </div>

        {errors.form && (
          <p className="text-xs text-red-500 text-center">{errors.form}</p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white font-body text-xs tracking-widest uppercase px-8 py-5
                     hover:bg-black/80 disabled:opacity-50 transition-colors w-full"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        <p className="font-body text-xs text-black/40 text-center">
          Don't have an account?{' '}
          <button onClick={() => navigate('register')}
            className="text-black underline underline-offset-2 hover:no-underline">
            Create one
          </button>
        </p>
      </div>

    </section>
  )
}