"use client";

export function DrlExplorationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="探索与利用策略对比图">
      <defs>
        <linearGradient id="drl-ex-basic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="drl-ex-smart" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="drl-ex-intr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="drl-ex-bal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="drl-ex-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">探索与利用策略</text>

      {/* 探索-利用权衡 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心权衡：探索 vs 利用</text>

      <rect x="80" y="78" width="300" height="56" rx="8" fill="url(#drl-ex-basic)" opacity="0.9" />
      <text x="230" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">利用 Exploitation</text>
      <text x="230" y="122" textAnchor="middle" fontSize="10" fill="#bfdbfe">选择已知最优动作，最大化当前收益</text>

      <rect x="420" y="78" width="300" height="56" rx="8" fill="url(#drl-ex-smart)" opacity="0.9" />
      <text x="570" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">探索 Exploration</text>
      <text x="570" y="122" textAnchor="middle" fontSize="10" fill="#ede9fe">尝试未知动作，发现潜在更优策略</text>

      {/* 基础策略 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">基础探索策略</text>

      <rect x="30" y="176" width="240" height="90" rx="8" fill="url(#drl-ex-basic)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="198" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">ε-贪心 Epsilon-Greedy</text>
      <text x="150" y="218" textAnchor="middle" fontSize="10" fill="#475569">概率ε随机探索，1-ε选最优</text>
      <text x="150" y="236" textAnchor="middle" fontSize="10" fill="#475569">ε从1.0衰减到0.01</text>
      <text x="150" y="256" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">简单通用，DQN标配</text>

      <rect x="290" y="176" width="240" height="90" rx="8" fill="url(#drl-ex-basic)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="410" y="198" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">Softmax / Boltzmann</text>
      <text x="410" y="218" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">π(a) ∝ exp(Q(s,a)/τ)</text>
      <text x="410" y="236" textAnchor="middle" fontSize="10" fill="#475569">温度τ控制随机性</text>
      <text x="410" y="256" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">按Q值加权概率选择</text>

      <rect x="550" y="176" width="220" height="90" rx="8" fill="url(#drl-ex-basic)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="660" y="198" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">加噪 NoisyNet</text>
      <text x="660" y="218" textAnchor="middle" fontSize="10" fill="#475569">网络权重加可学习噪声</text>
      <text x="660" y="236" textAnchor="middle" fontSize="10" fill="#475569">状态依赖的自适应探索</text>
      <text x="660" y="256" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">无需手动调ε</text>

      {/* 高级策略 */}
      <text x="400" y="292" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">高级探索策略</text>

      <rect x="30" y="306" width="240" height="100" rx="8" fill="url(#drl-ex-smart)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="150" y="328" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">UCB 上置信界</text>
      <text x="150" y="348" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">a = argmax[Q + c√(lnN/n)]</text>
      <text x="150" y="366" textAnchor="middle" fontSize="10" fill="#475569">不确定性强时多探索</text>
      <text x="150" y="384" textAnchor="middle" fontSize="10" fill="#475569">访问次数少时奖励高</text>
      <text x="150" y="400" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">理论保证，多臂老虎机最优</text>

      <rect x="290" y="306" width="240" height="100" rx="8" fill="url(#drl-ex-intr)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="328" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">ICM 好奇心驱动</text>
      <text x="410" y="348" textAnchor="middle" fontSize="10" fill="#475569">预测下一状态特征</text>
      <text x="410" y="366" textAnchor="middle" fontSize="10" fill="#475569">预测误差 = 内在奖励</text>
      <text x="410" y="384" textAnchor="middle" fontSize="10" fill="#475569">鼓励访问「不可预测」状态</text>
      <text x="410" y="400" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">解决稀疏奖励问题</text>

      <rect x="550" y="306" width="220" height="100" rx="8" fill="url(#drl-ex-bal)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="328" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">熵正则化 Entropy</text>
      <text x="660" y="348" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">J = r + α · H(π)</text>
      <text x="660" y="366" textAnchor="middle" fontSize="10" fill="#475569">最大化策略熵</text>
      <text x="660" y="384" textAnchor="middle" fontSize="10" fill="#475569">鼓励动作分布均匀</text>
      <text x="660" y="400" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">SAC的核心机制</text>

      {/* 策略对比表 */}
      <text x="400" y="432" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">探索策略对比</text>

      <rect x="30" y="446" width="180" height="54" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="120" y="466" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">策略</text>
      <text x="120" y="484" textAnchor="middle" fontSize="9" fill="#64748b">探索方式</text>
      <text x="120" y="496" textAnchor="middle" fontSize="9" fill="#64748b">适用场景</text>

      <rect x="210" y="446" width="150" height="54" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="285" y="466" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">ε-贪心</text>
      <text x="285" y="484" textAnchor="middle" fontSize="9" fill="#475569">随机+贪心</text>
      <text x="285" y="496" textAnchor="middle" fontSize="9" fill="#475569">离散动作</text>

      <rect x="360" y="446" width="150" height="54" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="435" y="466" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">UCB</text>
      <text x="435" y="484" textAnchor="middle" fontSize="9" fill="#475569">不确定性</text>
      <text x="435" y="496" textAnchor="middle" fontSize="9" fill="#475569">多臂老虎机</text>

      <rect x="510" y="446" width="150" height="54" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="585" y="466" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">ICM</text>
      <text x="585" y="484" textAnchor="middle" fontSize="9" fill="#475569">好奇心</text>
      <text x="585" y="496" textAnchor="middle" fontSize="9" fill="#475569">稀疏奖励</text>

      <rect x="660" y="446" width="110" height="54" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="715" y="466" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">熵正则</text>
      <text x="715" y="484" textAnchor="middle" fontSize="9" fill="#475569">最大熵</text>
      <text x="715" y="496" textAnchor="middle" fontSize="9" fill="#475569">连续动作</text>

      {/* 底部总结 */}
      <rect x="30" y="516" width="740" height="46" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="536" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">探索是RL区别于监督学习的核心特征</text>
      <text x="400" y="554" textAnchor="middle" fontSize="10" fill="#475569">好的探索策略能加速收敛、逃离局部最优、应对稀疏奖励——是深度RL成功的关键</text>
    </svg>
  );
}
