import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

export interface ValidationError {
  nodeId?: string;
  message: string;
}

export function validateWorkflow(nodes: WorkflowNode[], edges: WorkflowEdge[]): ValidationError[] {
  const errors: ValidationError[] = [];

  if (nodes.length === 0) {
    errors.push({ message: 'Workflow is empty. Add at least a Start and End node.' });
    return errors;
  }

  // Must have exactly one StartNode
  const startNodes = nodes.filter(n => n.data.type === 'StartNode');
  if (startNodes.length === 0) {
    errors.push({ message: 'Workflow must have exactly one Start node.' });
  } else if (startNodes.length > 1) {
    startNodes.slice(1).forEach(n => errors.push({ nodeId: n.id, message: `Duplicate Start node: ${n.data.title}` }));
  }

  // Must have at least one EndNode
  const endNodes = nodes.filter(n => n.data.type === 'EndNode');
  if (endNodes.length === 0) {
    errors.push({ message: 'Workflow must have at least one End node.' });
  }

  // StartNode must have at least one outgoing edge
  if (startNodes.length === 1) {
    const startId = startNodes[0].id;
    const outgoing = edges.filter(e => e.source === startId);
    if (outgoing.length === 0) {
      errors.push({ nodeId: startId, message: 'Start node must have at least one outgoing connection.' });
    }
  }

  // No disconnected nodes (every non-start node needs an incoming edge,
  // every non-end node needs an outgoing edge)
  const hasIncoming = new Set(edges.map(e => e.target));
  const hasOutgoing = new Set(edges.map(e => e.source));

  nodes.forEach(node => {
    if (node.data.type !== 'StartNode' && !hasIncoming.has(node.id)) {
      errors.push({ nodeId: node.id, message: `Node "${node.data.title}" has no incoming connections.` });
    }
    if (node.data.type !== 'EndNode' && !hasOutgoing.has(node.id)) {
      errors.push({ nodeId: node.id, message: `Node "${node.data.title}" has no outgoing connections.` });
    }
  });

  // Cycle detection via DFS
  const adjacency: Record<string, string[]> = {};
  nodes.forEach(n => { adjacency[n.id] = []; });
  edges.forEach(e => {
    if (adjacency[e.source]) {
      adjacency[e.source].push(e.target);
    }
  });

  const visited = new Set<string>();
  const recStack = new Set<string>();

  function hasCycleDFS(nodeId: string): boolean {
    visited.add(nodeId);
    recStack.add(nodeId);

    for (const neighbor of (adjacency[nodeId] || [])) {
      if (!visited.has(neighbor)) {
        if (hasCycleDFS(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (hasCycleDFS(node.id)) {
        errors.push({ message: 'Workflow contains a cycle. Remove circular connections.' });
        break;
      }
    }
  }

  return errors;
}

/**
 * Topological sort using Kahn's algorithm.
 * Returns ordered node IDs or null if the graph has a cycle.
 */
export function topologicalSort(nodes: WorkflowNode[], edges: WorkflowEdge[]): string[] | null {
  const inDegree: Record<string, number> = {};
  const adjacency: Record<string, string[]> = {};

  nodes.forEach(n => {
    inDegree[n.id] = 0;
    adjacency[n.id] = [];
  });

  edges.forEach(e => {
    if (adjacency[e.source]) {
      adjacency[e.source].push(e.target);
    }
    if (inDegree[e.target] !== undefined) {
      inDegree[e.target]++;
    }
  });

  const queue: string[] = [];
  for (const id in inDegree) {
    if (inDegree[id] === 0) queue.push(id);
  }

  const sorted: string[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    sorted.push(current);

    for (const neighbor of adjacency[current]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (sorted.length !== nodes.length) return null; // cycle detected
  return sorted;
}
