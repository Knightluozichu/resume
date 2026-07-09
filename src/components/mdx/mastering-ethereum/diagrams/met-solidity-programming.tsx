"use client";

export function MetSolidityProgrammingDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Solidity编程：合约结构与核心语法">
      <defs>
        <linearGradient id="met-sp-sol" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="met-sp-eth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#627eea" />
          <stop offset="100%" stopColor="#4c53d4" />
        </linearGradient>
        <linearGradient id="met-sp-exec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="met-sp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Solidity 编程</text>

      {/* 合约结构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">合约结构</text>

      <rect x="40" y="76" width="720" height="170" rx="10" fill="url(#met-sp-sol)" opacity="0.06" stroke="#059669" strokeWidth="1.5" />
      <text x="70" y="98" fontSize="11" fontWeight="700" fill="#065f46">contract Token</text>

      <rect x="60" y="108" width="165" height="124" rx="6" fill="#fff" stroke="#059669" strokeWidth="1" />
      <text x="142" y="126" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">状态变量</text>
      <text x="72" y="144" fontSize="8" fill="#475569">mapping(address=&gt;uint)</text>
      <text x="72" y="158" fontSize="8" fill="#475569">uint256 totalSupply</text>
      <text x="72" y="172" fontSize="8" fill="#475569">string name</text>
      <text x="72" y="186" fontSize="8" fill="#475569">address owner</text>
      <text x="142" y="208" textAnchor="middle" fontSize="8" fontWeight="600" fill="#059669">持久化到存储</text>
      <text x="142" y="222" textAnchor="middle" fontSize="8" fill="#64748b">合约状态</text>

      <rect x="240" y="108" width="165" height="124" rx="6" fill="#fff" stroke="#627eea" strokeWidth="1" />
      <text x="322" y="126" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3730a3">函数</text>
      <text x="252" y="144" fontSize="8" fill="#475569">function transfer()</text>
      <text x="252" y="158" fontSize="8" fill="#475569">function balanceOf()</text>
      <text x="252" y="172" fontSize="8" fill="#475569">modifier onlyOwner</text>
      <text x="252" y="186" fontSize="8" fill="#475569">constructor()</text>
      <text x="322" y="208" textAnchor="middle" fontSize="8" fontWeight="600" fill="#627eea">可见性修饰符</text>
      <text x="322" y="222" textAnchor="middle" fontSize="8" fill="#64748b">public/private/internal</text>

      <rect x="420" y="108" width="165" height="124" rx="6" fill="#fff" stroke="#0891b2" strokeWidth="1" />
      <text x="502" y="126" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">事件与修饰符</text>
      <text x="432" y="144" fontSize="8" fill="#475569">event Transfer()</text>
      <text x="432" y="158" fontSize="8" fill="#475569">modifier onlyOwner</text>
      <text x="432" y="172" fontSize="8" fill="#475569">require(cond)</text>
      <text x="432" y="186" fontSize="8" fill="#475569">fallback/receive</text>
      <text x="502" y="208" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0891b2">日志与校验</text>
      <text x="502" y="222" textAnchor="middle" fontSize="8" fill="#64748b">事件上链可查</text>

      <rect x="600" y="108" width="140" height="124" rx="6" fill="#fff" stroke="#ea580c" strokeWidth="1" />
      <text x="670" y="126" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9a3412">类型系统</text>
      <text x="612" y="144" fontSize="8" fill="#475569">uint256 / int128</text>
      <text x="612" y="158" fontSize="8" fill="#475569">address / bool</text>
      <text x="612" y="172" fontSize="8" fill="#475569">bytes32 / string</text>
      <text x="612" y="186" fontSize="8" fill="#475569">struct / enum</text>
      <text x="670" y="208" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ea580c">静态类型</text>
      <text x="670" y="222" textAnchor="middle" fontSize="8" fill="#64748b">编译期检查</text>

      {/* 函数可见性 */}
      <text x="400" y="270" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">函数可见性与状态可变性</text>

      <rect x="40" y="284" width="175" height="100" rx="8" fill="url(#met-sp-sol)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="127" y="304" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">可见性</text>
      <text x="55" y="324" fontSize="9" fill="#475569">public：内外皆可</text>
      <text x="55" y="340" fontSize="9" fill="#475569">external：仅外部</text>
      <text x="55" y="356" fontSize="9" fill="#475569">internal：本合约+子</text>
      <text x="55" y="372" fontSize="9" fill="#475569">private：仅本合约</text>

      <rect x="230" y="284" width="175" height="100" rx="8" fill="url(#met-sp-eth)" opacity="0.08" stroke="#627eea" strokeWidth="1.5" />
      <text x="317" y="304" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730a3">状态可变性</text>
      <text x="245" y="324" fontSize="9" fill="#475569">view：读不写</text>
      <text x="245" y="340" fontSize="9" fill="#475569">pure：不读不写</text>
      <text x="245" y="356" fontSize="9" fill="#475569">payable：可收 ETH</text>
      <text x="245" y="372" fontSize="9" fill="#475569">constant：常量</text>

      <rect x="420" y="284" width="175" height="100" rx="8" fill="url(#met-sp-exec)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="507" y="304" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">数据位置</text>
      <text x="435" y="324" fontSize="9" fill="#475569">storage：链上持久</text>
      <text x="435" y="340" fontSize="9" fill="#475569">memory：临时</text>
      <text x="435" y="356" fontSize="9" fill="#475569">calldata：只读入参</text>
      <text x="435" y="372" fontSize="9" fill="#475569">stack：EVM 栈</text>

      <rect x="610" y="284" width="150" height="100" rx="8" fill="url(#met-sp-sol)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="304" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">特殊函数</text>
      <text x="625" y="324" fontSize="9" fill="#475569">constructor 初始化</text>
      <text x="625" y="340" fontSize="9" fill="#475569">fallback 兜底</text>
      <text x="625" y="356" fontSize="9" fill="#475569">receive 收 ETH</text>
      <text x="625" y="372" fontSize="9" fill="#475569">selfdestruct 销毁</text>

      {/* 调用流程 */}
      <text x="400" y="410" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">合约调用流程</text>

      <rect x="40" y="424" width="120" height="50" rx="8" fill="url(#met-sp-eth)" opacity="0.15" stroke="#627eea" strokeWidth="1.5" />
      <text x="100" y="446" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3730a3">EOA 调用</text>
      <text x="100" y="462" textAnchor="middle" fontSize="9" fill="#475569">签名交易</text>

      <path d="M160 449 L182 449" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-sp-arrow)" />

      <rect x="186" y="424" width="120" height="50" rx="8" fill="url(#met-sp-exec)" opacity="0.15" stroke="#0891b2" strokeWidth="1.5" />
      <text x="246" y="446" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">ABI 编码</text>
      <text x="246" y="462" textAnchor="middle" fontSize="9" fill="#475569">函数选择器</text>

      <path d="M306 449 L328 449" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-sp-arrow)" />

      <rect x="332" y="424" width="120" height="50" rx="8" fill="url(#met-sp-sol)" opacity="0.15" stroke="#059669" strokeWidth="1.5" />
      <text x="392" y="446" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">EVM 执行</text>
      <text x="392" y="462" textAnchor="middle" fontSize="9" fill="#475569">状态转换</text>

      <path d="M452 449 L474 449" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-sp-arrow)" />

      <rect x="478" y="424" width="120" height="50" rx="8" fill="url(#met-sp-sol)" opacity="0.2" stroke="#059669" strokeWidth="1.5" />
      <text x="538" y="446" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">事件日志</text>
      <text x="538" y="462" textAnchor="middle" fontSize="9" fill="#475569">emit 上链</text>

      <path d="M598 449 L620 449" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-sp-arrow)" />

      <rect x="624" y="424" width="136" height="50" rx="8" fill="url(#met-sp-eth)" opacity="0.2" stroke="#627eea" strokeWidth="1.5" />
      <text x="692" y="446" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3730a3">返回结果</text>
      <text x="692" y="462" textAnchor="middle" fontSize="9" fill="#475569">ABI 解码</text>

      {/* 底部总结 */}
      <rect x="40" y="492" width="720" height="68" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="512" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Solidity 核心理念</text>
      <text x="400" y="530" textAnchor="middle" fontSize="10" fill="#475569">面向合约 · 静态类型 · 状态持久化 · 事件驱动日志</text>
      <text x="400" y="548" textAnchor="middle" fontSize="10" fill="#475569">编译为 EVM 字节码 · ABI 定义接口 · require 校验防错</text>
    </svg>
  );
}
