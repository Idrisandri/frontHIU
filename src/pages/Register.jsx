// pages/Register.jsx
import { useRegisterForm } from '../hooks/useRegisterForm'
import { register } from '../services/authService'
import { Field } from '../components/Field'
import { getStrength } from '../utils/passwordStrength'

const STEPS = [
  ['Create your account', 'Takes less than 2 minutes.'],
  ['Set up your workspace', 'Add your team and first project.'],
  ['Start collaborating', 'Invite clients and ship faster.'],
]

// const ROLES = [
//   { value: 'designer', label: 'Designer' },
//   { value: 'developer', label: 'Developer' },
//   { value: 'pm', label: 'Product Manager' },
//   { value: 'founder', label: 'Founder / Executive' },
//   { value: 'other', label: 'Other' },
// ]

const ROLES = [
  { value: 'USER', label: 'User' },
  { value: 'ADMIN', label: 'Administrator' },
]

export default function Register({ navigate }) {
  const { values, errors, loading, handleChange, handleSubmit } = useRegisterForm(
    async (vals) => {
      const data = await register(vals)
      if (data && data.access_token) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('home')
      }
    }
  )

  const strength = getStrength(values.password)

  return (
    <section className="min-h-screen grid md:grid-cols-2">

      {/* ── Branding ── */}
      <div className="flex flex-col justify-center gap-8 p-24 bg-[#f7f6f3] border-r border-black/10">
        <div>
          <p className="text-xs tracking-[0.35em] uppercase text-black/40 font-body mb-4">
            Creative Studio
          </p>
          <h1 className="font-display text-6xl font-black leading-[1.05] tracking-tight">
            Join the<br />studio.<br />
            <em className="not-italic relative">
              Let's build.
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-black" />
            </em>
          </h1>
        </div>

        <p className="font-body text-black/60 text-sm leading-relaxed max-w-xs font-light">
          Your account opens the door to a full suite of project tools,
          collaboration spaces, and client portals.
        </p>

        <div className="flex flex-col gap-5 pt-4 border-t border-black/10">
          {STEPS.map(([title, sub], i) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-7 h-7 border border-black flex items-center justify-center shrink-0 text-[0.65rem] font-medium">
                {i + 1}
              </div>
              <div>
                <p className="font-body text-xs font-medium">{title}</p>
                <p className="font-body text-xs text-black/40 font-light">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Form ── */}
      <div className="flex flex-col justify-center gap-5 p-24 bg-white overflow-y-auto">
        <div>
          <h2 className="font-display text-4xl font-black tracking-tight">Create account.</h2>
          <p className="font-body text-sm text-black/40 mt-1">Fill in your details to get started</p>
        </div>

        {/* Name row */}
        <div className="grid grid-cols-2 gap-5">
          <Field name="name" placeholder="First name"
            autoComplete="given-name"
            value={values.name} onChange={handleChange} error={errors.name} />
          <Field name="lastname" placeholder="Last name"
            autoComplete="family-name"
            value={values.lastname} onChange={handleChange} error={errors.lastname} />
        </div>

        <Field name="username" placeholder="Username"
          autoComplete="username"
          value={values.username} onChange={handleChange} error={errors.username} />

        <Field type="email" name="email" placeholder="Email address"
          autoComplete="email"
          value={values.email} onChange={handleChange} error={errors.email} />

        {/* Role select */}
        <div className={`border-b pb-2 transition-colors ${errors.role ? 'border-red-500' : 'border-black/20 focus-within:border-black'}`}>
          <select
            name="role" value={values.role} onChange={handleChange}
            aria-label="Your role"
            className={`w-full font-body text-sm outline-none bg-transparent cursor-pointer
              ${values.role ? 'text-black' : 'text-black/30'}`}
          >
            <option value="" disabled>Your role</option>
            {ROLES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
        </div>

        {/* Password + strength */}
        <div>
          <Field type="password" name="password" placeholder="Password"
            autoComplete="new-password"
            value={values.password} onChange={handleChange} error={errors.password} />
          {values.password && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className={`h-[2px] flex-1 rounded transition-colors ${n <= strength.score
                    ? strength.score <= 1 ? 'bg-red-500'
                      : strength.score === 2 ? 'bg-orange-400'
                        : 'bg-green-500'
                    : 'bg-black/10'
                    }`} />
                ))}
              </div>
              <p className={`text-[0.62rem] mt-1 ${strength.color}`}>{strength.label}</p>
            </div>
          )}
        </div>

        <Field type="password" name="confirmPassword" placeholder="Confirm password"
          autoComplete="new-password"
          value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

        {/* Terms */}
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" name="terms" checked={values.terms}
            onChange={handleChange} className="accent-black mt-0.5 shrink-0" />
          <span className="font-body text-xs text-black/50 leading-relaxed">
            I agree to the{' '}
            <button type="button" className="text-black underline underline-offset-2 hover:no-underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-black underline underline-offset-2 hover:no-underline">
              Privacy Policy
            </button>
          </span>
        </label>
        {errors.terms && <p className="text-xs text-red-500 -mt-3">{errors.terms}</p>}

        {errors.form && (
          <p className="text-xs text-red-500 text-center">{errors.form}</p>
        )}

        <button
          type="button" onClick={handleSubmit} disabled={loading}
          className="bg-black text-white font-body text-xs tracking-widest uppercase
                     px-8 py-5 hover:bg-black/80 disabled:opacity-50 transition-colors w-full"
        >
          {loading ? 'Creating account…' : 'Create Account'}
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-black/10" />
          <span className="font-body text-[0.65rem] text-black/30 uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-black/10" />
        </div>

        <p className="font-body text-xs text-black/40 text-center">
          Already have an account?{' '}
          <button onClick={() => navigate('login')}
            className="text-black underline underline-offset-2 hover:no-underline">
            Sign in
          </button>
        </p>
      </div>

    </section>
  )
}