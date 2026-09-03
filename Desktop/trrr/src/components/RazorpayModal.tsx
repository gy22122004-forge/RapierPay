import React, { useState, useEffect } from 'react';
import type { CartItem, AuditLog } from '../types';
import { X, CheckCircle2, Copy, CheckCheck, Smartphone, ShieldCheck, QrCode, RefreshCw, Landmark, Lock, ShieldAlert, KeyRound, ArrowRight, AlertTriangle, History, ExternalLink } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalAmount: number;
  auditLog?: AuditLog;
  initialMode?: 'form' | 'failure_statement';
  onPaymentSuccess: (paymentId: string) => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  cart,
  totalAmount,
  auditLog,
  initialMode = 'form',
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'gpay' | 'card' | 'paypal'>('card');
  const [cardName, setCardName] = useState('Jane Doe');
  const [cardNumber, setCardNumber] = useState('4111 •••• •••• 1111');
  const [expMonth, setExpMonth] = useState('12');
  const [expYear, setExpYear] = useState('2028');
  const [cvv, setCvv] = useState('123');

  // Bank Account & UPI State (Exact user provided SBI A/C & IFSC)
  const accountNumber = '42195510119';
  const ifscCode = 'SBIN0001868';
  const bankName = 'State Bank of India (SBI)';
  const customVpa = `${accountNumber}@${ifscCode}.ifsc.npci`;

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(299); // 04:59 mins
  const [isQrLoading, setIsQrLoading] = useState(false);

  // OTP & Mode Step State
  const [modalStep, setModalStep] = useState<'form' | 'otp' | 'success' | 'failure_statement'>(initialMode);
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const demoOtp = '984210';
  const [otpTimer, setOtpTimer] = useState(45);

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [webhookLog, setWebhookLog] = useState<string | null>(null);

  // Reset modal state whenever it opens for a new payment session!
  useEffect(() => {
    if (isOpen) {
      setModalStep(initialMode);
      setOtpValue('');
      setOtpError('');
      setIsProcessing(false);
      setPaymentId('');
      setWebhookLog(null);
    }
  }, [isOpen, initialMode]);

  // Countdown timer for UPI QR Code & OTP Resend
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCloseAndReset = () => {
    soundFx.playClick();
    setModalStep('form');
    setOtpValue('');
    setOtpError('');
    setIsProcessing(false);
    setPaymentId('');
    setWebhookLog(null);
    onClose();
  };

  // Real NPCI Valid UPI Intent URL format for Bank Account + IFSC
  const formattedAmount = totalAmount.toFixed(2);
  const upiIntentString = `upi://pay?pa=${encodeURIComponent(customVpa)}&pn=${encodeURIComponent('RapierPay Merchant')}&am=${formattedAmount}&cu=INR&tn=${encodeURIComponent('AP2 Agentic Mandate')}`;

  // High-Resolution 100% Valid Scannable QR Code Image
  const realQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(upiIntentString)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(customVpa);
    setCopiedUpi(true);
    soundFx.playClick();
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Click "Pay" handler
  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    if (selectedMethod === 'card') {
      // For Card payments, open the 3DS 2.0 OTP verification step!
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setModalStep('otp');
        setOtpValue('984210'); // Pre-filled demo OTP for ease of testing
      }, 700);
    } else {
      // For UPI or PayPal, direct capture simulation
      executeFinalCapture();
    }
  };

  // Submit OTP Verification
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    if (otpValue.trim() !== demoOtp && otpValue.trim() !== '123456') {
      setOtpError('Invalid OTP code. Please enter 984210.');
      soundFx.playAlert();
      return;
    }

    setOtpError('');
    setIsProcessing(true);

    setTimeout(() => {
      executeFinalCapture();
    }, 1200);
  };

  const executeFinalCapture = () => {
    const generatedId = `pay_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
    setPaymentId(generatedId);
    setIsProcessing(false);
    setModalStep('success');
    soundFx.playSuccess();

    const webhookData = JSON.stringify(
      {
        event: 'payment.captured',
        account_id: 'acc_RAPIER_AGENTIC_MERCHANT',
        contains: ['payment'],
        payload: {
          payment: {
            entity: {
              id: generatedId,
              amount: Math.round(totalAmount * 100),
              currency: 'INR',
              status: 'captured',
              order_id: `order_${Math.random().toString(36).substring(2, 10)}`,
              method: selectedMethod === 'gpay' ? 'upi' : selectedMethod,
              card_name: selectedMethod === 'card' ? cardName : undefined,
              three_ds_authenticated: selectedMethod === 'card' ? true : undefined,
              bank_details: selectedMethod === 'gpay' ? {
                bank: bankName,
                account_number: accountNumber,
                ifsc: ifscCode,
                vpa: customVpa
              } : undefined,
              acp_agent_id: auditLog?.agentId || 'AI-BUYER-AGENT',
              explainability_hash: auditLog?.auditHash || '0x99f0...11a2'
            }
          }
        }
      },
      null,
      2
    );
    setWebhookLog(webhookData);

    onPaymentSuccess(generatedId);
  };

  // Bank Statements Data
  const statementHistory = [
    { id: 'pay_9X2K7L8M11', title: 'Card 3DS 2.0 Auth', amount: '₹12,749.15', status: 'CAPTURED', type: 'SUCCESS' },
    { id: 'fail_88F10A9B', title: '504 UPI Gateway Timeout', amount: '₹14,999.00', status: 'ROLLED_BACK', type: 'FAILURE' },
    { id: 'block_771C90A', title: 'Single Txn Limit Over-Cap', amount: '₹75,000.00', status: 'POLICY_BLOCKED', type: 'BLOCKED' },
    { id: 'pay_POS_77A81B', title: 'POS Hardware Bundle', amount: '₹18,799.00', status: 'CAPTURED', type: 'SUCCESS' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative border border-[#DFDBCF] my-8 font-sans">
        
        {/* Top Header Row */}
        <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-[#F0EDE2]">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-[#111827] font-serif tracking-tight">
              {modalStep === 'otp'
                ? '3D Secure OTP Authentication'
                : modalStep === 'success'
                ? 'Payment Accepted'
                : modalStep === 'failure_statement'
                ? 'Simulated Failure & Bank Statement'
                : 'Choose a payment method'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {modalStep === 'otp'
                ? 'Enter the 6-digit OTP sent by your bank to authorize payment.'
                : modalStep === 'success'
                ? 'Your transaction has been verified and captured successfully.'
                : modalStep === 'failure_statement'
                ? `Statement & Failure Audit Logs for SBI Account #${accountNumber} (IFSC: ${ifscCode})`
                : `Linked to SBI Account #${accountNumber} (IFSC: ${ifscCode}) for 100% valid UPI scanning.`}
            </p>
          </div>

          <button
            onClick={handleCloseAndReset}
            className="p-2 rounded-full bg-[#F8F6F0] hover:bg-[#EBE8DD] text-gray-600 transition-colors border border-[#DFDBCF]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount & AP2 Status Banner */}
        <div className="px-6 sm:px-8 py-3 bg-[#F8F6F0] border-b border-[#F0EDE2] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-gray-500">PAYABLE TOTAL:</span>
            <span className="font-extrabold text-lg text-[#111827] font-serif">
              ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>AP2 Policy Passed ({cart.length} items)</span>
          </div>
        </div>

        {/* STEP 1: FORM SELECTION */}
        {modalStep === 'form' && (
          <form onSubmit={handleInitiatePayment} className="p-6 sm:p-8 space-y-6">
            
            {/* OPTION 1: CARD PAYMENT (WITH OTP FLOW) */}
            <div className="space-y-4">
              <div
                onClick={() => setSelectedMethod('card')}
                className="flex items-center justify-between cursor-pointer py-1 border-b border-gray-100 pb-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'card' ? 'border-[#111827] bg-[#111827]' : 'border-gray-300'}`}>
                    {selectedMethod === 'card' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <span className="font-extrabold text-sm text-[#111827]">Credit / Debit Card (3DS 2.0 OTP)</span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">VISA</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">MC</span>
                </div>
              </div>

              {selectedMethod === 'card' && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <label className="block text-xs font-extrabold text-[#111827]">
                      Name on card <span className="text-red-500">*</span>
                    </label>
                    <p className="text-[11px] text-gray-500">Make sure to enter the full name that's on your card.</p>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#111827] text-xs font-semibold text-[#111827] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-extrabold text-[#111827]">
                      Card number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        className="w-full pl-12 pr-10 py-2.5 rounded-xl border border-gray-300 focus:border-[#111827] text-xs font-mono font-bold text-[#111827] outline-none"
                      />
                      <span className="absolute left-3 top-2.5 px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 font-mono text-[9px] font-bold">
                        VISA
                      </span>
                      <Lock className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-extrabold text-[#111827]">Expiration date *</label>
                      <div className="flex gap-2">
                        <select
                          value={expMonth}
                          onChange={(e) => setExpMonth(e.target.value)}
                          className="flex-1 px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-mono font-bold text-[#111827] outline-none"
                        >
                          <option value="01">01</option>
                          <option value="12">12</option>
                        </select>
                        <select
                          value={expYear}
                          onChange={(e) => setExpYear(e.target.value)}
                          className="flex-1 px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-mono font-bold text-[#111827] outline-none"
                        >
                          <option value="2026">2026</option>
                          <option value="2028">2028</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-extrabold text-[#111827]">Security code (CVV) *</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono font-bold text-[#111827] outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 px-6 rounded-full bg-[#111827] hover:bg-black text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Connecting to Bank 3DS Gateway...</span>
                      </>
                    ) : (
                      <span>Review & Pay ₹{totalAmount.toLocaleString('en-IN')} (Request 3DS OTP)</span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* OPTION 2: GOOGLE PAY / UPI WITH LINKED SBI BANK ACCOUNT SCANNER */}
            <div className="space-y-4 border-t border-gray-100 pt-4">
              <div
                onClick={() => setSelectedMethod('gpay')}
                className="flex items-center justify-between cursor-pointer py-1"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'gpay' ? 'border-[#111827] bg-[#111827]' : 'border-gray-300'}`}>
                    {selectedMethod === 'gpay' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <span className="font-extrabold text-sm text-[#111827]">Pay via UPI (SBI A/C Linked)</span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">G Pay</span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">PhonePe</span>
                </div>
              </div>

              {selectedMethod === 'gpay' && (
                <div className="space-y-5 pt-2">
                  <div className="p-6 rounded-2xl bg-[#F8F6F0] border border-[#DFDBCF] text-center space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono border-b border-[#DFDBCF] pb-2 text-gray-600">
                      <span className="flex items-center gap-1.5 font-bold text-[#111827]">
                        <QrCode className="w-4 h-4 text-emerald-600 animate-pulse" />
                        VALID UPI SCANNER (SBI BANK LINKED)
                      </span>
                      <span className="text-amber-800 font-bold">
                        Expires: {formatTimer(timerSeconds)}
                      </span>
                    </div>

                    <div className="relative w-52 h-52 mx-auto bg-white p-3 rounded-2xl border-2 border-[#111827] shadow-xl flex flex-col items-center justify-center">
                      <img
                        src={realQrCodeUrl}
                        alt={`Scan to Pay ₹${formattedAmount}`}
                        onLoad={() => setIsQrLoading(false)}
                        className="w-full h-full object-contain rounded-lg"
                      />
                      {isQrLoading && (
                        <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                          <RefreshCw className="w-6 h-6 animate-spin text-[#111827]" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="text-base font-extrabold text-[#111827] font-serif">
                        Scan & Pay ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                      <p className="text-[11px] text-gray-600 font-sans font-medium">
                        Scan with <strong className="text-black">Google Pay, PhonePe, Paytm, BHIM or Cred</strong>
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#DFDBCF] space-y-2 text-xs text-left font-mono">
                      <div className="flex items-center gap-2 border-b border-gray-100 pb-2 text-[#111827] font-bold">
                        <Landmark className="w-4 h-4 text-emerald-600" />
                        <span>LINKED BANK ACCOUNT DETAILS</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-gray-500 block">Bank Name:</span>
                          <span className="font-bold text-[#111827]">{bankName}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">IFSC Code:</span>
                          <span className="font-bold text-emerald-700">{ifscCode}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <Smartphone className="w-3.5 h-3.5 text-gray-500" />
                          <span className="text-gray-500 text-[10px]">NPCI VPA:</span>
                          <span className="font-bold text-[#111827] text-[10px]">{customVpa}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="px-2.5 py-1 rounded-lg bg-[#F8F6F0] hover:bg-[#EBE8DD] border border-[#DFDBCF] text-[#111827] text-[10px] font-bold flex items-center gap-1 transition-colors"
                        >
                          {copiedUpi ? <CheckCheck className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full shine-btn-lemon text-[#111827] font-mono font-black py-3.5 px-6 rounded-full text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#111827] border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying UPI Payment...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Simulate Approved Scan & Pay (₹{totalAmount.toLocaleString('en-IN')})</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* OPTION 3: PAYPAL */}
            <div
              onClick={() => setSelectedMethod('paypal')}
              className="flex items-center justify-between cursor-pointer py-3 border-t border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'paypal' ? 'border-[#111827] bg-[#111827]' : 'border-gray-300'}`}>
                  {selectedMethod === 'paypal' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="font-extrabold text-sm text-[#111827]">Pay with PayPal</span>
              </div>
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                PayPal
              </span>
            </div>
          </form>
        )}

        {/* STEP 2: 3D SECURE 2.0 OTP VERIFICATION SCREEN */}
        {modalStep === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="p-6 sm:p-8 space-y-6 font-sans">
            <div className="p-5 rounded-2xl bg-[#F8F6F0] border border-[#DFDBCF] space-y-4">
              <div className="flex items-center gap-3 border-b border-[#DFDBCF] pb-3">
                <div className="p-2 rounded-xl bg-[#111827] text-[#EAF852]">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#111827]">Bank 3DS 2.0 OTP Verification</h3>
                  <p className="text-[11px] text-gray-500 font-mono">Issued by State Bank of India Gateway</p>
                </div>
              </div>

              <div className="text-xs text-gray-700 space-y-1">
                <p>
                  A 6-digit One-Time Password (OTP) has been generated for cardholder <strong className="text-black">{cardName}</strong> ({cardNumber}).
                </p>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-mono text-[11px] flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold">
                    <KeyRound className="w-4 h-4 text-amber-700" />
                    DEMO OTP CODE: <span className="text-sm font-black tracking-widest bg-white px-2 py-0.5 rounded border border-amber-300">{demoOtp}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpValue(demoOtp);
                      soundFx.playClick();
                    }}
                    className="text-[10px] font-bold text-amber-900 underline hover:text-black"
                  >
                    Auto-Fill OTP
                  </button>
                </div>
              </div>

              {/* 6-DIGIT OTP INPUT FIELD */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-extrabold text-[#111827]">
                  Enter 6-Digit OTP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpValue}
                  onChange={(e) => {
                    setOtpValue(e.target.value);
                    setOtpError('');
                  }}
                  required
                  placeholder="984210"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#111827] text-center text-lg font-mono font-black tracking-widest text-[#111827] outline-none shadow-sm"
                />

                {otpError && (
                  <p className="text-xs text-red-600 font-bold font-mono text-center">{otpError}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-gray-500 pt-1">
                <span>Resend OTP in: <strong className="text-[#111827]">00:{String(otpTimer).padStart(2, '0')}s</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setOtpTimer(45);
                    soundFx.playClick();
                  }}
                  className="text-gray-700 hover:text-black font-bold underline text-[11px]"
                >
                  Resend OTP Code
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full shine-btn-lemon text-[#111827] font-mono font-black py-3.5 px-6 rounded-full text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#111827] border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying OTP & AP2 Mandate Token...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Authorize Payment (₹{totalAmount.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setModalStep('form')}
                className="w-full py-2.5 text-xs text-gray-600 font-bold hover:underline"
              >
                ← Back to Payment Methods
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SIMULATED FAILURE STATEMENT & PAYMENT HISTORY MODE */}
        {modalStep === 'failure_statement' && (
          <div className="p-6 sm:p-8 space-y-6 font-sans">
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-600 text-white">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-amber-950">504 UPI Gateway Timeout Statement</h3>
                    <p className="text-[11px] font-mono text-amber-800">SBI A/C #{accountNumber} (IFSC: {ifscCode})</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 font-mono text-[10px] font-bold">
                  STATE ROLLED BACK
                </span>
              </div>

              {/* Statement Explanation Note */}
              <div className="text-xs text-amber-900 font-mono leading-relaxed space-y-2">
                <div className="font-bold">FAILURE STATEMENT DETAILS:</div>
                <p className="p-3 rounded-xl bg-white border border-amber-200 text-[11px] text-gray-800">
                  RapierPay UPI API captured a 504 Timeout event on SBI Account #42195510119. Agent auto-executed state rollback with zero double debit. Generated fallback NetBanking link.
                </p>
              </div>

              {/* Fallback Backup NetBanking Link Box */}
              <div className="p-3 rounded-xl bg-white border border-amber-300 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 truncate pr-2">
                  <ExternalLink className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="text-gray-500 text-[10px]">BACKUP RAIL:</span>
                  <span className="font-bold text-[#111827] text-[10px] truncate">https://pay.rapierpay.com/fallback/netbanking?token=netb_901x</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playSuccess();
                    setModalStep('form');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-950 text-[10px] font-bold whitespace-nowrap shadow-sm"
                >
                  Pay via Fallback
                </button>
              </div>
            </div>

            {/* PAYMENT STATEMENT HISTORY TABLE */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#111827]">
                <span className="flex items-center gap-1.5">
                  <History className="w-4 h-4 text-gray-600" />
                  STATEMENT TRANSACTION HISTORY:
                </span>
                <span className="text-gray-500 font-normal">SBI A/C #{accountNumber}</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 font-mono text-xs">
                {statementHistory.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-[#F8F6F0] border border-[#DFDBCF] flex items-center justify-between shadow-sm">
                    <div>
                      <div className="font-bold text-[#111827]">{item.title}</div>
                      <div className="text-[10px] text-gray-500">Ref: {item.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#111827]">{item.amount}</div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.type === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : item.type === 'FAILURE' ? 'bg-amber-100 text-amber-900' : 'bg-gray-200 text-gray-800'}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleCloseAndReset}
              className="w-full shine-btn-lemon text-[#111827] font-black py-3.5 px-6 rounded-full text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Close Statement & Return</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 4: PAYMENT ACCEPTED & CAPTURED RECEIPT SCREEN */}
        {modalStep === 'success' && (
          <div className="p-8 space-y-6 font-sans">
            {/* Animated Canary Lemon Payment Accepted Header */}
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#EAF852] border-2 border-[#D6F038] text-[#111827] flex items-center justify-center shadow-xl animate-bounce">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-extrabold border border-emerald-300">
                  ✓ 3DS 2.0 AUTHENTICATION PASSED
                </div>
                <h3 className="text-3xl font-black text-[#111827] font-serif">Payment Accepted!</h3>
                <p className="text-xs text-gray-500">
                  Transaction Authorized & Captured on RapierPay AP2 Protocol Engine
                </p>
              </div>
            </div>

            {/* Transaction Receipt Breakdown Box */}
            <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#DFDBCF] space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-[#DFDBCF] pb-2 text-gray-600">
                <span>Payment ID:</span>
                <span className="font-bold text-[#111827]">{paymentId}</span>
              </div>

              <div className="flex justify-between border-b border-[#DFDBCF] pb-2 text-gray-600">
                <span>Payment Method:</span>
                <span className="font-bold text-[#111827] uppercase">{selectedMethod === 'card' ? `Card (${cardName})` : selectedMethod}</span>
              </div>

              <div className="flex justify-between border-b border-[#DFDBCF] pb-2 text-gray-600">
                <span>Amount Paid:</span>
                <span className="font-extrabold text-sm text-[#111827] font-serif">
                  ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Status:</span>
                <span className="font-bold text-emerald-700">CAPTURED & SETTLED</span>
              </div>
            </div>

            {/* Instant Webhook Log Output */}
            {webhookLog && (
              <div className="text-left space-y-1.5">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
                  REAL-TIME RAPIERPAY WEBHOOK DISPATCHED:
                </span>
                <div className="p-4 rounded-2xl bg-[#181A20] text-emerald-400 border border-[#333745] text-[10px] font-mono overflow-x-auto max-h-40 leading-relaxed shadow-inner">
                  <pre>{webhookLog}</pre>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleCloseAndReset}
                className="flex-1 shine-btn-lemon text-[#111827] font-black py-3.5 px-6 rounded-full text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Return to Dashboard & Reset Modal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
