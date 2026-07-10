"use client";

export function Cc2SoftwareConstructionDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="软件构建基础：构建在软件生命周期中的位置">
      <defs>
        <linearGradient id="cc2-sc-lc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="cc2-sc-imp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="cc2-sc-qual" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="cc2-sc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">软件构建基础</text>

      {/* 上半部分：软件生命周期中的构建位置 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">软件生命周期中的构建位置</text>

      <rect x="20" y="74" width="120" height="50" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="80" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">问题定义</text>
      <text x="80" y="112" textAnchor="middle" fontSize="9" fill="#64748b">定义要解决什么</text>

      <path d="M140 99 L160 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-sc-arrow)" />

      <rect x="164" y="74" width="120" height="50" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="224" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">需求开发</text>
      <text x="224" y="112" textAnchor="middle" fontSize="9" fill="#64748b">明确解决方案</text>

      <path d="M284 99 L304 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-sc-arrow)" />

      <rect x="308" y="74" width="120" height="50" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="368" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">架构设计</text>
      <text x="368" y="112" textAnchor="middle" fontSize="9" fill="#64748b">高层结构设计</text>

      <path d="M428 99 L448 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-sc-arrow)" />

      <rect x="452" y="70" width="140" height="58" rx="8" fill="url(#cc2-sc-lc)" opacity="0.95" />
      <text x="522" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">软件构建</text>
      <text x="522" y="108" textAnchor="middle" fontSize="9" fill="#e0f2fe">详细设计/编码/调试/单元测试</text>
      <text x="522" y="120" textAnchor="middle" fontSize="8" fontWeight="600" fill="#fef9c3">核心活动</text>

      <path d="M592 99 L612 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-sc-arrow)" />

      <rect x="616" y="74" width="80" height="50" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="656" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">系统测试</text>
      <text x="656" y="112" textAnchor="middle" fontSize="9" fill="#64748b">整体验证</text>

      <path d="M696 99 L716 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-sc-arrow)" />

      <rect x="720" y="74" width="60" height="50" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="750" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">部署</text>
      <text x="750" y="112" textAnchor="middle" fontSize="9" fill="#64748b">上线运维</text>

      {/* 构建的重要性 */}
      <text x="400" y="160" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">构建为何是核心活动</text>

      <rect x="30" y="174" width="230" height="100" rx="8" fill="url(#cc2-sc-imp)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="145" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">占比最大</text>
      <text x="145" y="216" textAnchor="middle" fontSize="9" fill="#475569">构建占总开发时间的</text>
      <text x="145" y="230" textAnchor="middle" fontSize="9" fill="#475569">30% 到 80%</text>
      <text x="145" y="250" textAnchor="middle" fontSize="9" fill="#475569">是主要人力投入环节</text>
      <text x="145" y="266" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">源代码 = 唯一精确描述</text>

      <rect x="285" y="174" width="230" height="100" rx="8" fill="url(#cc2-sc-lc)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">质量决定器</text>
      <text x="400" y="216" textAnchor="middle" fontSize="9" fill="#475569">构建质量直接决定</text>
      <text x="400" y="230" textAnchor="middle" fontSize="9" fill="#475569">软件最终质量</text>
      <text x="400" y="250" textAnchor="middle" fontSize="9" fill="#475569">后期修复成本指数增长</text>
      <text x="400" y="266" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">越早发现越省成本</text>

      <rect x="540" y="174" width="230" height="100" rx="8" fill="url(#cc2-sc-qual)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="655" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">可衡量性</text>
      <text x="655" y="216" textAnchor="middle" fontSize="9" fill="#475569">构建活动有明确的</text>
      <text x="655" y="230" textAnchor="middle" fontSize="9" fill="#475569">质量指标和检查点</text>
      <text x="655" y="250" textAnchor="middle" fontSize="9" fill="#475569">代码审查与测试可量化</text>
      <text x="655" y="266" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">改进效果可见</text>

      {/* 构建隐喻 */}
      <text x="400" y="306" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">软件构建的隐喻</text>

      <rect x="30" y="320" width="175" height="76" rx="8" fill="#fffbeb" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="117" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">写作隐喻</text>
      <text x="117" y="358" textAnchor="middle" fontSize="9" fill="#475569">先写大纲再迭代</text>
      <text x="117" y="372" textAnchor="middle" fontSize="9" fill="#475569">逐步完善初稿</text>
      <text x="117" y="388" textAnchor="middle" fontSize="8" fill="#64748b">强调迭代与润色</text>

      <rect x="215" y="320" width="175" height="76" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="302" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">农耕隐喻</text>
      <text x="302" y="358" textAnchor="middle" fontSize="9" fill="#475569">播种后培育生长</text>
      <text x="302" y="372" textAnchor="middle" fontSize="9" fill="#475569">系统有机成长</text>
      <text x="302" y="388" textAnchor="middle" fontSize="8" fill="#64748b">强调增量发展</text>

      <rect x="400" y="320" width="175" height="76" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="487" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">建造隐喻</text>
      <text x="487" y="358" textAnchor="middle" fontSize="9" fill="#475569">先设计图纸再施工</text>
      <text x="487" y="372" textAnchor="middle" fontSize="9" fill="#475569">分层次逐步构建</text>
      <text x="487" y="388" textAnchor="middle" fontSize="8" fill="#64748b">强调规划与结构</text>

      <rect x="585" y="320" width="185" height="76" rx="8" fill="#fdf2f8" stroke="#dc2626" strokeWidth="1.5" />
      <text x="677" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">组合隐喻</text>
      <text x="677" y="358" textAnchor="middle" fontSize="9" fill="#475569">建造为骨架 + 增量为血肉</text>
      <text x="677" y="372" textAnchor="middle" fontSize="9" fill="#475569">规划与迭代结合</text>
      <text x="677" y="388" textAnchor="middle" fontSize="8" fill="#64748b">McConnell 推荐策略</text>

      {/* 构建质量目标 */}
      <text x="400" y="424" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">构建质量目标</text>

      <rect x="30" y="438" width="145" height="56" rx="8" fill="url(#cc2-sc-imp)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="102" y="460" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">最小复杂度</text>
      <text x="102" y="478" textAnchor="middle" fontSize="8" fill="#475569">降低认知负担</text>

      <rect x="185" y="438" width="145" height="56" rx="8" fill="url(#cc2-sc-lc)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="257" y="460" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">易于维护</text>
      <text x="257" y="478" textAnchor="middle" fontSize="8" fill="#475569">方便后续修改</text>

      <rect x="340" y="438" width="145" height="56" rx="8" fill="url(#cc2-sc-qual)" opacity="0.12" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="412" y="460" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">松散耦合</text>
      <text x="412" y="478" textAnchor="middle" fontSize="8" fill="#475569">模块独立</text>

      <rect x="495" y="438" width="145" height="56" rx="8" fill="url(#cc2-sc-imp)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="567" y="460" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">可扩展性</text>
      <text x="567" y="478" textAnchor="middle" fontSize="8" fill="#475569">支持功能增长</text>

      <rect x="650" y="438" width="120" height="56" rx="8" fill="url(#cc2-sc-lc)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="710" y="460" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">可重用性</text>
      <text x="710" y="478" textAnchor="middle" fontSize="8" fill="#475569">代码可复用</text>

      {/* 底部总结 */}
      <rect x="30" y="510" width="740" height="50" rx="8" fill="url(#cc2-sc-lc)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="532" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">构建 = 问题定义 → 需求 → 架构 → 构建 → 系统测试 → 部署 的核心环节</text>
      <text x="400" y="550" textAnchor="middle" fontSize="10" fill="#475569">源代码是软件最精确的描述；构建质量决定软件质量；用组合隐喻指导开发实践</text>
    </svg>
  );
}
