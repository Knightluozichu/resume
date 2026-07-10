"use client";

export function SoaVehicleArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="车载软件架构演进图">
      <defs>
        <linearGradient id="soa-va-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="soa-va-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="soa-va-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="soa-va-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="soa-va-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">车载软件架构演进</text>

      {/* 四阶段演进 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四阶段架构演进</text>

      {/* 阶段1：分布式ECU */}
      <rect x="20" y="78" width="180" height="130" rx="8" fill="url(#soa-va-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="110" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">阶段一：分布式ECU</text>
      <text x="110" y="120" textAnchor="middle" fontSize="9" fill="#475569">100+ ECU，1功能=1ECU</text>
      <text x="110" y="138" textAnchor="middle" fontSize="9" fill="#475569">CAN/LIN总线</text>
      <text x="110" y="156" textAnchor="middle" fontSize="9" fill="#475569">信号级通信</text>
      <text x="110" y="174" textAnchor="middle" fontSize="9" fill="#475569">紧耦合</text>
      <text x="110" y="196" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">2010年前</text>

      <path d="M202 143 L222 143" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-va-arrow)" />

      {/* 阶段2：域集中 */}
      <rect x="226" y="78" width="180" height="130" rx="8" fill="url(#soa-va-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="316" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">阶段二：域集中</text>
      <text x="316" y="120" textAnchor="middle" fontSize="9" fill="#475569">5-10域控制器</text>
      <text x="316" y="138" textAnchor="middle" fontSize="9" fill="#475569">CAN/CAN-FD</text>
      <text x="316" y="156" textAnchor="middle" fontSize="9" fill="#475569">部分以太网</text>
      <text x="316" y="174" textAnchor="middle" fontSize="9" fill="#475569">信号+服务混合</text>
      <text x="316" y="196" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">2015-2020</text>

      <path d="M408 143 L428 143" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-va-arrow)" />

      {/* 阶段3：区域集中 */}
      <rect x="432" y="78" width="180" height="130" rx="8" fill="url(#soa-va-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="522" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">阶段三：区域集中</text>
      <text x="522" y="120" textAnchor="middle" fontSize="9" fill="#475569">3-5区域控制器</text>
      <text x="522" y="138" textAnchor="middle" fontSize="9" fill="#475569">车载以太网主干</text>
      <text x="522" y="156" textAnchor="middle" fontSize="9" fill="#475569">SOME/IP服务通信</text>
      <text x="522" y="174" textAnchor="middle" fontSize="9" fill="#475569">SOA架构</text>
      <text x="522" y="196" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">2020-2025</text>

      <path d="M614 143 L634 143" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-va-arrow)" />

      {/* 阶段4：中央计算 */}
      <rect x="638" y="78" width="142" height="130" rx="8" fill="url(#soa-va-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="709" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">阶段四：中央计算</text>
      <text x="709" y="120" textAnchor="middle" fontSize="9" fill="#475569">1中央大脑+区域</text>
      <text x="709" y="138" textAnchor="middle" fontSize="9" fill="#475569">高速以太网</text>
      <text x="709" y="156" textAnchor="middle" fontSize="9" fill="#475569">SOA+云原生</text>
      <text x="709" y="174" textAnchor="middle" fontSize="9" fill="#475569">AP+CP融合</text>
      <text x="709" y="196" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">2025+</text>

      {/* CP vs AP 对比 */}
      <text x="400" y="236" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Classic AUTOSAR vs Adaptive AUTOSAR</text>

      <rect x="40" y="250" width="350" height="120" rx="8" fill="url(#soa-va-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="215" y="272" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">Classic Platform (CP)</text>
      <text x="60" y="292" fontSize="9" fill="#475569">- 面向传统控制类ECU（车身/动力）</text>
      <text x="60" y="308" fontSize="9" fill="#475569">- 实时性强，静态配置，资源占用小</text>
      <text x="60" y="324" fontSize="9" fill="#475569">- OSEK OS，无动态内存</text>
      <text x="60" y="340" fontSize="9" fill="#475569">- 信号通信（CAN/LIN/FlexRay）</text>
      <text x="60" y="356" fontSize="9" fill="#475569">- 适合低算力MCU</text>

      <rect x="410" y="250" width="350" height="120" rx="8" fill="url(#soa-va-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="585" y="272" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">Adaptive Platform (AP)</text>
      <text x="430" y="292" fontSize="9" fill="#475569">- 面向高性能ECU（ADAS/座舱）</text>
      <text x="430" y="308" fontSize="9" fill="#475569">- POSIX/Linux/QNX，动态内存</text>
      <text x="430" y="324" fontSize="9" fill="#475569">- 支持多应用/多进程</text>
      <text x="430" y="340" fontSize="9" fill="#475569">- 服务通信（SOME/IP over以太网）</text>
      <text x="430" y="356" fontSize="9" fill="#475569">- 适合高算力SoC</text>

      {/* 驱动因素 */}
      <text x="400" y="398" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">架构演进驱动因素</text>

      <rect x="40" y="412" width="170" height="56" rx="8" fill="url(#soa-va-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="125" y="434" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">算力集中</text>
      <text x="125" y="452" textAnchor="middle" fontSize="9" fill="#475569">SoC替代多MCU</text>

      <rect x="225" y="412" width="170" height="56" rx="8" fill="url(#soa-va-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="310" y="434" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">软件复杂度</text>
      <text x="310" y="452" textAnchor="middle" fontSize="9" fill="#475569">功能指数增长</text>

      <rect x="410" y="412" width="170" height="56" rx="8" fill="url(#soa-va-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="495" y="434" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">OTA升级</text>
      <text x="495" y="452" textAnchor="middle" fontSize="9" fill="#475569">软件可更新</text>

      <rect x="595" y="412" width="165" height="56" rx="8" fill="url(#soa-va-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="677" y="434" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">功能安全</text>
      <text x="677" y="452" textAnchor="middle" fontSize="9" fill="#475569">ASIL合规</text>

      {/* 底部总结 */}
      <rect x="40" y="488" width="720" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="506" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">AP+CP 融合架构</text>
      <text x="400" y="522" textAnchor="middle" fontSize="9" fill="#475569">CP负责实时控制+安全监控 / AP负责AI算法+服务通信 / 以太网SOME/IP互连</text>

      <rect x="40" y="542" width="720" height="28" rx="8" fill="url(#soa-va-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">演进主线：分布式 → 域集中 → 区域集中 → 中央计算（SOA贯穿全程）</text>
    </svg>
  );
}
