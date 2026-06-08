import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

/**
 * Wraps routes that require authentication.
 * Redirects unauthenticated users to /login.
 */
const ProtectedRoute = () => {
  const { token } = useAuthStore()
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
