import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import TasksPage from '@/pages/TasksPage'
import StudyRoomsPage from '@/pages/StudyRoomsPage'
import ExpensesPage from '@/pages/ExpensesPage'
import NotesPage from '@/pages/NotesPage'
import ProtectedRoute from '@/router/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/study-rooms" element={<StudyRoomsPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
