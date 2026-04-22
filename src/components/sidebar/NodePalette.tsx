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
  { type: 'TaskNode', label: 'Human Task', icon: <ClipboardList size={14} strokeWidth={1.5} />, color: 'text-amber-600', bgColor: 'bg-[#FEFCE8] text-[#92400E] border-[#FEF08A]' },
  { type: 'ApprovalNode', label: 'Approval Rule', icon: <CheckSquare size={14} strokeWidth={1.5} />, color: 'text-amber-500', bgColor: 'bg-amber-500/10 text-amber-500' },
  { type: 'AutomatedStepNode', label: 'Action Trigger', icon: <Zap size={14} strokeWidth={1.5} />, color: 'text-amber-700', bgColor: 'bg-[#B45309]/10 text-[#B45309] border-[#FEF08A]' },
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
          "w-full flex items-center gap-3 py-[7px] px-4 text-sm transition-all outline-none group",
          isActive 
            ? "text-[#1C1917] bg-[#FDE68A] border-l-[3px] border-[#92400E] rounded-r-[6px] rounded-l-none font-bold" 
            : "text-[#1C1917]/60 border-l-[3px] border-transparent hover:text-[#1C1917] hover:bg-[#FDE68A]/40 hover:rounded-r-[6px]"
        )}
      >
        <span className={clsx(
          "flex items-center justify-center transition-colors",
          isActive ? "text-[#92400E]" : "text-[#1C1917]/50 group-hover:text-[#92400E]"
        )}>
          {item.icon}
        </span>
        <span className="tracking-[0.01em]">{item.label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFBEB] text-[#1C1917] w-[220px] shrink-0 font-sans border-r border-[#FEF08A]">
      <div className="pt-6 pb-8 px-6 flex items-center gap-3">
        {/* Nodes/graph logo SVG in Muted Amber */}
        <div className="text-[#92400E] flex shrink-0">
          <Network size={22} strokeWidth={2} />
        </div>
        <h1 className="text-[16px] font-bold text-[#1C1917] tracking-tight leading-none">HR Workflow</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 px-3">
        <div className="space-y-[10px]">
          {/* General Section */}
          <div className="mb-2">
            <div className="px-3 pb-2 pt-2">
              <span className="text-[10px] text-[#92400E] uppercase tracking-[0.12em] font-bold opacity-60">General</span>
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
              <span className="text-[10px] text-[#92400E] uppercase tracking-[0.12em] font-bold opacity-60">Automation</span>
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
          <div className="mt-8 pt-6 border-t border-[#FEF08A] animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="px-3 flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-[#92400E] uppercase tracking-[0.12em] opacity-60">Nodes</span>
            </div>
            <div className="space-y-2 px-1">
              {NODE_TYPES.map((node) => (
                <div
                  key={node.type}
                  className={clsx(
                    "flex items-center gap-3 p-2.5 rounded-[8px] bg-white border border-[#FEF08A] cursor-grab active:cursor-grabbing transition-all group shadow-sm",
                    "hover:scale-[1.03] hover:shadow-md",
                    node.type === 'StartNode' && "hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]",
                    node.type === 'TaskNode' && "hover:shadow-[0_0_12px_rgba(99,102,241,0.3)]",
                    node.type === 'ApprovalNode' && "hover:shadow-[0_0_12px_rgba(245,158,11,0.3)]",
                    node.type === 'AutomatedStepNode' && "hover:shadow-[0_0_12px_rgba(180,83,9,0.3)]",
                    node.type === 'EndNode' && "hover:shadow-[0_0_12px_rgba(244,63,94,0.3)]"
                  )}
                  onDragStart={(event) => onDragStart(event, node.type)}
                  draggable
                >
                  <div className={clsx('p-1.5 rounded-md transition-all shadow-inner group-hover:scale-110', node.bgColor)}>
                    {node.icon}
                  </div>
                  <span className="text-[12px] font-semibold text-[#1C1917]/80 transition-colors leading-tight">
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
