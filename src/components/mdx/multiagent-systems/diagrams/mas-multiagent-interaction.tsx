"use client";

export function MasMultiagentInteractionDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="多智能体交互：依赖关系与均衡">
      <defs>
        <linearGradient id="mas-mi-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mas-mi-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mas-mi-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mas-mi-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mas-mi-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="mas-mi-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">多智能体交互</text>

      {/* 单智能体 → 多智能体 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">从单智能体到多智能体</text>

      <rect x="40" y="76" width="200" height="60" rx="10" fill="url(#mas-mi-blue)" opacity="0.9" />
      <text x="140" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">单智能体</text>
      <text x="140" y="122" textAnchor="middle" fontSize="10" fill="#bfdbfe">环境是唯一他者</text>

      <path d="M240 106 L270 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-mi-arrow)" />

      <rect x="276" y="76" width="220" height="60" rx="10" fill="url(#mas-mi-purple)" opacity="0.9" />
      <text x="386" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">多智能体</text>
      <text x="386" y="122" textAnchor="middle" fontSize="10" fill="#ede9fe">他者也是决策主体</text>

      <path d="M496 106 L526 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-mi-arrow)" />

      <rect x="532" y="76" width="228" height="60" rx="10" fill="url(#mas-mi-amber)" opacity="0.9" />
      <text x="646" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">交互的本质</text>
      <text x="646" y="122" textAnchor="middle" fontSize="10" fill="#fef3c7">动作相互影响他人收益</text>

      {/* 依赖关系类型 */}
      <text x="400" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">智能体间的依赖关系</text>

      <rect x="40" y="184" width="180" height="80" rx="8" fill="url(#mas-mi-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="130" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">独立</text>
      <text x="130" y="228" textAnchor="middle" fontSize="9" fill="#475569">互不影响</text>
      <text x="130" y="248" textAnchor="middle" fontSize="9" fill="#475569">各自最优 = 联合最优</text>

      <rect x="232" y="184" width="180" height="80" rx="8" fill="url(#mas-mi-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="322" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">依赖</text>
      <text x="322" y="228" textAnchor="middle" fontSize="9" fill="#475569">一方需要他方结果</text>
      <text x="322" y="248" textAnchor="middle" fontSize="9" fill="#475569">等待 / 同步</text>

      <rect x="424" y="184" width="180" height="80" rx="8" fill="url(#mas-mi-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="514" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">交织</text>
      <text x="514" y="228" textAnchor="middle" fontSize="9" fill="#475569">双方互相需要</text>
      <text x="514" y="248" textAnchor="middle" fontSize="9" fill="#475569">协同 / 互锁</text>

      <rect x="616" y="184" width="144" height="80" rx="8" fill="url(#mas-mi-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="688" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">冲突</text>
      <text x="688" y="228" textAnchor="middle" fontSize="9" fill="#475569">目标对立</text>
      <text x="688" y="248" textAnchor="middle" fontSize="9" fill="#475569">竞争 / 博弈</text>

      {/* 交互维度：合作 vs 竞争 */}
      <text x="400" y="294" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">交互的两个维度</text>

      <rect x="40" y="308" width="360" height="120" rx="8" fill="url(#mas-mi-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="220" y="332" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">利益结构维度</text>
      <text x="60" y="356" fontSize="10" fill="#475569">完全一致 → 合作</text>
      <text x="60" y="376" fontSize="10" fill="#475569">部分一致 → 混合动机</text>
      <text x="60" y="396" fontSize="10" fill="#475569">完全对立 → 竞争</text>
      <text x="60" y="416" fontSize="9" fontWeight="600" fill="#059669">收益矩阵决定性质</text>

      <rect x="420" y="308" width="340" height="120" rx="8" fill="url(#mas-mi-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="590" y="332" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">能力结构维度</text>
      <text x="440" y="356" fontSize="10" fill="#475569">对称 → 同质智能体</text>
      <text x="440" y="376" fontSize="10" fill="#475569">不对称 → 异质智能体</text>
      <text x="440" y="396" fontSize="10" fill="#475569">控制权 → 主从 / 平等</text>
      <text x="440" y="416" fontSize="9" fontWeight="600" fill="#7c3aed">能力分布决定角色</text>

      {/* 均衡概念 */}
      <text x="400" y="456" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">稳定结局：均衡</text>

      <rect x="40" y="470" width="230" height="64" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="492" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">占优策略均衡</text>
      <text x="155" y="512" textAnchor="middle" fontSize="9" fill="#475569">无论他人如何，我最优</text>
      <text x="155" y="526" textAnchor="middle" fontSize="9" fill="#475569">单方稳定</text>

      <rect x="285" y="470" width="230" height="64" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="492" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">纳什均衡</text>
      <text x="400" y="512" textAnchor="middle" fontSize="9" fill="#475569">给定他人策略，我最优</text>
      <text x="400" y="526" textAnchor="middle" fontSize="9" fill="#475569">互为最优反应</text>

      <rect x="530" y="470" width="230" height="64" rx="8" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="645" y="492" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">帕累托最优</text>
      <text x="645" y="512" textAnchor="middle" fontSize="9" fill="#475569">无人能更优而不损他人</text>
      <text x="645" y="526" textAnchor="middle" fontSize="9" fill="#475569">效率边界</text>

      <rect x="30" y="544" width="740" height="24" rx="8" fill="url(#mas-mi-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="560" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">核心：多智能体 = 动作相互影响；依赖关系 + 利益/能力结构 共同决定交互性质与稳定结局</text>
    </svg>
  );
}
