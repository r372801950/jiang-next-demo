// 合约地址和 ABI 保持不变
export const CONTRACT_ADDRESS = '0x691fc97eE78F1d88789293aCc08e02E40b32c72D' // 替换为你的合约地址

export const CONTRACT_ABI = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "payable",
    inputs: [],
    outputs: [],
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_num", type: "uint256" }],
    outputs: [],
  },
  {
    name: "ownerWithdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    name: "getBalance",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "userBalances",
    type: "mapping",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "totalBalance",
    type: "function",//大重点 Solidity 的公共变量会自动生成 getter 函数
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "event",
    name: "Deposit",
    inputs: [
      { indexed: true, name: "_user", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
  },
  {
    type: "event",
    name: "Withdraw",
    inputs: [
      { indexed: true, name: "_user", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
  },
];