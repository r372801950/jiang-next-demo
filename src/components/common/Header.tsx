// src/components/common/Header.tsx
'use client'
import { useState } from "react";
import { Wallet, Home } from "lucide-react";
import {ConnectKitButton} from "connectkit";

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // 这里添加实际的钱包连接逻辑
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* 左侧 Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-gray-800">
              www.yidengfe.com
            </a>
          </div>

          {/* 中间导航 */}
          <nav className="flex items-center space-x-8">
            <a
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-5 h-5 mr-1" />
              <span>首页</span>
            </a>
            <a
              href="/blog"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Wallet className="w-5 h-5 mr-1" />
              <span>Blog</span>
            </a>
          </nav>
          <div className="flex items-center">
            <ConnectKitButton />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
