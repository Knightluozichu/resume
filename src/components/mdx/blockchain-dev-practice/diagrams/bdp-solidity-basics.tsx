"use client";

export function BdpSolidityBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="Solidity 智能合约结构组成与数据流">
      <defs>
        <linearGradient id="bdp-sb-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bdp-sb-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bdp-sb-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bdp-sb-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bdp-sb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Solidity 合约结构</text>

      {/* 合约外框 */}
      <rect x="40" y="56" width="720" height="380" rx="12" fill="#f8fafc" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">contract MyToken</text>

      {/* pragma 版本声明 */}
      <rect x="60" y="92" width="680" height="34" rx="6" fill="url(#bdp-sb-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="114" fontSize="11" fontWeight="600" fill="#1e40af">pragma</text>
      <text x="160" y="114" fontSize="11" fill="#475569">SPDX 许可与 solidity 版本声明 — 编译器兼容性锁定</text>

      {/* 状态变量 */}
      <rect x="60" y="134" width="680" height="50" rx="6" fill="url(#bdp-sb-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="80" y="156" fontSize="11" fontWeight="600" fill="#5b21b6">state variables</text>
      <text x="80" y="174" fontSize="10" fill="#475569">mapping / uint / address — 持久化上链，storage 存储，Gas 成本最高</text>

      {/* 事件 */}
      <rect x="60" y="192" width="680" height="44" rx="6" fill="url(#bdp-sb-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="80" y="214" fontSize="11" fontWeight="600" fill="#92400e">events</text>
      <text x="170" y="214" fontSize="10" fill="#475569">event Transfer — 链上日志，前端低成本检索，indexed 主题索引</text>

      {/* 修饰器 */}
      <rect x="60" y="244" width="680" height="44" rx="6" fill="url(#bdp-sb-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="80" y="266" fontSize="11" fontWeight="600" fill="#065f46">modifiers</text>
      <text x="180" y="266" fontSize="10" fill="#475569">modifier onlyOwner — 可复用校验逻辑，_; 占位回插原函数体</text>

      {/* 构造函数 */}
      <rect x="60" y="296" width="680" height="44" rx="6" fill="url(#bdp-sb-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="318" fontSize="11" fontWeight="600" fill="#1e40af">constructor</text>
      <text x="200" y="318" fontSize="10" fill="#475569">部署时执行一次 — 初始化 owner 与初始供应量</text>

      {/* 函数可见性矩阵 */}
      <rect x="60" y="348" width="680" height="76" rx="6" fill="url(#bdp-sb-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="80" y="368" fontSize="11" fontWeight="600" fill="#5b21b6">functions</text>
      <text x="180" y="368" fontSize="10" fill="#475569">可见性：public / external / internal / private</text>
      <text x="180" y="386" fontSize="10" fill="#475569">状态变更：view 只读 / pure 纯计算 / payable 收款</text>
      <text x="180" y="404" fontSize="10" fill="#475569">call 调用不打包交易，transact 写状态需签名上链</text>

      {/* 底部：数据位置与 Gas */}
      <rect x="40" y="448" width="350" height="76" rx="8" fill="url(#bdp-sb-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="215" y="470" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">数据位置</text>
      <text x="215" y="490" textAnchor="middle" fontSize="10" fill="#475569">storage 持久 / memory 临时 / calldata 只读</text>
      <text x="215" y="508" textAnchor="middle" fontSize="10" fill="#475569">storage 最贵，calldata 最省</text>

      <rect x="410" y="448" width="350" height="76" rx="8" fill="url(#bdp-sb-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="585" y="470" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">Gas 成本与安全</text>
      <text x="585" y="490" textAnchor="middle" fontSize="10" fill="#475569">整数溢出用 SafeMath / 0.8+ 内建检查</text>
      <text x="585" y="508" textAnchor="middle" fontSize="10" fill="#475569">require 校验 / revert 回滚 / 自定义 error 省 Gas</text>
    </svg>
  );
}
