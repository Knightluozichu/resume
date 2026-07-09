"use client";

export function PhaLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="凤凰架构全书学习地图">
      <defs>
        <linearGradient id="pha-lm-fund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="pha-lm-trans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="pha-lm-cons" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="pha-lm-reliable" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="pha-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">凤凰架构 · 知识体系全景</text>

      {/* 第一部分：架构演进 */}
      <rect x="20" y="50" width="185" height="180" rx="12" fill="url(#pha-lm-fund)" opacity="0.95" />
      <text x="112" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">架构演进</text>
      <line x1="35" y1="85" x2="190" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="107" textAnchor="middle" fontSize="11" fill="#bfdbfe">单体 / SOA</text>
      <text x="112" y="127" textAnchor="middle" fontSize="11" fill="#bfdbfe">微服务 / 云原生</text>
      <text x="112" y="153" textAnchor="middle" fontSize="10" fill="#93c5fd">演进史与动因</text>
      <text x="112" y="173" textAnchor="middle" fontSize="10" fill="#93c5fd">服务拆分边界</text>
      <text x="112" y="205" textAnchor="middle" fontSize="10" fill="#60a5fa">入门 · 地基</text>

      {/* 第二部分：分布式核心 */}
      <rect x="215" y="50" width="185" height="180" rx="12" fill="url(#pha-lm-trans)" opacity="0.95" />
      <text x="307" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">分布式核心</text>
      <line x1="230" y1="85" x2="385" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="107" textAnchor="middle" fontSize="11" fill="#cffafe">CAP / 分布式基础</text>
      <text x="307" y="127" textAnchor="middle" fontSize="11" fill="#cffafe">分布式事务</text>
      <text x="307" y="153" textAnchor="middle" fontSize="10" fill="#a5f3fc">共识 / 一致性</text>
      <text x="307" y="173" textAnchor="middle" fontSize="10" fill="#a5f3fc">Paxos / Raft</text>
      <text x="307" y="205" textAnchor="middle" fontSize="10" fill="#67e8f9">中级 · 理论</text>

      {/* 第三部分：工程实践 */}
      <rect x="410" y="50" width="185" height="180" rx="12" fill="url(#pha-lm-cons)" opacity="0.95" />
      <text x="502" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">工程实践</text>
      <line x1="425" y1="85" x2="580" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="107" textAnchor="middle" fontSize="11" fill="#fef3c7">缓存模式 / 一致性</text>
      <text x="502" y="127" textAnchor="middle" fontSize="11" fill="#fef3c7">负载均衡 / 限流</text>
      <text x="502" y="153" textAnchor="middle" fontSize="10" fill="#fde68a">熔断 / 降级 / 重试</text>
      <text x="502" y="173" textAnchor="middle" fontSize="10" fill="#fde68a">幂等 / 超时控制</text>
      <text x="502" y="205" textAnchor="middle" fontSize="10" fill="#fcd34d">实战 · 落地</text>

      {/* 第四部分：未来方向 */}
      <rect x="605" y="50" width="175" height="180" rx="12" fill="url(#pha-lm-reliable)" opacity="0.95" />
      <text x="692" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">未来方向</text>
      <line x1="620" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="107" textAnchor="middle" fontSize="11" fill="#ede9fe">无服务 / Serverless</text>
      <text x="692" y="127" textAnchor="middle" fontSize="11" fill="#ede9fe">服务网格 / Istio</text>
      <text x="692" y="153" textAnchor="middle" fontSize="10" fill="#ddd6fe">事件驱动架构</text>
      <text x="692" y="173" textAnchor="middle" fontSize="10" fill="#ddd6fe">凤凰工程理念</text>
      <text x="692" y="205" textAnchor="middle" fontSize="10" fill="#c4b5fd">前瞻 · 总结</text>

      {/* Arrows */}
      <path d="M205 140 L215 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#pha-lm-arrow)" />
      <path d="M400 140 L410 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#pha-lm-arrow)" />
      <path d="M595 140 L605 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#pha-lm-arrow)" />

      {/* 四条核心主线 */}
      <text x="400" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">四条核心主线</text>

      <rect x="20" y="280" width="185" height="100" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="112" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">主线一：架构演进</text>
      <text x="112" y="323" textAnchor="middle" fontSize="10" fill="#1e40af">单体 → SOA</text>
      <text x="112" y="343" textAnchor="middle" fontSize="10" fill="#1e40af">→ 微服务 → 云原生</text>
      <text x="112" y="367" textAnchor="middle" fontSize="10" fill="#1d4ed8">回答「怎么拆」</text>

      <rect x="215" y="280" width="185" height="100" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="307" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">主线二：分布式理论</text>
      <text x="307" y="323" textAnchor="middle" fontSize="10" fill="#155e75">CAP → 事务 → 共识</text>
      <text x="307" y="343" textAnchor="middle" fontSize="10" fill="#155e75">→ 一致性模型</text>
      <text x="307" y="367" textAnchor="middle" fontSize="10" fill="#0e7490">回答「怎么共识」</text>

      <rect x="410" y="280" width="185" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="502" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">主线三：可靠性工程</text>
      <text x="502" y="323" textAnchor="middle" fontSize="10" fill="#78350f">缓存 → 限流 → 熔断</text>
      <text x="502" y="343" textAnchor="middle" fontSize="10" fill="#78350f">→ 降级 → 幂等</text>
      <text x="502" y="367" textAnchor="middle" fontSize="10" fill="#92400e">回答「怎么保稳」</text>

      <rect x="605" y="280" width="175" height="100" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="692" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">主线四：未来演化</text>
      <text x="692" y="323" textAnchor="middle" fontSize="10" fill="#5b21b6">Serverless → Mesh</text>
      <text x="692" y="343" textAnchor="middle" fontSize="10" fill="#5b21b6">→ 事件驱动</text>
      <text x="692" y="367" textAnchor="middle" fontSize="10" fill="#6d28d9">回答「往哪走」</text>

      {/* 学习路径 */}
      <rect x="20" y="395" width="760" height="170" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="418" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（架构演进 → 分布式核心 → 工程实践 → 未来方向 → 全书整合）</text>
      <text x="400" y="441" textAnchor="middle" fontSize="11" fill="#475569">① 架构演进（单体/SOA/微服务/云原生/演进动因/服务拆分）→ ② 分布式核心（CAP/分布式基础/事务/共识/一致性模型）</text>
      <text x="400" y="461" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 工程实践（缓存模式/负载均衡/限流/熔断降级/幂等/超时）→ ④ 未来方向（Serverless/服务网格/事件驱动/凤凰工程）</text>
      <text x="400" y="481" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 全书复习整合</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#64748b">四主线在「CAP-事务-共识」（理论交汇）与「缓存-限流-熔断」（工程交汇）处闭环</text>
      <text x="400" y="530" textAnchor="middle" fontSize="11" fill="#64748b">凤凰架构 = 演进思维 + CAP权衡 + 共识基础 + 缓存+限流+熔断韧性 + 面向失败设计</text>
      <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#64748b">核心哲学：没有银弹，架构是权衡；面向失败设计，让系统像凤凰一样从灰烬中重生</text>
    </svg>
  );
}
