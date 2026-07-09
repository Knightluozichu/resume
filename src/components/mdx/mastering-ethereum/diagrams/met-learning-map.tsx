"use client";

export function MetLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="精通以太坊知识全景图与十章学习路径">
      <defs>
        <linearGradient id="met-lm-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#627eea" />
          <stop offset="100%" stopColor="#4c53d4" />
        </linearGradient>
        <linearGradient id="met-lm-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="met-lm-evm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="met-lm-contract" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="met-lm-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <marker id="met-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">精通以太坊 · 知识全景图</text>

      {/* 左侧：五大学习阶段 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="78" width="240" height="46" rx="10" fill="url(#met-lm-found)" opacity="0.95" />
      <text x="160" y="99" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础认知</text>
      <text x="160" y="116" textAnchor="middle" fontSize="11" fill="#dbeafe">全景图 / 以太坊概览</text>

      <path d="M160 124 L160 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="40" y="132" width="240" height="46" rx="10" fill="url(#met-lm-core)" opacity="0.95" />
      <text x="160" y="153" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础机制</text>
      <text x="160" y="170" textAnchor="middle" fontSize="11" fill="#bfdbfe">账户 / 密钥 / 交易 / Gas</text>

      <path d="M160 178 L160 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="40" y="186" width="240" height="46" rx="10" fill="url(#met-lm-evm)" opacity="0.95" />
      <text x="160" y="207" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">核心运行</text>
      <text x="160" y="224" textAnchor="middle" fontSize="11" fill="#cffafe">EVM / 字节码 / 状态转换</text>

      <path d="M160 232 L160 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="40" y="240" width="240" height="46" rx="10" fill="url(#met-lm-contract)" opacity="0.95" />
      <text x="160" y="261" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">合约与代币</text>
      <text x="160" y="278" textAnchor="middle" fontSize="11" fill="#d1fae5">Solidity / 安全 / ERC 标准</text>

      <path d="M160 286 L160 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="40" y="294" width="240" height="46" rx="10" fill="url(#met-lm-app)" opacity="0.95" />
      <text x="160" y="315" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">应用与复习</text>
      <text x="160" y="332" textAnchor="middle" fontSize="11" fill="#fed7aa">DApp / 预言机 / 知识闭环</text>

      <text x="160" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="#627eea">从账户到合约到应用的完整脉络</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="78" width="460" height="34" rx="8" fill="url(#met-lm-found)" opacity="0.12" stroke="#627eea" strokeWidth="1.5" />
      <text x="338" y="100" fontSize="12" fontWeight="600" fill="#3730a3">ch0</text>
      <text x="372" y="100" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 112 L550 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="320" y="118" width="460" height="34" rx="8" fill="url(#met-lm-found)" opacity="0.12" stroke="#627eea" strokeWidth="1.5" />
      <text x="338" y="140" fontSize="12" fontWeight="600" fill="#3730a3">ch1</text>
      <text x="372" y="140" fontSize="11" fill="#475569">以太坊概览——历史与设计原理</text>

      <path d="M550 152 L550 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="320" y="158" width="460" height="34" rx="8" fill="url(#met-lm-core)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="180" fontSize="12" fontWeight="600" fill="#1e40af">ch2</text>
      <text x="372" y="180" fontSize="11" fill="#475569">账户与密钥——椭圆曲线与地址</text>

      <path d="M550 192 L550 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="320" y="198" width="460" height="34" rx="8" fill="url(#met-lm-core)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="220" fontSize="12" fontWeight="600" fill="#1e40af">ch3</text>
      <text x="372" y="220" fontSize="11" fill="#475569">交易与Gas——账户模型与费用</text>

      <path d="M550 232 L550 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="320" y="238" width="460" height="34" rx="8" fill="url(#met-lm-evm)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="338" y="260" fontSize="12" fontWeight="600" fill="#0e7490">ch4</text>
      <text x="372" y="260" fontSize="11" fill="#475569">EVM与字节码——虚拟机与执行</text>

      <path d="M550 272 L550 276" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="320" y="278" width="460" height="34" rx="8" fill="url(#met-lm-contract)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="300" fontSize="12" fontWeight="600" fill="#065f46">ch5</text>
      <text x="372" y="300" fontSize="11" fill="#475569">Solidity编程——合约语言基础</text>

      <path d="M550 312 L550 316" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="320" y="318" width="460" height="34" rx="8" fill="url(#met-lm-contract)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="340" fontSize="12" fontWeight="600" fill="#065f46">ch6</text>
      <text x="372" y="340" fontSize="11" fill="#475569">智能合约安全——漏洞与防护</text>

      <path d="M550 352 L550 356" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="320" y="358" width="460" height="34" rx="8" fill="url(#met-lm-contract)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="380" fontSize="12" fontWeight="600" fill="#065f46">ch7</text>
      <text x="372" y="380" fontSize="11" fill="#475569">代币与标准——ERC20 / ERC721</text>

      <path d="M550 392 L550 396" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="320" y="398" width="460" height="34" rx="8" fill="url(#met-lm-app)" opacity="0.12" stroke="#ea580c" strokeWidth="1.5" />
      <text x="338" y="420" fontSize="12" fontWeight="600" fill="#9a3412">ch8</text>
      <text x="372" y="420" fontSize="11" fill="#475569">DApp与预言机——去中心化应用</text>

      <path d="M550 432 L550 436" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-lm-arrow)" />

      <rect x="320" y="438" width="460" height="34" rx="8" fill="url(#met-lm-app)" opacity="0.12" stroke="#ea580c" strokeWidth="1.5" />
      <text x="338" y="460" fontSize="12" fontWeight="600" fill="#9a3412">ch9</text>
      <text x="372" y="460" fontSize="11" fill="#475569">全书复习与知识整合——系统闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="500" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="520" textAnchor="middle" fontSize="11" fill="#475569">概览 → 账户 → 交易 → EVM → Solidity → 安全 → 代币 → DApp → 知识整合</text>

      {/* 底部核心脉络 */}
      <rect x="40" y="542" width="740" height="28" rx="8" fill="url(#met-lm-found)" opacity="0.08" stroke="#627eea" strokeWidth="1.5" />
      <text x="410" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3730a3">核心脉络：理解原理 → 掌握账户 → 解析交易 → EVM执行 → 合约编程 → 安全防护 → 代币标准 → DApp应用 → 知识闭环</text>
    </svg>
  );
}
