"use client";

export function DlrLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="深度学习入门4强化学习全书学习地图">
      <defs>
        <linearGradient id="dlr-lm-basics" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlr-lm-value" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlr-lm-model" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlr-lm-deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlr-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dlr-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深度学习入门4：强化学习（斋藤康毅） · 知识体系全景</text>

      {/* 左侧：四大学习阶段 */}
      <text x="160" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">RL学习主线</text>

      <rect x="40" y="84" width="240" height="58" rx="10" fill="url(#dlr-lm-basics)" opacity="0.95" />
      <text x="160" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">RL基础与建模</text>
      <text x="160" y="128" textAnchor="middle" fontSize="11" fill="#bfdbfe">智能体 / MDP / 值函数</text>

      <path d="M160 142 L160 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="40" y="150" width="240" height="58" rx="10" fill="url(#dlr-lm-value)" opacity="0.95" />
      <text x="160" y="174" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">无模型预测</text>
      <text x="160" y="194" textAnchor="middle" fontSize="11" fill="#ede9fe">动态规划 / 蒙特卡洛 / TD</text>

      <path d="M160 208 L160 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="40" y="216" width="240" height="58" rx="10" fill="url(#dlr-lm-model)" opacity="0.95" />
      <text x="160" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">无模型控制</text>
      <text x="160" y="260" textAnchor="middle" fontSize="11" fill="#fef3c7">Q学习 / SARSA / DQN</text>

      <path d="M160 274 L160 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="40" y="282" width="240" height="58" rx="10" fill="url(#dlr-lm-deep)" opacity="0.95" />
      <text x="160" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">策略方法与整合</text>
      <text x="160" y="326" textAnchor="middle" fontSize="11" fill="#fecaca">策略梯度 / 全书复习</text>

      <text x="160" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">从零实现强化学习核心算法</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="84" width="460" height="38" rx="8" fill="url(#dlr-lm-basics)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="108" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="108" fontSize="11" fill="#475569">全书学习地图——RL知识体系</text>

      <path d="M550 122 L550 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="320" y="130" width="460" height="38" rx="8" fill="url(#dlr-lm-basics)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="154" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="154" fontSize="11" fill="#475569">强化学习基础——智能体 / 环境 / 奖励</text>

      <path d="M550 168 L550 174" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="320" y="176" width="460" height="38" rx="8" fill="url(#dlr-lm-basics)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="200" fontSize="12" fontWeight="600" fill="#1e40af">ch2</text>
      <text x="372" y="200" fontSize="11" fill="#475569">马尔可夫决策过程——状态 / 转移 / 回报</text>

      <path d="M550 214 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="320" y="222" width="460" height="38" rx="8" fill="url(#dlr-lm-value)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="246" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="246" fontSize="11" fill="#475569">值函数与贝尔曼方程——状态值 / 动作值</text>

      <path d="M550 260 L550 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="320" y="268" width="460" height="38" rx="8" fill="url(#dlr-lm-value)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="292" fontSize="12" fontWeight="600" fill="#5b21b6">ch4</text>
      <text x="372" y="292" fontSize="11" fill="#475569">动态规划——策略评估 / 策略改进</text>

      <path d="M550 306 L550 312" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="320" y="314" width="460" height="38" rx="8" fill="url(#dlr-lm-value)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="338" fontSize="12" fontWeight="600" fill="#5b21b6">ch5</text>
      <text x="372" y="338" fontSize="11" fill="#475569">蒙特卡洛与时序差分——无模型预测</text>

      <path d="M550 352 L550 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="320" y="360" width="460" height="38" rx="8" fill="url(#dlr-lm-model)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="384" fontSize="12" fontWeight="600" fill="#92400e">ch6</text>
      <text x="372" y="384" fontSize="11" fill="#475569">Q学习与SARSA——无模型控制</text>

      <path d="M550 398 L550 404" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="320" y="406" width="460" height="38" rx="8" fill="url(#dlr-lm-model)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="430" fontSize="12" fontWeight="600" fill="#92400e">ch7</text>
      <text x="372" y="430" fontSize="11" fill="#475569">深度Q网络——神经网络近似值函数</text>

      <path d="M550 444 L550 450" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="320" y="452" width="460" height="38" rx="8" fill="url(#dlr-lm-deep)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="476" fontSize="12" fontWeight="600" fill="#991b1b">ch8</text>
      <text x="372" y="476" fontSize="11" fill="#475569">策略梯度方法——直接优化策略</text>

      <path d="M550 490 L550 496" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-lm-arrow)" />

      <rect x="320" y="498" width="460" height="38" rx="8" fill="url(#dlr-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="522" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="522" fontSize="11" fill="#475569">全书复习与知识整合——从值函数到策略梯度</text>

      {/* 底部学习路径 */}
      <rect x="40" y="550" width="740" height="26" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="567" textAnchor="middle" fontSize="11" fill="#475569">RL基础 → MDP → 值函数 → 动态规划 → MC/TD → Q学习 → DQN → 策略梯度 → 整合</text>
    </svg>
  );
}
