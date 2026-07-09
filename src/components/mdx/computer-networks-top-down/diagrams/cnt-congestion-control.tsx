"use client";

export function CntCongestionControlDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="TCP拥塞控制四阶段图">
      <defs>
        <linearGradient id="cnt-cc-ss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cnt-cc-ca" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="cnt-cc-fr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cnt-cc-to" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="cnt-cc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">TCP Reno拥塞控制：cwnd随时间变化</text>

      {/* 坐标轴 */}
      <line x1="80" y1="60" x2="80" y2="420" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="80" y1="420" x2="760" y2="420" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="40" y="240" textAnchor="middle" fontSize="13" fill="#475569" transform="rotate(-90 40 240)">cwnd (MSS)</text>
      <text x="420" y="448" textAnchor="middle" fontSize="13" fill="#475569">RTT（时间）</text>

      {/* 慢启动阶段 - 指数增长 */}
      <path d="M80 420 L130 400 L180 360 L230 280 L230 280" stroke="#2563eb" strokeWidth="2.5" fill="none" />
      <text x="155" y="375" fontSize="11" fontWeight="600" fill="#1e40af">慢启动</text>
      <text x="155" y="390" fontSize="10" fill="#3b82f6">指数增长(每RTT翻倍)</text>

      {/* 拥塞避免 - 线性增长 */}
      <path d="M230 280 L330 260 L430 240 L530 220 L530 220" stroke="#0891b2" strokeWidth="2.5" fill="none" />
      <text x="380" y="255" fontSize="11" fontWeight="600" fill="#0e7490">拥塞避免</text>
      <text x="380" y="270" fontSize="10" fill="#06b6d4">线性增长(每RTT +1)</text>

      {/* ssthresh 线 */}
      <line x1="80" y1="280" x2="230" y2="280" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
      <text x="90" y="275" fontSize="10" fill="#64748b">ssthresh</text>

      {/* 3个重复ACK → 快速重传+快速恢复 */}
      <circle cx="530" cy="220" r="4" fill="#f59e0b" />
      <path d="M530 220 L530 270" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
      <text x="540" y="215" fontSize="10" fontWeight="600" fill="#92400e">3 dupACK</text>
      <text x="540" y="230" fontSize="10" fill="#b45309">cwnd减半</text>

      {/* 快速恢复后继续拥塞避免 */}
      <path d="M530 270 L600 260 L670 250 L740 240" stroke="#0891b2" strokeWidth="2.5" fill="none" />
      <text x="620" y="285" fontSize="11" fontWeight="600" fill="#0e7490">快速恢复→CA</text>

      {/* 超时事件示例 */}
      <circle cx="400" cy="245" r="5" fill="#ef4444" />
      <path d="M400 245 L400 380" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
      <text x="410" y="240" fontSize="10" fontWeight="600" fill="#991b1b">超时</text>
      <text x="410" y="255" fontSize="10" fill="#dc2626">cwnd=1</text>

      {/* 超时后慢启动 */}
      <path d="M400 380 L440 370 L470 350 L490 320 L490 320" stroke="#2563eb" strokeWidth="2.5" fill="none" opacity="0.5" />

      {/* AIMD公式区 */}
      <rect x="30" y="460" width="740" height="35" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="482" textAnchor="middle" fontSize="12" fill="#334155">
        AIMD: 加性增 cwnd += 1/RTT · 乘性减 cwnd /= 2 · 发送窗口 = min(cwnd, rwnd)
      </text>
    </svg>
  );
}
