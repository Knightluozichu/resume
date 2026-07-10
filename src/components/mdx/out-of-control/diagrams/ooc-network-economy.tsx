"use client";

export function OocNetworkEconomyDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="网络经济分布式商业法则图">
      <defs>
        <linearGradient id="ooc-ne-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ooc-ne-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="ooc-ne-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ooc-ne-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="ooc-ne-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">网络经济：分布式商业法则</text>

      {/* 网络效应曲线 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">网络价值 vs 节点数</text>

      <rect x="40" y="74" width="720" height="120" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* 坐标轴 */}
      <line x1="80" y1="180" x2="740" y2="180" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="80" y1="180" x2="80" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="740" y="194" fontSize="9" fill="#64748b">节点数 N</text>
      <text x="60" y="90" fontSize="9" fill="#64748b" textAnchor="end">价值</text>
      {/* 梅特卡夫定律曲线 V ~ N^2 */}
      <path d="M80 180 Q200 175 350 150 Q500 120 650 92" fill="none" stroke="url(#ooc-ne-1)" strokeWidth="3" />
      <text x="560" y="108" fontSize="11" fontWeight="600" fill="#0369a1">梅特卡夫定律：V ~ N 平方</text>
      {/* 线性对比 */}
      <path d="M80 180 L740 100" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="620" y="130" fontSize="9" fill="#64748b">线性增长（传统经济）</text>
      <text x="400" y="172" textAnchor="middle" fontSize="9" fill="#64748b">节点越多，每个新节点的边际价值越大</text>

      {/* 四大法则 */}
      <text x="400" y="220" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">网络经济四大法则</text>

      <rect x="40" y="234" width="345" height="100" rx="10" fill="url(#ooc-ne-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="212" y="256" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">法则一：递增收益</text>
      <text x="212" y="278" textAnchor="middle" fontSize="10" fill="#475569">用户越多产品越有价值</text>
      <text x="212" y="296" textAnchor="middle" fontSize="10" fill="#475569">赢家通吃，先发优势巨大</text>
      <text x="212" y="316" textAnchor="middle" fontSize="9" fill="#64748b">传统经济：边际收益递减 → 网络经济：边际收益递增</text>

      <rect x="415" y="234" width="345" height="100" rx="10" fill="url(#ooc-ne-2)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="587" y="256" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">法则二：普及胜于稀缺</text>
      <text x="587" y="278" textAnchor="middle" fontSize="10" fill="#475569">让产品免费扩散最大化连接</text>
      <text x="587" y="296" textAnchor="middle" fontSize="10" fill="#475569">价值来自网络规模而非单价</text>
      <text x="587" y="316" textAnchor="middle" fontSize="9" fill="#64748b">传统经济：制造稀缺 → 网络经济：追求普及</text>

      <rect x="40" y="344" width="345" height="100" rx="10" fill="url(#ooc-ne-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="212" y="366" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">法则三：赠送而非囤积</text>
      <text x="212" y="388" textAnchor="middle" fontSize="10" fill="#475569">免费版本培育用户基础</text>
      <text x="212" y="406" textAnchor="middle" fontSize="10" fill="#475569">开放API让他人为你增值</text>
      <text x="212" y="426" textAnchor="middle" fontSize="9" fill="#64748b">传统经济：保护IP → 网络经济：开放赋能</text>

      <rect x="415" y="344" width="345" height="100" rx="10" fill="url(#ooc-ne-4)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="587" y="366" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">法则四：去中心化</text>
      <text x="587" y="388" textAnchor="middle" fontSize="10" fill="#475569">让边缘节点自主决策</text>
      <text x="587" y="406" textAnchor="middle" fontSize="10" fill="#475569">平台提供规则而非指令</text>
      <text x="587" y="426" textAnchor="middle" fontSize="9" fill="#64748b">传统经济：层级管控 → 网络经济：分布式自治</text>

      {/* 传统经济 vs 网络经济对比 */}
      <text x="400" y="466" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">传统经济 vs 网络经济</text>

      <rect x="40" y="480" width="345" height="72" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="212" y="502" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">传统工业经济</text>
      <text x="212" y="522" textAnchor="middle" fontSize="9" fill="#64748b">稀缺 → 边际递减 → 垄断囤积 → 层级管控</text>
      <text x="212" y="540" textAnchor="middle" fontSize="9" fill="#64748b">效率优先，封闭系统，线性增长</text>

      <rect x="415" y="480" width="345" height="72" rx="8" fill="url(#ooc-ne-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="587" y="502" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">网络生物经济</text>
      <text x="587" y="522" textAnchor="middle" fontSize="9" fill="#475569">普及 → 边际递增 → 开放赠送 → 分布自治</text>
      <text x="587" y="540" textAnchor="middle" fontSize="9" fill="#475569">连接优先，开放系统，指数增长</text>

      {/* 底部总结 */}
      <rect x="40" y="560" width="720" height="16" rx="8" fill="url(#ooc-ne-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="572" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">核心法则：在网络中，价值随连接平方增长——越多越值钱</text>
    </svg>
  );
}
