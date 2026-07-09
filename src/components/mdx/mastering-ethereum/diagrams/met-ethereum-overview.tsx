"use client";

export function MetEthereumOverviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="以太坊概览：世界计算机架构与核心组件">
      <defs>
        <linearGradient id="met-eo-eth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#627eea" />
          <stop offset="100%" stopColor="#4c53d4" />
        </linearGradient>
        <linearGradient id="met-eo-layer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="met-eo-state" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="met-eo-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">以太坊：世界计算机</text>

      {/* 顶层：设计目标 */}
      <rect x="40" y="56" width="720" height="50" rx="10" fill="url(#met-eo-eth)" opacity="0.1" stroke="#627eea" strokeWidth="1.5" />
      <text x="400" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3730a3">设计目标：去中心化的图灵完备智能合约平台</text>
      <text x="400" y="96" textAnchor="middle" fontSize="11" fill="#475569">在比特币之上扩展可编程性，让区块链成为「世界计算机」</text>

      {/* 中间：四层架构 */}
      <text x="400" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">以太坊四层架构</text>

      <rect x="40" y="144" width="720" height="44" rx="8" fill="url(#met-eo-layer)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="70" y="162" fontSize="12" fontWeight="700" fill="#1e40af">应用层</text>
      <text x="70" y="180" fontSize="10" fill="#475569">DApp / DeFi / NFT / DAO——用户与合约交互的入口</text>
      <text x="700" y="170" fontSize="10" fill="#1e40af">ch8</text>

      <rect x="40" y="196" width="720" height="44" rx="8" fill="url(#met-eo-eth)" opacity="0.12" stroke="#627eea" strokeWidth="1.5" />
      <text x="70" y="214" fontSize="12" fontWeight="700" fill="#3730a3">合约层</text>
      <text x="70" y="232" fontSize="10" fill="#475569">Solidity / EVM 字节码 / ERC 标准——可编程逻辑</text>
      <text x="700" y="222" fontSize="10" fill="#3730a3">ch5-7</text>

      <rect x="40" y="248" width="720" height="44" rx="8" fill="url(#met-eo-state)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="70" y="266" fontSize="12" fontWeight="700" fill="#065f46">执行层</text>
      <text x="70" y="284" fontSize="10" fill="#475569">EVM / 状态转换 / Gas 计量——交易处理引擎</text>
      <text x="700" y="274" fontSize="10" fill="#065f46">ch4</text>

      <rect x="40" y="300" width="720" height="44" rx="8" fill="url(#met-eo-eth)" opacity="0.08" stroke="#627eea" strokeWidth="1.5" />
      <text x="70" y="318" fontSize="12" fontWeight="700" fill="#3730a3">共识层</text>
      <text x="70" y="336" fontSize="10" fill="#475569">PoS 权益证明 / 验证者 / 区块产出——去中心化共识</text>
      <text x="700" y="326" fontSize="10" fill="#3730a3">ch1</text>

      {/* 核心概念三栏 */}
      <text x="400" y="370" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三大核心概念</text>

      <rect x="40" y="384" width="230" height="110" rx="10" fill="url(#met-eo-layer)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="406" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">账户模型</text>
      <text x="155" y="426" textAnchor="middle" fontSize="10" fill="#475569">EOA 外部账户</text>
      <text x="155" y="442" textAnchor="middle" fontSize="10" fill="#475569">CA 合约账户</text>
      <text x="155" y="458" textAnchor="middle" fontSize="10" fill="#475569">账户状态：余额+Nonce</text>
      <text x="155" y="480" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">vs 比特币 UTXO</text>

      <rect x="285" y="384" width="230" height="110" rx="10" fill="url(#met-eo-eth)" opacity="0.1" stroke="#627eea" strokeWidth="1.5" />
      <text x="400" y="406" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3730a3">智能合约</text>
      <text x="400" y="426" textAnchor="middle" fontSize="10" fill="#475569">图灵完备逻辑</text>
      <text x="400" y="442" textAnchor="middle" fontSize="10" fill="#475569">自动执行代码</text>
      <text x="400" y="458" textAnchor="middle" fontSize="10" fill="#475569">不可篡改部署</text>
      <text x="400" y="480" textAnchor="middle" fontSize="9" fontWeight="600" fill="#627eea">可编程价值</text>

      <rect x="530" y="384" width="230" height="110" rx="10" fill="url(#met-eo-state)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="645" y="406" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">状态机</text>
      <text x="645" y="426" textAnchor="middle" fontSize="10" fill="#475569">全局状态树</text>
      <text x="645" y="442" textAnchor="middle" fontSize="10" fill="#475569">交易驱动转换</text>
      <text x="645" y="458" textAnchor="middle" fontSize="10" fill="#475569">默克尔帕特里夏树</text>
      <text x="645" y="480" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">世界状态</text>

      {/* 底部：以太坊 vs 比特币 */}
      <rect x="40" y="510" width="720" height="50" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="530" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">以太坊 vs 比特币</text>
      <text x="400" y="548" textAnchor="middle" fontSize="10" fill="#475569">账户模型 vs UTXO / 图灵完备 vs 脚本受限 / PoS vs PoW / 智能合约 vs 价值存储</text>
    </svg>
  );
}
