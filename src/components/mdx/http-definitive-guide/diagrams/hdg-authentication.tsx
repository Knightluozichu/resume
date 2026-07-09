"use client";

export function HdgAuthenticationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="HTTP认证与安全">
      <defs>
        <linearGradient id="hdg-auth-basic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hdg-auth-digest" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="hdg-auth-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="hdg-auth-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="hdg-auth-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTP 认证与安全</text>

      {/* Basic 认证流程 */}
      <text x="200" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Basic 认证流程</text>

      <rect x="40" y="68" width="100" height="40" rx="6" fill="url(#hdg-auth-client)" opacity="0.9" />
      <text x="90" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">客户端</text>

      <rect x="260" y="68" width="100" height="40" rx="6" fill="url(#hdg-auth-server)" opacity="0.9" />
      <text x="310" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">服务器</text>

      {/* 步骤1 */}
      <path d="M145 120 L255 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-auth-arrow)" />
      <rect x="50" y="110" width="200" height="20" rx="4" fill="#f1f5f9" />
      <text x="150" y="124" textAnchor="middle" fontSize="9" fill="#475569">1. GET /protected（无凭证）</text>

      {/* 步骤2 */}
      <path d="M255 150 L145 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-auth-arrow)" />
      <rect x="50" y="140" width="250" height="36" rx="4" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1" />
      <text x="175" y="154" textAnchor="middle" fontSize="9" fill="#92400e">2. 401 Unauthorized</text>
      <text x="175" y="168" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#475569">WWW-Authenticate: Basic realm="Site"</text>

      {/* 步骤3 */}
      <path d="M145 196 L255 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-auth-arrow)" />
      <rect x="50" y="186" width="300" height="36" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="200" y="200" textAnchor="middle" fontSize="9" fill="#1e40af">3. 携带凭证重发</text>
      <text x="200" y="214" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#475569">Authorization: Basic dXNlcjpwYXNz</text>

      {/* 步骤4 */}
      <path d="M255 230 L145 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-auth-arrow)" />
      <rect x="50" y="220" width="200" height="20" rx="4" fill="#d1fae5" />
      <text x="150" y="234" textAnchor="middle" fontSize="9" fill="#065f46">4. 200 OK（验证通过）</text>

      <text x="200" y="266" textAnchor="middle" fontSize="9" fill="#dc2626">Base64 编码 = 明文，必须配合 HTTPS 使用</text>

      {/* Digest 认证流程 */}
      <text x="600" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">Digest 认证流程</text>

      <rect x="440" y="68" width="100" height="40" rx="6" fill="url(#hdg-auth-client)" opacity="0.9" />
      <text x="490" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">客户端</text>

      <rect x="660" y="68" width="100" height="40" rx="6" fill="url(#hdg-auth-server)" opacity="0.9" />
      <text x="710" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">服务器</text>

      <path d="M545 120 L655 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-auth-arrow)" />
      <rect x="450" y="110" width="200" height="20" rx="4" fill="#f1f5f9" />
      <text x="550" y="124" textAnchor="middle" fontSize="9" fill="#475569">1. GET /protected（无凭证）</text>

      <path d="M655 150 L545 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-auth-arrow)" />
      <rect x="450" y="140" width="280" height="36" rx="4" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
      <text x="590" y="154" textAnchor="middle" fontSize="9" fill="#065f46">2. 401 + 挑战（nonce, realm, qop）</text>
      <text x="590" y="168" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#475569">WWW-Authenticate: Digest nonce=abc123...</text>

      <path d="M545 196 L655 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-auth-arrow)" />
      <rect x="450" y="186" width="300" height="36" rx="4" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
      <text x="600" y="200" textAnchor="middle" fontSize="9" fill="#065f46">3. MD5(用户:realm:密码) + nonce → 摘要</text>
      <text x="600" y="214" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#475569">Authorization: Digest response=哈希值...</text>

      <path d="M655 230 L545 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-auth-arrow)" />
      <rect x="450" y="220" width="200" height="20" rx="4" fill="#d1fae5" />
      <text x="550" y="234" textAnchor="middle" fontSize="9" fill="#065f46">4. 200 OK（验证哈希通过）</text>

      <text x="600" y="266" textAnchor="middle" fontSize="9" fill="#059669">密码不传输，用 nonce 防重放攻击</text>

      {/* 对比表 */}
      <text x="400" y="296" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Basic vs Digest 对比</text>

      <rect x="20" y="308" width="380" height="110" rx="8" fill="url(#hdg-auth-basic)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="35" y="330" fontSize="12" fontWeight="700" fill="#92400e">Basic 认证</text>
      <text x="35" y="350" fontSize="10" fill="#475569">凭证：用户名:密码 → Base64 编码</text>
      <text x="35" y="368" fontSize="10" fill="#475569">安全性：低（Base64 可逆 = 明文）</text>
      <text x="35" y="386" fontSize="10" fill="#475569">优点：实现简单、广泛支持</text>
      <text x="35" y="404" fontSize="10" fill="#dc2626">必须配合 HTTPS 使用</text>

      <rect x="420" y="308" width="360" height="110" rx="8" fill="url(#hdg-auth-digest)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="435" y="330" fontSize="12" fontWeight="700" fill="#065f46">Digest 认证</text>
      <text x="435" y="350" fontSize="10" fill="#475569">凭证：MD5 哈希摘要（不传密码）</text>
      <text x="435" y="368" fontSize="10" fill="#475569">安全性：中（密码不明文传输）</text>
      <text x="435" y="386" fontSize="10" fill="#475569">优点：防嗅探、防重放（nonce）</text>
      <text x="435" y="404" fontSize="10" fill="#475569">缺点：MD5 已不安全，配置复杂</text>

      {/* 安全威胁 */}
      <rect x="20" y="436" width="760" height="112" rx="8" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.5" />
      <text x="400" y="458" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">常见 HTTP 安全威胁</text>

      <rect x="40" y="470" width="170" height="66" rx="6" fill="#fff" stroke="#fca5a5" strokeWidth="1" />
      <text x="125" y="490" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">中间人攻击</text>
      <text x="125" y="508" textAnchor="middle" fontSize="9" fill="#475569">攻击者截获通信</text>
      <text x="125" y="522" textAnchor="middle" fontSize="9" fill="#475569">窃取/篡改数据</text>

      <rect x="230" y="470" width="170" height="66" rx="6" fill="#fff" stroke="#fca5a5" strokeWidth="1" />
      <text x="315" y="490" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">重放攻击</text>
      <text x="315" y="508" textAnchor="middle" fontSize="9" fill="#475569">截获并重发请求</text>
      <text x="315" y="522" textAnchor="middle" fontSize="9" fill="#475569">nonce + 时间戳防御</text>

      <rect x="420" y="470" width="170" height="66" rx="6" fill="#fff" stroke="#fca5a5" strokeWidth="1" />
      <text x="505" y="490" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">会话劫持</text>
      <text x="505" y="508" textAnchor="middle" fontSize="9" fill="#475569">窃取 Cookie/Token</text>
      <text x="505" y="522" textAnchor="middle" fontSize="9" fill="#475569">HttpOnly + Secure 防御</text>

      <rect x="610" y="470" width="150" height="66" rx="6" fill="#fff" stroke="#fca5a5" strokeWidth="1" />
      <text x="685" y="490" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">钓鱼攻击</text>
      <text x="685" y="508" textAnchor="middle" fontSize="9" fill="#475569">伪造认证页面</text>
      <text x="685" y="522" textAnchor="middle" fontSize="9" fill="#475569">HSTS + 证书验证</text>
    </svg>
  );
}
