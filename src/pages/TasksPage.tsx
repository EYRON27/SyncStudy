import { useState, useEffect } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { Plus, MoreHorizontal, MessageSquare, Paperclip, Loader2 } from 'lucide-react'
import { tasksService, Task } from '@/features/tasks/api/tasks.service'
import AddTaskModal from '@/components/dashboard/AddTaskModal'

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

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

  const getPriorityColor = (priority: string) => {
    switch (priority.toUpperCase()) {
      case 'HIGH': return 'text-red-500 bg-red-500/10 border-red-500/20'
      case 'MEDIUM': return 'text-[#ff8c37] bg-[#ff8c37]/10 border-[#ff8c37]/20'
      case 'LOW': return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20'
    }
  }

  const columns = [
    { id: 'todo', title: 'To Do', items: tasks.filter(t => t.status === 'todo') },
    { id: 'in-progress', title: 'In Progress', items: tasks.filter(t => t.status === 'in-progress') },
    { id: 'review', title: 'Review', items: tasks.filter(t => t.status === 'review') },
    { id: 'done', title: 'Done', items: tasks.filter(t => t.status === 'done') }
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
              <div className="flex gap-6 flex-1 items-start h-full pb-8">
                {columns.map(column => (
                  <div key={column.id} className="w-[320px] flex-shrink-0 bg-[#121317] border border-gray-800/80 rounded-[20px] p-5 flex flex-col max-h-full">
                    <div className="flex items-center justify-between mb-5 flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <h2 className="text-white font-bold text-[15px]">{column.title}</h2>
                        <span className="bg-[#1a1c23] text-gray-400 text-[11px] font-bold px-2 py-0.5 rounded-full">
                          {column.items.length}
                        </span>
                      </div>
                      <button className="text-gray-500 hover:text-white transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                      {column.items.map((task) => (
                        <div key={task.id} className="bg-[#16171d] border border-gray-800/60 rounded-[16px] p-5 hover:border-gray-700 transition-colors group cursor-pointer">
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-gray-400 text-[11px] font-semibold px-2.5 py-1 bg-[#1e1f26] rounded-md truncate max-w-[150px]">
                              {task.room?.name || 'General'}
                            </span>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-widest ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <h3 className="text-white font-semibold text-[15px] mb-6 group-hover:text-[#ff8c37] transition-colors">
                            {task.title}
                          </h3>
                          <div className="flex justify-between items-center mt-auto">
                            <div className="flex items-center gap-3 text-gray-500">
                              {/* Placeholder for comments and attachments */}
                            </div>
                            <div className="w-6 h-6 rounded-full bg-[#1853db] flex items-center justify-center text-white text-[9px] font-bold ring-2 ring-[#16171d]">
                              NA
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="w-full mt-2 py-3.5 rounded-xl border border-dashed border-gray-800 bg-transparent text-gray-500 text-[13px] font-semibold hover:border-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Card
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <AddTaskModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onTaskCreated={fetchTasks} 
      />
    </div>
  )
}
