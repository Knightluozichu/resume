"use client";

export function AvcAutosarOverviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="AUTOSAR三层架构概览图">
      <defs>
        <linearGradient id="avc-ao-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="avc-ao-rte" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="avc-ao-bsw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="avc-ao-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">AUTOSAR 三层架构概览</text>

      {/* 应用层 */}
      <rect x="40" y="60" width="720" height="120" rx="10" fill="url(#avc-ao-app)" opacity="0.1" stroke="#9333ea" strokeWidth="2" />
      <text x="400" y="84" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7e22ce">应用层 Application Layer</text>

      <rect x="70" y="96" width="130" height="70" rx="8" fill="url(#avc-ao-app)" opacity="0.85" />
      <text x="135" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">SWC-A</text>
      <text x="135" y="140" textAnchor="middle" fontSize="9" fill="#f3e8ff">传感器组件</text>
      <text x="135" y="154" textAnchor="middle" fontSize="9" fill="#f3e8ff">Port / Runnable</text>

      <rect x="220" y="96" width="130" height="70" rx="8" fill="url(#avc-ao-app)" opacity="0.85" />
      <text x="285" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">SWC-B</text>
      <text x="285" y="140" textAnchor="middle" fontSize="9" fill="#f3e8ff">控制逻辑组件</text>
      <text x="285" y="154" textAnchor="middle" fontSize="9" fill="#f3e8ff">Port / Runnable</text>

      <rect x="370" y="96" width="130" height="70" rx="8" fill="url(#avc-ao-app)" opacity="0.85" />
      <text x="435" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">SWC-C</text>
      <text x="435" y="140" textAnchor="middle" fontSize="9" fill="#f3e8ff">执行器组件</text>
      <text x="435" y="154" textAnchor="middle" fontSize="9" fill="#f3e8ff">Port / Runnable</text>

      <rect x="520" y="96" width="130" height="70" rx="8" fill="url(#avc-ao-app)" opacity="0.85" />
      <text x="585" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">SWC-D</text>
      <text x="585" y="140" textAnchor="middle" fontSize="9" fill="#f3e8ff">模式管理组件</text>
      <text x="585" y="154" textAnchor="middle" fontSize="9" fill="#f3e8ff">Port / Runnable</text>

      <text x="680" y="134" fontSize="10" fill="#475569">独立于</text>
      <text x="680" y="148" fontSize="10" fill="#475569">硬件</text>

      {/* RTE层 */}
      <rect x="40" y="200" width="720" height="60" rx="10" fill="url(#avc-ao-rte)" opacity="0.85" />
      <text x="400" y="226" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">RTE 运行时环境 Runtime Environment</text>
      <text x="400" y="246" textAnchor="middle" fontSize="11" fill="#e0f2fe">通信抽象 / 调度管理 / SWC 与 BSW 的解耦桥梁</text>

      <path d="M400 260 L400 270" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-ao-arrow)" />
      <path d="M400 196 L400 186" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-ao-arrow)" />

      {/* BSW层 */}
      <rect x="40" y="280" width="720" height="200" rx="10" fill="url(#avc-ao-bsw)" opacity="0.1" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="304" textAnchor="middle" fontSize="14" fontWeight="700" fill="#15803d">基础软件层 Basic Software Layer</text>

      {/* 服务层 */}
      <rect x="60" y="316" width="680" height="44" rx="8" fill="url(#avc-ao-bsw)" opacity="0.2" stroke="#16a34a" strokeWidth="1.5" />
      <text x="110" y="342" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">服务层</text>
      <text x="260" y="342" fontSize="10" fill="#475569">OS / 内存 / 诊断 / 通信服务 / ECU管理</text>

      {/* ECU抽象层 */}
      <rect x="60" y="370" width="680" height="44" rx="8" fill="url(#avc-ao-bsw)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="110" y="396" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">ECU抽象层</text>
      <text x="260" y="396" fontSize="10" fill="#475569">I/O 抽象 / 存储抽象 / 通信抽象 / 存储器抽象</text>

      {/* MCAL */}
      <rect x="60" y="424" width="680" height="44" rx="8" fill="url(#avc-ao-bsw)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="110" y="450" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">MCAL</text>
      <text x="260" y="450" fontSize="10" fill="#475569">微控制器抽象层 / DIO / ADC / PWM / CAN / UART / Timer</text>

      {/* 硬件层 */}
      <rect x="40" y="500" width="720" height="44" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <text x="400" y="526" textAnchor="middle" fontSize="13" fontWeight="700" fill="#475569">微控制器硬件 Microcontroller Hardware</text>
    </svg>
  );
}
