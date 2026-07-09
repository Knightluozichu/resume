"use client";

export function IlhLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="图解HTTP全书学习地图">
      <defs>
        <linearGradient id="ilh-lm-basics" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ilh-lm-method" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="ilh-lm-status" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ilh-lm-header" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="ilh-lm-https" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ilh-lm-auth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
        <linearGradient id="ilh-lm-cache" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="ilh-lm-web" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <marker id="ilh-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">图解HTTP · 知识体系全景</text>

      {/* 第一层：基础 */}
      <rect x="20" y="50" width="140" height="170" rx="12" fill="url(#ilh-lm-basics)" opacity="0.95" />
      <text x="90" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">HTTP基础</text>
      <line x1="35" y1="85" x2="145" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="90" y="107" textAnchor="middle" fontSize="11" fill="#bfdbfe">TCP/IP协议栈</text>
      <text x="90" y="127" textAnchor="middle" fontSize="11" fill="#bfdbfe">URI与URL</text>
      <text x="90" y="147" textAnchor="middle" fontSize="11" fill="#bfdbfe">请求与响应模型</text>
      <text x="90" y="167" textAnchor="middle" fontSize="11" fill="#bfdbfe">无状态协议</text>
      <text x="90" y="197" textAnchor="middle" fontSize="11" fill="#60a5fa">入门 · 地基</text>

      {/* 第二层：方法与状态码 */}
      <rect x="170" y="50" width="140" height="170" rx="12" fill="url(#ilh-lm-method)" opacity="0.95" />
      <text x="240" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">HTTP方法</text>
      <line x1="185" y1="85" x2="295" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="240" y="107" textAnchor="middle" fontSize="11" fill="#cffafe">GET / POST</text>
      <text x="240" y="127" textAnchor="middle" fontSize="11" fill="#cffafe">PUT / DELETE</text>
      <text x="240" y="147" textAnchor="middle" fontSize="11" fill="#a5f3fc">HEAD / OPTIONS</text>
      <text x="240" y="167" textAnchor="middle" fontSize="11" fill="#a5f3fc">幂等性与安全方法</text>
      <text x="240" y="197" textAnchor="middle" fontSize="11" fill="#67e8f9">实战 · 核心</text>

      <rect x="320" y="50" width="140" height="170" rx="12" fill="url(#ilh-lm-status)" opacity="0.95" />
      <text x="390" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">状态码</text>
      <line x1="335" y1="85" x2="445" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="390" y="107" textAnchor="middle" fontSize="11" fill="#fef3c7">2xx 成功</text>
      <text x="390" y="127" textAnchor="middle" fontSize="11" fill="#fef3c7">3xx 重定向</text>
      <text x="390" y="147" textAnchor="middle" fontSize="11" fill="#fde68a">4xx 客户端错误</text>
      <text x="390" y="167" textAnchor="middle" fontSize="11" fill="#fde68a">5xx 服务器错误</text>
      <text x="390" y="197" textAnchor="middle" fontSize="11" fill="#fcd34d">入门 · 核心</text>

      {/* 第三层：首部与安全 */}
      <rect x="470" y="50" width="140" height="170" rx="12" fill="url(#ilh-lm-header)" opacity="0.95" />
      <text x="540" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">HTTP首部</text>
      <line x1="485" y1="85" x2="595" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="540" y="107" textAnchor="middle" fontSize="11" fill="#ede9fe">通用首部</text>
      <text x="540" y="127" textAnchor="middle" fontSize="11" fill="#ede9fe">请求/响应首部</text>
      <text x="540" y="147" textAnchor="middle" fontSize="11" fill="#ddd6fe">实体首部</text>
      <text x="540" y="167" textAnchor="middle" fontSize="11" fill="#ddd6fe">Cookie与Set-Cookie</text>
      <text x="540" y="197" textAnchor="middle" fontSize="11" fill="#c4b5fd">实战 · 机制</text>

      <rect x="620" y="50" width="160" height="170" rx="12" fill="url(#ilh-lm-https)" opacity="0.95" />
      <text x="700" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">HTTPS与安全</text>
      <line x1="635" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="700" y="107" textAnchor="middle" fontSize="11" fill="#d1fae5">加密原理</text>
      <text x="700" y="127" textAnchor="middle" fontSize="11" fill="#d1fae5">SSL/TLS握手</text>
      <text x="700" y="147" textAnchor="middle" fontSize="11" fill="#a7f3d0">数字证书</text>
      <text x="700" y="167" textAnchor="middle" fontSize="11" fill="#a7f3d0">公钥密码体系</text>
      <text x="700" y="197" textAnchor="middle" fontSize="11" fill="#6ee7b7">中级 · 安全</text>

      {/* Arrows row 1 */}
      <path d="M160 135 L170 135" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-lm-arrow)" />
      <path d="M310 135 L320 135" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-lm-arrow)" />
      <path d="M460 135 L470 135" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-lm-arrow)" />
      <path d="M610 135 L620 135" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-lm-arrow)" />

      {/* 第四层：认证、缓存、架构 */}
      <rect x="100" y="270" width="160" height="90" rx="10" fill="url(#ilh-lm-auth)" opacity="0.95" />
      <text x="180" y="293" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">认证与授权</text>
      <text x="180" y="313" textAnchor="middle" fontSize="11" fill="#fce7f3">BASIC / Digest / Session</text>
      <text x="180" y="333" textAnchor="middle" fontSize="11" fill="#fbcfe8">Cookie / Token / OAuth</text>
      <text x="180" y="350" textAnchor="middle" fontSize="11" fill="#f9a8d4">实战 · 安全</text>

      <rect x="290" y="270" width="160" height="90" rx="10" fill="url(#ilh-lm-cache)" opacity="0.95" />
      <text x="370" y="293" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">缓存机制</text>
      <text x="370" y="313" textAnchor="middle" fontSize="11" fill="#ffe4e6">强缓存 / 协商缓存</text>
      <text x="370" y="333" textAnchor="middle" fontSize="11" fill="#fecdd3">Cache-Control / ETag</text>
      <text x="370" y="350" textAnchor="middle" fontSize="11" fill="#fda4af">实战 · 性能</text>

      <rect x="480" y="270" width="160" height="90" rx="10" fill="url(#ilh-lm-web)" opacity="0.95" />
      <text x="560" y="293" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Web架构与未来</text>
      <text x="560" y="313" textAnchor="middle" fontSize="11" fill="#e0e7ff">HTTP/2 / HTTP/3</text>
      <text x="560" y="333" textAnchor="middle" fontSize="11" fill="#c7d2fe">WebSocket / CDN</text>
      <text x="560" y="350" textAnchor="middle" fontSize="11" fill="#a5b4fc">入门 · 拓展</text>

      {/* Arrows row 2 */}
      <path d="M90 220 L180 270" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ilh-lm-arrow)" />
      <path d="M390 220 L370 270" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ilh-lm-arrow)" />
      <path d="M700 220 L560 270" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ilh-lm-arrow)" />

      {/* 学习路径 */}
      <rect x="20" y="390" width="760" height="170" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="413" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（基础 → 方法/状态码 → 首部 → 安全 → 认证 → 缓存 → 架构 → 复习）</text>
      <text x="400" y="438" textAnchor="middle" fontSize="11" fill="#475569">① HTTP基础（TCP/IP协议栈/URI/请求响应模型/无状态）→ ② HTTP方法（GET/POST/PUT/DELETE/幂等性）</text>
      <text x="400" y="460" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 状态码（2xx/3xx/4xx/5xx分类与含义）→ ④ HTTP首部（通用/请求/响应/实体/Cookie）</text>
      <text x="400" y="482" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ HTTPS与安全（加密/SSL-TLS握手/数字证书/公钥密码）→ ⑥ 认证与授权（BASIC/Digest/Session/Cookie/Token）</text>
      <text x="400" y="504" textAnchor="middle" fontSize="11" fill="#475569">→ ⑦ 缓存机制（强缓存/协商缓存/Cache-Control/ETag）→ ⑧ Web架构与未来（HTTP2/HTTP3/WebSocket/CDN）→ ⑨ 全书复习</text>
      <text x="400" y="532" textAnchor="middle" fontSize="11" fill="#64748b">核心线索：请求-响应模型 → 方法/状态码/首部 → 安全（HTTPS+认证） → 性能（缓存） → 未来演进</text>
      <text x="400" y="552" textAnchor="middle" fontSize="11" fill="#64748b">HTTP = 无状态 + 请求-响应 + 文本协议 + 可扩展首部 + 分层安全</text>
    </svg>
  );
}
