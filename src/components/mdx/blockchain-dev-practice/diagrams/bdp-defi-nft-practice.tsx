"use client";

export function BdpDefiNftPracticeDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="DeFi 与 NFT 实战：协议乐高与资产标准">
      <defs>
        <linearGradient id="bdp-dn-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bdp-dn-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bdp-dn-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bdp-dn-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bdp-dn-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bdp-dn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">DeFi 乐高与 NFT 标准</text>

      {/* DeFi 协议栈 */}
      <text x="200" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">DeFi 协议栈</text>

      <rect x="30" y="74" width="340" height="64" rx="8" fill="url(#bdp-dn-blue)" opacity="0.9" />
      <text x="200" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">DEX 去中心化交易所</text>
      <text x="200" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">Uniswap AMM / 恒定乘积 x*y=k</text>
      <text x="200" y="132" textAnchor="middle" fontSize="9" fill="#bfdbfe">流动性池 / 滑点 / 手续费</text>

      <rect x="30" y="146" width="340" height="64" rx="8" fill="url(#bdp-dn-purple)" opacity="0.9" />
      <text x="200" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">借贷 Lending</text>
      <text x="200" y="190" textAnchor="middle" fontSize="10" fill="#ede9fe">Aave / Compound 资金池</text>
      <text x="200" y="204" textAnchor="middle" fontSize="9" fill="#ede9fe">超额抵押 / 清算 / 利率模型</text>

      <rect x="30" y="218" width="340" height="64" rx="8" fill="url(#bdp-dn-amber)" opacity="0.9" />
      <text x="200" y="242" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">预言机 Oracle</text>
      <text x="200" y="262" textAnchor="middle" fontSize="10" fill="#fef3c7">Chainlink 报价 / TWAP</text>
      <text x="200" y="276" textAnchor="middle" fontSize="9" fill="#fef3c7">防闪电贷操纵 / 时间加权均价</text>

      <rect x="30" y="290" width="340" height="64" rx="8" fill="url(#bdp-dn-green)" opacity="0.9" />
      <text x="200" y="314" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">衍生品 Derivatives</text>
      <text x="200" y="334" textAnchor="middle" fontSize="10" fill="#d1fae5">永续合约 / 合成资产</text>
      <text x="200" y="348" textAnchor="middle" fontSize="9" fill="#d1fae5">杠杆 / 资金费率</text>

      {/* NFT 标准 */}
      <text x="600" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">NFT 资产标准</text>

      <rect x="430" y="74" width="340" height="64" rx="8" fill="url(#bdp-dn-blue)" opacity="0.9" />
      <text x="600" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">ERC-721 非同质化</text>
      <text x="600" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">唯一 tokenId / 独立资产</text>
      <text x="600" y="132" textAnchor="middle" fontSize="9" fill="#bfdbfe">艺术品 / 收藏品 / 土地</text>

      <rect x="430" y="146" width="340" height="64" rx="8" fill="url(#bdp-dn-purple)" opacity="0.9" />
      <text x="600" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">ERC-1155 多代币</text>
      <text x="600" y="190" textAnchor="middle" fontSize="10" fill="#ede9fe">同质 + 非质混合 / 批量转账</text>
      <text x="600" y="204" textAnchor="middle" fontSize="9" fill="#ede9fe">游戏道具 / 半同质化</text>

      <rect x="430" y="218" width="340" height="64" rx="8" fill="url(#bdp-dn-amber)" opacity="0.9" />
      <text x="600" y="242" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">元数据 Metadata</text>
      <text x="600" y="262" textAnchor="middle" fontSize="10" fill="#fef3c7">tokenURI / IPFS 存储 JSON</text>
      <text x="600" y="276" textAnchor="middle" fontSize="9" fill="#fef3c7">链上哈希 / 链下媒体</text>

      <rect x="430" y="290" width="340" height="64" rx="8" fill="url(#bdp-dn-green)" opacity="0.9" />
      <text x="600" y="314" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">市场 Marketplace</text>
      <text x="600" y="334" textAnchor="middle" fontSize="10" fill="#d1fae5">挂单 / 撮合 / 版税 EIP-2981</text>
      <text x="600" y="348" textAnchor="middle" fontSize="9" fill="#d1fae5">OpenSea / 自建交易协议</text>

      {/* 可组合性 */}
      <text x="400" y="382" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">乐高式可组合性</text>

      <rect x="30" y="396" width="740" height="68" rx="8" fill="url(#bdp-dn-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="418" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">Money Legos — 协议互相调用</text>
      <text x="400" y="438" textAnchor="middle" fontSize="10" fill="#475569">抵押资产入借贷池 → 借出稳定币 → 入 DEX 做市 → LP 凭证再抵押</text>
      <text x="400" y="456" textAnchor="middle" fontSize="10" fill="#475569">NFT 可作抵押品 / 可碎片化 / 可绑定 DeFi 收益策略</text>

      {/* 风险 */}
      <rect x="30" y="476" width="740" height="68" rx="8" fill="url(#bdp-dn-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="498" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">核心风险</text>
      <text x="400" y="518" textAnchor="middle" fontSize="10" fill="#475569">智能合约漏洞 / 预言机操纵 / 闪电贷攻击 / 清算风险 / 流动性枯竭</text>
      <text x="400" y="536" textAnchor="middle" fontSize="10" fill="#475569">组合越多 → 风险叠加 → 一处崩塌可引发连锁清算</text>
    </svg>
  );
}
