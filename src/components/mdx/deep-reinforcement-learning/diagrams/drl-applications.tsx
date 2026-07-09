"use client";

export function DrlApplicationsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="深度强化学习实战应用领域图">
      <defs>
        <linearGradient id="drl-ap-game" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="drl-ap-robot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="drl-ap-auto" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="drl-ap-other" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="drl-ap-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">实战应用：游戏 / 机器人 / 自动驾驶</text>

      {/* 三大应用领域 */}
      <rect x="30" y="58" width="240" height="200" rx="10" fill="url(#drl-ap-game)" opacity="0.1" stroke="#2563eb" strokeWidth="2" />
      <rect x="30" y="58" width="240" height="36" rx="10" fill="url(#drl-ap-game)" opacity="0.9" />
      <text x="150" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">游戏 Games</text>
      <text x="150" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">里程碑</text>
      <text x="150" y="130" textAnchor="middle" fontSize="10" fill="#475569">DQN → Atari (2015)</text>
      <text x="150" y="146" textAnchor="middle" fontSize="10" fill="#475569">AlphaGo → 围棋 (2016)</text>
      <text x="150" y="162" textAnchor="middle" fontSize="10" fill="#475569">AlphaZero → 自对弈 (2017)</text>
      <text x="150" y="178" textAnchor="middle" fontSize="10" fill="#475569">OpenAI Five → Dota2 (2018)</text>
      <text x="150" y="194" textAnchor="middle" fontSize="10" fill="#475569">AlphaStar → 星际2 (2019)</text>
      <text x="150" y="216" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">特点：完美/不完美信息</text>
      <text x="150" y="232" textAnchor="middle" fontSize="10" fill="#475569">自对弈 + 课程学习</text>
      <text x="150" y="248" textAnchor="middle" fontSize="9" fill="#64748b">算法：DQN / PPO / MCTS+RL</text>

      <rect x="280" y="58" width="240" height="200" rx="10" fill="url(#drl-ap-robot)" opacity="0.1" stroke="#7c3aed" strokeWidth="2" />
      <rect x="280" y="58" width="240" height="36" rx="10" fill="url(#drl-ap-robot)" opacity="0.9" />
      <text x="400" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">机器人 Robotics</text>
      <text x="400" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心挑战</text>
      <text x="400" y="130" textAnchor="middle" fontSize="10" fill="#475569">连续动作空间（高维）</text>
      <text x="400" y="146" textAnchor="middle" fontSize="10" fill="#475569">样本昂贵（真实机器人）</text>
      <text x="400" y="162" textAnchor="middle" fontSize="10" fill="#475569">安全约束（不能试错）</text>
      <text x="400" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">解决方案</text>
      <text x="400" y="198" textAnchor="middle" fontSize="10" fill="#475569">仿真训练 + sim-to-real</text>
      <text x="400" y="214" textAnchor="middle" fontSize="10" fill="#475569">域随机化 / 域适应</text>
      <text x="400" y="230" textAnchor="middle" fontSize="10" fill="#475569">柔性执行器 + 安全层</text>
      <text x="400" y="250" textAnchor="middle" fontSize="9" fill="#64748b">算法：SAC / TD3 / PPO</text>

      <rect x="530" y="58" width="240" height="200" rx="10" fill="url(#drl-ap-auto)" opacity="0.1" stroke="#f59e0b" strokeWidth="2" />
      <rect x="530" y="58" width="240" height="36" rx="10" fill="url(#drl-ap-auto)" opacity="0.9" />
      <text x="650" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">自动驾驶 Auto</text>
      <text x="650" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">应用层级</text>
      <text x="650" y="130" textAnchor="middle" fontSize="10" fill="#475569">感知层：传感器融合</text>
      <text x="650" y="146" textAnchor="middle" fontSize="10" fill="#475569">决策层：路径规划</text>
      <text x="650" y="162" textAnchor="middle" fontSize="10" fill="#475569">控制层：油门/刹车/转向</text>
      <text x="650" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">RL角色</text>
      <text x="650" y="198" textAnchor="middle" fontSize="10" fill="#475569">高速变道决策</text>
      <text x="650" y="214" textAnchor="middle" fontSize="10" fill="#475569">交叉口博弈</text>
      <text x="650" y="230" textAnchor="middle" fontSize="10" fill="#475569">节能驾驶优化</text>
      <text x="650" y="250" textAnchor="middle" fontSize="9" fill="#64748b">算法：PPO / SAC + 安全约束</text>

      {/* 其他应用 */}
      <text x="400" y="284" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">更多应用领域</text>

      <rect x="30" y="298" width="180" height="68" rx="8" fill="url(#drl-ap-other)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="120" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">自然语言处理</text>
      <text x="120" y="338" textAnchor="middle" fontSize="10" fill="#475569">RLHF 对齐LLM</text>
      <text x="120" y="354" textAnchor="middle" fontSize="10" fill="#475569">ChatGPT 的核心</text>

      <rect x="220" y="298" width="180" height="68" rx="8" fill="url(#drl-ap-other)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="310" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">推荐系统</text>
      <text x="310" y="338" textAnchor="middle" fontSize="10" fill="#475569">长期用户满意度</text>
      <text x="310" y="354" textAnchor="middle" fontSize="10" fill="#475569">探索新兴趣</text>

      <rect x="410" y="298" width="180" height="68" rx="8" fill="url(#drl-ap-other)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="500" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">金融交易</text>
      <text x="500" y="338" textAnchor="middle" fontSize="10" fill="#475569">组合优化</text>
      <text x="500" y="354" textAnchor="middle" fontSize="10" fill="#475569">风险管理</text>

      <rect x="600" y="298" width="170" height="68" rx="8" fill="url(#drl-ap-other)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">芯片设计</text>
      <text x="685" y="338" textAnchor="middle" fontSize="10" fill="#475569">布局规划</text>
      <text x="685" y="354" textAnchor="middle" fontSize="10" fill="#475569">超参数搜索</text>

      {/* 部署流程 */}
      <text x="400" y="394" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">工业部署流程</text>

      <rect x="30" y="408" width="140" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="100" y="430" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">1. 仿真环境</text>
      <text x="100" y="448" textAnchor="middle" fontSize="9" fill="#475569">搭建/选择模拟器</text>

      <path d="M170 436 L195 436" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#drl-ap-arrow)" />

      <rect x="200" y="408" width="140" height="56" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="270" y="430" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">2. 算法训练</text>
      <text x="270" y="448" textAnchor="middle" fontSize="9" fill="#475569">大规模并行</text>

      <path d="M340 436 L365 436" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#drl-ap-arrow)" />

      <rect x="370" y="408" width="140" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="440" y="430" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">3. 域随机化</text>
      <text x="440" y="448" textAnchor="middle" fontSize="9" fill="#475569">提升鲁棒性</text>

      <path d="M510 436 L535 436" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#drl-ap-arrow)" />

      <rect x="540" y="408" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="600" y="430" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">4. sim-to-real</text>
      <text x="600" y="448" textAnchor="middle" fontSize="9" fill="#475569">真实环境微调</text>

      <path d="M660 436 L685 436" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#drl-ap-arrow)" />

      <rect x="690" y="408" width="80" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="730" y="430" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">5. 部署</text>
      <text x="730" y="448" textAnchor="middle" fontSize="9" fill="#475569">监控+迭代</text>

      {/* 底部总结 */}
      <rect x="30" y="484" width="740" height="78" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="508" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">从游戏到现实：深度RL的工业化之路</text>
      <text x="400" y="528" textAnchor="middle" fontSize="11" fill="#475569">游戏是RL的「试验田」——完美仿真+无限数据+明确胜负</text>
      <text x="400" y="546" textAnchor="middle" fontSize="11" fill="#475569">机器人/自动驾驶是RL的「深水区」——安全约束+sim-to-real+样本效率</text>
    </svg>
  );
}
