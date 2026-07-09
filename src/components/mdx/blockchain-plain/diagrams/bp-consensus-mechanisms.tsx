"use client";

export function BpConsensusMechanismsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="共识机制：PoW、PoS与DPoS对比">
      <defs>
        <linearGradient id="bp-cm-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bp-cm-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bp-cm-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bp-cm-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bp-cm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">共识机制：PoW 与 PoS 与 DPoS</text>

      {/* 共识目标 */}
      <rect x="20" y="50" width="760" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="72" textAnchor="middle" fontSize="11" fill="#475569">共识目标：去中心化网络中互不信任的节点如何就账本状态达成一致</text>

      {/* PoW */}
      <rect x="20" y="100" width="245" height="210" rx="10" fill="url(#bp-cm-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <rect x="20" y="100" width="245" height="32" rx="10" fill="url(#bp-cm-blue)" opacity="0.9" />
      <text x="142" y="121" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">PoW 工作量证明</text>

      <text x="40" y="152" fontSize="10" fontWeight="600" fill="#1e40af">核心思想</text>
      <text x="40" y="168" fontSize="9" fill="#475569">算力竞赛，谁先解出哈希谜题</text>
      <text x="40" y="182" fontSize="9" fill="#475569">谁获得记账权</text>

      <text x="40" y="206" fontSize="10" fontWeight="600" fill="#1e40af">流程</text>
      <text x="40" y="222" fontSize="9" fill="#475569">矿工收集交易打包区块</text>
      <text x="40" y="236" fontSize="9" fill="#475569">不断尝试随机数 Nonce</text>
      <text x="40" y="250" fontSize="9" fill="#475569">直到区块哈希小于目标值</text>
      <text x="40" y="264" fontSize="9" fill="#475569">广播区块，其他节点验证</text>

      <text x="40" y="288" fontSize="10" fontWeight="600" fill="#1e40af">代表：比特币</text>
      <text x="40" y="302" fontSize="9" fill="#475569">安全性高 · 能耗大 · TPS低</text>

      {/* PoS */}
      <rect x="277" y="100" width="245" height="210" rx="10" fill="url(#bp-cm-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <rect x="277" y="100" width="245" height="32" rx="10" fill="url(#bp-cm-purple)" opacity="0.9" />
      <text x="400" y="121" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">PoS 权益证明</text>

      <text x="297" y="152" fontSize="10" fontWeight="600" fill="#5b21b6">核心思想</text>
      <text x="297" y="168" fontSize="9" fill="#475569">按持币量和持币时间选举</text>
      <text x="297" y="182" fontSize="9" fill="#475569">质押越多被选中概率越大</text>

      <text x="297" y="206" fontSize="10" fontWeight="600" fill="#5b21b6">流程</text>
      <text x="297" y="222" fontSize="9" fill="#475569">验证者质押代币成为候选</text>
      <text x="297" y="236" fontSize="9" fill="#475569">协议按权益随机选记账者</text>
      <text x="297" y="250" fontSize="9" fill="#475569">记账者出块，他人验证</text>
      <text x="297" y="264" fontSize="9" fill="#475569">作恶则质押被罚没</text>

      <text x="297" y="288" fontSize="10" fontWeight="600" fill="#5b21b6">代表：以太坊2.0</text>
      <text x="297" y="302" fontSize="9" fill="#475569">节能 · 去中心化适中 · TPS中</text>

      {/* DPoS */}
      <rect x="534" y="100" width="246" height="210" rx="10" fill="url(#bp-cm-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="534" y="100" width="246" height="32" rx="10" fill="url(#bp-cm-amber)" opacity="0.9" />
      <text x="657" y="121" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">DPoS 委托权益证明</text>

      <text x="554" y="152" fontSize="10" fontWeight="600" fill="#92400e">核心思想</text>
      <text x="554" y="168" fontSize="9" fill="#475569">持币者投票选出少量代表</text>
      <text x="554" y="182" fontSize="9" fill="#475569">代表轮流记账，高效出块</text>

      <text x="554" y="206" fontSize="10" fontWeight="600" fill="#92400e">流程</text>
      <text x="554" y="222" fontSize="9" fill="#475569">持币者投票选举超级节点</text>
      <text x="554" y="236" fontSize="9" fill="#475569">获选节点按顺序轮流出块</text>
      <text x="554" y="250" fontSize="9" fill="#475569">未出块或作恶被投票撤换</text>
      <text x="554" y="264" fontSize="9" fill="#475569">代表间快速达成共识</text>

      <text x="554" y="288" fontSize="10" fontWeight="600" fill="#92400e">代表：EOS</text>
      <text x="554" y="302" fontSize="9" fill="#475569">高效 · 去中心化弱 · TPS高</text>

      {/* 拜占庭容错 */}
      <text x="400" y="338" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">拜占庭容错（PBFT）与共识三角</text>

      <rect x="20" y="350" width="370" height="80" rx="10" fill="url(#bp-cm-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="205" y="372" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">拜占庭将军问题</text>
      <text x="205" y="390" textAnchor="middle" fontSize="9" fill="#475569">在可能存在叛节节点的网络中达成一致</text>
      <text x="205" y="406" textAnchor="middle" fontSize="9" fill="#475569">PBFT 需要 3f+1 个节点容忍 f 个拜占庭节点</text>
      <text x="205" y="422" textAnchor="middle" fontSize="9" fill="#475569">适用于联盟链，多轮投票，最终性强</text>

      {/* 共识三角 */}
      <rect x="410" y="350" width="370" height="80" rx="10" fill="url(#bp-cm-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="595" y="372" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">区块链不可能三角</text>
      <text x="595" y="390" textAnchor="middle" fontSize="9" fill="#475569">安全性 · 去中心化 · 可扩展性</text>
      <text x="595" y="406" textAnchor="middle" fontSize="9" fill="#475569">三者难以同时满足，需权衡取舍</text>
      <text x="595" y="422" textAnchor="middle" fontSize="9" fill="#475569">PoW 重安全去中心化，DPoS 重可扩展性</text>

      {/* 分叉处理 */}
      <text x="400" y="452" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">分叉与最终性</text>

      <rect x="20" y="464" width="370" height="44" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="205" y="482" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">临时分叉</text>
      <text x="205" y="498" textAnchor="middle" fontSize="9" fill="#475569">两个矿工同时出块 → 最长链原则消解 → 短链被废弃</text>

      <rect x="410" y="464" width="370" height="44" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="595" y="482" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">最终性</text>
      <text x="595" y="498" textAnchor="middle" fontSize="9" fill="#475569">PoW 概率最终性（确认数越多越安全）· PoS/PBFT 绝对最终性</text>

      {/* 底部总结 */}
      <rect x="20" y="520" width="760" height="28" rx="8" fill="url(#bp-cm-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="538" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：共识机制解决信任问题 → PoW以算力换安全 → PoS以权益换效率 → 在安全/去中心化/扩展性间权衡</text>
    </svg>
  );
}
