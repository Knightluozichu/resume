"use client";

export function IlhHttpsSecurityDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="HTTPS加密原理与SSL-TLS握手流程">
      <defs>
        <linearGradient id="ilh-hs-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ilh-hs-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ilh-hs-encrypt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="ilh-hs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="ilh-hs-arrow-back" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#0891b2" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTPS = HTTP + 加密 + 认证 + 完整性保护</text>

      {/* 客户端和服务器 */}
      <rect x="30" y="60" width="120" height="40" rx="8" fill="url(#ilh-hs-client)" />
      <text x="90" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">客户端</text>

      <rect x="650" y="60" width="120" height="40" rx="8" fill="url(#ilh-hs-server)" />
      <text x="710" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">服务器</text>

      {/* TLS握手流程 */}
      <text x="400" y="125" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">SSL/TLS 握手流程</text>

      <path d="M150 145 L650 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-hs-arrow)" />
      <text x="400" y="138" textAnchor="middle" fontSize="11" fill="#475569">① Client Hello（支持的TLS版本/加密套件/随机数）</text>

      <path d="M650 175 L150 175" stroke="#0891b2" strokeWidth="2" markerEnd="url(#ilh-hs-arrow-back)" />
      <text x="400" y="168" textAnchor="middle" fontSize="11" fill="#475569">② Server Hello + 数字证书 + 公钥（选定加密套件/随机数）</text>

      <path d="M150 205 L650 205" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-hs-arrow)" />
      <text x="400" y="198" textAnchor="middle" fontSize="11" fill="#475569">③ 客户端验证证书 → 生成预主密钥 → 用公钥加密发送</text>

      <path d="M650 235 L150 235" stroke="#0891b2" strokeWidth="2" markerEnd="url(#ilh-hs-arrow-back)" />
      <text x="400" y="228" textAnchor="middle" fontSize="11" fill="#475569">④ 双方用三个随机数生成会话密钥 → 切换到加密通信</text>

      <rect x="250" y="255" width="300" height="30" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="400" y="275" textAnchor="middle" fontSize="12" fontWeight="600" fill="#059669">握手完成 → 使用共享密钥进行对称加密通信</text>

      {/* 加密方式对比 */}
      <rect x="20" y="310" width="370" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="205" y="333" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">共享密钥加密（对称加密）</text>
      <text x="205" y="355" textAnchor="middle" fontSize="11" fill="#78350f">加密和解密使用同一个密钥</text>
      <text x="205" y="375" textAnchor="middle" fontSize="11" fill="#78350f">速度快，适合大量数据</text>
      <text x="205" y="395" textAnchor="middle" fontSize="11" fill="#b45309">问题：如何安全地传递密钥？</text>

      <rect x="410" y="310" width="370" height="100" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="595" y="333" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d4ed8">公开密钥加密（非对称加密）</text>
      <text x="595" y="355" textAnchor="middle" fontSize="11" fill="#1e3a8a">公钥加密 → 私钥解密（或反之）</text>
      <text x="595" y="375" textAnchor="middle" fontSize="11" fill="#1e3a8a">无需传递私钥，安全性高</text>
      <text x="595" y="395" textAnchor="middle" fontSize="11" fill="#1d4ed8">缺点：速度慢，不适合大量数据</text>

      {/* HTTPS混合加密 */}
      <rect x="20" y="425" width="760" height="95" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="448" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">HTTPS混合加密机制</text>
      <text x="400" y="470" textAnchor="middle" fontSize="11" fill="#475569">密钥交换阶段：用公开密钥加密（非对称）安全传递共享密钥</text>
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#475569">数据传输阶段：用共享密钥加密（对称）高效传输数据</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#64748b">数字证书：由CA机构签发，证明公钥属于真正的服务器（防中间人攻击）</text>
    </svg>
  );
}
