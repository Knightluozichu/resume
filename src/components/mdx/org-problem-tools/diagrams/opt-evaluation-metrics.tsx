"use client";

export function OptEvaluationMetricsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="评估与度量工具全景图">
      <defs>
        <linearGradient id="opt-em-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="opt-em-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="opt-em-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="opt-em-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">评估与度量工具 · 全景</text>

      {/* OKR */}
      <text x="180" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">OKR（目标与关键结果）</text>
      <rect x="40" y="72" width="280" height="180" rx="10" fill="url(#opt-em-1)" opacity="0.06" stroke="#0ea5e9" strokeWidth="1.5" />
      <rect x="56" y="86" width="248" height="34" rx="6" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="180" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">O 目标：提升客户满意度</text>
      <text x="180" y="114" textAnchor="middle" fontSize="8" fill="#475569">方向性、鼓舞人心、定性描述</text>
      <rect x="56" y="128" width="248" height="28" rx="6" fill="#8b5cf6" opacity="0.12" stroke="#8b5cf6" strokeWidth="1" />
      <text x="64" y="146" fontSize="9" fontWeight="600" fill="#7c3aed">KR1</text>
      <text x="96" y="146" fontSize="9" fill="#475569">NPS从30提升至50</text>
      <rect x="56" y="162" width="248" height="28" rx="6" fill="#8b5cf6" opacity="0.12" stroke="#8b5cf6" strokeWidth="1" />
      <text x="64" y="180" fontSize="9" fontWeight="600" fill="#7c3aed">KR2</text>
      <text x="96" y="180" fontSize="9" fill="#475569">客诉响应缩短至2小时</text>
      <rect x="56" y="196" width="248" height="28" rx="6" fill="#8b5cf6" opacity="0.12" stroke="#8b5cf6" strokeWidth="1" />
      <text x="64" y="214" fontSize="9" fontWeight="600" fill="#7c3aed">KR3</text>
      <text x="96" y="214" fontSize="9" fill="#475569">续约率达到85%</text>
      <text x="180" y="240" textAnchor="middle" fontSize="9" fill="#0ea5e9">O定方向、KR量化验证、鼓励挑战</text>

      {/* KPI */}
      <text x="540" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">KPI（关键绩效指标）</text>
      <rect x="340" y="72" width="420" height="180" rx="10" fill="url(#opt-em-2)" opacity="0.06" stroke="#8b5cf6" strokeWidth="1.5" />
      <rect x="356" y="88" width="120" height="50" rx="6" fill="#8b5cf6" opacity="0.12" stroke="#8b5cf6" strokeWidth="1" />
      <text x="416" y="108" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7c3aed">财务</text>
      <text x="416" y="126" textAnchor="middle" fontSize="8" fill="#475569">营收增长率</text>
      <rect x="486" y="88" width="120" height="50" rx="6" fill="#0ea5e9" opacity="0.12" stroke="#0ea5e9" strokeWidth="1" />
      <text x="546" y="108" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">客户</text>
      <text x="546" y="126" textAnchor="middle" fontSize="8" fill="#475569">满意度/留存率</text>
      <rect x="616" y="88" width="120" height="50" rx="6" fill="#f59e0b" opacity="0.12" stroke="#f59e0b" strokeWidth="1" />
      <text x="676" y="108" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706">运营</text>
      <text x="676" y="126" textAnchor="middle" fontSize="8" fill="#475569">效率/良率</text>
      <rect x="356" y="146" width="180" height="50" rx="6" fill="#10b981" opacity="0.12" stroke="#10b981" strokeWidth="1" />
      <text x="446" y="166" textAnchor="middle" fontSize="10" fontWeight="700" fill="#059669">学习成长</text>
      <text x="446" y="184" textAnchor="middle" fontSize="8" fill="#475569">培训完成率/技能认证</text>
      <rect x="546" y="146" width="190" height="50" rx="6" fill="#ef4444" opacity="0.12" stroke="#ef4444" strokeWidth="1" />
      <text x="641" y="166" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">SMART原则</text>
      <text x="641" y="184" textAnchor="middle" fontSize="8" fill="#475569">具体/可量化/可达成/相关/有时限</text>
      <rect x="356" y="204" width="380" height="34" rx="6" fill="#f1f5f9" stroke="#475569" strokeWidth="1" />
      <text x="546" y="222" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">OKR vs KPI：OKR重方向与挑战，KPI重考核与达标</text>
      <text x="546" y="236" textAnchor="middle" fontSize="8" fill="#64748b">OKR不与绩效奖金直接挂钩，KPI通常挂钩</text>

      {/* 平衡计分卡 */}
      <text x="200" y="280" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">平衡计分卡（BSC）</text>
      <rect x="40" y="290" width="320" height="190" rx="10" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <rect x="56" y="304" width="140" height="56" rx="6" fill="#8b5cf6" opacity="0.12" stroke="#8b5cf6" strokeWidth="1" />
      <text x="126" y="324" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7c3aed">财务视角</text>
      <text x="126" y="342" textAnchor="middle" fontSize="8" fill="#475569">股东怎么看我们</text>
      <text x="126" y="354" textAnchor="middle" fontSize="8" fill="#475569">利润/ROI/成本</text>
      <rect x="204" y="304" width="140" height="56" rx="6" fill="#0ea5e9" opacity="0.12" stroke="#0ea5e9" strokeWidth="1" />
      <text x="274" y="324" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">客户视角</text>
      <text x="274" y="342" textAnchor="middle" fontSize="8" fill="#475569">客户怎么看我们</text>
      <text x="274" y="354" textAnchor="middle" fontSize="8" fill="#475569">满意度/市占率</text>
      <rect x="56" y="368" width="140" height="56" rx="6" fill="#f59e0b" opacity="0.12" stroke="#f59e0b" strokeWidth="1" />
      <text x="126" y="388" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706">内部流程</text>
      <text x="126" y="406" textAnchor="middle" fontSize="8" fill="#475569">我们必须擅长什么</text>
      <text x="126" y="418" textAnchor="middle" fontSize="8" fill="#475569">效率/质量/周期</text>
      <rect x="204" y="368" width="140" height="56" rx="6" fill="#10b981" opacity="0.12" stroke="#10b981" strokeWidth="1" />
      <text x="274" y="388" textAnchor="middle" fontSize="10" fontWeight="700" fill="#059669">学习成长</text>
      <text x="274" y="406" textAnchor="middle" fontSize="8" fill="#475569">能否持续创造价值</text>
      <text x="274" y="418" textAnchor="middle" fontSize="8" fill="#475569">培训/创新/文化</text>
      <text x="200" y="450" textAnchor="middle" fontSize="9" fill="#d97706">四维度平衡：财务+客户+流程+成长</text>
      <text x="200" y="466" textAnchor="middle" fontSize="9" fill="#475569">战略落地为可度量的指标体系</text>

      {/* 360度评估 + NPS */}
      <text x="580" y="280" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">360度评估与净推荐值</text>
      <rect x="400" y="290" width="360" height="190" rx="10" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      {/* 360度 */}
      <text x="500" y="310" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">360度评估</text>
      <circle cx="500" cy="360" r="16" fill="#0ea5e9" opacity="0.2" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="500" y="364" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0284c7">本人</text>
      <rect x="455" y="324" width="36" height="18" rx="4" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="473" y="337" textAnchor="middle" fontSize="7" fill="#7c3aed">上级</text>
      <rect x="509" y="324" width="36" height="18" rx="4" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="527" y="337" textAnchor="middle" fontSize="7" fill="#7c3aed">下级</text>
      <rect x="455" y="378" width="36" height="18" rx="4" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="473" y="391" textAnchor="middle" fontSize="7" fill="#d97706">平级</text>
      <rect x="509" y="378" width="36" height="18" rx="4" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="527" y="391" textAnchor="middle" fontSize="7" fill="#d97706">外部</text>
      <line x1="475" y1="336" x2="488" y2="348" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="525" y1="336" x2="512" y2="348" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="475" y1="384" x2="488" y2="372" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="525" y1="384" x2="512" y2="372" stroke="#cbd5e1" strokeWidth="1" />
      <text x="500" y="412" textAnchor="middle" fontSize="8" fill="#475569">多维度全方位反馈</text>
      {/* NPS */}
      <line x1="570" y1="300" x2="570" y2="470" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 2" />
      <text x="680" y="310" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">NPS 净推荐值</text>
      <rect x="600" y="322" width="160" height="20" rx="4" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="1" />
      <text x="620" y="336" textAnchor="middle" fontSize="8" fill="#dc2626">贬损者 0-6</text>
      <rect x="600" y="346" width="160" height="20" rx="4" fill="#f59e0b" opacity="0.2" stroke="#f59e0b" strokeWidth="1" />
      <text x="620" y="360" textAnchor="middle" fontSize="8" fill="#d97706">被动者 7-8</text>
      <rect x="600" y="370" width="160" height="20" rx="4" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="1" />
      <text x="620" y="384" textAnchor="middle" fontSize="8" fill="#059669">推荐者 9-10</text>
      <rect x="600" y="398" width="160" height="28" rx="6" fill="#0ea5e9" opacity="0.12" stroke="#0ea5e9" strokeWidth="1" />
      <text x="680" y="416" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0284c7">NPS = 推荐者% - 贬损者%</text>
      <text x="680" y="440" textAnchor="middle" fontSize="8" fill="#475569">一个问题衡量客户忠诚度</text>
      <text x="680" y="456" textAnchor="middle" fontSize="8" fill="#475569">"你有多大可能推荐我们？"</text>

      {/* 底部总结 */}
      <rect x="40" y="498" width="720" height="62" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="518" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">评估度量核心逻辑</text>
      <rect x="60" y="528" width="680" height="24" rx="6" fill="url(#opt-em-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="544" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">战略目标（OKR） → 过程指标（KPI+BSC四维） → 行为反馈（360度） → 客户声音（NPS） → 闭环改进</text>
    </svg>
  );
}
