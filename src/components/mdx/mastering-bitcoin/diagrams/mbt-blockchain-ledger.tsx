"use client";

export function MbtBlockchainLedgerDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="区块链与分布式账本：链式结构与默克尔树">
      <defs>
        <linearGradient id="mbt-bl-block" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7931a" />
          <stop offset="100%" stopColor="#e87b00" />
        </linearGradient>
        <linearGradient id="mbt-bl-merkle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="mbt-bl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">区块链链式结构</text>

      {/* 区块链结构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">区块通过哈希指针链接</text>

      {/* Block N-1 */}
      <rect x="30" y="76" width="200" height="170" rx="10" fill="url(#mbt-bl-block)" opacity="0.1" stroke="#f7931a" strokeWidth="2" />
      <text x="130" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9a3412">区块 N-1</text>
      <rect x="44" y="106" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="130" y="122" textAnchor="middle" fontSize="9" fill="#475569">PrevHash: 0x0000...</text>
      <rect x="44" y="134" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="130" y="150" textAnchor="middle" fontSize="9" fill="#475569">MerkleRoot: ab3f...</text>
      <rect x="44" y="162" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="130" y="178" textAnchor="middle" fontSize="9" fill="#475569">Nonce / 难度目标</text>
      <rect x="44" y="190" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="130" y="206" textAnchor="middle" fontSize="9" fill="#475569">时间戳 / 版本</text>
      <rect x="44" y="218" width="172" height="20" rx="4" fill="url(#mbt-bl-block)" opacity="0.2" />
      <text x="130" y="232" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9a3412">Hash: 0xa1b2c3...</text>

      <path d="M234 222 L260 222" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-bl-arrow)" />
      <text x="247" y="214" textAnchor="middle" fontSize="8" fill="#64748b">哈希</text>

      {/* Block N */}
      <rect x="264" y="76" width="200" height="170" rx="10" fill="url(#mbt-bl-block)" opacity="0.12" stroke="#f7931a" strokeWidth="2" />
      <text x="364" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9a3412">区块 N（当前）</text>
      <rect x="278" y="106" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="364" y="122" textAnchor="middle" fontSize="9" fill="#475569">PrevHash: 0xa1b2...</text>
      <rect x="278" y="134" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="364" y="150" textAnchor="middle" fontSize="9" fill="#475569">MerkleRoot: d4e5...</text>
      <rect x="278" y="162" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="364" y="178" textAnchor="middle" fontSize="9" fill="#475569">Nonce / 难度目标</text>
      <rect x="278" y="190" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="364" y="206" textAnchor="middle" fontSize="9" fill="#475569">时间戳 / 版本</text>
      <rect x="278" y="218" width="172" height="20" rx="4" fill="url(#mbt-bl-block)" opacity="0.2" />
      <text x="364" y="232" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9a3412">Hash: 0xf6g7h8...</text>

      <path d="M468 222 L494 222" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-bl-arrow)" />
      <text x="481" y="214" textAnchor="middle" fontSize="8" fill="#64748b">哈希</text>

      {/* Block N+1 */}
      <rect x="498" y="76" width="200" height="170" rx="10" fill="url(#mbt-bl-block)" opacity="0.08" stroke="#f7931a" strokeWidth="1.5" />
      <text x="598" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9a3412">区块 N+1</text>
      <rect x="512" y="106" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="598" y="122" textAnchor="middle" fontSize="9" fill="#475569">PrevHash: 0xf6g7...</text>
      <rect x="512" y="134" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="598" y="150" textAnchor="middle" fontSize="9" fill="#475569">MerkleRoot: ...</text>
      <rect x="512" y="162" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="598" y="178" textAnchor="middle" fontSize="9" fill="#475569">Nonce / 难度目标</text>
      <rect x="512" y="190" width="172" height="24" rx="4" fill="#fff" stroke="#f7931a" strokeWidth="1" />
      <text x="598" y="206" textAnchor="middle" fontSize="9" fill="#475569">时间戳 / 版本</text>
      <rect x="512" y="218" width="172" height="20" rx="4" fill="url(#mbt-bl-block)" opacity="0.15" />
      <text x="598" y="232" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9a3412">Hash: ...</text>

      {/* 默克尔树 */}
      <text x="200" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">默克尔树（区块内交易摘要）</text>

      <rect x="150" y="292" width="100" height="36" rx="6" fill="url(#mbt-bl-merkle)" opacity="0.15" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="200" y="314" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">Merkle Root</text>

      <path d="M180 328 L120 352" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mbt-bl-arrow)" />
      <path d="M220 328 L280 352" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mbt-bl-arrow)" />

      <rect x="70" y="356" width="100" height="32" rx="6" fill="url(#mbt-bl-merkle)" opacity="0.1" stroke="#7c3aed" strokeWidth="1" />
      <text x="120" y="376" textAnchor="middle" fontSize="9" fill="#5b21b6">Hash(L1+L2)</text>
      <rect x="230" y="356" width="100" height="32" rx="6" fill="url(#mbt-bl-merkle)" opacity="0.1" stroke="#7c3aed" strokeWidth="1" />
      <text x="280" y="376" textAnchor="middle" fontSize="9" fill="#5b21b6">Hash(L3+L4)</text>

      <path d="M100 388 L70 412" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mbt-bl-arrow)" />
      <path d="M140 388 L170 412" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mbt-bl-arrow)" />
      <path d="M260 388 L230 412" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mbt-bl-arrow)" />
      <path d="M300 388 L330 412" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mbt-bl-arrow)" />

      <rect x="40" y="416" width="60" height="28" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="70" y="434" textAnchor="middle" fontSize="9" fill="#475569">TX1</text>
      <rect x="140" y="416" width="60" height="28" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="170" y="434" textAnchor="middle" fontSize="9" fill="#475569">TX2</text>
      <rect x="200" y="416" width="60" height="28" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="230" y="434" textAnchor="middle" fontSize="9" fill="#475569">TX3</text>
      <rect x="300" y="416" width="60" height="28" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="330" y="434" textAnchor="middle" fontSize="9" fill="#475569">TX4</text>

      {/* 不可篡改特性 */}
      <text x="620" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">不可篡改原理</text>

      <rect x="440" y="292" width="360" height="100" rx="8" fill="url(#mbt-bl-block)" opacity="0.06" stroke="#f7931a" strokeWidth="1.5" />
      <text x="620" y="316" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9a3412">篡改任意交易 → MerkleRoot 变化</text>
      <text x="620" y="336" textAnchor="middle" fontSize="10" fill="#475569">→ 区块哈希变化 → 后续所有区块失效</text>
      <text x="620" y="356" textAnchor="middle" fontSize="10" fill="#475569">→ 需重新计算所有后续区块的 PoW</text>
      <text x="620" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">→ 计算量超过全网算力，实际不可行</text>

      {/* SPV 验证 */}
      <rect x="440" y="404" width="360" height="44" rx="8" fill="url(#mbt-bl-merkle)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="620" y="424" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">SPV 轻节点验证</text>
      <text x="620" y="440" textAnchor="middle" fontSize="9" fill="#475569">只需 Merkle 路径 + 区块头，无需全链数据</text>

      {/* 底部总结 */}
      <rect x="30" y="468" width="740" height="28" rx="8" fill="url(#mbt-bl-block)" opacity="0.08" stroke="#f7931a" strokeWidth="1.5" />
      <text x="400" y="486" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9a3412">区块链 = 哈希链接的区块序列 + 默克尔树摘要 + PoW 保护 = 不可篡改的分布式账本</text>
    </svg>
  );
}
