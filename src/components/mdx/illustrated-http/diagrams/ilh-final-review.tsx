"use client";

export function IlhFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="图解HTTP全书知识整合">
      <defs>
        <linearGradient id="ilh-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="ilh-fr-basics" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ilh-fr-method" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="ilh-fr-status" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ilh-fr-header" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="ilh-fr-https" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ilh-fr-auth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
        <linearGradient id="ilh-fr-cache" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="ilh-fr-web" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">图解HTTP · 全书知识整合</text>

      {/* 中心核心 */}
      <circle cx="400" cy="270" r="65" fill="url(#ilh-fr-core)" />
      <text x="400" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">HTTP</text>
      <text x="400" y="283" textAnchor="middle" fontSize="10" fill="#94a3b8">无状态</text>
      <text x="400" y="298" textAnchor="middle" fontSize="10" fill="#94a3b8">请求-响应</text>

      {/* 八大知识域环绕 */}
      {/* 上左：基础 */}
      <rect x="60" y="80" width="150" height="70" rx="10" fill="url(#ilh-fr-basics)" opacity="0.95" />
      <text x="135" y="103" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">HTTP基础</text>
      <text x="135" y="123" textAnchor="middle" fontSize="10" fill="#bfdbfe">TCP/IP · URI · 无状态</text>
      <text x="135" y="140" textAnchor="middle" fontSize="10" fill="#60a5fa">请求-响应模型</text>
      <line x1="210" y="130" x2="340" y2="230" stroke="#64748b" strokeWidth="1.5" />

      {/* 上中：方法 */}
      <rect x="240" y="60" width="150" height="70" rx="10" fill="url(#ilh-fr-method)" opacity="0.95" />
      <text x="315" y="83" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">HTTP方法</text>
      <text x="315" y="103" textAnchor="middle" fontSize="10" fill="#cffafe">GET/POST/PUT/DELETE</text>
      <text x="315" y="120" textAnchor="middle" fontSize="10" fill="#67e8f9">安全 · 幂等</text>
      <line x1="360" y1="130" x2="385" y2="208" stroke="#64748b" strokeWidth="1.5" />

      {/* 上右：状态码 */}
      <rect x="420" y="60" width="150" height="70" rx="10" fill="url(#ilh-fr-status)" opacity="0.95" />
      <text x="495" y="83" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">状态码</text>
      <text x="495" y="103" textAnchor="middle" fontSize="10" fill="#fef3c7">2xx/3xx/4xx/5xx</text>
      <text x="495" y="120" textAnchor="middle" fontSize="10" fill="#fcd34d">请求结果反馈</text>
      <line x1="440" y1="130" x2="415" y2="208" stroke="#64748b" strokeWidth="1.5" />

      {/* 右上：首部 */}
      <rect x="600" y="80" width="150" height="70" rx="10" fill="url(#ilh-fr-header)" opacity="0.95" />
      <text x="675" y="103" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">HTTP首部</text>
      <text x="675" y="123" textAnchor="middle" fontSize="10" fill="#ede9fe">通用/请求/响应/实体</text>
      <text x="675" y="140" textAnchor="middle" fontSize="10" fill="#c4b5fd">Cookie/Set-Cookie</text>
      <line x1="600" y1="130" x2="460" y2="230" stroke="#64748b" strokeWidth="1.5" />

      {/* 右下：HTTPS */}
      <rect x="600" y="210" width="150" height="70" rx="10" fill="url(#ilh-fr-https)" opacity="0.95" />
      <text x="675" y="233" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">HTTPS</text>
      <text x="675" y="253" textAnchor="middle" fontSize="10" fill="#d1fae5">SSL/TLS · 混合加密</text>
      <text x="675" y="270" textAnchor="middle" fontSize="10" fill="#6ee7b7">证书 · 公钥密码</text>
      <line x1="600" y1="245" x2="465" y2="270" stroke="#64748b" strokeWidth="1.5" />

      {/* 下右：认证 */}
      <rect x="600" y="340" width="150" height="70" rx="10" fill="url(#ilh-fr-auth)" opacity="0.95" />
      <text x="675" y="363" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">认证授权</text>
      <text x="675" y="383" textAnchor="middle" fontSize="10" fill="#fce7f3">BASIC/Digest/Session</text>
      <text x="675" y="400" textAnchor="middle" fontSize="10" fill="#f9a8d4">Cookie/Token/JWT</text>
      <line x1="600" y1="375" x2="465" y2="300" stroke="#64748b" strokeWidth="1.5" />

      {/* 下左：缓存 */}
      <rect x="60" y="340" width="150" height="70" rx="10" fill="url(#ilh-fr-cache)" opacity="0.95" />
      <text x="135" y="363" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">缓存机制</text>
      <text x="135" y="383" textAnchor="middle" fontSize="10" fill="#ffe4e6">强缓存/协商缓存</text>
      <text x="135" y="400" textAnchor="middle" fontSize="10" fill="#fda4af">ETag/Cache-Control</text>
      <line x1="210" y1="375" x2="340" y2="305" stroke="#64748b" strokeWidth="1.5" />

      {/* 下中：Web架构 */}
      <rect x="280" y="420" width="240" height="70" rx="10" fill="url(#ilh-fr-web)" opacity="0.95" />
      <text x="400" y="443" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Web架构与未来</text>
      <text x="400" y="463" textAnchor="middle" fontSize="10" fill="#e0e7ff">HTTP/1.1→HTTP/2→HTTP/3</text>
      <text x="400" y="480" textAnchor="middle" fontSize="10" fill="#a5b4fc">WebSocket · CDN · 代理/网关</text>
      <line x1="400" y1="420" x2="400" y2="335" stroke="#64748b" strokeWidth="1.5" />

      {/* 知识线索 */}
      <rect x="20" y="510" width="760" height="35" rx="6" fill="#1e293b" />
      <text x="400" y="532" textAnchor="middle" fontSize="11" fill="#e2e8f0">核心线索：TCP/IP基础 → 方法/状态码/首部 → 安全(HTTPS+认证) → 性能(缓存) → 演进(HTTP/2+WebSocket)</text>
    </svg>
  );
}
