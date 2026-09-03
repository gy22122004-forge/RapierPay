import type { Product, AuditLog, SafetyPolicy, CampaignWorkflow } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Neural Commerce AI Agent (Annual License)',
    sku: 'NC-AGENT-ANNUAL-PRO',
    price: 14999,
    margin: 65,
    category: 'AI Software',
    description: 'Autonomous AI buyer & seller agent engine integrated with RapierPay payment APIs.',
    inStock: true,
    stockCount: 42,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    acpSchema: {
      protocolVersion: 'ACP/2026.1',
      agentCapability: ['INVENTORY_QUERY', 'BUNDLE_NEGOTIATION', 'AP2_MANDATE_EXECUTION'],
      machineReadableSpec: {
        jsonLdContext: 'https://schema.org/Product',
        gtin: '9780201379624',
        acpId: 'acp_sku_091823'
      },
      offers: {
        priceCurrency: 'INR',
        price: 14999,
        eligibleDiscounts: [
          { type: 'ACP_PROTOCOL_DIRECT', maxPercentage: 15 }
        ],
        rapierpayPlanId: 'plan_H7gK9s2Lm8N'
      }
    }
  },
  {
    id: 'prod_2',
    name: 'Smart Checkout POS Terminal - RapierPay Agent',
    sku: 'RZP-POS-AGENT-V2',
    price: 8499,
    margin: 40,
    category: 'Hardware POS',
    description: 'Hardware payment terminal with native ACP protocol & AP2 biometric agent validation.',
    inStock: true,
    stockCount: 15,
    image: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=400&q=80',
    acpSchema: {
      protocolVersion: 'ACP/2026.1',
      agentCapability: ['HARDWARE_SCAN', 'AP2_BIOMETRIC_LOCK', 'NFC_TAP_TO_PAY'],
      machineReadableSpec: {
        jsonLdContext: 'https://schema.org/HardwareStore',
        gtin: '8901234567890',
        acpId: 'acp_sku_091824'
      },
      offers: {
        priceCurrency: 'INR',
        price: 8499,
        eligibleDiscounts: [
          { type: 'HARDWARE_BUNDLE', maxPercentage: 10 }
        ]
      }
    }
  },
  {
    id: 'prod_3',
    name: 'Autonomous Fraud Interceptor Service (Monthly)',
    sku: 'AF-INTERCEPT-SUB',
    price: 2999,
    margin: 85,
    category: 'Security API',
    description: 'Sub-millisecond machine learning fraud interception for RapierPay API integrations.',
    inStock: true,
    stockCount: 999,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80',
    acpSchema: {
      protocolVersion: 'ACP/2026.1',
      agentCapability: ['REALTIME_FRAUD_SCORE', 'RISK_GATE_DECISION'],
      machineReadableSpec: {
        jsonLdContext: 'https://schema.org/SoftwareApplication',
        gtin: '1234567890123',
        acpId: 'acp_sku_091825'
      },
      offers: {
        priceCurrency: 'INR',
        price: 2999,
        eligibleDiscounts: []
      }
    }
  },
  {
    id: 'prod_4',
    name: 'Omnichannel Agentic Commerce SDK',
    sku: 'OMNI-SDK-DEV',
    price: 19999,
    margin: 90,
    category: 'Developer Tools',
    description: 'Full-stack SDK for building AI agents that transact directly via RapierPay UAP & AP2 rails.',
    inStock: true,
    stockCount: 200,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    acpSchema: {
      protocolVersion: 'ACP/2026.1',
      agentCapability: ['SDK_WRAPPER', 'MULTIRAIL_ROUTING'],
      machineReadableSpec: {
        jsonLdContext: 'https://schema.org/TechArticle',
        gtin: '5554443332211',
        acpId: 'acp_sku_091826'
      },
      offers: {
        priceCurrency: 'INR',
        price: 19999,
        eligibleDiscounts: [
          { type: 'DEV_COMMUNITY_GRANT', maxPercentage: 25 }
        ]
      }
    }
  }
];

