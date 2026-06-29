import api from '@/lib/axios'

export interface Expense {
  id: string
  title: string
  category: string
  amount: number
  type: 'expense' | 'income'
  date: string
}

export type CreateExpenseInput = Omit<Expense, 'id' | 'date'>

export const expensesService = {
  async getExpenses(): Promise<Expense[]> {
    const res = await api.get('/expenses')
    return res.data.data
  },

  async createExpense(data: CreateExpenseInput): Promise<Expense> {
    const res = await api.post('/expenses', data)
    return res.data.data
  },

  async deleteExpense(id: string): Promise<void> {
    await api.delete(`/expenses/${id}`)
  }
}
