import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { CheckSquare, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { NodeWrapper } from './NodeWrapper';
import type { ApprovalNodeData } from '../../types/workflow';

export const ApprovalNode = memo((props: NodeProps) => {
  const data = props.data as ApprovalNodeData;
  return (
    <NodeWrapper 
      {...props} 
      data={data} 
      icon={<CheckSquare size={14} />} 
      accentColor="bg-amber-50 text-amber-600 border-amber-100"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2 bg-amber-50/50 border border-amber-100 px-2 py-1.5 rounded-lg">
          <ShieldCheck size={12} className="text-amber-500" />
          <span className="text-[11px] font-bold text-amber-700">{data.approverRole}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 border border-emerald-100">
            <CheckCircle2 size={10} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-600">{data.autoApproveThreshold}%</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-50 border border-rose-100">
            <XCircle size={10} className="text-rose-400" />
            <span className="text-[10px] font-bold text-rose-500">Auto</span>
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
});

ApprovalNode.displayName = 'ApprovalNode';
