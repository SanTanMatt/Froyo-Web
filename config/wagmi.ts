import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';
import { createStorage } from 'wagmi';

// Custom storage that only uses localStorage on client side
const storage = createStorage({
  storage: typeof window !== 'undefined' ? localStorage : undefined,
});

export const config = getDefaultConfig({
  appName: 'Froyo Tracker',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [base, baseSepolia],
  ssr: true,
  storage,
});