"use client";

export function MbtWalletsUsageDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="钱包与实际使用：HD钱包与助记词">
      <defs>
        <linearGradient id="mbt-wu-seed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="mbt-wu-hd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mbt-wu-addr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mbt-wu-wallet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <marker id="mbt-wu-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HD 钱包与实际使用</text>

      {/* HD 钱包推导 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">分层确定性钱包推导树</text>

      <rect x="300" y="76" width="200" height="56" rx="10" fill="url(#mbt-wu-seed)" opacity="0.12" stroke="#dc2626" strokeWidth="2" />
      <text x="400" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">种子 (Seed)</text>
      <text x="400" y="120" textAnchor="middle" fontSize="10" fill="#475569">由助记词生成，128~256 位</text>

      <path d="M400 132 L400 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-wu-arrow)" />

      <rect x="300" y="140" width="200" height="50" rx="10" fill="url(#mbt-wu-hd)" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="162" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">主密钥 (Master Key)</text>
      <text x="400" y="180" textAnchor="middle" fontSize="9" fill="#475569">HMAC-SHA512 推导</text>

      {/* 分支 */}
      <path d="M350 190 L200 220" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mbt-wu-arrow)" />
      <path d="M400 190 L400 220" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mbt-wu-arrow)" />
      <path d="M450 190 L600 220" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mbt-wu-arrow)" />

      <rect x="100" y="224" width="200" height="44" rx="8" fill="url(#mbt-wu-hd)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="200" y="244" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">m/0&apos; ( hardened )</text>
      <text x="200" y="260" textAnchor="middle" fontSize="9" fill="#64748b">账户 0</text>

      <rect x="300" y="224" width="200" height="44" rx="8" fill="url(#mbt-wu-hd)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="244" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">m/1&apos; ( hardened )</text>
      <text x="400" y="260" textAnchor="middle" fontSize="9" fill="#64748b">账户 1</text>

      <rect x="500" y="224" width="200" height="44" rx="8" fill="url(#mbt-wu-hd)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="244" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">m/2&apos; ( hardened )</text>
      <text x="600" y="260" textAnchor="middle" fontSize="9" fill="#64748b">账户 2</text>

      {/* 地址推导 */}
      <path d="M200 268 L200 290" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mbt-wu-arrow)" />

      <rect x="60" y="294" width="120" height="36" rx="6" fill="url(#mbt-wu-addr)" opacity="0.08" stroke="#059669" strokeWidth="1" />
      <text x="120" y="316" textAnchor="middle" fontSize="9" fill="#065f46">m/0&apos;/0/0</text>

      <rect x="190" y="294" width="120" height="36" rx="6" fill="url(#mbt-wu-addr)" opacity="0.08" stroke="#059669" strokeWidth="1" />
      <text x="250" y="316" textAnchor="middle" fontSize="9" fill="#065f46">m/0&apos;/0/1</text>

      <rect x="320" y="294" width="120" height="36" rx="6" fill="url(#mbt-wu-addr)" opacity="0.08" stroke="#059669" strokeWidth="1" />
      <text x="380" y="316" textAnchor="middle" fontSize="9" fill="#065f46">m/0&apos;/0/2</text>

      <text x="250" y="348" textAnchor="middle" fontSize="9" fill="#64748b">每个路径推导出一个独立地址</text>

      {/* 钱包类型对比 */}
      <text x="400" y="380" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">钱包类型对比</text>

      <rect x="30" y="394" width="240" height="64" rx="8" fill="url(#mbt-wu-wallet)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="416" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">非确定性钱包</text>
      <text x="150" y="436" textAnchor="middle" fontSize="9" fill="#475569">每把私钥独立随机生成</text>
      <text x="150" y="450" textAnchor="middle" fontSize="9" fill="#64748b">需逐个备份，不推荐使用</text>

      <rect x="286" y="394" width="240" height="64" rx="8" fill="url(#mbt-wu-hd)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="406" y="416" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">HD 钱包（推荐）</text>
      <text x="406" y="436" textAnchor="middle" fontSize="9" fill="#475569">一棵树从一个种子推导</text>
      <text x="406" y="450" textAnchor="middle" fontSize="9" fill="#64748b">只需备份助记词即可恢复全部</text>

      <rect x="542" y="394" width="228" height="64" rx="8" fill="url(#mbt-wu-addr)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="656" y="416" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">硬件钱包</text>
      <text x="656" y="436" textAnchor="middle" fontSize="9" fill="#475569">私钥隔离在专用硬件内</text>
      <text x="656" y="450" textAnchor="middle" fontSize="9" fill="#64748b">签名不暴露私钥，安全性最高</text>

      {/* 助记词流程 */}
      <text x="400" y="484" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">BIP39 助记词流程</text>

      <rect x="30" y="498" width="740" height="28" rx="8" fill="url(#mbt-wu-seed)" opacity="0.06" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="516" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">随机熵(128~256位) → 校验码 → 分组映射BIP39词表 → 12~24个助记词 → PBKDF2 → 种子 → HD主密钥</text>
    </svg>
  );
}