export const defaultPolicy: SafetyPolicy = {
  maxTransactionLimit: 50000,
  dailyVelocityCap: 100,
  requireHumanApprovalAbove: 25000,
  prohibitedCategories: ['Gambling', 'Illegal Goods'],
  strictAuditLogging: true,
  gracefulFailureMode: true
};

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log_1',
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
    actionType: 'DISCOVERY',
    title: 'ACP Machine-Readable Catalog Handshake',
    agentId: 'SHOPPER-BOT-091',
    amount: 0,
    policyStatus: 'PASSED',
    explainabilityText: 'Discovered SKU `NC-AGENT-ANNUAL-PRO`. Verified JSON-LD schema & ACP v2026.1 compliance.',
    auditHash: '0x8f9a21b...4c1e',
    idempotencyKey: 'idemp_disc_901a'
  },
  {
    id: 'log_2',
    timestamp: new Date(Date.now() - 1800000).toLocaleTimeString(),
    actionType: 'PRICING',
    title: 'Margin-Aware Bundle Discount Applied',
    agentId: 'UPSELL-ORCHESTRATOR',
    amount: 12749,
    policyStatus: 'PASSED',
    explainabilityText: 'Applied 15% ACP protocol discount. Contribution margin remains positive (+50%). Target price ₹12,749.',
    auditHash: '0x3c2a110...789b',
    idempotencyKey: 'idemp_prc_882b'
  },
  {
    id: 'log_3',
    timestamp: new Date(Date.now() - 600000).toLocaleTimeString(),
    actionType: 'POLICY_GATE',
    title: 'Bounded Single Transaction Check Passed',
    agentId: 'SAFETY-POLICY-GATE',
    amount: 12749,
    policyStatus: 'PASSED',
    explainabilityText: 'Evaluated order ₹12,749 against merchant policy cap (₹50,000). Passed without human escalation.',
    auditHash: '0x1d4e88f...90a1',
    idempotencyKey: 'idemp_gate_771c'
  },
  {
    id: 'log_4',
    timestamp: new Date(Date.now() - 120000).toLocaleTimeString(),
    actionType: 'PAYMENT_INIT',
    title: 'RapierPay AP2 Payment Order Token Created',
    agentId: 'RAPIERPAY-GATEWAY-AGENT',
    amount: 12749,
    policyStatus: 'PASSED',
    explainabilityText: 'Generated RapierPay Order `order_P7g290xK1` with test API mandate token. Idempotency key verified.',
    auditHash: '0xaa9031c...55d2',
    idempotencyKey: 'idemp_pay_102d'
  }
];

export const initialCampaigns: CampaignWorkflow[] = [
  {
    id: 'camp_1',
    title: 'High-Intent Cart Recovery via WhatsApp AI',
    trigger: 'RapierPay checkout drop-off event captured by webhook.',
    targetSegment: 'Cart Abandoned > ₹10,000 within 2 hours',
    aiAction: 'Agent dispatches interactive WhatsApp message with 1-click AP2 mandate payment link.',
    channel: 'WhatsApp',
    conversionRate: 42.5,
    revenueGenerated: 1809000,
    status: 'active'
  },
  {
    id: 'camp_2',
    title: 'POS Hardware Cross-Sell for Software Buyers',
    trigger: 'Merchant active license threshold > 100 queries/day.',
    targetSegment: 'Purchased Neural Commerce AI License in last 30 days',
    aiAction: 'Agent negotiates 10% hardware bundle discount for Smart Checkout POS Terminal.',
    channel: 'Agent-to-Agent (ACP)',
    conversionRate: 28.4,
    revenueGenerated: 577932,
    status: 'active'
  },
  {
    id: 'camp_3',
    title: 'Graceful Payment Retry Campaign',
    trigger: 'RapierPay payment failure code: `BAD_REQUEST_PAYMENT_TIMED_OUT`',
    targetSegment: 'Bank 504 Timeout or Failed Mandate',
    aiAction: 'Agent instantly generates dynamic NetBanking backup rail without double-debiting buyer.',
    channel: 'In-App',
    conversionRate: 64.2,
    revenueGenerated: 1187405,
    status: 'active'
  }
];
