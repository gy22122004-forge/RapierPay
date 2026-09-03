import React, { useState } from 'react';
import { Volume2, VolumeX, Zap, Play, LayoutDashboard, MessageSquare, Code2, TrendingUp, Megaphone, Lock, BarChart3, Layers, History } from 'lucide-react';
import { soundFx } from '../utils/audio';

export type TabType = 'overview' | 'workbench' | 'checkout' | 'catalog' | 'upsell' | 'campaigns' | 'safety' | 'analytics';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onQuickSimulate: () => void;
  onOpenHistoryModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onQuickSimulate,
  onOpenHistoryModal
}) => {
  const [isSoundOn, setIsSoundOn] = useState(soundFx.isEnabled());

  const handleToggleSound = () => {
    const newState = soundFx.toggleSound();
    setIsSoundOn(newState);
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'workbench', label: 'Workbench', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'checkout', label: 'AI Checkout', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'catalog', label: 'ACP API', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'upsell', label: 'AI Upsell', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Megaphone className="w-3.5 h-3.5" /> },
    { id: 'safety', label: 'Audit Gates', icon: <Lock className="w-3.5 h-3.5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 lg:px-8 py-3.5 backdrop-blur-xl bg-[#EBE8DD]/95 border-b border-[#DFDBCF]">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Top Brand Bar */}
        <div className="flex items-center justify-between">
          {/* Left Brand - SHINE Editorial Style Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#111827] text-[#EAF852] flex items-center justify-center font-bold shadow-md">
              <Zap className="w-5 h-5 fill-[#EAF852]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-[#111827] font-sans">RapierPay</span>
                <span className="text-gray-400 font-mono text-xs">/</span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F8F6F0] text-[#111827] border border-[#DFDBCF] font-bold tracking-wide">
                  RAPIER AGENTIC
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-sans font-medium hidden sm:block">
                RapierPay Architecture • NPCI UAP / ACP / AP2 Standard
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2.5 rounded-full border text-xs flex items-center gap-2 transition-all ${
                isSoundOn
                  ? 'bg-[#EAF852] border-[#D6F038] text-[#111827] font-bold shadow-sm'
                  : 'bg-[#F8F6F0] border-[#DFDBCF] text-gray-600 hover:text-black'
              }`}
              title="Toggle Web Audio SFX"
            >
              {isSoundOn ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#111827]" />
                  <span className="hidden sm:inline font-mono text-[11px]">AUDIO</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline font-mono text-[11px]">MUTE</span>
                </>
              )}
            </button>

            {/* Payment History & Bank Statement Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenHistoryModal();
              }}
              className="px-4 py-2.5 rounded-full bg-[#F8F6F0] hover:bg-[#EBE8DD] border border-[#DFDBCF] text-[#111827] text-xs font-bold transition-all flex items-center gap-1.5 font-mono shadow-sm"
              title="View SBI Account Statement & Payment History"
            >
              <History className="w-4 h-4 text-[#111827]" />
              <span>Statement</span>
            </button>

            {/* Primary Canary Lemon Button */}
            <button
              onClick={() => {
                soundFx.playChime();
                onQuickSimulate();
              }}
              className="shine-btn-lemon px-5 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-2 shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-[#111827]" />
              <span>Execute Order</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 font-sans text-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  onTabChange(tab.id);
                }}
                className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2 whitespace-nowrap font-bold ${
                  isActive
                    ? 'bg-[#111827] text-white border-[#111827] shadow-md'
                    : 'bg-[#F8F6F0] hover:bg-[#F0EDE2] text-gray-700 border-[#DFDBCF]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
