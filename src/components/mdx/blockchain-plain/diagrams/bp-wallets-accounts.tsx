"use client";

export function BpWalletsAccountsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="钱包与账户体系：密钥派生、地址生成与钱包类型">
      <defs>
        <linearGradient id="bp-wa-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bp-wa-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bp-wa-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bp-wa-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bp-wa-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">钱包与账户体系：密钥管理与地址派生</text>

      {/* 密钥派生链路 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">密钥派生与地址生成</text>

      <rect x="20" y="74" width="140" height="50" rx="8" fill="url(#bp-wa-purple)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">助记词</text>
      <text x="90" y="112" textAnchor="middle" fontSize="9" fill="#ede9fe">12/24个英文单词</text>

      <path d="M162 99 L188 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-wa-arrow)" />

      <rect x="190" y="74" width="140" height="50" rx="8" fill="url(#bp-wa-blue)" opacity="0.9" />
      <text x="260" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">种子 Seed</text>
      <text x="260" y="112" textAnchor="middle" fontSize="9" fill="#bfdbfe">PBKDF2 派生</text>

      <path d="M332 99 L358 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-wa-arrow)" />

      <rect x="360" y="74" width="140" height="50" rx="8" fill="url(#bp-wa-amber)" opacity="0.9" />
      <text x="430" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">主私钥</text>
      <text x="430" y="112" textAnchor="middle" fontSize="9" fill="#fef3c7">BIP32 层级派生</text>

      <path d="M502 99 L528 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-wa-arrow)" />

      <rect x="530" y="74" width="110" height="50" rx="8" fill="url(#bp-wa-green)" opacity="0.9" />
      <text x="585" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">子私钥</text>
      <text x="585" y="112" textAnchor="middle" fontSize="9" fill="#d1fae5">BIP44路径</text>

      <path d="M642 99 L668 99" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-wa-arrow)" />

      <rect x="670" y="74" width="110" height="50" rx="8" fill="url(#bp-wa-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="725" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">公钥+地址</text>
      <text x="725" y="112" textAnchor="middle" fontSize="9" fill="#475569">哈希派生</text>

      {/* 地址生成详细 */}
      <rect x="20" y="138" width="760" height="60" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="160" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">地址生成链路</text>
      <text x="400" y="180" textAnchor="middle" fontSize="9" fill="#475569">私钥 → 椭圆曲线乘法生成公钥 → SHA-256+RIPEMD-160 哈希 → 加版本前缀 → Base58Check 编码 → 区块链地址</text>

      {/* HD钱包层级 */}
      <text x="200" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">HD 钱包层级结构</text>

      <rect x="20" y="234" width="380" height="180" rx="10" fill="url(#bp-wa-purple)" opacity="0.06" stroke="#7c3aed" strokeWidth="1.5" />

      <rect x="140" y="246" width="140" height="30" rx="6" fill="url(#bp-wa-purple)" opacity="0.9" />
      <text x="210" y="266" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">主密钥 m</text>

      <line x1="210" y1="276" x2="100" y2="296" stroke="#64748b" strokeWidth="1.5" />
      <line x1="210" y1="276" x2="320" y2="296" stroke="#64748b" strokeWidth="1.5" />

      <rect x="40" y="296" width="120" height="28" rx="6" fill="url(#bp-wa-blue)" opacity="0.2" stroke="#2563eb" strokeWidth="1" />
      <text x="100" y="314" textAnchor="middle" fontSize="9" fill="#1e40af">m/0/0 账户0</text>

      <rect x="260" y="296" width="120" height="28" rx="6" fill="url(#bp-wa-blue)" opacity="0.2" stroke="#2563eb" strokeWidth="1" />
      <text x="320" y="314" textAnchor="middle" fontSize="9" fill="#1e40af">m/0/1 账户1</text>

      <line x1="100" y1="324" x2="100" y2="340" stroke="#64748b" strokeWidth="1" />
      <line x1="320" y1="324" x2="320" y2="340" stroke="#64748b" strokeWidth="1" />

      <rect x="40" y="340" width="120" height="24" rx="6" fill="url(#bp-wa-amber)" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="100" y="356" textAnchor="middle" fontSize="8" fill="#92400e">m/0/0/0 外部</text>

      <rect x="40" y="370" width="120" height="24" rx="6" fill="url(#bp-wa-green)" opacity="0.15" stroke="#059669" strokeWidth="1" />
      <text x="100" y="386" textAnchor="middle" fontSize="8" fill="#065f46">m/0/0/1 找零</text>

      <rect x="260" y="340" width="120" height="24" rx="6" fill="url(#bp-wa-amber)" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="320" y="356" textAnchor="middle" fontSize="8" fill="#92400e">m/0/1/0 外部</text>

      <rect x="260" y="370" width="120" height="24" rx="6" fill="url(#bp-wa-green)" opacity="0.15" stroke="#059669" strokeWidth="1" />
      <text x="320" y="386" textAnchor="middle" fontSize="8" fill="#065f46">m/0/1/1 找零</text>

      <text x="210" y="408" textAnchor="middle" fontSize="9" fill="#475569">一棵树管理无限地址，只需备份助记词</text>

      {/* 钱包类型 */}
      <text x="580" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">钱包类型对比</text>

      <rect x="420" y="234" width="360" height="180" rx="10" fill="url(#bp-wa-amber)" opacity="0.06" stroke="#f59e0b" strokeWidth="1.5" />

      <rect x="440" y="246" width="150" height="50" rx="8" fill="url(#bp-wa-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="515" y="266" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">冷钱包</text>
      <text x="515" y="282" textAnchor="middle" fontSize="8" fill="#475569">离线存储 · 安全性高</text>

      <rect x="610" y="246" width="150" height="50" rx="8" fill="url(#bp-wa-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="685" y="266" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">热钱包</text>
      <text x="685" y="282" textAnchor="middle" fontSize="8" fill="#475569">联网使用 · 便捷高效</text>

      <rect x="440" y="306" width="150" height="50" rx="8" fill="url(#bp-wa-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="515" y="326" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">硬件钱包</text>
      <text x="515" y="342" textAnchor="middle" fontSize="8" fill="#475569">专用设备 · 物理隔离</text>

      <rect x="610" y="306" width="150" height="50" rx="8" fill="url(#bp-wa-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="326" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">纸钱包</text>
      <text x="685" y="342" textAnchor="middle" fontSize="8" fill="#475569">打印私钥 · 极度离线</text>

      <rect x="440" y="366" width="320" height="36" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="600" y="382" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">核心安全原则</text>
      <text x="600" y="396" textAnchor="middle" fontSize="8" fill="#475569">私钥永不泄露 · 助记词离线备份 · 大额用冷钱包</text>

      {/* 账户模型对比 */}
      <text x="400" y="438" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">账户模型对比</text>

      <rect x="20" y="450" width="370" height="56" rx="10" fill="url(#bp-wa-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="205" y="470" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">UTXO 模型（比特币）</text>
      <text x="205" y="488" textAnchor="middle" fontSize="9" fill="#475569">未花费交易输出 · 输入花费旧UTXO输出创建新UTXO</text>
      <text x="205" y="500" textAnchor="middle" fontSize="9" fill="#475569">天然防双花 · 并行验证 · 隐私性好</text>

      <rect x="410" y="450" width="370" height="56" rx="10" fill="url(#bp-wa-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="595" y="470" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">账户模型（以太坊）</text>
      <text x="595" y="488" textAnchor="middle" fontSize="9" fill="#475569">全局状态树记录余额 · 类似银行账户直接加减</text>
      <text x="595" y="500" textAnchor="middle" fontSize="9" fill="#475569">合约友好 · 状态清晰 · 串行执行</text>

      {/* 底部总结 */}
      <rect x="20" y="518" width="760" height="30" rx="8" fill="url(#bp-wa-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="538" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：助记词 → 种子 → 私钥 → 公钥 → 地址 → 钱包管理密钥与签名交易</text>
    </svg>
  );
}
