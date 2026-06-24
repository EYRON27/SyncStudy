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
  const { setNodeRef } = useDroppable({ id })

  return (
    <div className="w-[320px] flex-shrink-0 bg-[#121317] border border-gray-800/80 rounded-[20px] p-5 flex flex-col max-h-full">
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
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
