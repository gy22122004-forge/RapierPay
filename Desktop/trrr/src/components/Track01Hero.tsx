import React from 'react';

export const Track01Hero: React.FC = () => {
  return (
    <div className="shine-card rounded-3xl p-8 sm:p-12 border border-[#DFDBCF] space-y-6 font-sans">
      <div className="flex items-center gap-3">
        <span className="px-3.5 py-1.5 rounded-full bg-[#EAF852] border border-[#D6F038] text-[#111827] text-xs font-mono font-black">
          TRACK 01 CORE ENGINE
        </span>
        <span className="text-xs text-gray-500 font-mono">RapierPay APIs</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-[#111827] font-serif leading-tight">
        RapierPay Agentic Commerce Architecture
      </h1>

      <p className="text-sm text-gray-700 max-w-2xl font-medium leading-relaxed">
        Making merchants transactable for AI buyers while growing revenue with margin-aware bundle optimization and bounded AP2 payment safety gates.
      </p>
    </div>
  );
};
