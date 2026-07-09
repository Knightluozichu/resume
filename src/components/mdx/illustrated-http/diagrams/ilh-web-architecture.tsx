"use client";

export function IlhWebArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="Web架构与HTTP演进">
      <defs>
        <linearGradient id="ilh-wa-h1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="ilh-wa-h2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ilh-wa-h3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ilh-wa-ws" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="ilh-wa-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTP版本演进与Web架构</text>

      {/* HTTP版本演进 */}
      <text x="400" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">HTTP版本演进</text>

      <rect x="20" y="70" width="240" height="120" rx="10" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <rect x="20" y="70" width="240" height="28" rx="10" fill="url(#ilh-wa-h1)" />
      <text x="140" y="89" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">HTTP/1.0</text>
      <text x="140" y="115" textAnchor="middle" fontSize="11" fill="#475569">每次请求新建TCP连接</text>
      <text x="140" y="135" textAnchor="middle" fontSize="11" fill="#475569">连接关闭即结束</text>
      <text x="140" y="158" textAnchor="middle" fontSize="11" fill="#64748b">缺点：连接开销大</text>
      <text x="140" y="178" textAnchor="middle" fontSize="11" fill="#64748b">（1996年）</text>

      <rect x="280" y="70" width="240" height="120" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <rect x="280" y="70" width="240" height="28" rx="10" fill="url(#ilh-wa-h2)" />
      <text x="400" y="89" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">HTTP/1.1</text>
      <text x="400" y="115" textAnchor="middle" fontSize="11" fill="#1e3a8a">持久连接（Keep-Alive）</text>
      <text x="400" y="135" textAnchor="middle" fontSize="11" fill="#1e3a8a">管道化请求</text>
      <text x="400" y="158" textAnchor="middle" fontSize="11" fill="#3b82f6">Host头（虚拟主机）</text>
      <text x="400" y="178" textAnchor="middle" fontSize="11" fill="#3b82f6">当前主流（1997年）</text>

      <rect x="540" y="70" width="240" height="120" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <rect x="540" y="70" width="240" height="28" rx="10" fill="url(#ilh-wa-h3)" />
      <text x="660" y="89" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">HTTP/2 &amp; HTTP/3</text>
      <text x="660" y="115" textAnchor="middle" fontSize="11" fill="#065f46">HTTP/2: 多路复用/二进制帧</text>
      <text x="660" y="135" textAnchor="middle" fontSize="11" fill="#065f46">头部压缩（HPACK）</text>
      <text x="660" y="158" textAnchor="middle" fontSize="11" fill="#059669">HTTP/3: 基于QUIC/UDP</text>
      <text x="660" y="178" textAnchor="middle" fontSize="11" fill="#059669">解决队头阻塞（2015/2022）</text>

      <path d="M260 130 L280 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-wa-arrow)" />
      <path d="M520 130 L540 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-wa-arrow)" />

      {/* Web架构组件 */}
      <rect x="20" y="210" width="760" height="290" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="233" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Web架构核心组件</text>

      {/* CDN */}
      <rect x="40" y="250" width="150" height="55" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="115" y="272" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">CDN</text>
      <text x="115" y="290" textAnchor="middle" fontSize="10" fill="#1e3a8a">内容分发网络</text>
      <text x="115" y="304" textAnchor="middle" fontSize="10" fill="#3b82f6">就近缓存/加速访问</text>

      {/* 代理 */}
      <rect x="210" y="250" width="150" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="285" y="272" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">代理</text>
      <text x="285" y="290" textAnchor="middle" fontSize="10" fill="#78350f">转发请求/响应</text>
      <text x="285" y="304" textAnchor="middle" fontSize="10" fill="#d97706">正向/反向代理</text>

      {/* 网关 */}
      <rect x="380" y="250" width="150" height="55" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="455" y="272" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">网关</text>
      <text x="455" y="290" textAnchor="middle" fontSize="10" fill="#5b21b6">协议转换器</text>
      <text x="455" y="304" textAnchor="middle" fontSize="10" fill="#7c3aed">HTTP → 数据库/邮件</text>

      {/* 隧道 */}
      <rect x="550" y="250" width="210" height="55" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
      <text x="655" y="272" textAnchor="middle" fontSize="12" fontWeight="700" fill="#be185d">隧道</text>
      <text x="655" y="290" textAnchor="middle" fontSize="10" fill="#831843">SSL/TLS加密隧道</text>
      <text x="655" y="304" textAnchor="middle" fontSize="10" fill="#db2777">确保通信安全</text>

      {/* WebSocket */}
      <rect x="40" y="320" width="350" height="80" rx="8" fill="url(#ilh-wa-ws)" opacity="0.95" />
      <text x="215" y="345" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">WebSocket</text>
      <text x="215" y="365" textAnchor="middle" fontSize="11" fill="#ddd6fe">全双工通信（服务器可主动推送）</text>
      <text x="215" y="385" textAnchor="middle" fontSize="11" fill="#c4b5fd">一次握手 → 持久连接 → 双向实时</text>

      {/* Cookie与Session */}
      <rect x="410" y="320" width="350" height="80" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="585" y="345" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">Cookie与Session</text>
      <text x="585" y="365" textAnchor="middle" fontSize="11" fill="#065f46">弥补HTTP无状态：Cookie存客户端</text>
      <text x="585" y="385" textAnchor="middle" fontSize="11" fill="#065f46">Session存服务器端，通过Cookie关联</text>

      {/* 核心总结 */}
      <text x="400" y="425" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">Web安全威胁与防御</text>
      <text x="400" y="448" textAnchor="middle" fontSize="11" fill="#475569">XSS（跨站脚本）: 转义输出 / CSP / HttpOnly Cookie</text>
      <text x="400" y="468" textAnchor="middle" fontSize="11" fill="#475569">CSRF（跨站请求伪造）: Referer检查 / Token / SameSite Cookie</text>
      <text x="400" y="488" textAnchor="middle" fontSize="11" fill="#64748b">DoS攻击: 限制请求频率 / 验证码 / WAF</text>
    </svg>
  );
}
