import { create } from 'zustand';
import { 
  addEdge, 
  applyNodeChanges, 
  applyEdgeChanges,
} from '@xyflow/react';
import type { 
  Connection, 
  EdgeChange, 
  NodeChange,
  OnConnect,
  OnNodesChange,
  OnEdgesChange,
  XYPosition
} from '@xyflow/react';
import type { WorkflowNode, WorkflowEdge, NodeType, WorkflowNodeData, Automation } from '../types/workflow';
import { nanoid } from 'nanoid';

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  automations: Automation[];
  currentView: string;
  
  // Actions
  setCurrentView: (view: string) => void;
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
  onNodesChange: OnNodesChange<WorkflowNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  
  selectNode: (id: string | null) => void;
  addNode: (type: NodeType, position: XYPosition) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
  deleteNode: (id: string) => void;
  setAutomations: (automations: Automation[]) => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  automations: [],
  currentView: 'Workflows',

  setCurrentView: (view) => set({ currentView: view }),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as WorkflowNode[],
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges) as WorkflowEdge[],
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges) as WorkflowEdge[],
    });
  },

  selectNode: (id) => set({ selectedNodeId: id }),

  addNode: (type, position) => {
    const id = `${type.toLowerCase()}-${nanoid(6)}`;
    let data: WorkflowNodeData;

    switch (type) {
      case 'StartNode':
        data = { type, title: 'Start Workflow', startTitle: 'New Workflow', metadata: [] };
        break;
      case 'TaskNode':
        data = { type, title: 'New Task', description: '', assignee: '', dueDate: '', customFields: [] };
        break;
      case 'ApprovalNode':
        data = { type, title: 'Approval Step', approverRole: 'Manager', autoApproveThreshold: 0 };
        break;
      case 'AutomatedStepNode':
        data = { type, title: 'Automated Action', actionId: '', actionParams: {} };
        break;
      case 'EndNode':
        data = { type, title: 'End Workflow', endMessage: 'Workflow Completed', showSummary: true };
        break;
      default:
        return;
    }

    const newNode: WorkflowNode = {
      id,
      type,
      position,
      data,
    };

    set({ nodes: [...get().nodes, newNode] });
  },

  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...data } } as WorkflowNode;
        }
        return node;
      }),
    });
  },

  deleteNode: (id) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
  },

  setAutomations: (automations) => set({ automations }),
}));
