import { useEffect, forwardRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';
import type { 
  WorkflowNode, 
  StartNodeData, 
  TaskNodeData, 
  ApprovalNodeData, 
  AutomatedStepNodeData, 
  EndNodeData 
} from '../../types/workflow';

// Validation Schemas
const startSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  startTitle: z.string().min(1, 'Start Trigger is required'),
  metadata: z.array(z.object({ key: z.string(), value: z.string() })),
});

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  assignee: z.string().min(1, 'Assignee is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  customFields: z.array(z.object({ key: z.string(), value: z.string() })),
});

const approvalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  approverRole: z.enum(['Manager', 'HRBP', 'Director']),
  autoApproveThreshold: z.number().min(0).max(100),
});

const automationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  actionId: z.string().min(1, 'Action is required'),
  actionParams: z.record(z.string(), z.string()),
});

const endSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  endMessage: z.string().min(1, 'Message is required'),
  showSummary: z.boolean(),
});

// Common Components
const FieldWrapper = ({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) => (
  <div className="mb-5">
    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
      {label}
    </label>
    {children}
    {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      {...props}
      ref={ref}
      className="w-full px-3 py-2 text-sm border border-[#FEF08A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDE68A]/30 focus:border-[#F59E0B] transition-all placeholder:text-[#9CA3AF] bg-[#FFFDF0]"
    />
  )
);
Input.displayName = 'Input';

const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ children, ...props }, ref) => (
    <select
      {...props}
      ref={ref}
      className="w-full px-3 py-2 text-sm border border-[#FEF08A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDE68A]/30 focus:border-[#F59E0B] transition-all bg-[#FFFDF0]"
    >
      {children}
    </select>
  )
);
Select.displayName = 'Select';

