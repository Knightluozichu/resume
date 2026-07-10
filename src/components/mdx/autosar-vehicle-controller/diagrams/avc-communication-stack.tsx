"use client";

export function AvcCommunicationStackDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="AUTOSAR通信栈分层架构与数据流图">
      <defs>
        <linearGradient id="avc-cs-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="avc-cs-svc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="avc-cs-ecu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="avc-cs-mcal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="avc-cs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">AUTOSAR 通信栈分层架构</text>

      {/* SWC 层 */}
      <rect x="40" y="56" width="720" height="50" rx="8" fill="url(#avc-cs-app)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="100" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">SWC</text>
      <text x="340" y="86" textAnchor="middle" fontSize="11" fill="#475569">应用软件组件（通过 RTE 收发信号）</text>

      <path d="M400 106 L400 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-cs-arrow)" />

      {/* RTE */}
      <rect x="40" y="116" width="720" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="139" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">RTE 运行时环境（信号路由与调度）</text>

      <path d="M400 152 L400 160" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-cs-arrow)" />

      {/* 通信服务层 */}
      <rect x="40" y="164" width="720" height="90" rx="8" fill="url(#avc-cs-svc)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">通信服务层 Communication Services</text>

      <rect x="60" y="196" width="160" height="48" rx="6" fill="url(#avc-cs-svc)" opacity="0.8" />
      <text x="140" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">Com</text>
      <text x="140" y="234" textAnchor="middle" fontSize="8" fill="#dcfce7">信号 ↔ I-PDU 打包</text>

      <rect x="240" y="196" width="160" height="48" rx="6" fill="url(#avc-cs-svc)" opacity="0.8" />
      <text x="320" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">PduR</text>
      <text x="320" y="234" textAnchor="middle" fontSize="8" fill="#dcfce7">PDU 路由网关</text>

      <rect x="420" y="196" width="160" height="48" rx="6" fill="url(#avc-cs-svc)" opacity="0.8" />
      <text x="500" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">CanTp</text>
      <text x="500" y="234" textAnchor="middle" fontSize="8" fill="#dcfce7">传输层分片重组</text>

      <rect x="600" y="196" width="140" height="48" rx="6" fill="url(#avc-cs-svc)" opacity="0.8" />
      <text x="670" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">Dcm</text>
      <text x="670" y="234" textAnchor="middle" fontSize="8" fill="#dcfce7">诊断通信管理</text>

      <path d="M400 254 L400 262" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-cs-arrow)" />

      {/* ECU 抽象层 */}
      <rect x="40" y="266" width="720" height="70" rx="8" fill="url(#avc-cs-ecu)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="288" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">ECU 抽象层 Communication Abstraction</text>

      <rect x="60" y="298" width="200" height="30" rx="6" fill="url(#avc-cs-ecu)" opacity="0.8" />
      <text x="160" y="318" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">CanIf — CAN 接口</text>

      <rect x="280" y="298" width="200" height="30" rx="6" fill="url(#avc-cs-ecu)" opacity="0.8" />
      <text x="380" y="318" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">FrIf — FlexRay 接口</text>

      <rect x="500" y="298" width="240" height="30" rx="6" fill="url(#avc-cs-ecu)" opacity="0.8" />
      <text x="620" y="318" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">EthIf — Ethernet 接口</text>

      <path d="M400 336 L400 344" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-cs-arrow)" />

      {/* MCAL */}
      <rect x="40" y="348" width="720" height="70" rx="8" fill="url(#avc-cs-mcal)" opacity="0.08" stroke="#ca8a04" strokeWidth="2" />
      <text x="400" y="370" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a16207">MCAL 通信驱动</text>

      <rect x="60" y="380" width="200" height="30" rx="6" fill="url(#avc-cs-mcal)" opacity="0.8" />
      <text x="160" y="400" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">Can — CAN 驱动</text>

      <rect x="280" y="380" width="200" height="30" rx="6" fill="url(#avc-cs-mcal)" opacity="0.8" />
      <text x="380" y="400" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">Fr — FlexRay 驱动</text>

      <rect x="500" y="380" width="240" height="30" rx="6" fill="url(#avc-cs-mcal)" opacity="0.8" />
      <text x="620" y="400" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">Eth — Ethernet 驱动</text>

      <path d="M400 418 L400 426" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-cs-arrow)" />

      {/* 总线硬件 */}
      <rect x="40" y="430" width="720" height="44" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <text x="400" y="456" textAnchor="middle" fontSize="13" fontWeight="700" fill="#475569">物理总线：CAN / FlexRay / Ethernet</text>

      {/* 数据流说明 */}
      <rect x="40" y="486" width="720" height="36" rx="8" fill="url(#avc-cs-svc)" opacity="0.06" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="508" textAnchor="middle" fontSize="10" fill="#15803d">发送：SWC 信号 → Com 打包 I-PDU → PduR 路由 → CanIf → Can 驱动 → CAN 总线</text>

      <rect x="40" y="528" width="720" height="36" rx="8" fill="url(#avc-cs-ecu)" opacity="0.06" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="550" textAnchor="middle" fontSize="10" fill="#0369a1">接收：CAN 总线 → Can 驱动 → CanIf → PduR 路由 → Com 解包信号 → RTE → SWC</text>
    </svg>
  );
}
