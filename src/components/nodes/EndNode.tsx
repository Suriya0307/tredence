import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Flag, CheckCircle2 } from 'lucide-react';
import { NodeWrapper } from './NodeWrapper';
import type { EndNodeData } from '../../types/workflow';

export const EndNode = memo((props: NodeProps) => {
  const data = props.data as EndNodeData;
  return (
    <NodeWrapper 
      {...props} 
      data={data} 
      icon={<Flag size={14} />} 
      accentColor="bg-rose-50 text-rose-600 border-rose-100"
    >
      <div className="space-y-2">
        <p className="text-[11px] text-slate-500 italic leading-snug">
          {data.endMessage || 'Automation Complete'}
        </p>
        <div className="flex gap-2">
          {data.showSummary && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-100">
              <CheckCircle2 size={9} className="text-emerald-500" />
              <span className="text-[9px] font-bold text-emerald-600">Summary</span>
            </div>
          )}
          <div className="px-1.5 py-0.5 rounded bg-rose-50 border border-rose-100">
            <span className="text-[9px] font-bold text-rose-500">Terminal</span>
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
});

EndNode.displayName = 'EndNode';
