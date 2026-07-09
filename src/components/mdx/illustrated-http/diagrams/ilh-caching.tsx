"use client";

export function IlhCachingDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="HTTP缓存机制">
      <defs>
        <linearGradient id="ilh-ca-strong" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ilh-ca-negotiate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ilh-ca-hit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ilh-ca-miss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="ilh-ca-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTP缓存机制</text>

      {/* 强缓存 */}
      <rect x="20" y="55" width="370" height="180" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <rect x="20" y="55" width="370" height="32" rx="10" fill="url(#ilh-ca-strong)" />
      <text x="40" y="77" fontSize="14" fontWeight="700" fill="#fff">强缓存</text>
      <text x="370" y="77" textAnchor="end" fontSize="11" fill="#bfdbfe">不请求服务器，直接用缓存</text>
      <text x="40" y="108" fontSize="11" fill="#1e3a8a" fontFamily="monospace">Cache-Control: max-age=3600</text>
      <text x="40" y="126" fontSize="10" fill="#475569">→ 3600秒内直接用缓存（HTTP/1.1首选）</text>
      <text x="40" y="150" fontSize="11" fill="#1e3a8a" fontFamily="monospace">Expires: Wed, 01 Jan 2025 00:00:00 GMT</text>
      <text x="40" y="168" fontSize="10" fill="#475569">→ 绝对过期时间（HTTP/1.0，已过时）</text>
      <text x="40" y="195" fontSize="11" fontWeight="600" fill="#1d4ed8">命中时状态码：200（from cache）</text>
      <text x="40" y="215" fontSize="11" fill="#64748b">不发送请求 → 无网络延迟 → 最快</text>

      {/* 协商缓存 */}
      <rect x="410" y="55" width="370" height="180" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="410" y="55" width="370" height="32" rx="10" fill="url(#ilh-ca-negotiate)" />
      <text x="430" y="77" fontSize="14" fontWeight="700" fill="#fff">协商缓存</text>
      <text x="760" y="77" textAnchor="end" fontSize="11" fill="#fde68a">问服务器：缓存还能用吗？</text>
      <text x="430" y="108" fontSize="11" fill="#78350f" fontFamily="monospace">Last-Modified / If-Modified-Since</text>
      <text x="430" y="126" fontSize="10" fill="#475569">→ 基于修改时间（精度秒级）</text>
      <text x="430" y="150" fontSize="11" fill="#78350f" fontFamily="monospace">ETag / If-None-Match</text>
      <text x="430" y="168" fontSize="10" fill="#475569">→ 基于内容哈希（更精确）</text>
      <text x="430" y="195" fontSize="11" fontWeight="600" fill="#d97706">命中时状态码：304 Not Modified</text>
      <text x="430" y="215" fontSize="11" fill="#64748b">发送请求但无响应体 → 有网络往返但省带宽</text>

      {/* 缓存决策流程 */}
      <rect x="20" y="255" width="760" height="245" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="278" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">缓存决策流程</text>

      <rect x="290" y="290" width="220" height="30" rx="6" fill="#334155" />
      <text x="400" y="310" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">客户端请求资源</text>

      <path d="M400 322 L400 340" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-ca-arrow)" />

      <rect x="270" y="345" width="260" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="365" textAnchor="middle" fontSize="11" fill="#1d4ed8">检查本地缓存 → Cache-Control未过期？</text>

      <path d="M320 360 L180 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-ca-arrow)" />
      <text x="240" y="380" fontSize="10" fill="#059669">是</text>

      <path d="M480 360 L620 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-ca-arrow)" />
      <text x="560" y="380" fontSize="10" fill="#d97706">否</text>

      <rect x="80" y="395" width="180" height="35" rx="6" fill="url(#ilh-ca-hit)" />
      <text x="170" y="417" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">强缓存命中 200</text>

      <rect x="540" y="395" width="200" height="35" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="640" y="417" textAnchor="middle" fontSize="11" fill="#d97706">发送协商缓存请求</text>

      <path d="M640 432 L640 445" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-ca-arrow)" />

      <rect x="520" y="450" width="240" height="30" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="640" y="470" textAnchor="middle" fontSize="10" fill="#475569">ETag/Last-Modified 匹配？</text>

      <path d="M570 465 L430 480" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-ca-arrow)" />
      <text x="500" y="478" fontSize="10" fill="#059669">是</text>

      <path d="M710 465 L760 480" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-ca-arrow)" />
      <text x="740" y="478" fontSize="10" fill="#dc2626">否</text>

      <rect x="330" y="475" width="180" height="25" rx="6" fill="url(#ilh-ca-hit)" />
      <text x="420" y="492" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">304 Not Modified</text>

      <rect x="680" y="475" width="100" height="25" rx="6" fill="url(#ilh-ca-miss)" />
      <text x="730" y="492" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">200 + 新资源</text>
    </svg>
  );
}
