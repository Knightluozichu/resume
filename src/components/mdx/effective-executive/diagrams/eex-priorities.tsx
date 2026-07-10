"use client";

export function EexPrioritiesDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="要事优先与决定优先级的四条规则">
      <defs>
        <linearGradient id="eex-pr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="eex-pr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="eex-pr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eex-pr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="eex-pr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">要事优先：集中精力的秘诀</text>

      {/* 顶部：集中 = 秘诀 */}
      <rect x="40" y="52" width="720" height="44" rx="8" fill="url(#eex-pr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">有效性的秘诀是集中——一次只做一件事，且先做最重要的事</text>
      <text x="400" y="88" textAnchor="middle" fontSize="9" fill="#64748b">管理者可自由支配的时间本就少，唯有集中才能办成要事</text>

      {/* 两个前提 */}
      <text x="400" y="118" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">集中的两个前提</text>

      <rect x="40" y="132" width="350" height="96" rx="8" fill="url(#eex-pr-2)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="215" y="156" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">摆脱已经不再有价值的过去</text>
      <text x="215" y="178" textAnchor="middle" fontSize="9" fill="#475569">系统地问：如果不做这件事</text>
      <text x="215" y="196" textAnchor="middle" fontSize="9" fill="#475569">是否还会去做？若答案是"不会"</text>
      <text x="215" y="214" textAnchor="middle" fontSize="9" fill="#7c3aed">就果断放弃——定期剪除昨天</text>

      <rect x="410" y="132" width="350" height="96" rx="8" fill="url(#eex-pr-2)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="585" y="156" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">新任务排在旧任务之前</text>
      <text x="585" y="178" textAnchor="middle" fontSize="9" fill="#475569">资源有限，要开始新的</text>
      <text x="585" y="196" textAnchor="middle" fontSize="9" fill="#475569">必须先放下旧的——</text>
      <text x="585" y="214" textAnchor="middle" fontSize="9" fill="#7c3aed">先确定后事再定先事</text>

      {/* 决定优先级的四条规则 */}
      <text x="400" y="252" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">决定优先级的四条规则（靠勇气不靠分析）</text>

      <rect x="40" y="266" width="175" height="150" rx="8" fill="url(#eex-pr-3)" opacity="0.9" />
      <text x="127" y="290" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">重将来 轻过去</text>
      <text x="127" y="312" textAnchor="middle" fontSize="9" fill="#fef3c7">面向未来选择</text>
      <text x="127" y="330" textAnchor="middle" fontSize="9" fill="#fef3c7">而非沉湎过去</text>
      <text x="127" y="356" textAnchor="middle" fontSize="9" fill="#fef3c7">不为昨天的</text>
      <text x="127" y="374" textAnchor="middle" fontSize="9" fill="#fef3c7">遗产消耗今天的</text>
      <text x="127" y="392" textAnchor="middle" fontSize="9" fill="#fef3c7">资源与机会</text>

      <rect x="225" y="266" width="175" height="150" rx="8" fill="url(#eex-pr-3)" opacity="0.9" />
      <text x="312" y="290" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">重机会 轻问题</text>
      <text x="312" y="312" textAnchor="middle" fontSize="9" fill="#fef3c7">聚焦机会</text>
      <text x="312" y="330" textAnchor="middle" fontSize="9" fill="#fef3c7">而非只盯问题</text>
      <text x="312" y="356" textAnchor="middle" fontSize="9" fill="#fef3c7">问题只求解决</text>
      <text x="312" y="374" textAnchor="middle" fontSize="9" fill="#fef3c7">机会才创造</text>
      <text x="312" y="392" textAnchor="middle" fontSize="9" fill="#fef3c7">真正的成果</text>

      <rect x="410" y="266" width="175" height="150" rx="8" fill="url(#eex-pr-3)" opacity="0.9" />
      <text x="497" y="290" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">重方向 轻盲从</text>
      <text x="497" y="312" textAnchor="middle" fontSize="9" fill="#fef3c7">选择自己的</text>
      <text x="497" y="330" textAnchor="middle" fontSize="9" fill="#fef3c7">方向</text>
      <text x="497" y="356" textAnchor="middle" fontSize="9" fill="#fef3c7">不随大流</text>
      <text x="497" y="374" textAnchor="middle" fontSize="9" fill="#fef3c7">独立判断</text>
      <text x="497" y="392" textAnchor="middle" fontSize="9" fill="#fef3c7">走自己的路</text>

      <rect x="595" y="266" width="165" height="150" rx="8" fill="url(#eex-pr-3)" opacity="0.9" />
      <text x="677" y="290" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">重高远 轻安稳</text>
      <text x="677" y="312" textAnchor="middle" fontSize="9" fill="#fef3c7">志存高远</text>
      <text x="677" y="330" textAnchor="middle" fontSize="9" fill="#fef3c7">追求有差异的事</text>
      <text x="677" y="356" textAnchor="middle" fontSize="9" fill="#fef3c7">做能产生</text>
      <text x="677" y="374" textAnchor="middle" fontSize="9" fill="#fef3c7">真正差异的事</text>
      <text x="677" y="392" textAnchor="middle" fontSize="9" fill="#fef3c7">而非安全易行</text>

      {/* 后事与先事 */}
      <text x="400" y="440" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">优先与后置：同样的勇气</text>

      <rect x="40" y="454" width="350" height="98" rx="8" fill="url(#eex-pr-4)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="215" y="478" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">优先事项</text>
      <text x="215" y="500" textAnchor="middle" fontSize="9" fill="#475569">专注投入资源</text>
      <text x="215" y="518" textAnchor="middle" fontSize="9" fill="#475569">真正做好的少数要务</text>
      <text x="215" y="538" textAnchor="middle" fontSize="9" fill="#059669">决定"做什么"需要勇气</text>

      <rect x="410" y="454" width="350" height="98" rx="8" fill="url(#eex-pr-3)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="585" y="478" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">后置事项</text>
      <text x="585" y="500" textAnchor="middle" fontSize="9" fill="#475569">同样重要的是</text>
      <text x="585" y="518" textAnchor="middle" fontSize="9" fill="#475569">明确决定"不做什么"</text>
      <text x="585" y="538" textAnchor="middle" fontSize="9" fill="#d97706">放弃也需要勇气</text>
    </svg>
  );
}
