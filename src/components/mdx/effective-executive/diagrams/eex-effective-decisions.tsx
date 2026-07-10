"use client";

export function EexEffectiveDecisionsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="有效的决策判断而非计算">
      <defs>
        <linearGradient id="eex-ed-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="eex-ed-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="eex-ed-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eex-ed-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="eex-ed-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">有效的决策：判断而非计算</text>

      {/* 顶部：决策是判断 */}
      <rect x="40" y="52" width="720" height="44" rx="8" fill="url(#eex-ed-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">决策是一种判断——很少在"对"与"错"间选择，充其量在"几乎对"与"可能错"间权衡</text>
      <text x="400" y="88" textAnchor="middle" fontSize="9" fill="#64748b">有效的决策不是寻求一致意见，而是经过对峙的不同意见后形成的判断</text>

      {/* 从意见出发 */}
      <text x="400" y="118" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">从意见出发，而非从事实出发</text>

      <rect x="40" y="132" width="235" height="120" rx="8" fill="url(#eex-ed-3)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="157" y="156" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">错误：先收集事实</text>
      <text x="157" y="178" textAnchor="middle" fontSize="9" fill="#475569">以为事实自会导出结论</text>
      <text x="157" y="196" textAnchor="middle" fontSize="9" fill="#475569">但人总是先有看法</text>
      <text x="157" y="214" textAnchor="middle" fontSize="9" fill="#475569">再去找支持它的证据</text>
      <text x="157" y="238" textAnchor="middle" fontSize="9" fill="#d97706">事实不会"自己说话"</text>

      <path d="M275 192 L293 192" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-ed-arrow)" />

      <rect x="297" y="132" width="235" height="120" rx="8" fill="url(#eex-ed-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="414" y="156" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">正确：先听意见</text>
      <text x="414" y="178" textAnchor="middle" fontSize="9" fill="#475569">意见 = 未经验证的假设</text>
      <text x="414" y="196" textAnchor="middle" fontSize="9" fill="#475569">要求每个人说出看法</text>
      <text x="414" y="214" textAnchor="middle" fontSize="9" fill="#475569">并说明：需要什么</text>
      <text x="414" y="238" textAnchor="middle" fontSize="9" fill="#0369a1">事实才能验证它？</text>

      <path d="M532 192 L550 192" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-ed-arrow)" />

      <rect x="554" y="132" width="206" height="120" rx="8" fill="url(#eex-ed-4)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="657" y="156" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">检验：用事实</text>
      <text x="657" y="178" textAnchor="middle" fontSize="9" fill="#475569">围绕假设去收集</text>
      <text x="657" y="196" textAnchor="middle" fontSize="9" fill="#475569">能证伪或证实它的事实</text>
      <text x="657" y="214" textAnchor="middle" fontSize="9" fill="#475569">尤其要找反驳的证据</text>
      <text x="657" y="238" textAnchor="middle" fontSize="9" fill="#059669">而非只找支持证据</text>

      {/* 异议是必要的 */}
      <text x="400" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">异议是决策的必备要素</text>

      <rect x="40" y="292" width="235" height="120" rx="8" fill="url(#eex-ed-2)" opacity="0.9" />
      <text x="157" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">异议保护决策者</text>
      <text x="157" y="338" textAnchor="middle" fontSize="9" fill="#ede9fe">避免被一面之词俘虏</text>
      <text x="157" y="356" textAnchor="middle" fontSize="9" fill="#ede9fe">是"备选方案"的别名</text>
      <text x="157" y="374" textAnchor="middle" fontSize="9" fill="#ede9fe">让想象力不被束缚</text>
      <text x="157" y="396" textAnchor="middle" fontSize="9" fill="#ede9fe">激发打破常规的可能</text>

      <rect x="283" y="292" width="235" height="120" rx="8" fill="url(#eex-ed-2)" opacity="0.9" />
      <text x="400" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">规则：没有异议不决策</text>
      <text x="400" y="338" textAnchor="middle" fontSize="9" fill="#ede9fe">一致同意是危险信号</text>
      <text x="400" y="356" textAnchor="middle" fontSize="9" fill="#ede9fe">必须主动制造不同意见</text>
      <text x="400" y="374" textAnchor="middle" fontSize="9" fill="#ede9fe">反方意见可能才是对的</text>
      <text x="400" y="396" textAnchor="middle" fontSize="9" fill="#ede9fe">问：这件事的反面是什么？</text>

      <rect x="526" y="292" width="234" height="120" rx="8" fill="url(#eex-ed-2)" opacity="0.9" />
      <text x="643" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">是行动还是不行动？</text>
      <text x="643" y="338" textAnchor="middle" fontSize="9" fill="#ede9fe">大多数情况维持现状即可</text>
      <text x="643" y="356" textAnchor="middle" fontSize="9" fill="#ede9fe">只有好处远大于</text>
      <text x="643" y="374" textAnchor="middle" fontSize="9" fill="#ede9fe">维持现状的代价才行动</text>
      <text x="643" y="396" textAnchor="middle" fontSize="9" fill="#ede9fe">行动或不行动，绝不折中</text>

      {/* 底部：决策的胆识 */}
      <text x="400" y="438" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">有效决策者的胆识</text>

      <rect x="40" y="452" width="350" height="104" rx="8" fill="url(#eex-ed-3)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="215" y="476" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">不做决策也是一种决策</text>
      <text x="215" y="498" textAnchor="middle" fontSize="9" fill="#475569">若维持现状的收益大于改变</text>
      <text x="215" y="516" textAnchor="middle" fontSize="9" fill="#475569">就该果断"不做决策"</text>
      <text x="215" y="538" textAnchor="middle" fontSize="9" fill="#d97706">但须定期复查——边界会变化</text>

      <rect x="410" y="452" width="350" height="104" rx="8" fill="url(#eex-ed-4)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="585" y="476" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">好的决策者不做太多决策</text>
      <text x="585" y="498" textAnchor="middle" fontSize="9" fill="#475569">区分真正重要的问题与噪音</text>
      <text x="585" y="516" textAnchor="middle" fontSize="9" fill="#475569">只对少数关键事项做决策</text>
      <text x="585" y="538" textAnchor="middle" fontSize="9" fill="#059669">把日常交给规则与制度</text>
    </svg>
  );
}
