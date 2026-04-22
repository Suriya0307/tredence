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
      <div className="h-12 border-b border-[#FEF08A] bg-white flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#92400E]/40">
            <button className="p-1.5 rounded-md hover:bg-[#FEFCE8] transition-colors"><Undo2 size={15} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#FEFCE8] transition-colors"><Redo2 size={15} /></button>
          </div>
          <div className="w-px h-5 bg-slate-200" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1F2937] leading-tight">User Automation</span>
            <span className="text-[10px] text-[#92400E]/60 leading-tight">Overview of User Workflows.</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Edge Gradient Definition */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <linearGradient id="edge-gradient" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
          </svg>

          <button className="p-2 text-[#92400E]/40 hover:text-[#92400E] rounded-md hover:bg-[#FEFCE8] transition-colors">
            <Search size={15} />
          </button>
          <button className="p-2 text-[#92400E]/40 hover:text-[#92400E] rounded-md hover:bg-[#FEFCE8] transition-colors">
            <Bell size={15} />
          </button>
          <button className="p-2 text-[#92400E]/40 hover:text-[#92400E] rounded-md hover:bg-[#FEFCE8] transition-colors">
            <Settings size={15} />
          </button>
          <div className="w-px h-5 bg-slate-200" />
          <button 
            className="flex items-center gap-1.5 bg-white border border-[#FEF08A] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#92400E] hover:bg-[#FEFCE8] transition-colors shadow-sm"
            onClick={onExport}
          >
            <Download size={13} />
            Export
          </button>
          <button 
            className="flex items-center gap-1.5 bg-[#B45309] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#78350F] transition-colors shadow-sm shadow-amber-100/50 active:scale-95"
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
          className="bg-[#FFFDF0]"
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: { 
              stroke: '#F59E0B', 
              strokeWidth: 2.5,
              strokeOpacity: 0.8,
            },
          }}
        >
          <Background 
            variant="dots" 
            gap={24} 
            size={1} 
            color="#FEF08A" 
            style={{ opacity: 0.8 }}
          />
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
