'use client';

import { IoAddOutline, IoArrowDownOutline, IoTrashOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import type { Json } from '@/libs/supabase/types';

import { useModuleState } from '../hooks/use-module-state';
import { getPortalModule } from '../portal-navigation';
import { createWorkflowStage, createWorkflowTouchpoint, normalizeWorkflowState } from '../tools/normalize';
import type { WorkflowPlannerState, WorkflowStage, WorkflowTouchpoint } from '../tools/types';

import { Field, TextInput } from './tool-fields';
import { ToolShell } from './tool-shell';

export function WorkflowPlanner({ moduleKey, initialState }: { moduleKey: string; initialState: Json | null }) {
  const portalModule = getPortalModule(moduleKey);
  const { state, setState, status, reset } = useModuleState<WorkflowPlannerState>(
    moduleKey,
    normalizeWorkflowState(initialState),
    () => normalizeWorkflowState(null)
  );

  function addStage() {
    setState((prev) => ({ stages: [...prev.stages, createWorkflowStage()] }));
  }

  function updateStage(id: string, patch: Partial<WorkflowStage>) {
    setState((prev) => ({
      stages: prev.stages.map((stage) => (stage.id === id ? { ...stage, ...patch } : stage)),
    }));
  }

  function removeStage(id: string) {
    setState((prev) => ({ stages: prev.stages.filter((stage) => stage.id !== id) }));
  }

  function updateTouchpoints(stageId: string, touchpoints: WorkflowTouchpoint[]) {
    updateStage(stageId, { touchpoints });
  }

  return (
    <ToolShell
      title={portalModule?.title ?? 'Customer-workflow planner'}
      description={portalModule?.description ?? ''}
      status={status}
      onReset={reset}
    >
      {state.stages.length === 0 ? (
        <EmptyState onCreate={addStage} />
      ) : (
        <div className='flex flex-col gap-4'>
          {state.stages.map((stage, index) => (
            <div key={stage.id} className='flex flex-col gap-4'>
              <StageCard
                stage={stage}
                index={index}
                onChange={(patch) => updateStage(stage.id, patch)}
                onRemove={() => removeStage(stage.id)}
                onTouchpointsChange={(touchpoints) => updateTouchpoints(stage.id, touchpoints)}
              />
              {index < state.stages.length - 1 && (
                <div className='flex justify-center text-muted-foreground' aria-hidden>
                  <IoArrowDownOutline />
                </div>
              )}
            </div>
          ))}
          <Button variant='secondary' className='w-fit' onClick={addStage}>
            <IoAddOutline /> Add stage
          </Button>
        </div>
      )}
    </ToolShell>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className='flex flex-col items-start gap-4 rounded-lg border border-dashed border-border bg-card p-8'>
      <div className='flex flex-col gap-1'>
        <h3 className='text-lg'>Map your customer journey</h3>
        <p className='text-muted-foreground'>
          Lay out the path from first inquiry to a five-star review, and the exact touch point at each stage. Seeing
          the gaps is how you stop losing customers between the texts.
        </p>
      </div>
      <Button variant='brand' onClick={onCreate}>
        <IoAddOutline /> Add your first stage
      </Button>
    </div>
  );
}

function StageCard({
  stage,
  index,
  onChange,
  onRemove,
  onTouchpointsChange,
}: {
  stage: WorkflowStage;
  index: number;
  onChange: (patch: Partial<WorkflowStage>) => void;
  onRemove: () => void;
  onTouchpointsChange: (touchpoints: WorkflowTouchpoint[]) => void;
}) {
  return (
    <div className='flex flex-col gap-5 rounded-lg border border-border bg-card p-6 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex flex-1 items-start gap-3'>
          <span className='mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600'>
            {index + 1}
          </span>
          <div className='flex flex-1 flex-col gap-4'>
            <Field label='Stage' htmlFor={`stage-name-${stage.id}`}>
              <TextInput
                id={`stage-name-${stage.id}`}
                value={stage.name}
                onValueChange={(name) => onChange({ name })}
                placeholder='e.g. New inquiry'
              />
            </Field>
            <Field label='Goal of this stage' htmlFor={`stage-goal-${stage.id}`}>
              <TextInput
                id={`stage-goal-${stage.id}`}
                value={stage.goal}
                onValueChange={(goal) => onChange({ goal })}
                placeholder='What “done” looks like here'
              />
            </Field>
          </div>
        </div>
        <button
          type='button'
          onClick={onRemove}
          aria-label='Delete stage'
          className='mt-1 text-muted-foreground transition-colors hover:text-destructive'
        >
          <IoTrashOutline />
        </button>
      </div>

      <TouchpointsEditor stageId={stage.id} touchpoints={stage.touchpoints} onChange={onTouchpointsChange} />
    </div>
  );
}

function TouchpointsEditor({
  stageId,
  touchpoints,
  onChange,
}: {
  stageId: string;
  touchpoints: WorkflowTouchpoint[];
  onChange: (touchpoints: WorkflowTouchpoint[]) => void;
}) {
  function addTouchpoint() {
    onChange([...touchpoints, createWorkflowTouchpoint()]);
  }

  function updateTouchpoint(id: string, patch: Partial<WorkflowTouchpoint>) {
    onChange(touchpoints.map((tp) => (tp.id === id ? { ...tp, ...patch } : tp)));
  }

  function removeTouchpoint(id: string) {
    onChange(touchpoints.filter((tp) => tp.id !== id));
  }

  return (
    <div className='flex flex-col gap-3 border-t border-border pt-4'>
      <span className='label text-foreground'>Touch points</span>
      {touchpoints.length === 0 && (
        <p className='text-sm text-muted-foreground'>No touch points yet — add what you do to move a customer forward.</p>
      )}
      <div className='flex flex-col gap-2'>
        {touchpoints.map((tp) => (
          <div key={tp.id} className='grid gap-2 sm:grid-cols-[8rem,1fr,9rem,auto] sm:items-center'>
            <TextInput
              value={tp.channel}
              onValueChange={(channel) => updateTouchpoint(tp.id, { channel })}
              placeholder='Channel'
            />
            <TextInput
              value={tp.action}
              onValueChange={(action) => updateTouchpoint(tp.id, { action })}
              placeholder='What you do or say'
            />
            <TextInput
              value={tp.timing}
              onValueChange={(timing) => updateTouchpoint(tp.id, { timing })}
              placeholder='When'
            />
            <button
              type='button'
              onClick={() => removeTouchpoint(tp.id)}
              aria-label='Remove touch point'
              className='justify-self-start text-muted-foreground transition-colors hover:text-destructive sm:justify-self-center'
            >
              <IoTrashOutline />
            </button>
          </div>
        ))}
      </div>
      <Button type='button' variant='outline' size='sm' className='w-fit' onClick={addTouchpoint}>
        <IoAddOutline /> Add touch point
      </Button>
      <span className='sr-only'>Touch points for stage {stageId}</span>
    </div>
  );
}
