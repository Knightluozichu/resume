"use client";

export function DrlValueBasedDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="基于价值的方法DQN族架构图">
      <defs>
        <linearGradient id="drl-vb-input" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="drl-vb-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="drl-vb-output" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="drl-vb-buffer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="drl-vb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">基于价值的方法：DQN族</text>

      {/* DQN架构流程 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">DQN 核心架构</text>

      <rect x="30" y="78" width="130" height="56" rx="8" fill="url(#drl-vb-input)" opacity="0.9" />
      <text x="95" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">状态 s</text>
      <text x="95" y="120" textAnchor="middle" fontSize="10" fill="#bfdbfe">像素/特征</text>

      <path d="M160 106 L195 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-vb-arrow)" />

      <rect x="200" y="78" width="160" height="56" rx="8" fill="url(#drl-vb-net)" opacity="0.9" />
      <text x="280" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">Q网络 Q(s,a;θ)</text>
      <text x="280" y="120" textAnchor="middle" fontSize="10" fill="#ede9fe">CNN + 全连接</text>

      <path d="M360 106 L395 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-vb-arrow)" />

      <rect x="400" y="78" width="140" height="56" rx="8" fill="url(#drl-vb-output)" opacity="0.9" />
      <text x="470" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">Q值输出</text>
      <text x="470" y="120" textAnchor="middle" fontSize="10" fill="#fef3c7">每个动作一个Q值</text>

      <path d="M540 106 L575 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-vb-arrow)" />

      <rect x="580" y="78" width="190" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="675" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">argmax_a Q(s,a)</text>
      <text x="675" y="120" textAnchor="middle" fontSize="10" fill="#475569">ε-贪心选动作</text>

      {/* 两大创新 */}
      <text x="400" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">两大稳定化技术</text>

      <rect x="30" y="180" width="350" height="100" rx="8" fill="url(#drl-vb-buffer)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="205" y="202" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">经验回放 Experience Replay</text>
      <text x="205" y="222" textAnchor="middle" fontSize="10" fill="#475569">存储转移 (s, a, r, s') 到缓冲区</text>
      <text x="205" y="240" textAnchor="middle" fontSize="10" fill="#475569">随机采样 minibatch 训练</text>
      <text x="205" y="258" textAnchor="middle" fontSize="10" fill="#475569">打破数据相关性，提高样本效率</text>
      <text x="205" y="274" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">作用：稳定训练 + 复用数据</text>

      <rect x="420" y="180" width="350" height="100" rx="8" fill="url(#drl-vb-net)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="595" y="202" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">目标网络 Target Network</text>
      <text x="595" y="222" textAnchor="middle" fontSize="10" fill="#475569">主网络 θ 频繁更新</text>
      <text x="595" y="240" textAnchor="middle" fontSize="10" fill="#475569">目标网络 θ⁻ 定期同步</text>
      <text x="595" y="258" textAnchor="middle" fontSize="10" fill="#475569">TD目标用 θ⁻ 计算</text>
      <text x="595" y="274" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">作用：避免自举震荡</text>

      {/* 损失函数 */}
      <text x="400" y="308" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">DQN 损失函数</text>

      <rect x="80" y="320" width="640" height="50" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="342" textAnchor="middle" fontSize="12" fill="#475569" fontFamily="monospace">L(θ) = E[(Q(s,a;θ) - y)²]</text>
      <text x="400" y="360" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">y = r + γ max_a' Q(s',a';θ⁻)  (TD目标)</text>

      {/* DQN变体 */}
      <text x="400" y="396" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">DQN 变体演进</text>

      <rect x="30" y="410" width="180" height="76" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="432" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">Double DQN</text>
      <text x="120" y="450" textAnchor="middle" fontSize="10" fill="#475569">主网络选动作</text>
      <text x="120" y="466" textAnchor="middle" fontSize="10" fill="#475569">目标网络估Q值</text>
      <text x="120" y="480" textAnchor="middle" fontSize="9" fill="#64748b">解决过估计</text>

      <rect x="230" y="410" width="180" height="76" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="320" y="432" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">Dueling DQN</text>
      <text x="320" y="450" textAnchor="middle" fontSize="10" fill="#475569">分解Q = V(s) + A(s,a)</text>
      <text x="320" y="466" textAnchor="middle" fontSize="10" fill="#475569">分离状态值与优势</text>
      <text x="320" y="480" textAnchor="middle" fontSize="9" fill="#64748b">提升学习效率</text>

      <rect x="430" y="410" width="180" height="76" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="520" y="432" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">Prioritized Replay</text>
      <text x="520" y="450" textAnchor="middle" fontSize="10" fill="#475569">按TD误差采样</text>
      <text x="520" y="466" textAnchor="middle" fontSize="10" fill="#475569">重要样本多采</text>
      <text x="520" y="480" textAnchor="middle" fontSize="9" fill="#64748b">加速收敛</text>

      <rect x="630" y="410" width="140" height="76" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="700" y="432" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">Rainbow</text>
      <text x="700" y="450" textAnchor="middle" fontSize="10" fill="#475569">六种改进组合</text>
      <text x="700" y="466" textAnchor="middle" fontSize="10" fill="#475569">集大成者</text>
      <text x="700" y="480" textAnchor="middle" fontSize="9" fill="#64748b">SOTA基线</text>

      {/* 底部总结 */}
      <rect x="30" y="502" width="740" height="60" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="524" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">适用场景：离散动作空间 + 高维状态输入</text>
      <text x="400" y="544" textAnchor="middle" fontSize="11" fill="#475569">核心思想：用神经网络近似Q函数，用贝尔曼方程构造回归目标，用梯度下降优化</text>
    </svg>
  );
}
