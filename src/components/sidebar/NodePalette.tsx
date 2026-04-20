import React from 'react';
import type { NodeType } from '../../types/workflow';
import { useWorkflowStore } from '../../store/workflowStore';
import { 
  BarChart2, 
  ShieldCheck, 
  Calendar, 
  PieChart, 
  Layers, 
  FileText, 
  Zap, 
  Settings,
  Circle,
  Play,
  ClipboardList,
  CheckSquare,
  Network
} from 'lucide-react';
import { clsx } from 'clsx';

const NODE_TYPES: { type: NodeType; label: string; icon: React.ReactNode; color: string; bgColor: string }[] = [
  { type: 'StartNode', label: 'Start Trigger', icon: <Play size={14} strokeWidth={1.5} />, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10 text-emerald-500' },
  { type: 'TaskNode', label: 'Human Task', icon: <ClipboardList size={14} strokeWidth={1.5} />, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10 text-indigo-500' },
  { type: 'ApprovalNode', label: 'Approval Rule', icon: <CheckSquare size={14} strokeWidth={1.5} />, color: 'text-amber-500', bgColor: 'bg-amber-500/10 text-amber-500' },
  { type: 'AutomatedStepNode', label: 'Action Trigger', icon: <Zap size={14} strokeWidth={1.5} />, color: 'text-violet-500', bgColor: 'bg-violet-500/10 text-violet-500' },
  { type: 'EndNode', label: 'End Process', icon: <Circle size={14} strokeWidth={1.5} />, color: 'text-rose-500', bgColor: 'bg-rose-500/10 text-rose-500' },
];

const MAIN_NAV = [
  { label: 'Dashboard', icon: <BarChart2 size={18} strokeWidth={1.5} /> },
  { label: 'Compliance', icon: <ShieldCheck size={18} strokeWidth={1.5} /> },
  { label: 'Scheduler', icon: <Calendar size={18} strokeWidth={1.5} /> },
  { label: 'Analytics', icon: <PieChart size={18} strokeWidth={1.5} /> },
];

const AUTOMATION_NAV = [
  { label: 'Integrations', icon: <Layers size={18} strokeWidth={1.5} /> },
  { label: 'Repository', icon: <FileText size={18} strokeWidth={1.5} /> },
  { label: 'Workflows', icon: <Zap size={18} strokeWidth={1.5} /> },
];

export const NodePalette = () => {
  const { currentView, setCurrentView } = useWorkflowStore();

  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const NavItem = ({ item }: { item: { label: string; icon: React.ReactNode } }) => {
    const isActive = currentView === item.label;
    return (
      <button 
        onClick={() => setCurrentView(item.label)}
        className={clsx(
          "w-full flex items-center gap-3 py-[7px] px-4 text-sm transition-all outline-none",
          isActive 
            ? "text-[#FFFFFF] bg-[rgba(99,102,241,0.15)] border-l-2 border-[#6366F1] rounded-r-[6px] rounded-l-none" 
            : "text-[#6B7280] border-l-2 border-transparent hover:text-[#C4B5FD] hover:bg-[rgba(99,102,241,0.08)] hover:rounded-r-[6px]"
        )}
      >
        <span className={clsx(
          "flex items-center justify-center transition-colors",
          isActive ? "text-[#818CF8]" : "text-[#4B4B6B] group-hover:text-[#A78BFA]"
        )}>
          {item.icon}
        </span>
        <span className="font-medium tracking-[0.01em]">{item.label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#0D0D14] text-white w-[220px] shrink-0 font-sans">
      <div className="pt-6 pb-8 px-6 flex items-center gap-3">
        {/* Nodes/graph logo SVG in Electric Indigo */}
        <div className="text-[#6366F1] flex shrink-0">
          <Network size={22} strokeWidth={2} />
        </div>
        <h1 className="text-[16px] font-semibold text-[#F9FAFB] tracking-tight leading-none">HR Workflow</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 px-3">
        <div className="space-y-[10px]">
          {/* General Section */}
          <div className="mb-2">
            <div className="px-3 pb-2 pt-2">
              <span className="text-[10px] text-[#3F3F5C] uppercase tracking-[0.12em] font-bold">General</span>
            </div>
            <div className="space-y-[1px]">
              {MAIN_NAV.map((item) => (
                <NavItem key={item.label} item={item} />
              ))}
            </div>
          </div>

          {/* Automation Section */}
          <div className="mb-2">
            <div className="px-3 pb-2 pt-4">
              <span className="text-[10px] text-[#3F3F5C] uppercase tracking-[0.12em] font-bold">Automation</span>
            </div>
            <div className="space-y-[1px]">
              {AUTOMATION_NAV.map((item) => (
                <NavItem key={item.label} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Node Palette Area - Only visible if viewing Workflows */}
        {currentView === 'Workflows' && (
          <div className="mt-8 pt-6 border-t border-[#1E1E2D]/50 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="px-3 flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-[#3F3F5C] uppercase tracking-[0.12em]">Nodes</span>
            </div>
            <div className="space-y-2 px-1">
              {NODE_TYPES.map((node) => (
                <div
                  key={node.type}
                  className="flex items-center gap-3 p-2.5 rounded-[8px] bg-white/5 border border-white/5 hover:border-indigo-500/30 cursor-grab active:cursor-grabbing transition-all group"
                  onDragStart={(event) => onDragStart(event, node.type)}
                  draggable
                >
                  <div className={clsx('p-1.5 rounded-md transition-all', node.bgColor)}>
                    {node.icon}
                  </div>
                  <span className="text-[12px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors leading-tight">
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-3 mb-2">
        <NavItem item={{ label: 'Settings', icon: <Settings size={18} strokeWidth={1.5} /> }} />
      </div>
    </div>
  );
};
