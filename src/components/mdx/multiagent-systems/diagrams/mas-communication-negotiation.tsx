"use client";

export function MasCommunicationNegotiationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="通信与协商：言语行为、ACL与协商协议">
      <defs>
        <linearGradient id="mas-cn-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mas-cn-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mas-cn-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mas-cn-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mas-cn-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="mas-cn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">通信与协商</text>

      {/* 为什么要通信 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">通信的价值：协调信息、降低不确定性</text>

      <rect x="40" y="76" width="180" height="56" rx="8" fill="url(#mas-cn-blue)" opacity="0.9" />
      <text x="130" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">信息共享</text>
      <text x="130" y="118" textAnchor="middle" fontSize="9" fill="#bfdbfe">传递状态与意图</text>

      <rect x="232" y="76" width="180" height="56" rx="8" fill="url(#mas-cn-purple)" opacity="0.9" />
      <text x="322" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">请求协助</text>
      <text x="322" y="118" textAnchor="middle" fontSize="9" fill="#ede9fe">委托任务与能力</text>

      <rect x="424" y="76" width="180" height="56" rx="8" fill="url(#mas-cn-amber)" opacity="0.9" />
      <text x="514" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">承诺协调</text>
      <text x="514" y="118" textAnchor="middle" fontSize="9" fill="#fef3c7">建立互信与契约</text>

      <rect x="616" y="76" width="144" height="56" rx="8" fill="url(#mas-cn-green)" opacity="0.9" />
      <text x="688" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">协商分利</text>
      <text x="688" y="118" textAnchor="middle" fontSize="9" fill="#d1fae5">达成双赢协议</text>

      {/* 言语行为理论 */}
      <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">言语行为理论 Speech Acts</text>

      <rect x="40" y="174" width="180" height="80" rx="8" fill="url(#mas-cn-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">断言类</text>
      <text x="130" y="216" textAnchor="middle" fontSize="9" fill="#475569">描述世界</text>
      <text x="130" y="234" textAnchor="middle" fontSize="9" fill="#475569">inform / confirm</text>
      <text x="130" y="248" textAnchor="middle" fontSize="8" fill="#64748b">真值可验</text>

      <rect x="232" y="174" width="180" height="80" rx="8" fill="url(#mas-cn-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="322" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">指令类</text>
      <text x="322" y="216" textAnchor="middle" fontSize="9" fill="#475569">要求行动</text>
      <text x="322" y="234" textAnchor="middle" fontSize="9" fill="#475569">request / order</text>
      <text x="322" y="248" textAnchor="middle" fontSize="8" fill="#64748b">期待服从</text>

      <rect x="424" y="174" width="180" height="80" rx="8" fill="url(#mas-cn-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="514" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">承诺类</text>
      <text x="514" y="216" textAnchor="middle" fontSize="9" fill="#475569">承担义务</text>
      <text x="514" y="234" textAnchor="middle" fontSize="9" fill="#475569">promise / commit</text>
      <text x="514" y="248" textAnchor="middle" fontSize="8" fill="#64748b">约束未来</text>

      <rect x="616" y="174" width="144" height="80" rx="8" fill="url(#mas-cn-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="688" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">声明类</text>
      <text x="688" y="216" textAnchor="middle" fontSize="9" fill="#475569">改变世界</text>
      <text x="688" y="234" textAnchor="middle" fontSize="9" fill="#475569">declare</text>
      <text x="688" y="248" textAnchor="middle" fontSize="8" fill="#64748b">话说即事实</text>

      {/* KQML / FIPA ACL */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">智能体通信语言 ACL</text>

      <rect x="40" y="294" width="360" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="316" fontSize="11" fontWeight="700" fill="#1e40af">KQML</text>
      <text x="60" y="334" fontSize="9" fill="#475569">知识查询与操作语言；performative + content + 语言 + 本体</text>

      <rect x="420" y="294" width="340" height="56" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="440" y="316" fontSize="11" fontWeight="700" fill="#5b21b6">FIPA ACL</text>
      <text x="440" y="334" fontSize="9" fill="#475569">标准通信原语；inform / request / propose / accept / reject</text>

      {/* 协商流程 */}
      <text x="400" y="374" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">协商协议流程</text>

      <rect x="40" y="388" width="120" height="48" rx="8" fill="url(#mas-cn-blue)" opacity="0.9" />
      <text x="100" y="410" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">提出提案</text>
      <text x="100" y="426" textAnchor="middle" fontSize="8" fill="#bfdbfe">propose</text>

      <path d="M160 412 L188 412" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-cn-arrow)" />

      <rect x="192" y="388" width="120" height="48" rx="8" fill="url(#mas-cn-amber)" opacity="0.9" />
      <text x="252" y="410" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">评估权衡</text>
      <text x="252" y="426" textAnchor="middle" fontSize="8" fill="#fef3c7">效用计算</text>

      <path d="M312 412 L340 412" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-cn-arrow)" />

      <rect x="344" y="388" width="120" height="48" rx="8" fill="url(#mas-cn-purple)" opacity="0.9" />
      <text x="404" y="410" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">反报价</text>
      <text x="404" y="426" textAnchor="middle" fontSize="8" fill="#ede9fe">counter-offer</text>

      <path d="M464 412 L492 412" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-cn-arrow)" />

      <rect x="496" y="388" width="120" height="48" rx="8" fill="url(#mas-cn-green)" opacity="0.9" />
      <text x="556" y="410" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">接受/拒绝</text>
      <text x="556" y="426" textAnchor="middle" fontSize="8" fill="#d1fae5">accept / reject</text>

      <path d="M616 412 L644 412" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-cn-arrow)" />

      <rect x="648" y="388" width="112" height="48" rx="8" fill="url(#mas-cn-red)" opacity="0.85" />
      <text x="704" y="410" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">达成契约</text>
      <text x="704" y="426" textAnchor="middle" fontSize="8" fill="#fecaca">agree</text>

      {/* 协商策略 */}
      <text x="400" y="464" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">协商策略</text>

      <rect x="40" y="478" width="230" height="56" rx="8" fill="url(#mas-cn-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="500" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">合同网协议</text>
      <text x="155" y="518" textAnchor="middle" fontSize="9" fill="#475569">招标-投标-中标，任务分配</text>

      <rect x="285" y="478" width="230" height="56" rx="8" fill="url(#mas-cn-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="500" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6"> monotonic 让步</text>
      <text x="400" y="518" textAnchor="middle" fontSize="9" fill="#475569">每轮不劣于上轮提案</text>

      <rect x="530" y="478" width="230" height="56" rx="8" fill="url(#mas-cn-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="645" y="500" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">论证式协商</text>
      <text x="645" y="518" textAnchor="middle" fontSize="9" fill="#475569">附带理由说服对手</text>

      <rect x="30" y="544" width="740" height="24" rx="8" fill="url(#mas-cn-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="560" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">核心：通信 = 有意义的言语行为；协商 = 在冲突利益间通过提案-反报价达成可接受契约</text>
    </svg>
  );
}
