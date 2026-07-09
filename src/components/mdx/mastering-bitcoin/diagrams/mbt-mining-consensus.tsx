"use client";

export function MbtMiningConsensusDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="挖矿与共识：PoW机制与难度调整">
      <defs>
        <linearGradient id="mbt-mc-pow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mbt-mc-block" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7931a" />
          <stop offset="100%" stopColor="#e87b00" />
        </linearGradient>
        <linearGradient id="mbt-mc-diff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="mbt-mc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">挖矿与共识机制</text>

      {/* 挖矿流程 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">挖矿流程（PoW）</text>

      <rect x="20" y="76" width="140" height="60" rx="8" fill="url(#mbt-mc-pow)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="90" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">1. 收集交易</text>
      <text x="90" y="120" textAnchor="middle" fontSize="9" fill="#475569">从内存池选取</text>

      <path d="M164 106 L180 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-mc-arrow)" />

      <rect x="184" y="76" width="140" height="60" rx="8" fill="url(#mbt-mc-pow)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="254" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">2. 构造区块</text>
      <text x="254" y="120" textAnchor="middle" fontSize="9" fill="#475569">计算 Merkle 树</text>

      <path d="M328 106 L344 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-mc-arrow)" />

      <rect x="348" y="76" width="140" height="60" rx="8" fill="url(#mbt-mc-diff)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="418" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">3. 哈希竞争</text>
      <text x="418" y="120" textAnchor="middle" fontSize="9" fill="#475569">遍历 Nonce</text>

      <path d="M492 106 L508 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-mc-arrow)" />

      <rect x="512" y="76" width="120" height="60" rx="8" fill="url(#mbt-mc-diff)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="572" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">4. 难度检查</text>
      <text x="572" y="120" textAnchor="middle" fontSize="9" fill="#475569">哈希 &lt; 目标值?</text>

      <path d="M636 106 L652 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-mc-arrow)" />

      <rect x="656" y="76" width="130" height="60" rx="8" fill="url(#mbt-mc-block)" opacity="0.12" stroke="#f7931a" strokeWidth="1.5" />
      <text x="721" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#9a3412">5. 广播区块</text>
      <text x="721" y="120" textAnchor="middle" fontSize="9" fill="#475569">获得出块奖励</text>

      {/* PoW 循环 */}
      <text x="400" y="168" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">PoW 哈希竞争循环</text>

      <rect x="200" y="182" width="400" height="90" rx="10" fill="url(#mbt-mc-diff)" opacity="0.06" stroke="#dc2626" strokeWidth="2" />
      <text x="400" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">SHA256(SHA256(区块头))</text>
      <text x="400" y="226" textAnchor="middle" fontSize="10" fill="#475569">不断改变 Nonce 值，重新计算双重 SHA256</text>
      <text x="400" y="246" textAnchor="middle" fontSize="10" fill="#475569">直到结果小于难度目标值（前 N 位为 0）</text>
      <text x="400" y="264" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">平均需要海量次尝试，概率性成功</text>

      {/* 难度调整 */}
      <text x="400" y="302" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">难度调整机制</text>

      <rect x="30" y="316" width="230" height="90" rx="8" fill="url(#mbt-mc-pow)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="145" y="338" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">目标：10 分钟 / 块</text>
      <text x="145" y="358" textAnchor="middle" fontSize="10" fill="#475569">每 2016 块（约两周）调整一次</text>
      <text x="145" y="378" textAnchor="middle" fontSize="10" fill="#475569">实际时间 / 期望时间 = 调整因子</text>
      <text x="145" y="396" textAnchor="middle" fontSize="9" fill="#64748b">调整幅度限制在 4 倍以内</text>

      <rect x="276" y="316" width="230" height="90" rx="8" fill="url(#mbt-mc-diff)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="391" y="338" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">算力上升 → 难度上调</text>
      <text x="391" y="358" textAnchor="middle" fontSize="10" fill="#475569">出块太快时，目标值变小</text>
      <text x="391" y="378" textAnchor="middle" fontSize="10" fill="#475569">需要更多哈希尝试</text>
      <text x="391" y="396" textAnchor="middle" fontSize="9" fill="#64748b">维持出块速率稳定</text>

      <rect x="522" y="316" width="248" height="90" rx="8" fill="url(#mbt-mc-pow)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="646" y="338" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">算力下降 → 难度下调</text>
      <text x="646" y="358" textAnchor="middle" fontSize="10" fill="#475569">出块太慢时，目标值变大</text>
      <text x="646" y="378" textAnchor="middle" fontSize="10" fill="#475569">减少哈希尝试要求</text>
      <text x="646" y="396" textAnchor="middle" fontSize="9" fill="#64748b">自适应网络变化</text>

      {/* 共识规则 */}
      <text x="400" y="432" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">最长链原则与共识</text>

      <rect x="30" y="446" width="230" height="56" rx="8" fill="url(#mbt-mc-block)" opacity="0.08" stroke="#f7931a" strokeWidth="1.5" />
      <text x="145" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9a3412">最长链 = 有效链</text>
      <text x="145" y="488" textAnchor="middle" fontSize="9" fill="#475569">节点始终接受累积工作量最大的链</text>

      <rect x="276" y="446" width="230" height="56" rx="8" fill="url(#mbt-mc-block)" opacity="0.08" stroke="#f7931a" strokeWidth="1.5" />
      <text x="391" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9a3412">分叉自动解决</text>
      <text x="391" y="488" textAnchor="middle" fontSize="9" fill="#475569">临时分叉由后续区块竞争解决</text>

      <rect x="522" y="446" width="248" height="56" rx="8" fill="url(#mbt-mc-block)" opacity="0.08" stroke="#f7931a" strokeWidth="1.5" />
      <text x="646" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9a3412">区块奖励减半</text>
      <text x="646" y="488" textAnchor="middle" fontSize="9" fill="#475569">每 21 万块减半，总量趋近 2100 万</text>

      {/* 底部总结 */}
      <rect x="30" y="520" width="740" height="28" rx="8" fill="url(#mbt-mc-pow)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="538" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">PoW = 用算力成本保障安全 + 难度调整稳定出块 + 最长链原则解决分叉 = 去中心化共识</text>
    </svg>
  );
}
