import api from '@/lib/axios'

export interface LandingStats {
  usersCount: number
  roomsCount: number
  avgRating: number
}

export const statsService = {
  async getLandingStats(): Promise<LandingStats> {
    const res = await api.get('/stats/landing')
    return res.data.data
  }
}
