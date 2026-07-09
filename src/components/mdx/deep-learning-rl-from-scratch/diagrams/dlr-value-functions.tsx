"use client";

export function DlrValueFunctionsDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="值函数与贝尔曼方程关系图">
      <defs>
        <linearGradient id="dlr-vf-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlr-vf-q" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dlr-vf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="dlr-vf-arrow-d" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">值函数与贝尔曼方程</text>

      {/* V(s) 状态值函数 */}
      <rect x="60" y="70" width="300" height="140" rx="14" fill="url(#dlr-vf-v)" opacity="0.92" />
      <text x="210" y="100" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">状态值函数 V(s)</text>
      <text x="210" y="126" textAnchor="middle" fontSize="12" fill="#bfdbfe">从状态 s 出发，</text>
      <text x="210" y="144" textAnchor="middle" fontSize="12" fill="#bfdbfe">遵循策略 pi 的期望回报</text>
      <text x="210" y="174" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fef3c7">V_pi(s) = E[ G_t | s_t = s ]</text>
      <text x="210" y="196" textAnchor="middle" fontSize="11" fill="#bfdbfe">评估「这个状态有多好」</text>

      {/* Q(s,a) 动作值函数 */}
      <rect x="440" y="70" width="300" height="140" rx="14" fill="url(#dlr-vf-q)" opacity="0.92" />
      <text x="590" y="100" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">动作值函数 Q(s,a)</text>
      <text x="590" y="126" textAnchor="middle" fontSize="12" fill="#ede9fe">在状态 s 执行动作 a 后，</text>
      <text x="590" y="144" textAnchor="middle" fontSize="12" fill="#ede9fe">遵循策略 pi 的期望回报</text>
      <text x="590" y="174" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fef3c7">Q_pi(s,a) = E[ G_t | s_t=s, a_t=a ]</text>
      <text x="590" y="196" textAnchor="middle" fontSize="11" fill="#ede9fe">评估「这个状态下做这个动作有多好」</text>

      {/* 关系箭头 */}
      <path d="M360 140 L440 140" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#dlr-vf-arrow)" />
      <text x="400" y="132" textAnchor="middle" fontSize="11" fill="#475569">V = sum_a pi(a|s) Q</text>

      {/* 贝尔曼方程区 */}
      <text x="400" y="250" textAnchor="middle" fontSize="15" fontWeight="700" fill="#334155">贝尔曼方程（递归分解）</text>

      {/* 贝尔曼期望方程 */}
      <rect x="60" y="270" width="340" height="80" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="230" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">贝尔曼期望方程</text>
      <text x="230" y="316" textAnchor="middle" fontSize="11" fill="#475569">V(s) = sum_a pi(a|s) sum_s' P(s'|s,a)</text>
      <text x="230" y="334" textAnchor="middle" fontSize="11" fill="#475569">         * [ R(s,a,s') + gamma * V(s') ]</text>

      {/* 贝尔曼最优方程 */}
      <rect x="420" y="270" width="340" height="80" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">贝尔曼最优方程</text>
      <text x="590" y="316" textAnchor="middle" fontSize="11" fill="#475569">V*(s) = max_a sum_s' P(s'|s,a)</text>
      <text x="590" y="334" textAnchor="middle" fontSize="11" fill="#475569">          * [ R(s,a,s') + gamma * V*(s') ]</text>

      {/* 最优策略 */}
      <rect x="60" y="380" width="680" height="80" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="406" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">最优策略与最优值函数</text>
      <text x="400" y="430" textAnchor="middle" fontSize="11" fill="#475569">pi*(s) = argmax_a Q*(s,a)   |   Q* 满足贝尔曼最优方程，无需求知道 pi 即可求解</text>
      <text x="400" y="448" textAnchor="middle" fontSize="11" fill="#475569">V* 和 Q* 互推：V*(s) = max_a Q*(s,a)</text>
    </svg>
  );
}
