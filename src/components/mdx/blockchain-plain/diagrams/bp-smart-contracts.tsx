"use client";

export function BpSmartContractsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="智能合约：部署、执行与自动化流程">
      <defs>
        <linearGradient id="bp-sc-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bp-sc-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bp-sc-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bp-sc-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bp-sc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">智能合约：自动化执行</text>

      {/* 什么是智能合约 */}
      <rect x="20" y="50" width="760" height="40" rx="8" fill="url(#bp-sc-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="74" textAnchor="middle" fontSize="11" fill="#475569">智能合约 = 部署在区块链上的程序，条件触发自动执行，无需第三方中介</text>

      {/* 部署流程 */}
      <text x="400" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">合约部署流程</text>

      <rect x="20" y="126" width="140" height="56" rx="8" fill="url(#bp-sc-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="90" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">编写合约</text>
      <text x="90" y="166" textAnchor="middle" fontSize="9" fill="#475569">Solidity/Rust</text>

      <path d="M162 154 L186 154" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-sc-arrow)" />

      <rect x="190" y="126" width="140" height="56" rx="8" fill="url(#bp-sc-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="260" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">编译</text>
      <text x="260" y="166" textAnchor="middle" fontSize="9" fill="#475569">编译为字节码</text>

      <path d="M332 154 L356 154" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-sc-arrow)" />

      <rect x="360" y="126" width="140" height="56" rx="8" fill="url(#bp-sc-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="430" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">部署交易</text>
      <text x="430" y="166" textAnchor="middle" fontSize="9" fill="#475569">广播上链</text>

      <path d="M502 154 L526 154" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-sc-arrow)" />

      <rect x="530" y="126" width="140" height="56" rx="8" fill="url(#bp-sc-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="600" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">获得地址</text>
      <text x="600" y="166" textAnchor="middle" fontSize="9" fill="#475569">合约上链运行</text>

      <path d="M672 154 L696 154" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-sc-arrow)" />

      <rect x="700" y="138" width="80" height="32" rx="6" fill="url(#bp-sc-blue)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="740" y="158" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">链上存储</text>

      {/* 执行流程 */}
      <text x="400" y="210" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">合约执行流程（条件触发）</text>

      {/* 触发条件 */}
      <rect x="20" y="222" width="160" height="130" rx="10" fill="url(#bp-sc-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="100" y="244" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">触发条件</text>
      <rect x="40" y="256" width="120" height="24" rx="4" fill="#fff" stroke="#f59e0b" strokeWidth="1" />
      <text x="100" y="272" textAnchor="middle" fontSize="8" fill="#475569">用户调用合约</text>
      <rect x="40" y="284" width="120" height="24" rx="4" fill="#fff" stroke="#f59e0b" strokeWidth="1" />
      <text x="100" y="300" textAnchor="middle" fontSize="8" fill="#475569">另一合约调用</text>
      <rect x="40" y="312" width="120" height="24" rx="4" fill="#fff" stroke="#f59e0b" strokeWidth="1" />
      <text x="100" y="328" textAnchor="middle" fontSize="8" fill="#475569">链上事件触发</text>

      <path d="M182 287 L208 287" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-sc-arrow)" />

      {/* EVM执行 */}
      <rect x="210" y="222" width="180" height="130" rx="10" fill="url(#bp-sc-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="300" y="244" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">EVM 虚拟机执行</text>
      <rect x="230" y="256" width="140" height="24" rx="4" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="300" y="272" textAnchor="middle" fontSize="8" fill="#475569">读取合约状态</text>
      <rect x="230" y="284" width="140" height="24" rx="4" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="300" y="300" textAnchor="middle" fontSize="8" fill="#475569">执行业务逻辑</text>
      <rect x="230" y="312" width="140" height="24" rx="4" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="300" y="328" textAnchor="middle" fontSize="8" fill="#475569">消耗 Gas 费用</text>

      <path d="M392 287 L418 287" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-sc-arrow)" />

      {/* 状态变更 */}
      <rect x="420" y="222" width="160" height="130" rx="10" fill="url(#bp-sc-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="500" y="244" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">状态变更</text>
      <rect x="440" y="256" width="120" height="24" rx="4" fill="#fff" stroke="#059669" strokeWidth="1" />
      <text x="500" y="272" textAnchor="middle" fontSize="8" fill="#475569">更新链上状态</text>
      <rect x="440" y="284" width="120" height="24" rx="4" fill="#fff" stroke="#059669" strokeWidth="1" />
      <text x="500" y="300" textAnchor="middle" fontSize="8" fill="#475569">转账/发Token</text>
      <rect x="440" y="312" width="120" height="24" rx="4" fill="#fff" stroke="#059669" strokeWidth="1" />
      <text x="500" y="328" textAnchor="middle" fontSize="8" fill="#475569">触发事件日志</text>

      <path d="M582 287 L608 287" stroke="#64748b" strokeWidth="2" markerEnd="url(#bp-sc-arrow)" />

      {/* 全网共识 */}
      <rect x="610" y="222" width="170" height="130" rx="10" fill="url(#bp-sc-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="695" y="244" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">全网共识确认</text>
      <rect x="630" y="256" width="130" height="24" rx="4" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="695" y="272" textAnchor="middle" fontSize="8" fill="#475569">矿工打包结果</text>
      <rect x="630" y="284" width="130" height="24" rx="4" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="695" y="300" textAnchor="middle" fontSize="8" fill="#475569">节点验证执行</text>
      <rect x="630" y="312" width="130" height="24" rx="4" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="695" y="328" textAnchor="middle" fontSize="8" fill="#475569">不可逆上链</text>

      {/* 特性与风险 */}
      <text x="400" y="378" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心特性与风险</text>

      <rect x="20" y="390" width="370" height="70" rx="10" fill="url(#bp-sc-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="205" y="410" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">核心特性</text>
      <text x="205" y="428" textAnchor="middle" fontSize="9" fill="#475569">自动执行无需中介 · 透明可审计 · 不可篡改</text>
      <text x="205" y="444" textAnchor="middle" fontSize="9" fill="#475569">确定性（相同输入相同输出）· 图灵完备（可写复杂逻辑）</text>

      <rect x="410" y="390" width="370" height="70" rx="10" fill="url(#bp-sc-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="595" y="410" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">风险与挑战</text>
      <text x="595" y="428" textAnchor="middle" fontSize="9" fill="#475569">代码即法律（漏洞不可撤回）· Gas耗尽攻击 · 重入攻击</text>
      <text x="595" y="444" textAnchor="middle" fontSize="9" fill="#475569">可升级性矛盾 · 预言机问题（链外数据可信度）</text>

      {/* 应用场景 */}
      <text x="400" y="484" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">典型应用</text>

      <rect x="20" y="496" width="120" height="28" rx="6" fill="url(#bp-sc-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1" />
      <text x="80" y="515" textAnchor="middle" fontSize="9" fill="#5b21b6">DeFi 去中心化金融</text>

      <rect x="150" y="496" width="120" height="28" rx="6" fill="url(#bp-sc-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1" />
      <text x="210" y="515" textAnchor="middle" fontSize="9" fill="#92400e">NFT 数字资产</text>

      <rect x="280" y="496" width="120" height="28" rx="6" fill="url(#bp-sc-green)" opacity="0.12" stroke="#059669" strokeWidth="1" />
      <text x="340" y="515" textAnchor="middle" fontSize="9" fill="#065f46">DAO 去中心化组织</text>

      <rect x="410" y="496" width="120" height="28" rx="6" fill="url(#bp-sc-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="470" y="515" textAnchor="middle" fontSize="9" fill="#1e40af">供应链溯源</text>

      <rect x="540" y="496" width="120" height="28" rx="6" fill="url(#bp-sc-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1" />
      <text x="600" y="515" textAnchor="middle" fontSize="9" fill="#5b21b6">去中心化交易</text>

      <rect x="670" y="496" width="110" height="28" rx="6" fill="url(#bp-sc-green)" opacity="0.12" stroke="#059669" strokeWidth="1" />
      <text x="725" y="515" textAnchor="middle" fontSize="9" fill="#065f46">游戏博彩</text>

      {/* 底部总结 */}
      <rect x="20" y="532" width="760" height="22" rx="6" fill="url(#bp-sc-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">核心脉络：编写部署 → 条件触发 → EVM执行 → 状态变更 → 共识确认 → 不可逆自动化</text>
    </svg>
  );
}
