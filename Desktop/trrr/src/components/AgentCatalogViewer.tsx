import React, { useState } from 'react';
import { mockProducts } from '../data/mockData';
import { Code2, Copy, Check, Terminal, Cpu } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const AgentCatalogViewer: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const handleCopy = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    soundFx.playClick();
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const jsonLdData = JSON.stringify(
    {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: selectedProduct.name,
      image: selectedProduct.image,
      description: selectedProduct.description,
      sku: selectedProduct.sku,
      gtin: selectedProduct.acpSchema.machineReadableSpec.gtin,
      offers: {
        '@type': 'Offer',
        url: `https://api.rapierpay.com/v1/checkout?sku=${selectedProduct.sku}`,
        priceCurrency: 'INR',
        price: selectedProduct.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability: selectedProduct.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        acpProtocolVersion: 'ACP/2026.1',
        agenticCapability: selectedProduct.acpSchema.agentCapability,
        eligibleDiscounts: selectedProduct.acpSchema.offers.eligibleDiscounts
      }
    },
    null,
    2
  );

  const curlExample = `curl -X GET "https://api.rapierpay.com/v1/agentic/catalog" \\
  -H "Accept: application/json+acp" \\
  -H "X-402-Pay-Rail: RapierPay-AP2" \\
  -H "Authorization: Bearer agent_token_demo_9801"`;

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="shine-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFDBCF] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#111827] text-[#EAF852] flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#111827] font-serif">Machine-Readable ACP Catalog API Spec</h1>
              <p className="text-xs text-gray-500 font-mono">Standard JSON-LD schema for AI buyer agents & x402 HTTP headers</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              ACP/2026.1 ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Product Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-3 font-mono">
          <span className="text-xs text-gray-500 font-bold px-1 uppercase tracking-wider">Select Product SKU:</span>
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
                  <span>SKU: {prod.sku}</span>
                  <span className="font-bold">₹{prod.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right JSON-LD & Header Viewer (8 Cols) */}
        <div className="lg:col-span-8 space-y-4 font-mono">
          {/* JSON-LD Editor Panel */}
          <div className="shine-card rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#DFDBCF] pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                <Terminal className="w-4 h-4" />
                <span>JSON-LD SCHEMA.ORG OUTPUT ({selectedProduct.sku})</span>
              </div>
              <button
                onClick={() => handleCopy(jsonLdData, 'json')}
                className="px-3 py-1 rounded-lg bg-white hover:bg-[#F2EFE6] border border-[#DFDBCF] text-[11px] font-bold flex items-center gap-1.5 transition-colors text-[#111827]"
              >
                {copiedFormat === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFormat === 'json' ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#181A20] text-emerald-400 border border-[#333745] text-xs overflow-x-auto max-h-80 leading-relaxed shadow-inner">
              <pre>{jsonLdData}</pre>
            </div>
          </div>

          {/* cURL Example Panel */}
          <div className="shine-card rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#DFDBCF] pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                <Cpu className="w-4 h-4 text-emerald-700" />
                <span>AGENT HTTP cURL HANDSHAKE SPEC</span>
              </div>
              <button
                onClick={() => handleCopy(curlExample, 'curl')}
                className="px-3 py-1 rounded-lg bg-white hover:bg-[#F2EFE6] border border-[#DFDBCF] text-[11px] font-bold flex items-center gap-1.5 transition-colors text-[#111827]"
              >
                {copiedFormat === 'curl' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFormat === 'curl' ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#181A20] text-sky-300 border border-[#333745] text-xs overflow-x-auto leading-relaxed shadow-inner">
              <pre>{curlExample}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
