"use client";

export function MetFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="精通以太坊全书复习：知识整合与系统闭环">
      <defs>
        <linearGradient id="met-fr-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#627eea" />
          <stop offset="100%" stopColor="#4c53d4" />
        </linearGradient>
        <linearGradient id="met-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="met-fr-evm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="met-fr-contract" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="met-fr-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <marker id="met-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：以太坊知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="140" height="56" rx="8" fill="url(#met-fr-found)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0-1 基础</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#dbeafe">全景+概览</text>

      <path d="M162 102 L182 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-fr-arrow)" />

      <rect x="186" y="74" width="140" height="56" rx="8" fill="url(#met-fr-core)" opacity="0.9" />
      <text x="256" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch2-3 机制</text>
      <text x="256" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">账户+交易+Gas</text>

      <path d="M328 102 L348 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-fr-arrow)" />

      <rect x="352" y="74" width="120" height="56" rx="8" fill="url(#met-fr-evm)" opacity="0.9" />
      <text x="412" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch4 执行</text>
      <text x="412" y="116" textAnchor="middle" fontSize="9" fill="#cffafe">EVM 字节码</text>

      <path d="M474 102 L494 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-fr-arrow)" />

      <rect x="498" y="74" width="140" height="56" rx="8" fill="url(#met-fr-contract)" opacity="0.9" />
      <text x="568" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-7 合约</text>
      <text x="568" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">Solidity+安全+ERC</text>

      <path d="M640 102 L660 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-fr-arrow)" />

      <rect x="664" y="74" width="116" height="56" rx="8" fill="url(#met-fr-app)" opacity="0.9" />
      <text x="722" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch8-9 应用</text>
      <text x="722" y="116" textAnchor="middle" fontSize="9" fill="#fed7aa">DApp+闭环</text>

      {/* 四层系统视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四层系统视角</text>

      <rect x="20" y="176" width="185" height="150" rx="8" fill="url(#met-fr-found)" opacity="0.1" stroke="#627eea" strokeWidth="1.5" />
      <text x="112" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3730a3">认知层</text>
      <text x="112" y="220" textAnchor="middle" fontSize="10" fill="#475569">世界计算机</text>
      <text x="112" y="236" textAnchor="middle" fontSize="10" fill="#475569">账户模型</text>
      <text x="112" y="252" textAnchor="middle" fontSize="10" fill="#475569">智能合约</text>
      <text x="112" y="268" textAnchor="middle" fontSize="10" fill="#475569">PoS 共识</text>
      <text x="112" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#627eea">建立系统认知</text>

      <rect x="217" y="176" width="185" height="150" rx="8" fill="url(#met-fr-core)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="310" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">机制层</text>
      <text x="310" y="220" textAnchor="middle" fontSize="10" fill="#475569">椭圆曲线密钥</text>
      <text x="310" y="236" textAnchor="middle" fontSize="10" fill="#475569">EOA / CA 账户</text>
      <text x="310" y="252" textAnchor="middle" fontSize="10" fill="#475569">交易结构</text>
      <text x="310" y="268" textAnchor="middle" fontSize="10" fill="#475569">Gas 计量</text>
      <text x="310" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">定义数据与费用</text>

      <rect x="414" y="176" width="185" height="150" rx="8" fill="url(#met-fr-evm)" opacity="0.1" stroke="#0891b2" strokeWidth="1.5" />
      <text x="507" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">执行层</text>
      <text x="507" y="220" textAnchor="middle" fontSize="10" fill="#475569">EVM 虚拟机</text>
      <text x="507" y="236" textAnchor="middle" fontSize="10" fill="#475569">栈 / 内存 / 存储</text>
      <text x="507" y="252" textAnchor="middle" fontSize="10" fill="#475569">字节码执行</text>
      <text x="507" y="268" textAnchor="middle" fontSize="10" fill="#475569">状态转换</text>
      <text x="507" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0891b2">定义运行逻辑</text>

      <rect x="611" y="176" width="169" height="150" rx="8" fill="url(#met-fr-contract)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="696" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">应用层</text>
      <text x="696" y="220" textAnchor="middle" fontSize="10" fill="#475569">Solidity 合约</text>
      <text x="696" y="236" textAnchor="middle" fontSize="10" fill="#475569">安全工程</text>
      <text x="696" y="252" textAnchor="middle" fontSize="10" fill="#475569">ERC 代币标准</text>
      <text x="696" y="268" textAnchor="middle" fontSize="10" fill="#475569">DApp 与预言机</text>
      <text x="696" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">定义生态应用</text>

      {/* 合约执行决策链 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">合约调用决策链</text>

      <rect x="20" y="364" width="110" height="56" rx="8" fill="#fffbeb" stroke="#627eea" strokeWidth="1.5" />
      <text x="75" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3730a3">用户发起</text>
      <text x="75" y="404" textAnchor="middle" fontSize="9" fill="#475569">EOA 签名</text>

      <path d="M130 392 L148 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-fr-arrow)" />

      <rect x="152" y="364" width="110" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="207" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">交易广播</text>
      <text x="207" y="404" textAnchor="middle" fontSize="9" fill="#475569">Gas 报价</text>

      <path d="M262 392 L280 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-fr-arrow)" />

      <rect x="284" y="364" width="110" height="56" rx="8" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="339" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0e7490">EVM 执行</text>
      <text x="339" y="404" textAnchor="middle" fontSize="9" fill="#475569">字节码运行</text>

      <path d="M394 392 L412 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-fr-arrow)" />

      <rect x="416" y="364" width="110" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="471" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">状态更新</text>
      <text x="471" y="404" textAnchor="middle" fontSize="9" fill="#475569">存储写入</text>

      <path d="M526 392 L544 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-fr-arrow)" />

      <rect x="548" y="364" width="110" height="56" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="603" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#9a3412">事件日志</text>
      <text x="603" y="404" textAnchor="middle" fontSize="9" fill="#475569">emit 上链</text>

      <path d="M658 392 L676 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-fr-arrow)" />

      <rect x="680" y="364" width="100" height="56" rx="8" fill="url(#met-fr-app)" opacity="0.15" stroke="#ea580c" strokeWidth="1.5" />
      <text x="730" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9a3412">不可逆</text>
      <text x="730" y="404" textAnchor="middle" fontSize="9" fill="#475569">区块确认</text>

      {/* 核心能力与挑战 */}
      <text x="400" y="450" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心能力与挑战</text>

      <rect x="30" y="464" width="370" height="56" rx="8" fill="url(#met-fr-evm)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="215" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0e7490">能力跃迁路径</text>
      <text x="215" y="504" textAnchor="middle" fontSize="10" fill="#475569">理解原理 → 掌握账户 → 解析交易 → EVM执行 → 合约编程 → 安全防护 → 代币应用</text>

      <rect x="410" y="464" width="360" height="56" rx="8" fill="url(#met-fr-app)" opacity="0.08" stroke="#ea580c" strokeWidth="1.5" />
      <text x="590" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#9a3412">核心挑战</text>
      <text x="590" y="504" textAnchor="middle" fontSize="10" fill="#475569">可扩展性 / 合约安全 / 预言机信任 / 升级治理 / Gas 成本</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#met-fr-found)" opacity="0.08" stroke="#627eea" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3730a3">核心脉络：认知 → 账户密钥 → 交易Gas → EVM执行 → Solidity → 安全工程 → 代币标准 → DApp应用 → 系统闭环</text>

      <rect x="30" y="564" width="740" height="12" rx="6" fill="url(#met-fr-found)" opacity="0.1" />
    </svg>
  );
}
