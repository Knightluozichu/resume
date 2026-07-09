"use client";

export function BpFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="全书复习：知识整合与工程闭环">
      <defs>
        <linearGradient id="bp-fr-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bp-fr-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bp-fr-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bp-fr-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bp-fr-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bp-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="140" height="56" rx="8" fill="url(#bp-fr-blue)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0-2 基础</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">概念+密码学</text>

      <path d="M162 102 L182 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-fr-arrow)" />

      <rect x="186" y="74" width="140" height="56" rx="8" fill="url(#bp-fr-purple)" opacity="0.9" />
      <text x="256" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 机制</text>
      <text x="256" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">共识+交易</text>

      <path d="M328 102 L348 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-fr-arrow)" />

      <rect x="352" y="74" width="140" height="56" rx="8" fill="url(#bp-fr-amber)" opacity="0.9" />
      <text x="422" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 应用</text>
      <text x="422" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">合约+钱包</text>

      <path d="M494 102 L514 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-fr-arrow)" />

      <rect x="518" y="74" width="140" height="56" rx="8" fill="url(#bp-fr-green)" opacity="0.9" />
      <text x="588" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch7-8 类型</text>
      <text x="588" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">链类型+应用</text>

      <path d="M660 102 L680 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-fr-arrow)" />

      <rect x="684" y="74" width="96" height="56" rx="8" fill="url(#bp-fr-red)" opacity="0.9" />
      <text x="732" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch9 整合</text>
      <text x="732" y="116" textAnchor="middle" fontSize="9" fill="#fecaca">知识闭环</text>

      {/* 四层统一视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四层统一视角</text>

      <rect x="20" y="176" width="185" height="150" rx="8" fill="url(#bp-fr-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="112" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">基础层</text>
      <text x="112" y="220" textAnchor="middle" fontSize="10" fill="#475569">区块链定义</text>
      <text x="112" y="236" textAnchor="middle" fontSize="10" fill="#475569">哈希 / 密码学</text>
      <text x="112" y="252" textAnchor="middle" fontSize="10" fill="#475569">非对称加密</text>
      <text x="112" y="268" textAnchor="middle" fontSize="10" fill="#475569">数字签名</text>
      <text x="112" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">定义信任基石</text>

      <rect x="217" y="176" width="185" height="150" rx="8" fill="url(#bp-fr-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">机制层</text>
      <text x="310" y="220" textAnchor="middle" fontSize="10" fill="#475569">共识机制</text>
      <text x="310" y="236" textAnchor="middle" fontSize="10" fill="#475569">PoW / PoS / DPoS</text>
      <text x="310" y="252" textAnchor="middle" fontSize="10" fill="#475569">交易与区块</text>
      <text x="310" y="268" textAnchor="middle" fontSize="10" fill="#475569">Merkle 树</text>
      <text x="310" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">定义共识规则</text>

      <rect x="414" y="176" width="185" height="150" rx="8" fill="url(#bp-fr-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="507" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">应用层</text>
      <text x="507" y="220" textAnchor="middle" fontSize="10" fill="#475569">智能合约</text>
      <text x="507" y="236" textAnchor="middle" fontSize="10" fill="#475569">钱包与账户</text>
      <text x="507" y="252" textAnchor="middle" fontSize="10" fill="#475569">Gas / EVM</text>
      <text x="507" y="268" textAnchor="middle" fontSize="10" fill="#475569">HD 钱包</text>
      <text x="507" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">定义应用能力</text>

      <rect x="611" y="176" width="169" height="150" rx="8" fill="url(#bp-fr-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="696" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">生态层</text>
      <text x="696" y="220" textAnchor="middle" fontSize="10" fill="#475569">公私联盟链</text>
      <text x="696" y="236" textAnchor="middle" fontSize="10" fill="#475569">DeFi / NFT</text>
      <text x="696" y="252" textAnchor="middle" fontSize="10" fill="#475569">跨链互操作</text>
      <text x="696" y="268" textAnchor="middle" fontSize="10" fill="#475569">监管合规</text>
      <text x="696" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">定义落地闭环</text>

      {/* 区块链设计决策链 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">区块链设计决策链</text>

      <rect x="20" y="364" width="120" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">场景分析</text>
      <text x="80" y="404" textAnchor="middle" fontSize="9" fill="#475569">是否需区块链</text>

      <path d="M140 392 L158 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-fr-arrow)" />

      <rect x="162" y="364" width="120" height="56" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="222" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">链类型选择</text>
      <text x="222" y="404" textAnchor="middle" fontSize="9" fill="#475569">公/联/私</text>

      <path d="M282 392 L300 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-fr-arrow)" />

      <rect x="304" y="364" width="120" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="364" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">共识机制</text>
      <text x="364" y="404" textAnchor="middle" fontSize="9" fill="#475569">PoW/PoS/PBFT</text>

      <path d="M424 392 L442 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-fr-arrow)" />

      <rect x="446" y="364" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="506" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">合约设计</text>
      <text x="506" y="404" textAnchor="middle" fontSize="9" fill="#475569">逻辑 / Gas</text>

      <path d="M566 392 L584 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-fr-arrow)" />

      <rect x="588" y="364" width="100" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="638" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">安全审计</text>
      <text x="638" y="404" textAnchor="middle" fontSize="9" fill="#475569">合约审计</text>

      <path d="M688 392 L706 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-fr-arrow)" />

      <rect x="710" y="364" width="70" height="56" rx="8" fill="url(#bp-fr-red)" opacity="0.15" stroke="#dc2626" strokeWidth="1.5" />
      <text x="745" y="392" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">部署</text>

      {/* 核心挑战与能力跃迁 */}
      <text x="400" y="450" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心挑战与能力跃迁</text>

      <rect x="30" y="464" width="370" height="56" rx="8" fill="url(#bp-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="215" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">能力跃迁路径</text>
      <text x="215" y="504" textAnchor="middle" fontSize="10" fill="#475569">理解区块链 → 掌握密码学 → 共识与交易 → 合约与钱包 → 链类型与应用</text>

      <rect x="410" y="464" width="360" height="56" rx="8" fill="url(#bp-fr-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">核心挑战</text>
      <text x="590" y="504" textAnchor="middle" fontSize="10" fill="#475569">扩展性 / 安全漏洞 / 监管合规 / 隐私保护 / 跨链互操作</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#bp-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：区块链 → 密码学 → 共识交易 → 合约钱包 → 链类型应用 → 知识闭环</text>

      <rect x="30" y="564" width="740" height="12" rx="6" fill="url(#bp-fr-blue)" opacity="0.1" />
    </svg>
  );
}
