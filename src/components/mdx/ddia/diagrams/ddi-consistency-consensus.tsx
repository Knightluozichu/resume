"use client";

export function DdiConsistencyConsensusDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="一致性与共识">
      <defs>
        <linearGradient id="ddi-cc-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="ddi-cc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">一致性与共识 · 分布式最难部分</text>

      {/* 分布式问题 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">分布式系统的麻烦（不可靠网络 + 不可靠时钟）</text>

      <rect x="30" y="68" width="370" height="80" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="215" y="91" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">网络问题</text>
      <text x="215" y="111" textAnchor="middle" fontSize="11" fill="#7f1d1d">消息丢失 / 延迟 / 乱序 / 拥塞</text>
      <text x="215" y="131" textAnchor="middle" fontSize="11" fill="#7f1d1d">→ 超时重传，但无法区分「慢」与「死」</text>

      <rect x="410" y="68" width="360" height="80" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="590" y="91" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">时钟问题</text>
      <text x="590" y="111" textAnchor="middle" fontSize="11" fill="#7f1d1d">时钟偏移 / NTP 不精确 / 闰秒</text>
      <text x="590" y="131" textAnchor="middle" fontSize="11" fill="#7f1d1d">→ 混淆时钟（墙上时钟）不可靠，用逻辑时钟</text>

      {/* 一致性模型 */}
      <text x="400" y="175" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">一致性模型（从弱到强）</text>

      <rect x="30" y="190" width="740" height="110" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="213" fontSize="11" fontWeight="700" fill="#334155">最终一致性</text>
      <text x="60" y="230" fontSize="10" fill="#64748b">停止更新后最终收敛</text>
      <path d="M170 220 L200 220" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ddi-cc-arrow)" />

      <text x="210" y="213" fontSize="11" fontWeight="700" fill="#334155">因果一致性</text>
      <text x="210" y="230" fontSize="10" fill="#64748b">有因果关系的操作保序</text>
      <path d="M320 220 L350 220" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ddi-cc-arrow)" />

      <text x="360" y="213" fontSize="11" fontWeight="700" fill="#334155">读己之写一致性</text>
      <text x="360" y="230" fontSize="10" fill="#64748b">总能读到自己的写入</text>
      <path d="M490 220 L520 220" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ddi-cc-arrow)" />

      <text x="530" y="213" fontSize="11" fontWeight="700" fill="#334155">线性一致性</text>
      <text x="530" y="230" fontSize="10" fill="#64748b">所有操作有全局顺序</text>

      <text x="400" y="260" textAnchor="middle" fontSize="11" fill="#475569">线性一致性（强一致性）= 操作看起来像在单副本上原子执行</text>
      <text x="400" y="280" textAnchor="middle" fontSize="11" fill="#475569">代价高：需要协调，降低可用性和性能 → CAP 定理的核心权衡</text>

      {/* CAP 与共识 */}
      <text x="400" y="325" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">CAP 定理 → 共识算法</text>

      <rect x="30" y="340" width="240" height="90" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="150" y="363" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">CAP 定理</text>
      <text x="150" y="383" textAnchor="middle" fontSize="11" fill="#155e75">C 一致性 / A 可用性 / P 分区容忍</text>
      <text x="150" y="403" textAnchor="middle" fontSize="11" fill="#155e75">网络分区不可避免 → CP 或 AP</text>
      <text x="150" y="420" textAnchor="middle" fontSize="11" fill="#0e7490">实际：分区时延迟 vs 一致性取舍</text>

      <rect x="280" y="340" width="240" height="90" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="363" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">两阶段提交（2PC）</text>
      <text x="400" y="383" textAnchor="middle" fontSize="11" fill="#78350f">准备阶段 + 提交阶段</text>
      <text x="400" y="403" textAnchor="middle" fontSize="11" fill="#78350f">协调者决定提交或中止</text>
      <text x="400" y="420" textAnchor="middle" fontSize="11" fill="#92400e">阻塞 + 协调者单点 → 共识解决</text>

      <rect x="530" y="340" width="240" height="90" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="650" y="363" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">共识算法（Raft / Paxos）</text>
      <text x="650" y="383" textAnchor="middle" fontSize="11" fill="#5b21b6">多数派投票达成一致</text>
      <text x="650" y="403" textAnchor="middle" fontSize="11" fill="#5b21b6">Leader 选举 + 日志复制</text>
      <text x="650" y="420" textAnchor="middle" fontSize="11" fill="#6d28d9">容错：少数节点宕机仍可用</text>

      {/* 共识的应用 */}
      <rect x="30" y="450" width="740" height="115" rx="10" fill="url(#ddi-cc-grad)" opacity="0.95" />
      <text x="400" y="475" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">共识算法的应用场景</text>
      <text x="170" y="500" textAnchor="middle" fontSize="11" fill="#fef3c7">Leader 选举</text>
      <text x="170" y="518" textAnchor="middle" fontSize="11" fill="#fde68a">选出一个协调者</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#fef3c7">原子提交</text>
      <text x="400" y="518" textAnchor="middle" fontSize="11" fill="#fde68a">分布式事务 2PC 的改进</text>
      <text x="630" y="500" textAnchor="middle" fontSize="11" fill="#fef3c7">复制日志</text>
      <text x="630" y="518" textAnchor="middle" fontSize="11" fill="#fde68a">全序广播 = 共识</text>
      <text x="400" y="548" textAnchor="middle" fontSize="11" fill="#fcd34d">共识 = 全序广播 = 线性一致性写入 → 一切分布式一致性的最终基础</text>
    </svg>
  );
}
