"use client";

export function TipApplicationProtocolsDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="应用层协议实战">
      <defs>
        <linearGradient id="tip-ap-dns" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tip-ap-http" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="tip-ap-smtp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tip-ap-ftp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tip-ap-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">应用层协议实战</text>

      {/* DNS */}
      <text x="200" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">DNS 域名解析</text>

      <rect x="20" y="68" width="380" height="150" rx="10" fill="#fffbeb" stroke="#fde047" strokeWidth="1.5" />
      <text x="40" y="90" fontSize="10" fontWeight="600" fill="#854d0e">端口：53（UDP为主，大响应用TCP）</text>

      <rect x="40" y="100" width="100" height="30" rx="6" fill="url(#tip-ap-dns)" opacity="0.9" />
      <text x="90" y="120" textAnchor="middle" fontSize="10" fill="#fff">客户端</text>
      <rect x="280" y="100" width="100" height="30" rx="6" fill="url(#tip-ap-dns)" opacity="0.9" />
      <text x="330" y="120" textAnchor="middle" fontSize="10" fill="#fff">DNS服务器</text>

      <path d="M140 112 L280 112" stroke="#d97706" strokeWidth="2" markerEnd="url(#tip-ap-arrow)" />
      <text x="210" y="106" textAnchor="middle" fontSize="8" fill="#92400e">Query: www.example.com?</text>
      <path d="M280 120 L140 120" stroke="#d97706" strokeWidth="2" markerEnd="url(#tip-ap-arrow)" />
      <text x="210" y="134" textAnchor="middle" fontSize="8" fill="#92400e">Response: 93.184.216.34</text>

      <text x="40" y="152" fontSize="10" fontWeight="600" fill="#854d0e">记录类型</text>
      <text x="40" y="168" fontSize="9" fill="#713f12">A=IPv4  AAAA=IPv6  CNAME=别名  MX=邮件  NS=名称服务器  TXT=文本</text>
      <text x="40" y="184" fontSize="9" fill="#713f12">PTR=反向解析  SOA=起始授权  SRV=服务记录</text>
      <text x="40" y="204" fontSize="9" fill="#713f12">递归查询：客户端→本地DNS→根→TLD→权威 → 返回IP</text>

      {/* HTTP */}
      <text x="600" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">HTTP 请求响应</text>

      <rect x="420" y="68" width="360" height="150" rx="10" fill="#ecfeff" stroke="#67e8f9" strokeWidth="1.5" />
      <text x="440" y="90" fontSize="10" fontWeight="600" fill="#0c4a6e">端口：80（HTTP）/ 443（HTTPS over TLS）</text>

      <rect x="440" y="100" width="80" height="30" rx="6" fill="url(#tip-ap-http)" opacity="0.9" />
      <text x="480" y="120" textAnchor="middle" fontSize="10" fill="#fff">浏览器</text>
      <rect x="680" y="100" width="80" height="30" rx="6" fill="url(#tip-ap-http)" opacity="0.9" />
      <text x="720" y="120" textAnchor="middle" fontSize="10" fill="#fff">服务器</text>

      <path d="M520 112 L680 112" stroke="#0891b2" strokeWidth="2" markerEnd="url(#tip-ap-arrow)" />
      <text x="600" y="106" textAnchor="middle" fontSize="8" fill="#0e7490">GET /index.html HTTP/1.1</text>
      <path d="M680 120 L520 120" stroke="#0891b2" strokeWidth="2" markerEnd="url(#tip-ap-arrow)" />
      <text x="600" y="134" textAnchor="middle" fontSize="8" fill="#0e7490">200 OK + HTML body</text>

      <text x="440" y="152" fontSize="10" fontWeight="600" fill="#0c4a6e">方法：GET/POST/PUT/DELETE/HEAD/OPTIONS</text>
      <text x="440" y="168" fontSize="9" fill="#075985">状态码：2xx成功 3xx重定向 4xx客户端错误 5xx服务端错误</text>
      <text x="440" y="184" fontSize="9" fill="#075985">无状态：Cookie/Session 维持会话</text>
      <text x="440" y="204" fontSize="9" fill="#075985">HTTP/1.1 持久连接（Keep-Alive）+ 管道化</text>

      {/* SMTP/FTP */}
      <text x="200" y="244" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">SMTP 邮件传输</text>

      <rect x="20" y="256" width="380" height="140" rx="10" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.5" />
      <text x="40" y="278" fontSize="10" fontWeight="600" fill="#4c1d95">端口：25(SMTP) / 587(提交) / 110(POP3) / 143(IMAP)</text>

      <rect x="40" y="290" width="80" height="28" rx="6" fill="url(#tip-ap-smtp)" opacity="0.9" />
      <text x="80" y="308" textAnchor="middle" fontSize="9" fill="#fff">发件人</text>
      <rect x="300" y="290" width="80" height="28" rx="6" fill="url(#tip-ap-smtp)" opacity="0.9" />
      <text x="340" y="308" textAnchor="middle" fontSize="9" fill="#fff">SMTP服务器</text>

      <path d="M120 300 L300 300" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-ap-arrow)" />
      <text x="210" y="294" textAnchor="middle" fontSize="8" fill="#5b21b6">HELO → MAIL FROM → RCPT TO → DATA</text>

      <text x="40" y="340" fontSize="9" fill="#5b21b6">SMTP 用 TCP 可靠传输，命令式协议（文本行交互）</text>
      <text x="40" y="356" fontSize="9" fill="#5b21b6">MUA → MTA(SMTP) → MTA → MDA(POP3/IMAP) → MUA</text>
      <text x="40" y="372" fontSize="9" fill="#5b21b6">MIME 扩展支持附件、HTML、多媒体内容</text>
      <text x="40" y="388" fontSize="9" fill="#5b21b6">响应码：220服务就绪 250OK 550邮箱不存在</text>

      {/* FTP */}
      <text x="600" y="244" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">FTP 文件传输</text>

      <rect x="420" y="256" width="360" height="140" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="440" y="278" fontSize="10" fontWeight="600" fill="#14532d">端口：21(控制) / 20(主动数据) / 被动模式(随机)</text>

      <rect x="440" y="290" width="80" height="28" rx="6" fill="url(#tip-ap-ftp)" opacity="0.9" />
      <text x="480" y="308" textAnchor="middle" fontSize="9" fill="#fff">客户端</text>
      <rect x="680" y="290" width="80" height="28" rx="6" fill="url(#tip-ap-ftp)" opacity="0.9" />
      <text x="720" y="308" textAnchor="middle" fontSize="9" fill="#fff">服务器</text>

      <text x="440" y="340" fontSize="9" fill="#166534">双连接：控制连接(21) + 数据连接(20/随机)</text>
      <text x="440" y="356" fontSize="9" fill="#166534">主动模式(PORT)：服务器从20连客户端</text>
      <text x="440" y="372" fontSize="9" fill="#166534">被动模式(PASV)：客户端连服务器随机端口</text>
      <text x="440" y="388" fontSize="9" fill="#166534">命令：USER/PASS/LIST/RETR/STOR/QUIT</text>

      {/* 应用层对比 */}
      <rect x="20" y="412" width="760" height="168" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="40" y="436" fontSize="12" fontWeight="700" fill="#334155">应用层协议对比</text>

      <rect x="40" y="446" width="80" height="24" rx="4" fill="#e2e8f0" />
      <text x="80" y="462" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">协议</text>
      <rect x="120" y="446" width="60" height="24" rx="4" fill="#e2e8f0" />
      <text x="150" y="462" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">端口</text>
      <rect x="180" y="446" width="100" height="24" rx="4" fill="#e2e8f0" />
      <text x="230" y="462" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">传输层</text>
      <rect x="280" y="446" width="480" height="24" rx="4" fill="#e2e8f0" />
      <text x="520" y="462" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">用途</text>

      <text x="80" y="488" textAnchor="middle" fontSize="9" fill="#92400e">DNS</text>
      <text x="150" y="488" textAnchor="middle" fontSize="9" fill="#475569">53</text>
      <text x="230" y="488" textAnchor="middle" fontSize="9" fill="#475569">UDP/TCP</text>
      <text x="520" y="488" textAnchor="middle" fontSize="9" fill="#475569">域名解析</text>

      <text x="80" y="508" textAnchor="middle" fontSize="9" fill="#0e7490">HTTP</text>
      <text x="150" y="508" textAnchor="middle" fontSize="9" fill="#475569">80/443</text>
      <text x="230" y="508" textAnchor="middle" fontSize="9" fill="#475569">TCP</text>
      <text x="520" y="508" textAnchor="middle" fontSize="9" fill="#475569">网页传输</text>

      <text x="80" y="528" textAnchor="middle" fontSize="9" fill="#5b21b6">SMTP</text>
      <text x="150" y="528" textAnchor="middle" fontSize="9" fill="#475569">25/587</text>
      <text x="230" y="528" textAnchor="middle" fontSize="9" fill="#475569">TCP</text>
      <text x="520" y="528" textAnchor="middle" fontSize="9" fill="#475569">邮件发送</text>

      <text x="80" y="548" textAnchor="middle" fontSize="9" fill="#065f46">FTP</text>
      <text x="150" y="548" textAnchor="middle" fontSize="9" fill="#475569">20/21</text>
      <text x="230" y="548" textAnchor="middle" fontSize="9" fill="#475569">TCP</text>
      <text x="520" y="548" textAnchor="middle" fontSize="9" fill="#475569">文件传输</text>

      <text x="80" y="568" textAnchor="middle" fontSize="9" fill="#475569">SNMP</text>
      <text x="150" y="568" textAnchor="middle" fontSize="9" fill="#475569">161/162</text>
      <text x="230" y="568" textAnchor="middle" fontSize="9" fill="#475569">UDP</text>
      <text x="520" y="568" textAnchor="middle" fontSize="9" fill="#475569">网络管理</text>
    </svg>
  );
}
