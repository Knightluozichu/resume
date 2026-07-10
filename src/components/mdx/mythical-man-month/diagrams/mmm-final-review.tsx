"use client";

export function MmmFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="人月神话全书复习知识整合图">
      <defs>
        <linearGradient id="mmm-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mmm-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="mmm-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="mmm-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="mmm-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：人月神话知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="120" height="56" rx="8" fill="url(#mmm-fr-1)" opacity="0.9" />
      <text x="80" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0 全景</text>
      <text x="80" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">知识图谱</text>

      <path d="M142 102 L162 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-fr-arrow)" />

      <rect x="166" y="74" width="120" height="56" rx="8" fill="url(#mmm-fr-1)" opacity="0.9" />
      <text x="226" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch1-2 基础</text>
      <text x="226" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">焦油坑+人月</text>

      <path d="M288 102 L308 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-fr-arrow)" />

      <rect x="312" y="74" width="120" height="56" rx="8" fill="url(#mmm-fr-2)" opacity="0.9" />
      <text x="372" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 团队</text>
      <text x="372" y="116" textAnchor="middle" fontSize="9" fill="#dcfce7">外科队伍+沟通</text>

      <path d="M434 102 L454 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-fr-arrow)" />

      <rect x="458" y="74" width="120" height="56" rx="8" fill="url(#mmm-fr-3)" opacity="0.9" />
      <text x="518" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 设计</text>
      <text x="518" y="116" textAnchor="middle" fontSize="9" fill="#f3e8ff">第二系统+架构</text>

      <path d="M580 102 L600 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-fr-arrow)" />

      <rect x="604" y="74" width="176" height="56" rx="8" fill="url(#mmm-fr-4)" opacity="0.9" />
      <text x="692" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch7-9 反思</text>
      <text x="692" y="116" textAnchor="middle" fontSize="9" fill="#fef9c3">银弹+经验+复习</text>

      {/* 四层知识视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四层知识视角</text>

      <rect x="20" y="176" width="180" height="150" rx="8" fill="url(#mmm-fr-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="110" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">项目困境层</text>
      <text x="110" y="220" textAnchor="middle" fontSize="9" fill="#475569">焦油坑五困境</text>
      <text x="110" y="236" textAnchor="middle" fontSize="9" fill="#475569">人月不可互换</text>
      <text x="110" y="252" textAnchor="middle" fontSize="9" fill="#475569">Brooks 定律</text>
      <text x="110" y="268" textAnchor="middle" fontSize="9" fill="#475569">系统层次演进</text>
      <text x="110" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">认知项目本质</text>

      <rect x="212" y="176" width="180" height="150" rx="8" fill="url(#mmm-fr-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="302" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">团队组织层</text>
      <text x="302" y="220" textAnchor="middle" fontSize="9" fill="#475569">外科手术队伍</text>
      <text x="302" y="236" textAnchor="middle" fontSize="9" fill="#475569">专业化分工</text>
      <text x="302" y="252" textAnchor="middle" fontSize="9" fill="#475569">通信开销公式</text>
      <text x="302" y="268" textAnchor="middle" fontSize="9" fill="#475569">文档驱动沟通</text>
      <text x="302" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">优化人力组织</text>

      <rect x="404" y="176" width="180" height="150" rx="8" fill="url(#mmm-fr-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="494" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">架构设计层</text>
      <text x="494" y="220" textAnchor="middle" fontSize="9" fill="#475569">概念完整性</text>
      <text x="494" y="236" textAnchor="middle" fontSize="9" fill="#475569">第二系统效应</text>
      <text x="494" y="252" textAnchor="middle" fontSize="9" fill="#475569">架构师职责</text>
      <text x="494" y="268" textAnchor="middle" fontSize="9" fill="#475569">设计实现分离</text>
      <text x="494" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">保障设计质量</text>

      <rect x="596" y="176" width="184" height="150" rx="8" fill="url(#mmm-fr-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="688" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">反思展望层</text>
      <text x="688" y="220" textAnchor="middle" fontSize="9" fill="#475569">没有银弹</text>
      <text x="688" y="236" textAnchor="middle" fontSize="9" fill="#475569">本质 vs 意外</text>
      <text x="688" y="252" textAnchor="middle" fontSize="9" fill="#475569">进攻策略</text>
      <text x="688" y="268" textAnchor="middle" fontSize="9" fill="#475569">经验修正</text>
      <text x="688" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">持续改进认知</text>

      {/* 核心定律链 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">人月神话核心定律链</text>

      <rect x="20" y="364" width="120" height="56" rx="8" fill="#fffbeb" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">焦油坑</text>
      <text x="80" y="404" textAnchor="middle" fontSize="8" fill="#475569">固有困境</text>

      <path d="M140 392 L160 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-fr-arrow)" />

      <rect x="164" y="364" width="120" height="56" rx="8" fill="#eff6ff" stroke="#16a34a" strokeWidth="1.5" />
      <text x="224" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">人月神话</text>
      <text x="224" y="404" textAnchor="middle" fontSize="8" fill="#475569">不可互换</text>

      <path d="M284 392 L304 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-fr-arrow)" />

      <rect x="308" y="364" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="368" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">Brooks定律</text>
      <text x="368" y="404" textAnchor="middle" fontSize="8" fill="#475569">加人更慢</text>

      <path d="M428 392 L448 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-fr-arrow)" />

      <rect x="452" y="364" width="120" height="56" rx="8" fill="#fff7ed" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="512" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">概念完整性</text>
      <text x="512" y="404" textAnchor="middle" fontSize="8" fill="#475569">设计核心</text>

      <path d="M572 392 L592 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-fr-arrow)" />

      <rect x="596" y="364" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="656" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">没有银弹</text>
      <text x="656" y="404" textAnchor="middle" fontSize="8" fill="#475569">本质复杂</text>

      <path d="M716 392 L736 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-fr-arrow)" />

      <rect x="740" y="364" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="396" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">闭环</text>

      <text x="400" y="440" textAnchor="middle" fontSize="9" fill="#64748b">逻辑链：困境认知 → 度量批判 → 组织优化 → 设计原则 → 复杂性本质 → 知识闭环</text>

      {/* 核心经验与演进方向 */}
      <text x="400" y="464" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心经验与演进方向</text>

      <rect x="30" y="478" width="370" height="48" rx="8" fill="url(#mmm-fr-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="215" y="498" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">核心经验</text>
      <text x="215" y="516" textAnchor="middle" fontSize="9" fill="#475569">人月不可互换 / 概念完整性 / 外科队伍 / 文档驱动 / 警惕银弹</text>

      <rect x="410" y="478" width="360" height="48" rx="8" fill="url(#mmm-fr-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="590" y="498" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">演进方向</text>
      <text x="590" y="516" textAnchor="middle" fontSize="9" fill="#475569">敏捷迭代 / 组件复用 / AI辅助 / 增量开发 / 人才培养</text>

      {/* 底部总结 */}
      <rect x="30" y="542" width="740" height="32" rx="8" fill="url(#mmm-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：焦油坑 → 人月 → 团队 → 沟通 → 设计 → 银弹 → 知识闭环</text>
    </svg>
  );
}
