"use client";

export function CsiElectricalElectronicsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="电气与电子系统：电源系统与ECU网络架构">
      <defs>
        <linearGradient id="csi-ee-power" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="csi-ee-ecu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="csi-ee-can" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="csi-ee-sensor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="csi-ee-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">电气与电子系统</text>

      {/* 电源系统 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">电源系统（12V/48V）</text>

      <rect x="30" y="76" width="100" height="56" rx="8" fill="url(#csi-ee-power)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">蓄电池</text>
      <text x="80" y="118" textAnchor="middle" fontSize="9" fill="#475569">12V 铅酸</text>

      <path d="M130 104 L152 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-ee-arrow)" />

      <rect x="156" y="76" width="100" height="56" rx="8" fill="url(#csi-ee-power)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="206" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">发电机</text>
      <text x="206" y="118" textAnchor="middle" fontSize="9" fill="#475569">发动机驱动</text>

      <path d="M256 104 L278 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-ee-arrow)" />

      <rect x="282" y="76" width="100" height="56" rx="8" fill="url(#csi-ee-power)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="332" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">调节器</text>
      <text x="332" y="118" textAnchor="middle" fontSize="9" fill="#475569">稳压 13.8-14.4V</text>

      <path d="M382 104 L404 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-ee-arrow)" />

      <rect x="408" y="76" width="180" height="56" rx="8" fill="url(#csi-ee-power)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="498" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">用电设备</text>
      <text x="498" y="118" textAnchor="middle" fontSize="9" fill="#475569">灯光/音响/ECU/雨刮</text>

      <rect x="608" y="76" width="160" height="56" rx="8" fill="url(#csi-ee-power)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="688" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">保险丝盒</text>
      <text x="688" y="118" textAnchor="middle" fontSize="9" fill="#475569">过流保护</text>

      {/* ECU 网络 */}
      <text x="400" y="164" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">ECU 电子控制单元网络</text>

      <rect x="30" y="178" width="740" height="120" rx="8" fill="url(#csi-ee-can)" opacity="0.06" stroke="#ca8a04" strokeWidth="1.5" />

      <rect x="50" y="192" width="120" height="44" rx="6" fill="url(#csi-ee-ecu)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="110" y="214" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">发动机 ECU</text>
      <text x="110" y="228" textAnchor="middle" fontSize="9" fill="#475569">ECM 喷油点火</text>

      <rect x="190" y="192" width="120" height="44" rx="6" fill="url(#csi-ee-ecu)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="250" y="214" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">变速箱 ECU</text>
      <text x="250" y="228" textAnchor="middle" fontSize="9" fill="#475569">TCM 换挡控制</text>

      <rect x="330" y="192" width="120" height="44" rx="6" fill="url(#csi-ee-ecu)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="390" y="214" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">ABS ECU</text>
      <text x="390" y="228" textAnchor="middle" fontSize="9" fill="#475569">制动防抱死</text>

      <rect x="470" y="192" width="120" height="44" rx="6" fill="url(#csi-ee-ecu)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="530" y="214" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">车身 ECU</text>
      <text x="530" y="228" textAnchor="middle" fontSize="9" fill="#475569">BCM 车身控制</text>

      <rect x="610" y="192" width="140" height="44" rx="6" fill="url(#csi-ee-ecu)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="680" y="214" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">空调 ECU</text>
      <text x="680" y="228" textAnchor="middle" fontSize="9" fill="#475569">HVAC 温控</text>

      {/* CAN 总线连接 */}
      <line x1="50" y1="258" x2="750" y2="258" stroke="#ca8a04" strokeWidth="3" opacity="0.6" />
      <text x="400" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">CAN 总线（高速 500kbps / 低速 125kbps）</text>

      {/* 传感器与执行器 */}
      <text x="400" y="324" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">传感器 → ECU → 执行器闭环</text>

      <rect x="30" y="338" width="220" height="80" rx="8" fill="url(#csi-ee-sensor)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="140" y="360" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">传感器（感知）</text>
      <text x="140" y="378" textAnchor="middle" fontSize="9" fill="#475569">氧传感器/曲轴位置</text>
      <text x="140" y="394" textAnchor="middle" fontSize="9" fill="#475569">温度/压力/节气门</text>
      <text x="140" y="410" textAnchor="middle" fontSize="9" fill="#475569">轮速/加速度/陀螺仪</text>

      <path d="M250 378 L282 378" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-ee-arrow)" />

      <rect x="286" y="338" width="220" height="80" rx="8" fill="url(#csi-ee-ecu)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="396" y="360" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">ECU（决策）</text>
      <text x="396" y="378" textAnchor="middle" fontSize="9" fill="#475569">信号采集与处理</text>
      <text x="396" y="394" textAnchor="middle" fontSize="9" fill="#475569">算法运算与判断</text>
      <text x="396" y="410" textAnchor="middle" fontSize="9" fill="#475569">输出控制指令</text>

      <path d="M506 378 L538 378" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-ee-arrow)" />

      <rect x="542" y="338" width="220" height="80" rx="8" fill="url(#csi-ee-can)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="652" y="360" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">执行器（动作）</text>
      <text x="652" y="378" textAnchor="middle" fontSize="9" fill="#475569">喷油器/点火线圈</text>
      <text x="652" y="394" textAnchor="middle" fontSize="9" fill="#475569">节气门电机/电磁阀</text>
      <text x="652" y="410" textAnchor="middle" fontSize="9" fill="#475569">继电器/泵电机</text>

      {/* 底部总结 */}
      <rect x="30" y="440" width="740" height="36" rx="8" fill="url(#csi-ee-power)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="462" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">现代汽车含 50-100 个 ECU，通过 CAN/LIN/FlexRay/Ethernet 总线互联，实现分布式控制</text>

      <rect x="30" y="486" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="506" textAnchor="middle" fontSize="11" fill="#475569">电气化趋势：12V 到 48V 轻混、中央域控制器替代分布式 ECU、车载以太网支撑高带宽应用</text>

      <rect x="30" y="526" width="740" height="24" rx="8" fill="url(#csi-ee-ecu)" opacity="0.08" />
      <text x="400" y="542" textAnchor="middle" fontSize="10" fill="#15803d">核心闭环：传感器感知状态 → ECU 运算决策 → 执行器控制动作 → 传感器反馈验证</text>
    </svg>
  );
}
