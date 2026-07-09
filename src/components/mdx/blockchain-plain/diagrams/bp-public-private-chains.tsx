"use client";

export function BpPublicPrivateChainsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="公链私链与联盟链：三种链类型对比">
      <defs>
        <linearGradient id="bp-pp-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bp-pp-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bp-pp-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bp-pp-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">公链、私链与联盟链</text>

      {/* 三列对比 */}
      {/* 公链 */}
      <rect x="20" y="54" width="245" height="320" rx="10" fill="url(#bp-pp-blue)" opacity="0.06" stroke="#2563eb" strokeWidth="1.5" />
      <rect x="20" y="54" width="245" height="36" rx="10" fill="url(#bp-pp-blue)" opacity="0.9" />
      <text x="142" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">公有链</text>

      <text x="142" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">任何人可参与</text>

      <rect x="40" y="124" width="205" height="28" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="142" y="143" textAnchor="middle" fontSize="9" fill="#475569">节点准入：完全开放</text>

      <rect x="40" y="158" width="205" height="28" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="142" y="177" textAnchor="middle" fontSize="9" fill="#475569">共识：PoW / PoS</text>

      <rect x="40" y="192" width="205" height="28" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="142" y="211" textAnchor="middle" fontSize="9" fill="#475569">身份：匿名</text>

      <rect x="40" y="226" width="205" height="28" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="142" y="245" textAnchor="middle" fontSize="9" fill="#475569">效率：低（7-15 TPS）</text>

      <rect x="40" y="260" width="205" height="28" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="142" y="279" textAnchor="middle" fontSize="9" fill="#475569">安全：最高（算力/权益保护）</text>

      <rect x="40" y="294" width="205" height="28" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="142" y="313" textAnchor="middle" fontSize="9" fill="#475569">透明度：完全公开</text>

      <rect x="40" y="328" width="205" height="28" rx="6" fill="url(#bp-pp-blue)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="142" y="347" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">代表：比特币 · 以太坊</text>

      {/* 联盟链 */}
      <rect x="277" y="54" width="245" height="320" rx="10" fill="url(#bp-pp-purple)" opacity="0.06" stroke="#7c3aed" strokeWidth="1.5" />
      <rect x="277" y="54" width="245" height="36" rx="10" fill="url(#bp-pp-purple)" opacity="0.9" />
      <text x="400" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">联盟链</text>

      <text x="400" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">授权机构共同维护</text>

      <rect x="297" y="124" width="205" height="28" rx="6" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="143" textAnchor="middle" fontSize="9" fill="#475569">节点准入：联盟成员授权</text>

      <rect x="297" y="158" width="205" height="28" rx="6" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="177" textAnchor="middle" fontSize="9" fill="#475569">共识：PBFT / Raft</text>

      <rect x="297" y="192" width="205" height="28" rx="6" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="211" textAnchor="middle" fontSize="9" fill="#475569">身份：已知机构</text>

      <rect x="297" y="226" width="205" height="28" rx="6" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="245" textAnchor="middle" fontSize="9" fill="#475569">效率：较高（千级 TPS）</text>

      <rect x="297" y="260" width="205" height="28" rx="6" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="279" textAnchor="middle" fontSize="9" fill="#475569">安全：较高（信任假设强）</text>

      <rect x="297" y="294" width="205" height="28" rx="6" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="313" textAnchor="middle" fontSize="9" fill="#475569">透明度：成员间公开</text>

      <rect x="297" y="328" width="205" height="28" rx="6" fill="url(#bp-pp-purple)" opacity="0.2" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="347" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">代表：Hyperledger · FISCO</text>

      {/* 私有链 */}
      <rect x="534" y="54" width="246" height="320" rx="10" fill="url(#bp-pp-amber)" opacity="0.06" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="534" y="54" width="246" height="36" rx="10" fill="url(#bp-pp-amber)" opacity="0.9" />
      <text x="657" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">私有链</text>

      <text x="657" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">单一组织内部使用</text>

      <rect x="554" y="124" width="206" height="28" rx="6" fill="#fff" stroke="#f59e0b" strokeWidth="1" />
      <text x="657" y="143" textAnchor="middle" fontSize="9" fill="#475569">节点准入：组织控制</text>

      <rect x="554" y="158" width="206" height="28" rx="6" fill="#fff" stroke="#f59e0b" strokeWidth="1" />
      <text x="657" y="177" textAnchor="middle" fontSize="9" fill="#475569">共识：Raft / 简单投票</text>

      <rect x="554" y="192" width="206" height="28" rx="6" fill="#fff" stroke="#f59e0b" strokeWidth="1" />
      <text x="657" y="211" textAnchor="middle" fontSize="9" fill="#475569">身份：实名可控</text>

      <rect x="554" y="226" width="206" height="28" rx="6" fill="#fff" stroke="#f59e0b" strokeWidth="1" />
      <text x="657" y="245" textAnchor="middle" fontSize="9" fill="#475569">效率：最高（万级 TPS）</text>

      <rect x="554" y="260" width="206" height="28" rx="6" fill="#fff" stroke="#f59e0b" strokeWidth="1" />
      <text x="657" y="279" textAnchor="middle" fontSize="9" fill="#475569">安全：依赖组织内部</text>

      <rect x="554" y="294" width="206" height="28" rx="6" fill="#fff" stroke="#f59e0b" strokeWidth="1" />
      <text x="657" y="313" textAnchor="middle" fontSize="9" fill="#475569">透明度：内部可控</text>

      <rect x="554" y="328" width="206" height="28" rx="6" fill="url(#bp-pp-amber)" opacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="657" y="347" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">用途：内部审计 · 数据管理</text>

      {/* 选择维度 */}
      <text x="400" y="398" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">如何选择链类型</text>

      <rect x="20" y="410" width="185" height="64" rx="10" fill="url(#bp-pp-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="112" y="432" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">去中心化优先</text>
      <text x="112" y="450" textAnchor="middle" fontSize="9" fill="#475569">抗审查 · 无信任</text>
      <text x="112" y="466" textAnchor="middle" fontSize="9" fill="#475569">选公链</text>

      <rect x="217" y="410" width="185" height="64" rx="10" fill="url(#bp-pp-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="432" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">多方协作优先</text>
      <text x="310" y="450" textAnchor="middle" fontSize="9" fill="#475569">跨组织信任 · 效率</text>
      <text x="310" y="466" textAnchor="middle" fontSize="9" fill="#475569">选联盟链</text>

      <rect x="414" y="410" width="185" height="64" rx="10" fill="url(#bp-pp-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="507" y="432" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">效率可控优先</text>
      <text x="507" y="450" textAnchor="middle" fontSize="9" fill="#475569">内部管理 · 高吞吐</text>
      <text x="507" y="466" textAnchor="middle" fontSize="9" fill="#475569">选私有链</text>

      <rect x="611" y="410" width="169" height="64" rx="10" fill="url(#bp-pp-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="695" y="432" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">混合架构</text>
      <text x="695" y="450" textAnchor="middle" fontSize="9" fill="#475569">公链+联盟链</text>
      <text x="695" y="466" textAnchor="middle" fontSize="9" fill="#475569">分层组合</text>

      {/* 侧链与跨链 */}
      <text x="400" y="498" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">侧链与跨链技术</text>

      <rect x="20" y="510" width="370" height="36" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="205" y="533" textAnchor="middle" fontSize="9" fill="#475569">侧链：独立运行的区块链，通过双向锚定与主链资产互通</text>

      <rect x="410" y="510" width="370" height="36" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="595" y="533" textAnchor="middle" fontSize="9" fill="#475569">跨链：Polkadot/Cosmos 中继链，实现异构链间资产与数据互通</text>

      {/* 底部总结 */}
      <rect x="20" y="554" width="760" height="6" rx="3" fill="url(#bp-pp-purple)" opacity="0.2" />
    </svg>
  );
}
