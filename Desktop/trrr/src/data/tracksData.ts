export interface TrackInfo {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'active' | 'upcoming' | 'completed';
  tags: string[];
}

export const tracksData: TrackInfo[] = [
  {
    id: 'track-01',
    number: '01',
    title: 'AI Growth & Agentic Commerce',
    subtitle: 'RapierPay AP2 Protocol & Revenue Optimizer Engine',
    description: 'Build an agent that grows revenue for a merchant on RapierPay test-mode APIs, or that makes a merchant transactable by an AI buyer end to end.',
    status: 'active',
    tags: ['ACP Protocol', 'AP2 Mandates', 'Schema.org JSON-LD', 'Margin Upsell', '3DS 2.0 OTP']
  }
];
