"use client";

export function DrlActorCriticDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Actor-Critic与A3C架构图">
      <defs>
        <linearGradient id="drl-ac-actor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="drl-ac-critic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="drl-ac-env" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="drl-ac-a3c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="drl-ac-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Actor-Critic 与 A3C</text>

      {/* Actor-Critic架构 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Actor-Critic 双网络架构</text>

      <rect x="30" y="78" width="140" height="56" rx="8" fill="url(#drl-ac-env)" opacity="0.9" />
      <text x="100" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">状态 s</text>
      <text x="100" y="120" textAnchor="middle" fontSize="10" fill="#fef3c7">环境观测</text>

      <path d="M170 100 L200 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-ac-arrow)" />
      <path d="M170 112 L200 155" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-ac-arrow)" />

      <rect x="210" y="70" width="160" height="50" rx="8" fill="url(#drl-ac-actor)" opacity="0.9" />
      <text x="290" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">Actor 策略网络</text>
      <text x="290" y="108" textAnchor="middle" fontSize="10" fill="#bfdbfe">π_θ(a|s) 输出动作</text>

      <rect x="210" y="140" width="160" height="50" rx="8" fill="url(#drl-ac-critic)" opacity="0.9" />
      <text x="290" y="160" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">Critic 价值网络</text>
      <text x="290" y="178" textAnchor="middle" fontSize="10" fill="#ede9fe">V_w(s) 评估状态</text>

      <path d="M370 95 L420 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-ac-arrow)" />

      <rect x="430" y="78" width="140" height="56" rx="8" fill="url(#drl-ac-env)" opacity="0.9" />
      <text x="500" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">动作 a</text>
      <text x="500" y="120" textAnchor="middle" fontSize="10" fill="#fef3c7">执行+得r,s'</text>

      <path d="M500 134 L500 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-ac-arrow)" />

      {/* TD误差反馈 */}
      <path d="M570 165 L630 165" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#drl-ac-arrow)" />

      <rect x="640" y="140" width="130" height="50" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="705" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">TD误差 δ</text>
      <text x="705" y="178" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">r+γV(s')-V(s)</text>

      <path d="M640 160 Q580 200 370 195" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 2" fill="none" markerEnd="url(#drl-ac-arrow)" />
      <text x="500" y="215" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">δ 更新Actor权重</text>

      <path d="M640 175 Q580 230 370 175" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2" fill="none" markerEnd="url(#drl-ac-arrow)" />
      <text x="500" y="242" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">δ 更新Critic权重</text>

      {/* A3C架构 */}
      <text x="400" y="276" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">A3C：异步并行训练</text>

      <rect x="30" y="290" width="740" height="120" rx="8" fill="url(#drl-ac-a3c)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />

      <rect x="50" y="302" width="130" height="50" rx="8" fill="url(#drl-ac-a3c)" opacity="0.9" />
      <text x="115" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Worker 1</text>
      <text x="115" y="340" textAnchor="middle" fontSize="10" fill="#d1fae5">Actor+Critic</text>

      <rect x="195" y="302" width="130" height="50" rx="8" fill="url(#drl-ac-a3c)" opacity="0.9" />
      <text x="260" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Worker 2</text>
      <text x="260" y="340" textAnchor="middle" fontSize="10" fill="#d1fae5">Actor+Critic</text>

      <rect x="340" y="302" width="130" height="50" rx="8" fill="url(#drl-ac-a3c)" opacity="0.9" />
      <text x="405" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Worker 3</text>
      <text x="405" y="340" textAnchor="middle" fontSize="10" fill="#d1fae5">Actor+Critic</text>

      <rect x="485" y="302" width="130" height="50" rx="8" fill="url(#drl-ac-a3c)" opacity="0.9" />
      <text x="550" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Worker N</text>
      <text x="550" y="340" textAnchor="middle" fontSize="10" fill="#d1fae5">Actor+Critic</text>

      <rect x="640" y="302" width="110" height="50" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="695" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">全局网络</text>
      <text x="695" y="340" textAnchor="middle" fontSize="10" fill="#475569">θ_global</text>

      <path d="M180 327 L195 327" stroke="#059669" strokeWidth="1.5" markerEnd="url(#drl-ac-arrow)" />
      <path d="M325 327 L340 327" stroke="#059669" strokeWidth="1.5" markerEnd="url(#drl-ac-arrow)" />
      <path d="M470 327 L485 327" stroke="#059669" strokeWidth="1.5" markerEnd="url(#drl-ac-arrow)" />

      <text x="400" y="378" textAnchor="middle" fontSize="11" fill="#475569">各Worker异步采样 → 计算梯度 → 推送至全局网络 → 定期同步</text>
      <text x="400" y="396" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">打破数据相关性，无需经验回放，提高训练效率</text>

      {/* 对比表格 */}
      <text x="400" y="432" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Actor-Critic vs 纯策略梯度</text>

      <rect x="30" y="446" width="240" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">REINFORCE</text>
      <text x="150" y="486" textAnchor="middle" fontSize="10" fill="#475569">回合更新，方差大</text>
      <text x="150" y="500" textAnchor="middle" fontSize="10" fill="#475569">用G_t做蒙特卡洛估计</text>

      <rect x="290" y="446" width="240" height="60" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">Actor-Critic</text>
      <text x="410" y="486" textAnchor="middle" fontSize="10" fill="#475569">每步更新，方差小</text>
      <text x="410" y="500" textAnchor="middle" fontSize="10" fill="#475569">用TD误差δ做引导</text>

      <rect x="550" y="446" width="220" height="60" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">A3C</text>
      <text x="660" y="486" textAnchor="middle" fontSize="10" fill="#475569">异步并行，效率高</text>
      <text x="660" y="500" textAnchor="middle" fontSize="10" fill="#475569">多Worker探索不同策略</text>

      {/* 底部总结 */}
      <rect x="30" y="522" width="740" height="40" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="547" textAnchor="middle" fontSize="11" fill="#475569">Actor学策略，Critic评估策略，TD误差连接两者——偏差-方差的理想平衡</text>
    </svg>
  );
}
