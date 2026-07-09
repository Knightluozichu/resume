"use client";

export function MbtBitcoinOverviewDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="比特币概览：系统架构与三层设计">
      <defs>
        <linearGradient id="mbt-ov-btc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7931a" />
          <stop offset="100%" stopColor="#e87b00" />
        </linearGradient>
        <linearGradient id="mbt-ov-layer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="mbt-ov-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">比特币系统架构概览</text>

      {/* 三层架构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三层去中心化架构</text>

      <rect x="100" y="76" width="600" height="56" rx="10" fill="url(#mbt-ov-btc)" opacity="0.12" stroke="#f7931a" strokeWidth="2" />
      <text x="400" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9a3412">应用层 — 比特币作为货币</text>
      <text x="400" y="118" textAnchor="middle" fontSize="11" fill="#475569">价值传输 / 支付结算 / 储值手段 / 可编程货币</text>

      <path d="M400 132 L400 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-ov-arrow)" />

      <rect x="100" y="140" width="600" height="56" rx="10" fill="url(#mbt-ov-layer)" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="162" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">协议层 — 共识规则与交易验证</text>
      <text x="400" y="182" textAnchor="middle" fontSize="11" fill="#475569">PoW 共识 / 区块链账本 / 交易脚本 / UTXO 模型 / 难度调整</text>

      <path d="M400 196 L400 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-ov-arrow)" />

      <rect x="100" y="204" width="600" height="56" rx="10" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
      <text x="400" y="226" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">网络层 — P2P 传播</text>
      <text x="400" y="246" textAnchor="middle" fontSize="11" fill="#475569">全节点 / 矿工节点 / SPV 轻节点 / Gossip 协议</text>

      {/* 核心特征 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五大核心特征</text>

      <rect x="30" y="304" width="140" height="60" rx="8" fill="url(#mbt-ov-btc)" opacity="0.1" stroke="#f7931a" strokeWidth="1.5" />
      <text x="100" y="328" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9a3412">去中心化</text>
      <text x="100" y="348" textAnchor="middle" fontSize="10" fill="#475569">无中央服务器</text>

      <rect x="184" y="304" width="140" height="60" rx="8" fill="url(#mbt-ov-btc)" opacity="0.1" stroke="#f7931a" strokeWidth="1.5" />
      <text x="254" y="328" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9a3412">无需信任</text>
      <text x="254" y="348" textAnchor="middle" fontSize="10" fill="#475569">密码学验证</text>

      <rect x="338" y="304" width="140" height="60" rx="8" fill="url(#mbt-ov-btc)" opacity="0.1" stroke="#f7931a" strokeWidth="1.5" />
      <text x="408" y="328" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9a3412">抗审查</text>
      <text x="408" y="348" textAnchor="middle" fontSize="10" fill="#475569">点对点传播</text>

      <rect x="492" y="304" width="140" height="60" rx="8" fill="url(#mbt-ov-btc)" opacity="0.1" stroke="#f7931a" strokeWidth="1.5" />
      <text x="562" y="328" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9a3412">不可篡改</text>
      <text x="562" y="348" textAnchor="middle" fontSize="10" fill="#475569">链式哈希锚定</text>

      <rect x="646" y="304" width="140" height="60" rx="8" fill="url(#mbt-ov-btc)" opacity="0.1" stroke="#f7931a" strokeWidth="1.5" />
      <text x="716" y="328" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9a3412">限量发行</text>
      <text x="716" y="348" textAnchor="middle" fontSize="10" fill="#475569">2100 万枚上限</text>

      {/* 比特币发展时间线 */}
      <text x="400" y="394" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键发展节点</text>

      <rect x="30" y="408" width="170" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="115" y="428" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">2008 白皮书</text>
      <text x="115" y="446" textAnchor="middle" fontSize="10" fill="#64748b">中本聪发表</text>

      <path d="M204 433 L224 433" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-ov-arrow)" />

      <rect x="228" y="408" width="170" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="313" y="428" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">2009 创世块</text>
      <text x="313" y="446" textAnchor="middle" fontSize="10" fill="#64748b">主网上线</text>

      <path d="M402 433 L422 433" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-ov-arrow)" />

      <rect x="426" y="408" width="170" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="511" y="428" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">2012 减半</text>
      <text x="511" y="446" textAnchor="middle" fontSize="10" fill="#64748b">首次产量减半</text>

      <path d="M600 433 L620 433" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-ov-arrow)" />

      <rect x="624" y="408" width="162" height="50" rx="8" fill="url(#mbt-ov-btc)" opacity="0.1" stroke="#f7931a" strokeWidth="1.5" />
      <text x="705" y="428" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9a3412">持续演进</text>
      <text x="705" y="446" textAnchor="middle" fontSize="10" fill="#64748b">隔离见证 / 闪电网络</text>

      {/* 底部总结 */}
      <rect x="30" y="478" width="740" height="28" rx="8" fill="url(#mbt-ov-btc)" opacity="0.08" stroke="#f7931a" strokeWidth="1.5" />
      <text x="400" y="496" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9a3412">比特币 = 去中心化 P2P 网络 + PoW 共识 + 链式账本 + 限量发行的电子现金系统</text>
    </svg>
  );
}
