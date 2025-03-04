import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { sepolia, mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

export const config = createConfig(
  getDefaultConfig({
    appName: 'ConnectKit Next.js demo',
    chains: [sepolia, mainnet, polygon, optimism, arbitrum],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}