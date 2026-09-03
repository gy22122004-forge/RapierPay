import React from 'react';
import { Star, ArrowRight, ShieldCheck, TrendingUp, Bot } from 'lucide-react';
import type { TabType } from './Header';
import { soundFx } from '../utils/audio';

interface Track01HeaderProps {
  onTabChange?: (tab: TabType) => void;
}

export const Track01Header: React.FC<Track01HeaderProps> = ({ onTabChange }) => {
  const handleNav = (tab: TabType) => {
    soundFx.playClick();
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-6 pb-4 space-y-8 font-sans">
      {/* 1. HERO SECTION */}
      <div className="shine-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        {/* Top Header Row inside Hero Card */}
        <div className="flex items-center justify-between border-b border-[#DFDBCF] pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-2xl tracking-tighter text-[#111827] font-sans">RapierPay</span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#EBE8DD] text-[#111827] font-mono font-bold">
              Track 01 • AI Growth & Agentic Commerce
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#111827] bg-white px-3 py-1 rounded-full border border-[#DFDBCF]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Razorpay Test-Mode APIs Active •</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Hero Text & Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF852] border border-[#D6F038] text-[#111827] text-xs font-mono font-black shadow-sm">
              <Bot className="w-4 h-4 fill-[#111827]" />
              <span>END-TO-END AI BUYER & REVENUE GROWTH ENGINE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[#111827] leading-[1.08] font-serif tracking-tight">
              Make your merchant transactable by AI buyers end to end.
            </h1>

            <p className="text-sm text-gray-700 font-sans max-w-lg font-medium leading-relaxed">
              Build autonomous AI buyer & seller agents that grow merchant revenue using Razorpay / RapierPay test-mode APIs, ACP machine-readable catalog schemas, and AP2 bounded spend mandates.
            </p>

            {/* Action Buttons with Live Interactivity */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => handleNav('workbench')}
                className="shine-btn-lemon px-7 py-3.5 rounded-full text-xs font-extrabold shadow-md flex items-center gap-2"
              >
                <span>Launch AI Buyer Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNav('catalog')}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F2EFE6] border border-[#DFDBCF] text-[#111827] text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                Explore Merchant Revenue APIs
              </button>
            </div>

            {/* Rating Star Badge */}
            <div className="flex items-center gap-3 pt-3 text-xs text-gray-700 font-sans font-bold">
              <div className="flex text-[#111827]">
                <Star className="w-4 h-4 fill-[#111827]" />
                <Star className="w-4 h-4 fill-[#111827]" />
                <Star className="w-4 h-4 fill-[#111827]" />
                <Star className="w-4 h-4 fill-[#111827]" />
                <Star className="w-4 h-4 fill-[#111827]" />
              </div>
              <span>4.8 Track 01 Benchmark • 100% Policy Gated Money Actions</span>
            </div>
          </div>

          {/* Right Hero Visual: 3 Floating Payment Cards */}
          <div className="lg:col-span-5 relative h-80 flex items-center justify-center">
            {/* Card 1: Matte Black Card */}
            <div className="absolute w-60 h-36 rounded-2xl bg-[#181A20] text-white p-4 shadow-2xl transform -rotate-12 -translate-x-12 -translate-y-4 border border-[#333745] flex flex-col justify-between transition-all hover:rotate-0 hover:z-30">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-sm tracking-wider font-sans text-white">RapierPay</span>
                <div className="flex items-center -space-x-2">
                  <div className="w-5 h-5 rounded-full bg-red-500 opacity-90"></div>
                  <div className="w-5 h-5 rounded-full bg-amber-400 opacity-90"></div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="w-7 h-5 bg-amber-300/90 rounded-md"></div>
                <span className="text-[10px] font-mono font-bold text-gray-300">AP2 AGENT CARD</span>
              </div>
            </div>

            {/* Card 2: Pastel Sky Blue Card */}
            <div className="absolute w-60 h-36 rounded-2xl bg-[#9CD6FD] text-[#0B2545] p-4 shadow-2xl transform rotate-6 translate-x-4 translate-y-2 border border-[#74C2F8] flex flex-col justify-between transition-all hover:rotate-0 hover:z-30">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-sm tracking-wider font-sans">RapierPay</span>
                <div className="flex items-center -space-x-2">
                  <div className="w-5 h-5 rounded-full bg-red-500 opacity-90"></div>
                  <div className="w-5 h-5 rounded-full bg-amber-400 opacity-90"></div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="w-7 h-5 bg-amber-200 rounded-md"></div>
                <span className="text-[10px] font-mono font-extrabold text-[#0B2545]">ACP PROTOCOL V2</span>
              </div>
            </div>

            {/* Card 3: Champagne Beige Card */}
            <div className="absolute w-60 h-36 rounded-2xl bg-[#EBE4D5] text-[#2C261E] p-4 shadow-xl transform rotate-12 translate-x-16 translate-y-12 border border-[#D8CFBC] flex flex-col justify-between transition-all hover:rotate-0 hover:z-30">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-sm tracking-wider font-sans">RapierPay</span>
                <div className="flex items-center -space-x-2">
                  <div className="w-5 h-5 rounded-full bg-gray-600 opacity-90"></div>
                  <div className="w-5 h-5 rounded-full bg-gray-400 opacity-90"></div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="w-7 h-5 bg-amber-300 rounded-md"></div>
                <span className="text-[10px] font-mono font-bold text-gray-800">x402 DEPOSIT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. METRIC SECTION */}
      <div className="shine-card rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DFDBCF] pb-6">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Track 01 Core Benchmarks — AI Buyer Commerce & Merchant Growth
            </p>
            <h2 className="text-4xl font-black text-[#111827] font-serif">
              Real results for agentic merchants
            </h2>
          </div>
          <button
            onClick={() => handleNav('analytics')}
            className="px-6 py-3 rounded-full bg-white hover:bg-[#F2EFE6] border border-[#DFDBCF] text-xs font-bold text-[#111827] transition-all shadow-sm active:scale-95"
          >
            View Analytics
          </button>
        </div>

        {/* 4 Point Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-sans">
          <div className="space-y-1 border-r border-[#DFDBCF] last:border-r-0 pr-4">
            <div className="text-4xl sm:text-5xl font-black text-[#111827] font-serif">+38%</div>
            <div className="text-xs text-gray-600 font-medium">Merchant revenue growth</div>
          </div>

          <div className="space-y-1 border-r border-[#DFDBCF] last:border-r-0 pr-4">
            <div className="text-4xl sm:text-5xl font-black text-[#111827] font-serif">100%</div>
            <div className="text-xs text-gray-600 font-medium">AI Buyer transactable</div>
          </div>

          <div className="space-y-1 border-r border-[#DFDBCF] last:border-r-0 pr-4">
            <div className="text-4xl sm:text-5xl font-black text-[#111827] font-serif">&lt;1.2s</div>
            <div className="text-xs text-gray-600 font-medium">AP2 Mandate latency</div>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-[#111827] font-serif">₹50K</div>
            <div className="text-xs text-gray-600 font-medium">Bounded spend limit cap</div>
          </div>
        </div>
      </div>

      {/* 3. FEATURE CARDS GRID */}
      <div className="space-y-6">
        <div className="flex justify-between items-end border-b border-[#DFDBCF] pb-4">
          <div>
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block">CORE TRACK 01 IMPLEMENTATIONS</span>
            <h2 className="text-3xl font-black text-[#111827] font-serif">End-to-End AI Buyer & Revenue Growth Infrastructure</h2>
          </div>
          <div className="text-xs font-bold text-[#111827] font-mono">3 CORE PILLARS</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="p-6 rounded-3xl bg-[#EAF852] border border-[#D6F038] space-y-4 shadow-md text-[#111827]">
            <div className="p-2 rounded-xl bg-black/10 w-fit">
              <Bot className="w-5 h-5 fill-[#111827]" />
            </div>
            <h3 className="text-lg font-black font-serif leading-snug">
              Machine-readable ACP catalog for AI buyers.
            </h3>
            <p className="text-xs text-gray-800 font-medium leading-relaxed">
              Exposes standard schema.org JSON-LD endpoints so AI buyer agents can query stock, negotiate bundle pricing, and execute orders automatically.
            </p>
            <button
              onClick={() => handleNav('catalog')}
              className="w-full py-2.5 rounded-full bg-[#111827] text-white font-bold text-xs shadow-sm hover:bg-black transition-colors"
            >
              View Catalog Spec & APIs
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-[#F8F6F0] border border-[#DFDBCF] space-y-4 shadow-sm text-[#111827]">
            <div className="p-2 rounded-xl bg-gray-200/60 w-fit">
              <TrendingUp className="w-5 h-5 text-[#111827]" />
            </div>
            <h3 className="text-lg font-black font-serif leading-snug">
              Margin-aware revenue growth & upsell engine.
            </h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Dynamically calculates product margins, offers smart bundle discounts, and recovers lost carts via automated WhatsApp AI triggers.
            </p>
            <button
              onClick={() => handleNav('upsell')}
              className="w-full py-2.5 rounded-full bg-white hover:bg-[#F2EFE6] border border-[#DFDBCF] text-[#111827] font-bold text-xs transition-colors"
            >
              Test Upsell Engine
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-[#FBEBEB] border border-[#F3D5D5] space-y-4 shadow-sm text-[#111827]">
            <div className="p-2 rounded-xl bg-red-100 w-fit">
              <ShieldCheck className="w-5 h-5 text-red-700" />
            </div>
            <h3 className="text-lg font-black font-serif leading-snug">
              Bounded AP2 money gates & audit trail.
            </h3>
            <p className="text-xs text-gray-700 font-medium leading-relaxed">
              Enforces hard single transaction limits, 3DS 2.0 2FA OTP verification, idempotency keys, and cryptographic ledger hashing.
            </p>
            <button
              onClick={() => handleNav('safety')}
              className="w-full py-2.5 rounded-full bg-white hover:bg-[#FAF0F0] border border-[#F3D5D5] text-[#111827] font-bold text-xs transition-colors"
            >
              Inspect Audit Gates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
