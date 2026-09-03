import React from 'react';
import { BarChart3, TrendingUp, Zap, ShieldCheck, ArrowUpRight, DollarSign, Activity } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="shine-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFDBCF] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#111827] text-[#EAF852] flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#111827] font-serif">Merchant Revenue & Telemetry Analytics</h1>
              <p className="text-xs text-gray-500 font-mono">Real-time performance tracking for RapierPay agentic transactions</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-[#EAF852] text-[#111827] font-bold border border-[#D6F038]">
              TELEMETRY LIVE
            </span>
          </div>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="shine-card rounded-3xl p-6 space-y-2 shadow-xl border border-[#DFDBCF]">
          <div className="flex justify-between items-center text-gray-500 text-xs font-bold">
            <span>TOTAL REVENUE (30D)</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-[#111827] font-serif">₹64,20,900</div>
          <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" />
            <span>+38.4% AI Buyer Lift</span>
          </div>
        </div>

        <div className="shine-card rounded-3xl p-6 space-y-2 shadow-xl border border-[#DFDBCF]">
          <div className="flex justify-between items-center text-gray-500 text-xs font-bold">
            <span>TRANSACTIONS CAPTURED</span>
            <Zap className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-[#111827] font-serif">1,482</div>
          <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" />
            <span>99.8% Success Rate</span>
          </div>
        </div>

        <div className="shine-card rounded-3xl p-6 space-y-2 shadow-xl border border-[#DFDBCF]">
          <div className="flex justify-between items-center text-gray-500 text-xs font-bold">
            <span>AVG ORDER VALUE (AOV)</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-[#111827] font-serif">₹14,999</div>
          <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" />
            <span>+22% via Bundle Engine</span>
          </div>
        </div>

        <div className="shine-card rounded-3xl p-6 space-y-2 shadow-xl border border-[#DFDBCF]">
          <div className="flex justify-between items-center text-gray-500 text-xs font-bold">
            <span>MANDATE LATENCY</span>
            <Activity className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-[#111827] font-serif">1.18s</div>
          <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Sub-second Verification</span>
          </div>
        </div>
      </div>

      {/* Analytics Chart Representation Box */}
      <div className="shine-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl font-mono">
        <div className="flex items-center justify-between border-b border-[#DFDBCF] pb-4">
          <div>
            <span className="text-xs text-gray-500 font-bold block uppercase">AI BUYER REVENUE GROWTH VS TRADITIONAL</span>
            <h3 className="text-xl font-black text-[#111827] font-serif">Weekly Volume Comparison (INR)</h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-[#111827]">
              <span className="w-3 h-3 rounded bg-[#111827]"></span> AI Buyer Rails
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-3 h-3 rounded bg-[#DFDBCF]"></span> Traditional
            </span>
          </div>
        </div>

        {/* Visual Bar Chart Mockup */}
        <div className="grid grid-cols-7 gap-4 items-end h-48 pt-6 px-4 border-b border-[#DFDBCF] pb-4">
          {[
            { day: 'MON', val1: 75, val2: 40 },
            { day: 'TUE', val1: 85, val2: 45 },
            { day: 'WED', val1: 65, val2: 35 },
            { day: 'THU', val1: 95, val2: 50 },
            { day: 'FRI', val1: 90, val2: 55 },
            { day: 'SAT', val1: 100, val2: 60 },
            { day: 'SUN', val1: 80, val2: 42 }
          ].map((bar, idx) => (
            <div key={idx} className="space-y-2 text-center flex flex-col items-center">
              <div className="flex items-end gap-1.5 h-36 w-full justify-center">
                <div className="w-5 bg-[#111827] rounded-t-lg transition-all" style={{ height: `${bar.val1}%` }}></div>
                <div className="w-5 bg-[#DFDBCF] rounded-t-lg transition-all" style={{ height: `${bar.val2}%` }}></div>
              </div>
              <span className="text-[10px] text-gray-600 font-bold block">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
