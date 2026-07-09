"use client";

export function DlrDeepQNetworkDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="深度Q网络DQN架构与经验回放">
      <defs>
        <linearGradient id="dlr-dqn-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlr-dqn-replay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlr-dqn-target" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dlr-dqn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深度Q网络（DQN）：用神经网络近似 Q(s,a)</text>

      {/* Q网络结构 */}
      <text x="400" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Q 网络结构</text>

      <rect x="60" y="80" width="120" height="60" rx="8" fill="url(#dlr-dqn-net)" opacity="0.9" />
      <text x="120" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">输入</text>
      <text x="120" y="126" textAnchor="middle" fontSize="11" fill="#fecaca">状态 s</text>

      <path d="M180 110 L240 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-dqn-arrow)" />

      <rect x="240" y="80" width="140" height="60" rx="8" fill="url(#dlr-dqn-net)" opacity="0.9" />
      <text x="310" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">隐藏层</text>
      <text x="310" y="126" textAnchor="middle" fontSize="11" fill="#fecaca">ReLU + 全连接</text>

      <path d="M380 110 L440 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-dqn-arrow)" />

      <rect x="440" y="80" width="160" height="60" rx="8" fill="url(#dlr-dqn-net)" opacity="0.9" />
      <text x="520" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">输出</text>
      <text x="520" y="126" textAnchor="middle" fontSize="11" fill="#fecaca">Q(s, a_1)...Q(s, a_n)</text>

      <path d="M600 110 L660 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-dqn-arrow)" />

      <rect x="660" y="80" width="100" height="60" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="710" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">动作</text>
      <text x="710" y="126" textAnchor="middle" fontSize="11" fill="#475569">argmax_a Q</text>

      {/* 经验回放 */}
      <text x="400" y="190" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">DQN 三大关键技巧</text>

      <rect x="40" y="210" width="230" height="120" rx="10" fill="url(#dlr-dqn-replay)" opacity="0.9" />
      <text x="155" y="238" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">经验回放</text>
      <text x="155" y="262" textAnchor="middle" fontSize="11" fill="#bfdbfe">存储 (s,a,r,s') 到缓冲区</text>
      <text x="155" y="282" textAnchor="middle" fontSize="11" fill="#bfdbfe">随机小批量采样训练</text>
      <text x="155" y="302" textAnchor="middle" fontSize="11" fill="#bfdbfe">打破样本相关性</text>
      <text x="155" y="320" textAnchor="middle" fontSize="11" fill="#bfdbfe">提高数据利用率</text>

      {/* 目标网络 */}
      <rect x="285" y="210" width="230" height="120" rx="10" fill="url(#dlr-dqn-target)" opacity="0.9" />
      <text x="400" y="238" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">目标网络</text>
      <text x="400" y="262" textAnchor="middle" fontSize="11" fill="#ede9fe">独立的目标 Q 网络</text>
      <text x="400" y="282" textAnchor="middle" fontSize="11" fill="#ede9fe">定期复制主网络参数</text>
      <text x="400" y="302" textAnchor="middle" fontSize="11" fill="#ede9fe">稳定训练目标</text>
      <text x="400" y="320" textAnchor="middle" fontSize="11" fill="#ede9fe">减少振荡发散</text>

      {/* 帧堆叠 */}
      <rect x="530" y="210" width="230" height="120" rx="10" fill="url(#dlr-dqn-net)" opacity="0.9" />
      <text x="645" y="238" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">帧堆叠</text>
      <text x="645" y="262" textAnchor="middle" fontSize="11" fill="#fecaca">连续几帧作为状态</text>
      <text x="645" y="282" textAnchor="middle" fontSize="11" fill="#fecaca">提供时序信息</text>
      <text x="645" y="302" textAnchor="middle" fontSize="11" fill="#fecaca">弥补单帧无法</text>
      <text x="645" y="320" textAnchor="middle" fontSize="11" fill="#fecaca">表示速度的缺陷</text>

      {/* 损失函数 */}
      <text x="400" y="365" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">损失函数</text>
      <rect x="60" y="378" width="680" height="50" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="401" textAnchor="middle" fontSize="13" fontWeight="600" fill="#92400e">L = E [ ( r + gamma * max_a' Q_target(s',a') - Q(s,a) )^2 ]</text>
      <text x="400" y="419" textAnchor="middle" fontSize="11" fill="#475569">TD 误差的均方——目标值用目标网络计算，避免「追着自己跑」的不稳定</text>

      {/* 总结 */}
      <rect x="60" y="445" width="680" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="470" textAnchor="middle" fontSize="11" fill="#475569">DQN = Q学习 + 神经网络 + 经验回放 + 目标网络——首个在 Atari 游戏上达到人类水平的深度RL算法</text>
    </svg>
  );
}
