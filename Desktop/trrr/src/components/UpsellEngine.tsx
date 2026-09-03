import React, { useState } from 'react';
import { mockProducts } from '../data/mockData';
import { TrendingUp, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const UpsellEngine: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [discountPct, setDiscountPct] = useState(15);

  const originalPrice = selectedProduct.price;
  const discountedPrice = originalPrice * (1 - discountPct / 100);
  const costPrice = originalPrice * (1 - selectedProduct.margin / 100);
  const netMarginVal = discountedPrice - costPrice;
  const netMarginPct = ((netMarginVal / discountedPrice) * 100).toFixed(1);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="shine-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFDBCF] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#111827] text-[#EAF852] flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#111827] font-serif">Margin-Aware Revenue Growth Engine</h1>
              <p className="text-xs text-gray-500 font-mono">Dynamic bundle optimization & profit preservation matrix</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-[#EAF852] text-[#111827] font-bold border border-[#D6F038]">
              OPTIMIZER ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Product Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-3 font-mono">
          <span className="text-xs text-gray-500 font-bold px-1 uppercase tracking-wider">Select Product:</span>
          <div className="space-y-2.5">
            {mockProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedProduct(prod);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedProduct.id === prod.id
                    ? 'bg-[#111827] text-white border-[#111827] shadow-md'
                    : 'shine-card hover:bg-[#F2EFE6] text-[#111827]'
                }`}
              >
                <div className="font-bold text-xs truncate">{prod.name}</div>
                <div className="flex justify-between items-center text-[10px] opacity-80 pt-1">
                  <span>Margin: +{prod.margin}%</span>
                  <span className="font-bold">₹{prod.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Margin Matrix & Simulator (8 Cols) */}
        <div className="lg:col-span-8 space-y-4 font-mono">
          <div className="shine-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#DFDBCF] pb-4">
              <div>
                <span className="text-[10px] text-gray-500 font-bold block uppercase">REAL-TIME MARGIN SIMULATION</span>
                <h3 className="text-xl font-black text-[#111827] font-serif">{selectedProduct.name}</h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                PROFIT SAFE
              </span>
            </div>

            {/* Discount Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 font-bold">ACP Discount Percentage:</span>
                <span className="font-black text-[#111827]">{discountPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="5"
                value={discountPct}
                onChange={(e) => {
                  setDiscountPct(Number(e.target.value));
                  soundFx.playClick();
                }}
                className="w-full accent-[#111827] cursor-pointer"
              />
            </div>

            {/* 4 Financial Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-[#DFDBCF]">
                <span className="text-[10px] text-gray-500 block">BASE PRICE</span>
                <span className="font-black text-[#111827] text-sm font-serif">₹{originalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#EAF852] border border-[#D6F038] text-[#111827]">
                <span className="text-[10px] text-[#111827] font-bold block">TARGET PRICE</span>
                <span className="font-black text-sm font-serif">₹{discountedPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#DFDBCF]">
                <span className="text-[10px] text-gray-500 block">COST PRICE</span>
                <span className="font-black text-gray-700 text-sm font-serif">₹{costPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900">
                <span className="text-[10px] text-emerald-800 font-bold block">NET MARGIN</span>
                <span className="font-black text-sm font-serif text-emerald-700">+{netMarginPct}%</span>
              </div>
            </div>

            {/* Margin Explanation Note */}
            <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#DFDBCF] space-y-1 text-xs text-gray-700">
              <div className="flex items-center gap-2 font-bold text-[#111827]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>UPSELL MARGIN GUARANTEE</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                At a **{discountPct}% ACP discount**, net margin stays positive at **+{netMarginPct}%** (Net profit: **₹{netMarginVal.toLocaleString('en-IN')}** per unit). The agent automatically approves this discount for AI buyers!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
