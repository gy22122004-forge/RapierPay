import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const Track01Hero: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-6 pb-2">
      {/* Flagship Hero Card - Pixel-perfect dedicated to Track 01 */}
      <div className="bg-[#121721] border border-[#1E2638] rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        {/* Subtle Ambient Gold Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        {/* Top Tag Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            <span>TRACK 01 • AI GROWTH & AGENTIC COMMERCE</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#0B0E14] text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Razorpay Test-Mode APIs Active
            </span>
          </div>
        </div>

        {/* Main Title & Tagline (Matches screenshot) */}
        <div className="space-y-3 mb-6">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            AI Growth & Agentic Commerce
          </h1>
          <p className="text-xl text-amber-300 font-medium tracking-wide">
            Grow the merchant's revenue, and make them sellable to AI buyers
          </p>
        </div>

        {/* Core Description (Matches screenshot) */}
        <div className="border-t border-b border-[#1E2638] py-5 my-5">
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Build an agent that grows revenue for a merchant on Razorpay test-mode APIs, or that makes a merchant transactable by an AI buyer end to end.
          </p>
        </div>

        {/* Why Now & Example Directions Grid (Matches screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
          {/* Why Now */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              WHY NOW
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              NPCI's UAP and the global protocol race (ACP, AP2, x402) make agent-to-agent commerce the open problem of the year, and Razorpay's in-app pilots are already live.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['NPCI UAP Protocol', 'ACP Standard', 'AP2 Payment Token', 'x402 HTTP Headers'].map((proto, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#0B0E14] text-amber-300 border border-[#2A3650]"
                >
                  {proto}
                </span>
              ))}
            </div>
          </div>

          {/* Example Directions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              EXAMPLE DIRECTIONS
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-300 font-medium">
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-mono font-bold text-base">+</span>
                <span>Conversational in-app checkout</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-mono font-bold text-base">+</span>
                <span>Agent-readable catalog</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-mono font-bold text-base">+</span>
                <span>Upsell & cross-sell agent</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-mono font-bold text-base">+</span>
                <span>Campaign orchestrator</span>
              </li>
            </ul>
          </div>
        </div>

        {/* The Bar Box (Matches screenshot) */}
        <div className="bg-[#0B0E14] border border-amber-500/20 rounded-xl p-5 mb-2">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              THE BAR (REQUIREMENT)
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              ✓ Fully Implemented in Workbench Below
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Every money action explainable, bounded and gated. Show the audit trail and one failure handled gracefully.
          </p>
        </div>
      </div>
    </div>
  );
};
