"use client";

export function MbtKeysAddressesDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="密钥与地址：从随机数到比特币地址的推导流程">
      <defs>
        <linearGradient id="mbt-ka-priv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="mbt-ka-pub" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mbt-ka-addr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="mbt-ka-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">密钥与地址推导流程</text>

      {/* 第一行：私钥 → 公钥 */}
      <rect x="30" y="60" width="200" height="80" rx="10" fill="url(#mbt-ka-priv)" opacity="0.12" stroke="#dc2626" strokeWidth="2" />
      <text x="130" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">1. 私钥 (k)</text>
      <text x="130" y="104" textAnchor="middle" fontSize="10" fill="#475569">256 位随机数</text>
      <text x="130" y="122" textAnchor="middle" fontSize="9" fill="#64748b">范围：1 ~ n-1</text>

      <path d="M234 100 L268 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-ka-arrow)" />
      <text x="251" y="92" textAnchor="middle" fontSize="9" fill="#64748b">ECDSA</text>

      <rect x="272" y="60" width="220" height="80" rx="10" fill="url(#mbt-ka-pub)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="382" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">2. 公钥 (K)</text>
      <text x="382" y="104" textAnchor="middle" fontSize="10" fill="#475569">K = k × G</text>
      <text x="382" y="122" textAnchor="middle" fontSize="9" fill="#64748b">secp256k1 椭圆曲线乘法</text>

      <path d="M494 100 L528 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-ka-arrow)" />
      <text x="511" y="92" textAnchor="middle" fontSize="9" fill="#64748b">SHA256</text>
      <text x="511" y="113" textAnchor="middle" fontSize="9" fill="#64748b">+ RIPEMD160</text>

      <rect x="532" y="60" width="240" height="80" rx="10" fill="url(#mbt-ka-addr)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <text x="652" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">3. 公钥哈希</text>
      <text x="652" y="104" textAnchor="middle" fontSize="10" fill="#475569">RIPEMD160(SHA256(K))</text>
      <text x="652" y="122" textAnchor="middle" fontSize="9" fill="#64748b">20 字节指纹</text>

      {/* 第二行：地址编码 */}
      <path d="M652 142 L652 166" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-ka-arrow)" />

      <rect x="420" y="170" width="352" height="70" rx="10" fill="url(#mbt-ka-addr)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="596" y="194" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">4. Base58Check 编码</text>
      <text x="596" y="214" textAnchor="middle" fontSize="10" fill="#475569">版本前缀 + 公钥哈希 + 校验码</text>
      <text x="596" y="230" textAnchor="middle" fontSize="9" fill="#64748b">双 SHA256 取前 4 字节作校验</text>

      <path d="M420 205 L386 205" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-ka-arrow)" />

      <rect x="120" y="170" width="260" height="70" rx="10" fill="url(#mbt-ka-addr)" opacity="0.15" stroke="#059669" strokeWidth="2" />
      <text x="250" y="194" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">5. 比特币地址</text>
      <text x="250" y="214" textAnchor="middle" fontSize="10" fill="#475569">1 开头（P2PKH）</text>
      <text x="250" y="230" textAnchor="middle" fontSize="9" fill="#64748b">如：1A1zP1eP5QGefi2DMPTfTL</text>

      {/* 地址类型对比 */}
      <text x="400" y="272" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">常见地址类型对比</text>

      <rect x="30" y="286" width="240" height="100" rx="8" fill="url(#mbt-ka-addr)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="150" y="308" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">P2PKH 地址</text>
      <text x="150" y="328" textAnchor="middle" fontSize="10" fill="#475569">前缀：1</text>
      <text x="150" y="346" textAnchor="middle" fontSize="10" fill="#475569">版本字节：0x00</text>
      <text x="150" y="364" textAnchor="middle" fontSize="9" fill="#64748b">传统地址，Base58Check</text>

      <rect x="286" y="286" width="240" height="100" rx="8" fill="url(#mbt-ka-pub)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="406" y="308" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">P2SH 地址</text>
      <text x="406" y="328" textAnchor="middle" fontSize="10" fill="#475569">前缀：3</text>
      <text x="406" y="346" textAnchor="middle" fontSize="10" fill="#475569">版本字节：0x05</text>
      <text x="406" y="364" textAnchor="middle" fontSize="9" fill="#64748b">多签 / 脚本哈希</text>

      <rect x="542" y="286" width="240" height="100" rx="8" fill="url(#mbt-ka-priv)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="662" y="308" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">Bech32 地址</text>
      <text x="662" y="328" textAnchor="middle" fontSize="10" fill="#475569">前缀：bc1</text>
      <text x="662" y="346" textAnchor="middle" fontSize="10" fill="#475569">编码：Bech32</text>
      <text x="662" y="364" textAnchor="middle" fontSize="9" fill="#64748b">隔离见证原生地址</text>

      {/* 安全要点 */}
      <text x="400" y="414" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">密钥安全要点</text>

      <rect x="30" y="428" width="240" height="56" rx="8" fill="url(#mbt-ka-priv)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="150" y="450" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">单向推导</text>
      <text x="150" y="470" textAnchor="middle" fontSize="10" fill="#475569">私钥可推公钥，反向不可</text>

      <rect x="286" y="428" width="240" height="56" rx="8" fill="url(#mbt-ka-priv)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="406" y="450" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">离线生成</text>
      <text x="406" y="470" textAnchor="middle" fontSize="10" fill="#475569">私钥可在离线环境安全生成</text>

      <rect x="542" y="428" width="240" height="56" rx="8" fill="url(#mbt-ka-priv)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="662" y="450" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">不可泄露</text>
      <text x="662" y="470" textAnchor="middle" fontSize="10" fill="#475569">私钥泄露 = 资产完全失控</text>

      {/* 底部总结 */}
      <rect x="30" y="500" width="740" height="28" rx="8" fill="url(#mbt-ka-pub)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="518" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">核心链路：随机数 → 私钥 k → 椭圆曲线乘法 → 公钥 K → 哈希 → Base58Check → 比特币地址</text>
    </svg>
  );
}
