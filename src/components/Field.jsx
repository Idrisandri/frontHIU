// components/Field.jsx
export function Field({ type = 'text', name, placeholder, value, onChange, error, autoComplete }) {
  return (
    <div className={`border-b pb-2 transition-colors ${error ? 'border-red-500' : 'border-black/20 focus-within:border-black'}`}>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-label={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full font-body text-sm outline-none bg-transparent placeholder:text-black/30"
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
}