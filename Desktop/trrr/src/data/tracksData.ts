import type { BuildathonTrack } from '../types';

export const buildathonTracks: BuildathonTrack[] = [
  {
    id: 'track-01',
    number: '01',
    title: 'AI Growth & Agentic Commerce',
    tagline: "Grow the merchant's revenue, and make them sellable to AI buyers",
    description: 'Build an agent that grows revenue for a merchant on Razorpay test-mode APIs, or that makes a merchant transactable by an AI buyer end to end.',
    whyNow: "NPCI's UAP and the global protocol race (ACP, AP2, x402) make agent-to-agent commerce the open problem of the year, and Razorpay's in-app pilots are already live.",
    protocols: ['NPCI UAP (Unified Agent Protocol)', 'ACP (Agentic Commerce Protocol)', 'AP2 (Agent-to-Agent Payment standard)', 'x402 (HTTP Payment Required for AI Agents)'],
    theBar: 'Every money action explainable, bounded and gated. Show the audit trail and one failure handled gracefully.',
    exampleDirections: [
      'Conversational in-app checkout',
      'Agent-readable catalog',
      'Upsell & cross-sell agent',
      'Campaign orchestrator'
    ]
  },
  {
    id: 'track-02',
    number: '02',
    title: 'AI Risk Manager',
    tagline: 'Autonomous fraud detection and proactive risk mitigation for merchants',
    description: 'Build intelligent risk assessment agents that analyze velocity, chargebacks, payload anomalies, and identity trust scores before money changes hands.',
    whyNow: 'Synthetic AI fraud and automated bot attacks require sub-millisecond AI security agents operating at the payment layer.',
    protocols: ['3DS 2.0 AI Risk Signals', 'Behavioral Biometrics', 'Razorpay Radar API'],
    theBar: 'Zero false positive friction for legitimate buyers while maintaining 99.9% fraud interception rate.',
    exampleDirections: [
      'Autonomous chargeback defense bot',
      'Velocity pattern anomaly scanner',
      'Synthetic identity verifier'
    ]
  },
  {
    id: 'track-03',
    number: '03',
    title: 'AI Revenue Recovery',
    tagline: 'Turn failed transactions and dropped checkout carts into saved revenue',
    description: 'Build smart recovery agents that diagnose payment failures, dynamically attempt alternative payment rails, and reach out with personalized recovery offers.',
    whyNow: 'Merchant checkout drop-offs and bank payment failures cost merchants billions in recoverable annual revenue.',
    protocols: ['Razorpay Smart Routing', 'Auto-retry Fallback API', 'Omnichannel Payment Links'],
    theBar: 'Demonstrate active recovery of a failed payment attempt with step-by-step user consent.',
    exampleDirections: [
      'Failed payment instant salvage bot',
      'Smart payment method recommendation engine',
      'WhatsApp interactive recovery checkout'
    ]
  },
  {
    id: 'track-04',
    number: '04',
    title: 'AI Finance Controller',
    tagline: 'Autonomous reconciliation, payout governance, and treasury management',
    description: 'Build AI controllers that automatically match settlement reports, audit merchant fee breakdowns, and manage cash flow disbursements.',
    whyNow: 'Manual finance operations slow down high-growth merchants. Autonomous controllers can audit thousands of daily ledger entries in real time.',
    protocols: ['Razorpay Route API', 'Settlement Recon API', 'Double-Entry Ledger Spec'],
    theBar: 'Complete auditability of every ledger credit/debit with automated variance alerts.',
    exampleDirections: [
      'Autonomous settlement reconciler',
      'Vendor payout policy gatekeeper',
      'Dynamic cashflow forecasting agent'
    ]
  },
  {
    id: 'track-05',
    number: '05',
    title: 'Open Track',
    tagline: 'Reimagine financial technology, merchant tools, and payments with AI',
    description: 'Any groundbreaking AI innovation built on or integrating with Razorpay payment ecosystem infrastructure.',
    whyNow: 'The shift to AI native financial software is accelerating across SMBs, SaaS, and Enterprise commerce.',
    protocols: ['Razorpay Webhooks API', 'Subscriptions API', 'Razorpay POS API'],
    theBar: 'High technical execution quality, real-world utility, and clean user experience.',
    exampleDirections: [
      'AI voice-activated POS terminal',
      'Dynamic SaaS tier billing optimizer',
      'Cross-border automated compliance agent'
    ]
  }
];
