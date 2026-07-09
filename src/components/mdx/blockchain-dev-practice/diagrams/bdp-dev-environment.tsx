"use client";

export function BdpDevEnvironmentDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="区块链开发环境工具栈与数据流">
      <defs>
        <linearGradient id="bdp-de-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bdp-de-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bdp-de-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bdp-de-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bdp-de-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">开发环境工具栈</text>

      {/* 第一层：语言与运行时 */}
      <text x="400" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">语言与运行时</text>
      <rect x="120" y="76" width="150" height="50" rx="10" fill="url(#bdp-de-blue)" opacity="0.9" />
      <text x="195" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Node.js</text>
      <text x="195" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">JS 运行时 / npm</text>

      <rect x="325" y="76" width="150" height="50" rx="10" fill="url(#bdp-de-blue)" opacity="0.9" />
      <text x="400" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Solidity 编译器</text>
      <text x="400" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">solc / 版本管理</text>

      <rect x="530" y="76" width="150" height="50" rx="10" fill="url(#bdp-de-blue)" opacity="0.9" />
      <text x="605" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">TypeScript</text>
      <text x="605" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">类型安全脚本</text>

      <path d="M400 130 L400 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-de-arrow)" />

      {/* 第二层：开发框架 */}
      <text x="400" y="158" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">开发框架</text>
      <rect x="180" y="170" width="200" height="56" rx="10" fill="url(#bdp-de-purple)" opacity="0.9" />
      <text x="280" y="194" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Hardhat</text>
      <text x="280" y="214" textAnchor="middle" fontSize="10" fill="#ede9fe">编译 / 部署 / 测试网络</text>

      <rect x="420" y="170" width="200" height="56" rx="10" fill="url(#bdp-de-purple)" opacity="0.9" />
      <text x="520" y="194" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Foundry</text>
      <text x="520" y="214" textAnchor="middle" fontSize="10" fill="#ede9fe">Forge / Cast / 速度优先</text>

      <path d="M400 230 L400 238" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-de-arrow)" />

      {/* 第三层：本地链与钱包 */}
      <text x="400" y="258" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">本地链与钱包</text>
      <rect x="120" y="270" width="150" height="56" rx="10" fill="url(#bdp-de-amber)" opacity="0.9" />
      <text x="195" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Hardhat Node</text>
      <text x="195" y="314" textAnchor="middle" fontSize="10" fill="#fef3c7">本地分叉链</text>

      <rect x="325" y="270" width="150" height="56" rx="10" fill="url(#bdp-de-amber)" opacity="0.9" />
      <text x="400" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Anvil</text>
      <text x="400" y="314" textAnchor="middle" fontSize="10" fill="#fef3c7">Foundry 本地链</text>

      <rect x="530" y="270" width="150" height="56" rx="10" fill="url(#bdp-de-amber)" opacity="0.9" />
      <text x="605" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">MetaMask</text>
      <text x="605" y="314" textAnchor="middle" fontSize="10" fill="#fef3c7">浏览器钱包 / 签名</text>

      <path d="M400 330 L400 338" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-de-arrow)" />

      {/* 第四层：测试网与区块浏览器 */}
      <text x="400" y="358" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">测试网与浏览器</text>
      <rect x="180" y="370" width="200" height="56" rx="10" fill="url(#bdp-de-green)" opacity="0.9" />
      <text x="280" y="394" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Sepolia 测试网</text>
      <text x="280" y="414" textAnchor="middle" fontSize="10" fill="#d1fae5">公共测试网 / 水龙头</text>

      <rect x="420" y="370" width="200" height="56" rx="10" fill="url(#bdp-de-green)" opacity="0.9" />
      <text x="520" y="394" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Etherscan</text>
      <text x="520" y="414" textAnchor="middle" fontSize="10" fill="#d1fae5">区块浏览器 / 验证</text>

      {/* 底部数据流 */}
      <rect x="40" y="452" width="720" height="48" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="472" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">开发数据流</text>
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#475569">编写合约 → 框架编译 → 本地链调试 → 测试网验证 → 浏览器核查</text>
    </svg>
  );
}
