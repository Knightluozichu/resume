"use client";

export function BdpDeploymentMainnetDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="合约部署与主网上线流水线">
      <defs>
        <linearGradient id="bdp-dm-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bdp-dm-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bdp-dm-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bdp-dm-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bdp-dm-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bdp-dm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">部署与主网上线流水线</text>

      {/* 流水线阶段 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">上线七阶段</text>

      <rect x="20" y="74" width="100" height="80" rx="8" fill="url(#bdp-dm-blue)" opacity="0.9" />
      <text x="70" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">1 编译</text>
      <text x="70" y="118" textAnchor="middle" fontSize="9" fill="#bfdbfe">solc 编译</text>
      <text x="70" y="134" textAnchor="middle" fontSize="9" fill="#bfdbfe">产出 ABI</text>
      <text x="70" y="148" textAnchor="middle" fontSize="9" fill="#bfdbfe">与字节码</text>

      <path d="M120 114 L130 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-dm-arrow)" />

      <rect x="134" y="74" width="100" height="80" rx="8" fill="url(#bdp-dm-purple)" opacity="0.9" />
      <text x="184" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">2 测试</text>
      <text x="184" y="118" textAnchor="middle" fontSize="9" fill="#ede9fe">单元 / 模糊</text>
      <text x="184" y="134" textAnchor="middle" fontSize="9" fill="#ede9fe">分叉主网</text>
      <text x="184" y="148" textAnchor="middle" fontSize="9" fill="#ede9fe">覆盖回归</text>

      <path d="M234 114 L244 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-dm-arrow)" />

      <rect x="248" y="74" width="100" height="80" rx="8" fill="url(#bdp-dm-amber)" opacity="0.9" />
      <text x="298" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">3 测试网</text>
      <text x="298" y="118" textAnchor="middle" fontSize="9" fill="#fef3c7">Sepolia 部署</text>
      <text x="298" y="134" textAnchor="middle" fontSize="9" fill="#fef3c7">前端联调</text>
      <text x="298" y="148" textAnchor="middle" fontSize="9" fill="#fef3c7">真实交互</text>

      <path d="M348 114 L358 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-dm-arrow)" />

      <rect x="362" y="74" width="100" height="80" rx="8" fill="url(#bdp-dm-green)" opacity="0.9" />
      <text x="412" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">4 验证</text>
      <text x="412" y="118" textAnchor="middle" fontSize="9" fill="#d1fae5">Etherscan</text>
      <text x="412" y="134" textAnchor="middle" fontSize="9" fill="#d1fae5">源码核验</text>
      <text x="412" y="148" textAnchor="middle" fontSize="9" fill="#d1fae5">可读可审</text>

      <path d="M462 114 L472 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-dm-arrow)" />

      <rect x="476" y="74" width="100" height="80" rx="8" fill="url(#bdp-dm-red)" opacity="0.9" />
      <text x="526" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">5 审计</text>
      <text x="526" y="118" textAnchor="middle" fontSize="9" fill="#fecaca">第三方审计</text>
      <text x="526" y="134" textAnchor="middle" fontSize="9" fill="#fecaca">修复高危</text>
      <text x="526" y="148" textAnchor="middle" fontSize="9" fill="#fecaca">赏金兜底</text>

      <path d="M576 114 L586 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-dm-arrow)" />

      <rect x="590" y="74" width="100" height="80" rx="8" fill="url(#bdp-dm-red)" opacity="0.9" />
      <text x="640" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">6 多签</text>
      <text x="640" y="118" textAnchor="middle" fontSize="9" fill="#fecaca">Gnosis Safe</text>
      <text x="640" y="134" textAnchor="middle" fontSize="9" fill="#fecaca">分散权限</text>
      <text x="640" y="148" textAnchor="middle" fontSize="9" fill="#fecaca">防单点</text>

      <path d="M690 114 L700 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-dm-arrow)" />

      <rect x="704" y="74" width="76" height="80" rx="8" fill="url(#bdp-dm-green)" opacity="0.95" />
      <text x="742" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">7 主网</text>
      <text x="742" y="120" textAnchor="middle" fontSize="9" fill="#d1fae5">正式部署</text>
      <text x="742" y="138" textAnchor="middle" fontSize="9" fill="#d1fae5">不可撤销</text>

      {/* 升级治理流程 */}
      <text x="400" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">可升级合约治理流程</text>

      <rect x="40" y="200" width="170" height="70" rx="8" fill="url(#bdp-dm-blue)" opacity="0.9" />
      <text x="125" y="224" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">提案 Proposal</text>
      <text x="125" y="244" textAnchor="middle" fontSize="9" fill="#bfdbfe">新逻辑合约</text>
      <text x="125" y="260" textAnchor="middle" fontSize="9" fill="#bfdbfe">升级说明</text>

      <path d="M210 235 L222 235" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-dm-arrow)" />

      <rect x="226" y="200" width="170" height="70" rx="8" fill="url(#bdp-dm-purple)" opacity="0.9" />
      <text x="311" y="224" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">时间锁 Timelock</text>
      <text x="311" y="244" textAnchor="middle" fontSize="9" fill="#ede9fe">延迟执行窗口</text>
      <text x="311" y="260" textAnchor="middle" fontSize="9" fill="#ede9fe">用户可退出</text>

      <path d="M396 235 L408 235" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-dm-arrow)" />

      <rect x="412" y="200" width="170" height="70" rx="8" fill="url(#bdp-dm-amber)" opacity="0.9" />
      <text x="497" y="224" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">多签批准</text>
      <text x="497" y="244" textAnchor="middle" fontSize="9" fill="#fef3c7">M-of-N 签名</text>
      <text x="497" y="260" textAnchor="middle" fontSize="9" fill="#fef3c7">防单点作恶</text>

      <path d="M582 235 L594 235" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-dm-arrow)" />

      <rect x="598" y="200" width="182" height="70" rx="8" fill="url(#bdp-dm-green)" opacity="0.9" />
      <text x="689" y="224" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">执行 upgrade</text>
      <text x="689" y="244" textAnchor="middle" fontSize="9" fill="#d1fae5">proxy 升级 impl</text>
      <text x="689" y="260" textAnchor="middle" fontSize="9" fill="#d1fae5">状态保留</text>

      {/* 运维监控 */}
      <text x="400" y="302" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">上线后运维监控</text>

      <rect x="40" y="316" width="240" height="80" rx="8" fill="url(#bdp-dm-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="338" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">链上监控</text>
      <text x="160" y="358" textAnchor="middle" fontSize="10" fill="#475569">TVL / 交易量 / Gas</text>
      <text x="160" y="376" textAnchor="middle" fontSize="10" fill="#475569">异常大额转账告警</text>

      <rect x="290" y="316" width="240" height="80" rx="8" fill="url(#bdp-dm-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="338" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">事件追踪</text>
      <text x="410" y="358" textAnchor="middle" fontSize="10" fill="#475569">The Graph 索引</text>
      <text x="410" y="376" textAnchor="middle" fontSize="10" fill="#475569">Dune 仪表盘分析</text>

      <rect x="540" y="316" width="220" height="80" rx="8" fill="url(#bdp-dm-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="650" y="338" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">应急响应</text>
      <text x="650" y="358" textAnchor="middle" fontSize="10" fill="#475569">Pausable 暂停</text>
      <text x="650" y="376" textAnchor="middle" fontSize="10" fill="#475569">资金抢救预案</text>

      {/* 底部原则 */}
      <rect x="30" y="412" width="740" height="48" rx="8" fill="url(#bdp-dm-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="434" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">上线铁律</text>
      <text x="400" y="452" textAnchor="middle" fontSize="10" fill="#475569">主网部署不可撤销 / 永远先测试网 / 关键权限多签 + 时间锁 / 预留应急暂停开关</text>

      <rect x="30" y="470" width="740" height="48" rx="8" fill="url(#bdp-dm-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="492" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">回滚边界</text>
      <text x="400" y="510" textAnchor="middle" fontSize="10" fill="#475569">合约本身不可回滚 / 代理可换逻辑但状态难撤 / 设计阶段就要把漏洞挡在门外</text>
    </svg>
  );
}
