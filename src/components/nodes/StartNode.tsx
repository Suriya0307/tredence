import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Play } from 'lucide-react';
import { NodeWrapper } from './NodeWrapper';
import type { StartNodeData } from '../../types/workflow';

export const StartNode = memo((props: NodeProps) => {
  const data = props.data as StartNodeData;
  return (
    <NodeWrapper 
      {...props} 
      data={data} 
      icon={<Play size={14} fill="currentColor" />} 
      accentColor="bg-emerald-50 text-emerald-600 border-emerald-100"
    >
      <div className="flex flex-col gap-1">
        <p className="text-[11px] text-slate-500 font-medium leading-tight">
          {data.startTitle || 'Trigger event initializing...'}
        </p>
        <div className="flex gap-2 mt-1">
          <div className="px-1.5 py-0.5 rounded bg-emerald-50 text-[9px] font-bold text-emerald-600 uppercase border border-emerald-100/50">
            Active
          </div>
          <div className="px-1.5 py-0.5 rounded bg-slate-50 text-[9px] font-bold text-slate-400 uppercase border border-slate-100">
            Immediate
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
});

StartNode.displayName = 'StartNode';
