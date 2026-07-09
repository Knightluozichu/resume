"use client";

export function BpLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="白话区块链知识全景图与十章学习路径">
      <defs>
        <linearGradient id="bp-lm-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bp-lm-crypto" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bp-lm-mech" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bp-lm-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bp-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bp-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">白话区块链 · 知识全景图</text>

      {/* 左侧：五大学习阶段 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="78" width="240" height="46" rx="10" fill="url(#bp-lm-found)" opacity="0.95" />
      <text x="160" y="99" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础概念</text>
      <text x="160" y="116" textAnchor="middle" fontSize="11" fill="#bfdbfe">区块链基础 / 密码学</text>

      <path d="M160 124 L160 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="40" y="132" width="240" height="46" rx="10" fill="url(#bp-lm-crypto)" opacity="0.95" />
      <text x="160" y="153" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">机制原理</text>
      <text x="160" y="170" textAnchor="middle" fontSize="11" fill="#ede9fe">共识机制 / 交易区块</text>

      <path d="M160 178 L160 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="40" y="186" width="240" height="46" rx="10" fill="url(#bp-lm-mech)" opacity="0.95" />
      <text x="160" y="207" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">应用层</text>
      <text x="160" y="224" textAnchor="middle" fontSize="11" fill="#fef3c7">智能合约 / 钱包账户</text>

      <path d="M160 232 L160 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="40" y="240" width="240" height="46" rx="10" fill="url(#bp-lm-app)" opacity="0.95" />
      <text x="160" y="261" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">链类型与应用</text>
      <text x="160" y="278" textAnchor="middle" fontSize="11" fill="#d1fae5">公私联盟链 / 应用未来</text>

      <path d="M160 286 L160 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="40" y="294" width="240" height="46" rx="10" fill="url(#bp-lm-review)" opacity="0.95" />
      <text x="160" y="315" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">复习整合</text>
      <text x="160" y="332" textAnchor="middle" fontSize="11" fill="#fecaca">全书复习 / 知识闭环</text>

      <text x="160" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">从区块链基础到应用落地的全链路</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="78" width="460" height="34" rx="8" fill="url(#bp-lm-found)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="100" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="100" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 112 L550 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="320" y="118" width="460" height="34" rx="8" fill="url(#bp-lm-found)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="140" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="140" fontSize="11" fill="#475569">区块链基础概念——定义与结构</text>

      <path d="M550 152 L550 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="320" y="158" width="460" height="34" rx="8" fill="url(#bp-lm-crypto)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="180" fontSize="12" fontWeight="600" fill="#5b21b6">ch2</text>
      <text x="372" y="180" fontSize="11" fill="#475569">密码学基础——哈希与非对称加密</text>

      <path d="M550 192 L550 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="320" y="198" width="460" height="34" rx="8" fill="url(#bp-lm-crypto)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="220" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="220" fontSize="11" fill="#475569">共识机制——PoW与PoS</text>

      <path d="M550 232 L550 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="320" y="238" width="460" height="34" rx="8" fill="url(#bp-lm-mech)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="260" fontSize="12" fontWeight="600" fill="#92400e">ch4</text>
      <text x="372" y="260" fontSize="11" fill="#475569">交易与区块——数据结构与生命周期</text>

      <path d="M550 272 L550 276" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="320" y="278" width="460" height="34" rx="8" fill="url(#bp-lm-mech)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="300" fontSize="12" fontWeight="600" fill="#92400e">ch5</text>
      <text x="372" y="300" fontSize="11" fill="#475569">智能合约——自动化执行</text>

      <path d="M550 312 L550 316" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="320" y="318" width="460" height="34" rx="8" fill="url(#bp-lm-mech)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="340" fontSize="12" fontWeight="600" fill="#92400e">ch6</text>
      <text x="372" y="340" fontSize="11" fill="#475569">钱包与账户体系——密钥管理</text>

      <path d="M550 352 L550 356" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="320" y="358" width="460" height="34" rx="8" fill="url(#bp-lm-app)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="380" fontSize="12" fontWeight="600" fill="#065f46">ch7</text>
      <text x="372" y="380" fontSize="11" fill="#475569">公链私链与联盟链——链类型对比</text>

      <path d="M550 392 L550 396" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="320" y="398" width="460" height="34" rx="8" fill="url(#bp-lm-app)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="420" fontSize="12" fontWeight="600" fill="#065f46">ch8</text>
      <text x="372" y="420" fontSize="11" fill="#475569">应用场景与未来展望——落地实践</text>

      <path d="M550 432 L550 436" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-lm-arrow)" />

      <rect x="320" y="438" width="460" height="34" rx="8" fill="url(#bp-lm-review)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="460" fontSize="12" fontWeight="600" fill="#991b1b">ch9</text>
      <text x="372" y="460" fontSize="11" fill="#475569">全书复习与知识整合——闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="500" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="520" textAnchor="middle" fontSize="11" fill="#475569">基础概念 → 密码学 → 共识机制 → 交易区块 → 智能合约 → 钱包账户 → 链类型 → 应用展望 → 知识整合</text>

      {/* 底部核心脉络 */}
      <rect x="40" y="542" width="740" height="28" rx="8" fill="url(#bp-lm-crypto)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：理解区块链 → 掌握密码学 → 共识与交易 → 合约与钱包 → 链类型与应用 → 知识闭环</text>
    </svg>
  );
}
