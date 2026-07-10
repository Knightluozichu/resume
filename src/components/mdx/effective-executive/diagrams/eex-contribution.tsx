"use client";

export function EexContributionDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="聚焦贡献与三个领域及有效的人际关系">
      <defs>
        <linearGradient id="eex-cn-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="eex-cn-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="eex-cn-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eex-cn-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="eex-cn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">聚焦贡献：从努力到成果</text>

      {/* 顶部：问题转向 */}
      <rect x="40" y="52" width="350" height="64" rx="10" fill="url(#eex-cn-3)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="215" y="76" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">错误的问题</text>
      <text x="215" y="96" textAnchor="middle" fontSize="10" fill="#475569">我该做什么工作？</text>
      <text x="215" y="112" textAnchor="middle" fontSize="9" fill="#64748b">关注自己的职权范围</text>

      <path d="M390 84 L418 84" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-cn-arrow)" />

      <rect x="422" y="52" width="338" height="64" rx="10" fill="url(#eex-cn-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="591" y="76" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">正确的问题</text>
      <text x="591" y="96" textAnchor="middle" fontSize="10" fill="#475569">我能贡献什么？</text>
      <text x="591" y="112" textAnchor="middle" fontSize="9" fill="#64748b">关注组织需要什么成果</text>

      {/* 三个贡献领域 */}
      <text x="400" y="144" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">贡献的三个领域</text>

      <rect x="40" y="158" width="235" height="140" rx="8" fill="url(#eex-cn-1)" opacity="0.9" />
      <text x="157" y="182" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">直接成果</text>
      <text x="157" y="204" textAnchor="middle" fontSize="10" fill="#e0f2fe">组织存在的直接目的</text>
      <text x="157" y="224" textAnchor="middle" fontSize="10" fill="#e0f2fe">如企业的销售与利润</text>
      <text x="157" y="244" textAnchor="middle" fontSize="10" fill="#e0f2fe">如医院的病人救治</text>
      <text x="157" y="268" textAnchor="middle" fontSize="9" fill="#e0f2fe">成果必须清晰具体</text>
      <text x="157" y="286" textAnchor="middle" fontSize="9" fill="#e0f2fe">可衡量可验证</text>

      <rect x="283" y="158" width="235" height="140" rx="8" fill="url(#eex-cn-2)" opacity="0.9" />
      <text x="400" y="182" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">价值的确认</text>
      <text x="400" y="204" textAnchor="middle" fontSize="10" fill="#ede9fe">组织秉持的信念</text>
      <text x="400" y="224" textAnchor="middle" fontSize="10" fill="#ede9fe">不断重申与体现</text>
      <text x="400" y="244" textAnchor="middle" fontSize="10" fill="#ede9fe">如企业的服务标准</text>
      <text x="400" y="268" textAnchor="middle" fontSize="9" fill="#ede9fe">价值需要不断</text>
      <text x="400" y="286" textAnchor="middle" fontSize="9" fill="#ede9fe">被重申与确认</text>

      <rect x="526" y="158" width="234" height="140" rx="8" fill="url(#eex-cn-3)" opacity="0.9" />
      <text x="643" y="182" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">培养人才</text>
      <text x="643" y="204" textAnchor="middle" fontSize="10" fill="#fef3c7">组织持续的生命力</text>
      <text x="643" y="224" textAnchor="middle" fontSize="10" fill="#fef3c7">明天需要什么样的人</text>
      <text x="643" y="244" textAnchor="middle" fontSize="10" fill="#fef3c7">今天就要去培养</text>
      <text x="643" y="268" textAnchor="middle" fontSize="9" fill="#fef3c7">让他人因我而</text>
      <text x="643" y="286" textAnchor="middle" fontSize="9" fill="#fef3c7">获得成长与提升</text>

      {/* 贡献带来有效人际关系 */}
      <text x="400" y="322" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">聚焦贡献带来有效的人际关系</text>

      <rect x="40" y="336" width="175" height="80" rx="8" fill="url(#eex-cn-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="127" y="358" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">沟通</text>
      <text x="127" y="380" textAnchor="middle" fontSize="9" fill="#475569">下属理解期望</text>
      <text x="127" y="398" textAnchor="middle" fontSize="9" fill="#475569">贡献要求而非命令</text>

      <rect x="225" y="336" width="175" height="80" rx="8" fill="url(#eex-cn-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="312" y="358" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">团队合作</text>
      <text x="312" y="380" textAnchor="middle" fontSize="9" fill="#475569">围绕成果自发</text>
      <text x="312" y="398" textAnchor="middle" fontSize="9" fill="#475569">横向协作</text>

      <rect x="410" y="336" width="175" height="80" rx="8" fill="url(#eex-cn-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="497" y="358" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">自我发展</text>
      <text x="497" y="380" textAnchor="middle" fontSize="9" fill="#475569">为贡献而学习</text>
      <text x="497" y="398" textAnchor="middle" fontSize="9" fill="#475569">提升所需能力</text>

      <rect x="595" y="336" width="165" height="80" rx="8" fill="url(#eex-cn-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="677" y="358" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">培养他人</text>
      <text x="677" y="380" textAnchor="middle" fontSize="9" fill="#475569">要求高标准</text>
      <text x="677" y="398" textAnchor="middle" fontSize="9" fill="#475569">激发向上</text>

      {/* 底部：人际关系的实质 */}
      <rect x="40" y="432" width="720" height="40" rx="8" fill="url(#eex-cn-2)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="456" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">有效的人际关系看重实质而非和谐——挑战与异议比一团和气更有价值</text>

      {/* 贡献思考清单 */}
      <text x="400" y="496" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">贡献导向的三个关键问题</text>

      <rect x="40" y="508" width="235" height="48" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="157" y="528" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">1 我的成果在何处被使用？</text>
      <text x="157" y="546" textAnchor="middle" fontSize="9" fill="#475569">谁需要我的产出？</text>

      <rect x="283" y="508" width="235" height="48" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="528" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">2 我必须产出什么成果？</text>
      <text x="400" y="546" textAnchor="middle" fontSize="9" fill="#475569">才算真正做出贡献？</text>

      <rect x="526" y="508" width="234" height="48" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="643" y="528" textAnchor="middle" fontSize="9" fontWeight="600" fill="#d97706">3 我必须具备什么能力？</text>
      <text x="643" y="546" textAnchor="middle" fontSize="9" fill="#475569">才能产出这些成果？</text>
    </svg>
  );
}
