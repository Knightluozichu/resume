"use client";

export function AvcApplicationLayerDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="AUTOSAR应用层与SWC软件组件模型图">
      <defs>
        <linearGradient id="avc-al-swc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="avc-al-port" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="avc-al-rte" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="avc-al-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">应用层与 SWC 软件组件模型</text>

      {/* SWC 内部结构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7e22ce">SWC 内部结构</text>

      <rect x="40" y="72" width="720" height="200" rx="10" fill="url(#avc-al-swc)" opacity="0.06" stroke="#9333ea" strokeWidth="2" />

      {/* SWC-A */}
      <rect x="70" y="86" width="300" height="170" rx="8" fill="url(#avc-al-swc)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="220" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7e22ce">应用软件组件 Application SWC</text>

      {/* PPort */}
      <rect x="330" y="120" width="30" height="24" rx="4" fill="url(#avc-al-port)" opacity="0.9" />
      <text x="345" y="136" textAnchor="middle" fontSize="8" fontWeight="600" fill="#fff">P</text>
      <text x="372" y="136" fontSize="9" fill="#0369a1">PPort</text>

      {/* RPort */}
      <rect x="80" y="120" width="30" height="24" rx="4" fill="url(#avc-al-port)" opacity="0.9" />
      <text x="95" y="136" textAnchor="middle" fontSize="8" fontWeight="600" fill="#fff">R</text>
      <text x="62" y="136" fontSize="9" fill="#0369a1">RPort</text>

      {/* Runnable */}
      <rect x="100" y="156" width="240" height="30" rx="6" fill="#fff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="220" y="176" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">Runnable: Init</text>

      <rect x="100" y="194" width="240" height="30" rx="6" fill="#fff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="220" y="214" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">Runnable: Run (周期触发)</text>

      <rect x="100" y="232" width="240" height="22" rx="6" fill="#fff" stroke="#9333ea" strokeWidth="1" />
      <text x="220" y="248" textAnchor="middle" fontSize="9" fill="#7e22ce">内部行为 Internal Behavior</text>

      {/* SWC-B */}
      <rect x="430" y="86" width="300" height="170" rx="8" fill="url(#avc-al-swc)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="580" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7e22ce">传感器组件 Sensor SWC</text>

      <rect x="690" y="120" width="30" height="24" rx="4" fill="url(#avc-al-port)" opacity="0.9" />
      <text x="705" y="136" textAnchor="middle" fontSize="8" fontWeight="600" fill="#fff">P</text>

      <rect x="440" y="120" width="30" height="24" rx="4" fill="url(#avc-al-port)" opacity="0.9" />
      <text x="455" y="136" textAnchor="middle" fontSize="8" fontWeight="600" fill="#fff">R</text>

      <rect x="460" y="156" width="240" height="30" rx="6" fill="#fff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="580" y="176" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">Runnable: ReadSensor</text>

      <rect x="460" y="194" width="240" height="30" rx="6" fill="#fff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="580" y="214" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">Runnable: FilterData</text>

      <rect x="460" y="232" width="240" height="22" rx="6" fill="#fff" stroke="#9333ea" strokeWidth="1" />
      <text x="580" y="248" textAnchor="middle" fontSize="9" fill="#7e22ce">数据过滤与标定</text>

      {/* 通信连接 */}
      <path d="M360 132 L440 132" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#avc-al-arrow)" />
      <text x="400" y="126" textAnchor="middle" fontSize="8" fill="#0369a1">S/R</text>

      {/* 端口类型 */}
      <text x="400" y="294" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0369a1">端口与接口类型</text>

      <rect x="40" y="304" width="720" height="100" rx="10" fill="url(#avc-al-port)" opacity="0.06" stroke="#0ea5e9" strokeWidth="2" />

      <rect x="60" y="316" width="160" height="36" rx="8" fill="url(#avc-al-port)" opacity="0.8" />
      <text x="140" y="339" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">S/R 发送接收</text>

      <rect x="240" y="316" width="160" height="36" rx="8" fill="url(#avc-al-port)" opacity="0.8" />
      <text x="320" y="339" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">C/S 客户端服务端</text>

      <rect x="420" y="316" width="160" height="36" rx="8" fill="url(#avc-al-port)" opacity="0.8" />
      <text x="500" y="339" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">Mode Switch</text>

      <rect x="600" y="316" width="140" height="36" rx="8" fill="url(#avc-al-port)" opacity="0.8" />
      <text x="670" y="339" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">NV Data</text>

      <rect x="60" y="360" width="340" height="36" rx="8" fill="#fff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="230" y="383" textAnchor="middle" fontSize="9" fill="#0369a1">PPort：提供数据/服务（Provider）</text>

      <rect x="420" y="360" width="320" height="36" rx="8" fill="#fff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="580" y="383" textAnchor="middle" fontSize="9" fill="#0369a1">RPort：需求数据/服务（Requirer）</text>

      {/* SWC 类型 */}
      <text x="400" y="426" textAnchor="middle" fontSize="14" fontWeight="700" fill="#15803d">SWC 类型分类</text>

      <rect x="60" y="438" width="680" height="50" rx="8" fill="url(#avc-al-rte)" opacity="0.06" stroke="#16a34a" strokeWidth="1.5" />

      <rect x="80" y="448" width="120" height="30" rx="6" fill="url(#avc-al-rte)" opacity="0.75" />
      <text x="140" y="468" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">Application</text>

      <rect x="210" y="448" width="120" height="30" rx="6" fill="url(#avc-al-rte)" opacity="0.75" />
      <text x="270" y="468" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">Sensor/Actuator</text>

      <rect x="340" y="448" width="120" height="30" rx="6" fill="url(#avc-al-rte)" opacity="0.75" />
      <text x="400" y="468" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">Service</text>

      <rect x="470" y="448" width="120" height="30" rx="6" fill="url(#avc-al-rte)" opacity="0.75" />
      <text x="530" y="468" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">Parameter</text>

      <rect x="600" y="448" width="120" height="30" rx="6" fill="url(#avc-al-rte)" opacity="0.75" />
      <text x="660" y="468" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">ECU Abstraction</text>

      {/* 底部总结 */}
      <rect x="40" y="504" width="720" height="40" rx="8" fill="url(#avc-al-swc)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="528" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">SWC = 端口(Port) + 内部行为(Runnable) + 接口(Interface) → ARXML 描述 → RTE 生成调度代码</text>
    </svg>
  );
}
