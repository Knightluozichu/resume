"use client";

export function DlrDynamicProgrammingDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="动态规划：策略评估与策略改进循环">
      <defs>
        <linearGradient id="dlr-dp-eval" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlr-dp-improve" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlr-dp-iter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dlr-dp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">动态规划：策略迭代循环</text>

      {/* 策略评估 */}
      <rect x="80" y="80" width="240" height="120" rx="14" fill="url(#dlr-dp-eval)" opacity="0.92" />
      <text x="200" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">策略评估</text>
      <text x="200" y="136" textAnchor="middle" fontSize="12" fill="#bfdbfe">Policy Evaluation</text>
      <text x="200" y="162" textAnchor="middle" fontSize="11" fill="#bfdbfe">给定 pi，迭代计算 V_pi</text>
      <text x="200" y="182" textAnchor="middle" fontSize="11" fill="#bfdbfe">V ← Bellman 期望备份</text>

      {/* 策略改进 */}
      <rect x="480" y="80" width="240" height="120" rx="14" fill="url(#dlr-dp-improve)" opacity="0.92" />
      <text x="600" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">策略改进</text>
      <text x="600" y="136" textAnchor="middle" fontSize="12" fill="#fef3c7">Policy Improvement</text>
      <text x="600" y="162" textAnchor="middle" fontSize="11" fill="#fef3c7">贪心地选 argmax_a Q(s,a)</text>
      <text x="600" y="182" textAnchor="middle" fontSize="11" fill="#fef3c7">pi' ← greedy(V)</text>

      {/* 循环箭头 */}
      <path d="M320 120 L480 120" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#dlr-dp-arrow)" />
      <text x="400" y="112" textAnchor="middle" fontSize="11" fill="#475569">V 收敛后</text>

      <path d="M480 160 L320 160" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#dlr-dp-arrow)" />
      <text x="400" y="180" textAnchor="middle" fontSize="11" fill="#475569">新 pi' 再评估</text>

      {/* 价值迭代 */}
      <rect x="200" y="250" width="400" height="100" rx="14" fill="url(#dlr-dp-iter)" opacity="0.92" />
      <text x="400" y="280" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">价值迭代 Value Iteration</text>
      <text x="400" y="304" textAnchor="middle" fontSize="12" fill="#ede9fe">评估与改进合并为一步</text>
      <text x="400" y="326" textAnchor="middle" fontSize="11" fill="#ede9fe">V(s) ← max_a sum_s' P [R + gamma V(s')]</text>
      <text x="400" y="344" textAnchor="middle" fontSize="11" fill="#ede9fe">直接用贝尔曼最优方程迭代</text>

      {/* 对比表 */}
      <text x="400" y="390" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">策略迭代 vs 价值迭代</text>

      <rect x="60" y="404" width="340" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="230" y="424" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">策略迭代</text>
      <text x="230" y="442" textAnchor="middle" fontSize="11" fill="#475569">多次评估求精确 V → 再改进</text>
      <text x="230" y="458" textAnchor="middle" fontSize="11" fill="#475569">收敛快但每轮开销大</text>

      <rect x="420" y="404" width="340" height="60" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="590" y="424" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">价值迭代</text>
      <text x="590" y="442" textAnchor="middle" fontSize="11" fill="#475569">每步直接 max（含改进）</text>
      <text x="590" y="458" textAnchor="middle" fontSize="11" fill="#475569">每轮便宜但收敛轮次多</text>
    </svg>
  );
}
