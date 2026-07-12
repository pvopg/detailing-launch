import type { ComponentType } from 'react';

import type { Json } from '@/libs/supabase/types';

import { MessageLibrary } from '../components/message-library';
import { PricingCalculator } from '../components/pricing-calculator';
import { ServiceBuilder } from '../components/service-builder';
import { SoftwareFinder } from '../components/software-finder';
import { WorkflowPlanner } from '../components/workflow-planner';

/**
 * Registry of authored Business Systems tools, keyed by module slug. A tool page renders
 * `getTool(slug)` (passing the loaded `portal_module_state` blob); slugs without an entry here
 * fall back to the "being built" scaffold. Adding a tool = adding one entry.
 */
export interface ToolProps {
  moduleKey: string;
  initialState: Json | null;
}

const TOOL_REGISTRY: Record<string, ComponentType<ToolProps>> = {
  'service-builder': ServiceBuilder,
  'pricing-calculator': PricingCalculator,
  'workflow-planner': WorkflowPlanner,
  'message-library': MessageLibrary,
  'software-finder': SoftwareFinder,
};

export function getTool(slug: string): ComponentType<ToolProps> | undefined {
  return TOOL_REGISTRY[slug];
}
