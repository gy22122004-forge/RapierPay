import React, { useState, useRef, useEffect } from 'react';
import type { AgentChatMessage, CartItem, AuditLog, SafetyPolicy, DecisionPhase } from '../types';
import { mockProducts, initialAuditLogs, defaultPolicy } from '../data/mockData';
import { soundFx } from '../utils/audio';
import {
  Send, Bot, ShieldCheck, AlertTriangle, Code2, ChevronDown, ChevronUp, Sliders, Hash,
  Zap, ShoppingBag, ArrowRight
} from 'lucide-react';

interface AgenticSplitDashboardProps {
  onOpenRazorpayModal: (cart: CartItem[], totalAmount: number, auditLog: AuditLog) => void;
}

export const AgenticSplitDashboard: React.FC<AgenticSplitDashboardProps> = ({
  onOpenRazorpayModal,
}) => {
  // Agent Chat Messages State (Concise & Point-to-Point)
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'agent',
      text: 'Autonomous Agentic Commerce Engine initialized via RapierPay ACP/AP2 protocol. Ready for product discovery, margin-aware bundle pricing, and bounded payment execution.',
      timestamp: '17:20:00',
      phase: 'OBSERVE',
      idempotencyKey: 'idemp_init_001',
      reasoningChain: {
        observe: '• Verified 4 ACP products in catalog.',
        propose: '• Awaiting buyer query.',
        gateCheck: {
          passed: true,
          rule: 'POLICY_CAP_CHECK',
          spendCap: 50000,
          proposedAmount: 0
        },
        execute: '• AP2 Handshake ready.',
        auditHash: '0x7f8e391a4b'
      },
      rawPayload: {
        protocol: 'ACP/2026.1',
        merchant_did: 'did:key:z6MkpTHR...99A',
        rails: ['AP2', 'x402', 'UAP'],
        status: 'READY'
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activePhase, setActivePhase] = useState<DecisionPhase>('OBSERVE');
  const [expandedPayloadId, setExpandedPayloadId] = useState<string | null>('msg-init');

  // Policy & Audit State
  const [policy, setPolicy] = useState<SafetyPolicy>(defaultPolicy);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [activeFailureBanner, setActiveFailureBanner] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string, forcedScenario?: 'over_budget') => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    soundFx.playClick();
    const userMsg: AgentChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);
    setActivePhase('OBSERVE');

    setTimeout(() => {
      setActivePhase('PROPOSE');
    }, 400);

    setTimeout(() => {
      setActivePhase('GATE_CHECK');
    }, 800);

    setTimeout(() => {
      setActivePhase('EXECUTE');
      processAgentDecision(query, forcedScenario);
      setIsTyping(false);
    }, 1200);
  };

  const processAgentDecision = (userQuery: string, forcedScenario?: 'over_budget') => {
    const q = userQuery.toLowerCase();
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const idempKey = `idemp_${Math.random().toString(36).substring(2, 10)}`;
    const auditHashStr = `0x${Math.random().toString(16).substring(2, 10)}`;

    let responseText = '';
    let updatedCart = [...cart];
    let actionReq: AgentChatMessage['actionRequired'] = undefined;
    let proposedTotalAmt = 0;
    let reasoning = undefined;
    let payload = undefined;

    if (forcedScenario === 'over_budget' || q.includes('over budget') || q.includes('75000')) {
      // FORCED SCENARIO: Over Bounded Limit (Blocked)
      soundFx.playAlert();
      proposedTotalAmt = 75000;
      responseText = `⚠️ POLICY BLOCK: ₹75,000 > Single Cap (₹${policy.maxTransactionLimit.toLocaleString('en-IN')}). Halted cleanly without charging.`;

      reasoning = {
        observe: '• Target order: 5x Neural Commerce Licenses (₹75,000).',
        propose: '• Mandate compiled for ₹75,000.',
        gateCheck: {
          passed: false,
          rule: `LIMIT_EXCEEDED (₹75,000 > ₹${policy.maxTransactionLimit.toLocaleString('en-IN')})`,
          spendCap: policy.maxTransactionLimit,
          proposedAmount: 75000
        },
        execute: '• ACTION BLOCKED. Escalated to 2FA admin sign-off.',
        auditHash: auditHashStr
      };

      payload = {
        error: 'LIMIT_EXCEEDED',
        requested: 75000,
        cap: policy.maxTransactionLimit,
        idempotency_key: idempKey,
        status: 'BLOCKED'
      };

      const auditEntry: AuditLog = {
        id: `log_${Date.now()}`,
        timestamp: timestampStr,
        actionType: 'POLICY_GATE',
        title: 'Single Txn Limit Exceeded',
        agentId: 'SAFETY-POLICY-GATE',
        amount: 75000,
        policyStatus: 'BOUND_EXCEEDED',
        explainabilityText: `• Requested ₹75,000 > Cap ₹${policy.maxTransactionLimit.toLocaleString('en-IN')}. Halted.`,
        auditHash: auditHashStr,
        idempotencyKey: idempKey
      };

      setAuditLogs((prev) => [auditEntry, ...prev]);
      setActiveFailureBanner(`SCENARIO EXECUTED: Limit Blocked (₹75,000 > ₹${policy.maxTransactionLimit.toLocaleString('en-IN')})`);

    } else if (q.includes('license') || q.includes('neural') || q.includes('annual') || q.includes('buy')) {
      const prod = mockProducts[0];
      const existing = updatedCart.find((item) => item.product.id === prod.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        updatedCart.push({ product: prod, quantity: 1, appliedDiscount: 15 });
      }
      setCart(updatedCart);

      const total = updatedCart.reduce((sum, item) => sum + (item.product.price * (1 - item.appliedDiscount / 100)) * item.quantity, 0);
      proposedTotalAmt = total;
      actionReq = 'checkout';

      responseText = `Configured: **${prod.name}**. Applied **15% ACP Discount** (Saved ₹2,250). Total: **₹${total.toLocaleString('en-IN')}**. Status: PASSED.`;

      reasoning = {
        observe: `• Verified SKU ${prod.sku} stock: ${prod.stockCount}.`,
        propose: `• Applied 15% ACP discount. Target Total: ₹${total.toLocaleString('en-IN')}.`,
        gateCheck: {
          passed: true,
          rule: `CAP_CHECK (₹${total.toLocaleString('en-IN')} <= ₹${policy.maxTransactionLimit.toLocaleString('en-IN')})`,
          spendCap: policy.maxTransactionLimit,
          proposedAmount: total
        },
        execute: `• AP2 mandate compiled. Idempotency: ${idempKey}.`,
        auditHash: auditHashStr
      };

      payload = {
        protocol: 'ACP/2026.1',
        action: 'ORDER_INTENT',
        sku: prod.sku,
        discount: 15,
        total: total,
        idempotency_key: idempKey
      };

      soundFx.playChime();
    } else if (q.includes('bundle') || q.includes('all') || q.includes('pos')) {
      const items = [mockProducts[0], mockProducts[1]];
      updatedCart = items.map((p) => ({ product: p, quantity: 1, appliedDiscount: 20 }));
      setCart(updatedCart);

      const total = updatedCart.reduce((sum, item) => sum + (item.product.price * (1 - item.appliedDiscount / 100)) * item.quantity, 0);
      proposedTotalAmt = total;
      actionReq = 'checkout';

      responseText = `Configured: **Full Merchant Suite**. Applied **20% Bundle Offer**. Total: **₹${total.toLocaleString('en-IN')}**. Status: PASSED.`;

      reasoning = {
        observe: '• Evaluated hardware + software bundle intent.',
        propose: '• Combined 2 SKUs with 20% ACP bundle discount.',
        gateCheck: {
          passed: true,
          rule: `CAP_CHECK (₹${total.toLocaleString('en-IN')} <= ₹${policy.maxTransactionLimit.toLocaleString('en-IN')})`,
          spendCap: policy.maxTransactionLimit,
          proposedAmount: total
        },
        execute: `• Mandate ready. Idempotency: ${idempKey}.`,
        auditHash: auditHashStr
      };

      payload = {
        protocol: 'ACP/2026.1',
        action: 'BUNDLE_INTENT',
        total: total,
        idempotency_key: idempKey
      };

      soundFx.playChime();
    } else {
      responseText = `Query evaluated: "${userQuery}". Verified 4 ACP SKUs. Select a scenario button to trigger transactions.`;
      reasoning = {
        observe: `• Intent analyzed: "${userQuery}".`,
        propose: '• Recommended ACP SKUs ready.',
        gateCheck: {
          passed: true,
          rule: 'NO_PAYMENT_REQUIRED',
          spendCap: policy.maxTransactionLimit,
          proposedAmount: 0
        },
        execute: '• Awaiting product intent.',
        auditHash: auditHashStr
      };
    }

    const agentMsg: AgentChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      text: responseText,
      timestamp: timestampStr,
      phase: 'EXECUTE',
      idempotencyKey: idempKey,
      actionRequired: actionReq,
      cartState: updatedCart,
      proposedTotal: proposedTotalAmt,
      reasoningChain: reasoning,
      rawPayload: payload
    };

    setMessages((prev) => [...prev, agentMsg]);
  };

  const handleCheckoutClick = (msg: AgentChatMessage) => {
    if (!cart.length) return;
    const total = cart.reduce((sum, item) => sum + (item.product.price * (1 - item.appliedDiscount / 100)) * item.quantity, 0);

    const auditLog: AuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      actionType: 'PAYMENT_INIT',
      title: 'AP2 Mandate Execution',
      agentId: 'RAPIERPAY-AP2-AGENT',
      amount: total,
      policyStatus: 'PASSED',
      explainabilityText: `• AP2 payment intent created for ₹${total.toLocaleString('en-IN')}. Gated cap passed.`,
      auditHash: msg.reasoningChain?.auditHash || `0x${Math.random().toString(16).substring(2, 10)}`,
      idempotencyKey: msg.idempotencyKey || `idemp_pay_${Date.now()}`
    };

    setAuditLogs((prev) => [auditLog, ...prev]);
    soundFx.playSuccess();
    onOpenRazorpayModal(cart, total, auditLog);
  };

  const calculateCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price * (1 - item.appliedDiscount / 100)) * item.quantity, 0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans">
      {/* LEFT COLUMN: Agent Decision Engine (7 Cols) */}
      <div className="lg:col-span-7 shine-card flex flex-col h-[740px] shadow-xl overflow-hidden">
        {/* Panel Header & Stepper */}
        <div className="px-6 py-4 bg-[#F8F6F0] border-b border-[#DFDBCF] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#111827]">
              <Bot className="w-4 h-4 text-[#111827]" />
              <span>AGENT DECISION & REASONING ENGINE</span>
            </div>
            <span className="text-[10px] font-mono px-3 py-0.5 rounded-full bg-white text-[#111827] border border-[#DFDBCF] font-bold shadow-sm">
              ACP / AP2 Live
            </span>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-4 gap-2 font-mono text-[10px] text-center">
            <div className={`py-2 rounded-xl border transition-all ${activePhase === 'OBSERVE' ? 'bg-[#EAF852] text-[#111827] font-black border-[#D6F038]' : 'bg-white text-gray-600 border-[#DFDBCF]'}`}>
              01. OBSERVE
            </div>
            <div className={`py-2 rounded-xl border transition-all ${activePhase === 'PROPOSE' ? 'bg-[#EAF852] text-[#111827] font-black border-[#D6F038]' : 'bg-white text-gray-600 border-[#DFDBCF]'}`}>
              02. PROPOSE
            </div>
            <div className={`py-2 rounded-xl border transition-all ${activePhase === 'GATE_CHECK' ? 'bg-amber-300 text-[#111827] font-black border-amber-400' : 'bg-white text-gray-600 border-[#DFDBCF]'}`}>
              03. GATE CHECK
            </div>
            <div className={`py-2 rounded-xl border transition-all ${activePhase === 'EXECUTE' ? 'bg-[#EAF852] text-[#111827] font-black border-[#D6F038]' : 'bg-white text-gray-600 border-[#DFDBCF]'}`}>
              04. EXECUTE
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F3F0E6]/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'agent' && (
                <div className="w-8 h-8 rounded-full bg-[#111827] text-[#EAF852] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  AI
                </div>
              )}

              <div className={`max-w-[88%] space-y-3 text-xs ${msg.sender === 'user' ? 'bg-[#EAF852] text-[#111827] font-extrabold p-4 rounded-2xl rounded-tr-none shadow-md' : 'bg-white border border-[#DFDBCF] text-[#111827] p-4 rounded-2xl rounded-tl-none shadow-sm'}`}>
                <div className="leading-relaxed font-semibold">{msg.text}</div>

                {/* Point-to-Point Reasoning Trace */}
                {msg.reasoningChain && (
                  <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#DFDBCF] space-y-1.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-[#111827] font-bold border-b border-[#DFDBCF] pb-1.5">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        REASONING TRACE
                      </span>
                      <span className={msg.reasoningChain.gateCheck.passed ? 'text-emerald-700 font-black' : 'text-amber-700 font-black'}>
                        {msg.reasoningChain.gateCheck.passed ? 'PASSED' : 'BLOCKED'}
                      </span>
                    </div>

                    <div className="text-gray-700">{msg.reasoningChain.observe}</div>
                    <div className="text-gray-700">{msg.reasoningChain.propose}</div>
                    <div className="text-gray-800 font-bold">• GATE: {msg.reasoningChain.gateCheck.rule}</div>
                    <div className="text-black font-bold">{msg.reasoningChain.execute}</div>

                    <div className="text-[10px] text-gray-500 pt-1 border-t border-[#DFDBCF] flex justify-between">
                      <span>Idemp: {msg.idempotencyKey}</span>
                      <span>Hash: {msg.reasoningChain.auditHash}</span>
                    </div>
                  </div>
                )}

                {/* Protocol Payload */}
                {msg.rawPayload && (
                  <div>
                    <button
                      onClick={() => setExpandedPayloadId(expandedPayloadId === msg.id ? null : msg.id)}
                      className="text-[10px] font-mono text-[#111827] hover:underline flex items-center gap-1 font-bold"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{expandedPayloadId === msg.id ? 'Hide Protocol Payload' : 'View Protocol JSON'}</span>
                      {expandedPayloadId === msg.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    {expandedPayloadId === msg.id && (
                      <div className="mt-2 p-3 rounded-2xl bg-[#181A20] text-emerald-400 border border-[#333745] text-[10px] font-mono overflow-x-auto">
                        <pre>{JSON.stringify(msg.rawPayload, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Checkout Trigger Button */}
                {msg.actionRequired === 'checkout' && msg.proposedTotal && (
                  <button
                    onClick={() => handleCheckoutClick(msg)}
                    className="w-full mt-2 shine-btn-lemon text-[#111827] font-mono font-black py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Zap className="w-4 h-4 fill-[#111827]" />
                    <span>Proceed to Checkout (₹{msg.proposedTotal.toLocaleString('en-IN')})</span>
                  </button>
                )}

                <div className="text-[10px] text-gray-400 text-right font-mono">{msg.timestamp}</div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#E5E0D2] text-[#111827] flex items-center justify-center font-mono font-bold text-xs shrink-0 border border-[#DFDBCF] mt-0.5">
                  YOU
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-gray-600 text-xs font-mono">
              <Bot className="w-4 h-4 animate-spin text-[#111827]" />
              <span className="animate-pulse">Evaluating ACP protocol mandate...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Preset Scenario Buttons */}
        <div className="px-6 py-3 bg-[#F8F6F0] border-t border-[#DFDBCF] flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-[11px]">
          <span className="text-gray-500 font-bold whitespace-nowrap">SCENARIOS:</span>
          <button
            onClick={() => handleSendMessage('Buy Neural Commerce AI Agent License')}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F2EFE6] text-[#111827] border border-[#DFDBCF] whitespace-nowrap font-bold shadow-sm"
          >
            + Buy License (ACP)
          </button>
          <button
            onClick={() => handleSendMessage('Recommend full merchant POS bundle')}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F2EFE6] text-[#111827] border border-[#DFDBCF] whitespace-nowrap font-bold shadow-sm"
          >
            + Full Bundle
          </button>
          <button
            onClick={() => handleSendMessage('Order 5x Neural Commerce Licenses for ₹75,000', 'over_budget')}
            className="px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 whitespace-nowrap font-bold shadow-sm"
          >
            ⚠️ Test Over-Budget (Blocked)
          </button>
        </div>

        {/* Input Form */}
        <div className="p-4 bg-[#F8F6F0] border-t border-[#DFDBCF]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Type prompt to buy products or test limits..."
              className="flex-1 bg-white border border-[#DFDBCF] focus:border-[#111827] rounded-xl px-4 py-2.5 text-xs font-mono text-[#111827] placeholder-gray-400 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="shine-btn-lemon text-[#111827] px-5 py-2.5 rounded-xl font-mono font-black text-xs transition-all flex items-center gap-1.5 shadow-md disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN: Bounded Guardrails & Audit Ledger (5 Cols) */}
      <div className="lg:col-span-5 space-y-4 font-mono">
        {/* Active Failure Banner */}
        {activeFailureBanner && (
          <div className="p-4 rounded-2xl bg-amber-100 border border-amber-300 text-xs text-amber-900 flex items-center gap-2.5 animate-pulse font-mono shadow-md">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700" />
            <div className="flex-1 font-bold">{activeFailureBanner}</div>
          </div>
        )}

        {/* 1. Bounded Policy Guardrails */}
        <div className="shine-card p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#DFDBCF] pb-3 text-xs">
            <div className="flex items-center gap-2 text-[#111827] font-bold">
              <Sliders className="w-4 h-4" />
              <span>BOUNDED SPEND GUARDRAILS</span>
            </div>
            <span className="text-[10px] px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
              ACTIVE
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Single Txn Limit:</span>
              <span className="text-[#111827] font-bold">₹{policy.maxTransactionLimit.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#E5E0D2] overflow-hidden border border-[#DFDBCF]">
              <div
                className={`h-full transition-all ${calculateCartTotal() > policy.maxTransactionLimit ? 'bg-red-500' : 'bg-[#EAF852]'}`}
                style={{ width: `${Math.min(100, (calculateCartTotal() / policy.maxTransactionLimit) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-[11px]">
            <div>
              <div className="flex justify-between text-gray-600 mb-1">
                <span>Max Txn Limit:</span>
                <span className="text-[#111827] font-bold">₹{policy.maxTransactionLimit.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={policy.maxTransactionLimit}
                onChange={(e) => setPolicy({ ...policy, maxTransactionLimit: Number(e.target.value) })}
                className="w-full accent-[#111827] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 2. Order Cart */}
        <div className="shine-card p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#DFDBCF] pb-3 text-xs">
            <div className="flex items-center gap-2 text-[#111827] font-bold">
              <ShoppingBag className="w-4 h-4 text-[#111827]" />
              <span>AGENTIC CART ({cart.reduce((s, i) => s + i.quantity, 0)} ITEMS)</span>
            </div>
            {cart.length > 0 && (
              <span className="text-[#111827] font-extrabold text-sm">
                ₹{calculateCartTotal().toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="py-4 text-center text-xs text-gray-500">
              Cart empty. Select scenario buttons to add items.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[170px] overflow-y-auto pr-1 text-xs">
              {cart.map((item, idx) => {
                const discountedPrice = item.product.price * (1 - item.appliedDiscount / 100);
                return (
                  <div key={idx} className="p-3 rounded-2xl bg-white border border-[#DFDBCF] flex items-center justify-between shadow-sm">
                    <div>
                      <div className="font-bold text-[#111827] truncate max-w-[190px]">{item.product.name}</div>
                      <div className="text-[10px] text-emerald-700 font-bold">
                        Margin: +{item.product.margin}% | Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#111827]">₹{discountedPrice.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-gray-500 font-semibold">-{item.appliedDiscount}% ACP</div>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => {
                  const lastMsg = messages[messages.length - 1];
                  handleCheckoutClick(lastMsg);
                }}
                className="w-full mt-2 shine-btn-lemon text-[#111827] font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Launch RapierPay Gateway</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* 3. Cryptographic Audit Ledger */}
        <div className="shine-card p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#DFDBCF] pb-3 text-xs">
            <div className="flex items-center gap-2 text-[#111827] font-bold">
              <Hash className="w-4 h-4 text-[#111827]" />
              <span>CRYPTOGRAPHIC AUDIT LEDGER</span>
            </div>
            <span className="text-[10px] text-gray-500 font-bold">{auditLogs.length} Events</span>
          </div>

          <div className="space-y-2.5 max-h-[230px] overflow-y-auto pr-1 text-[11px]">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className={`p-3 rounded-2xl border transition-all space-y-1.5 ${
                  log.policyStatus === 'PASSED'
                    ? 'bg-white border-[#DFDBCF]'
                    : log.policyStatus === 'ROLLED_BACK'
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-red-50 border-red-300 text-red-900'
                }`}
              >
                <div className="flex justify-between font-bold">
                  <span className="text-[#111827]">{log.title}</span>
                  <span className={log.policyStatus === 'PASSED' ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                    [{log.policyStatus}]
                  </span>
                </div>
                <div className="text-[10px] text-gray-600 leading-snug">
                  {log.explainabilityText}
                </div>
                <div className="flex justify-between text-[9px] text-gray-500 pt-1.5 border-t border-[#DFDBCF]">
                  <span>Idemp: {log.idempotencyKey}</span>
                  <span>Hash: {log.auditHash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
