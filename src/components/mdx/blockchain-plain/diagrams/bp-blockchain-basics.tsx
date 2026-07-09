"use client";

export function BpBlockchainBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="区块链基础概念：区块链式结构与核心特性">
      <defs>
        <linearGradient id="bp-bb-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bp-bb-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bp-bb-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="bp-bb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">区块链基础：链式结构与核心特性</text>

      {/* 区块链结构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">区块链式结构</text>

      {/* 区块1 */}
      <rect x="20" y="78" width="160" height="120" rx="10" fill="url(#bp-bb-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="100" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">区块 N-1</text>
      <line x1="40" y1="108" x2="160" y2="108" stroke="#2563eb" strokeWidth="1" opacity="0.4" />
      <text x="100" y="128" textAnchor="middle" fontSize="10" fill="#475569">区块头</text>
      <text x="100" y="146" textAnchor="middle" fontSize="10" fill="#475569">PrevHash: 0000</text>
      <text x="100" y="164" textAnchor="middle" fontSize="10" fill="#475569">Hash: a3f2</text>
      <text x="100" y="182" textAnchor="middle" fontSize="10" fill="#475569">数据: 交易记录</text>

      <path d="M182 138 L208 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-bb-arrow)" />

      {/* 区块2 */}
      <rect x="210" y="78" width="160" height="120" rx="10" fill="url(#bp-bb-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="290" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">区块 N</text>
      <line x1="230" y1="108" x2="350" y2="108" stroke="#7c3aed" strokeWidth="1" opacity="0.4" />
      <text x="290" y="128" textAnchor="middle" fontSize="10" fill="#475569">区块头</text>
      <text x="290" y="146" textAnchor="middle" fontSize="10" fill="#475569">PrevHash: a3f2</text>
      <text x="290" y="164" textAnchor="middle" fontSize="10" fill="#475569">Hash: b7c9</text>
      <text x="290" y="182" textAnchor="middle" fontSize="10" fill="#475569">数据: 交易记录</text>

      <path d="M372 138 L398 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-bb-arrow)" />

      {/* 区块3 */}
      <rect x="400" y="78" width="160" height="120" rx="10" fill="url(#bp-bb-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="480" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">区块 N+1</text>
      <line x1="420" y1="108" x2="540" y2="108" stroke="#f59e0b" strokeWidth="1" opacity="0.4" />
      <text x="480" y="128" textAnchor="middle" fontSize="10" fill="#475569">区块头</text>
      <text x="480" y="146" textAnchor="middle" fontSize="10" fill="#475569">PrevHash: b7c9</text>
      <text x="480" y="164" textAnchor="middle" fontSize="10" fill="#475569">Hash: c1d4</text>
      <text x="480" y="182" textAnchor="middle" fontSize="10" fill="#475569">数据: 交易记录</text>

      <path d="M562 138 L588 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-bb-arrow)" />

      {/* 省略号 */}
      <rect x="590" y="108" width="40" height="60" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />
      <text x="610" y="144" textAnchor="middle" fontSize="16" fill="#94a3b8">...</text>

      {/* 链式关系说明 */}
      <rect x="660" y="108" width="120" height="60" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="720" y="132" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">防篡改</text>
      <text x="720" y="150" textAnchor="middle" fontSize="9" fill="#475569">改一区块则全链失效</text>

      {/* 核心特性 */}
      <text x="400" y="232" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">五大核心特性</text>

      <rect x="20" y="246" width="148" height="100" rx="10" fill="url(#bp-bb-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="94" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">去中心化</text>
      <text x="94" y="292" textAnchor="middle" fontSize="9" fill="#475569">无单一管理中心</text>
      <text x="94" y="308" textAnchor="middle" fontSize="9" fill="#475569">节点对等参与</text>
      <text x="94" y="324" textAnchor="middle" fontSize="9" fill="#475569">多副本冗余</text>

      <rect x="180" y="246" width="148" height="100" rx="10" fill="url(#bp-bb-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="254" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">不可篡改</text>
      <text x="254" y="292" textAnchor="middle" fontSize="9" fill="#475569">哈希链式绑定</text>
      <text x="254" y="308" textAnchor="middle" fontSize="9" fill="#475569">篡改即被察觉</text>
      <text x="254" y="324" textAnchor="middle" fontSize="9" fill="#475569">历史永久留存</text>

      <rect x="340" y="246" width="148" height="100" rx="10" fill="url(#bp-bb-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="414" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">公开透明</text>
      <text x="414" y="292" textAnchor="middle" fontSize="9" fill="#475569">账本全网可见</text>
      <text x="414" y="308" textAnchor="middle" fontSize="9" fill="#475569">可验证可审计</text>
      <text x="414" y="324" textAnchor="middle" fontSize="9" fill="#475569">信任最小化</text>

      <rect x="500" y="246" width="148" height="100" rx="10" fill="url(#bp-bb-blue)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="574" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">匿名性</text>
      <text x="574" y="292" textAnchor="middle" fontSize="9" fill="#475569">地址不绑身份</text>
      <text x="574" y="308" textAnchor="middle" fontSize="9" fill="#475569">伪匿名交易</text>
      <text x="574" y="324" textAnchor="middle" fontSize="9" fill="#475569">隐私保护</text>

      <rect x="660" y="246" width="120" height="100" rx="10" fill="url(#bp-bb-purple)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="720" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">可追溯</text>
      <text x="720" y="292" textAnchor="middle" fontSize="9" fill="#475569">交易全链可查</text>
      <text x="720" y="308" textAnchor="middle" fontSize="9" fill="#475569">来源清晰可追</text>
      <text x="720" y="324" textAnchor="middle" fontSize="9" fill="#475569">审计闭环</text>

      {/* 节点网络 */}
      <text x="400" y="372" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">P2P 节点网络</text>

      <circle cx="140" cy="430" r="28" fill="url(#bp-bb-blue)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="140" y="434" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">全节点</text>

      <circle cx="300" cy="430" r="28" fill="url(#bp-bb-purple)" opacity="0.2" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="300" y="434" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">矿工节点</text>

      <circle cx="460" cy="430" r="28" fill="url(#bp-bb-amber)" opacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="460" y="434" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">轻节点</text>

      <circle cx="620" cy="430" r="28" fill="url(#bp-bb-blue)" opacity="0.2" stroke="#059669" strokeWidth="1.5" />
      <text x="620" y="434" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">全节点</text>

      <line x1="168" y1="430" x2="272" y2="430" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="328" y1="430" x2="432" y2="430" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="488" y1="430" x2="592" y2="430" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="160" y1="412" x2="300" y2="412" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
      <line x1="320" y1="412" x2="460" y2="412" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
      <line x1="480" y1="412" x2="620" y2="412" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />

      {/* 底部总结 */}
      <rect x="20" y="486" width="760" height="32" rx="8" fill="url(#bp-bb-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="506" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：区块通过哈希指针首尾相连 → 形成不可篡改的链式账本 → 去中心化节点共同维护</text>

      <rect x="20" y="524" width="760" height="28" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="542" textAnchor="middle" fontSize="10" fill="#475569">每个区块存储上一区块的哈希值 → 篡改任意区块会导致后续所有哈希失配 → 全网节点共同验证拒绝非法区块</text>
    </svg>
  );
}
