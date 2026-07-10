"use client";

export function SoaAdaptivePlatformDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="自适应平台AP集成架构图">
      <defs>
        <linearGradient id="soa-ap-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="soa-ap-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="soa-ap-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="soa-ap-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">自适应平台 AP 集成</text>

      {/* AP 三层架构 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">AP 三层架构</text>

      {/* 应用层 */}
      <rect x="60" y="78" width="680" height="70" rx="8" fill="url(#soa-ap-1)" opacity="0.9" />
      <text x="400" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Adaptive Application (AA)</text>
      <text x="130" y="124" textAnchor="middle" fontSize="9" fill="#e0f2fe">ADAS应用</text>
      <text x="280" y="124" textAnchor="middle" fontSize="9" fill="#e0f2fe">座舱HMI</text>
      <text x="430" y="124" textAnchor="middle" fontSize="9" fill="#e0f2fe">网关路由</text>
      <text x="570" y="124" textAnchor="middle" fontSize="9" fill="#e0f2fe">OTA管理</text>
      <text x="690" y="124" textAnchor="middle" fontSize="9" fill="#e0f2fe">诊断应用</text>

      {/* FC功能集群 */}
      <rect x="60" y="158" width="680" height="130" rx="8" fill="url(#soa-ap-2)" opacity="0.1" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="180" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">Functional Cluster (FC) — ARA基础</text>

      <rect x="80" y="192" width="145" height="80" rx="6" fill="url(#soa-ap-2)" opacity="0.15" stroke="#16a34a" strokeWidth="1" />
      <text x="152" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d">通信管理</text>
      <text x="152" y="228" textAnchor="middle" fontSize="8" fill="#475569">ara::com</text>
      <text x="152" y="244" textAnchor="middle" fontSize="8" fill="#475569">SOME/IP代理</text>
      <text x="152" y="260" textAnchor="middle" fontSize="8" fill="#475569">服务发现</text>

      <rect x="235" y="192" width="145" height="80" rx="6" fill="url(#soa-ap-2)" opacity="0.15" stroke="#16a34a" strokeWidth="1" />
      <text x="307" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d">执行管理</text>
      <text x="307" y="228" textAnchor="middle" fontSize="8" fill="#475569">ara::exec</text>
      <text x="307" y="244" textAnchor="middle" fontSize="8" fill="#475569">应用调度</text>
      <text x="307" y="260" textAnchor="middle" fontSize="8" fill="#475569">状态机管理</text>

      <rect x="390" y="192" width="145" height="80" rx="6" fill="url(#soa-ap-2)" opacity="0.15" stroke="#16a34a" strokeWidth="1" />
      <text x="462" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d">诊断管理</text>
      <text x="462" y="228" textAnchor="middle" fontSize="8" fill="#475569">ara::diag</text>
      <text x="462" y="244" textAnchor="middle" fontSize="8" fill="#475569">UDS诊断</text>
      <text x="462" y="260" textAnchor="middle" fontSize="8" fill="#475569">DM服务</text>

      <rect x="545" y="192" width="175" height="80" rx="6" fill="url(#soa-ap-2)" opacity="0.15" stroke="#16a34a" strokeWidth="1" />
      <text x="632" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d">其他FC</text>
      <text x="632" y="228" textAnchor="middle" fontSize="8" fill="#475569">持久化/日志</text>
      <text x="632" y="244" textAnchor="middle" fontSize="8" fill="#475569">时间同步/监控</text>
      <text x="632" y="260" textAnchor="middle" fontSize="8" fill="#475569">密码学/升级</text>

      {/* 操作系统层 */}
      <rect x="60" y="298" width="680" height="50" rx="8" fill="url(#soa-ap-3)" opacity="0.85" />
      <text x="400" y="320" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">POSIX OS（Linux / QNX）</text>
      <text x="400" y="338" textAnchor="middle" fontSize="9" fill="#f3e8ff">PSE51子集 + 文件系统 + TCP/IP协议栈 + 多进程调度</text>

      {/* ARA 与 AP 特性 */}
      <text x="400" y="376" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">ARA 基础与 AP 核心特性</text>

      <rect x="30" y="390" width="230" height="90" rx="8" fill="url(#soa-ap-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="145" y="412" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">ARA = AP运行时基础</text>
      <text x="50" y="432" fontSize="9" fill="#475569">- ara::com 通信</text>
      <text x="50" y="448" fontSize="9" fill="#475569">- ara::exec 执行</text>
      <text x="50" y="464" fontSize="9" fill="#475569">- ara::per 持久化</text>

      <rect x="285" y="390" width="230" height="90" rx="8" fill="url(#soa-ap-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="412" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">动态性</text>
      <text x="305" y="432" fontSize="9" fill="#475569">- 运行时服务发现</text>
      <text x="305" y="448" fontSize="9" fill="#475569">- 动态内存分配</text>
      <text x="305" y="464" fontSize="9" fill="#475569">- 软件动态更新</text>

      <rect x="540" y="390" width="230" height="90" rx="8" fill="url(#soa-ap-3)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="655" y="412" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">清单驱动</text>
      <text x="560" y="432" fontSize="9" fill="#475569">- Application Manifest</text>
      <text x="560" y="448" fontSize="9" fill="#475569">- Execution Manifest</text>
      <text x="560" y="464" fontSize="9" fill="#475569">- Machine Manifest</text>

      {/* AP vs CP 对比 */}
      <rect x="30" y="496" width="740" height="42" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="514" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">AP vs CP 定位</text>
      <text x="400" y="530" textAnchor="middle" fontSize="9" fill="#475569">CP：实时控制 / 静态配置 / 信号通信 / 低算力MCU ｜ AP：高性能计算 / 动态配置 / 服务通信 / 高算力SoC</text>

      {/* 底部总结 */}
      <rect x="30" y="548" width="740" height="24" rx="8" fill="url(#soa-ap-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="564" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">AP = AA应用 + FC功能集群(ARA) + POSIX OS ｜ 清单驱动配置 + SOME/IP服务通信</text>
    </svg>
  );
}
