"use client";

export function PpConcurrencyDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="并发与解耦核心概念图">
      <defs>
        <linearGradient id="pp-cc-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pp-cc-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="pp-cc-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="pp-cc-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="pp-cc-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="pp-cc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">并发与解耦：管理共享状态</text>

      {/* 并发模型对比 */}
      <text x="400" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三种并发模型对比</text>

      {/* 共享状态模型 */}
      <rect x="20" y="80" width="240" height="120" rx="10" fill="url(#pp-cc-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="140" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7e22ce">共享状态 + 锁</text>
      <text x="140" y="124" textAnchor="middle" fontSize="10" fill="#475569">线程共享内存</text>
      <text x="140" y="140" textAnchor="middle" fontSize="10" fill="#475569">互斥锁保护临界区</text>
      <text x="140" y="156" textAnchor="middle" fontSize="10" fill="#475569">风险：死锁 / 竞态</text>
      <text x="140" y="172" textAnchor="middle" fontSize="10" fill="#475569">需手动管理锁</text>
      <text x="140" y="192" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">传统但复杂</text>

      {/* Actor 模型 */}
      <rect x="280" y="80" width="240" height="120" rx="10" fill="url(#pp-cc-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">Actor 模型</text>
      <text x="400" y="124" textAnchor="middle" fontSize="10" fill="#475569">独立进程 / 无共享状态</text>
      <text x="400" y="140" textAnchor="middle" fontSize="10" fill="#475569">通过消息通信</text>
      <text x="400" y="156" textAnchor="middle" fontSize="10" fill="#475569">异步 / 无死锁</text>
      <text x="400" y="172" textAnchor="middle" fontSize="10" fill="#475569">天然并行</text>
      <text x="400" y="192" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">并发即并行</text>

      {/* 黑板模型 */}
      <rect x="540" y="80" width="240" height="120" rx="10" fill="url(#pp-cc-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="660" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a16207">黑板模型</text>
      <text x="660" y="124" textAnchor="middle" fontSize="10" fill="#475569">共享黑板空间</text>
      <text x="660" y="140" textAnchor="middle" fontSize="10" fill="#475569">观察者模式解耦</text>
      <text x="660" y="156" textAnchor="middle" fontSize="10" fill="#475569">松耦合 / 非阻塞</text>
      <text x="660" y="172" textAnchor="middle" fontSize="10" fill="#475569">适合事件驱动</text>
      <text x="660" y="192" textAnchor="middle" fontSize="9" fontWeight="600" fill="#ca8a04">空间解耦</text>

      {/* 解耦策略 */}
      <text x="400" y="226" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">解耦策略</text>

      <rect x="20" y="240" width="370" height="56" rx="8" fill="url(#pp-cc-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="205" y="262" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">时间解耦</text>
      <text x="205" y="282" textAnchor="middle" fontSize="10" fill="#475569">异步消息 / 队列 / 不等返回</text>

      <rect x="410" y="240" width="370" height="56" rx="8" fill="url(#pp-cc-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="262" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">空间解耦</text>
      <text x="595" y="282" textAnchor="middle" fontSize="10" fill="#475569">独立进程 / 黑板 / 发布订阅</text>

      {/* 并发原则链 */}
      <text x="400" y="320" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">并发设计原则链</text>

      <rect x="20" y="332" width="120" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="80" y="352" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">识别共享</text>
      <text x="80" y="372" textAnchor="middle" fontSize="8" fill="#475569">找出可变状态</text>

      <path d="M140 360 L160 360" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-cc-arrow)" />

      <rect x="164" y="332" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="224" y="352" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">最小化共享</text>
      <text x="224" y="372" textAnchor="middle" fontSize="8" fill="#475569">尽量用不可变</text>

      <path d="M284 360 L304 360" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-cc-arrow)" />

      <rect x="308" y="332" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="368" y="352" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">选择模型</text>
      <text x="368" y="372" textAnchor="middle" fontSize="8" fill="#475569">Actor / 黑板</text>

      <path d="M428 360 L448 360" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-cc-arrow)" />

      <rect x="452" y="332" width="120" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="512" y="352" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">异步通信</text>
      <text x="512" y="372" textAnchor="middle" fontSize="8" fill="#475569">消息 / 队列</text>

      <path d="M572 360 L592 360" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-cc-arrow)" />

      <rect x="596" y="332" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="656" y="352" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">资源管理</text>
      <text x="656" y="372" textAnchor="middle" fontSize="8" fill="#475569">线程池 / 限流</text>

      <path d="M716 360 L736 360" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-cc-arrow)" />

      <rect x="740" y="332" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="364" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">闭环</text>

      {/* 底部总结 */}
      <rect x="20" y="410" width="760" height="48" rx="8" fill="url(#pp-cc-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="432" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">核心洞见</text>
      <text x="400" y="450" textAnchor="middle" fontSize="10" fill="#475569">并发 = 共享状态管理 + 时间/空间解耦 + 选择合适的并发模型</text>

      {/* 底部经验 */}
      <rect x="20" y="474" width="760" height="48" rx="8" fill="url(#pp-cc-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="400" y="496" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">实践要点</text>
      <text x="400" y="514" textAnchor="middle" fontSize="10" fill="#475569">共享可变状态 = 并发万恶之源 / Actor 消除共享 / 黑板解耦空间 / 队列解耦时间</text>

      {/* 底部脉络 */}
      <rect x="20" y="536" width="760" height="32" rx="8" fill="url(#pp-cc-3)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="556" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">并发与解耦：共享状态 → Actor 模型 → 黑板模式 → 时空解耦</text>
    </svg>
  );
}
