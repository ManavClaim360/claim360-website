import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../config/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('claim360-token') || null)
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('claim360-user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common.Authorization
    }
  }, [token])

  const persistAuth = (authPayload) => {
    const nextToken = authPayload.access_token
    const nextUser = authPayload.user

    setToken(nextToken)
    setUser(nextUser)
    localStorage.setItem('claim360-token', nextToken)
    localStorage.setItem('claim360-user', JSON.stringify(nextUser))
    axios.defaults.headers.common.Authorization = `Bearer ${nextToken}`
    return nextUser
  }

  const register = async (credentials) => {
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/auth/register`, credentials)
      return res.data
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('username', credentials.identifier || credentials.email || credentials.phone)
      params.append('password', credentials.password)

      const res = await axios.post(`${API_URL}/auth/login`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })

      const newToken = res.data.access_token
      setToken(newToken)
      localStorage.setItem('claim360-token', newToken)
      axios.defaults.headers.common.Authorization = `Bearer ${newToken}`

      const userRes = await axios.get(`${API_URL}/auth/me`)
      const loggedInUser = userRes.data
      setUser(loggedInUser)
      localStorage.setItem('claim360-user', JSON.stringify(loggedInUser))
      return loggedInUser
    } finally {
      setLoading(false)
    }
  }

  const requestOtp = async (payload) => {
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/auth/otp/request`, payload)
      return res.data
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (payload) => {
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/auth/otp/verify`, payload)
      return persistAuth(res.data)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('claim360-user')
    localStorage.removeItem('claim360-token')
    delete axios.defaults.headers.common.Authorization
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        requestOtp,
        verifyOtp,
        logout,
        loading,
        isAuth: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
