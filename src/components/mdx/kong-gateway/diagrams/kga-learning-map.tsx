"use client";

export function KgaLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kong网关入门实战与进阶全书学习地图">
      <defs>
        <linearGradient id="kga-lm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kga-lm-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kga-lm-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kga-lm-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="kga-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kong网关入门实战与进阶 · 知识体系全景</text>

      {/* 第一部分：基础概念 */}
      <rect x="20" y="50" width="185" height="180" rx="12" fill="url(#kga-lm-base)" opacity="0.95" />
      <text x="112" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础概念</text>
      <line x1="35" y1="85" x2="190" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="107" textAnchor="middle" fontSize="11" fill="#bfdbfe">API网关 / 核心职责</text>
      <text x="112" y="127" textAnchor="middle" fontSize="11" fill="#bfdbfe">Kong 定位与优势</text>
      <text x="112" y="153" textAnchor="middle" fontSize="10" fill="#93c5fd">南北向流量入口</text>
      <text x="112" y="173" textAnchor="middle" fontSize="10" fill="#93c5fd">微服务治理基础</text>
      <text x="112" y="205" textAnchor="middle" fontSize="10" fill="#60a5fa">入门 · 地基</text>

      {/* 第二部分：核心架构 */}
      <rect x="215" y="50" width="185" height="180" rx="12" fill="url(#kga-lm-core)" opacity="0.95" />
      <text x="307" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">核心架构</text>
      <line x1="230" y1="85" x2="385" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="107" textAnchor="middle" fontSize="11" fill="#cffafe">OpenResty / Nginx worker</text>
      <text x="307" y="127" textAnchor="middle" fontSize="11" fill="#cffafe">Service / Route / Plugin</text>
      <text x="307" y="153" textAnchor="middle" fontSize="10" fill="#a5f3fc">Admin API / Proxy</text>
      <text x="307" y="173" textAnchor="middle" fontSize="10" fill="#a5f3fc">路由匹配 / 插件生命周期</text>
      <text x="307" y="205" textAnchor="middle" fontSize="10" fill="#67e8f9">基础 · 核心</text>

      {/* 第三部分：安全与流量 */}
      <rect x="410" y="50" width="185" height="180" rx="12" fill="url(#kga-lm-sec)" opacity="0.95" />
      <text x="502" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">安全与流量</text>
      <line x1="425" y1="85" x2="580" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="107" textAnchor="middle" fontSize="11" fill="#fef3c7">JWT / OAuth2 / Key Auth</text>
      <text x="502" y="127" textAnchor="middle" fontSize="11" fill="#fef3c7">CORS / ACL / IP限制</text>
      <text x="502" y="153" textAnchor="middle" fontSize="10" fill="#fde68a">限流 / 缓存 / 熔断</text>
      <text x="502" y="173" textAnchor="middle" fontSize="10" fill="#fde68a">请求/响应转换</text>
      <text x="502" y="205" textAnchor="middle" fontSize="10" fill="#fcd34d">中高 · 实战</text>

      {/* 第四部分：部署与进阶 */}
      <rect x="605" y="50" width="175" height="180" rx="12" fill="url(#kga-lm-adv)" opacity="0.95" />
      <text x="692" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">部署与进阶</text>
      <line x1="620" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="107" textAnchor="middle" fontSize="11" fill="#ede9fe">Docker / K8s / Hybrid</text>
      <text x="692" y="127" textAnchor="middle" fontSize="11" fill="#ede9fe">自定义Lua插件</text>
      <text x="692" y="153" textAnchor="middle" fontSize="10" fill="#ddd6fe">Kong Mesh / Service Mesh</text>
      <text x="692" y="173" textAnchor="middle" fontSize="10" fill="#ddd6fe">Serverless / 高可用</text>
      <text x="692" y="205" textAnchor="middle" fontSize="10" fill="#c4b5fd">高级 · 生产级</text>

      {/* Arrows */}
      <path d="M205 140 L215 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#kga-lm-arrow)" />
      <path d="M400 140 L410 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#kga-lm-arrow)" />
      <path d="M595 140 L605 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#kga-lm-arrow)" />

      {/* 三条核心主线 */}
      <text x="400" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">三条核心主线</text>

      <rect x="20" y="280" width="250" height="100" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">主线一：代理路由</text>
      <text x="145" y="323" textAnchor="middle" fontSize="10" fill="#1e40af">Route → Service → Upstream</text>
      <text x="145" y="343" textAnchor="middle" fontSize="10" fill="#1e40af">→ Target 负载均衡</text>
      <text x="145" y="367" textAnchor="middle" fontSize="10" fill="#1d4ed8">回答「请求怎么转发」</text>

      <rect x="275" y="280" width="250" height="100" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="400" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">主线二：插件扩展</text>
      <text x="400" y="323" textAnchor="middle" fontSize="10" fill="#155e75">Plugin → Consumer → Credential</text>
      <text x="400" y="343" textAnchor="middle" fontSize="10" fill="#155e75">→ ACL 横切关注点</text>
      <text x="400" y="367" textAnchor="middle" fontSize="10" fill="#0e7490">回答「横切逻辑怎么处理」</text>

      <rect x="530" y="280" width="250" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">主线三：部署运维</text>
      <text x="655" y="323" textAnchor="middle" fontSize="10" fill="#78350f">DB/DB-less → Cluster</text>
      <text x="655" y="343" textAnchor="middle" fontSize="10" fill="#78350f">→ Hybrid → Mesh</text>
      <text x="655" y="367" textAnchor="middle" fontSize="10" fill="#92400e">回答「怎么部署/扩展」</text>

      {/* 学习路径 */}
      <rect x="20" y="395" width="760" height="170" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="418" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（从基础概念 → 核心架构 → 安全与流量 → 部署与进阶 → 全书整合）</text>
      <text x="400" y="441" textAnchor="middle" fontSize="11" fill="#475569">① 基础概念（API网关定义/核心职责/Kong定位）→ ② 核心架构（OpenResty/数据模型/路由匹配/插件生命周期）</text>
      <text x="400" y="461" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 安全与流量（JWT/OAuth2/CORS/ACL/限流/缓存/熔断）→ ④ 部署与进阶（Docker/K8s/Hybrid/自定义插件/Mesh）</text>
      <text x="400" y="481" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 全书复习整合</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#64748b">三主线在「Route-Service-Plugin」（代理路由↔插件扩展）与「Consumer-Credential-Plugin」（插件扩展↔安全流量）与「DB-less-Hybrid-Mesh」（部署运维↔扩展能力）处交汇</text>
      <text x="400" y="530" textAnchor="middle" fontSize="11" fill="#64748b">Kong = OpenResty高性能 + 插件化扩展 + Route-Service抽象 + 多模式部署 + Mesh全栈</text>
      <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#64748b">核心设计哲学：以插件化扩展为核心，通过Route-Service解耦路由与后端，通过多模式部署适配全场景</text>
    </svg>
  );
}
