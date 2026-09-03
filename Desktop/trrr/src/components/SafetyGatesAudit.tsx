import React, { useState } from 'react';
import { initialAuditLogs, defaultPolicy } from '../data/mockData';
import { Lock, ShieldCheck, Sliders, Hash } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const SafetyGatesAudit: React.FC = () => {
  const [policy, setPolicy] = useState(defaultPolicy);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="shine-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFDBCF] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#111827] text-[#EAF852] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#111827] font-serif">Bounded Safety Gates & Audit Trail</h1>
              <p className="text-xs text-gray-500 font-mono">100% Explainable, Gated Money Actions on RapierPay AP2 Protocol</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              POLICY GATES PASSED
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
        {/* Left Guardrails Config (5 Cols) */}
        <div className="lg:col-span-5 shine-card rounded-3xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#DFDBCF] pb-3 text-xs">
            <div className="flex items-center gap-2 text-[#111827] font-bold">
              <Sliders className="w-4 h-4" />
              <span>MERCHANT BOUNDED SPEND RULES</span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              ENFORCED
            </span>
          </div>

          {/* Slider 1: Single Txn Limit */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Single Txn Limit:</span>
              <span className="font-bold text-[#111827]">₹{policy.maxTransactionLimit.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="5000"
              value={policy.maxTransactionLimit}
              onChange={(e) => {
                setPolicy({ ...policy, maxTransactionLimit: Number(e.target.value) });
                soundFx.playClick();
              }}
              className="w-full accent-[#111827] cursor-pointer"
            />
          </div>

          {/* Slider 2: 2FA Human Threshold */}
          <div className="space-y-2 text-xs pt-1">
            <div className="flex justify-between text-gray-600">
              <span>2FA Admin Approval Threshold:</span>
              <span className="font-bold text-[#111827]">₹{policy.requireHumanApprovalAbove.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="2500"
              value={policy.requireHumanApprovalAbove}
              onChange={(e) => {
                setPolicy({ ...policy, requireHumanApprovalAbove: Number(e.target.value) });
                soundFx.playClick();
              }}
              className="w-full accent-[#111827] cursor-pointer"
            />
          </div>

          {/* Policy Checklist */}
          <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#DFDBCF] space-y-2 text-xs text-gray-700">
            <div className="flex items-center gap-2 font-bold text-[#111827]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ACTIVE SECURITY RULES:</span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div>✓ Idempotency key uniqueness enforced</div>
              <div>✓ Cryptographic SHA-256 explainability hash logged</div>
              <div>✓ Automatic state rollback on 504 gateway timeout</div>
              <div>✓ 3DS 2.0 2FA OTP verification required</div>
            </div>
          </div>
        </div>

        {/* Right Audit Trail (7 Cols) */}
        <div className="lg:col-span-7 shine-card rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#DFDBCF] pb-3 text-xs">
            <div className="flex items-center gap-2 text-[#111827] font-bold">
              <Hash className="w-4 h-4" />
              <span>CRYPTOGRAPHIC AUDIT LEDGER ({initialAuditLogs.length} EVENTS)</span>
            </div>
            <span className="text-[10px] text-gray-500 font-bold">IMMUTABLE</span>
          </div>

          <div className="space-y-3">
            {initialAuditLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-2xl bg-white border border-[#DFDBCF] space-y-2 shadow-sm">
                <div className="flex justify-between font-bold text-xs">
                  <span className="text-[#111827] font-sans">{log.title}</span>
                  <span className="text-emerald-700">[{log.policyStatus}]</span>
                </div>
                <div className="text-[11px] text-gray-600 leading-relaxed font-sans">{log.explainabilityText}</div>
                <div className="flex justify-between text-[9px] text-gray-400 border-t border-gray-100 pt-2">
                  <span>Idemp: {log.idempotencyKey}</span>
                  <span>Hash: {log.auditHash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
