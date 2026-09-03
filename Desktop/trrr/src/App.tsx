import { useState } from 'react';
import { Header, type TabType } from './components/Header';
import { Track01Header } from './components/Track01Header';
import { AgenticSplitDashboard } from './components/AgenticSplitDashboard';
import { ConversationalCheckout } from './components/ConversationalCheckout';
import { AgentCatalogViewer } from './components/AgentCatalogViewer';
import { UpsellEngine } from './components/UpsellEngine';
import { CampaignOrchestrator } from './components/CampaignOrchestrator';
import { SafetyGatesAudit } from './components/SafetyGatesAudit';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { RazorpayModal } from './components/RazorpayModal';
import type { CartItem, AuditLog } from './types';
import { mockProducts } from './data/mockData';

export function App() {
  // Active Tab State (Default: 'overview')
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Checkout Modal State
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'form' | 'failure_statement'>('form');
  const [modalCart, setModalCart] = useState<CartItem[]>([]);
  const [modalTotal, setModalTotal] = useState(0);
  const [modalAuditLog, setModalAuditLog] = useState<AuditLog | undefined>(undefined);

  const handleOpenRazorpayModal = (cart: CartItem[], totalAmount: number, auditLog: AuditLog) => {
    setModalMode('form');
    setModalCart(cart);
    setModalTotal(totalAmount);
    setModalAuditLog(auditLog);
    setIsRazorpayModalOpen(true);
  };

  const handleQuickSimulate = () => {
    const defaultCart: CartItem[] = [
      { product: mockProducts[0], quantity: 1, appliedDiscount: 15 }
    ];
    const total = mockProducts[0].price * 0.85;
    const audit: AuditLog = {
      id: `log_quick_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      actionType: 'PAYMENT_INIT',
      title: 'Quick Simulated AP2 Agent Order',
      agentId: 'did:key:z6MkpTHR8V',
      amount: total,
      policyStatus: 'PASSED',
      explainabilityText: 'Direct simulated execution of AI Agent order via ACP AP2 payment token.',
      auditHash: `0x${Math.random().toString(16).substring(2, 10)}`,
      idempotencyKey: `idemp_quick_${Date.now()}`
    };
    handleOpenRazorpayModal(defaultCart, total, audit);
  };

  const handleOpenHistoryModal = () => {
    const defaultCart: CartItem[] = [
      { product: mockProducts[0], quantity: 1, appliedDiscount: 15 }
    ];
    const total = mockProducts[0].price * 0.85;
    const audit: AuditLog = {
      id: `log_stmt_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      actionType: 'PAYMENT_INIT',
      title: 'Account Statement Inspection',
      agentId: 'RAPIERPAY-STATEMENT-BOT',
      amount: total,
      policyStatus: 'PASSED',
      explainabilityText: 'SBI Account #42195510119 statement ledger inspection token generated.',
      auditHash: `0x88f1${Math.random().toString(16).substring(2, 6)}`,
      idempotencyKey: `idemp_stmt_${Date.now()}`
    };

    setModalMode('failure_statement');
    setModalCart(defaultCart);
    setModalTotal(total);
    setModalAuditLog(audit);
    setIsRazorpayModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#EBE8DD] text-[#111827] flex flex-col font-sans selection:bg-[#EAF852] selection:text-black">
      {/* Header Navigation Bar with Interactive Tabs & Action Buttons */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onQuickSimulate={handleQuickSimulate}
        onOpenHistoryModal={handleOpenHistoryModal}
      />

      {/* Main Single-Tab View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6">
        {activeTab === 'overview' && <Track01Header onTabChange={setActiveTab} />}
        {activeTab === 'workbench' && <AgenticSplitDashboard onOpenRazorpayModal={handleOpenRazorpayModal} />}
        {activeTab === 'checkout' && <ConversationalCheckout onOpenRazorpayModal={handleOpenRazorpayModal} />}
        {activeTab === 'catalog' && <AgentCatalogViewer />}
        {activeTab === 'upsell' && <UpsellEngine />}
        {activeTab === 'campaigns' && <CampaignOrchestrator />}
        {activeTab === 'safety' && <SafetyGatesAudit />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DFDBCF] bg-[#F8F6F0] py-4 px-4 lg:px-8 text-xs font-mono text-gray-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#111827]">RapierPay Buildathon — Track 01</span>
            <span>•</span>
            <span>AI Growth & Agentic Commerce (ACP / AP2 Protocol)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              All Money Actions Bounded & Gated
            </span>
          </div>
        </div>
      </footer>

      {/* RapierPay Payment & Statement Modal */}
      <RazorpayModal
        isOpen={isRazorpayModalOpen}
        onClose={() => setIsRazorpayModalOpen(false)}
        cart={modalCart}
        totalAmount={modalTotal}
        auditLog={modalAuditLog}
        initialMode={modalMode}
        onPaymentSuccess={() => {}}
      />
    </div>
  );
}

export default App;
