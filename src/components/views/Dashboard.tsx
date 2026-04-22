import { useState } from 'react';
import { 
  Users, 
  Clock, 
  Search, 
  Command, 
  ArrowUpRight, 
  ChevronRight, 
  MoreHorizontal, 
  Calendar, 
  AlertCircle
} from 'lucide-react';
import { clsx } from 'clsx';

const Sparkline = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 20 - ((d - min) / range) * 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-16 h-6 overflow-visible" viewBox="0 0 100 20">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const KPITile = ({ title, value, detail, data, color }: any) => (
  <div className="bg-[#FFFFF5] p-5 rounded-[12px] border border-[#FEF08A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] flex flex-col justify-between">
    <div className="flex items-start justify-between mb-3">
      <span className="text-[12px] text-[#9CA3AF] uppercase tracking-wider font-medium">{title}</span>
      <Sparkline data={data} color={color} />
    </div>
    <div className="flex items-end justify-between">
      <div>
        <h3 className="text-[28px] font-semibold text-[#111827] leading-none mb-1">{value}</h3>
        <p className="text-[12px] text-[#6B7280]">{detail}</p>
      </div>
      <div className="p-1 rounded-md text-[#92400E]/60 hover:text-[#92400E] transition-colors cursor-pointer">
        <ArrowUpRight size={16} />
      </div>
    </div>
  </div>
);

