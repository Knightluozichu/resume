"use client";

export function CntApplicationLayerDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="应用层HTTP与Web架构图">
      <defs>
        <linearGradient id="cnt-app-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cnt-app-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="cnt-app-cache" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="cnt-app-dns" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="cnt-app-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">应用层：HTTP请求响应与DNS解析</text>

      {/* HTTP请求响应 */}
      <rect x="30" y="50" width="140" height="80" rx="10" fill="url(#cnt-app-client)" opacity="0.95" />
      <text x="100" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">客户端</text>
      <text x="100" y="100" textAnchor="middle" fontSize="11" fill="#bfdbfe">浏览器</text>
      <text x="100" y="118" textAnchor="middle" fontSize="10" fill="#60a5fa">发起HTTP请求</text>

      <rect x="630" y="50" width="140" height="80" rx="10" fill="url(#cnt-app-server)" opacity="0.95" />
      <text x="700" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">服务器</text>
      <text x="700" y="100" textAnchor="middle" fontSize="11" fill="#cffafe">Web服务器</text>
      <text x="700" y="118" textAnchor="middle" fontSize="10" fill="#67e8f9">返回HTTP响应</text>

      {/* 请求箭头 */}
      <path d="M170 80 L630 80" stroke="#2563eb" strokeWidth="2" markerEnd="url(#cnt-app-arrow)" />
      <text x="400" y="72" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">HTTP请求：GET /index.html HTTP/1.1</text>
      <text x="400" y="92" textAnchor="middle" fontSize="10" fill="#3b82f6">Host / User-Agent / Accept</text>

      {/* 响应箭头 */}
      <path d="M630 120 L170 120" stroke="#0891b2" strokeWidth="2" markerEnd="url(#cnt-app-arrow)" />
      <text x="400" y="112" textAnchor="middle" fontSize="11" fill="#0e7490" fontWeight="600">HTTP响应：HTTP/1.1 200 OK</text>
      <text x="400" y="132" textAnchor="middle" fontSize="10" fill="#06b6d4">Content-Type / Content-Length + HTML体</text>

      {/* Web缓存 */}
      <rect x="330" y="150" width="140" height="60" rx="10" fill="url(#cnt-app-cache)" opacity="0.9" />
      <text x="400" y="175" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Web缓存</text>
      <text x="400" y="193" textAnchor="middle" fontSize="10" fill="#d1fae5">命中直接返回 / 未命中转发</text>
      <path d="M100 130 L100 165 L330 165" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#cnt-app-arrow)" />
      <path d="M470 180 L630 180" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#cnt-app-arrow)" />
      <text x="200" y="158" fontSize="10" fill="#059669">① 请求先到缓存</text>
      <text x="540" y="174" fontSize="10" fill="#059669">② 未命中则转发</text>

      {/* DNS解析流程 */}
      <text x="400" y="250" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">DNS域名解析流程</text>

      <rect x="20" y="270" width="110" height="50" rx="8" fill="url(#cnt-app-client)" opacity="0.9" />
      <text x="75" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">用户</text>
      <text x="75" y="306" textAnchor="middle" fontSize="10" fill="#bfdbfe">浏览器</text>

      <rect x="160" y="270" width="110" height="50" rx="8" fill="url(#cnt-app-dns)" opacity="0.9" />
      <text x="215" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">本地DNS</text>
      <text x="215" y="306" textAnchor="middle" fontSize="10" fill="#fef3c7">递归查询</text>

      <rect x="300" y="270" width="110" height="50" rx="8" fill="url(#cnt-app-dns)" opacity="0.7" />
      <text x="355" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">根服务器</text>
      <text x="355" y="306" textAnchor="middle" fontSize="10" fill="#fef3c7">迭代查询</text>

      <rect x="440" y="270" width="110" height="50" rx="8" fill="url(#cnt-app-dns)" opacity="0.7" />
      <text x="495" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">TLD服务器</text>
      <text x="495" y="306" textAnchor="middle" fontSize="10" fill="#fef3c7">.com/.org</text>

      <rect x="580" y="270" width="110" height="50" rx="8" fill="url(#cnt-app-dns)" opacity="0.7" />
      <text x="635" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">权威服务器</text>
      <text x="635" y="306" textAnchor="middle" fontSize="10" fill="#fef3c7">返回IP</text>

      {/* DNS箭头 */}
      <path d="M130 295 L160 295" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-app-arrow)" />
      <path d="M270 295 L300 295" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-app-arrow)" />
      <path d="M410 295 L440 295" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-app-arrow)" />
      <path d="M550 295 L580 295" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-app-arrow)" />
      <text x="400" y="335" textAnchor="middle" fontSize="10" fill="#64748b">递归（用户→本地DNS） + 迭代（本地DNS→各级服务器） · 基于UDP端口53</text>

      {/* DNS记录类型 */}
      <rect x="30" y="360" width="740" height="140" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="384" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">DNS记录类型与HTTP报文结构</text>

      <text x="50" y="410" fontSize="11" fontWeight="600" fill="#1e40af">A记录：</text>
      <text x="120" y="410" fontSize="11" fill="#475569">域名 → IPv4地址</text>
      <text x="50" y="430" fontSize="11" fontWeight="600" fill="#1e40af">CNAME：</text>
      <text x="120" y="430" fontSize="11" fill="#475569">域名别名（www → 主域名）</text>
      <text x="50" y="450" fontSize="11" fontWeight="600" fill="#1e40af">MX记录：</text>
      <text x="120" y="450" fontSize="11" fill="#475569">邮件服务器</text>
      <text x="50" y="470" fontSize="11" fontWeight="600" fill="#1e40af">NS记录：</text>
      <text x="120" y="470" fontSize="11" fill="#475569">域名服务器</text>

      <line x1="300" y1="395" x2="300" y2="490" stroke="#e2e8f0" strokeWidth="1" />

      <text x="320" y="410" fontSize="11" fontWeight="600" fill="#0e7490">请求行：</text>
      <text x="390" y="410" fontSize="11" fill="#475569">GET /path HTTP/1.1</text>
      <text x="320" y="430" fontSize="11" fontWeight="600" fill="#0e7490">首部行：</text>
      <text x="390" y="430" fontSize="11" fill="#475569">Host / User-Agent / Accept</text>
      <text x="320" y="450" fontSize="11" fontWeight="600" fill="#0e7490">空行：</text>
      <text x="390" y="450" fontSize="11" fill="#475569">标志首部结束</text>
      <text x="320" y="470" fontSize="11" fontWeight="600" fill="#0e7490">请求体：</text>
      <text x="390" y="470" fontSize="11" fill="#475569">POST数据（GET为空）</text>

      <line x1="550" y1="395" x2="550" y2="490" stroke="#e2e8f0" strokeWidth="1" />

      <text x="570" y="410" fontSize="11" fontWeight="600" fill="#059669">状态行：</text>
      <text x="640" y="410" fontSize="11" fill="#475569">HTTP/1.1 200 OK</text>
      <text x="570" y="430" fontSize="11" fontWeight="600" fill="#059669">状态码：</text>
      <text x="640" y="430" fontSize="11" fill="#475569">2xx成功/3xx重定向</text>
      <text x="640" y="448" fontSize="11" fill="#475569">4xx客户端错误/5xx服务器错误</text>
      <text x="570" y="470" fontSize="11" fontWeight="600" fill="#059669">响应体：</text>
      <text x="640" y="470" fontSize="11" fill="#475569">HTML/CSS/JS内容</text>
    </svg>
  );
}
