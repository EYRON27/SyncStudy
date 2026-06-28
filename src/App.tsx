import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import AuthPage from '@/pages/AuthPage'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import TestimonialsPage from '@/pages/TestimonialsPage'
import PrivacyPage from '@/pages/PrivacyPage'
import TermsPage from '@/pages/TermsPage'
import ContactPage from '@/pages/ContactPage'
import OtpPage from '@/pages/OtpPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/ResetPasswordPage'
import DashboardPage from '@/pages/DashboardPage'
import TasksPage from '@/pages/TasksPage'
import StudyRoomsPage from '@/pages/StudyRoomsPage'
import ExpensesPage from '@/pages/ExpensesPage'
import NotesPage from '@/pages/NotesPage'
import ProtectedRoute from '@/router/ProtectedRoute'
import PublicLayout from '@/layouts/PublicLayout'

function App() {
  return (
    <Routes>
      {/* Public routes with Navbar & Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Auth routes (no Navbar) */}
      <Route path="/login" element={<AuthPage initialView="login" />} />
      <Route path="/register" element={<AuthPage initialView="register" />} />
      <Route path="/verify-otp" element={<OtpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

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
