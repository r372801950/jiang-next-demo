'use client';
import { useEffect, useState } from "react";
import { ConnectKitButton } from "connectkit";
import {useAccount, useBalance, useReadContract, useWaitForTransactionReceipt, useWriteContract} from "wagmi";
import { parseEther, formatEther } from "viem";
import { sepolia } from "wagmi/chains";
import {
  Loader2, Wallet, ArrowDownToLine, ArrowUpFromLine, DatabaseIcon,
  RefreshCw, AlertCircle
} from "lucide-react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@abis/testContract";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: txHash });

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
    account: address,
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

  // 读取用户钱包余额
  const {
    data: walletBalance,
    refetch: refetchWalletBalance
  } = useBalance({
    address,
    chainId: sepolia.id,
  });

  // 交易提交后立即显示提交状态
  useEffect(() => {
    if (txHash && !isConfirmed) {
      toast.info("交易已提交", {
        description: "等待区块确认中...",
        duration: 5000
      });
    }
  }, [txHash, isConfirmed]);

  // 存款成功后刷新余额
  useEffect(() => {
    if (isConfirmed) {
      console.log("交易已确认，刷新余额");
      refetchBalance();
      refetchTotalBalance();
      refetchWalletBalance();
      // 清空输入框
      setDepositAmount("");
      setWithdrawAmount("");
      // 新代码：
      toast.success("交易成功", {
        description: "您的余额已更新",
        action: {
          label: "关闭",
          onClick: () => console.log("关闭"),
        },
      });
    }
  }, [isConfirmed, refetchBalance, refetchTotalBalance, refetchWalletBalance]);

  // 显示交易错误
  useEffect(() => {
    if (txError) {
      // 新代码：
      toast.error("交易失败", {
        description: txError.message,
        action: {
          label: "重试",
          onClick: () => console.log("重试"),
        },
      });
    }
  }, [txError]);

  // 处理存款
  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast.error("输入错误", {
        description: "请输入有效的存款金额",
        action: {
          label: "重试",
          onClick: () => console.log("重试"),
        },
      });
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
      toast.error("输入错误", {
        description: "请输入有效的提款金额",
        action: {
          label: "重试",
          onClick: () => console.log("重试"),
        },
      });
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

  // 格式化余额显示
  const formatBalance = (bal:unknown) => {
    if (bal !== undefined && bal !== null) {
      return formatEther(BigInt(bal.toString()));
    }
    return "0";
  };

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col items-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">TestDeposit</h1>
          <p className="text-muted-foreground">区块链存款与提款示例</p>
        </div>

        {isConnected ? (
          <>
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>余额信息</CardTitle>
                <CardDescription>查看您在合约中的存款情况</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">您的钱包余额:</span>
                  <div className="flex items-center gap-2">
                    {!walletBalance ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <Badge variant="default" className="font-mono text-lg">
                        {formatEther(walletBalance.value)} ETH
                      </Badge>
                    )}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">您的合约存款:</span>
                  <div className="flex items-center gap-2">
                    {isBalanceLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <Badge variant="outline" className="font-mono text-lg">
                        {formatBalance(balance)} ETH
                      </Badge>
                    )}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">合约总存款:</span>
                  <div className="flex items-center gap-2">
                    {isTotalBalanceLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <Badge variant="secondary" className="font-mono text-lg">
                        {formatBalance(totalBalance)} ETH
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    refetchBalance();
                    refetchTotalBalance();
                    refetchWalletBalance();
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  刷新余额
                </Button>
              </CardFooter>
            </Card>

            <Tabs defaultValue="deposit" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="deposit">存款</TabsTrigger>
                <TabsTrigger value="withdraw">提款</TabsTrigger>
                <TabsTrigger value="owner">全额提取</TabsTrigger>
              </TabsList>

              <TabsContent value="deposit">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ArrowDownToLine className="h-5 w-5 mr-2 text-green-500" />
                      存款 ETH
                    </CardTitle>
                    <CardDescription>存入资金到智能合约</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        type="number"
                        step="0.0001"
                        min="0"
                        placeholder="输入 ETH 数量"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={handleDeposit}
                      disabled={isTxPending || isConfirming}
                    >
                      {isTxPending || isConfirming ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          处理中...
                        </>
                      ) : (
                        "确认存款"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="withdraw">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ArrowUpFromLine className="h-5 w-5 mr-2 text-red-500" />
                      提款 ETH
                    </CardTitle>
                    <CardDescription>从智能合约中提取资金</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        type="number"
                        step="0.0001"
                        min="0"
                        placeholder="输入 ETH 数量"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleWithdraw}
                      disabled={isTxPending || isConfirming}
                    >
                      {isTxPending || isConfirming ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          处理中...
                        </>
                      ) : (
                        "确认提款"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="owner">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DatabaseIcon className="h-5 w-5 mr-2 text-purple-500" />
                      全额提取
                    </CardTitle>
                    <CardDescription>一次性提取您在合约中的所有资金</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>注意</AlertTitle>
                      <AlertDescription>
                        此操作将提取您在合约中的全部余额。操作无法撤销。
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleOwnerWithdraw}
                      disabled={isTxPending || isConfirming}
                    >
                      {isTxPending || isConfirming ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          处理中...
                        </>
                      ) : (
                        "提取全部资金"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>欢迎使用</CardTitle>
              <CardDescription>请连接您的钱包以继续</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>未连接钱包</AlertTitle>
                <AlertDescription>
                  您需要连接以太坊钱包才能使用此应用程序的功能。
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}