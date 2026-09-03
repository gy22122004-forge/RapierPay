export interface BuildathonTrack {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  whyNow: string;
  protocols: string[];
  theBar: string;
  exampleDirections: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in INR
  originalPrice?: number;
  description: string;
  sku: string;
  inStock: boolean;
  stockCount: number;
  margin: number; // Percentage margin for upsell engine
  image: string;
  acpSchema: Record<string, any>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  appliedDiscount: number;
}

export type DecisionPhase = 'OBSERVE' | 'PROPOSE' | 'GATE_CHECK' | 'EXECUTE';

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  phase?: DecisionPhase;
  idempotencyKey?: string;
  actionRequired?: 'checkout' | 'approve_policy' | 'failure_fallback';
  cartState?: CartItem[];
  proposedTotal?: number;
  explanation?: {
    intent: string;
    reasoning: string;
    policyCheckPassed: boolean;
    auditHash: string;
  };
  reasoningChain?: {
    observe: string;
    propose: string;
    gateCheck: {
      passed: boolean;
      rule: string;
      spendCap: number;
      proposedAmount: number;
    };
    execute: string;
    auditHash: string;
  };
  rawPayload?: Record<string, any>;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actionType: 'DISCOVERY' | 'PRICING' | 'POLICY_GATE' | 'PAYMENT_INIT' | 'PAYMENT_SUCCESS' | 'FAILURE_HANDLED';
  title: string;
  agentId: string;
  amount: number;
  policyStatus: 'PASSED' | 'BOUND_EXCEEDED' | 'REQUIRES_HUMAN' | 'ROLLED_BACK';
  explainabilityText: string;
  auditHash: string;
  idempotencyKey: string;
}

export interface SafetyPolicy {
  maxTransactionLimit: number; // in INR
  dailyVelocityCap: number; // max ops per hour
  requireHumanApprovalAbove: number;
  prohibitedCategories: string[];
  strictAuditLogging: boolean;
  gracefulFailureMode: boolean;
}

export interface CampaignWorkflow {
  id: string;
  title: string;
  trigger: string;
  targetSegment: string;
  aiAction: string;
  channel: 'WhatsApp' | 'In-App' | 'Agent-to-Agent (ACP)' | 'Email';
  conversionRate: number;
  revenueGenerated: number;
  status: 'active' | 'paused' | 'draft';
}
