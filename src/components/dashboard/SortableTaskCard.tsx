import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Task } from '@/features/tasks/api/tasks.service'
import { Calendar } from 'lucide-react'

interface SortableTaskCardProps {
  task: Task
}

export default function SortableTaskCard({ task }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toUpperCase()) {
      case 'HIGH': return 'text-red-500 bg-red-500/10 border-red-500/20'
      case 'MEDIUM': return 'text-[#ff8c37] bg-[#ff8c37]/10 border-[#ff8c37]/20'
      case 'LOW': return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20'
    }
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date()

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-[#16171d] border ${isDragging ? 'border-[#ff8c37] shadow-xl' : 'border-gray-800/60'} rounded-[16px] p-5 hover:border-gray-700 transition-colors group cursor-grab active:cursor-grabbing`}
    >
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
          {task.dueDate && (
            <div className={`flex items-center gap-1.5 text-[11px] font-medium ${isOverdue ? 'text-red-500' : 'text-gray-400'}`}>
              <Calendar className="w-3.5 h-3.5" />
              {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
          )}
        </div>
        <div className="w-6 h-6 rounded-full bg-[#1853db] flex items-center justify-center text-white text-[9px] font-bold ring-2 ring-[#16171d]">
          AL
        </div>
      </div>
    </div>
  )
}
