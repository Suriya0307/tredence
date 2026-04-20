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
  return (
    <div
      className={clsx(
        'group relative min-w-[240px] rounded-2xl border bg-white transition-all shadow-sm',
        selected ? 'border-indigo-400 ring-4 ring-indigo-50 z-10 scale-[1.02] shadow-md' : 'border-slate-200 hover:border-slate-300',
        !data.isValid && data.isValid !== undefined && 'border-rose-400 ring-rose-50'
      )}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center border font-medium', accentColor)}>
              {icon}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-[13px] leading-tight">{data.title}</span>
              <span className="text-[10px] font-medium text-slate-400 leading-tight uppercase tracking-wide mt-0.5">
                {data.type.replace('Node', '')}
              </span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded hover:bg-slate-50">
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
          className="!w-3 !h-3 !border-2 !border-white !bg-slate-300 hover:!bg-indigo-500 transition-colors"
        />
      )}
      {data.type !== 'EndNode' && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !border-2 !border-white !bg-slate-300 hover:!bg-indigo-500 transition-colors"
        />
      )}
    </div>
  );
});

NodeWrapper.displayName = 'NodeWrapper';