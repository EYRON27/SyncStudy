// ─────────────────────────────────────────────────────────────
// Shared TypeScript types used across the entire application
// ─────────────────────────────────────────────────────────────

// ─── Auth ────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

// ─── API ─────────────────────────────────────────────────────
export interface ApiError {
  message: string
  statusCode: number
}

export type ApiResponse<T> = {
  data: T
  message?: string
}

// ─── Rooms ───────────────────────────────────────────────────
export interface Room {
  id: string
  name: string
  code: string
  ownerId: string
  members: User[]
  createdAt: string
}

// ─── Pagination ──────────────────────────────────────────────
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
}
