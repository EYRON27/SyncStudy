import api from '@/lib/axios'

export interface Task {
  id: string
  title: string
  description?: string
  status: string
  priority: string
  roomId: string
  creatorId: string
  assigneeId?: string
  createdAt: string
  updatedAt: string
  room?: {
    name: string
  }
}

export interface CreateTaskInput {
  course: string
  title: string
  priority: string
  status?: string
}

export interface UpdateTaskInput {
  title?: string
  status?: string
  priority?: string
  course?: string
}

export const tasksService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks')
    return response.data.data
  },

  createTask: async (data: CreateTaskInput): Promise<Task> => {
    const response = await api.post('/tasks', data)
    return response.data.data
  },

  updateTask: async (taskId: string, data: UpdateTaskInput): Promise<Task> => {
    const response = await api.patch(`/tasks/${taskId}`, data)
    return response.data.data
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}`)
  }
}
