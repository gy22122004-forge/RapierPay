import React, { useState } from 'react';
import { Landmark, ArrowUpRight, ShieldCheck, AlertTriangle, RefreshCw, CheckCircle2, Search } from 'lucide-react';

export const PaymentHistoryViewer: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'PASSED' | 'ROLLED_BACK' | 'BOUND_EXCEEDED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const accountNumber = '42195510119';
  const ifscCode = 'SBIN0001868';
  const bankName = 'State Bank of India (SBI)';

  // Initial Payment History Statements
  const statements = [
    {
      id: 'txn_10982',
      timestamp: '2026-09-03 20:45:12',
      title: '3DS 2.0 Card Payment Captured',
      type: 'DEBIT',
      method: 'CARD (Jane Doe •••• 1111)',
      amount: 12749.15,
      status: 'PASSED',
      statusLabel: 'SETTLED & CAPTURED',
      referenceId: 'pay_9X2K7L8M11',
      statementNote: 'Authorized via 3DS 2.0 OTP Code 984210. Idempotency token verified with zero duplicate charges.',
      vpa: '42195510119@SBIN0001868.ifsc.npci'
    },
    {
      id: 'txn_10981',
      timestamp: '2026-09-03 20:30:00',
      title: 'UPI Gateway Timeout Failure',
      type: 'FAILURE',
      method: 'UPI (42195510119@SBIN0001868.ifsc.npci)',
      amount: 14999.00,
      status: 'ROLLED_BACK',
      statusLabel: '504 TIMEOUT (ROLLED BACK)',
      referenceId: 'fail_88F10A9B',
      statementNote: 'Bank 504 Gateway Timeout detected on UPI rail. Agent auto-executed state rollback with zero double debit. Backup NetBanking link generated.',
      vpa: '42195510119@SBIN0001868.ifsc.npci'
    },
    {
      id: 'txn_10980',
      timestamp: '2026-09-03 19:15:40',
      title: 'Over-Cap Policy Limit Blocked',
      type: 'BLOCKED',
      method: 'AP2 Agent Mandate',
      amount: 75000.00,
      status: 'BOUND_EXCEEDED',
      statusLabel: 'POLICY CAP EXCEEDED',
      referenceId: 'block_771C90A',
      statementNote: 'Order amount ₹75,000 exceeded merchant single transaction cap (₹50,000). Action halted cleanly prior to bank dispatch.',
      vpa: '42195510119@SBIN0001868.ifsc.npci'
    },
    {
      id: 'txn_10979',
      timestamp: '2026-09-03 18:22:10',
      title: 'Hardware POS Bundle Settled',
      type: 'DEBIT',
      method: 'UPI (PhonePe App)',
      amount: 18799.00,
      status: 'PASSED',
      statusLabel: 'SETTLED & CAPTURED',
      referenceId: 'pay_POS_77A81B',
      statementNote: 'ACP Protocol 20% bundle discount applied for POS Terminal + AI Agent SDK. Contribution margin +45%.',
      vpa: '42195510119@SBIN0001868.ifsc.npci'
    },
    {
      id: 'txn_10978',
      timestamp: '2026-09-03 16:10:05',
      title: 'Neural Commerce AI Agent License',
      type: 'DEBIT',
      method: 'UPI (Google Pay)',
      amount: 12749.15,
      status: 'PASSED',
      statusLabel: 'SETTLED & CAPTURED',
      referenceId: 'pay_NC_AGENT_01',
      statementNote: 'Direct AP2 Payment Order Token verified against merchant safety rules.',
      vpa: '42195510119@SBIN0001868.ifsc.npci'
    }
  ];

  const filteredStatements = statements.filter((stmt) => {
    const matchesFilter = filter === 'ALL' || stmt.status === filter;
    const matchesSearch =
      stmt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stmt.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stmt.statementNote.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-sans">
      {/* 1. BANK STATEMENT SUMMARY HEADER */}
      <div className="shine-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFDBCF] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#111827] text-[#EAF852] flex items-center justify-center shadow-md">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#111827] font-serif">
                  Bank Statement & Payment History
                </h1>
                <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold border border-emerald-300">
                  LIVE ACCOUNT
                </span>
              </div>
              <p className="text-xs text-gray-500 font-mono">
                Official Account Statement for SBI A/C #{accountNumber} (IFSC: {ifscCode})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="px-4 py-2 rounded-2xl bg-white border border-[#DFDBCF] shadow-sm">
              <span className="text-gray-500 text-[10px] block">BANK NAME:</span>
              <span className="font-bold text-[#111827]">{bankName}</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-white border border-[#DFDBCF] shadow-sm">
              <span className="text-gray-500 text-[10px] block">NPCI VPA:</span>
              <span className="font-bold text-emerald-700">{accountNumber}@{ifscCode}.ifsc.npci</span>
            </div>
          </div>
        </div>

        {/* 3 Metric Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="p-4 rounded-2xl bg-white border border-[#DFDBCF] space-y-1 shadow-sm">
            <span className="text-xs text-gray-500 font-medium">SETTLED TRANSACTIONS</span>
            <div className="text-2xl font-black text-[#111827] font-serif">₹4,44,296.30</div>
            <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>100% Verified Gated Payments</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DFDBCF] space-y-1 shadow-sm">
            <span className="text-xs text-gray-500 font-medium">FAILURES & ROLLED BACK</span>
            <div className="text-2xl font-black text-amber-800 font-serif">₹14,999.00</div>
            <div className="text-[10px] text-amber-700 font-bold flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Zero Double Debits (State Restored)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DFDBCF] space-y-1 shadow-sm">
            <span className="text-xs text-gray-500 font-medium">BOUNDED POLICY BLOCKS</span>
            <div className="text-2xl font-black text-gray-700 font-serif">₹75,000.00</div>
            <div className="text-[10px] text-gray-600 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Blocked Before Bank Handoff</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-full border font-bold transition-all ${filter === 'ALL' ? 'bg-[#111827] text-white border-[#111827]' : 'bg-white text-gray-700 border-[#DFDBCF]'}`}
          >
            All Statements ({statements.length})
          </button>
          <button
            onClick={() => setFilter('PASSED')}
            className={`px-4 py-2 rounded-full border font-bold transition-all ${filter === 'PASSED' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-white text-emerald-800 border-[#DFDBCF]'}`}
          >
            Captured ({statements.filter(s => s.status === 'PASSED').length})
          </button>
          <button
            onClick={() => setFilter('ROLLED_BACK')}
            className={`px-4 py-2 rounded-full border font-bold transition-all ${filter === 'ROLLED_BACK' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-amber-800 border-[#DFDBCF]'}`}
          >
            Failure Statements ({statements.filter(s => s.status === 'ROLLED_BACK').length})
          </button>
          <button
            onClick={() => setFilter('BOUND_EXCEEDED')}
            className={`px-4 py-2 rounded-full border font-bold transition-all ${filter === 'BOUND_EXCEEDED' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 border-[#DFDBCF]'}`}
          >
            Policy Blocked ({statements.filter(s => s.status === 'BOUND_EXCEEDED').length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Payment ID or Note..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-[#DFDBCF] bg-white text-xs font-mono text-[#111827] outline-none focus:border-[#111827]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* 3. STATEMENT HISTORY LIST */}
      <div className="space-y-4">
        {filteredStatements.map((stmt) => (
          <div
            key={stmt.id}
            className="shine-card rounded-2xl p-5 border border-[#DFDBCF] space-y-3 transition-all hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DFDBCF] pb-3 font-mono">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl text-white font-bold ${stmt.status === 'PASSED' ? 'bg-emerald-600' : stmt.status === 'ROLLED_BACK' ? 'bg-amber-600' : 'bg-gray-700'}`}>
                  {stmt.status === 'PASSED' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#111827] font-sans">{stmt.title}</h3>
                  <span className="text-[10px] text-gray-500">{stmt.timestamp} • Ref: {stmt.referenceId}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-[#111827] font-serif">
                  ₹{stmt.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold inline-block ${
                  stmt.status === 'PASSED'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : stmt.status === 'ROLLED_BACK'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}>
                  {stmt.statusLabel}
                </span>
              </div>
            </div>

            {/* Statement Explanation Note */}
            <div className="p-3.5 rounded-xl bg-[#F8F6F0] border border-[#DFDBCF] space-y-1 font-mono text-xs text-gray-700">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#111827]">
                <span>STATEMENT EXPLANATION NOTE:</span>
                <span className="text-[10px] text-gray-500">Method: {stmt.method}</span>
              </div>
              <p className="leading-relaxed text-[11px]">{stmt.statementNote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
