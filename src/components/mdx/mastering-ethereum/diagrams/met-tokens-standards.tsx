"use client";

export function MetTokensStandardsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="代币与标准：ERC20与ERC721与ERC1155对比">
      <defs>
        <linearGradient id="met-ts-eth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#627eea" />
          <stop offset="100%" stopColor="#4c53d4" />
        </linearGradient>
        <linearGradient id="met-ts-20" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="met-ts-721" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="met-ts-1155" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <marker id="met-ts-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">代币与标准（ERC）</text>

      {/* 顶部：什么是代币 */}
      <rect x="40" y="50" width="720" height="44" rx="8" fill="url(#met-ts-eth)" opacity="0.08" stroke="#627eea" strokeWidth="1.5" />
      <text x="400" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3730a3">代币 = 链上可编程资产，由智能合约实现，ERC 标准定义统一接口</text>
      <text x="400" y="86" textAnchor="middle" fontSize="10" fill="#475569">ERC = Ethereum Request for Comments，标准化让钱包/交易所/DApp 通用兼容</text>

      {/* 三大标准对比 */}
      <text x="400" y="118" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三大代币标准对比</text>

      {/* ERC-20 */}
      <rect x="40" y="132" width="230" height="220" rx="10" fill="url(#met-ts-20)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <rect x="40" y="132" width="230" height="36" rx="10" fill="url(#met-ts-20)" opacity="0.95" />
      <text x="155" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">ERC-20 同质化代币</text>
      <text x="56" y="186" fontSize="10" fontWeight="700" fill="#1e40af">核心方法</text>
      <text x="56" y="202" fontSize="9" fill="#475569">transfer(to, amount)</text>
      <text x="56" y="216" fontSize="9" fill="#475569">approve(spender, amount)</text>
      <text x="56" y="230" fontSize="9" fill="#475569">transferFrom(from, to, amt)</text>
      <text x="56" y="244" fontSize="9" fill="#475569">balanceOf(owner)</text>
      <text x="56" y="258" fontSize="9" fill="#475569">totalSupply()</text>
      <text x="56" y="280" fontSize="10" fontWeight="700" fill="#1e40af">事件</text>
      <text x="56" y="296" fontSize="9" fill="#475569">Transfer / Approval</text>
      <text x="56" y="318" fontSize="10" fontWeight="700" fill="#1e40af">特征</text>
      <text x="56" y="334" fontSize="9" fill="#475569">每个代币等价可互换</text>
      <text x="56" y="348" fontSize="9" fill="#475569">用于货币/治理/稳定币</text>

      {/* ERC-721 */}
      <rect x="285" y="132" width="230" height="220" rx="10" fill="url(#met-ts-721)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <rect x="285" y="132" width="230" height="36" rx="10" fill="url(#met-ts-721)" opacity="0.95" />
      <text x="400" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">ERC-721 非同质化</text>
      <text x="301" y="186" fontSize="10" fontWeight="700" fill="#065f46">核心方法</text>
      <text x="301" y="202" fontSize="9" fill="#475569">ownerOf(tokenId)</text>
      <text x="301" y="216" fontSize="9" fill="#475569">safeTransferFrom(...)</text>
      <text x="301" y="230" fontSize="9" fill="#475569">mint(tokenId)</text>
      <text x="301" y="244" fontSize="9" fill="#475569">tokenURI(tokenId)</text>
      <text x="301" y="258" fontSize="9" fill="#475569">approve / setApprovalForAll</text>
      <text x="301" y="280" fontSize="10" fontWeight="700" fill="#065f46">事件</text>
      <text x="301" y="296" fontSize="9" fill="#475569">Transfer / Approval</text>
      <text x="301" y="318" fontSize="10" fontWeight="700" fill="#065f46">特征</text>
      <text x="301" y="334" fontSize="9" fill="#475569">每个代币唯一不可分</text>
      <text x="301" y="348" fontSize="9" fill="#475569">用于 NFT / 收藏品 / 资产</text>

      {/* ERC-1155 */}
      <rect x="530" y="132" width="230" height="220" rx="10" fill="url(#met-ts-1155)" opacity="0.08" stroke="#ea580c" strokeWidth="1.5" />
      <rect x="530" y="132" width="230" height="36" rx="10" fill="url(#met-ts-1155)" opacity="0.95" />
      <text x="645" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">ERC-1155 多代币</text>
      <text x="546" y="186" fontSize="10" fontWeight="700" fill="#9a3412">核心方法</text>
      <text x="546" y="202" fontSize="9" fill="#475569">safeTransferFrom(...)</text>
      <text x="546" y="216" fontSize="9" fill="#475569">safeBatchTransferFrom()</text>
      <text x="546" y="230" fontSize="9" fill="#475569">balanceOf(owner, id)</text>
      <text x="546" y="244" fontSize="9" fill="#475569">balanceOfBatch(...)</text>
      <text x="546" y="258" fontSize="9" fill="#475569">uri(id)</text>
      <text x="546" y="280" fontSize="10" fontWeight="700" fill="#9a3412">事件</text>
      <text x="546" y="296" fontSize="9" fill="#475569">TransferSingle / Batch</text>
      <text x="546" y="318" fontSize="10" fontWeight="700" fill="#9a3412">特征</text>
      <text x="546" y="334" fontSize="9" fill="#475569">单合约含多类型代币</text>
      <text x="546" y="348" fontSize="9" fill="#475569">半同质化 / 批量转移</text>

      {/* 应用场景 */}
      <text x="400" y="376" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">典型应用场景</text>

      <rect x="40" y="390" width="230" height="60" rx="8" fill="url(#met-ts-20)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="410" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">ERC-20 应用</text>
      <text x="155" y="426" textAnchor="middle" fontSize="9" fill="#475569">USDT / USDC 稳定币</text>
      <text x="155" y="440" textAnchor="middle" fontSize="9" fill="#475569">UNI / COMP 治理代币</text>

      <rect x="285" y="390" width="230" height="60" rx="8" fill="url(#met-ts-721)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="410" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">ERC-721 应用</text>
      <text x="400" y="426" textAnchor="middle" fontSize="9" fill="#475569">CryptoPunks / BAYC</text>
      <text x="400" y="440" textAnchor="middle" fontSize="9" fill="#475569">链游道具 / 数字艺术品</text>

      <rect x="530" y="390" width="230" height="60" rx="8" fill="url(#met-ts-1155)" opacity="0.08" stroke="#ea580c" strokeWidth="1.5" />
      <text x="645" y="410" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9a3412">ERC-1155 应用</text>
      <text x="645" y="426" textAnchor="middle" fontSize="9" fill="#475569">游戏物品包 / 半 fungible</text>
      <text x="645" y="440" textAnchor="middle" fontSize="9" fill="#475569">批量发放凭证</text>

      {/* 底部：标准化的价值 */}
      <rect x="40" y="468" width="720" height="92" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="488" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">ERC 标准化的价值</text>
      <text x="400" y="506" textAnchor="middle" fontSize="10" fill="#475569">统一接口 → 钱包无需为每种代币单独适配</text>
      <text x="400" y="522" textAnchor="middle" fontSize="10" fill="#475569">即插即用 → DEX/借贷协议自动支持新发行的合规代币</text>
      <text x="400" y="538" textAnchor="middle" fontSize="10" fill="#475569">可组合性 → DeFi 乐高积木，代币可在协议间自由流转</text>
      <text x="400" y="554" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3730a3">标准化是以太坊生态爆发的基础设施</text>
    </svg>
  );
}
