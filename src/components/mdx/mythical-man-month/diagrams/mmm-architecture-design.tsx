"use client";

export function MmmArchitectureDesignDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="概念完整性与架构设计哲学示意图">
      <defs>
        <linearGradient id="mmm-ad-concept" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mmm-ad-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="mmm-ad-impl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="mmm-ad-sep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="mmm-ad-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">概念完整性：架构设计的核心原则</text>

      {/* 顶部：概念完整性核心 */}
      <rect x="200" y="56" width="400" height="50" rx="12" fill="url(#mmm-ad-concept)" opacity="0.95" />
      <text x="400" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">概念完整性（Conceptual Integrity）</text>
      <text x="400" y="98" textAnchor="middle" fontSize="11" fill="#e0f2fe">系统最重要的设计原则——一个系统只反映一套设计思想</text>

      <path d="M400 106 L400 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-ad-arrow)" />

      {/* 三层：架构师 vs 实现者 vs 用户 */}
      <text x="400" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">职责分离三角</text>

      <rect x="40" y="146" width="220" height="100" rx="10" fill="url(#mmm-ad-arch)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="150" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">架构师</text>
      <text x="150" y="190" textAnchor="middle" fontSize="10" fill="#475569">定义系统概念和用户界面</text>
      <text x="150" y="208" textAnchor="middle" fontSize="10" fill="#475569">决定「做什么」和「如何呈现」</text>
      <text x="150" y="230" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">一人或少数几人</text>

      <rect x="290" y="146" width="220" height="100" rx="10" fill="url(#mmm-ad-impl)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">实现者</text>
      <text x="400" y="190" textAnchor="middle" fontSize="10" fill="#475569">在架构约束下构建系统</text>
      <text x="400" y="208" textAnchor="middle" fontSize="10" fill="#475569">决定「如何实现」的技术细节</text>
      <text x="400" y="230" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">团队协作</text>

      <rect x="540" y="146" width="220" height="100" rx="10" fill="url(#mmm-ad-sep)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="650" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">用户</text>
      <text x="650" y="190" textAnchor="middle" fontSize="10" fill="#475569">体验一致的概念模型</text>
      <text x="650" y="208" textAnchor="middle" fontSize="10" fill="#475569">不需要理解内部实现</text>
      <text x="650" y="230" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">最终受益者</text>

      {/* 架构 vs 实现的分离 */}
      <text x="400" y="272" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">架构设计 vs 实现设计的分离</text>

      <rect x="40" y="284" width="360" height="120" rx="8" fill="url(#mmm-ad-arch)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="220" y="306" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">架构设计（外部）</text>
      <text x="60" y="328" fontSize="10" fill="#475569">- 完整、一致的用户概念模型</text>
      <text x="60" y="346" fontSize="10" fill="#475569">- 接口定义与交互方式</text>
      <text x="60" y="364" fontSize="10" fill="#475569">- 功能范围与优先级</text>
      <text x="60" y="382" fontSize="10" fill="#475569">- 面向用户，追求简洁和一致性</text>

      <rect x="420" y="284" width="340" height="120" rx="8" fill="url(#mmm-ad-impl)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="590" y="306" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">实现设计（内部）</text>
      <text x="440" y="328" fontSize="10" fill="#475569">- 数据结构与算法选择</text>
      <text x="440" y="346" fontSize="10" fill="#475569">- 性能优化与资源管理</text>
      <text x="440" y="364" fontSize="10" fill="#475569">- 代码组织与模块划分</text>
      <text x="440" y="382" fontSize="10" fill="#475569">- 面向开发者，追求效率和正确性</text>

      {/* 递增 vs 迭代 */}
      <text x="400" y="424" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">系统构建方式：瀑布 vs 迭代</text>

      <rect x="40" y="436" width="350" height="56" rx="8" fill="url(#mmm-ad-arch)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="215" y="456" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">瀑布模型（Brooks 倾向）</text>
      <text x="215" y="476" textAnchor="middle" fontSize="9" fill="#475569">架构 → 设计 → 编码 → 测试，严格分阶段</text>

      <rect x="410" y="436" width="350" height="56" rx="8" fill="url(#mmm-ad-impl)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="585" y="456" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">迭代增量（现代实践）</text>
      <text x="585" y="476" textAnchor="middle" fontSize="9" fill="#475569">小步快跑 → 反馈 → 修正 → 再增量</text>

      {/* 底部总结 */}
      <rect x="40" y="500" width="720" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#475569">架构师的职责是捍卫概念完整性，宁可放弃功能也不破坏一致性</text>

      <rect x="40" y="542" width="720" height="28" rx="8" fill="url(#mmm-ad-concept)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心理念：概念完整性 &gt; 功能完整性，一致性 &gt; 丰富性</text>
    </svg>
  );
}
