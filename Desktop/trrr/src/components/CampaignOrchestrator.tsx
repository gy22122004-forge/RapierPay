import React, { useState } from 'react';
import { initialCampaigns } from '../data/mockData';
import { Megaphone, Play, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const CampaignOrchestrator: React.FC = () => {
  const [campaigns] = useState(initialCampaigns);
  const [activeTriggerMsg, setActiveTriggerMsg] = useState<string | null>(null);

  const handleTriggerCampaign = (campTitle: string) => {
    soundFx.playChime();
    setActiveTriggerMsg(`Triggered Campaign "${campTitle}" via WhatsApp AI Agent. Sent 1-click AP2 payment links.`);
    setTimeout(() => setActiveTriggerMsg(null), 4000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="shine-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFDBCF] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#111827] text-[#EAF852] flex items-center justify-center font-bold">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#111827] font-serif">Automated Revenue Campaign Orchestrator</h1>
              <p className="text-xs text-gray-500 font-mono">WhatsApp & In-App AI triggers for abandoned cart recovery</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-[#EAF852] text-[#111827] font-bold border border-[#D6F038]">
              3 CAMPAIGNS LIVE
            </span>
          </div>
        </div>
      </div>

      {/* Active Trigger Toast Banner */}
      {activeTriggerMsg && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-mono flex items-center gap-2.5 animate-bounce shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="font-bold">{activeTriggerMsg}</span>
        </div>
      )}

      {/* Campaigns List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="shine-card rounded-3xl p-6 space-y-4 border border-[#DFDBCF] flex flex-col justify-between shadow-xl transition-all hover:shadow-2xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#111827] text-[#EAF852] font-mono text-[10px] font-bold uppercase">
                  {camp.channel}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700">
                  {camp.conversionRate}% Conversion
                </span>
              </div>

              <h3 className="text-lg font-black text-[#111827] font-serif leading-snug">{camp.title}</h3>

              <div className="space-y-2 text-xs text-gray-700 font-mono">
                <div className="p-3 rounded-2xl bg-white border border-[#DFDBCF]">
                  <span className="text-[10px] text-gray-500 block">TRIGGER:</span>
                  <span className="font-bold text-[#111827]">{camp.trigger}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8F6F0] border border-[#DFDBCF]">
                  <span className="text-[10px] text-gray-500 block">AI ACTION:</span>
                  <span className="font-bold text-[#111827]">{camp.aiAction}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-[#DFDBCF]">
                <span className="text-gray-500">REVENUE GENERATED:</span>
                <span className="font-black text-sm text-[#111827] font-serif">
                  ₹{camp.revenueGenerated.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => handleTriggerCampaign(camp.title)}
                className="w-full shine-btn-lemon text-[#111827] font-bold py-3 px-4 rounded-full text-xs transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-[#111827]" />
                <span>Simulate Trigger Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
