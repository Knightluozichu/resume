"use client";

export function BpApplicationsFutureDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="应用场景与未来展望：区块链落地领域与发展趋势">
      <defs>
        <linearGradient id="bp-af-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bp-af-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bp-af-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bp-af-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bp-af-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bp-af-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">应用场景与未来展望</text>

      {/* 应用领域 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">六大核心应用领域</text>

      {/* 金融 */}
      <rect x="20" y="74" width="245" height="80" rx="10" fill="url(#bp-af-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="142" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">去中心化金融 DeFi</text>
      <text x="142" y="116" textAnchor="middle" fontSize="9" fill="#475569">去中心化交易 · 借贷</text>
      <text x="142" y="132" textAnchor="middle" fontSize="9" fill="#475569">稳定币 · 流动性挖矿</text>
      <text x="142" y="146" textAnchor="middle" fontSize="9" fill="#475569">无需银行 · 全天开放</text>

      {/* 数字资产 */}
      <rect x="277" y="74" width="245" height="80" rx="10" fill="url(#bp-af-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">数字资产 NFT</text>
      <text x="400" y="116" textAnchor="middle" fontSize="9" fill="#475569">艺术品 · 收藏品</text>
      <text x="400" y="132" textAnchor="middle" fontSize="9" fill="#475569">游戏道具 · 版权存证</text>
      <text x="400" y="146" textAnchor="middle" fontSize="9" fill="#475569">唯一确权 · 可验证</text>

      {/* 供应链 */}
      <rect x="534" y="74" width="246" height="80" rx="10" fill="url(#bp-af-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="657" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">供应链溯源</text>
      <text x="657" y="116" textAnchor="middle" fontSize="9" fill="#475569">物流追踪 · 防伪</text>
      <text x="657" y="132" textAnchor="middle" fontSize="9" fill="#475569">食品溯源 · 原产地证</text>
      <text x="657" y="146" textAnchor="middle" fontSize="9" fill="#475569">全链可查 · 不可篡改</text>

      {/* 身份认证 */}
      <rect x="20" y="164" width="245" height="80" rx="10" fill="url(#bp-af-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="142" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">数字身份 DID</text>
      <text x="142" y="206" textAnchor="middle" fontSize="9" fill="#475569">自主身份 · 隐私保护</text>
      <text x="142" y="222" textAnchor="middle" fontSize="9" fill="#475569">学历认证 · 资质凭证</text>
      <text x="142" y="236" textAnchor="middle" fontSize="9" fill="#475569">不依赖中心化机构</text>

      {/* 治理 */}
      <rect x="277" y="164" width="245" height="80" rx="10" fill="url(#bp-af-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">DAO 去中心化治理</text>
      <text x="400" y="206" textAnchor="middle" fontSize="9" fill="#475569">链上投票 · 提案治理</text>
      <text x="400" y="222" textAnchor="middle" fontSize="9" fill="#475569">国库管理 · 规则执行</text>
      <text x="400" y="236" textAnchor="middle" fontSize="9" fill="#475569">代码即章程</text>

      {/* 跨境支付 */}
      <rect x="534" y="164" width="246" height="80" rx="10" fill="url(#bp-af-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="657" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">跨境支付</text>
      <text x="657" y="206" textAnchor="middle" fontSize="9" fill="#475569">点对点转账 · 低成本</text>
      <text x="657" y="222" textAnchor="middle" fontSize="9" fill="#475569">秒级到账 · 无中间行</text>
      <text x="657" y="236" textAnchor="middle" fontSize="9" fill="#475569">全球结算网络</text>

      {/* 发展趋势 */}
      <text x="400" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">未来发展趋势</text>

      <rect x="20" y="282" width="180" height="90" rx="10" fill="url(#bp-af-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="110" y="304" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">扩容方案</text>
      <text x="110" y="322" textAnchor="middle" fontSize="9" fill="#475569">Layer2 Rollup</text>
      <text x="110" y="338" textAnchor="middle" fontSize="9" fill="#475569">分片 Sharding</text>
      <text x="110" y="354" textAnchor="middle" fontSize="9" fill="#475569">状态通道</text>
      <text x="110" y="366" textAnchor="middle" fontSize="8" fill="#475569">提升TPS降低费用</text>

      <rect x="212" y="282" width="180" height="90" rx="10" fill="url(#bp-af-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="302" y="304" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">跨链互操作</text>
      <text x="302" y="322" textAnchor="middle" fontSize="9" fill="#475569">Polkadot 平行链</text>
      <text x="302" y="338" textAnchor="middle" fontSize="9" fill="#475569">Cosmos 生态</text>
      <text x="302" y="354" textAnchor="middle" fontSize="9" fill="#475569">跨链桥</text>
      <text x="302" y="366" textAnchor="middle" fontSize="8" fill="#475569">万链互联</text>

      <rect x="404" y="282" width="180" height="90" rx="10" fill="url(#bp-af-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="494" y="304" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">隐私计算</text>
      <text x="494" y="322" textAnchor="middle" fontSize="9" fill="#475569">零知识证明 ZKP</text>
      <text x="494" y="338" textAnchor="middle" fontSize="9" fill="#475569">同态加密</text>
      <text x="494" y="354" textAnchor="middle" fontSize="9" fill="#475569">可信执行环境</text>
      <text x="494" y="366" textAnchor="middle" fontSize="8" fill="#475569">数据可用不可见</text>

      <rect x="596" y="282" width="184" height="90" rx="10" fill="url(#bp-af-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="688" y="304" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">合规与监管</text>
      <text x="688" y="322" textAnchor="middle" fontSize="9" fill="#475569">CBDC 央行数字货币</text>
      <text x="688" y="338" textAnchor="middle" fontSize="9" fill="#475569">链上分析 AML</text>
      <text x="688" y="354" textAnchor="middle" fontSize="9" fill="#475569">监管沙盒</text>
      <text x="688" y="366" textAnchor="middle" fontSize="8" fill="#475569">创新与合规平衡</text>

      {/* 挑战 */}
      <text x="400" y="398" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心挑战</text>

      <rect x="20" y="410" width="185" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="112" y="432" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">扩展性瓶颈</text>
      <text x="112" y="452" textAnchor="middle" fontSize="9" fill="#475569">TPS不足 · Gas费高</text>

      <rect x="217" y="410" width="185" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="310" y="432" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">监管不确定性</text>
      <text x="310" y="452" textAnchor="middle" fontSize="9" fill="#475569">各国政策差异大</text>

      <rect x="414" y="410" width="185" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="507" y="432" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">用户体验</text>
      <text x="507" y="452" textAnchor="middle" fontSize="9" fill="#475569">门槛高 · 私钥管理难</text>

      <rect x="611" y="410" width="169" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="695" y="432" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">能源消耗</text>
      <text x="695" y="452" textAnchor="middle" fontSize="9" fill="#475569">PoW能耗 · 碳排放</text>

      {/* 演进路径 */}
      <text x="400" y="494" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">技术演进路径</text>

      <rect x="20" y="506" width="760" height="32" rx="8" fill="url(#bp-af-green)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="400" y="526" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">区块链1.0 数字货币 → 区块链2.0 智能合约 → 区块链3.0 千行百业 → 区块链4.0 可信互联</text>

      <rect x="20" y="544" width="760" height="14" rx="6" fill="url(#bp-af-purple)" opacity="0.08" />
      <text x="400" y="555" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">核心脉络：从货币到合约到应用到万物互联，区块链重塑信任基础设施</text>
    </svg>
  );
}
