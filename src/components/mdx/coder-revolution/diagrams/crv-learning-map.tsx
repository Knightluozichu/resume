"use client";

export function CrvLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="码农翻身知识全景图与十章学习路径">
      <defs>
        <linearGradient id="crv-lm-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="crv-lm-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="crv-lm-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="crv-lm-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="crv-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">码农翻身 · 知识全景图</text>

      {/* 左侧：四大学习阶段 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="78" width="240" height="56" rx="10" fill="url(#crv-lm-1)" opacity="0.95" />
      <text x="160" y="102" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础认知</text>
      <text x="160" y="120" textAnchor="middle" fontSize="11" fill="#e0f2fe">编程世界 / OOP与数据</text>

      <path d="M160 134 L160 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="40" y="142" width="240" height="56" rx="10" fill="url(#crv-lm-2)" opacity="0.95" />
      <text x="160" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Web与数据</text>
      <text x="160" y="184" textAnchor="middle" fontSize="11" fill="#dcfce7">网络 / 数据库 / 缓存</text>

      <path d="M160 198 L160 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="40" y="206" width="240" height="56" rx="10" fill="url(#crv-lm-3)" opacity="0.95" />
      <text x="160" y="230" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">架构进阶</text>
      <text x="160" y="248" textAnchor="middle" fontSize="11" fill="#fef9c3">分布式 / JVM / 语言</text>

      <path d="M160 262 L160 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="40" y="270" width="240" height="56" rx="10" fill="url(#crv-lm-4)" opacity="0.95" />
      <text x="160" y="294" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">实践与成长</text>
      <text x="160" y="312" textAnchor="middle" fontSize="11" fill="#fee2e2">DevOps / 职业成长</text>

      <path d="M160 326 L160 330" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="40" y="334" width="240" height="56" rx="10" fill="url(#crv-lm-1)" opacity="0.95" />
      <text x="160" y="358" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">知识闭环</text>
      <text x="160" y="376" textAnchor="middle" fontSize="11" fill="#e0f2fe">全书复习与整合</text>

      <text x="160" y="408" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0ea5e9">从编程世界到职业成长的完整脉络</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="78" width="460" height="34" rx="8" fill="url(#crv-lm-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="100" fontSize="12" fontWeight="600" fill="#0369a1">ch0</text>
      <text x="372" y="100" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 112 L550 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="320" y="118" width="460" height="34" rx="8" fill="url(#crv-lm-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="140" fontSize="12" fontWeight="600" fill="#0369a1">ch1</text>
      <text x="372" y="140" fontSize="11" fill="#475569">编程世界初探——从代码到执行</text>

      <path d="M550 152 L550 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="320" y="158" width="460" height="34" rx="8" fill="url(#crv-lm-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="180" fontSize="12" fontWeight="600" fill="#0369a1">ch2</text>
      <text x="372" y="180" fontSize="11" fill="#475569">面向对象与数据——封装与结构</text>

      <path d="M550 192 L550 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="320" y="198" width="460" height="34" rx="8" fill="url(#crv-lm-2)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="338" y="220" fontSize="12" fontWeight="600" fill="#15803d">ch3</text>
      <text x="372" y="220" fontSize="11" fill="#475569">Web与网络——HTTP与TCP/IP</text>

      <path d="M550 232 L550 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="320" y="238" width="460" height="34" rx="8" fill="url(#crv-lm-2)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="338" y="260" fontSize="12" fontWeight="600" fill="#15803d">ch4</text>
      <text x="372" y="260" fontSize="11" fill="#475569">数据库与缓存——ACID与缓存策略</text>

      <path d="M550 272 L550 276" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="320" y="278" width="460" height="34" rx="8" fill="url(#crv-lm-3)" opacity="0.12" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="338" y="300" fontSize="12" fontWeight="600" fill="#a16207">ch5</text>
      <text x="372" y="300" fontSize="11" fill="#475569">分布式与架构——CAP与微服务</text>

      <path d="M550 312 L550 316" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="320" y="318" width="460" height="34" rx="8" fill="url(#crv-lm-3)" opacity="0.12" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="338" y="340" fontSize="12" fontWeight="600" fill="#a16207">ch6</text>
      <text x="372" y="340" fontSize="11" fill="#475569">JVM与编程语言——虚拟机机制</text>

      <path d="M550 352 L550 356" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="320" y="358" width="460" height="34" rx="8" fill="url(#crv-lm-4)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="380" fontSize="12" fontWeight="600" fill="#b91c1c">ch7</text>
      <text x="372" y="380" fontSize="11" fill="#475569">DevOps与云计算——CI/CD与云</text>

      <path d="M550 392 L550 396" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="320" y="398" width="460" height="34" rx="8" fill="url(#crv-lm-4)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="420" fontSize="12" fontWeight="600" fill="#b91c1c">ch8</text>
      <text x="372" y="420" fontSize="11" fill="#475569">职业成长与思考——技术人之路</text>

      <path d="M550 432 L550 436" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-lm-arrow)" />

      <rect x="320" y="438" width="460" height="34" rx="8" fill="url(#crv-lm-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="460" fontSize="12" fontWeight="600" fill="#0369a1">ch9</text>
      <text x="372" y="460" fontSize="11" fill="#475569">全书复习与知识整合——系统闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="500" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="520" textAnchor="middle" fontSize="10" fill="#475569">全景 → 编程世界 → OOP → Web → 数据库 → 分布式 → JVM → DevOps → 职业 → 复习</text>

      {/* 底部核心脉络 */}
      <rect x="40" y="542" width="740" height="28" rx="8" fill="url(#crv-lm-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="410" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：基础 → Web数据 → 架构 → 实践成长 → 知识闭环</text>
    </svg>
  );
}
