"use client";

export function BdpTestingSecurityDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="智能合约测试金字塔与安全审计流程">
      <defs>
        <linearGradient id="bdp-ts-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bdp-ts-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bdp-ts-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bdp-ts-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bdp-ts-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bdp-ts-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">测试金字塔与安全审计</text>

      {/* 测试金字塔 */}
      <text x="220" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">测试金字塔</text>

      <polygon points="220,80 320,80 270,150" fill="url(#bdp-ts-red)" opacity="0.8" />
      <text x="270" y="120" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">形式化验证</text>

      <polygon points="160,150 320,150 270,80 220,80" fill="url(#bdp-ts-amber)" opacity="0.8" />
      <text x="240" y="128" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">不变式 Invariant</text>

      <polygon points="100,220 320,220 320,150 160,150" fill="url(#bdp-ts-green)" opacity="0.8" />
      <text x="210" y="195" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">模糊测试 Fuzz</text>

      <polygon points="40,300 320,300 320,220 100,220" fill="url(#bdp-ts-blue)" opacity="0.8" />
      <text x="180" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">集成 / 分叉测试</text>

      <polygon points="40,300 320,300 320,360 40,360" fill="url(#bdp-ts-purple)" opacity="0.8" />
      <text x="180" y="338" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">单元测试 Unit</text>

      <text x="180" y="384" textAnchor="middle" fontSize="10" fill="#475569">数量多成本低 → 数量少成本高</text>

      {/* 右侧：静态分析与审计工具 */}
      <text x="560" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">静态分析与审计</text>

      <rect x="400" y="78" width="360" height="44" rx="8" fill="url(#bdp-ts-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="420" y="100" fontSize="11" fontWeight="600" fill="#5b21b6">Slither</text>
      <text x="510" y="100" fontSize="10" fill="#475569">静态分析 / 检测重入与未初始化</text>

      <rect x="400" y="130" width="360" height="44" rx="8" fill="url(#bdp-ts-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="420" y="152" fontSize="11" fontWeight="600" fill="#5b21b6">Mythril</text>
      <text x="510" y="152" fontSize="10" fill="#475569">符号执行 / 深层路径漏洞</text>

      <rect x="400" y="182" width="360" height="44" rx="8" fill="url(#bdp-ts-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="420" y="204" fontSize="11" fontWeight="600" fill="#92400e">Echidna</text>
      <text x="510" y="204" fontSize="10" fill="#475569">属性模糊 / 不变式破坏</text>

      <rect x="400" y="234" width="360" height="44" rx="8" fill="url(#bdp-ts-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="420" y="256" fontSize="11" fontWeight="600" fill="#065f46">Foundry Forge</text>
      <text x="540" y="256" fontSize="10" fill="#475569">fuzz / invariant / fork 一体化</text>

      <rect x="400" y="286" width="360" height="44" rx="8" fill="url(#bdp-ts-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="420" y="308" fontSize="11" fontWeight="600" fill="#1e40af">人工审计</text>
      <text x="510" y="308" fontSize="10" fill="#475569">第三方团队 / 代码逐行复核</text>

      <path d="M560 330 L560 340" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-ts-arrow)" />

      <rect x="400" y="344" width="360" height="44" rx="8" fill="url(#bdp-ts-red)" opacity="0.9" />
      <text x="580" y="366" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">赏金计划 Bug Bounty</text>
      <text x="580" y="382" textAnchor="middle" fontSize="9" fill="#fecaca">主网前最后一道社区防线</text>

      {/* 底部：常见漏洞清单 */}
      <text x="400" y="412" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">高危漏洞清单</text>

      <rect x="30" y="424" width="180" height="60" rx="8" fill="url(#bdp-ts-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="120" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">重入 Reentrancy</text>
      <text x="120" y="466" textAnchor="middle" fontSize="9" fill="#475569">外部调用回调改状态</text>

      <rect x="225" y="424" width="170" height="60" rx="8" fill="url(#bdp-ts-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="310" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">整数溢出</text>
      <text x="310" y="466" textAnchor="middle" fontSize="9" fill="#475569">0.8 前无内建检查</text>

      <rect x="410" y="424" width="180" height="60" rx="8" fill="url(#bdp-ts-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="500" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">访问控制缺失</text>
      <text x="500" y="466" textAnchor="middle" fontSize="9" fill="#475569">关键函数无权限校验</text>

      <rect x="605" y="424" width="165" height="60" rx="8" fill="url(#bdp-ts-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="687" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">预言机操纵</text>
      <text x="687" y="466" textAnchor="middle" fontSize="9" fill="#475569">闪电贷攻击报价</text>

      <rect x="30" y="498" width="740" height="48" rx="8" fill="url(#bdp-ts-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="518" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">安全原则</text>
      <text x="400" y="536" textAnchor="middle" fontSize="10" fill="#475569">不信任外部合约 / 检查-生效-交互 / 限制可升级权限 / 充分测试覆盖 + 多轮审计</text>
    </svg>
  );
}
