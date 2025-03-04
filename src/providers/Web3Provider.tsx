// src/providers/Web3Provider.tsx
'use client'

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import {useState} from "react";

const config = createConfig(
  getDefaultConfig({
    // 保持原有配置
    chains: [mainnet],
    transports: {
      [mainnet.id]: http(
        `https://mainnet.infura.io/v3/98064ca1c1c04949b93f61ef466c7f15`,
      ),
    },
    walletConnectProjectId: "54b71bc841c7f8a39dfe10dbdd194b0f",
    appName: "Your App Name",
    appDescription: "Your App Description",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",
  }),
);

// 在客户端创建查询客户端
// 使用React状态来确保每个请求使用新的查询客户端实例
export function Web3Provider({ children }: { children: React.ReactNode }) {
  // 使用useState确保在服务器端不会有副作用
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}