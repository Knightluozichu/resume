"use client";

export function RlcPracticalApplicationsDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="实际应用与对比：Q-Learning vs DQN vs Policy Gradient 方法选型">
      <defs>
        <linearGradient id="rlc-app-q" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rlc-app-dqn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="rlc-app-pg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rlc-app-ac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">实际应用与对比：RL方法选型矩阵</text>

      {/* 方法对比表 */}
      <text x="400" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四种核心方法对比</text>

      {/* Q-Learning */}
      <rect x="40" y="82" width="180" height="200" rx="8" fill="url(#rlc-app-q)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <rect x="40" y="82" width="180" height="36" rx="8" fill="url(#rlc-app-q)" opacity="0.95" />
      <text x="130" y="105" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Q-Learning</text>
      <text x="130" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">基于价值 · 无模型</text>
      <text x="130" y="156" textAnchor="middle" fontSize="10" fill="#475569">Q表存储值函数</text>
      <text x="130" y="176" textAnchor="middle" fontSize="10" fill="#475569">离散状态/动作空间</text>
      <text x="130" y="196" textAnchor="middle" fontSize="10" fill="#475569">ε-贪心探索</text>
      <text x="130" y="218" textAnchor="middle" fontSize="10" fill="#059669">优点: 简单稳定</text>
      <text x="130" y="236" textAnchor="middle" fontSize="10" fill="#dc2626">缺点: 不适用连续/大空间</text>
      <text x="130" y="260" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">适用: 小规模网格世界</text>

      {/* DQN */}
      <rect x="230" y="82" width="180" height="200" rx="8" fill="url(#rlc-app-dqn)" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
      <rect x="230" y="82" width="180" height="36" rx="8" fill="url(#rlc-app-dqn)" opacity="0.95" />
      <text x="320" y="105" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">DQN</text>
      <text x="320" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">深度Q网络 · 无模型</text>
      <text x="320" y="156" textAnchor="middle" fontSize="10" fill="#475569">NN近似Q函数</text>
      <text x="320" y="176" textAnchor="middle" fontSize="10" fill="#475569">连续状态/离散动作</text>
      <text x="320" y="196" textAnchor="middle" fontSize="10" fill="#475569">经验回放+目标网络</text>
      <text x="320" y="218" textAnchor="middle" fontSize="10" fill="#059669">优点: 处理大状态空间</text>
      <text x="320" y="236" textAnchor="middle" fontSize="10" fill="#dc2626">缺点: 训练不稳定</text>
      <text x="320" y="260" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">适用: Atari游戏/控制</text>

      {/* Policy Gradient */}
      <rect x="420" y="82" width="180" height="200" rx="8" fill="url(#rlc-app-pg)" opacity="0.12" stroke="#f59e0b" strokeWidth="2" />
      <rect x="420" y="82" width="180" height="36" rx="8" fill="url(#rlc-app-pg)" opacity="0.95" />
      <text x="510" y="105" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Policy Gradient</text>
      <text x="510" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">基于策略 · 无模型</text>
      <text x="510" y="156" textAnchor="middle" fontSize="10" fill="#475569">NN直接输出策略</text>
      <text x="510" y="176" textAnchor="middle" fontSize="10" fill="#475569">连续/离散动作均可</text>
      <text x="510" y="196" textAnchor="middle" fontSize="10" fill="#475569">随机策略探索</text>
      <text x="510" y="218" textAnchor="middle" fontSize="10" fill="#059669">优点: 连续动作友好</text>
      <text x="510" y="236" textAnchor="middle" fontSize="10" fill="#dc2626">缺点: 方差大收敛慢</text>
      <text x="510" y="260" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">适用: 机器人控制</text>

      {/* Actor-Critic */}
      <rect x="610" y="82" width="180" height="200" rx="8" fill="url(#rlc-app-ac)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <rect x="610" y="82" width="180" height="36" rx="8" fill="url(#rlc-app-ac)" opacity="0.95" />
      <text x="700" y="105" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Actor-Critic</text>
      <text x="700" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">混合方法 · 无模型</text>
      <text x="700" y="156" textAnchor="middle" fontSize="10" fill="#475569">策略+值函数双网络</text>
      <text x="700" y="176" textAnchor="middle" fontSize="10" fill="#475569">连续/离散均可</text>
      <text x="700" y="196" textAnchor="middle" fontSize="10" fill="#475569">A2C / A3C / PPO</text>
      <text x="700" y="218" textAnchor="middle" fontSize="10" fill="#059669">优点: 方差小收敛快</text>
      <text x="700" y="236" textAnchor="middle" fontSize="10" fill="#dc2626">缺点: 实现复杂</text>
      <text x="700" y="260" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">适用: 复杂控制任务</text>

      {/* 选型决策树 */}
      <text x="400" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">方法选型决策树</text>

      <rect x="280" y="322" width="240" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="345" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">状态空间离散且小?</text>

      <text x="200" y="382" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">是 →</text>
      <rect x="60" y="390" width="220" height="36" rx="8" fill="url(#rlc-app-q)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="170" y="413" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">Q-Learning (Q表)</text>

      <text x="600" y="382" textAnchor="middle" fontSize="11" fontWeight="600" fill="#f59e0b">否 ↓</text>
      <rect x="280" y="390" width="240" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="413" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">动作空间连续?</text>

      <text x="200" y="450" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">否 →</text>
      <rect x="60" y="458" width="220" height="36" rx="8" fill="url(#rlc-app-dqn)" opacity="0.15" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="170" y="481" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">DQN (NN近似Q)</text>

      <text x="600" y="450" textAnchor="middle" fontSize="11" fontWeight="600" fill="#f59e0b">是 →</text>
      <rect x="520" y="458" width="220" height="36" rx="8" fill="url(#rlc-app-pg)" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="630" y="481" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">Policy Gradient / AC</text>

      {/* C语言工程实践要点 */}
      <text x="400" y="522" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">C语言工程实践要点</text>
      <rect x="40" y="534" width="240" height="50" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="556" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">内存管理</text>
      <text x="160" y="574" textAnchor="middle" fontSize="10" fill="#475569">固定大小数组/环形缓冲区</text>

      <rect x="290" y="534" width="240" height="50" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="556" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">数值稳定</text>
      <text x="410" y="574" textAnchor="middle" fontSize="10" fill="#475569">梯度裁剪/学习率衰减</text>

      <rect x="540" y="534" width="240" height="50" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="556" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">调试技巧</text>
      <text x="660" y="574" textAnchor="middle" fontSize="10" fill="#475569">日志输出/Q值监控/奖励曲线</text>
    </svg>
  );
}
