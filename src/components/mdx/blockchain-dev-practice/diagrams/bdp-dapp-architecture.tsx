"use client";

export function BdpDappArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="DApp 三层架构：链上 链下 前端">
      <defs>
        <linearGradient id="bdp-da-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bdp-da-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bdp-da-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bdp-da-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bdp-da-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bdp-da-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">DApp 三层架构</text>

      {/* 前端层 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">前端层 — 用户交互</text>
      <rect x="40" y="74" width="220" height="90" rx="10" fill="url(#bdp-da-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">UI 组件</text>
      <text x="150" y="118" textAnchor="middle" fontSize="10" fill="#475569">React / Vue</text>
      <text x="150" y="136" textAnchor="middle" fontSize="10" fill="#475569">钱包连接</text>
      <text x="150" y="154" textAnchor="middle" fontSize="10" fill="#475569">交易状态展示</text>

      <rect x="290" y="74" width="220" height="90" rx="10" fill="url(#bdp-da-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">状态管理</text>
      <text x="400" y="118" textAnchor="middle" fontSize="10" fill="#475569">链上读 + 链下缓存</text>
      <text x="400" y="136" textAnchor="middle" fontSize="10" fill="#475569">乐观更新回滚</text>
      <text x="400" y="154" textAnchor="middle" fontSize="10" fill="#475569">wagmi hooks</text>

      <rect x="540" y="74" width="220" height="90" rx="10" fill="url(#bdp-da-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="650" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">签名与授权</text>
      <text x="650" y="118" textAnchor="middle" fontSize="10" fill="#475569">EIP-1193 provider</text>
      <text x="650" y="136" textAnchor="middle" fontSize="10" fill="#475569">EIP-712 结构化签名</text>
      <text x="650" y="154" textAnchor="middle" fontSize="10" fill="#475569">permit 免 gas 授权</text>

      <path d="M400 166 L400 174" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-da-arrow)" />

      {/* 链下层 */}
      <text x="400" y="194" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">链下层 — 索引与存储</text>
      <rect x="40" y="206" width="220" height="90" rx="10" fill="url(#bdp-da-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="150" y="230" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">The Graph</text>
      <text x="150" y="250" textAnchor="middle" fontSize="10" fill="#475569">子图索引事件</text>
      <text x="150" y="268" textAnchor="middle" fontSize="10" fill="#475569">GraphQL 查询</text>
      <text x="150" y="286" textAnchor="middle" fontSize="10" fill="#475569">历史数据聚合</text>

      <rect x="290" y="206" width="220" height="90" rx="10" fill="url(#bdp-da-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="230" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">IPFS / Arweave</text>
      <text x="400" y="250" textAnchor="middle" fontSize="10" fill="#475569">元数据去中心化存储</text>
      <text x="400" y="268" textAnchor="middle" fontSize="10" fill="#475569">CID 内容寻址</text>
      <text x="400" y="286" textAnchor="middle" fontSize="10" fill="#475569">链上只存哈希</text>

      <rect x="540" y="206" width="220" height="90" rx="10" fill="url(#bdp-da-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="650" y="230" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">预言机 Oracle</text>
      <text x="650" y="250" textAnchor="middle" fontSize="10" fill="#475569">Chainlink 报价</text>
      <text x="650" y="268" textAnchor="middle" fontSize="10" fill="#475569">随机数 VRF</text>
      <text x="650" y="286" textAnchor="middle" fontSize="10" fill="#475569">链外数据上链</text>

      <path d="M400 298 L400 306" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-da-arrow)" />

      {/* 链上层 */}
      <text x="400" y="326" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">链上层 — 共识与状态</text>
      <rect x="40" y="338" width="220" height="90" rx="10" fill="url(#bdp-da-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="150" y="362" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">核心合约</text>
      <text x="150" y="382" textAnchor="middle" fontSize="10" fill="#475569">业务逻辑</text>
      <text x="150" y="400" textAnchor="middle" fontSize="10" fill="#475569">资产保管</text>
      <text x="150" y="418" textAnchor="middle" fontSize="10" fill="#475569">权限控制</text>

      <rect x="290" y="338" width="220" height="90" rx="10" fill="url(#bdp-da-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="362" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">代理合约</text>
      <text x="400" y="382" textAnchor="middle" fontSize="10" fill="#475569">可升级逻辑</text>
      <text x="400" y="400" textAnchor="middle" fontSize="10" fill="#475569">存储隔离</text>
      <text x="400" y="418" textAnchor="middle" fontSize="10" fill="#475569">治理多签</text>

      <rect x="540" y="338" width="220" height="90" rx="10" fill="url(#bdp-da-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="650" y="362" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">EVM 共识</text>
      <text x="650" y="382" textAnchor="middle" fontSize="10" fill="#475569">状态根</text>
      <text x="650" y="400" textAnchor="middle" fontSize="10" fill="#475569">区块确认</text>
      <text x="650" y="418" textAnchor="middle" fontSize="10" fill="#475569">最终性</text>

      {/* 底部设计原则 */}
      <rect x="40" y="444" width="720" height="48" rx="8" fill="url(#bdp-da-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="466" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">分层原则</text>
      <text x="400" y="484" textAnchor="middle" fontSize="10" fill="#475569">链上只放必须去中心化的逻辑与资产 / 链下承担索引与存储 / 前端负责交互与乐观体验</text>

      <rect x="40" y="500" width="720" height="44" rx="8" fill="url(#bdp-da-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="522" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">关键权衡</text>
      <text x="400" y="538" textAnchor="middle" fontSize="10" fill="#475569">延迟 vs 去中心化 / Gas 成本 vs 链上数据量 / 可升级性 vs 不可篡改</text>
    </svg>
  );
}
