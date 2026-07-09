"use client";

export function HdgHttpMessagesDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="HTTP报文结构与连接管理">
      <defs>
        <linearGradient id="hdg-msg-req" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="hdg-msg-res" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="hdg-msg-conn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="hdg-msg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTP 报文结构与连接管理</text>

      {/* 请求报文 */}
      <text x="190" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">HTTP 请求报文</text>
      <rect x="20" y="70" width="340" height="200" rx="8" fill="url(#hdg-msg-req)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />

      <rect x="30" y="80" width="320" height="28" rx="4" fill="url(#hdg-msg-req)" opacity="0.9" />
      <text x="40" y="99" fontSize="11" fontWeight="700" fill="#fff">起始行：GET /index.html HTTP/1.1</text>

      <rect x="30" y="114" width="320" height="76" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="40" y="132" fontSize="10" fontWeight="600" fill="#1e40af">首部（Headers）</text>
      <text x="40" y="148" fontSize="10" fill="#475569">Host: www.example.com</text>
      <text x="40" y="162" fontSize="10" fill="#475569">User-Agent: Mozilla/5.0</text>
      <text x="40" y="176" fontSize="10" fill="#475569">Accept: text/html</text>

      <rect x="30" y="196" width="320" height="20" rx="4" fill="#e0e7ff" />
      <text x="190" y="210" textAnchor="middle" fontSize="9" fill="#6366f1">空行（CRLF）— 标志首部结束</text>

      <rect x="30" y="222" width="320" height="40" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="40" y="240" fontSize="10" fontWeight="600" fill="#475569">主体（Body）</text>
      <text x="40" y="256" fontSize="9" fill="#94a3b8">GET 通常为空，POST 携带表单/JSON 数据</text>

      {/* 响应报文 */}
      <text x="600" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">HTTP 响应报文</text>
      <rect x="430" y="70" width="340" height="200" rx="8" fill="url(#hdg-msg-res)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />

      <rect x="440" y="80" width="320" height="28" rx="4" fill="url(#hdg-msg-res)" opacity="0.9" />
      <text x="450" y="99" fontSize="11" fontWeight="700" fill="#fff">状态行：HTTP/1.1 200 OK</text>

      <rect x="440" y="114" width="320" height="76" rx="4" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
      <text x="450" y="132" fontSize="10" fontWeight="600" fill="#065f46">首部（Headers）</text>
      <text x="450" y="148" fontSize="10" fill="#475569">Content-Type: text/html</text>
      <text x="450" y="162" fontSize="10" fill="#475569">Content-Length: 1024</text>
      <text x="450" y="176" fontSize="10" fill="#475569">Cache-Control: max-age=3600</text>

      <rect x="440" y="196" width="320" height="20" rx="4" fill="#d1fae5" />
      <text x="600" y="210" textAnchor="middle" fontSize="9" fill="#059669">空行（CRLF）— 标志首部结束</text>

      <rect x="440" y="222" width="320" height="40" rx="4" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
      <text x="450" y="240" fontSize="10" fontWeight="600" fill="#475569">主体（Body）</text>
      <text x="450" y="256" fontSize="9" fill="#94a3b8">HTML 文档 / 图片 / JSON 等实际内容</text>

      {/* 连接管理 */}
      <text x="400" y="304" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">TCP 连接管理</text>

      <rect x="20" y="316" width="370" height="110" rx="8" fill="url(#hdg-msg-conn)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="35" y="338" fontSize="12" fontWeight="700" fill="#92400e">非持久连接（HTTP/1.0 默认）</text>
      <text x="35" y="358" fontSize="10" fill="#475569">每个请求建立独立 TCP 连接</text>
      <text x="35" y="374" fontSize="10" fill="#475569">1 HTML + 10 图片 = 11 次 TCP 握手</text>
      <text x="35" y="394" fontSize="10" fill="#475569">每个对象 = 2 RTT（握手 + 请求响应）</text>
      <text x="35" y="412" fontSize="10" fill="#dc2626">缺点：延迟高、服务器连接开销大</text>

      <rect x="410" y="316" width="370" height="110" rx="8" fill="url(#hdg-msg-conn)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="425" y="338" fontSize="12" fontWeight="700" fill="#92400e">持久连接（HTTP/1.1 默认）</text>
      <text x="425" y="358" fontSize="10" fill="#475569">TCP 连接保持，复用传输多个请求</text>
      <text x="425" y="374" fontSize="10" fill="#475569">1 HTML + 10 图片 = 1 次 TCP 握手</text>
      <text x="425" y="394" fontSize="10" fill="#475569">流水线模式：请求可并行发出</text>
      <text x="425" y="412" fontSize="10" fill="#059669">优点：延迟低、资源利用率高</text>

      {/* 状态码分类 */}
      <rect x="20" y="442" width="760" height="104" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="464" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">HTTP 状态码分类</text>

      <rect x="40" y="476" width="160" height="56" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="120" y="496" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">2xx 成功</text>
      <text x="120" y="514" textAnchor="middle" fontSize="10" fill="#475569">200 OK</text>
      <text x="120" y="528" textAnchor="middle" fontSize="9" fill="#64748b">请求正常处理</text>

      <rect x="220" y="476" width="160" height="56" rx="6" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1" />
      <text x="300" y="496" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">3xx 重定向</text>
      <text x="300" y="514" textAnchor="middle" fontSize="10" fill="#475569">301 / 302 / 304</text>
      <text x="300" y="528" textAnchor="middle" fontSize="9" fill="#64748b">需进一步操作</text>

      <rect x="400" y="476" width="160" height="56" rx="6" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
      <text x="480" y="496" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">4xx 客户端错误</text>
      <text x="480" y="514" textAnchor="middle" fontSize="10" fill="#475569">404 / 403 / 400</text>
      <text x="480" y="528" textAnchor="middle" fontSize="9" fill="#64748b">请求有误</text>

      <rect x="580" y="476" width="160" height="56" rx="6" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1" />
      <text x="660" y="496" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9d174d">5xx 服务器错误</text>
      <text x="660" y="514" textAnchor="middle" fontSize="10" fill="#475569">500 / 502 / 503</text>
      <text x="660" y="528" textAnchor="middle" fontSize="9" fill="#64748b">服务器故障</text>
    </svg>
  );
}
