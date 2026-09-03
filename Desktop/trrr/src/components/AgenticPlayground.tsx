import React from 'react';
import type { CartItem, AuditLog } from '../types';
import { ConversationalCheckout } from './ConversationalCheckout';
import { AgentCatalogViewer } from './AgentCatalogViewer';
import { UpsellEngine } from './UpsellEngine';
import { CampaignOrchestrator } from './CampaignOrchestrator';
import { SafetyGatesAudit } from './SafetyGatesAudit';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { MessageSquare, FileJson, TrendingUp, Megaphone, ShieldCheck, Activity } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface AgenticPlaygroundProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRazorpayModal: (cart: CartItem[], totalAmount: number, auditLog: AuditLog) => void;
}

export const AgenticPlayground: React.FC<AgenticPlaygroundProps> = ({
  activeTab,
  setActiveTab,
  onOpenRazorpayModal,
}) => {
  const handleTabChange = (tab: string) => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 space-y-6">
      {/* Navigation Tabs Bar */}
      <div className="bg-[#121721] p-1.5 rounded-2xl border border-[#1E2638] flex items-center justify-between overflow-x-auto gap-1">
        <button
          onClick={() => handleTabChange('checkout')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'checkout'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-bold'
              : 'text-gray-400 hover:text-white hover:bg-[#1A2233]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>1. Conversational Checkout</span>
        </button>

        <button
          onClick={() => handleTabChange('catalog')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'catalog'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-bold'
              : 'text-gray-400 hover:text-white hover:bg-[#1A2233]'
          }`}
        >
          <FileJson className="w-4 h-4" />
          <span>2. Agent Catalog (ACP/AP2)</span>
        </button>

        <button
          onClick={() => handleTabChange('upsell')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'upsell'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-bold'
              : 'text-gray-400 hover:text-white hover:bg-[#1A2233]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>3. Upsell Engine</span>
        </button>

        <button
          onClick={() => handleTabChange('campaigns')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'campaigns'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-bold'
              : 'text-gray-400 hover:text-white hover:bg-[#1A2233]'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>4. Campaign Orchestrator</span>
        </button>

        <button
          onClick={() => handleTabChange('safety')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'safety'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-bold'
              : 'text-gray-400 hover:text-white hover:bg-[#1A2233]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>5. Safety Gates & Audit ("THE BAR")</span>
        </button>

        <button
          onClick={() => handleTabChange('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'analytics'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-bold'
              : 'text-gray-400 hover:text-white hover:bg-[#1A2233]'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>6. Merchant Analytics</span>
        </button>
      </div>

      {/* Active Module Panel */}
      <div className="transition-all">
        {activeTab === 'checkout' && (
          <ConversationalCheckout onOpenRazorpayModal={onOpenRazorpayModal} />
        )}
        {activeTab === 'catalog' && <AgentCatalogViewer />}
        {activeTab === 'upsell' && <UpsellEngine />}
        {activeTab === 'campaigns' && <CampaignOrchestrator />}
        {activeTab === 'safety' && <SafetyGatesAudit />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </div>
    </div>
  );
};
