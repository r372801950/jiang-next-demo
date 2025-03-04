'use client';
import {useEffect, useState} from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseEther, formatEther } from "viem";
import { sepolia } from "wagmi/chains";
import { LucideLoader2, LucideWallet } from "lucide-react";
import {CONTRACT_ABI, CONTRACT_ADDRESS} from "@abis/testContract";

// 主组件
export default function Home() {
  const { address, isConnected } = useAccount();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const {
    writeContract,
    isPending: isTxPending,
    data: txHash,
    error: txError
  } = useWriteContract();

  // 读取用户余额
  const {
    data: balance,
    error: balanceError,
    refetch: refetchBalance,
    isLoading: isBalanceLoading
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getBalance",
    chainId: sepolia.id,
    account: address, // 确保查询当前地址的余额
  });

  // 读取合约总余额
  const {
    data: totalBalance,
    error: totalBalanceError,
    refetch: refetchTotalBalance,
    isLoading: isTotalBalanceLoading
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "totalBalance",
    chainId: sepolia.id,
  });

  // 存款成功后刷新余额
  useEffect(() => {
    if (txHash) {
      console.log("存款交易哈希:", txHash);
      refetchBalance(); // 刷新用户余额
      refetchTotalBalance(); // 刷新总余额
    }
    if (txError) {
      console.error("交易错误:", txError.message);
    }
  }, [txHash, txError, refetchBalance, refetchTotalBalance]);

  // 处理存款
  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert("请输入有效的存款金额");
      return;
    }
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "deposit",
      value: parseEther(depositAmount),
    });
  };

  // 处理提款
  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert("请输入有效的提款金额");
      return;
    }
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "withdraw",
      args: [parseEther(withdrawAmount)],
    });
  };

  // 处理所有者提款
  const handleOwnerWithdraw = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "ownerWithdraw",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">TestDeposit 合约 UI</h1>

      {/* 钱包连接 */}
      <ConnectKitButton.Custom>
        {({ show, isConnected, truncatedAddress }) => (
          <button
            onClick={show}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <LucideWallet size={20} />
            {isConnected ? truncatedAddress : "连接钱包"}
          </button>
        )}
      </ConnectKitButton.Custom>

      {isConnected && (
        <div className="mt-6 w-full max-w-md space-y-6">
          {/* 余额显示区域 */}
          <div className="bg-white p-4 rounded-lg shadow">
            {/*
              修复 TS2345 错误：
              1. 检查 balance 是否存在
              2. 使用类型断言将 balance 转换为 bigint，因为 getBalance 返回 uint256
              3. 如果 balance 未定义，则显示 "0"
            */}
            {/*<p className="text-lg">
              你的合约余额:
              {balance !== undefined
                ? formatEther(BigInt(balance as string)) // 将 balance 转换为 bigint
                : "0"} ETH
            </p>
             同理处理 totalBalance
            <p className="text-lg">
              合约总余额:
              {totalBalance !== undefined
                ? formatEther(BigInt(totalBalance as string)) // 将 totalBalance 转换为 bigint
                : "0"} ETH
            </p>*/}
            <p className="text-lg">
              你的合约余额:
              {isBalanceLoading ? "加载中..." :
                balance !== undefined && balance !== null
                  ? formatEther(BigInt(balance.toString()))
                  : "0"} ETH
            </p>
            <p className="text-lg">
              合约总余额:
              {isTotalBalanceLoading ? "加载中..." :
                totalBalance !== undefined && totalBalance !== null
                  ? formatEther(BigInt(totalBalance.toString()))
                  : "0"} ETH
            </p>
          </div>

          {/* 存款部分 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">存款 ETH</h2>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="输入 ETH 数量"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleDeposit}
              disabled={isTxPending}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center"
            >
              {isTxPending ? (
                <LucideLoader2 className="animate-spin" size={20} />
              ) : (
                "存款"
              )}
            </button>
          </div>

          {/* 提款部分 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">提款 ETH</h2>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="输入 ETH 数量"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleWithdraw}
              disabled={isTxPending}
              className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 flex items-center justify-center"
            >
              {isTxPending ? (
                <LucideLoader2 className="animate-spin" size={20} />
              ) : (
                "提款"
              )}
            </button>
          </div>

          {/* 所有者提款部分 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">所有者提款</h2>
            <button
              onClick={handleOwnerWithdraw}
              disabled={isTxPending}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400 flex items-center justify-center"
            >
              {isTxPending ? (
                <LucideLoader2 className="animate-spin" size={20} />
              ) : (
                "提取全部 (仅限所有者)"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}