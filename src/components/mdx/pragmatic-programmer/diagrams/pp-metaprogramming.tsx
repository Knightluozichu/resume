"use client";

export function PpMetaprogrammingDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="元编程与代码生成核心概念图">
      <defs>
        <linearGradient id="pp-mp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pp-mp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="pp-mp-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="pp-mp-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="pp-mp-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="pp-mp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">元编程与代码生成</text>

      {/* 元数据驱动 */}
      <text x="400" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">元数据驱动设计</text>

      <rect x="30" y="80" width="350" height="100" rx="10" fill="url(#pp-mp-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7e22ce">元数据配置</text>
      <text x="205" y="124" textAnchor="middle" fontSize="10" fill="#475569">业务规则外置为配置数据</text>
      <text x="205" y="140" textAnchor="middle" fontSize="10" fill="#475569">代码只解释配置，不含规则</text>
      <text x="205" y="156" textAnchor="middle" fontSize="10" fill="#475569">配置变更不重新部署</text>
      <text x="205" y="174" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">代码 = 引擎，数据 = 策略</text>

      <rect x="420" y="80" width="350" height="100" rx="10" fill="url(#pp-mp-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="595" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">时间耦合</text>
      <text x="595" y="124" textAnchor="middle" fontSize="10" fill="#475569">方法调用 = 时间依赖</text>
      <text x="595" y="140" textAnchor="middle" fontSize="10" fill="#475569">分析：谁调用谁？何时？</text>
      <text x="595" y="156" textAnchor="middle" fontSize="10" fill="#475569">减少：并发 / 队列 / 调度</text>
      <text x="595" y="174" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">解耦时间 = 提升并发性</text>

      {/* 状态机与代码生成 */}
      <rect x="30" y="196" width="350" height="100" rx="10" fill="url(#pp-mp-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="205" y="220" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a16207">状态机</text>
      <text x="205" y="240" textAnchor="middle" fontSize="10" fill="#475569">事件 → 状态迁移</text>
      <text x="205" y="256" textAnchor="middle" fontSize="10" fill="#475569">优于嵌套条件 / switch</text>
      <text x="205" y="272" textAnchor="middle" fontSize="10" fill="#475569">状态转换表可视化</text>
      <text x="205" y="290" textAnchor="middle" fontSize="9" fontWeight="600" fill="#ca8a04">复杂逻辑 = 状态 + 事件</text>

      <rect x="420" y="196" width="350" height="100" rx="10" fill="url(#pp-mp-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="220" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">代码生成</text>
      <text x="595" y="240" textAnchor="middle" fontSize="10" fill="#475569">被动生成：向导 / 模板</text>
      <text x="595" y="256" textAnchor="middle" fontSize="10" fill="#475569">主动生成：运行时生成代码</text>
      <text x="595" y="272" textAnchor="middle" fontSize="10" fill="#475569">一次编写 → 多次生成</text>
      <text x="595" y="290" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">DRY 的终极武器</text>

      {/* 原则链 */}
      <text x="400" y="324" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">元编程原则链</text>

      <rect x="20" y="336" width="120" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="80" y="356" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">外置配置</text>
      <text x="80" y="376" textAnchor="middle" fontSize="8" fill="#475569">规则 → 数据</text>

      <path d="M140 364 L160 364" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-mp-arrow)" />

      <rect x="164" y="336" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="224" y="356" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">解耦时间</text>
      <text x="224" y="376" textAnchor="middle" fontSize="8" fill="#475569">减少调用依赖</text>

      <path d="M284 364 L304 364" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-mp-arrow)" />

      <rect x="308" y="336" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="368" y="356" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">状态机</text>
      <text x="368" y="376" textAnchor="middle" fontSize="8" fill="#475569">事件驱动</text>

      <path d="M428 364 L448 364" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-mp-arrow)" />

      <rect x="452" y="336" width="120" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="512" y="356" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">代码生成</text>
      <text x="512" y="376" textAnchor="middle" fontSize="8" fill="#475569">模板 → 代码</text>

      <path d="M572 364 L592 364" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-mp-arrow)" />

      <rect x="596" y="336" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="656" y="356" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">运行时解释</text>
      <text x="656" y="376" textAnchor="middle" fontSize="8" fill="#475569">引擎执行</text>

      <path d="M716 364 L736 364" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-mp-arrow)" />

      <rect x="740" y="336" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="368" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">闭环</text>

      {/* 底部总结 */}
      <rect x="20" y="414" width="760" height="48" rx="8" fill="url(#pp-mp-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="400" y="436" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">核心洞见</text>
      <text x="400" y="454" textAnchor="middle" fontSize="10" fill="#475569">元编程 = 用数据描述行为 + 用代码生成消除重复 + 用状态机管理复杂逻辑</text>

      {/* 底部经验 */}
      <rect x="20" y="478" width="760" height="48" rx="8" fill="url(#pp-mp-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="500" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">实践要点</text>
      <text x="400" y="518" textAnchor="middle" fontSize="10" fill="#475569">代码不应硬编码业务规则 / 配置驱动 &gt; 重新编译 / 状态机 &gt; 嵌套 if / 代码生成 &gt; 手动复制</text>

      {/* 底部脉络 */}
      <rect x="20" y="540" width="760" height="32" rx="8" fill="url(#pp-mp-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="2" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">元编程与代码生成：配置 → 时间解耦 → 状态机 → 代码生成</text>
    </svg>
  );
}
