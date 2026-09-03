import React, { useState, useRef, useEffect } from 'react';
import type { AgentChatMessage, CartItem, AuditLog } from '../types';
import { mockProducts } from '../data/mockData';
import { Send, Bot, ShoppingBag, Zap } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ConversationalCheckoutProps {
  onOpenRazorpayModal: (cart: CartItem[], totalAmount: number, auditLog: AuditLog) => void;
}

export const ConversationalCheckout: React.FC<ConversationalCheckoutProps> = ({ onOpenRazorpayModal }) => {
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'Hello! I am your Autonomous Agentic Commerce Assistant powered by RapierPay ACP/AP2 protocol. Ask me to discover products, negotiate bundle discounts, or execute instant test-mode checkouts.',
      timestamp: '17:20:00'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textOverride?: string) => {
    const query = textOverride || inputQuery;
    if (!query.trim()) return;

    soundFx.playClick();
    const userMsg: AgentChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textOverride) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      processConversationalIntent(query);
      setIsTyping(false);
    }, 900);
  };

  const processConversationalIntent = (query: string) => {
    const q = query.toLowerCase();
    let replyText = '';
    let updatedCart = [...cart];
    let actionReq: AgentChatMessage['actionRequired'] = undefined;
    let proposedTotal = 0;

    if (q.includes('neural') || q.includes('license') || q.includes('software')) {
      const prod = mockProducts[0];
      updatedCart.push({ product: prod, quantity: 1, appliedDiscount: 15 });
      setCart(updatedCart);
      proposedTotal = prod.price * 0.85;
      actionReq = 'checkout';
      replyText = `I found **${prod.name}**. I have automatically negotiated a **15% ACP Direct Protocol Discount** for you. Total is **₹${proposedTotal.toLocaleString('en-IN')}**. Would you like to launch the gateway?`;
      soundFx.playChime();
    } else if (q.includes('pos') || q.includes('terminal') || q.includes('hardware')) {
      const prod = mockProducts[1];
      updatedCart.push({ product: prod, quantity: 1, appliedDiscount: 10 });
      setCart(updatedCart);
      proposedTotal = prod.price * 0.90;
      actionReq = 'checkout';
      replyText = `Added **${prod.name}** with **10% Hardware Bundle Discount**. Total is **₹${proposedTotal.toLocaleString('en-IN')}**.`;
      soundFx.playChime();
    } else if (q.includes('bundle') || q.includes('all') || q.includes('everything')) {
      updatedCart = [
        { product: mockProducts[0], quantity: 1, appliedDiscount: 20 },
        { product: mockProducts[1], quantity: 1, appliedDiscount: 20 }
      ];
      setCart(updatedCart);
      proposedTotal = updatedCart.reduce((s, i) => s + (i.product.price * 0.8), 0);
      actionReq = 'checkout';
      replyText = `I configured the **Full Merchant Agentic Suite** with a **20% Bundle Discount**. Total: **₹${proposedTotal.toLocaleString('en-IN')}**. Ready for AP2 Mandate Handoff.`;
      soundFx.playChime();
    } else {
      replyText = `I analyzed your query: "${query}". I can help you discover ACP products, calculate margins, or execute instant checkout. Try selecting a quick prompt below!`;
    }

    const agentMsg: AgentChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionRequired: actionReq,
      cartState: updatedCart,
      proposedTotal: proposedTotal
    };

    setMessages((prev) => [...prev, agentMsg]);
  };

  const handleLaunchCheckout = () => {
    if (!cart.length) return;
    const total = cart.reduce((sum, item) => sum + (item.product.price * (1 - item.appliedDiscount / 100)) * item.quantity, 0);

    const auditLog: AuditLog = {
      id: `log_chat_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      actionType: 'PAYMENT_INIT',
      title: 'Conversational AP2 Mandate Order',
      agentId: 'RAZORPAY-AGENTIC-CHECKOUT-v1',
      amount: total,
      policyStatus: 'PASSED',
      explainabilityText: `Conversational agent generated AP2 checkout token for ₹${total.toLocaleString('en-IN')}. Gated policy check PASSED.`,
      auditHash: `0x${Math.random().toString(16).substring(2, 10)}`,
      idempotencyKey: `idemp_chat_${Date.now()}`
    };

    soundFx.playSuccess();
    onOpenRazorpayModal(cart, total, auditLog);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
      {/* Left Chat Column */}
      <div className="lg:col-span-8 shine-card rounded-3xl flex flex-col h-[700px] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#F8F6F0] border-b border-[#DFDBCF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#111827] text-[#EAF852] flex items-center justify-center font-bold">
              <Bot className="w-5 h-5 fill-[#EAF852]" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-[#111827]">RapierPay Conversational AI Checkout</h2>
              <p className="text-[11px] text-gray-500 font-mono">Autonomous Buyer Assistant • ACP Protocol v2026.1</p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold border border-emerald-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>ACP Active</span>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F3F0E6]/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'agent' && (
                <div className="w-8 h-8 rounded-full bg-[#111827] text-[#EAF852] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  AI
                </div>
              )}

              <div className={`max-w-[85%] space-y-3 text-xs ${msg.sender === 'user' ? 'bg-[#EAF852] text-[#111827] font-extrabold p-4 rounded-2xl rounded-tr-none shadow-md' : 'bg-white border border-[#DFDBCF] text-[#111827] p-4 rounded-2xl rounded-tl-none shadow-sm'}`}>
                <div className="leading-relaxed font-medium">{msg.text}</div>

                {msg.actionRequired === 'checkout' && msg.proposedTotal && (
                  <button
                    onClick={() => handleLaunchCheckout()}
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
              <span className="animate-pulse">Thinking & evaluating discount offers...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Preset Prompt Bar */}
        <div className="px-6 py-3 bg-[#F8F6F0] border-t border-[#DFDBCF] flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-[11px]">
          <span className="text-gray-500 font-bold whitespace-nowrap">QUICK PROMPTS:</span>
          <button
            onClick={() => handleSend('I want to buy Neural Commerce AI License')}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#F2EFE6] text-[#111827] border border-[#DFDBCF] whitespace-nowrap font-bold shadow-sm"
          >
            + Buy AI License
          </button>
          <button
            onClick={() => handleSend('Recommend full POS hardware software bundle')}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#F2EFE6] text-[#111827] border border-[#DFDBCF] whitespace-nowrap font-bold shadow-sm"
          >
            + POS Hardware Bundle
          </button>
        </div>

        {/* Input Form */}
        <div className="p-4 bg-[#F8F6F0] border-t border-[#DFDBCF]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask agent to discover products, negotiate discounts, or buy..."
              className="flex-1 bg-white border border-[#DFDBCF] focus:border-[#111827] rounded-xl px-4 py-2.5 text-xs font-mono text-[#111827] placeholder-gray-400 focus:outline-none"
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

      {/* Right Order Summary Column */}
      <div className="lg:col-span-4 space-y-4 font-mono">
        <div className="shine-card rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#DFDBCF] pb-3 text-xs">
            <div className="flex items-center gap-2 text-[#111827] font-bold">
              <ShoppingBag className="w-4 h-4" />
              <span>AGENTIC CART ({cart.length})</span>
            </div>
            <span className="font-extrabold text-sm text-[#111827]">
              ₹{cart.reduce((s, i) => s + (i.product.price * (1 - i.appliedDiscount / 100)) * i.quantity, 0).toLocaleString('en-IN')}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500 font-sans">
              No items in cart. Chat with the AI assistant to add products with ACP discounts!
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white border border-[#DFDBCF] space-y-1 shadow-sm text-xs">
                  <div className="font-bold text-[#111827] font-sans truncate">{item.product.name}</div>
                  <div className="flex justify-between text-[11px] text-gray-600">
                    <span>Qty: {item.quantity}</span>
                    <span className="font-bold text-emerald-700">-{item.appliedDiscount}% Discount</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
