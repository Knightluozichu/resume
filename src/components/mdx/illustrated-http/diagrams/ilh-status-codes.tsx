"use client";

export function IlhStatusCodesDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="HTTP状态码分类与含义">
      <defs>
        <linearGradient id="ilh-sc-2xx" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ilh-sc-3xx" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="ilh-sc-4xx" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ilh-sc-5xx" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="ilh-sc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTP状态码分类</text>
      <text x="400" y="48" textAnchor="middle" fontSize="12" fill="#64748b">格式：HTTP/1.1 [三位数字] [原因短语]</text>

      {/* 2xx */}
      <rect x="20" y="65" width="370" height="120" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <rect x="20" y="65" width="370" height="32" rx="10" fill="url(#ilh-sc-2xx)" />
      <text x="40" y="87" fontSize="14" fontWeight="700" fill="#fff">2xx 成功</text>
      <text x="360" y="87" textAnchor="end" fontSize="11" fill="#a7f3d0">请求被正常处理</text>
      <text x="40" y="115" fontSize="11" fill="#065f46" fontFamily="monospace">200 OK</text>
      <text x="180" y="115" fontSize="11" fill="#475569">正常响应</text>
      <text x="40" y="135" fontSize="11" fill="#065f46" fontFamily="monospace">204 No Content</text>
      <text x="180" y="135" fontSize="11" fill="#475569">无响应体（如PUT成功）</text>
      <text x="40" y="155" fontSize="11" fill="#065f46" fontFamily="monospace">206 Partial Content</text>
      <text x="180" y="155" fontSize="11" fill="#475569">范围请求（Range）</text>
      <text x="40" y="175" fontSize="11" fill="#64748b">处理成功类</text>

      {/* 3xx */}
      <rect x="410" y="65" width="370" height="120" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="410" y="65" width="370" height="32" rx="10" fill="url(#ilh-sc-3xx)" />
      <text x="430" y="87" fontSize="14" fontWeight="700" fill="#fff">3xx 重定向</text>
      <text x="750" y="87" textAnchor="end" fontSize="11" fill="#bfdbfe">需额外操作完成请求</text>
      <text x="430" y="115" fontSize="11" fill="#1e3a8a" fontFamily="monospace">301 Moved Permanently</text>
      <text x="630" y="115" fontSize="11" fill="#475569">永久重定向</text>
      <text x="430" y="135" fontSize="11" fill="#1e3a8a" fontFamily="monospace">302 Found</text>
      <text x="630" y="135" fontSize="11" fill="#475569">临时重定向</text>
      <text x="430" y="155" fontSize="11" fill="#1e3a8a" fontFamily="monospace">303 See Other</text>
      <text x="630" y="155" fontSize="11" fill="#475569">用GET访问另一URI</text>
      <text x="430" y="175" fontSize="11" fill="#1e3a8a" fontFamily="monospace">304 Not Modified</text>
      <text x="630" y="175" fontSize="11" fill="#475569">协商缓存命中</text>

      {/* 4xx */}
      <rect x="20" y="200" width="370" height="120" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="20" y="200" width="370" height="32" rx="10" fill="url(#ilh-sc-4xx)" />
      <text x="40" y="222" fontSize="14" fontWeight="700" fill="#fff">4xx 客户端错误</text>
      <text x="360" y="222" textAnchor="end" fontSize="11" fill="#fde68a">请求有语法错误</text>
      <text x="40" y="250" fontSize="11" fill="#78350f" fontFamily="monospace">400 Bad Request</text>
      <text x="180" y="250" fontSize="11" fill="#475569">请求语法错误</text>
      <text x="40" y="270" fontSize="11" fill="#78350f" fontFamily="monospace">401 Unauthorized</text>
      <text x="180" y="270" fontSize="11" fill="#475569">需认证（未登录）</text>
      <text x="40" y="290" fontSize="11" fill="#78350f" fontFamily="monospace">403 Forbidden</text>
      <text x="180" y="290" fontSize="11" fill="#475569">拒绝访问（无权限）</text>
      <text x="40" y="310" fontSize="11" fill="#78350f" fontFamily="monospace">404 Not Found</text>
      <text x="180" y="310" fontSize="11" fill="#475569">资源不存在</text>

      {/* 5xx */}
      <rect x="410" y="200" width="370" height="120" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <rect x="410" y="200" width="370" height="32" rx="10" fill="url(#ilh-sc-5xx)" />
      <text x="430" y="222" fontSize="14" fontWeight="700" fill="#fff">5xx 服务器错误</text>
      <text x="750" y="222" textAnchor="end" fontSize="11" fill="#fecaca">服务器处理出错</text>
      <text x="430" y="250" fontSize="11" fill="#991b1b" fontFamily="monospace">500 Internal Server Error</text>
      <text x="660" y="250" fontSize="11" fill="#475569">服务器内部错误</text>
      <text x="430" y="270" fontSize="11" fill="#991b1b" fontFamily="monospace">502 Bad Gateway</text>
      <text x="660" y="270" fontSize="11" fill="#475569">网关/代理错误</text>
      <text x="430" y="290" fontSize="11" fill="#991b1b" fontFamily="monospace">503 Service Unavailable</text>
      <text x="660" y="290" fontSize="11" fill="#475569">服务不可用（过载）</text>
      <text x="430" y="310" fontSize="11" fill="#991b1b" fontFamily="monospace">504 Gateway Timeout</text>
      <text x="660" y="310" fontSize="11" fill="#475569">网关超时</text>

      {/* 速记口诀 */}
      <rect x="20" y="340" width="760" height="140" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="365" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">状态码速记</text>
      <text x="400" y="390" textAnchor="middle" fontSize="12" fill="#475569">1xx 信息性（很少使用） · 2xx 成功 · 3xx 重定向 · 4xx 客户端错 · 5xx 服务端错</text>
      <rect x="60" y="410" width="160" height="55" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
      <text x="140" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">4xx = 你（客户端）的错</text>
      <text x="140" y="450" textAnchor="middle" fontSize="10" fill="#065f46">改请求</text>
      <rect x="240" y="410" width="160" height="55" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
      <text x="320" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="#dc2626">5xx = 我（服务器）的错</text>
      <text x="320" y="450" textAnchor="middle" fontSize="10" fill="#991b1b">修服务</text>
      <rect x="420" y="410" width="160" height="55" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
      <text x="500" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">3xx = 去别处找</text>
      <text x="500" y="450" textAnchor="middle" fontSize="10" fill="#1e3a8a">跟随重定向</text>
      <rect x="600" y="410" width="160" height="55" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
      <text x="680" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">2xx = 一切正常</text>
      <text x="680" y="450" textAnchor="middle" fontSize="10" fill="#065f46">用响应体</text>
    </svg>
  );
}
