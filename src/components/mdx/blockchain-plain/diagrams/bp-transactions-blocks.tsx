"use client";

export function BpTransactionsBlocksDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="交易与区块：交易结构、Merkle树与区块组成">
      <defs>
        <linearGradient id="bp-tb-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bp-tb-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bp-tb-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bp-tb-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bp-tb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">交易与区块：数据结构与生命周期</text>

      {/* 交易结构 */}
      <text x="200" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">交易结构</text>

      <rect x="20" y="74" width="380" height="180" rx="10" fill="url(#bp-tb-blue)" opacity="0.06" stroke="#2563eb" strokeWidth="1.5" />

      <rect x="40" y="88" width="340" height="30" rx="6" fill="url(#bp-tb-blue)" opacity="0.15" stroke="#2563eb" strokeWidth="1" />
      <text x="210" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">交易输入 Inputs（引用之前的UTXO）</text>

      <rect x="40" y="124" width="340" height="30" rx="6" fill="url(#bp-tb-purple)" opacity="0.15" stroke="#7c3aed" strokeWidth="1" />
      <text x="210" y="144" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">交易输出 Outputs（指定接收地址与金额）</text>

      <rect x="40" y="160" width="340" height="30" rx="6" fill="url(#bp-tb-amber)" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="210" y="180" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">数字签名（私钥签名证明授权）</text>

      <rect x="40" y="196" width="340" height="30" rx="6" fill="url(#bp-tb-green)" opacity="0.15" stroke="#059669" strokeWidth="1" />
      <text x="210" y="216" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">手续费（矿工打包激励）</text>

      <text x="210" y="244" textAnchor="middle" fontSize="9" fill="#475569">UTXO模型：输入花费旧UTXO，输出创建新UTXO</text>

      {/* 交易生命周期 */}
      <text x="620" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">交易生命周期</text>

      <rect x="420" y="74" width="360" height="180" rx="10" fill="url(#bp-tb-purple)" opacity="0.06" stroke="#7c3aed" strokeWidth="1.5" />

      <rect x="440" y="88" width="160" height="28" rx="6" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="520" y="107" textAnchor="middle" fontSize="9" fill="#475569">1. 创建交易并签名</text>

      <path d="M520 116 L520 122" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bp-tb-arrow)" />

      <rect x="440" y="124" width="160" height="28" rx="6" fill="url(#bp-tb-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="520" y="143" textAnchor="middle" fontSize="9" fill="#475569">2. 广播至P2P网络</text>

      <path d="M520 152 L520 158" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bp-tb-arrow)" />

      <rect x="440" y="160" width="160" height="28" rx="6" fill="url(#bp-tb-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1" />
      <text x="520" y="179" textAnchor="middle" fontSize="9" fill="#475569">3. 节点验证交易</text>

      <path d="M520 188 L520 194" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bp-tb-arrow)" />

      <rect x="440" y="196" width="160" height="28" rx="6" fill="url(#bp-tb-green)" opacity="0.12" stroke="#059669" strokeWidth="1" />
      <text x="520" y="215" textAnchor="middle" fontSize="9" fill="#475569">4. 矿工打包入区块</text>

      <path d="M520 224 L520 230" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bp-tb-arrow)" />

      <rect x="440" y="232" width="160" height="18" rx="6" fill="url(#bp-tb-purple)" opacity="0.2" stroke="#7c3aed" strokeWidth="1" />
      <text x="520" y="246" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">5. 上链确认</text>

      <rect x="620" y="88" width="140" height="162" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="690" y="108" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">验证内容</text>
      <text x="690" y="126" textAnchor="middle" fontSize="8" fill="#475569">签名有效</text>
      <text x="690" y="142" textAnchor="middle" fontSize="8" fill="#475569">UTXO未花费</text>
      <text x="690" y="158" textAnchor="middle" fontSize="8" fill="#475569">金额非负</text>
      <text x="690" y="174" textAnchor="middle" fontSize="8" fill="#475569">输入大于输出</text>
      <text x="690" y="190" textAnchor="middle" fontSize="8" fill="#475569">无双花</text>
      <text x="690" y="214" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">双花问题</text>
      <text x="690" y="230" textAnchor="middle" fontSize="8" fill="#475569">同一笔钱花两次</text>
      <text x="690" y="244" textAnchor="middle" fontSize="8" fill="#475569">由共识+UTXO防</text>

      {/* 区块结构 */}
      <text x="400" y="280" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">区块结构与 Merkle 树</text>

      <rect x="20" y="292" width="220" height="200" rx="10" fill="url(#bp-tb-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">区块结构</text>

      <rect x="40" y="322" width="180" height="24" rx="4" fill="url(#bp-tb-blue)" opacity="0.2" stroke="#2563eb" strokeWidth="1" />
      <text x="130" y="339" textAnchor="middle" fontSize="8" fill="#475569">版本号</text>

      <rect x="40" y="350" width="180" height="24" rx="4" fill="url(#bp-tb-blue)" opacity="0.2" stroke="#2563eb" strokeWidth="1" />
      <text x="130" y="367" textAnchor="middle" fontSize="8" fill="#475569">前区块哈希</text>

      <rect x="40" y="378" width="180" height="24" rx="4" fill="url(#bp-tb-amber)" opacity="0.2" stroke="#f59e0b" strokeWidth="1" />
      <text x="130" y="395" textAnchor="middle" fontSize="8" fill="#475569">Merkle根</text>

      <rect x="40" y="406" width="180" height="24" rx="4" fill="url(#bp-tb-blue)" opacity="0.2" stroke="#2563eb" strokeWidth="1" />
      <text x="130" y="423" textAnchor="middle" fontSize="8" fill="#475569">时间戳 + 难度目标</text>

      <rect x="40" y="434" width="180" height="24" rx="4" fill="url(#bp-tb-blue)" opacity="0.2" stroke="#2563eb" strokeWidth="1" />
      <text x="130" y="451" textAnchor="middle" fontSize="8" fill="#475569">Nonce 随机数</text>

      <rect x="40" y="464" width="180" height="20" rx="4" fill="url(#bp-tb-green)" opacity="0.15" stroke="#059669" strokeWidth="1" />
      <text x="130" y="478" textAnchor="middle" fontSize="8" fontWeight="600" fill="#065f46">交易列表（区块体）</text>

      {/* Merkle树 */}
      <rect x="260" y="292" width="520" height="200" rx="10" fill="url(#bp-tb-amber)" opacity="0.06" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="520" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Merkle 树（交易聚合哈希）</text>

      {/* 根节点 */}
      <rect x="470" y="324" width="100" height="28" rx="6" fill="url(#bp-tb-amber)" opacity="0.9" />
      <text x="520" y="343" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Merkle Root</text>

      <line x1="500" y1="352" x2="370" y2="372" stroke="#64748b" strokeWidth="1.5" />
      <line x1="540" y1="352" x2="670" y2="372" stroke="#64748b" strokeWidth="1.5" />

      {/* 中间层 */}
      <rect x="330" y="372" width="80" height="26" rx="6" fill="url(#bp-tb-amber)" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="370" y="389" textAnchor="middle" fontSize="8" fill="#475569">Hash AB</text>

      <rect x="630" y="372" width="80" height="26" rx="6" fill="url(#bp-tb-amber)" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="670" y="389" textAnchor="middle" fontSize="8" fill="#475569">Hash CD</text>

      <line x1="350" y1="398" x2="310" y2="418" stroke="#64748b" strokeWidth="1.5" />
      <line x1="390" y1="398" x2="420" y2="418" stroke="#64748b" strokeWidth="1.5" />
      <line x1="650" y1="398" x2="620" y2="418" stroke="#64748b" strokeWidth="1.5" />
      <line x1="690" y1="398" x2="730" y2="418" stroke="#64748b" strokeWidth="1.5" />

      {/* 叶子节点 */}
      <rect x="280" y="418" width="60" height="26" rx="6" fill="url(#bp-tb-green)" opacity="0.15" stroke="#059669" strokeWidth="1" />
      <text x="310" y="435" textAnchor="middle" fontSize="8" fill="#475569">Tx A</text>

      <rect x="390" y="418" width="60" height="26" rx="6" fill="url(#bp-tb-green)" opacity="0.15" stroke="#059669" strokeWidth="1" />
      <text x="420" y="435" textAnchor="middle" fontSize="8" fill="#475569">Tx B</text>

      <rect x="590" y="418" width="60" height="26" rx="6" fill="url(#bp-tb-green)" opacity="0.15" stroke="#059669" strokeWidth="1" />
      <text x="620" y="435" textAnchor="middle" fontSize="8" fill="#475569">Tx C</text>

      <rect x="700" y="418" width="60" height="26" rx="6" fill="url(#bp-tb-green)" opacity="0.15" stroke="#059669" strokeWidth="1" />
      <text x="730" y="435" textAnchor="middle" fontSize="8" fill="#475569">Tx D</text>

      <text x="520" y="468" textAnchor="middle" fontSize="9" fill="#475569">两两哈希向上聚合 → 根哈希入区块头</text>
      <text x="520" y="484" textAnchor="middle" fontSize="9" fill="#475569">SPV轻节点只需 Merkle 路径即可验证交易，无需全量数据</text>

      {/* 底部总结 */}
      <rect x="20" y="504" width="760" height="28" rx="8" fill="url(#bp-tb-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="2" />
      <text x="400" y="522" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">核心脉络：交易签名授权 → 广播验证 → 打包入区块 → Merkle树聚合 → 上链确认防双花</text>

      <rect x="20" y="538" width="760" height="16" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="550" textAnchor="middle" fontSize="9" fill="#475569">区块头含前哈希+Merkle根+Nonce → 链式绑定+交易聚合+共识谜题三位一体</text>
    </svg>
  );
}
