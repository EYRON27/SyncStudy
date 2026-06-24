import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { Plus, Search, Folder, MoreVertical, Star } from 'lucide-react'

export default function NotesPage() {
  const folders = [
    { id: 1, name: 'Computer Science', active: true },
    { id: 2, name: 'Mathematics', active: false },
    { id: 3, name: 'Psychology', active: false },
    { id: 4, name: 'Personal', active: false },
  ]

  return (
    <div className="flex h-screen bg-[#0f1015] font-sans overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopBar />
        
        <main className="flex-1 overflow-x-auto overflow-y-auto p-6 md:p-8 relative">
          <div className="max-w-[1600px] mx-auto min-w-[1000px] relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-end justify-between mb-8 flex-shrink-0">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Notes & Files</h1>
                <p className="text-gray-400 text-[14px]">Your personal academic knowledge base.</p>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4a6378] text-white text-[14px] font-bold hover:bg-[#5a7388] transition-colors shadow-lg">
                <Plus className="w-4 h-4" />
                New Note
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="flex gap-6 flex-1 min-h-0">
              
              {/* Left Column: Folders */}
              <div className="w-[280px] flex-shrink-0 bg-[#121317] border border-gray-800/80 rounded-[20px] p-5 flex flex-col">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search notes..." 
                    className="w-full bg-[#1a1c23] border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-[13px] text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8c37]/50 focus:ring-1 focus:ring-[#ff8c37]/50 transition-all"
                  />
                </div>
                
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">
                  Folders
                </div>
                
                <div className="space-y-1">
                  {folders.map(folder => (
                    <div 
                      key={folder.id}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                        folder.active 
                          ? 'bg-[#1a1c23] text-white border border-gray-800/50' 
                          : 'text-gray-400 hover:bg-[#1a1c23]/50 hover:text-gray-300 border border-transparent'
                      }`}
                    >
                      <Folder className={`w-4 h-4 ${folder.active ? 'text-[#4a6378]' : 'text-gray-500'}`} />
                      <span className="text-[13px] font-medium">{folder.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Editor */}
              <div className="flex-1 bg-[#121317] border border-gray-800/80 rounded-[20px] flex flex-col relative overflow-hidden">
                <div className="p-8 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-gray-500 text-[13px] font-medium mb-3">
                        Computer Science / Algorithms
                      </div>
                      <h1 className="text-[28px] font-bold text-white mb-3 tracking-tight">Binary Search Trees</h1>
                      <div className="flex items-center gap-4 text-[12px] font-medium">
                        <span className="text-gray-500">Last edited today at 10:45 AM</span>
                        <div className="flex items-center gap-1.5 text-[#ff8c37]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          Favorited
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-[#1a1c23]">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
                  <div className="max-w-[800px]">
                    <p className="text-gray-300 text-[14px] leading-relaxed mb-5">
                      A <strong className="text-white">Binary Search Tree (BST)</strong> is a node-based binary tree data structure which has the following properties:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300 text-[14px] leading-relaxed mb-8">
                      <li>The left subtree of a node contains only nodes with keys lesser than the node's key.</li>
                      <li>The right subtree of a node contains only nodes with keys greater than the node's key.</li>
                      <li>The left and right subtree each must also be a binary search tree.</li>
                    </ul>

                    <div className="bg-[#16171d] border border-gray-800/60 rounded-[14px] p-5 mb-8 font-mono text-[13px] leading-relaxed text-[#4ade80]">
                      <div><span className="text-[#60a5fa]">class</span> Node {'{'}</div>
                      <div className="pl-4"><span className="text-[#60a5fa]">constructor</span>(data) {'{'}</div>
                      <div className="pl-8"><span className="text-[#c084fc]">this</span>.data = data;</div>
                      <div className="pl-8"><span className="text-[#c084fc]">this</span>.left = <span className="text-[#f87171]">null</span>;</div>
                      <div className="pl-8"><span className="text-[#c084fc]">this</span>.right = <span className="text-[#f87171]">null</span>;</div>
                      <div className="pl-4">{'}'}</div>
                      <div>{'}'}</div>
                    </div>

                    <h2 className="text-white text-[18px] font-bold mb-4">Time Complexity</h2>
                    <div className="bg-[#16171d] border border-gray-800/60 rounded-[14px] overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-800/60">
                            <th className="py-4 px-5 text-[13px] font-semibold text-gray-400">Operation</th>
                            <th className="py-4 px-5 text-[13px] font-semibold text-gray-400">Average</th>
                            <th className="py-4 px-5 text-[13px] font-semibold text-gray-400">Worst Case</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-4 px-5 text-[14px] text-gray-300 font-medium">Search</td>
                            <td className="py-4 px-5 text-[14px] text-gray-300 font-mono">O(log n)</td>
                            <td className="py-4 px-5 text-[14px] text-gray-300 font-mono">O(n)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* AI Summary Widget */}
                <div className="absolute bottom-6 right-6 w-[320px] bg-[#1a1c23] border border-[#ff8c37]/30 rounded-[16px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] z-20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded bg-[#ff8c37] flex items-center justify-center text-white font-bold text-[10px]">
                      AI
                    </div>
                    <span className="text-white font-bold text-[13px]">Smart Summary</span>
                  </div>
                  <p className="text-gray-300 text-[12px] leading-relaxed mb-4">
                    A BST is a tree where the left child is smaller and right child is larger. It offers O(log n) operations but degrades to O(n) if unbalanced.
                  </p>
                  <button className="w-full py-2.5 rounded-lg border border-[#ff8c37]/40 text-[#ff8c37] text-[12px] font-bold hover:bg-[#ff8c37]/10 transition-colors">
                    Generate Flashcards
                  </button>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
