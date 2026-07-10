"use client";

export function PpCodecraftDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="代码工艺核心概念图">
      <defs>
        <linearGradient id="pp-cf-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pp-cf-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="pp-cf-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="pp-cf-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="pp-cf-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="pp-cf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">代码工艺：写出好代码</text>

      {/* 耦合管理 */}
      <text x="400" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">耦合管理：德米特法则</text>

      <rect x="20" y="80" width="370" height="80" rx="10" fill="url(#pp-cf-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7e22ce">德米特法则（LoD）</text>
      <text x="205" y="124" textAnchor="middle" fontSize="10" fill="#475569">只与直接朋友交谈</text>
      <text x="205" y="140" textAnchor="middle" fontSize="10" fill="#475569">不链式调用（a.b.c().d()）</text>
      <text x="205" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">减少耦合 = 提高灵活性</text>

      <rect x="410" y="80" width="370" height="80" rx="10" fill="url(#pp-cf-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="595" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">重构</text>
      <text x="595" y="124" textAnchor="middle" fontSize="10" fill="#475569">早重构、常重构、小步重构</text>
      <text x="595" y="140" textAnchor="middle" fontSize="10" fill="#475569">测试是重构的安全网</text>
      <text x="595" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">不改行为，只改结构</text>

      {/* 测试策略 */}
      <rect x="20" y="176" width="370" height="80" rx="10" fill="url(#pp-cf-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="205" y="200" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a16207">测试策略</text>
      <text x="205" y="220" textAnchor="middle" fontSize="10" fill="#475569">单元测试 / 集成测试 / 端到端</text>
      <text x="205" y="236" textAnchor="middle" fontSize="10" fill="#475569">测试金字塔：底层多 / 顶层少</text>
      <text x="205" y="250" textAnchor="middle" fontSize="9" fontWeight="600" fill="#ca8a04">覆盖率不是目的，是手段</text>

      <rect x="410" y="176" width="370" height="80" rx="10" fill="url(#pp-cf-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="200" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">基于属性的测试</text>
      <text x="595" y="220" textAnchor="middle" fontSize="10" fill="#475569">不写具体输入，定义属性</text>
      <text x="595" y="236" textAnchor="middle" fontSize="10" fill="#475569">框架自动生成测试用例</text>
      <text x="595" y="250" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">发现边界 case 的利器</text>

      {/* 工艺原则链 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">代码工艺原则链</text>

      <rect x="20" y="292" width="120" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="80" y="312" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">德米特法则</text>
      <text x="80" y="332" textAnchor="middle" fontSize="8" fill="#475569">减少耦合</text>

      <path d="M140 320 L160 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-cf-arrow)" />

      <rect x="164" y="292" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="224" y="312" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">解耦代码</text>
      <text x="224" y="332" textAnchor="middle" fontSize="8" fill="#475569">拆分 / 移动</text>

      <path d="M284 320 L304 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-cf-arrow)" />

      <rect x="308" y="292" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="368" y="312" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">编写测试</text>
      <text x="368" y="332" textAnchor="middle" fontSize="8" fill="#475569">安全网</text>

      <path d="M428 320 L448 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-cf-arrow)" />

      <rect x="452" y="292" width="120" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="512" y="312" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">持续重构</text>
      <text x="512" y="332" textAnchor="middle" fontSize="8" fill="#475569">改进结构</text>

      <path d="M572 320 L592 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-cf-arrow)" />

      <rect x="596" y="292" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="656" y="312" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">属性测试</text>
      <text x="656" y="332" textAnchor="middle" fontSize="8" fill="#475569">边界发现</text>

      <path d="M716 320 L736 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-cf-arrow)" />

      <rect x="740" y="292" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="324" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">闭环</text>

      {/* 重构时机 */}
      <text x="400" y="374" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">何时重构</text>

      <rect x="20" y="386" width="240" height="80" rx="10" fill="url(#pp-cf-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="140" y="408" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">重复代码</text>
      <text x="140" y="428" textAnchor="middle" fontSize="10" fill="#475569">违反 DRY</text>
      <text x="140" y="444" textAnchor="middle" fontSize="10" fill="#475569">提取公共方法</text>
      <text x="140" y="458" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">立即重构</text>

      <rect x="280" y="386" width="240" height="80" rx="10" fill="url(#pp-cf-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="400" y="408" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">过长函数</text>
      <text x="400" y="428" textAnchor="middle" fontSize="10" fill="#475569">超 30 行</text>
      <text x="400" y="444" textAnchor="middle" fontSize="10" fill="#475569">提取子函数</text>
      <text x="400" y="458" textAnchor="middle" fontSize="9" fontWeight="600" fill="#ca8a04">拆分职责</text>

      <rect x="540" y="386" width="240" height="80" rx="10" fill="url(#pp-cf-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="660" y="408" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">深层嵌套</text>
      <text x="660" y="428" textAnchor="middle" fontSize="10" fill="#475569">超 3 层</text>
      <text x="660" y="444" textAnchor="middle" fontSize="10" fill="#475569">卫语句扁平化</text>
      <text x="660" y="458" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">降低复杂度</text>

      {/* 底部总结 */}
      <rect x="20" y="484" width="760" height="32" rx="8" fill="url(#pp-cf-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="504" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">代码工艺 = 低耦合 + 高内聚 + 持续重构 + 全面测试</text>

      {/* 底部脉络 */}
      <rect x="20" y="528" width="760" height="32" rx="8" fill="url(#pp-cf-3)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">代码工艺：德米特法则 → 解耦 → 测试 → 重构 → 属性测试</text>
    </svg>
  );
}
