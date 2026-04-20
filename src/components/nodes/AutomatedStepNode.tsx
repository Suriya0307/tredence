import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Zap, Settings, Activity } from 'lucide-react';
import { NodeWrapper } from './NodeWrapper';
import type { AutomatedStepNodeData } from '../../types/workflow';
import { useWorkflowStore } from '../../store/workflowStore';

export const AutomatedStepNode = memo((props: NodeProps) => {
  const data = props.data as AutomatedStepNodeData;
  const automations = useWorkflowStore((state) => state.automations);
  const selectedAutomation = automations.find(a => a.id === data.actionId);

  return (
    <NodeWrapper 
      {...props} 
      data={data} 
      icon={<Zap size={14} fill="currentColor" />} 
      accentColor="bg-indigo-50 text-indigo-600 border-indigo-100"
    >
      <div className="space-y-3">
        <p className="text-[11px] text-slate-500 leading-snug">
          Performing Tasks Conditions
        </p>
        <div className="flex items-center gap-2 bg-indigo-50/60 border border-indigo-100 px-2.5 py-1.5 rounded-lg">
          <Settings size={12} className="text-indigo-400" />
          <span className="text-[11px] font-bold text-indigo-700 truncate">
            {selectedAutomation?.label || 'Select Action...'}
          </span>
        </div>
        
        <div className="flex gap-1.5 pt-1 border-t border-slate-50">
          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
            <Activity size={10} />
            <span>87</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-bold text-rose-400">
            <Activity size={10} />
            <span>34</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-bold text-amber-400">
            <Activity size={10} />
            <span>17</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-400">
            <Activity size={10} />
            <span>18</span>
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
});

AutomatedStepNode.displayName = 'AutomatedStepNode';
