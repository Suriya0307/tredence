import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter,
  CheckCircle2,
  Calendar as CalendarIcon
} from 'lucide-react';
import { clsx } from 'clsx';

interface Event {
  id: string;
  title: string;
  type: 'interview' | 'onboarding' | 'meeting' | 'review';
  start: string;
  end: string;
  assignee: string;
}

const EVENTS: Event[] = [
  { id: '1', title: 'Sarah Chen Interview', type: 'interview', start: '09:00', end: '10:00', assignee: 'Alex Rivera' },
  { id: '2', title: 'Product Sync', type: 'meeting', start: '11:30', end: '12:30', assignee: 'Team' },
  { id: '3', title: 'New Hire Orientation', type: 'onboarding', start: '14:00', end: '15:30', assignee: 'Sarah Chen' },
  { id: '4', title: 'Quarterly Review', type: 'review', start: '16:00', end: '17:00', assignee: 'Manager' },
];

export const Scheduler = () => {
  const [currentWeek] = useState('Oct 12 - Oct 18, 2026');
  
  const hours = Array.from({ length: 9 }, (_, i) => i + 9); // 9 AM to 5 PM
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getEventStyle = (type: Event['type']) => {
    switch (type) {
      case 'interview': return 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]';
      case 'onboarding': return 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]';
      case 'meeting': return 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]';
      case 'review': return 'bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]';
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-transparent">
      {/* Sidebar: Mini Calendar / Filter */}
      <div className="w-[300px] bg-white border-r border-[#E0E7FF] flex flex-col shrink-0 p-8 overflow-y-auto">
        <div className="mb-10">
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-[14px] font-semibold text-[#1F2937]">Planner</h2>
              <button className="p-2 transition-colors hover:bg-[#EEF2FF] rounded-lg text-[#6366F1]"><Plus size={18} /></button>
           </div>
           
           {/* Mini Calendar Mock */}
           <div className="bg-[#FAFAFE] border border-[#E0E7FF] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                 <span className="text-[12px] font-bold text-[#374151]">October 2026</span>
                 <div className="flex gap-1">
                    <ChevronLeft size={14} className="text-[#9CA3AF] cursor-pointer" />
                    <ChevronRight size={14} className="text-[#9CA3AF] cursor-pointer" />
                 </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                 {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-[10px] font-bold text-[#9CA3AF]">{d}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                 {Array.from({ length: 31 }, (_, i) => (
                   <span key={i} className={clsx("text-[11px] py-1.5 rounded-lg cursor-pointer transition-colors", i+1 === 14 ? "bg-[#6366F1] text-white font-bold" : "text-[#6B7280] hover:bg-[#EEF2FF]")}>
                     {i + 1}
                   </span>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest">Upcoming Actions</h3>
           <div className="space-y-4">
              {EVENTS.slice(0, 3).map(ev => (
                <div key={ev.id} className="flex gap-3 group cursor-pointer">
                   <div className={clsx("w-1 shrink-0 rounded-full", getEventStyle(ev.type).split(' ')[0].replace('bg-', 'bg-[#').replace(']', ''))} style={{ backgroundColor: getEventStyle(ev.type).includes('EEF2FF') ? '#6366F1' : (getEventStyle(ev.type).includes('ECFDF5') ? '#10B981' : '#8B5CF6') }} />
                   <div>
                      <h4 className="text-[13px] font-medium text-[#1F2937] group-hover:text-[#6366F1] transition-colors">{ev.title}</h4>
                      <p className="text-[11px] text-[#9CA3AF] mt-0.5">{ev.start} - {ev.end}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Main Content Area: Week View */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent">
        {/* Calendar Header */}
        <div className="h-20 px-8 border-b border-[#E0E7FF] bg-white flex items-center justify-between shrink-0">
           <div className="flex items-center gap-6">
              <h2 className="text-[18px] font-semibold text-[#1F2937]">{currentWeek}</h2>
              <div className="flex bg-[#F5F3FF] p-1 rounded-lg border border-[#E0E7FF]">
                 <button className="px-4 py-1.5 bg-white shadow-sm border border-[#E0E7FF] rounded-md text-[12px] font-bold text-[#6366F1]">Week</button>
                 <button className="px-4 py-1.5 text-[12px] font-medium text-[#6B7280] hover:text-[#374151]">Month</button>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <button className="p-2.5 bg-white border border-[#D1D5DB] rounded-lg text-[#6B7280] hover:text-[#374151] transition-all">
                 <Filter size={18} />
              </button>
              <button className="px-5 py-2.5 bg-[#4F46E5] text-white rounded-lg text-[13px] font-bold hover:bg-[#4338CA] transition-all flex items-center gap-2 shadow-lg shadow-indigo-100">
                 <Plus size={16} /> Quick Add
              </button>
           </div>
        </div>

        {/* Grid Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-white">
           <div className="grid grid-cols-[100px_1fr] h-full min-w-[800px]">
              {/* Time Column */}
              <div className="border-r border-[#E0E7FF] bg-[#FAFAFE]">
                 <div className="h-12 border-b border-[#E0E7FF]" /> {/* Empty corner */}
                 {hours.map(hour => (
                   <div key={hour} className="h-[100px] border-b border-[#E0E7FF] p-4 text-right">
                      <span className="text-[11px] font-bold text-[#9CA3AF] uppercase">
                        {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                      </span>
                   </div>
                 ))}
              </div>

              {/* Day Grid */}
              <div className="flex flex-col">
                 {/* Day Headers */}
                 <div className="h-12 border-b border-[#E0E7FF] bg-[#FAFAFE] grid grid-cols-5 sticky top-0 z-10">
                    {days.map(day => (
                      <div key={day} className="flex items-center justify-center border-r border-[#E0E7FF] last:border-r-0">
                         <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">{day}</span>
                      </div>
                    ))}
                 </div>

                 {/* Grid Rows */}
                 <div className="relative flex-1 grid grid-cols-5">
                    {/* Background grid lines */}
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="absolute left-0 right-0 border-b border-[#F3F4F6]" style={{ top: `${(i + 1) * 100}px`, height: '1px' }} />
                    ))}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="absolute top-0 bottom-0 border-r border-[#F3F4F6]" style={{ left: `${(i + 1) * 20}%`, width: '1px' }} />
                    ))}

                    {/* Example Events */}
                    <div className="absolute top-[120px] left-[2%] w-[16%] h-[80px] p-3 rounded-xl border-l-4 shadow-sm group hover:scale-[1.02] transition-all cursor-pointer z-10 bg-[#EEF2FF] text-[#4F46E5] border-[#6366F1]">
                       <div className="flex items-center gap-1.5 mb-1">
                          <CalendarIcon size={10} className="opacity-50" />
                          <span className="text-[9px] font-black uppercase tracking-wider">Interview</span>
                       </div>
                       <h5 className="text-[11px] font-bold truncate">Sarah Chen Interview</h5>
                       <div className="flex items-center gap-2 mt-2">
                          <div className="w-4 h-4 rounded-full bg-white border border-[#C7D2FE] flex items-center justify-center text-[8px] font-bold">SC</div>
                          <span className="text-[9px] opacity-70">Room 402</span>
                       </div>
                    </div>

                    <div className="absolute top-[350px] left-[42%] w-[16%] h-[120px] p-3 rounded-xl border-l-4 shadow-sm group hover:scale-[1.02] transition-all cursor-pointer z-10 bg-[#ECFDF5] text-[#059669] border-[#10B981]">
                       <div className="flex items-center gap-1.5 mb-1">
                          <CheckCircle2 size={10} className="opacity-50" />
                          <span className="text-[9px] font-black uppercase tracking-wider">Onboarding</span>
                       </div>
                       <h5 className="text-[11px] font-bold">Orientation Batch #42</h5>
                       <div className="flex gap-1 mt-3">
                          <div className="w-5 h-5 rounded-full bg-white border border-[#A7F3D0] flex items-center justify-center text-[7px] font-bold">JD</div>
                          <div className="w-5 h-5 rounded-full bg-white border border-[#A7F3D0] flex items-center justify-center text-[7px] font-bold">RK</div>
                       </div>
                    </div>

                    {/* Popover Hover Placeholder */}
                    <div className="absolute top-[200px] left-[62%] w-[16%] h-[60px] flex items-center justify-center bg-white border-2 border-dashed border-[#E0E7FF] rounded-xl text-[#9CA3AF] text-[10px] uppercase font-bold tracking-widest hover:border-[#6366F1] hover:text-[#6366F1] transition-all cursor-pointer">
                       <Plus size={14} className="mr-1" /> Available
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer info */}
        <div className="h-8 bg-[#F9FAFB] border-t border-[#E0E7FF] px-8 flex items-center gap-4">
           <div className="flex items-center gap-1 text-[10px] font-medium text-[#6B7280]">
              <div className="w-2 h-2 rounded-full bg-[#6366F1]" /> Human Resources
           </div>
           <div className="flex items-center gap-1 text-[10px] font-medium text-[#6B7280]">
              <div className="w-2 h-2 rounded-full bg-[#10B981]" /> Onboarding
           </div>
           <div className="flex items-center gap-1 text-[10px] font-medium text-[#6B7280]">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" /> Team Meetings
           </div>
           <div className="ml-auto text-[10px] font-medium text-[#9CA3AF]">
              All times in PST (UTC-8)
           </div>
        </div>
      </div>
    </div>
  );
};
