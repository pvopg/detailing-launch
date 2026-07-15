import { landingContent, type LandingPageContent } from './content';

/**
 * Launch-blocking content checks for the public landing page.
 *
 * Unresolved commercial/legal decisions must not silently ship as approved promises. This runs on
 * the server when the landing page renders and logs a loud warning for each violation so the gap is
 * visible in build/server logs and pre-launch review. It intentionally warns rather than throwing —
 * the page must still render for development — but the warnings are the launch gate.
 */
export interface LaunchIssue {
  code: string;
  message: string;
}

export function getLaunchIssues(content: LandingPageContent = landingContent): LaunchIssue[] {
  const issues: LaunchIssue[] = [];

  // Refund policy: approved copy must exist before it can be presented as final anywhere.
  if (content.refundPolicyApproved && !content.refundPolicyFaq?.trim()) {
    issues.push({
      code: 'refund-approved-without-copy',
      message: 'refundPolicyApproved is true but refundPolicyFaq is empty. Provide the approved wording.',
    });
  }
  if (!content.refundPolicyApproved) {
    issues.push({
      code: 'refund-not-approved',
      message:
        'Refund policy is not approved. The FAQ shows a safe placeholder; final wording is required before launch.',
    });
  }

  // Consultation credit must stay disabled until the $25 credit decision is resolved with copy.
  if (content.consultation.creditEnabled && !content.consultation.creditCopy?.trim()) {
    issues.push({
      code: 'consultation-credit-without-copy',
      message: 'consultation.creditEnabled is true but creditCopy is missing. Do not advertise an unresolved credit.',
    });
  }

  // Legal links may only be marked available once the destination actually resolves.
  for (const link of content.footer.legal) {
    if (link.available && !link.href.trim()) {
      issues.push({ code: 'legal-link-available-without-href', message: `Legal link "${link.label}" is available but has no href.` });
    }
  }

  return issues;
}

/** Logs launch issues to the server console. Call once where the landing page renders. */
export function reportLaunchIssues(content: LandingPageContent = landingContent): void {
  const issues = getLaunchIssues(content);
  if (issues.length === 0) return;
  for (const issue of issues) {
    console.warn(`[landing:launch-check] ${issue.code}: ${issue.message}`);
  }
}
