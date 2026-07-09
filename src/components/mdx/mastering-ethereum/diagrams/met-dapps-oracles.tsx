"use client";

export function MetDappsOraclesDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="DApp与预言机：去中心化应用架构与数据流">
      <defs>
        <linearGradient id="met-do-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id="met-do-eth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#627eea" />
          <stop offset="100%" stopColor="#4c53d4" />
        </linearGradient>
        <linearGradient id="met-do-oracle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="met-do-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="met-do-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">DApp 与预言机</text>

      {/* 上半：DApp 三层架构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">DApp 三层架构</text>

      <rect x="40" y="76" width="720" height="44" rx="8" fill="url(#met-do-app)" opacity="0.12" stroke="#ea580c" strokeWidth="1.5" />
      <text x="70" y="96" fontSize="12" fontWeight="700" fill="#9a3412">前端层</text>
      <text x="70" y="112" fontSize="9" fill="#475569">Web 前端 + ethers.js/web3.js + 钱包连接（MetaMask）</text>
      <text x="700" y="100" fontSize="9" fontWeight="600" fill="#9a3412">用户交互</text>

      <path d="M400 120 L400 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-do-arrow)" />

      <rect x="40" y="130" width="720" height="44" rx="8" fill="url(#met-do-eth)" opacity="0.12" stroke="#627eea" strokeWidth="1.5" />
      <text x="70" y="150" fontSize="12" fontWeight="700" fill="#3730a3">合约层</text>
      <text x="70" y="166" fontSize="9" fill="#475569">智能合约 + 事件日志 + ABI 接口——去中心化业务逻辑</text>
      <text x="700" y="154" fontSize="9" fontWeight="600" fill="#3730a3">链上逻辑</text>

      <path d="M400 174 L400 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-do-arrow)" />

      <rect x="40" y="184" width="720" height="44" rx="8" fill="url(#met-do-data)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="70" y="204" fontSize="12" fontWeight="700" fill="#065f46">存储/数据层</text>
      <text x="70" y="220" fontSize="9" fill="#475569">IPFS 去中心化存储 + 预言机外部数据 + 链上状态</text>
      <text x="700" y="208" fontSize="9" fontWeight="600" fill="#065f46">数据来源</text>

      {/* 中部：预言机数据流 */}
      <text x="400" y="254" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">预言机数据流（链下 → 链上）</text>

      <rect x="40" y="268" width="140" height="60" rx="8" fill="url(#met-do-data)" opacity="0.15" stroke="#059669" strokeWidth="1.5" />
      <text x="110" y="290" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">外部数据源</text>
      <text x="110" y="306" textAnchor="middle" fontSize="9" fill="#475569">API / 价格 / 天气</text>
      <text x="110" y="320" textAnchor="middle" fontSize="9" fill="#475569">链下真实世界</text>

      <path d="M182 298 L206 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-do-arrow)" />

      <rect x="210" y="268" width="140" height="60" rx="8" fill="url(#met-do-oracle)" opacity="0.15" stroke="#0891b2" strokeWidth="1.5" />
      <text x="280" y="290" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">预言机节点</text>
      <text x="280" y="306" textAnchor="middle" fontSize="9" fill="#475569">采集 + 签名</text>
      <text x="280" y="320" textAnchor="middle" fontSize="9" fill="#475569">多节点共识</text>

      <path d="M352 298 L376 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-do-arrow)" />

      <rect x="380" y="268" width="140" height="60" rx="8" fill="url(#met-do-oracle)" opacity="0.25" stroke="#0891b2" strokeWidth="1.5" />
      <text x="450" y="290" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">预言机合约</text>
      <text x="450" y="306" textAnchor="middle" fontSize="9" fill="#475569">聚合 + 验证</text>
      <text x="450" y="320" textAnchor="middle" fontSize="9" fill="#475569">写入链上</text>

      <path d="M522 298 L546 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-do-arrow)" />

      <rect x="550" y="268" width="100" height="60" rx="8" fill="url(#met-do-eth)" opacity="0.15" stroke="#627eea" strokeWidth="1.5" />
      <text x="600" y="290" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730a3">业务合约</text>
      <text x="600" y="306" textAnchor="middle" fontSize="9" fill="#475569">消费数据</text>
      <text x="600" y="320" textAnchor="middle" fontSize="9" fill="#475569">触发逻辑</text>

      <path d="M652 298 L676 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-do-arrow)" />

      <rect x="680" y="268" width="80" height="60" rx="8" fill="url(#met-do-app)" opacity="0.15" stroke="#ea580c" strokeWidth="1.5" />
      <text x="720" y="290" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9a3412">用户</text>
      <text x="720" y="306" textAnchor="middle" fontSize="9" fill="#475569">看到结果</text>

      {/* 预言机类型 */}
      <text x="400" y="354" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">预言机类型与挑战</text>

      <rect x="40" y="368" width="175" height="90" rx="8" fill="url(#met-do-oracle)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="127" y="388" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">出站预言机</text>
      <text x="55" y="408" fontSize="9" fill="#475569">链上 → 链下</text>
      <text x="55" y="424" fontSize="9" fill="#475569">触发外部支付</text>
      <text x="55" y="440" fontSize="9" fill="#475569">物联网控制</text>

      <rect x="230" y="368" width="175" height="90" rx="8" fill="url(#met-do-data)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="317" y="388" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">入站预言机</text>
      <text x="245" y="408" fontSize="9" fill="#475569">链下 → 链上</text>
      <text x="245" y="424" fontSize="9" fill="#475569">价格喂价</text>
      <text x="245" y="440" fontSize="9" fill="#475569">事件触发</text>

      <rect x="420" y="368" width="175" height="90" rx="8" fill="url(#met-do-eth)" opacity="0.08" stroke="#627eea" strokeWidth="1.5" />
      <text x="507" y="388" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730a3">去中心化预言机</text>
      <text x="435" y="408" fontSize="9" fill="#475569">多节点聚合</text>
      <text x="435" y="424" fontSize="9" fill="#475569">Chainlink 网络</text>
      <text x="435" y="440" fontSize="9" fill="#475569">抗单点故障</text>

      <rect x="610" y="368" width="150" height="90" rx="8" fill="url(#met-do-app)" opacity="0.08" stroke="#ea580c" strokeWidth="1.5" />
      <text x="685" y="388" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9a3412">核心挑战</text>
      <text x="625" y="408" fontSize="9" fill="#475569">数据真实性</text>
      <text x="625" y="424" fontSize="9" fill="#475569">延迟与成本</text>
      <text x="625" y="440" fontSize="9" fill="#475569">去中心化信任</text>

      {/* DApp 应用生态 */}
      <text x="400" y="482" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">DApp 应用生态</text>

      <rect x="40" y="496" width="720" height="64" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="110" y="520" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9a3412">DeFi</text>
      <text x="110" y="540" textAnchor="middle" fontSize="9" fill="#475569">Uniswap / Aave</text>
      <text x="285" y="520" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">NFT</text>
      <text x="285" y="540" textAnchor="middle" fontSize="9" fill="#475569">OpenSea / 游戏</text>
      <text x="460" y="520" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3730a3">DAO</text>
      <text x="460" y="540" textAnchor="middle" fontSize="9" fill="#475569">治理 / 投票</text>
      <text x="635" y="520" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">社交 / 身份</text>
      <text x="635" y="540" textAnchor="middle" fontSize="9" fill="#475569">ENS / Lens</text>
    </svg>
  );
}
