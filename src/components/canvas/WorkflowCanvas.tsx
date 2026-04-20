import { useCallback, useRef } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  ReactFlowProvider,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useWorkflowStore } from '../../store/workflowStore';
import { StartNode } from '../nodes/StartNode';
import { TaskNode } from '../nodes/TaskNode';
import { ApprovalNode } from '../nodes/ApprovalNode';
import { AutomatedStepNode } from '../nodes/AutomatedStepNode';
import { EndNode } from '../nodes/EndNode';
import type { NodeType } from '../../types/workflow';
import { Download, PlayCircle, Undo2, Redo2, Search, Bell, Settings } from 'lucide-react';

const nodeTypes = {
  StartNode,
  TaskNode,
  ApprovalNode,
  AutomatedStepNode,
  EndNode,
};

const WorkflowCanvasInner = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    selectNode,
  } = useWorkflowStore();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [screenToFlowPosition, addNode]
  );

  const onSelectionChange = useCallback(({ nodes: selectedNodes }: { nodes: any[] }) => {
    if (selectedNodes.length > 0) {
      selectNode(selectedNodes[0].id);
    } else {
      selectNode(null);
    }
  }, [selectNode]);

  const onExport = () => {
    const data = { nodes, edges };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hr-workflow.json';
    link.click();
  };

  return (
    <div className="flex-1 h-full relative flex flex-col" ref={reactFlowWrapper}>
      {/* Top Toolbar — mimics reference header */}
      <div className="h-12 border-b border-slate-100 bg-white flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400">
            <button className="p-1.5 rounded-md hover:bg-slate-50 transition-colors"><Undo2 size={15} /></button>
            <button className="p-1.5 rounded-md hover:bg-slate-50 transition-colors"><Redo2 size={15} /></button>
          </div>
          <div className="w-px h-5 bg-slate-200" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800 leading-tight">User Automation</span>
            <span className="text-[10px] text-slate-400 leading-tight">Overview of User Workflows.</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 transition-colors">
            <Search size={15} />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 transition-colors">
            <Bell size={15} />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 transition-colors">
            <Settings size={15} />
          </button>
          <div className="w-px h-5 bg-slate-200" />
          <button 
            className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            onClick={onExport}
          >
            <Download size={13} />
            Export
          </button>
          <button 
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 active:scale-95"
            id="test-workflow-btn"
          >
            <PlayCircle size={13} />
            Test Workflow
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onSelectionChange={onSelectionChange}
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-50/50"
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#cbd5e1', strokeWidth: 1.5 },
          }}
        >
          <Background gap={24} color="#e2e8f0" size={1} />
          <Controls 
            position="bottom-left" 
            showInteractive={false}
          />
          <MiniMap 
            zoomable 
            pannable 
            position="bottom-right" 
            nodeStrokeWidth={3}
            maskColor="rgba(241, 245, 249, 0.7)"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export const WorkflowCanvas = () => (
  <ReactFlowProvider>
    <WorkflowCanvasInner />
  </ReactFlowProvider>
);
