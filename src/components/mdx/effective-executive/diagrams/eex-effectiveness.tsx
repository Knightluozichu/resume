"use client";

export function EexEffectivenessDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="有效性基础与五项习惯图">
      <defs>
        <linearGradient id="eex-ef-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="eex-ef-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="eex-ef-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eex-ef-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="eex-ef-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">有效性：做正确的事</text>

      {/* 顶部对比：效率 vs 有效性 */}
      <rect x="40" y="56" width="350" height="64" rx="10" fill="url(#eex-ef-3)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="215" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">效率</text>
      <text x="215" y="98" textAnchor="middle" fontSize="11" fill="#475569">把事情做对</text>
      <text x="215" y="114" textAnchor="middle" fontSize="10" fill="#64748b">输入产出比 / 更快更省</text>

      <rect x="410" y="56" width="350" height="64" rx="10" fill="url(#eex-ef-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="585" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">有效性</text>
      <text x="585" y="98" textAnchor="middle" fontSize="11" fill="#475569">做正确的事</text>
      <text x="585" y="114" textAnchor="middle" fontSize="10" fill="#64748b">成果 / 对组织的外部贡献</text>

      {/* 为什么需要有效性：知识工作者的处境 */}
      <text x="400" y="146" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">知识工作者为何需要有效性</text>

      <rect x="40" y="160" width="235" height="90" rx="8" fill="url(#eex-ef-2)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="157" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">时间属于别人</text>
      <text x="157" y="202" textAnchor="middle" fontSize="9" fill="#475569">需求来自各方</text>
      <text x="157" y="220" textAnchor="middle" fontSize="9" fill="#475569">自己的时间被</text>
      <text x="157" y="236" textAnchor="middle" fontSize="9" fill="#475569">切碎难以自主</text>

      <rect x="283" y="160" width="235" height="90" rx="8" fill="url(#eex-ef-2)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">身处组织之中</text>
      <text x="400" y="202" textAnchor="middle" fontSize="9" fill="#475569">贡献被他人使用</text>
      <text x="400" y="220" textAnchor="middle" fontSize="9" fill="#475569">价值须通过组织</text>
      <text x="400" y="236" textAnchor="middle" fontSize="9" fill="#475569">才能转化为成果</text>

      <rect x="526" y="160" width="234" height="90" rx="8" fill="url(#eex-ef-2)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="643" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">外部被过滤</text>
      <text x="643" y="202" textAnchor="middle" fontSize="9" fill="#475569">只能看到组织内</text>
      <text x="643" y="220" textAnchor="middle" fontSize="9" fill="#475569">真实的外部信息</text>
      <text x="643" y="236" textAnchor="middle" fontSize="9" fill="#475569">被层层抽象</text>

      {/* 五项习惯 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">有效性的五项习惯</text>

      <rect x="40" y="294" width="140" height="120" rx="8" fill="url(#eex-ef-1)" opacity="0.9" />
      <text x="110" y="316" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">1 掌握时间</text>
      <text x="110" y="338" textAnchor="middle" fontSize="9" fill="#e0f2fe">记录时间</text>
      <text x="110" y="356" textAnchor="middle" fontSize="9" fill="#e0f2fe">管理时间</text>
      <text x="110" y="374" textAnchor="middle" fontSize="9" fill="#e0f2fe">集中时间</text>
      <text x="110" y="400" textAnchor="middle" fontSize="8" fill="#e0f2fe">资源维度</text>

      <path d="M180 354 L198 354" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-ef-arrow)" />

      <rect x="202" y="294" width="140" height="120" rx="8" fill="url(#eex-ef-2)" opacity="0.9" />
      <text x="272" y="316" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">2 聚焦贡献</text>
      <text x="272" y="338" textAnchor="middle" fontSize="9" fill="#ede9fe">直接成果</text>
      <text x="272" y="356" textAnchor="middle" fontSize="9" fill="#ede9fe">价值确认</text>
      <text x="272" y="374" textAnchor="middle" fontSize="9" fill="#ede9fe">培养人才</text>
      <text x="272" y="400" textAnchor="middle" fontSize="8" fill="#ede9fe">成果维度</text>

      <path d="M342 354 L360 354" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-ef-arrow)" />

      <rect x="364" y="294" width="140" height="120" rx="8" fill="url(#eex-ef-3)" opacity="0.9" />
      <text x="434" y="316" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">3 发挥长处</text>
      <text x="434" y="338" textAnchor="middle" fontSize="9" fill="#fef3c7">用人所长</text>
      <text x="434" y="356" textAnchor="middle" fontSize="9" fill="#fef3c7">管理上司</text>
      <text x="434" y="374" textAnchor="middle" fontSize="9" fill="#fef3c7">自我反馈</text>
      <text x="434" y="400" textAnchor="middle" fontSize="8" fill="#fef3c7">用人维度</text>

      <path d="M504 354 L522 354" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-ef-arrow)" />

      <rect x="526" y="294" width="120" height="120" rx="8" fill="url(#eex-ef-4)" opacity="0.9" />
      <text x="586" y="316" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">4 要事优先</text>
      <text x="586" y="338" textAnchor="middle" fontSize="9" fill="#d1fae5">集中精力</text>
      <text x="586" y="356" textAnchor="middle" fontSize="9" fill="#d1fae5">一次一事</text>
      <text x="586" y="374" textAnchor="middle" fontSize="9" fill="#d1fae5">放弃昨天</text>
      <text x="586" y="400" textAnchor="middle" fontSize="8" fill="#d1fae5">取舍维度</text>

      <path d="M646 354 L664 354" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-ef-arrow)" />

      <rect x="668" y="294" width="92" height="120" rx="8" fill="url(#eex-ef-4)" opacity="0.9" />
      <text x="714" y="316" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">5 有效</text>
      <text x="714" y="332" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">决策</text>
      <text x="714" y="356" textAnchor="middle" fontSize="9" fill="#d1fae5">少数关键</text>
      <text x="714" y="374" textAnchor="middle" fontSize="9" fill="#d1fae5">判断取舍</text>
      <text x="714" y="400" textAnchor="middle" fontSize="8" fill="#d1fae5">判断维度</text>

      {/* 可学会 但不可教 */}
      <text x="400" y="442" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">有效性是习惯，可学会</text>

      <rect x="40" y="456" width="235" height="90" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="157" y="478" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">习惯复合体</text>
      <text x="157" y="500" textAnchor="middle" fontSize="9" fill="#475569">五项实践相互独立</text>
      <text x="157" y="518" textAnchor="middle" fontSize="9" fill="#475569">又彼此关联</text>
      <text x="157" y="536" textAnchor="middle" fontSize="9" fill="#475569">构成可训练的习惯</text>

      <rect x="283" y="456" width="235" height="90" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="478" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">可以学会</text>
      <text x="400" y="500" textAnchor="middle" fontSize="9" fill="#475569">通过反复练习</text>
      <text x="400" y="518" textAnchor="middle" fontSize="9" fill="#475569">形成肌肉记忆</text>
      <text x="400" y="536" textAnchor="middle" fontSize="9" fill="#475569">无需天赋才华</text>

      <rect x="526" y="456" width="234" height="90" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="643" y="478" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">但不可被教</text>
      <text x="643" y="500" textAnchor="middle" fontSize="9" fill="#475569">听课不会变有效</text>
      <text x="643" y="518" textAnchor="middle" fontSize="9" fill="#475569">必须自己去做</text>
      <text x="643" y="536" textAnchor="middle" fontSize="9" fill="#475569">在做中形成习惯</text>
    </svg>
  );
}
