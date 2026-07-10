"use client";

export function MisFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="认知天性全书复习知识整合图">
      <defs>
        <linearGradient id="mis-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mis-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="mis-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="mis-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="mis-fr-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="mis-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：认知天性知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="150" height="56" rx="8" fill="url(#mis-fr-1)" opacity="0.9" />
      <text x="95" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0 全景</text>
      <text x="95" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">知识图谱</text>

      <path d="M172 102 L194 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-fr-arrow)" />

      <rect x="198" y="74" width="150" height="56" rx="8" fill="url(#mis-fr-1)" opacity="0.9" />
      <text x="273" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch1-2 基础</text>
      <text x="273" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">迷思+检索</text>

      <path d="M350 102 L372 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-fr-arrow)" />

      <rect x="376" y="74" width="150" height="56" rx="8" fill="url(#mis-fr-3)" opacity="0.9" />
      <text x="451" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 技法</text>
      <text x="451" y="116" textAnchor="middle" fontSize="9" fill="#dcfce7">间隔+精细化</text>

      <path d="M528 102 L550 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-fr-arrow)" />

      <rect x="554" y="74" width="150" height="56" rx="8" fill="url(#mis-fr-4)" opacity="0.9" />
      <text x="629" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 反思</text>
      <text x="629" y="116" textAnchor="middle" fontSize="9" fill="#fef9c3">反馈+模型</text>

      <path d="M706 102 L728 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-fr-arrow)" />

      <rect x="732" y="74" width="48" height="56" rx="8" fill="url(#mis-fr-5)" opacity="0.9" />
      <text x="756" y="96" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">ch7-9</text>
      <text x="756" y="116" textAnchor="middle" fontSize="7" fill="#fee2e2">进阶+闭环</text>

      {/* 五大学习原则 */}
      <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五大学习原则</text>

      <rect x="20" y="174" width="148" height="130" rx="8" fill="url(#mis-fr-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="94" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">检索练习</text>
      <text x="94" y="218" textAnchor="middle" fontSize="9" fill="#475569">主动回忆</text>
      <text x="94" y="234" textAnchor="middle" fontSize="9" fill="#475569">而非被动阅读</text>
      <text x="94" y="254" textAnchor="middle" fontSize="9" fill="#475569">自测、小测验</text>
      <text x="94" y="270" textAnchor="middle" fontSize="9" fill="#475569">知识卡片</text>
      <text x="94" y="294" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">强化记忆通路</text>

      <rect x="176" y="174" width="148" height="130" rx="8" fill="url(#mis-fr-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="250" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">间隔穿插</text>
      <text x="250" y="218" textAnchor="middle" fontSize="9" fill="#475569">分散到多天</text>
      <text x="250" y="234" textAnchor="middle" fontSize="9" fill="#475569">而非集中突击</text>
      <text x="250" y="254" textAnchor="middle" fontSize="9" fill="#475569">混合不同类型</text>
      <text x="250" y="270" textAnchor="middle" fontSize="9" fill="#475569">利用遗忘曲线</text>
      <text x="250" y="294" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">巩固长期记忆</text>

      <rect x="332" y="174" width="148" height="130" rx="8" fill="url(#mis-fr-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="406" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">精细化生成</text>
      <text x="406" y="218" textAnchor="middle" fontSize="9" fill="#475569">用自己的话解释</text>
      <text x="406" y="234" textAnchor="middle" fontSize="9" fill="#475569">与新知识关联</text>
      <text x="406" y="254" textAnchor="middle" fontSize="9" fill="#475569">自己生成例子</text>
      <text x="406" y="270" textAnchor="middle" fontSize="9" fill="#475569">费曼学习法</text>
      <text x="406" y="294" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">深层语义编码</text>

      <rect x="488" y="174" width="148" height="130" rx="8" fill="url(#mis-fr-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="562" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">反馈反思</text>
      <text x="562" y="218" textAnchor="middle" fontSize="9" fill="#475569">自测发现盲区</text>
      <text x="562" y="234" textAnchor="middle" fontSize="9" fill="#475569">校准自我认知</text>
      <text x="562" y="254" textAnchor="middle" fontSize="9" fill="#475569">分析错误原因</text>
      <text x="562" y="270" textAnchor="middle" fontSize="9" fill="#475569">调整学习策略</text>
      <text x="562" y="294" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">消除认知偏差</text>

      <rect x="644" y="174" width="136" height="130" rx="8" fill="url(#mis-fr-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="712" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">心智模型</text>
      <text x="712" y="218" textAnchor="middle" fontSize="9" fill="#475569">从事实到结构</text>
      <text x="712" y="234" textAnchor="middle" fontSize="9" fill="#475569">建立知识网络</text>
      <text x="712" y="254" textAnchor="middle" fontSize="9" fill="#475569">可推理迁移</text>
      <text x="712" y="270" textAnchor="middle" fontSize="9" fill="#475569">持续迭代修正</text>
      <text x="712" y="294" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">深度理解</text>

      {/* 核心知识链 */}
      <text x="400" y="336" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心知识链</text>

      <rect x="20" y="350" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="370" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">迷思破除</text>
      <text x="80" y="390" textAnchor="middle" fontSize="8" fill="#475569">打破错觉</text>

      <path d="M140 378 L160 378" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-fr-arrow)" />

      <rect x="164" y="350" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="224" y="370" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">检索编码</text>
      <text x="224" y="390" textAnchor="middle" fontSize="8" fill="#475569">主动提取</text>

      <path d="M284 378 L304 378" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-fr-arrow)" />

      <rect x="308" y="350" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="368" y="370" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">间隔巩固</text>
      <text x="368" y="390" textAnchor="middle" fontSize="8" fill="#475569">遗忘+复习</text>

      <path d="M428 378 L448 378" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-fr-arrow)" />

      <rect x="452" y="350" width="120" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="512" y="370" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">反思校准</text>
      <text x="512" y="390" textAnchor="middle" fontSize="8" fill="#475569">反馈+修正</text>

      <path d="M572 378 L592 378" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-fr-arrow)" />

      <rect x="596" y="350" width="120" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="656" y="370" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">模型建构</text>
      <text x="656" y="390" textAnchor="middle" fontSize="8" fill="#475569">迁移+精通</text>

      <path d="M716 378 L736 378" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-fr-arrow)" />

      <rect x="740" y="350" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="382" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">回望</text>

      <text x="400" y="426" textAnchor="middle" fontSize="9" fill="#64748b">逻辑链：迷思破除 → 检索编码 → 间隔巩固 → 反思校准 → 模型建构 → 知识闭环</text>

      {/* 核心经验与演进方向 */}
      <text x="400" y="450" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心经验与演进方向</text>

      <rect x="30" y="464" width="370" height="48" rx="8" fill="url(#mis-fr-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="215" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">核心经验</text>
      <text x="215" y="502" textAnchor="middle" fontSize="9" fill="#475569">打破迷思 / 主动检索 / 间隔巩固 / 精细编码 / 反思校准 / 模型建构</text>

      <rect x="410" y="464" width="360" height="48" rx="8" fill="url(#mis-fr-5)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">演进方向</text>
      <text x="590" y="502" textAnchor="middle" fontSize="9" fill="#475569">刻意练习 / 知识迁移 / 成长思维 / 元认知 / 跨领域 / 终身学习</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#mis-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：迷思破除 → 检索编码 → 间隔巩固 → 反思校准 → 模型建构 → 终身成长</text>
    </svg>
  );
}
