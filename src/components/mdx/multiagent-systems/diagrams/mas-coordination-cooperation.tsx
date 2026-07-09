"use client";

export function MasCoordinationCooperationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="协调与合作机制：组织、规划与社会法则">
      <defs>
        <linearGradient id="mas-cc-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mas-cc-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mas-cc-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mas-cc-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mas-cc-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="mas-cc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">协调与合作机制</text>

      {/* 协调 vs 合作 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">协调 Coordination vs 合作 Cooperation</text>

      <rect x="40" y="76" width="360" height="64" rx="10" fill="url(#mas-cc-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="100" fontSize="12" fontWeight="700" fill="#1e40af">协调</text>
      <text x="60" y="120" fontSize="10" fill="#475569">管理智能体间的依赖关系</text>
      <text x="60" y="134" fontSize="9" fill="#64748b">确保行动不冲突、资源不浪费（可无共同目标）</text>

      <rect x="420" y="76" width="340" height="64" rx="10" fill="url(#mas-cc-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="440" y="100" fontSize="12" fontWeight="700" fill="#065f46">合作</text>
      <text x="440" y="120" fontSize="10" fill="#475569">为共同目标分工协作</text>
      <text x="440" y="134" fontSize="9" fill="#64748b">分享目标、能力与收益（含协调）</text>

      {/* 协调机制 */}
      <text x="400" y="168" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四大协调机制</text>

      <rect x="40" y="182" width="172" height="96" rx="8" fill="url(#mas-cc-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="126" y="204" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">组织结构</text>
      <text x="126" y="224" textAnchor="middle" fontSize="9" fill="#475569">层次化</text>
      <text x="126" y="242" textAnchor="middle" fontSize="9" fill="#475569">主从 / 团队</text>
      <text x="126" y="262" textAnchor="middle" fontSize="9" fill="#475569">角色与权威</text>
      <text x="126" y="274" textAnchor="middle" fontSize="8" fill="#64748b">静态分工</text>

      <rect x="224" y="182" width="172" height="96" rx="8" fill="url(#mas-cc-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="204" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">合同网</text>
      <text x="310" y="224" textAnchor="middle" fontSize="9" fill="#475569">市场机制</text>
      <text x="310" y="242" textAnchor="middle" fontSize="9" fill="#475569">招标-投标</text>
      <text x="310" y="262" textAnchor="middle" fontSize="9" fill="#475569">动态任务分配</text>
      <text x="310" y="274" textAnchor="middle" fontSize="8" fill="#64748b">动态分工</text>

      <rect x="408" y="182" width="172" height="96" rx="8" fill="url(#mas-cc-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="494" y="204" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">多智能体规划</text>
      <text x="494" y="224" textAnchor="middle" fontSize="9" fill="#475569">集中/分布规划</text>
      <text x="494" y="242" textAnchor="middle" fontSize="9" fill="#475569">联合意图</text>
      <text x="494" y="262" textAnchor="middle" fontSize="9" fill="#475569">共享计划</text>
      <text x="494" y="274" textAnchor="middle" fontSize="8" fill="#64748b">显式规划</text>

      <rect x="592" y="182" width="168" height="96" rx="8" fill="url(#mas-cc-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="676" y="204" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">社会法则</text>
      <text x="676" y="224" textAnchor="middle" fontSize="9" fill="#475569">规范约束</text>
      <text x="676" y="242" textAnchor="middle" fontSize="9" fill="#475569">禁止/义务</text>
      <text x="676" y="262" textAnchor="middle" fontSize="9" fill="#475569">隐式协调</text>
      <text x="676" y="274" textAnchor="middle" fontSize="8" fill="#64748b">规则约束</text>

      {/* 合同网流程 */}
      <text x="400" y="304" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">合同网协议流程</text>

      <rect x="40" y="318" width="120" height="50" rx="8" fill="url(#mas-cc-purple)" opacity="0.9" />
      <text x="100" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">管理者</text>
      <text x="100" y="358" textAnchor="middle" fontSize="8" fill="#ede9fe">有任务待派</text>

      <path d="M160 343 L188 343" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-cc-arrow)" />
      <text x="174" y="336" fontSize="8" fill="#64748b">公告</text>

      <rect x="192" y="318" width="120" height="50" rx="8" fill="url(#mas-cc-amber)" opacity="0.9" />
      <text x="252" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">投标者</text>
      <text x="252" y="358" textAnchor="middle" fontSize="8" fill="#fef3c7">评估并投标</text>

      <path d="M312 343 L340 343" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-cc-arrow)" />
      <text x="326" y="336" fontSize="8" fill="#64748b">投标</text>

      <rect x="344" y="318" width="120" height="50" rx="8" fill="url(#mas-cc-purple)" opacity="0.9" />
      <text x="404" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">管理者</text>
      <text x="404" y="358" textAnchor="middle" fontSize="8" fill="#ede9fe">评估并中标</text>

      <path d="M464 343 L492 343" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-cc-arrow)" />
      <text x="478" y="336" fontSize="8" fill="#64748b">中标</text>

      <rect x="496" y="318" width="120" height="50" rx="8" fill="url(#mas-cc-amber)" opacity="0.9" />
      <text x="556" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">承包者</text>
      <text x="556" y="358" textAnchor="middle" fontSize="8" fill="#fef3c7">执行任务</text>

      <path d="M616 343 L644 343" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-cc-arrow)" />
      <text x="630" y="336" fontSize="8" fill="#64748b">报告</text>

      <rect x="648" y="318" width="112" height="50" rx="8" fill="url(#mas-cc-green)" opacity="0.85" />
      <text x="704" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">交付结果</text>
      <text x="704" y="358" textAnchor="middle" fontSize="8" fill="#d1fae5">契约完成</text>

      {/* 联合意图与共享计划 */}
      <text x="220" y="398" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">联合心智状态</text>
      <text x="580" y="398" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">社会法则</text>

      <rect x="40" y="412" width="360" height="100" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="434" fontSize="10" fontWeight="700" fill="#5b21b6">联合目标</text>
      <text x="60" y="450" fontSize="9" fill="#475569">团队共同承诺达成的状态</text>
      <text x="60" y="472" fontSize="10" fontWeight="700" fill="#5b21b6">联合意图</text>
      <text x="60" y="488" fontSize="9" fill="#475569">共同承诺执行某计划</text>
      <text x="60" y="506" fontSize="9" fill="#64748b">核心：互知、互信、共担义务</text>

      <rect x="420" y="412" width="340" height="100" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="440" y="434" fontSize="10" fontWeight="700" fill="#065f46">规范 Norm</text>
      <text x="440" y="450" fontSize="9" fill="#475569">禁止做 X / 必须做 Y</text>
      <text x="440" y="472" fontSize="10" fontWeight="700" fill="#065f46">社会法则</text>
      <text x="440" y="488" fontSize="9" fill="#475569">约束行为的全局规范集</text>
      <text x="440" y="506" fontSize="9" fill="#64748b">价值：免通信协调、降低复杂度</text>

      <rect x="30" y="524" width="740" height="24" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="540" textAnchor="middle" fontSize="10" fill="#475569">机制选择：静态环境用组织结构；动态环境用合同网；强依赖用联合规划；大规模用社会法则</text>

      <rect x="30" y="552" width="740" height="20" rx="8" fill="url(#mas-cc-green)" opacity="0.08" stroke="#059669" strokeWidth="1" />
      <text x="400" y="566" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">核心：协调管理依赖，合作追求共赢；机制选择取决于环境动态性与依赖强度</text>
    </svg>
  );
}
