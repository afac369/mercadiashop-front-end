
import { useState } from 'react'
import Head from 'next/head'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Error al iniciar sesión')
      }

      // Si el login es exitoso, redirigir al panel de admin
      window.location.href = '/admin'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <Head><title>Admin Login – MercadIAshop</title></Head>
      <div className="w-full max-w-md p-8 space-y-6 bg-white/5 rounded-2xl border border-white/10">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium opacity-80">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg bg-white/10 px-3 py-2 border border-transparent focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium opacity-80">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg bg-white/10 px-3 py-2 border border-transparent focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 font-semibold text-black bg-emerald-500/90 rounded-md hover:bg-emerald-500 disabled:opacity-50"
            >
              {loading ? 'Cargando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
