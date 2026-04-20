import { http, HttpResponse, delay } from 'msw';
import type { SimulationResult } from '../types/workflow';

const automations = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject', 'body'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'slack_notify', label: 'Slack Notification', params: ['channel', 'message'] },
  { id: 'update_hris', label: 'Update HRIS Record', params: ['employeeId', 'field', 'value'] }
];

export const handlers = [
  http.get('/api/automations', () => {
    return HttpResponse.json(automations);
  }),

  http.post('/api/simulate', async ({ request }) => {
    try {
      const body = await request.json() as { nodes: any[]; edges: any[] };
      const nodes = body.nodes || [];
      
      await delay(600);

      const hasStart = nodes.some((n: any) => n?.type === 'StartNode' || n?.data?.type === 'StartNode');
      const hasEnd = nodes.some((n: any) => n?.type === 'EndNode' || n?.data?.type === 'EndNode');

      if (!hasStart || !hasEnd) {
        return HttpResponse.json(
          { success: false, error: 'Invalid workflow structure. Must have at least one Start and one End node.' },
          { status: 400 }
        );
      }

      const result: SimulationResult = {
        success: true,
        summary: `Workflow completed in ${nodes.length} steps`,
        steps: nodes.map((node: any, index: number) => ({
          nodeId: node?.id || `node-${index}`,
          nodeType: node?.type || node?.data?.type || 'TaskNode',
          title: node?.data?.title || 'Untitled Step',
          status: 'completed' as const,
          message: index === 0 ? 'Workflow started' : `Executed ${(node?.type || '').replace('Node', '')} step`,
          timestamp: new Date(Date.now() + index * 1000).toISOString(),
        })),
      };

      return HttpResponse.json(result);
    } catch (error) {
      return HttpResponse.json(
        { success: false, error: 'Simulation engine encountered a processing error.' },
        { status: 500 }
      );
    }
  }),
];
