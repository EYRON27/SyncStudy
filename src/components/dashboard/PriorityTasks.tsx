import { MoreHorizontal, Clock } from 'lucide-react'

export default function PriorityTasks() {
  const tasks = [
    {
      course: 'Web Dev',
      title: 'Advanced React Patterns',
      due: 'Due in 2 days',
      status: 'In Progress',
      priority: 'HIGH',
      priorityColor: 'text-red-500 bg-red-500/10 border-red-500/20',
      statusBadge: true
    },
    {
      course: 'Mathematics',
      title: 'Calculus III Assignment',
      due: 'Due in 2 days',
      status: 'Todo',
      priority: 'MEDIUM',
      priorityColor: 'text-[#ff8c37] bg-[#ff8c37]/10 border-[#ff8c37]/20',
      statusBadge: true
    },
    {
      course: 'Computer Science',
      title: 'Database Systems Project',
      due: 'Due in 2 days',
      status: 'Done',
      statusColor: 'text-[#00c48c]',
      priority: 'HIGH',
      priorityColor: 'text-red-500 bg-red-500/10 border-red-500/20',
      statusBadge: false
    },
    {
      course: 'Psychology',
      title: 'Read Chapter 4-5',
      due: 'Due in 2 days',
      status: 'Todo',
      priority: 'LOW',
      priorityColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      statusBadge: true
    }
  ]

  return (
    <div className="bg-[#121317] border border-gray-800/80 rounded-[20px] p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-bold text-lg">Priority Tasks</h2>
        <button className="text-gray-500 hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {tasks.map((task, i) => (
          <div key={i} className="bg-[#16171d] border border-gray-800/60 rounded-[16px] p-5 hover:border-gray-700 transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-[11px] font-semibold px-2.5 py-1 bg-[#1e1f26] rounded-md">
                {task.course}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-widest ${task.priorityColor}`}>
                {task.priority}
              </span>
            </div>
            <h3 className="text-white font-semibold text-[15px] mb-4 group-hover:text-[#ff8c37] transition-colors">
              {task.title}
            </h3>
            <div className="flex justify-between items-center text-[12px]">
              <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {task.due}
              </div>
              {task.statusBadge ? (
                <span className="text-gray-400 text-[11px] font-semibold px-2.5 py-1 bg-[#1e1f26] rounded-md">
                  {task.status}
                </span>
              ) : (
                <span className={`font-semibold text-[12px] ${task.statusColor || 'text-gray-500'}`}>
                  {task.status}
                </span>
              )}
            </div>
          </div>
        ))}

        <button className="w-full mt-6 py-3.5 rounded-xl border border-dashed border-gray-700/80 bg-transparent text-gray-400 text-[13px] font-semibold hover:border-gray-500 hover:text-white transition-colors">
          + Add New Task
        </button>
      </div>
    </div>
  )
}
