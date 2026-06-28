import api from '@/lib/axios'

export interface Testimonial {
  id?: string
  name: string
  role: string
  initials: string
  text: string
  rating: number
  createdAt?: string
}

export const testimonialsService = {
  async getAll(): Promise<Testimonial[]> {
    const res = await api.get('/testimonials')
    return res.data.data
  },

  async create(data: { name: string; role: string; text: string; rating: number }): Promise<Testimonial> {
    const res = await api.post('/testimonials', data)
    return res.data.data
  }
}
