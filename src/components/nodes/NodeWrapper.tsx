import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { WorkflowNodeData } from '../../types/workflow';
import { clsx } from 'clsx';
import { MoreHorizontal } from 'lucide-react';

interface NodeWrapperProps {
  selected?: boolean;
  data: WorkflowNodeData;
  icon: React.ReactNode;
  accentColor: string;
  children: React.ReactNode;
}

export const NodeWrapper = memo(({ selected, data, icon, accentColor, children }: NodeWrapperProps) => {
  const getGlowStyles = () => {
    const glows: Record<string, string> = {
      'StartNode': '0 0 16px rgba(34, 197, 94, 0.4), 0 0 32px rgba(34, 197, 94, 0.15)',
      'TaskNode': '0 0 16px rgba(99, 102, 241, 0.4), 0 0 32px rgba(99, 102, 241, 0.15)',
      'ApprovalNode': '0 0 16px rgba(251, 191, 36, 0.5), 0 0 32px rgba(251, 191, 36, 0.2)',
      'EndNode': '0 0 16px rgba(239, 68, 68, 0.4), 0 0 32px rgba(239, 68, 68, 0.15)',
      'AutomatedStepNode': '0 0 16px rgba(139, 92, 246, 0.4), 0 0 32px rgba(139, 92, 246, 0.15)',
    };
    return glows[data.type] || glows['TaskNode'];
  };

  const glowStyle = getGlowStyles();

  return (
    <div
      className={clsx(
        'group relative min-w-[240px] rounded-2xl border bg-white transition-all duration-300 shadow-sm',
        selected 
          ? 'border-[#B45309] ring-2 ring-[#FEF08A] z-20 scale-[1.02]' 
          : 'border-[#FEF08A] hover:border-[#FDE68A] hover:-translate-y-1',
        !data.isValid && data.isValid !== undefined && 'border-rose-400 ring-rose-50'
      )}
      style={{ 
        boxShadow: selected ? undefined : glowStyle,
        animation: selected ? 'nodePulse 2s ease-in-out infinite' : undefined,
      }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center border font-medium transition-transform group-hover:scale-110', accentColor)}>
              {icon}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#1F2937] text-[13px] leading-tight group-hover:text-[#B45309] transition-colors">{data.title}</span>
              <span className="text-[10px] font-medium text-[#92400E]/40 leading-tight uppercase tracking-wide mt-0.5">
                {data.type.replace('Node', '')}
              </span>
            </div>
          </div>
          <button className="text-[#92400E]/40 hover:text-[#1F2937] transition-colors p-1 rounded hover:bg-[#FEFCE8]">
            <MoreHorizontal size={14} />
          </button>
        </div>
        
        {/* Content area */}
        <div className="space-y-2">
          {children}
        </div>
      </div>

      {/* Handles */}
      {data.type !== 'StartNode' && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3.5 !h-3.5 !border-2 !border-white !bg-[#FEF08A] hover:!bg-[#B45309] transition-all"
        />
      )}
      {data.type !== 'EndNode' && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3.5 !h-3.5 !border-2 !border-white !bg-[#FEF08A] hover:!bg-[#B45309] transition-all"
        />
      )}
    </div>
  );
});

NodeWrapper.displayName = 'NodeWrapper';