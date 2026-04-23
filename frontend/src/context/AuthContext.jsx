import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('claim360-token') || null)
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('claim360-user')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  // Configure axios auth header globally
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  const register = async (credentials) => {
    setLoading(true)
    try {
      // 1. Register
      await axios.post(`${API_URL}/auth/register`, {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password || 'password123' 
      })
      // 2. Login automatically
      return await login({ email: credentials.email, password: credentials.password || 'password123' })
    } catch (err) {
      setLoading(false)
      throw err
    }
  }

  const login = async (credentials) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('username', credentials.email || credentials.phone)
      params.append('password', credentials.password || 'password123') // frontend mock didn't capture pass, using default if missing

      const res = await axios.post(`${API_URL}/auth/login`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const newToken = res.data.access_token
      setToken(newToken)
      localStorage.setItem('claim360-token', newToken)
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      const userRes = await axios.get(`${API_URL}/auth/me`)
      
      const loggedInUser = userRes.data
      setUser(loggedInUser)
      localStorage.setItem('claim360-user', JSON.stringify(loggedInUser))
      setLoading(false)
      return loggedInUser
    } catch (err) {
      setLoading(false)
      throw err
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('claim360-user')
    localStorage.removeItem('claim360-token')
  }

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, loading, isAuth: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
