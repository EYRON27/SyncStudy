import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { MoreHorizontal } from 'lucide-react'
import SortableTaskCard from './SortableTaskCard'
import type { Task } from '@/features/tasks/api/tasks.service'

interface KanbanColumnProps {
  id: string
  title: string
  tasks: Task[]
}

export default function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  const getColumnColor = (colId: string) => {
    switch (colId) {
      case 'todo': return 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
      case 'in-progress': return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]'
      case 'review': return 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
      case 'done': return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
      default: return 'bg-gray-500'
    }
  }

  const getHighlightStyle = (colId: string) => {
    switch (colId) {
      case 'todo': return 'bg-[#161925] border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]'
      case 'in-progress': return 'bg-[#1a1814] border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.15)]'
      case 'review': return 'bg-[#191522] border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
      case 'done': return 'bg-[#141c18] border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.15)]'
      default: return 'bg-[#1a1c23] border-[#ff8c37] shadow-[0_0_30px_rgba(255,140,55,0.15)]'
    }
  }

  return (
    <div 
      className={`w-[320px] flex-shrink-0 rounded-[20px] p-5 flex flex-col max-h-full transition-all duration-300 border
        ${isOver ? getHighlightStyle(id) : 'bg-[#121317] border-gray-800/80'}
      `}
    >
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${getColumnColor(id)}`} />
          <h2 className="text-white font-bold text-[15px]">{title}</h2>
          <span className="bg-[#1a1c23] text-gray-400 text-[11px] font-bold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="text-gray-500 hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div ref={setNodeRef} className="space-y-4 overflow-y-auto flex-1 pr-1 custom-scrollbar min-h-[150px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
