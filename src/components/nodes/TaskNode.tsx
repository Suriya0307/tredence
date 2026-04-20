import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { ClipboardList, User, Clock, ArrowRight } from 'lucide-react';
import { NodeWrapper } from './NodeWrapper';
import type { TaskNodeData } from '../../types/workflow';

export const TaskNode = memo((props: NodeProps) => {
  const data = props.data as TaskNodeData;
  return (
    <NodeWrapper 
      {...props} 
      data={data} 
      icon={<ClipboardList size={14} />} 
      accentColor="bg-blue-50 text-blue-600 border-blue-100"
    >
      <div className="space-y-3">
        <p className="text-[11px] text-slate-500 leading-snug">
          {data.description || 'Assigned task for manual review and processing...'}
        </p>
        
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
            <User size={10} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-600 truncate max-w-[80px]">
              {data.assignee || 'Unassigned'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-bold text-blue-500">
            <Clock size={10} />
            <span>{data.dueDate || 'No dev.'}</span>
          </div>
        </div>

        <div className="flex gap-1.5 pt-1 border-t border-slate-50">
           <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
             <ArrowRight size={10} />
             <span>87</span>
           </div>
           <div className="flex items-center gap-1 text-[9px] font-bold text-indigo-400">
             <ArrowRight size={10} />
             <span>34</span>
           </div>
        </div>
      </div>
    </NodeWrapper>
  );
});

TaskNode.displayName = 'TaskNode';
