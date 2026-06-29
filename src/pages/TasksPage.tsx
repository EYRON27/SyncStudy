import { useState, useEffect } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { Plus, Loader2 } from 'lucide-react'
import { tasksService } from '@/features/tasks/api/tasks.service'
import type { Task } from '@/features/tasks/api/tasks.service'
import { roomsService } from '@/features/rooms/api/rooms.service'
import AddTaskModal from '@/components/dashboard/AddTaskModal'
import DeleteTaskModal from '@/components/dashboard/DeleteTaskModal'
import CompleteTaskModal from '@/components/dashboard/CompleteTaskModal'
import KanbanColumn from '@/components/dashboard/KanbanColumn'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
  const [taskToComplete, setTaskToComplete] = useState<Task | null>(null)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const data = await tasksService.getTasks()
      setTasks(data)
    } catch (err) {
      console.error('Failed to fetch tasks', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const isOverdue = (task: Task) => {
    if (!task.dueDate) return false
    const due = new Date(task.dueDate)
    due.setHours(23, 59, 59, 999)
    return due < new Date() && task.status !== 'done'
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeTask = tasks.find(t => t.id === activeId)
    if (!activeTask) return

    let newStatus = activeTask.status

    if (['todo', 'in-progress', 'overdue', 'done'].includes(overId)) {
      newStatus = overId
    } else {
      const overTask = tasks.find(t => t.id === overId)
      if (overTask) {
        newStatus = overTask.status
      }
    }

    if (newStatus === 'overdue') return // Can't manually drag into overdue

    if (newStatus === 'done' && newStatus !== activeTask.status) {
      setTaskToComplete(activeTask)
      return
    }

    if (newStatus !== activeTask.status) {
      const previousTasks = [...tasks]
      setTasks(tasks.map(t => t.id === activeId ? { ...t, status: newStatus } : t))
      try {
        await tasksService.updateTask(activeId, { status: newStatus })
      } catch (err) {
        console.error('Failed to update task status', err)
        setTasks(previousTasks)
      }
    }
  }

  const handleDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId)
  }

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return
    const taskId = taskToDelete
    setTaskToDelete(null)
    const previousTasks = [...tasks]
    try {
      setTasks(prev => prev.filter(t => t.id !== taskId))
      await tasksService.deleteTask(taskId)
    } catch (err) {
      console.error('Failed to delete task', err)
      setTasks(previousTasks)
    }
  }

  const confirmCompleteTask = async () => {
    if (!taskToComplete) return
    const task = taskToComplete
    setTaskToComplete(null)

    const previousTasks = [...tasks]
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'done' } : t))
    try {
      await tasksService.updateTask(task.id, { status: 'done' })
      // Delete the associated room (this also deletes messages via cascade)
      if (task.roomId) {
        try {
          await roomsService.deleteRoom(task.roomId)
        } catch (roomErr) {
          console.error('Could not delete room (may not be owner):', roomErr)
        }
      }
    } catch (err) {
      console.error('Failed to complete task', err)
      setTasks(previousTasks)
    }
  }

  const getPriorityWeight = (priority: string) => {
    switch (priority.toUpperCase()) {
      case 'HIGH': return 3
      case 'MEDIUM': return 2
      case 'LOW': return 1
      default: return 0
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityDiff = getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
    if (priorityDiff !== 0) return priorityDiff
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  // Overdue tasks: not done and past due date
  const overdueTasks = sortedTasks.filter(t => isOverdue(t))
  const overdueIds = new Set(overdueTasks.map(t => t.id))

  const columns = [
    { id: 'todo', title: 'To Do', items: sortedTasks.filter(t => t.status === 'todo' && !overdueIds.has(t.id)) },
    { id: 'in-progress', title: 'In Progress', items: sortedTasks.filter(t => t.status === 'in-progress' && !overdueIds.has(t.id)) },
    { id: 'overdue', title: 'Overdue', items: overdueTasks },
    { id: 'done', title: 'Done', items: sortedTasks.filter(t => t.status === 'done') }
  ]

  return (
    <div className="flex h-screen bg-[#0f1015] font-sans overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopBar />
        
        <main className="flex-1 overflow-x-auto overflow-y-auto p-6 md:p-8 relative">
          <div className="max-w-[1600px] mx-auto min-w-[1000px] relative z-10 h-full flex flex-col">
            {/* Header Section */}
            <div className="flex items-end justify-between mb-8 flex-shrink-0">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Task Management</h1>
                <p className="text-gray-400 text-sm">Organize your assignments and study goals.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e2028] border border-gray-700 text-gray-300 text-sm font-semibold hover:bg-[#252836] hover:text-white transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>

            {/* Kanban Board */}
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#ff8c37] animate-spin" />
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
              >
                <div className="flex gap-6 flex-1 items-start h-full pb-8">
                  {columns.map(column => (
                    <KanbanColumn 
                      key={column.id} 
                      id={column.id} 
                      title={column.title} 
                      tasks={column.items} 
                      onDeleteTask={handleDeleteTask}
                    />
                  ))}
                </div>
              </DndContext>
            )}
          </div>
        </main>
      </div>

      <AddTaskModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onTaskCreated={fetchTasks} 
      />

      <DeleteTaskModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={confirmDeleteTask}
      />

      <CompleteTaskModal
        isOpen={!!taskToComplete}
        onClose={() => setTaskToComplete(null)}
        onConfirm={confirmCompleteTask}
        hasRoom={!!taskToComplete?.roomId}
      />
    </div>
  )
}

