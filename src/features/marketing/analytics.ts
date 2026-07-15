'use client';

/**
 * Vendor-neutral analytics hooks for the landing page.
 *
 * Task 15 owns the real analytics implementation. This exposes stable event names without coupling
 * to any vendor: each call pushes to `window.dataLayer` (if a tag manager is present) and dispatches
 * a DOM `CustomEvent` that a future integration can listen for. With no listener attached it is a
 * safe no-op.
 *
 * PRIVACY: never pass email addresses, entitlement details, tool state, or any account data here —
 * only the event name and non-identifying placement metadata (section, tier, position).
 */

export type LandingEvent =
  | 'landing_view'
  | 'landing_primary_cta_click'
  | 'portal_preview_view'
  | 'pricing_foundation_click'
  | 'pricing_business_systems_click'
  | 'tier_comparison_view'
  | 'faq_open'
  | 'consultation_cta_click'
  | 'final_cta_click';

type EventMeta = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: LandingEvent, meta: EventMeta = {}): void {
  if (typeof window === 'undefined') return;

  const payload = { event, ...meta };

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
    window.dispatchEvent(new CustomEvent('landing:analytics', { detail: payload }));
  } catch {
    // Analytics must never break the page.
  }
}
