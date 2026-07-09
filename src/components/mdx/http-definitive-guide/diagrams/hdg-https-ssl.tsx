"use client";

export function HdgHttpsSslDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="HTTPS与SSL/TLS">
      <defs>
        <linearGradient id="hdg-tls-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="hdg-tls-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="hdg-tls-handshake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hdg-tls-encrypt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="hdg-tls-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTPS 与 SSL/TLS</text>

      {/* HTTP vs HTTPS */}
      <text x="400" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">HTTP vs HTTPS</text>

      <rect x="20" y="68" width="370" height="60" rx="8" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="35" y="90" fontSize="12" fontWeight="700" fill="#991b1b">HTTP（明文传输）</text>
      <text x="35" y="108" fontSize="10" fill="#475569">数据明文传输，可被窃听/篡改</text>
      <text x="35" y="122" fontSize="10" fill="#dc2626">端口 80，无加密无认证</text>

      <rect x="410" y="68" width="370" height="60" rx="8" fill="#f0fdf4" stroke="#6ee7b7" strokeWidth="1.5" />
      <text x="425" y="90" fontSize="12" fontWeight="700" fill="#065f46">HTTPS（加密传输）</text>
      <text x="425" y="108" fontSize="10" fill="#475569">HTTP + TLS/SSL，加密 + 认证 + 完整性</text>
      <text x="425" y="122" fontSize="10" fill="#059669">端口 443，证书验证身份</text>

      {/* TLS 握手流程 */}
      <text x="400" y="156" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">TLS 握手流程</text>

      <rect x="40" y="168" width="100" height="340" rx="8" fill="url(#hdg-tls-client)" opacity="0.9" />
      <text x="90" y="340" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">客户端</text>

      <rect x="660" y="168" width="100" height="340" rx="8" fill="url(#hdg-tls-server)" opacity="0.9" />
      <text x="710" y="340" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">服务器</text>

      {/* 步骤1: ClientHello */}
      <path d="M145 186 L655 186" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-tls-arrow)" />
      <rect x="160" y="176" width="480" height="20" rx="4" fill="#dbeafe" />
      <text x="400" y="190" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">1. ClientHello（支持的TLS版本、加密套件、随机数）</text>

      {/* 步骤2: ServerHello */}
      <path d="M655 216 L145 216" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-tls-arrow)" />
      <rect x="160" y="206" width="480" height="30" rx="4" fill="#d1fae5" />
      <text x="400" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">2. ServerHello + 证书 + ServerKeyExchange</text>
      <text x="400" y="232" textAnchor="middle" fontSize="9" fill="#475569">选定加密套件、服务器随机数、X.509 证书</text>

      {/* 步骤3: 验证证书 */}
      <rect x="160" y="246" width="480" height="30" rx="4" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1" />
      <text x="400" y="260" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">3. 客户端验证证书（CA 签名链 → 信任根 → 域名匹配 → 有效期）</text>
      <text x="400" y="272" textAnchor="middle" fontSize="9" fill="#64748b">验证通过 → 信任服务器身份</text>

      {/* 步骤4: 密钥交换 */}
      <path d="M145 290 L655 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-tls-arrow)" />
      <rect x="160" y="280" width="480" height="20" rx="4" fill="#dbeafe" />
      <text x="400" y="294" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">4. ClientKeyExchange（生成预主密钥，用服务器公钥加密发送）</text>

      {/* 步骤5: 切换加密 */}
      <path d="M145 320 L655 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-tls-arrow)" />
      <rect x="160" y="310" width="480" height="20" rx="4" fill="#ede9fe" />
      <text x="400" y="324" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">5. ChangeCipherSpec + Finished（切换到加密通信）</text>

      <path d="M655 348 L145 348" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-tls-arrow)" />
      <rect x="160" y="338" width="480" height="20" rx="4" fill="#ede9fe" />
      <text x="400" y="352" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">6. ChangeCipherSpec + Finished（服务器确认）</text>

      {/* 加密通信 */}
      <rect x="160" y="368" width="480" height="56" rx="4" fill="url(#hdg-tls-encrypt)" opacity="0.12" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="388" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">7. 加密 HTTP 通信（对称密钥加密所有数据）</text>
      <text x="400" y="406" textAnchor="middle" fontSize="10" fill="#475569">对称加密：AES/ChaCha20（性能高）</text>
      <text x="400" y="420" textAnchor="middle" fontSize="10" fill="#475569">密钥来自握手协商，只有双方知道</text>

      {/* 加密三要素 */}
      <rect x="160" y="436" width="480" height="56" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="400" y="454" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">TLS 提供的三大安全保证</text>
      <text x="240" y="472" textAnchor="middle" fontSize="10" fill="#2563eb">加密（机密性）</text>
      <text x="400" y="472" textAnchor="middle" fontSize="10" fill="#10b981">认证（身份验证）</text>
      <text x="560" y="472" textAnchor="middle" fontSize="10" fill="#f59e0b">完整性（防篡改）</text>

      {/* 密码学基础 */}
      <rect x="20" y="520" width="760" height="30" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="540" textAnchor="middle" fontSize="10" fill="#475569">非对称加密（RSA/ECDHE）用于密钥交换和认证 | 对称加密（AES）用于数据传输 | 哈希（SHA-256）用于完整性校验</text>
    </svg>
  );
}
