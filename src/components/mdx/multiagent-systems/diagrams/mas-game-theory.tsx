"use client";

export function MasGameTheoryDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="博弈论与策略：收益矩阵与纳什均衡">
      <defs>
        <linearGradient id="mas-gt-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mas-gt-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mas-gt-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mas-gt-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mas-gt-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">博弈论与策略</text>

      {/* 博弈的要素 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">策略型博弈三要素</text>

      <rect x="40" y="76" width="240" height="60" rx="10" fill="url(#mas-gt-blue)" opacity="0.9" />
      <text x="160" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">参与人 Players</text>
      <text x="160" y="120" textAnchor="middle" fontSize="10" fill="#bfdbfe">决策主体集合 N</text>

      <rect x="300" y="76" width="240" height="60" rx="10" fill="url(#mas-gt-purple)" opacity="0.9" />
      <text x="420" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">策略 Strategies</text>
      <text x="420" y="120" textAnchor="middle" fontSize="10" fill="#ede9fe">每人可选行动集合</text>

      <rect x="560" y="76" width="200" height="60" rx="10" fill="url(#mas-gt-amber)" opacity="0.9" />
      <text x="660" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">收益 Payoffs</text>
      <text x="660" y="120" textAnchor="middle" fontSize="10" fill="#fef3c7">策略组合 → 效用</text>

      {/* 收益矩阵：囚徒困境 */}
      <text x="220" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">囚徒困境收益矩阵</text>

      <rect x="40" y="180" width="360" height="220" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      <text x="220" y="200" textAnchor="middle" fontSize="10" fill="#64748b">囚犯 B</text>
      <text x="120" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">沉默</text>
      <text x="320" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">背叛</text>
      <text x="56" y="262" fontSize="10" fontWeight="600" fill="#475569" transform="rotate(-90 56 262)">沉默</text>
      <text x="56" y="338" fontSize="10" fontWeight="600" fill="#475569" transform="rotate(-90 56 338)">背叛</text>

      <rect x="80" y="226" width="140" height="68" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="150" y="252" textAnchor="middle" fontSize="10" fill="#1e40af">A: -1</text>
      <text x="150" y="270" textAnchor="middle" fontSize="10" fill="#1e40af">B: -1</text>
      <text x="150" y="286" textAnchor="middle" fontSize="8" fill="#059669">合作双赢</text>

      <rect x="230" y="226" width="140" height="68" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="300" y="252" textAnchor="middle" fontSize="10" fill="#991b1b">A: -10</text>
      <text x="300" y="270" textAnchor="middle" fontSize="10" fill="#991b1b">B: 0</text>
      <text x="300" y="286" textAnchor="middle" fontSize="8" fill="#64748b">A 被出卖</text>

      <rect x="80" y="300" width="140" height="68" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="150" y="326" textAnchor="middle" fontSize="10" fill="#991b1b">A: 0</text>
      <text x="150" y="344" textAnchor="middle" fontSize="10" fill="#991b1b">B: -10</text>
      <text x="150" y="360" textAnchor="middle" fontSize="8" fill="#64748b">B 被出卖</text>

      <rect x="230" y="300" width="140" height="68" rx="6" fill="url(#mas-gt-red)" opacity="0.15" stroke="#dc2626" strokeWidth="2" />
      <text x="300" y="326" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">A: -6</text>
      <text x="300" y="344" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">B: -6</text>
      <text x="300" y="360" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">纳什均衡</text>

      {/* 均衡概念 */}
      <text x="580" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心解概念</text>

      <rect x="420" y="180" width="340" height="52" rx="8" fill="url(#mas-gt-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="436" y="202" fontSize="11" fontWeight="700" fill="#1e40af">占优策略</text>
      <text x="436" y="220" fontSize="9" fill="#475569">无论他人如何选，此策略总最优 → 背叛</text>

      <rect x="420" y="240" width="340" height="52" rx="8" fill="url(#mas-gt-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="436" y="262" fontSize="11" fontWeight="700" fill="#5b21b6">纳什均衡</text>
      <text x="436" y="280" fontSize="9" fill="#475569">无人单方面偏离可获益 (背叛, 背叛)</text>

      <rect x="420" y="300" width="340" height="52" rx="8" fill="url(#mas-gt-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="436" y="322" fontSize="11" fontWeight="700" fill="#92400e">帕累托最优</text>
      <text x="436" y="340" fontSize="9" fill="#475569">无人能更优而不损他人 (沉默, 沉默)</text>

      <rect x="420" y="360" width="340" height="40" rx="8" fill="url(#mas-gt-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="378" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">困境：个体理性 ≠ 集体最优</text>
      <text x="590" y="392" textAnchor="middle" fontSize="9" fill="#475569">需重复博弈 / 机制设计破局</text>

      {/* 博弈类型谱系 */}
      <text x="400" y="424" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">博弈类型谱系</text>

      <rect x="40" y="438" width="180" height="64" rx="8" fill="url(#mas-gt-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="130" y="460" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">零和博弈</text>
      <text x="130" y="478" textAnchor="middle" fontSize="9" fill="#475569">收益总和为零</text>
      <text x="130" y="494" textAnchor="middle" fontSize="9" fill="#475569">纯竞争 / minimax</text>

      <rect x="232" y="438" width="180" height="64" rx="8" fill="url(#mas-gt-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="322" y="460" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">混合动机</text>
      <text x="322" y="478" textAnchor="middle" fontSize="9" fill="#475569">既有冲突也有合作</text>
      <text x="322" y="494" textAnchor="middle" fontSize="9" fill="#475569">囚徒困境类型</text>

      <rect x="424" y="438" width="180" height="64" rx="8" fill="url(#mas-gt-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="514" y="460" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">协调博弈</text>
      <text x="514" y="478" textAnchor="middle" fontSize="9" fill="#475569">利益一致需对齐</text>
      <text x="514" y="494" textAnchor="middle" fontSize="9" fill="#475569">多均衡选择问题</text>

      <rect x="616" y="438" width="144" height="64" rx="8" fill="url(#mas-gt-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="688" y="460" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">重复博弈</text>
      <text x="688" y="478" textAnchor="middle" fontSize="9" fill="#475569">多次交互</text>
      <text x="688" y="494" textAnchor="middle" fontSize="9" fill="#475569">报复促成合作</text>

      <rect x="30" y="514" width="740" height="28" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="532" textAnchor="middle" fontSize="10" fill="#475569">求解路径：消除劣策略 → 找占优策略 → 纳什均衡（纯/混合）→ 帕累托效率检验</text>

      <rect x="30" y="548" width="740" height="22" rx="8" fill="url(#mas-gt-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="563" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">核心：博弈论为多智能体交互提供数学化分析框架，纳什均衡是稳定结局的基准解</text>
    </svg>
  );
}
