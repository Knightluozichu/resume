"use client";

export function MetSmartContractSecurityDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="智能合约安全：常见漏洞与防护机制">
      <defs>
        <linearGradient id="met-sc-vuln" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="met-sc-def" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="met-sc-eth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#627eea" />
          <stop offset="100%" stopColor="#4c53d4" />
        </linearGradient>
        <marker id="met-sc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">智能合约安全</text>

      {/* 顶部：安全原则 */}
      <rect x="40" y="50" width="720" height="40" rx="8" fill="url(#met-sc-vuln)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">铁律：合约代码不可篡改 = 漏洞不可事后修补，安全必须在部署前</text>
      <text x="400" y="84" textAnchor="middle" fontSize="10" fill="#475569">代码即法律——部署后的合约无法热修复，重入/溢出一旦被利用即造成资金损失</text>

      {/* 左侧：六大漏洞 */}
      <text x="220" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">六大常见漏洞</text>

      <rect x="40" y="124" width="360" height="56" rx="8" fill="url(#met-sc-vuln)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="56" y="146" fontSize="11" fontWeight="700" fill="#991b1b">1. 重入攻击 Reentrancy</text>
      <text x="56" y="164" fontSize="9" fill="#475569">外部调用回调本合约，状态未更新前重复提款</text>

      <rect x="40" y="186" width="360" height="56" rx="8" fill="url(#met-sc-vuln)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="56" y="208" fontSize="11" fontWeight="700" fill="#991b1b">2. 整数溢出 Overflow</text>
      <text x="56" y="226" fontSize="9" fill="#475569">算术运算超出类型范围，绕过余额检查</text>

      <rect x="40" y="248" width="360" height="56" rx="8" fill="url(#met-sc-vuln)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="56" y="270" fontSize="11" fontWeight="700" fill="#991b1b">3. 访问控制缺失</text>
      <text x="56" y="288" fontSize="9" fill="#475569">关键函数未加权限校验，任何人可调用管理接口</text>

      <rect x="40" y="310" width="360" height="56" rx="8" fill="url(#met-sc-vuln)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="56" y="332" fontSize="11" fontWeight="700" fill="#991b1b">4. 时间戳依赖</text>
      <text x="56" y="350" fontSize="9" fill="#475569">依赖 block.timestamp / 随机数，矿工可微调</text>

      <rect x="40" y="372" width="360" height="56" rx="8" fill="url(#met-sc-vuln)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="56" y="394" fontSize="11" fontWeight="700" fill="#991b1b">5. 前端运行 Front-running</text>
      <text x="56" y="412" fontSize="9" fill="#475569">内存池监控，高价插队抢跑套利交易</text>

      <rect x="40" y="434" width="360" height="56" rx="8" fill="url(#met-sc-vuln)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="56" y="456" fontSize="11" fontWeight="700" fill="#991b1b">6. Delegatecall 注入</text>
      <text x="56" y="474" fontSize="9" fill="#475569">上下文混淆，代理合约存储被覆盖</text>

      {/* 右侧：六大防护 */}
      <text x="580" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">六大防护机制</text>

      <rect x="420" y="124" width="340" height="56" rx="8" fill="url(#met-sc-def)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="436" y="146" fontSize="11" fontWeight="700" fill="#065f46">1. 检查-生效-交互模式</text>
      <text x="436" y="164" fontSize="9" fill="#475569">先校验再改状态最后外部调用，防重入</text>

      <rect x="420" y="186" width="340" height="56" rx="8" fill="url(#met-sc-def)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="436" y="208" fontSize="11" fontWeight="700" fill="#065f46">2. SafeMath / Solidity 0.8+</text>
      <text x="436" y="226" fontSize="9" fill="#475569">内置溢出检查，默认回滚溢出运算</text>

      <rect x="420" y="248" width="340" height="56" rx="8" fill="url(#met-sc-def)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="436" y="270" fontSize="11" fontWeight="700" fill="#065f46">3. 修饰符权限控制</text>
      <text x="436" y="288" fontSize="9" fill="#475569">modifier onlyOwner / 角色管理 RBAC</text>

      <rect x="420" y="310" width="340" height="56" rx="8" fill="url(#met-sc-def)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="436" y="332" fontSize="11" fontWeight="700" fill="#065f46">4. 链下逻辑 + COMMIT</text>
      <text x="436" y="350" fontSize="9" fill="#475569">避免依赖区块变量，用 commit-reveal</text>

      <rect x="420" y="372" width="340" height="56" rx="8" fill="url(#met-sc-def)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="436" y="394" fontSize="11" fontWeight="700" fill="#065f46">5. 滑点保护 + 私有池</text>
      <text x="436" y="412" fontSize="9" fill="#475569">设置最小输出量，私有交易防抢跑</text>

      <rect x="420" y="434" width="340" height="56" rx="8" fill="url(#met-sc-def)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="436" y="456" fontSize="11" fontWeight="700" fill="#065f46">6. 代理模式 + 升级</text>
      <text x="436" y="474" fontSize="9" fill="#475569">存储隔离，可升级修复（谨慎用）</text>

      {/* 底部：安全审计流程 */}
      <rect x="40" y="506" width="720" height="54" rx="8" fill="url(#met-sc-eth)" opacity="0.08" stroke="#627eea" strokeWidth="1.5" />
      <text x="400" y="526" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730a3">安全工程闭环</text>
      <text x="400" y="544" textAnchor="middle" fontSize="10" fill="#475569">单元测试 → 形式化验证 → 第三方审计 → 漏洞赏金 → 监控告警 → 应急响应</text>
    </svg>
  );
}
