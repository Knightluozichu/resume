"use client";

export function CntNetworkSecurityDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="网络安全实践架构图">
      <defs>
        <linearGradient id="cnt-ns-sym" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cnt-ns-pub" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cnt-ns-tls" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="cnt-ns-fw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="cnt-ns-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">网络安全：密码学、TLS与防火墙</text>

      {/* 对称 vs 公钥加密 */}
      <text x="400" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">加密体系：对称加密 vs 公钥加密</text>

      <rect x="30" y="70" width="360" height="110" rx="10" fill="url(#cnt-ns-sym)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="210" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">对称加密</text>
      <text x="50" y="116" fontSize="11" fill="#1e3a8a">加密/解密用同一密钥K</text>
      <text x="50" y="136" fontSize="11" fill="#1e3a8a">算法：AES / ChaCha20</text>
      <text x="50" y="156" fontSize="11" fill="#1e3a8a">速度快(100-1000x公钥) 适合大量数据</text>
      <text x="50" y="174" fontSize="11" fill="#1e3a8a">问题：密钥分发困难</text>

      <rect x="410" y="70" width="360" height="110" rx="10" fill="url(#cnt-ns-pub)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">公钥加密</text>
      <text x="430" y="116" fontSize="11" fill="#78350f">公钥Pu加密 → 私钥Pr解密</text>
      <text x="430" y="136" fontSize="11" fill="#78350f">算法：RSA / ECC</text>
      <text x="430" y="156" fontSize="11" fill="#78350f">解决密钥分发 + 支持数字签名</text>
      <text x="430" y="174" fontSize="11" fill="#78350f">问题：计算慢 → 混合加密</text>

      {/* TLS握手 */}
      <text x="400" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">TLS握手过程</text>

      <rect x="50" y="225" width="120" height="40" rx="8" fill="url(#cnt-ns-tls)" opacity="0.85" />
      <text x="110" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">客户端</text>

      <rect x="630" y="225" width="120" height="40" rx="8" fill="url(#cnt-ns-tls)" opacity="0.85" />
      <text x="690" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">服务器</text>

      <path d="M170 275 L630 275" stroke="#0891b2" strokeWidth="2" markerEnd="url(#cnt-ns-arrow)" />
      <text x="400" y="269" textAnchor="middle" fontSize="10" fill="#0e7490" fontWeight="600">① ClientHello: 密码套件 + 随机数</text>

      <path d="M630 300 L170 300" stroke="#0891b2" strokeWidth="2" markerEnd="url(#cnt-ns-arrow)" />
      <text x="400" y="294" textAnchor="middle" fontSize="10" fill="#0e7490" fontWeight="600">② ServerHello + 证书(公钥) + 随机数</text>

      <path d="M170 325 L630 325" stroke="#0891b2" strokeWidth="2" markerEnd="url(#cnt-ns-arrow)" />
      <text x="400" y="319" textAnchor="middle" fontSize="10" fill="#0e7490" fontWeight="600">③ 验证证书 → 密钥交换(RSA/DHE) → 派生会话密钥</text>

      <path d="M170 350 L630 350" stroke="#10b981" strokeWidth="2" markerEnd="url(#cnt-ns-arrow)" />
      <path d="M630 360 L170 360" stroke="#10b981" strokeWidth="2" markerEnd="url(#cnt-ns-arrow)" />
      <text x="400" y="345" textAnchor="middle" fontSize="10" fill="#059669" fontWeight="600">④ ChangeCipherSpec + Finished（加密验证）</text>

      {/* 防火墙与IDS */}
      <text x="200" y="395" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">防火墙与IDS</text>

      <rect x="30" y="408" width="340" height="75" rx="8" fill="url(#cnt-ns-fw)" opacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
      <text x="50" y="430" fontSize="11" fontWeight="600" fill="#991b1b">防火墙（默认拒绝原则）</text>
      <text x="50" y="448" fontSize="10" fill="#7f1d1d">无状态包过滤：查IP/端口头部</text>
      <text x="50" y="462" fontSize="10" fill="#7f1d1d">状态检测：维护连接状态表</text>
      <text x="50" y="476" fontSize="10" fill="#7f1d1d">应用层网关：深度包检测(DPI)</text>

      <rect x="430" y="408" width="340" height="75" rx="8" fill="url(#cnt-ns-pub)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="450" y="430" fontSize="11" fontWeight="600" fill="#92400e">IDS/IPS 入侵检测/防御</text>
      <text x="450" y="448" fontSize="10" fill="#78350f">基于签名：匹配已知攻击特征</text>
      <text x="450" y="462" fontSize="10" fill="#78350f">基于异常：偏离基线行为告警</text>
      <text x="450" y="476" fontSize="10" fill="#78350f">IDS旁路告警 / IPS串联阻断</text>
    </svg>
  );
}
