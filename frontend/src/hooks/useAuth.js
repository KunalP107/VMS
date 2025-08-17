import { useEffect, useState } from 'react'

const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || 'token'

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const isAuthed = Boolean(token)

  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem(TOKEN_KEY))
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const login = (jwt) => {
    localStorage.setItem(TOKEN_KEY, jwt)
    setToken(jwt)
  }
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  return { isAuthed, token, login, logout }
}