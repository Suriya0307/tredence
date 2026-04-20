import type { Node, Edge } from '@xyflow/react';

export type NodeType = 'StartNode' | 'TaskNode' | 'ApprovalNode' | 'AutomatedStepNode' | 'EndNode';

export interface BaseNodeData {
  title: string;
  type: NodeType;
  isValid?: boolean;
  [key: string]: any; // To satisfy Record<string, unknown>
}

export interface StartNodeData extends BaseNodeData {
  type: 'StartNode';
  startTitle: string;
  metadata: { key: string; value: string }[];
}

export interface TaskNodeData extends BaseNodeData {
  type: 'TaskNode';
  description: string;
  assignee: string;
  dueDate: string;
  customFields: { key: string; value: string }[];
}

export interface ApprovalNodeData extends BaseNodeData {
  type: 'ApprovalNode';
  approverRole: 'Manager' | 'HRBP' | 'Director';
  autoApproveThreshold: number;
}

export interface AutomatedStepNodeData extends BaseNodeData {
  type: 'AutomatedStepNode';
  actionId: string;
  actionParams: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  type: 'EndNode';
  endMessage: string;
  showSummary: boolean;
}

export type WorkflowNodeData = 
  | StartNodeData 
  | TaskNodeData 
  | ApprovalNodeData 
  | AutomatedStepNodeData 
  | EndNodeData;

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

export interface Automation {
  id: string;
  label: string;
  params: string[];
}

export interface SimulationStep {
  nodeId: string;
  nodeType: NodeType;
  title: string;
  status: 'completed' | 'skipped' | 'failed' | 'pending';
  message: string;
  timestamp: string;
}

export interface SimulationResult {
  success: boolean;
  steps?: SimulationStep[];
  error?: string;
  summary?: string;
}