// Form Components
export const StartNodeForm = ({ selectedNode }: { selectedNode: WorkflowNode }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const data = selectedNode.data as StartNodeData;

  const { register, control, watch, formState: { errors } } = useForm({
    resolver: zodResolver(startSchema),
    defaultValues: {
      title: data.title,
      startTitle: data.startTitle,
      metadata: data.metadata || [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'metadata' });

  // Update store on change
  useEffect(() => {
    const subscription = watch((value) => {
      updateNodeData(selectedNode.id, value as any);
    });
    return () => subscription.unsubscribe();
  }, [watch, selectedNode.id, updateNodeData]);

  return (
    <div className="space-y-4">
      <FieldWrapper label="Display Title" error={errors.title?.message}>
        <Input {...register('title')} placeholder="e.g. Employee Onboarding" />
      </FieldWrapper>
      <FieldWrapper label="Trigger Event" error={errors.startTitle?.message}>
        <Input {...register('startTitle')} placeholder="e.g. New Hire Signed Offer" />
      </FieldWrapper>
      
      <div className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Metadata</label>
          <button 
            onClick={() => append({ key: '', value: '' })}
            className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline"
          >
            <Plus size={14} /> Add Row
          </button>
        </div>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Input {...register(`metadata.${index}.key`)} placeholder="Key" />
              <Input {...register(`metadata.${index}.value`)} placeholder="Value" />
              <button 
                onClick={() => remove(index)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TaskNodeForm = ({ selectedNode }: { selectedNode: WorkflowNode }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const data = selectedNode.data as TaskNodeData;

  const { register, watch, control, formState: { errors } } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      assignee: data.assignee,
      dueDate: data.dueDate,
      customFields: data.customFields || [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'customFields' });

  useEffect(() => {
    const subscription = watch((value) => updateNodeData(selectedNode.id, value as any));
    return () => subscription.unsubscribe();
  }, [watch, selectedNode.id, updateNodeData]);

  return (
    <div className="space-y-4">
      <FieldWrapper label="Title" error={errors.title?.message}>
        <Input {...register('title')} />
      </FieldWrapper>
      <FieldWrapper label="Description" error={errors.description?.message}>
        <textarea 
          {...register('description')} 
          className="w-full px-3 py-2 text-sm border border-[#FEF08A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDE68A]/30 focus:border-[#F59E0B] transition-all min-h-[80px] bg-[#FFFDF0]"
        />
      </FieldWrapper>
      <div className="grid grid-cols-2 gap-4">
        <FieldWrapper label="Assignee" error={errors.assignee?.message}>
          <Input {...register('assignee')} placeholder="Email or Name" />
        </FieldWrapper>
        <FieldWrapper label="Due Date" error={errors.dueDate?.message}>
          <Input type="date" {...register('dueDate')} />
        </FieldWrapper>
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Custom Fields</label>
          <button onClick={() => append({ key: '', value: '' })} className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline">
            <Plus size={14} /> Add Field
          </button>
        </div>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Input {...register(`customFields.${index}.key`)} placeholder="Name" />
              <Input {...register(`customFields.${index}.value`)} placeholder="Value" />
              <button onClick={() => remove(index)} className="p-2 text-gray-400 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ApprovalNodeForm = ({ selectedNode }: { selectedNode: WorkflowNode }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const data = selectedNode.data as ApprovalNodeData;

  const { register, watch, formState: { errors } } = useForm({
    resolver: zodResolver(approvalSchema),
    defaultValues: {
      title: data.title,
      approverRole: data.approverRole,
      autoApproveThreshold: data.autoApproveThreshold,
    },
  });

  useEffect(() => {
    const subscription = watch((value) => updateNodeData(selectedNode.id, value as any));
    return () => subscription.unsubscribe();
  }, [watch, selectedNode.id, updateNodeData]);

  return (
    <div className="space-y-4">
      <FieldWrapper label="Title" error={errors.title?.message}>
        <Input {...register('title')} />
      </FieldWrapper>
      <FieldWrapper label="Approver Role" error={errors.approverRole?.message}>
        <Select {...register('approverRole')}>
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
        </Select>
      </FieldWrapper>
      <FieldWrapper label="Auto-Approve Threshold (%)" error={errors.autoApproveThreshold?.message}>
        <div className="flex items-center gap-3">
          <input 
            type="range" 
            {...register('autoApproveThreshold', { valueAsNumber: true })} 
            className="flex-1 h-1.5 bg-[#FEF08A] rounded-lg appearance-none cursor-pointer accent-[#B45309] hover:shadow-[0_0_8px_rgba(245,158,11,0.4)] transition-shadow"
          />
          <span className="text-sm font-bold text-amber-600 w-8">{watch('autoApproveThreshold')}%</span>
        </div>
        <p className="text-[10px] text-gray-400 mt-2">Skip manual approval if score is above this value</p>
      </FieldWrapper>
    </div>
  );
};

export const AutomatedStepNodeForm = ({ selectedNode }: { selectedNode: WorkflowNode }) => {
  const { updateNodeData, automations } = useWorkflowStore();
  const data = selectedNode.data as AutomatedStepNodeData;

  const { register, watch, formState: { errors } } = useForm({
    resolver: zodResolver(automationSchema),
    defaultValues: {
      title: data.title,
      actionId: data.actionId,
      actionParams: data.actionParams || {},
    },
  });

  const selectedActionId = watch('actionId');
  const selectedAction = automations.find(a => a.id === selectedActionId);

  useEffect(() => {
    const subscription = watch((value) => updateNodeData(selectedNode.id, value as any));
    return () => subscription.unsubscribe();
  }, [watch, selectedNode.id, updateNodeData]);

  return (
    <div className="space-y-4">
      <FieldWrapper label="Title" error={errors.title?.message}>
        <Input {...register('title')} />
      </FieldWrapper>
      <FieldWrapper label="Select Automation" error={errors.actionId?.message}>
        <Select {...register('actionId')}>
          <option value="">Choose an action...</option>
          {automations.map(a => (
            <option key={a.id} value={a.id}>{a.label}</option>
          ))}
        </Select>
      </FieldWrapper>

      {selectedAction && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Action Parameters</h4>
          <div className="space-y-4" key={selectedActionId}>
            {selectedAction.params.map(param => (
              <FieldWrapper key={param} label={param}>
                <Input 
                  {...register(`actionParams.${param}`)} 
                  placeholder={`Enter ${param}...`}
                />
              </FieldWrapper>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const EndNodeForm = ({ selectedNode }: { selectedNode: WorkflowNode }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const data = selectedNode.data as EndNodeData;

  const { register, watch, formState: { errors } } = useForm({
    resolver: zodResolver(endSchema),
    defaultValues: {
      title: data.title,
      endMessage: data.endMessage,
      showSummary: data.showSummary,
    },
  });

  useEffect(() => {
    const subscription = watch((value) => updateNodeData(selectedNode.id, value as any));
    return () => subscription.unsubscribe();
  }, [watch, selectedNode.id, updateNodeData]);

  return (
    <div className="space-y-4">
      <FieldWrapper label="Title" error={errors.title?.message}>
        <Input {...register('title')} />
      </FieldWrapper>
      <FieldWrapper label="Completion Message" error={errors.endMessage?.message}>
        <textarea 
          {...register('endMessage')} 
          className="w-full px-3 py-2 text-sm border border-[#FEF08A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDE68A]/30 focus:border-[#F59E0B] transition-all min-h-[80px] bg-[#FFFDF0]"
        />
      </FieldWrapper>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
        <label className="text-sm font-medium text-gray-700">Show Summary</label>
        <input 
          type="checkbox" 
          {...register('showSummary')} 
          className="w-4 h-4 text-[#B45309] rounded focus:ring-[#FDE68A] accent-[#B45309]"
        />
      </div>
    </div>
  );
};