const HorizontalBarChart = () => {
  const data = [
    { label: 'Engineering', value: 45 },
    { label: 'Product', value: 35 },
    { label: 'Marketing', value: 28 },
    { label: 'Operations', value: 15 },
  ];
  const max = 50;

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.label} className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
            <span>{item.label}</span>
            <span className="text-[#374151]">{item.value}</span>
          </div>
          <div className="h-2 w-full bg-[#EEF2FF] rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-[#B45309] transition-all duration-1000 ease-out" 
              style={{ width: `${(item.value / max) * 100}%` }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');

  const pulseEvents = [
    { title: 'Final Review: James Wilson', type: 'critical', time: '10:30 AM', icon: <AlertCircle size={14} className="text-[#F43F5E]" /> },
    { title: 'Onboarding Check-in', type: 'pending', time: '11:00 AM', icon: <Clock size={14} className="text-[#F59E0B]" /> },
    { title: 'Slack Integration Reauth', type: 'warning', time: '1:00 PM', icon: <AlertCircle size={14} className="text-[#F59E0B]" /> },
    { title: 'Compliance Renewal', type: 'pending', time: '3:30 PM', icon: <Calendar size={14} className="text-[#92400E]" /> },
  ];

  const recentHires = [
    { name: 'Sarah Chen', role: 'Fullstack Engineer', dept: 'Engineering', start: 'Oct 12', status: 'Completed' },
    { name: 'Michael Scott', role: 'Regional Manager', dept: 'Operations', start: 'Oct 15', status: 'In Progress' },
    { name: 'Jim Halpert', role: 'Senior Sales Exec', dept: 'Operations', start: 'Oct 20', status: 'Pending' },
    { name: 'Pam Beesly', role: 'Office Administrator', dept: 'Operations', start: 'Oct 22', status: 'In Progress' },
    { name: 'Ryan Howard', role: 'VP, Interactive', dept: 'Product', start: 'Nov 01', status: 'Overdue' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Active':
        return 'bg-[#D1FAE5] text-[#065F46]';
      case 'Pending':
      case 'In Progress':
        return 'bg-[#FEF3C7] text-[#92400E]';
      case 'Overdue':
      case 'Error':
        return 'bg-[#FFE4E6] text-[#9F1239]';
      default:
        return 'bg-[#F3F4F6] text-[#4B5563]';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto w-full p-8 px-10 space-y-8 bg-transparent">
      {/* Search Bar / Command Input */}
      <div className="max-w-6xl mx-auto">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92400E]/40 group-focus-within:text-[#92400E] transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search employees, actions, or modules... (⌘K)"
            className="w-full pl-12 pr-16 py-3.5 bg-[#FFFDE7] border border-[#FEF08A] rounded-[8px] text-[14px] text-[#1F2937] focus:ring-2 focus:ring-[#FDE68A] focus:border-transparent outline-none transition-all placeholder-[#9CA3AF]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded bg-[#F3F4F6] border border-[#E5E7EB]">
            <Command size={12} className="text-[#6B7280]" />
            <span className="text-[11px] font-medium text-[#6B7280]">K</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPITile 
          title="Total Headcount" 
          value="142" 
          detail="+12 this month" 
          data={[120, 125, 122, 130, 135, 140, 142]} 
          color="#B45309" 
        />
        <KPITile 
          title="Open Roles" 
          value="24" 
          detail="8 urgent vacancies" 
          data={[18, 20, 25, 22, 28, 26, 24]} 
          color="#10B981" 
        />
        <KPITile 
          title="Pending Actions" 
          value="15" 
          detail="Avg delay: 1.2 days" 
          data={[10, 8, 15, 20, 14, 12, 15]} 
          color="#F59E0B" 
        />
        <KPITile 
          title="eNPS Score" 
          value="72" 
          detail="Industry top-tier" 
          data={[65, 68, 70, 69, 74, 71, 72]} 
          color="#8B5CF6" 
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        {/* Pulse / Timeline */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[12px] border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] overflow-hidden flex flex-col h-full border-l-[4px]">
            <div className="p-5 border-b border-[#E0E7FF] flex items-center justify-between">
              <h3 className="text-[13px] font-medium text-[#374151] tracking-[0.01em] flex items-center gap-2">
                Today's Pulse <div className="w-1.5 h-1.5 rounded-full bg-[#B45309] animate-pulse" />
              </h3>
              <span className="text-[11px] text-[#9CA3AF]">4 tasks pending</span>
            </div>
            <div className="p-2 flex-1 space-y-1">
              {pulseEvents.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-[8px] hover:bg-[#EEF2FF] transition-colors group cursor-pointer">
                  <div className="bg-white p-2 rounded-lg border border-[#E0E7FF] group-hover:border-[#C7D2FE] transition-all">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-medium text-[#1F2937] truncate">{item.title}</h4>
                    <p className="text-[11px] text-[#6B7280] font-medium uppercase tracking-[0.02em]">{item.time}</p>
                  </div>
                  <ChevronRight size={14} className="text-[#92400E]/40 group-hover:text-[#92400E] transition-all" />
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-[#E0E7FF]">
              <button className="w-full py-2 bg-white border border-[#FEF08A] text-[#92400E] rounded-[8px] text-[12px] font-medium hover:bg-[#FEFCE8] transition-colors">
                Run Simulation Report
              </button>
            </div>
          </div>
        </div>

        {/* Charts & Tables */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-[12px] border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] border-l-[4px]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-[13px] font-medium text-[#374151] tracking-[0.01em]">Headcount by Dept</h3>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">Top performing sectors</p>
                </div>
                <MoreHorizontal size={16} className="text-[#9CA3AF] cursor-pointer hover:text-[#374151]" />
              </div>
              <HorizontalBarChart />
            </div>
            <div className="bg-white p-6 rounded-[12px] border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] flex flex-col border-l-[4px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[13px] font-medium text-[#374151] tracking-[0.01em]">Active Workflows</h3>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">Automations running</p>
                </div>
                <span className="text-[11px] font-medium bg-[#D1FAE5] text-[#065F46] px-2 py-0.5 rounded-full">Live</span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center">
                 <div className="p-4 bg-[#EEF2FF] rounded-[12px] border border-dashed border-[#C7D2FE]">
                    <Users size={28} className="text-[#B45309]" />
                 </div>
                 <div>
                    <h4 className="text-[15px] font-medium text-[#1F2937]">14 Active Runs</h4>
                    <p className="text-[12px] text-[#6B7280] mt-1 max-w-[150px] leading-relaxed">Manage all onboarding and recruitment triggers.</p>
                 </div>
                 <button className="text-[12px] font-medium text-[#92400E] hover:text-[#78350F] flex items-center gap-1 transition-colors mt-2">
                    Open Automations <ArrowUpRight size={14}/>
                 </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] overflow-hidden border-l-[4px]">
            <div className="p-5 border-b border-[#FEF08A] flex justify-between items-center">
              <div>
                <h3 className="text-[13px] font-medium text-[#374151] tracking-[0.01em]">Recently Hired</h3>
                <p className="text-[11px] text-[#9CA3AF] mt-0.5">Current onboarding queue</p>
              </div>
              <button className="text-[#92400E] font-medium text-[12px] hover:text-[#78350F] transition-colors">Full Directory</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#FFFDF0] text-[11px] font-semibold text-[#92400E] uppercase tracking-wider">
                    <th className="px-6 py-3">Employee</th>
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentHires.map((hire, idx) => (
                    <tr key={hire.name} className={clsx("group border-t border-[#FEF3C7] transition-colors", idx % 2 === 0 ? "bg-white" : "bg-[#FFFDF0]", "hover:bg-[#FEF9C3]")}>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#FEFCE8] flex items-center justify-center text-[11px] font-bold text-[#92400E]">
                            {hire.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-[#1F2937]">{hire.name}</p>
                            <p className="text-[11px] text-[#6B7280]">{hire.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-[13px] text-[#4B5563]">{hire.dept}</td>
                      <td className="px-6 py-3 text-[13px] text-[#4B5563]">{hire.start}</td>
                      <td className="px-6 py-3 text-right">
                        <span className={clsx(
                          "px-2.5 py-1 rounded-[99px] text-[11px] font-medium",
                          getStatusBadge(hire.status)
                        )}>
                          {hire.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
