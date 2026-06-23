import { MoreHorizontal, Clock } from 'lucide-react'

export default function PriorityTasks() {
  const tasks = [
    {
      course: 'Web Dev',
      title: 'Advanced React Patterns',
      due: 'Due in 2 days',
      status: 'In Progress',
      priority: 'HIGH',
      priorityColor: 'text-red-500 bg-red-500/10 border-red-500/20'
    },
    {
      course: 'Mathematics',
      title: 'Calculus III Assignment',
      due: 'Due in 2 days',
      status: 'Todo',
      priority: 'MEDIUM',
      priorityColor: 'text-[#ff8c37] bg-[#ff8c37]/10 border-[#ff8c37]/20'
    },
    {
      course: 'Computer Science',
      title: 'Database Systems Project',
      due: 'Due in 2 days',
      status: 'Done',
      statusColor: 'text-emerald-400',
      priority: 'HIGH',
      priorityColor: 'text-red-500 bg-red-500/10 border-red-500/20'
    }
  ]

  return (
    <div className="bg-[#16171d] border border-gray-800/80 rounded-[20px] p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-bold text-lg">Priority Tasks</h2>
        <button className="text-gray-500 hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {tasks.map((task, i) => (
          <div key={i} className="bg-[#13141a] border border-gray-800/60 rounded-2xl p-5 hover:border-gray-700 transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <span className="text-gray-400 text-[11px] font-semibold px-2 py-0.5 bg-[#1a1c23] border border-gray-800 rounded-md">
                {task.course}
              </span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-widest ${task.priorityColor}`}>
                {task.priority}
              </span>
            </div>
            <h3 className="text-white font-semibold text-[14px] mb-4 group-hover:text-[#ff8c37] transition-colors">
              {task.title}
            </h3>
            <div className="flex justify-between items-center text-[12px]">
              <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {task.due}
              </div>
              <span className={`font-semibold ${task.statusColor || 'text-gray-500'}`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
