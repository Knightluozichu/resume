"use client";

export function EexDecisionProcessDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="决策的要素五步流程图">
      <defs>
        <linearGradient id="eex-dp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="eex-dp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="eex-dp-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eex-dp-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="eex-dp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">决策的要素：五步流程</text>

      {/* 顶部说明 */}
      <rect x="40" y="52" width="720" height="44" rx="8" fill="url(#eex-dp-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">有效的管理者不做很多决策——重要决策是稀少的，必须按要素逐一审慎处理</text>
      <text x="400" y="88" textAnchor="middle" fontSize="9" fill="#64748b">决策不是在"对"与"错"间选择，而常常是在"几乎对"与"可能错"间权衡</text>

      {/* 五要素流程 */}
      <text x="400" y="118" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">决策的五个要素</text>

      <rect x="40" y="132" width="138" height="170" rx="8" fill="url(#eex-dp-1)" opacity="0.9" />
      <text x="109" y="156" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">1 判别问题性质</text>
      <text x="109" y="178" textAnchor="middle" fontSize="9" fill="#e0f2fe">是通病还是特例？</text>
      <text x="109" y="196" textAnchor="middle" fontSize="9" fill="#e0f2fe">通病须建立规则</text>
      <text x="109" y="214" textAnchor="middle" fontSize="9" fill="#e0f2fe">与原则来处理</text>
      <text x="109" y="238" textAnchor="middle" fontSize="9" fill="#e0f2fe">特例才个案处理</text>
      <text x="109" y="262" textAnchor="middle" fontSize="9" fill="#e0f2fe">第一次出现的</text>
      <text x="109" y="280" textAnchor="middle" fontSize="9" fill="#e0f2fe">是特例</text>
      <text x="109" y="294" textAnchor="middle" fontSize="8" fill="#e0f2fe">复发即通病</text>

      <path d="M178 217 L196 217" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-dp-arrow)" />

      <rect x="200" y="132" width="138" height="170" rx="8" fill="url(#eex-dp-2)" opacity="0.9" />
      <text x="269" y="156" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">2 明确边界条件</text>
      <text x="269" y="178" textAnchor="middle" fontSize="9" fill="#ede9fe">决策必须满足</text>
      <text x="269" y="196" textAnchor="middle" fontSize="9" fill="#ede9fe">什么最低目标？</text>
      <text x="269" y="220" textAnchor="middle" fontSize="9" fill="#ede9fe">什么是它</text>
      <text x="269" y="238" textAnchor="middle" fontSize="9" fill="#ede9fe">必须达成的？</text>
      <text x="269" y="262" textAnchor="middle" fontSize="9" fill="#ede9fe">边界一旦不成立</text>
      <text x="269" y="280" textAnchor="middle" fontSize="9" fill="#ede9fe">决策就应放弃</text>
      <text x="269" y="294" textAnchor="middle" fontSize="8" fill="#ede9fe">= 最低限度要求</text>

      <path d="M338 217 L356 217" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-dp-arrow)" />

      <rect x="360" y="132" width="138" height="170" rx="8" fill="url(#eex-dp-3)" opacity="0.9" />
      <text x="429" y="156" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">3 从"正确"出发</text>
      <text x="429" y="178" textAnchor="middle" fontSize="9" fill="#fef3c7">先想什么是正确的</text>
      <text x="429" y="196" textAnchor="middle" fontSize="9" fill="#fef3c7">而非什么是</text>
      <text x="429" y="214" textAnchor="middle" fontSize="9" fill="#fef3c7">可接受的妥协</text>
      <text x="429" y="238" textAnchor="middle" fontSize="9" fill="#fef3c7">妥协是必要的</text>
      <text x="429" y="256" textAnchor="middle" fontSize="9" fill="#fef3c7">但须先知道</text>
      <text x="429" y="274" textAnchor="middle" fontSize="9" fill="#fef3c7">正确的是什么</text>
      <text x="429" y="294" textAnchor="middle" fontSize="8" fill="#fef3c7">才不会错妥协</text>

      <path d="M498 217 L516 217" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-dp-arrow)" />

      <rect x="520" y="132" width="138" height="170" rx="8" fill="url(#eex-dp-4)" opacity="0.9" />
      <text x="589" y="156" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">4 化为行动</text>
      <text x="589" y="178" textAnchor="middle" fontSize="9" fill="#d1fae5">决策须转化为</text>
      <text x="589" y="196" textAnchor="middle" fontSize="9" fill="#d1fae5">具体行动</text>
      <text x="589" y="220" textAnchor="middle" fontSize="9" fill="#d1fae5">谁来做？做什么？</text>
      <text x="589" y="238" textAnchor="middle" fontSize="9" fill="#d1fae5">何时完成？</text>
      <text x="589" y="262" textAnchor="middle" fontSize="9" fill="#d1fae5">执行者必须</text>
      <text x="589" y="280" textAnchor="middle" fontSize="9" fill="#d1fae5">理解并有能力</text>
      <text x="589" y="294" textAnchor="middle" fontSize="8" fill="#d1fae5">无行动 = 无决策</text>

      <path d="M658 217 L676 217" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-dp-arrow)" />

      <rect x="680" y="132" width="80" height="170" rx="8" fill="url(#eex-dp-1)" opacity="0.9" />
      <text x="720" y="156" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">5 建立</text>
      <text x="720" y="172" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">反馈</text>
      <text x="720" y="196" textAnchor="middle" fontSize="9" fill="#e0f2fe">用实际结果</text>
      <text x="720" y="214" textAnchor="middle" fontSize="9" fill="#e0f2fe">检验决策</text>
      <text x="720" y="238" textAnchor="middle" fontSize="9" fill="#e0f2fe">亲赴现场</text>
      <text x="720" y="256" textAnchor="middle" fontSize="9" fill="#e0f2fe">不靠报告</text>
      <text x="720" y="280" textAnchor="middle" fontSize="8" fill="#e0f2fe">决策会过时</text>
      <text x="720" y="294" textAnchor="middle" fontSize="8" fill="#e0f2fe">须持续校验</text>

      {/* 通病 vs 特例 */}
      <text x="400" y="326" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">问题性质的判别</text>

      <rect x="40" y="340" width="360" height="130" rx="8" fill="url(#eex-dp-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="220" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">通病</text>
      <text x="220" y="384" textAnchor="middle" fontSize="9" fill="#475569">表面特例实则潜藏普遍问题</text>
      <text x="220" y="402" textAnchor="middle" fontSize="9" fill="#475569">必须建立规则 / 政策 / 原则</text>
      <text x="220" y="420" textAnchor="middle" fontSize="9" fill="#475569">用制度从根本上解决</text>
      <text x="220" y="442" textAnchor="middle" fontSize="9" fill="#0369a1">例：反复出现的事故 = 系统缺陷</text>
      <text x="220" y="460" textAnchor="middle" fontSize="9" fill="#0369a1">而非个别偶然</text>

      <rect x="410" y="340" width="350" height="130" rx="8" fill="url(#eex-dp-3)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="585" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">特例</text>
      <text x="585" y="384" textAnchor="middle" fontSize="9" fill="#475569">真正独一无二的事件</text>
      <text x="585" y="402" textAnchor="middle" fontSize="9" fill="#475569">按个案原则处理</text>
      <text x="585" y="420" textAnchor="middle" fontSize="9" fill="#475569">无需建立通用规则</text>
      <text x="585" y="442" textAnchor="middle" fontSize="9" fill="#d97706">谨防把通病误判为特例</text>
      <text x="585" y="460" textAnchor="middle" fontSize="9" fill="#d97706">否则永远在救火</text>

      {/* 底部：决策的本质 */}
      <rect x="40" y="484" width="720" height="72" rx="8" fill="url(#eex-dp-2)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="506" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">决策的本质：把"特例"误当通病处理会浪费资源，把"通病"误当特例处理会永无宁日</text>
      <text x="400" y="526" textAnchor="middle" fontSize="10" fill="#475569">最危险的错误：把一个反复出现的通病，当成一连串孤立的特例来逐个应付</text>
      <text x="400" y="544" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">五要素缺一不可——尤其"化为行动"与"建立反馈"最易被忽视</text>
    </svg>
  );
}
