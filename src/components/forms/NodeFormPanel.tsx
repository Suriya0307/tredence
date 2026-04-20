import { useWorkflowStore } from '../../store/workflowStore';
import { 
  StartNodeForm,
  TaskNodeForm,
  ApprovalNodeForm,
  AutomatedStepNodeForm,
  EndNodeForm
} from './NodeForms';
import { X, Trash2 } from 'lucide-react';

export const NodeFormPanel = () => {
  const { nodes, selectedNodeId, selectNode, deleteNode } = useWorkflowStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) return null;

  const renderForm = () => {
    switch (selectedNode.data.type) {
      case 'StartNode':
        return <StartNodeForm key={selectedNode.id} selectedNode={selectedNode} />;
      case 'TaskNode':
        return <TaskNodeForm key={selectedNode.id} selectedNode={selectedNode} />;
      case 'ApprovalNode':
        return <ApprovalNodeForm key={selectedNode.id} selectedNode={selectedNode} />;
      case 'AutomatedStepNode':
        return <AutomatedStepNodeForm key={selectedNode.id} selectedNode={selectedNode} />;
      case 'EndNode':
        return <EndNodeForm key={selectedNode.id} selectedNode={selectedNode} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-[340px] border-l border-slate-100 bg-white h-full flex flex-col z-20 shrink-0 shadow-[-4px_0_20px_rgba(0,0,0,0.03)]">
      {/* Panel Header */}
      <div className="h-12 border-b border-slate-100 flex items-center justify-between px-4 shrink-0">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-800">Performance Overview</span>
          <span className="text-[9px] text-slate-400">Overview Performance Time</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => deleteNode(selectedNode.id)}
            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
            title="Delete Node"
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={() => selectNode(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Node ID chip */}
      <div className="px-4 pt-4 pb-2">
        <div className="text-[10px] text-slate-400 font-mono bg-slate-50 border border-slate-100 rounded-md px-2 py-1 inline-block">
          {selectedNode.id}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {renderForm()}
      </div>
    </div>
  );
};
