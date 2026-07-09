"use client";

export function PhaArchitectureEvolutionDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="架构演进史时间线">
      <defs>
        <marker id="pha-ae-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">软件架构演进史</text>

      {/* 时间线主线 */}
      <line x1="60" y1="100" x2="740" y2="100" stroke="#cbd5e1" strokeWidth="3" />
      <circle cx="100" cy="100" r="8" fill="#2563eb" />
      <circle cx="240" cy="100" r="8" fill="#0891b2" />
      <circle cx="380" cy="100" r="8" fill="#f59e0b" />
      <circle cx="520" cy="100" r="8" fill="#8b5cf6" />
      <circle cx="660" cy="100" r="8" fill="#ef4444" />

      {/* 单体架构 */}
      <rect x="40" y="130" width="160" height="150" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="153" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d4ed8">单体架构</text>
      <text x="120" y="175" textAnchor="middle" fontSize="10" fill="#1e40af">单进程 / 单数据库</text>
      <text x="120" y="195" textAnchor="middle" fontSize="10" fill="#1e40af">简单部署 / 易测试</text>
      <text x="120" y="218" textAnchor="middle" fontSize="9" fill="#3b82f6">优势：开发快</text>
      <text x="120" y="235" textAnchor="middle" fontSize="9" fill="#3b82f6">部署简单</text>
      <text x="120" y="258" textAnchor="middle" fontSize="9" fill="#dc2626">痛点：扩展难</text>
      <text x="120" y="272" textAnchor="middle" fontSize="9" fill="#dc2626">牵一发动全身</text>
      <text x="120" y="80" textAnchor="middle" fontSize="9" fill="#64748b">1960s–2000s</text>

      {/* SOA */}
      <rect x="180" y="300" width="160" height="150" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="260" y="323" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">SOA 面向服务</text>
      <text x="260" y="345" textAnchor="middle" fontSize="10" fill="#155e75">ESB 企业服务总线</text>
      <text x="260" y="365" textAnchor="middle" fontSize="10" fill="#155e75">WSDL / SOAP</text>
      <text x="260" y="388" textAnchor="middle" fontSize="9" fill="#0891b2">优势：服务复用</text>
      <text x="260" y="405" textAnchor="middle" fontSize="9" fill="#0891b2">跨系统集成</text>
      <text x="260" y="428" textAnchor="middle" fontSize="9" fill="#dc2626">痛点：ESB 瓶颈</text>
      <text x="260" y="442" textAnchor="middle" fontSize="9" fill="#dc2626">协议重 / 耦合</text>
      <text x="260" y="80" textAnchor="middle" fontSize="9" fill="#64748b">2000s</text>

      {/* 微服务 */}
      <rect x="320" y="130" width="160" height="150" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="153" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">微服务</text>
      <text x="400" y="175" textAnchor="middle" fontSize="10" fill="#78350f">独立部署 / 独立数据库</text>
      <text x="400" y="195" textAnchor="middle" fontSize="10" fill="#78350f">REST / gRPC 轻量通信</text>
      <text x="400" y="218" textAnchor="middle" fontSize="9" fill="#d97706">优势：独立扩展</text>
      <text x="400" y="235" textAnchor="middle" fontSize="9" fill="#d97706">技术异构 / 容错</text>
      <text x="400" y="258" textAnchor="middle" fontSize="9" fill="#dc2626">痛点：分布式复杂性</text>
      <text x="400" y="272" textAnchor="middle" fontSize="9" fill="#dc2626">数据一致性 / 运维</text>
      <text x="400" y="80" textAnchor="middle" fontSize="9" fill="#64748b">2010s</text>

      {/* 云原生 */}
      <rect x="460" y="300" width="160" height="150" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="540" y="323" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">云原生</text>
      <text x="540" y="345" textAnchor="middle" fontSize="10" fill="#5b21b6">容器 / K8s 编排</text>
      <text x="540" y="365" textAnchor="middle" fontSize="10" fill="#5b21b6">DevOps / CI/CD</text>
      <text x="540" y="388" textAnchor="middle" fontSize="9" fill="#8b5cf6">优势：弹性伸缩</text>
      <text x="540" y="405" textAnchor="middle" fontSize="9" fill="#8b5cf6">自愈 / 可观测</text>
      <text x="540" y="428" textAnchor="middle" fontSize="9" fill="#dc2626">痛点：基础设施复杂</text>
      <text x="540" y="442" textAnchor="middle" fontSize="9" fill="#dc2626">学习曲线陡峭</text>
      <text x="540" y="80" textAnchor="middle" fontSize="9" fill="#64748b">2015+</text>

      {/* 无服务 */}
      <rect x="600" y="130" width="160" height="150" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="680" y="153" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">无服务 Serverless</text>
      <text x="680" y="175" textAnchor="middle" fontSize="10" fill="#991b1b">FaaS / BaaS</text>
      <text x="680" y="195" textAnchor="middle" fontSize="10" fill="#991b1b">按需伸缩 / 免运维</text>
      <text x="680" y="218" textAnchor="middle" fontSize="9" fill="#ef4444">优势：零运维</text>
      <text x="680" y="235" textAnchor="middle" fontSize="9" fill="#ef4444">按量付费</text>
      <text x="680" y="258" textAnchor="middle" fontSize="9" fill="#dc2626">痛点：冷启动</text>
      <text x="680" y="272" textAnchor="middle" fontSize="9" fill="#dc2626">有状态 / 调试难</text>
      <text x="680" y="80" textAnchor="middle" fontSize="9" fill="#64748b">2018+</text>

      {/* 演进动因 */}
      <rect x="40" y="465" width="720" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="400" y="485" textAnchor="middle" fontSize="11" fill="#475569">演进动因：规模增长 → 性能瓶颈 → 团队协作 → 技术异构 → 弹性需求 → 运维自动化 → 成本优化</text>
    </svg>
  );
}
