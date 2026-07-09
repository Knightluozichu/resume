"use client";

export function BdpFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="区块链开发实战全书复习：知识整合与工程闭环">
      <defs>
        <linearGradient id="bdp-fr-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bdp-fr-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bdp-fr-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bdp-fr-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bdp-fr-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bdp-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：工程知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="140" height="56" rx="8" fill="url(#bdp-fr-blue)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0-1 基础</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">全景图+环境</text>

      <path d="M162 102 L182 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-fr-arrow)" />

      <rect x="186" y="74" width="140" height="56" rx="8" fill="url(#bdp-fr-purple)" opacity="0.9" />
      <text x="256" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch2-3 合约</text>
      <text x="256" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">Solidity+模式</text>

      <path d="M328 102 L348 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-fr-arrow)" />

      <rect x="352" y="74" width="140" height="56" rx="8" fill="url(#bdp-fr-amber)" opacity="0.9" />
      <text x="422" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch4-5 集成</text>
      <text x="422" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">Web3+架构</text>

      <path d="M494 102 L514 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-fr-arrow)" />

      <rect x="518" y="74" width="140" height="56" rx="8" fill="url(#bdp-fr-green)" opacity="0.9" />
      <text x="588" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch6-7 上线</text>
      <text x="588" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">测试+部署</text>

      <path d="M660 102 L680 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-fr-arrow)" />

      <rect x="684" y="74" width="96" height="56" rx="8" fill="url(#bdp-fr-red)" opacity="0.9" />
      <text x="732" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch8-9 进阶</text>
      <text x="732" y="116" textAnchor="middle" fontSize="9" fill="#fecaca">实战+闭环</text>

      {/* 四层工程视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四层工程视角</text>

      <rect x="20" y="176" width="185" height="150" rx="8" fill="url(#bdp-fr-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="112" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">环境层</text>
      <text x="112" y="220" textAnchor="middle" fontSize="10" fill="#475569">工具链搭建</text>
      <text x="112" y="236" textAnchor="middle" fontSize="10" fill="#475569">Hardhat / Foundry</text>
      <text x="112" y="252" textAnchor="middle" fontSize="10" fill="#475569">本地链与测试网</text>
      <text x="112" y="268" textAnchor="middle" fontSize="10" fill="#475569">钱包与 RPC</text>
      <text x="112" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">定义开发基座</text>

      <rect x="217" y="176" width="185" height="150" rx="8" fill="url(#bdp-fr-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">合约层</text>
      <text x="310" y="220" textAnchor="middle" fontSize="10" fill="#475569">Solidity 语法</text>
      <text x="310" y="236" textAnchor="middle" fontSize="10" fill="#475569">设计模式</text>
      <text x="310" y="252" textAnchor="middle" fontSize="10" fill="#475569">权限与升级</text>
      <text x="310" y="268" textAnchor="middle" fontSize="10" fill="#475569">Gas 优化</text>
      <text x="310" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">定义链上逻辑</text>

      <rect x="414" y="176" width="185" height="150" rx="8" fill="url(#bdp-fr-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="507" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">应用层</text>
      <text x="507" y="220" textAnchor="middle" fontSize="10" fill="#475569">Web3 集成</text>
      <text x="507" y="236" textAnchor="middle" fontSize="10" fill="#475569">DApp 三层架构</text>
      <text x="507" y="252" textAnchor="middle" fontSize="10" fill="#475569">索引与存储</text>
      <text x="507" y="268" textAnchor="middle" fontSize="10" fill="#475569">预言机接入</text>
      <text x="507" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">定义交互能力</text>

      <rect x="611" y="176" width="169" height="150" rx="8" fill="url(#bdp-fr-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="696" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">运维层</text>
      <text x="696" y="220" textAnchor="middle" fontSize="10" fill="#475569">测试审计</text>
      <text x="696" y="236" textAnchor="middle" fontSize="10" fill="#475569">部署主网</text>
      <text x="696" y="252" textAnchor="middle" fontSize="10" fill="#475569">升级治理</text>
      <text x="696" y="268" textAnchor="middle" fontSize="10" fill="#475569">监控应急</text>
      <text x="696" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">定义工程闭环</text>

      {/* 工程决策链 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">区块链工程决策链</text>

      <rect x="20" y="364" width="120" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">需求分析</text>
      <text x="80" y="404" textAnchor="middle" fontSize="9" fill="#475569">是否上链</text>

      <path d="M140 392 L158 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-fr-arrow)" />

      <rect x="162" y="364" width="120" height="56" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="222" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">合约设计</text>
      <text x="222" y="404" textAnchor="middle" fontSize="9" fill="#475569">模式 / Gas</text>

      <path d="M282 392 L300 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-fr-arrow)" />

      <rect x="304" y="364" width="120" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="364" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">前端集成</text>
      <text x="364" y="404" textAnchor="middle" fontSize="9" fill="#475569">DApp 架构</text>

      <path d="M424 392 L442 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-fr-arrow)" />

      <rect x="446" y="364" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="506" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">测试审计</text>
      <text x="506" y="404" textAnchor="middle" fontSize="9" fill="#475569">模糊 / 审计</text>

      <path d="M566 392 L584 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-fr-arrow)" />

      <rect x="588" y="364" width="100" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="638" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">部署治理</text>
      <text x="638" y="404" textAnchor="middle" fontSize="9" fill="#475569">多签 / 监控</text>

      <path d="M688 392 L706 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-fr-arrow)" />

      <rect x="710" y="364" width="70" height="56" rx="8" fill="url(#bdp-fr-red)" opacity="0.15" stroke="#dc2626" strokeWidth="1.5" />
      <text x="745" y="392" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">迭代</text>

      {/* 核心能力与挑战 */}
      <text x="400" y="450" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心能力与挑战</text>

      <rect x="30" y="464" width="370" height="56" rx="8" fill="url(#bdp-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="215" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">能力跃迁路径</text>
      <text x="215" y="504" textAnchor="middle" fontSize="10" fill="#475569">搭建环境 → 编写合约 → 集成前端 → 测试审计 → 部署主网 → 进阶实战</text>

      <rect x="410" y="464" width="360" height="56" rx="8" fill="url(#bdp-fr-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">核心挑战</text>
      <text x="590" y="504" textAnchor="middle" fontSize="10" fill="#475569">合约漏洞 / Gas 成本 / 可升级权衡 / 监管合规 / 用户体验</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#bdp-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：环境 → 合约 → 集成 → 测试 → 部署 → 实战 → 工程闭环</text>

      <rect x="30" y="564" width="740" height="12" rx="6" fill="url(#bdp-fr-blue)" opacity="0.1" />
    </svg>
  );
}
