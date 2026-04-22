import { useState } from 'react';
import { 
  Filter,
  Download,
  Info,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { clsx } from 'clsx';

const LineChart = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data) * 1.1;
  const min = Math.min(...data) * 0.9;
  const range = max - min;
  const width = 500;
  const height = 200;
  const padding = 20;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((v - min) / range) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      {/* Area fill */}
      <path
        d={`M ${padding},${height} L ${points} L ${width - padding},${height} Z`}
        fill={color}
        fillOpacity="0.05"
      />
    </svg>
  );
};

const FunnelChart = () => {
  const stages = [
    { label: 'Applied', value: 1200, conv: '100%' },
    { label: 'Interview', value: 450, conv: '37.5%' },
    { label: 'Offer', value: 80, conv: '17.8%' },
    { label: 'Hired', value: 72, conv: '90%' },
  ];

  return (
    <div className="space-y-4">
      {stages.map((stage) => (
        <div key={stage.label} className="relative flex items-center gap-4">
          <div className="w-24 text-[11px] font-medium text-[#92400E] uppercase tracking-wider">{stage.label}</div>
          <div className="flex-1 h-10 bg-[#FEFCE8] rounded-lg overflow-hidden border border-[#FEF08A] relative">
            <div 
              className="h-full bg-[#B45309] transition-all duration-1000 ease-out flex items-center pl-4 text-white text-[11px] font-bold"
              style={{ width: `${(stage.value / 1200) * 100}%` }}
            >
              {stage.value}
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#92400E]/60">
               {stage.conv}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TurnoverHeatmap = () => {
  const depts = ['Eng', 'Prod', 'Ops', 'Mark', 'Sales'];
  const values = [2.4, 1.2, 5.8, 2.1, 4.4, 0.8, 3.2, 1.5, 2.9, 6.1, 1.1, 2.2, 3.1, 4.5, 0.5];
  
  return (
    <div className="grid grid-cols-5 gap-3">
      {values.map((v, i) => (
        <div 
          key={i} 
          className="aspect-square rounded-lg flex flex-col items-center justify-center border border-[#FEF08A] transition-all hover:scale-105 cursor-default"
          style={{ backgroundColor: `rgba(180, 83, 9, ${v / 8})` }}
          title={`${v}% turnover`}
        >
          <span className={clsx("text-[11px] font-bold", v > 4 ? "text-white" : "text-[#92400E]")}>{v}%</span>
          <span className={clsx("text-[8px] uppercase tracking-tighter opacity-70", v > 4 ? "text-white" : "text-[#92400E]")}>{depts[i % 5]}</span>
        </div>
      ))}
    </div>
  );
};

export const Analytics = () => {
  const [period, setPeriod] = useState('30D');

  const kpis = [
    { label: 'Time to Hire', value: '18 Days', trend: '-2.4', up: false, icon: <Clock size={16} /> },
    { label: 'Turnover Rate', value: '4.2%', trend: '+0.8', up: true, icon: <TrendingUp size={16} /> },
    { label: 'Training Comp.', value: '94.8%', trend: '+3.1', up: true, icon: <CheckCircle2 size={16} /> },
    { label: 'eNPS Score', value: '74', trend: '+2', up: true, icon: <Users size={16} /> },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-transparent p-8 px-10 space-y-8">
      {/* Analytics Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex bg-white p-1 rounded-xl border border-[#FEF08A] shadow-[0_1px_4px_rgba(253,230,138,0.1)]">
          {['7D', '30D', '90D', '1Y'].map(p => (
            <button 
              key={p} 
              onClick={() => setPeriod(p)}
              className={clsx(
                "px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all",
                period === p ? "bg-[#92400E] text-white shadow-md" : "text-[#92400E]/60 hover:text-[#92400E]"
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border border-[#FEF08A] rounded-lg text-[#1C1917] hover:bg-[#FFFDF0] transition-all">
            <Filter size={18} />
          </button>
          <button className="p-2.5 bg-white border border-[#FEF08A] rounded-lg text-[#1C1917] hover:bg-[#FFFDF0] transition-all">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-[#FFFFF5] p-6 rounded-[12px] border border-[#FEF08A] shadow-[0_1px_4px_rgba(253,230,138,0.1)]">
            <div className="flex items-start justify-between mb-4">
              <span className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">{kpi.label}</span>
              <div className="p-2 bg-[#FEFCE8] rounded-lg text-[#92400E]">{kpi.icon}</div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-[28px] font-semibold text-[#111827] leading-none mb-1">{kpi.value}</h3>
              <div className={clsx(
                "text-[11px] font-bold px-2 py-0.5 rounded-full",
                kpi.up ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#FFE4E6] text-[#9F1239]"
              )}>
                {kpi.trend}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        {/* Headcount Line Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[12px] border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] flex flex-col h-[400px] border-l-[4px]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-[13px] font-medium text-[#374151]">Headcount Growth</h3>
              <p className="text-[11px] text-[#9CA3AF] mt-0.5">Net employee count over selected period</p>
            </div>
            <Info size={16} className="text-[#9CA3AF] cursor-help" />
          </div>
          <div className="flex-1 w-full bg-[#FFFDF0] rounded-xl p-4 border border-[#FEF08A]">
            <LineChart data={[120, 122, 125, 130, 132, 135, 138, 142]} color="#B45309" />
          </div>
          <div className="flex items-center justify-between mt-6 text-[10px] font-medium text-[#9CA3AF] uppercase tracking-widest px-4">
            <span>Start</span>
            <span>Week 2</span>
            <span>Week 4</span>
            <span>Week 6</span>
            <span>Current</span>
          </div>
        </div>

        {/* Hiring Funnel */}
        <div className="bg-white p-8 rounded-[12px] border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] flex flex-col border-l-[4px]">
          <h3 className="text-[13px] font-medium text-[#374151] mb-2 tracking-[0.01em]">Hiring Funnel</h3>
          <p className="text-[11px] text-[#9CA3AF] mb-8">Applicant conversion by stage</p>
          <div className="flex-1">
            <FunnelChart />
          </div>
        </div>

        {/* Turnover Heatmap */}
        <div className="bg-white p-8 rounded-[12px] border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] flex flex-col border-l-[4px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[13px] font-medium text-[#374151] tracking-[0.01em]">Turnover Density</h3>
            <span className="text-[10px] font-bold text-[#92400E] bg-[#FEFCE8] px-2 py-0.5 rounded tracking-widest uppercase">Dept. View</span>
          </div>
          <TurnoverHeatmap />
          <div className="mt-6 flex items-center justify-between p-4 bg-[#FFFDF0] rounded-xl border border-[#FEF08A]">
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-tighter">Peak Attrition</span>
                <span className="text-[12px] font-bold text-[#F43F5E]">Sales (6.1%)</span>
             </div>
             <TrendingUp size={24} className="text-[#F43F5E] opacity-20" />
          </div>
        </div>

        {/* Training Completion Table (Small) */}
        <div className="lg:col-span-2 bg-white rounded-[12px] border border-[#FDE68A] shadow-[0_1px_4px_rgba(253,230,138,0.1)] overflow-hidden border-l-[4px]">
          <div className="p-5 border-b border-[#FEF08A] flex justify-between items-center">
             <h3 className="text-[13px] font-medium text-[#374151]">Department Completion</h3>
             <button className="text-[#92400E] font-medium text-[12px] hover:underline">Full Audit</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FFFDF0] text-[11px] font-bold text-[#92400E] uppercase tracking-wider">
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Completion</th>
                <th className="px-6 py-3 text-right">Avg. Score</th>
              </tr>
            </thead>
            <tbody>
              {[
                { d: 'Engineering', c: '98%', s: '92/100' },
                { d: 'Ops / Product', c: '94%', s: '88/100' },
                { d: 'Marketing / Sales', c: '82%', s: '84/100' },
              ].map((row, idx) => (
                <tr key={idx} className={clsx("border-t border-[#FEF3C7]", idx % 2 === 1 ? "bg-[#FFFDF0]" : "bg-white")}>
                  <td className="px-6 py-3 text-[13px] font-medium text-[#1F2937]">{row.d}</td>
                  <td className="px-6 py-3">
                    <div className="w-full bg-[#FEFCE8] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#10B981] h-full" style={{ width: row.c }} />
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right text-[13px] text-[#6B7280]">{row.s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
