import { useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { validateWorkflow, topologicalSort } from '../../lib/validation';
import type { SimulationResult } from '../../types/workflow';
import { 
  X, 
  Play, 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  Check, 
  ClipboardList,
  CheckSquare,
  Zap,
  Flag,
  PlayCircle
} from 'lucide-react';
import { clsx } from 'clsx';

interface SimulationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulationPanel = ({ isOpen, onClose }: SimulationPanelProps) => {
  const { nodes, edges } = useWorkflowStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ nodeId?: string; message: string }[]>([]);

  const runSimulation = async () => {
    setResult(null);
    const errors = validateWorkflow(nodes, edges);
    setValidationErrors(errors);

    if (errors.length > 0) return;

    setLoading(true);
    try {
      // We sort the nodes based on the graph structure for a more realistic simulation
      const sortedIds = topologicalSort(nodes, edges);
      const sortedNodes = sortedIds 
        ? sortedIds.map(id => nodes.find(n => n.id === id)).filter(Boolean)
        : nodes;

      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: sortedNodes, edges }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned a non-JSON response. MSW might not be initialized or is failing.');
      }

      const data = await response.json();
      if (!response.ok) {
        setResult({ success: false, error: data.error || 'Server returned an error' });
        return;
      }
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setResult({ success: false, error: `Simulation failed: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[450px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <PlayCircle size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Workflow Simulator</h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Validation & Execution</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {!result && !loading && validationErrors.length === 0 && (
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play size={24} fill="currentColor" />
            </div>
            <h3 className="font-bold text-blue-900 mb-2">Ready to Test?</h3>
            <p className="text-sm text-blue-700/70 mb-6">
              This will validate your graph structure and simulate a step-by-step execution to ensure logic is sound.
            </p>
            <button 
              onClick={runSimulation}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
            >
              Start Simulation
            </button>
          </div>
        )}

        {validationErrors.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-bold px-1">
              <AlertTriangle size={18} />
              <span>Fix connection issues</span>
            </div>
            <div className="space-y-2">
              {validationErrors.map((error, idx) => (
                <div key={idx} className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 items-start">
                  <div className="mt-0.5 text-red-500">
                    <Circle size={8} fill="currentColor" />
                  </div>
                  <div className="text-sm text-red-800 leading-relaxed">
                    {error.message}
                    {error.nodeId && <span className="block mt-1 text-[10px] text-red-400 font-mono">ID: {error.nodeId}</span>}
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={runSimulation}
              className="w-full mt-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
            >
              Re-run Validation
            </button>
          </div>
        )}

        {loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-center p-12">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Executing Workflow...</p>
              <p className="text-xs text-gray-500 mt-1">Calling simulation API</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className={clsx(
              "p-4 rounded-xl border flex items-center justify-between",
              result.success ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
            )}>
              <div>
                <h4 className={clsx("font-bold text-sm", result.success ? "text-green-900" : "text-red-900")}>
                  {result.success ? 'Success!' : 'Simulation Failed'}
                </h4>
                <p className={clsx("text-xs mt-0.5", result.success ? "text-green-700/70" : "text-red-700/70")}>
                  {result.summary || result.error}
                </p>
              </div>
              {result.success ? (
                <CheckCircle2 size={24} className="text-green-500" />
              ) : (
                <AlertTriangle size={24} className="text-red-500" />
              )}
            </div>

            {result.steps && (
              <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                {result.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={clsx(
                      "absolute -left-[22px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center z-10",
                      step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                    )}>
                      {step.status === 'completed' && <Check size={10} className="text-white" />}
                    </div>
                    
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:border-blue-200 transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={clsx(
                            "p-1.5 rounded-md text-white shadow-sm",
                            step.nodeType === 'StartNode' ? 'bg-green-500' :
                            step.nodeType === 'TaskNode' ? 'bg-blue-500' :
                            step.nodeType === 'ApprovalNode' ? 'bg-amber-500' :
                            step.nodeType === 'AutomatedStepNode' ? 'bg-purple-500' : 'bg-red-500'
                          )}>
                            {step.nodeType === 'StartNode' && <PlayCircle size={14} />}
                            {step.nodeType === 'TaskNode' && <ClipboardList size={14} />}
                            {step.nodeType === 'ApprovalNode' && <CheckSquare size={14} />}
                            {step.nodeType === 'AutomatedStepNode' && <Zap size={14} />}
                            {step.nodeType === 'EndNode' && <Flag size={14} />}
                          </span>
                          <span className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {step.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">
                          {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed italic">
                        {step.message}
                      </p>
                      <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-50">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                          {step.nodeType.replace('Node', '')}
                        </span>
                        <div className="flex items-center gap-1 text-[9px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          <Check size={8} />
                          <span>COMPLETED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button 
              onClick={() => setResult(null)}
              className="w-full border border-gray-200 text-gray-600 py-3 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
            >
              Reset Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
