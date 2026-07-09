"use client";

export function BpCryptographyDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="密码学基础：哈希函数、非对称加密与数字签名">
      <defs>
        <linearGradient id="bp-cp-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bp-cp-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bp-cp-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bp-cp-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bp-cp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">密码学基础：哈希、加密与签名</text>

      {/* 哈希函数 */}
      <text x="200" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">哈希函数</text>

      <rect x="40" y="74" width="120" height="50" rx="8" fill="url(#bp-cp-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="100" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">输入数据</text>
      <text x="100" y="112" textAnchor="middle" fontSize="9" fill="#475569">任意长度</text>

      <path d="M162 99 L188 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-cp-arrow)" />

      <rect x="190" y="74" width="100" height="50" rx="8" fill="url(#bp-cp-purple)" opacity="0.9" />
      <text x="240" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">SHA-256</text>
      <text x="240" y="112" textAnchor="middle" fontSize="9" fill="#ede9fe">哈希算法</text>

      <path d="M292 99 L318 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-cp-arrow)" />

      <rect x="320" y="74" width="120" height="50" rx="8" fill="url(#bp-cp-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="380" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">哈希值</text>
      <text x="380" y="112" textAnchor="middle" fontSize="9" fill="#475569">固定256位</text>

      {/* 哈希特性 */}
      <rect x="40" y="138" width="400" height="56" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="240" y="158" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">哈希四大特性</text>
      <text x="240" y="176" textAnchor="middle" fontSize="9" fill="#475569">单向不可逆 · 雪崩效应（改1位全变）· 抗碰撞 · 确定性</text>

      {/* 非对称加密 */}
      <text x="600" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">非对称加密</text>

      <rect x="470" y="74" width="100" height="50" rx="8" fill="url(#bp-cp-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="520" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">公钥</text>
      <text x="520" y="112" textAnchor="middle" fontSize="9" fill="#475569">公开分发</text>

      <path d="M572 99 L598 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-cp-arrow)" />

      <rect x="600" y="74" width="100" height="50" rx="8" fill="url(#bp-cp-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="650" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">加密</text>
      <text x="650" y="112" textAnchor="middle" fontSize="9" fill="#475569">公钥加密</text>

      <path d="M702 99 L728 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-cp-arrow)" />

      <rect x="730" y="74" width="50" height="50" rx="8" fill="url(#bp-cp-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="755" y="96" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">私钥</text>
      <text x="755" y="112" textAnchor="middle" fontSize="8" fill="#475569">解密</text>

      <rect x="470" y="138" width="310" height="56" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="625" y="158" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">公钥加密、私钥解密</text>
      <text x="625" y="176" textAnchor="middle" fontSize="9" fill="#475569">公钥公开用于加密验签 · 私钥保密用于解密签名</text>

      {/* 数字签名流程 */}
      <text x="400" y="222" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数字签名流程</text>

      {/* 发送方 */}
      <rect x="20" y="236" width="180" height="170" rx="10" fill="url(#bp-cp-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="110" y="258" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">发送方（签名）</text>

      <rect x="40" y="270" width="140" height="34" rx="6" fill="#fff" stroke="#059669" strokeWidth="1" />
      <text x="110" y="291" textAnchor="middle" fontSize="9" fill="#475569">原始消息</text>

      <path d="M110 304 L110 310" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bp-cp-arrow)" />

      <rect x="40" y="312" width="140" height="34" rx="6" fill="url(#bp-cp-blue)" opacity="0.15" stroke="#2563eb" strokeWidth="1" />
      <text x="110" y="333" textAnchor="middle" fontSize="9" fill="#475569">哈希运算 → 摘要</text>

      <path d="M110 346 L110 352" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bp-cp-arrow)" />

      <rect x="40" y="354" width="140" height="34" rx="6" fill="url(#bp-cp-purple)" opacity="0.15" stroke="#7c3aed" strokeWidth="1" />
      <text x="110" y="375" textAnchor="middle" fontSize="9" fill="#475569">私钥加密摘要 → 签名</text>

      {/* 传输 */}
      <path d="M202 321 L308 321" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-cp-arrow)" />
      <text x="255" y="312" textAnchor="middle" fontSize="9" fill="#475569">消息+签名</text>

      {/* 接收方 */}
      <rect x="310" y="236" width="250" height="170" rx="10" fill="url(#bp-cp-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="435" y="258" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">接收方（验签）</text>

      <rect x="330" y="270" width="210" height="34" rx="6" fill="#fff" stroke="#f59e0b" strokeWidth="1" />
      <text x="435" y="291" textAnchor="middle" fontSize="9" fill="#475569">收到消息+签名</text>

      <path d="M435 304 L435 310" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bp-cp-arrow)" />

      <rect x="330" y="312" width="100" height="34" rx="6" fill="url(#bp-cp-blue)" opacity="0.15" stroke="#2563eb" strokeWidth="1" />
      <text x="380" y="333" textAnchor="middle" fontSize="8" fill="#475569">消息哈希 → H1</text>

      <rect x="440" y="312" width="100" height="34" rx="6" fill="url(#bp-cp-purple)" opacity="0.15" stroke="#7c3aed" strokeWidth="1" />
      <text x="490" y="333" textAnchor="middle" fontSize="8" fill="#475569">公钥解签 → H2</text>

      <path d="M380 346 L380 352" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bp-cp-arrow)" />
      <path d="M490 346 L490 352" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bp-cp-arrow)" />

      <rect x="330" y="354" width="210" height="34" rx="6" fill="url(#bp-cp-green)" opacity="0.15" stroke="#059669" strokeWidth="1" />
      <text x="435" y="375" textAnchor="middle" fontSize="9" fill="#475569">比较 H1 与 H2 → 一致则有效</text>

      {/* 密钥关系 */}
      <rect x="580" y="236" width="200" height="170" rx="10" fill="url(#bp-cp-purple)" opacity="0.06" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="680" y="258" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">密钥对关系</text>

      <rect x="600" y="270" width="160" height="34" rx="6" fill="url(#bp-cp-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="680" y="291" textAnchor="middle" fontSize="9" fill="#475569">私钥 → 生成公钥</text>

      <rect x="600" y="312" width="160" height="34" rx="6" fill="url(#bp-cp-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1" />
      <text x="680" y="333" textAnchor="middle" fontSize="9" fill="#475569">公钥 → 生成地址</text>

      <rect x="600" y="354" width="160" height="34" rx="6" fill="url(#bp-cp-green)" opacity="0.12" stroke="#059669" strokeWidth="1" />
      <text x="680" y="375" textAnchor="middle" fontSize="9" fill="#475569">私钥签名 · 公钥验签</text>

      {/* 底部总结 */}
      <rect x="20" y="422" width="760" height="32" rx="8" fill="url(#bp-cp-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="2" />
      <text x="400" y="442" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">哈希保证完整性 · 非对称加密保证保密性 · 数字签名保证真实性与不可否认性</text>

      <rect x="20" y="460" width="760" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="480" textAnchor="middle" fontSize="10" fill="#475569">区块链应用：区块哈希防篡改 · 私钥签名授权交易 · 公钥派生地址 · Merkle 树聚合交易</text>

      <rect x="20" y="498" width="760" height="28" rx="8" fill="url(#bp-cp-purple)" opacity="0.06" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="516" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">核心脉络：哈希 → 非对称加密 → 数字签名 → 区块链信任基石</text>
    </svg>
  );
}
