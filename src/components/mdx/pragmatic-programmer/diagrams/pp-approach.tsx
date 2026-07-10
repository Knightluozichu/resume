"use client";

export function PpApproachDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="务实方法核心概念图">
      <defs>
        <linearGradient id="pp-ap-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pp-ap-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="pp-ap-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="pp-ap-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="pp-ap-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="pp-ap-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">务实方法：设计原则与构建策略</text>

      {/* DRY 原则 */}
      <rect x="30" y="58" width="350" height="80" rx="10" fill="url(#pp-ap-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="205" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7e22ce">DRY 原则（不要重复自己）</text>
      <text x="205" y="102" textAnchor="middle" fontSize="10" fill="#475569">知识唯一性：每个知识点在系统中有唯一</text>
      <text x="205" y="118" textAnchor="middle" fontSize="10" fill="#475569">的、权威的表示</text>
      <text x="205" y="132" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">重复 = 维护灾难的根源</text>

      {/* 正交性 */}
      <rect x="420" y="58" width="350" height="80" rx="10" fill="url(#pp-ap-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="595" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#15803d">正交性（解耦）</text>
      <text x="595" y="102" textAnchor="middle" fontSize="10" fill="#475569">消除不相关事物间的影响</text>
      <text x="595" y="118" textAnchor="middle" fontSize="10" fill="#475569">自上而下设计 + 分层 + 测试</text>
      <text x="595" y="132" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">变化局部化，测试易隔离</text>

      {/* 可逆性与曳光弹 */}
      <rect x="30" y="158" width="350" height="80" rx="10" fill="url(#pp-ap-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="205" y="182" textAnchor="middle" fontSize="14" fontWeight="700" fill="#a16207">可逆性</text>
      <text x="205" y="202" textAnchor="middle" fontSize="10" fill="#475569">如果某个决定可逆，就大胆尝试</text>
      <text x="205" y="218" textAnchor="middle" fontSize="10" fill="#475569">不要锁定架构，保持灵活</text>
      <text x="205" y="232" textAnchor="middle" fontSize="9" fontWeight="600" fill="#ca8a04">终极工具 = 抽象层 + 配置驱动</text>

      <rect x="420" y="158" width="350" height="80" rx="10" fill="url(#pp-ap-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="182" textAnchor="middle" fontSize="14" fontWeight="700" fill="#b91c1c">曳光弹</text>
      <text x="595" y="202" textAnchor="middle" fontSize="10" fill="#475569">用最小代码打通全链路</text>
      <text x="595" y="218" textAnchor="middle" fontSize="10" fill="#475569">前端 → 后端 → 数据库 → 返回</text>
      <text x="595" y="232" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">先验证架构，再充实细节</text>

      {/* 原型设计 */}
      <rect x="30" y="258" width="350" height="80" rx="10" fill="url(#pp-ap-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="205" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0369a1">原型设计</text>
      <text x="205" y="302" textAnchor="middle" fontSize="10" fill="#475569">探索风险与未知，用完即弃</text>
      <text x="205" y="318" textAnchor="middle" fontSize="10" fill="#475569">可忽略正确性 / 错误处理</text>
      <text x="205" y="332" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0ea5e9">曳光弹 = 保留 / 原型 = 丢弃</text>

      {/* 估算 */}
      <rect x="420" y="258" width="350" height="80" rx="10" fill="url(#pp-ap-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="595" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="#15803d">估算</text>
      <text x="595" y="302" textAnchor="middle" fontSize="10" fill="#475569">理解量级（小时 / 天 / 周 / 月）</text>
      <text x="595" y="318" textAnchor="middle" fontSize="10" fill="#475569">基于模型估算，检查循环</text>
      <text x="595" y="332" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">记录估算结果，持续校准</text>

      {/* 原则链 */}
      <text x="400" y="366" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">方法原则链</text>

      <rect x="20" y="378" width="120" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="80" y="398" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">DRY</text>
      <text x="80" y="418" textAnchor="middle" fontSize="8" fill="#475569">消除重复</text>

      <path d="M140 406 L160 406" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-ap-arrow)" />

      <rect x="164" y="378" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="224" y="398" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">正交性</text>
      <text x="224" y="418" textAnchor="middle" fontSize="8" fill="#475569">消除耦合</text>

      <path d="M284 406 L304 406" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-ap-arrow)" />

      <rect x="308" y="378" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="368" y="398" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">可逆性</text>
      <text x="368" y="418" textAnchor="middle" fontSize="8" fill="#475569">保持灵活</text>

      <path d="M428 406 L448 406" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-ap-arrow)" />

      <rect x="452" y="378" width="120" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="512" y="398" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">曳光弹</text>
      <text x="512" y="418" textAnchor="middle" fontSize="8" fill="#475569">验证架构</text>

      <path d="M572 406 L592 406" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-ap-arrow)" />

      <rect x="596" y="378" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="656" y="398" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">估算</text>
      <text x="656" y="418" textAnchor="middle" fontSize="8" fill="#475569">量化决策</text>

      <path d="M716 406 L736 406" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-ap-arrow)" />

      <rect x="740" y="378" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="410" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">闭环</text>

      {/* 底部总结 */}
      <rect x="20" y="456" width="760" height="48" rx="8" fill="url(#pp-ap-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="478" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心洞见</text>
      <text x="400" y="496" textAnchor="middle" fontSize="10" fill="#475569">好设计 = 消除重复 + 消除耦合 + 保持灵活 + 用最小代码验证架构 + 用估算量化决策</text>

      {/* 底部脉络 */}
      <rect x="20" y="524" width="760" height="44" rx="8" fill="url(#pp-ap-2)" opacity="0.08" stroke="#9333ea" strokeWidth="2" />
      <text x="400" y="552" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">务实方法：DRY → 正交性 → 可逆性 → 曳光弹 → 估算</text>
    </svg>
  );
}
