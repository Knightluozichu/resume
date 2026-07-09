"use client";

export function CsiSteeringBrakingDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="转向与制动系统：转向原理与制动系统组成">
      <defs>
        <linearGradient id="csi-sb-steer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="csi-sb-brake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="csi-sb-abs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="csi-sb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">转向与制动系统</text>

      {/* 转向系统 */}
      <text x="200" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">转向系统</text>

      <rect x="30" y="76" width="350" height="200" rx="8" fill="url(#csi-sb-steer)" opacity="0.06" stroke="#0ea5e9" strokeWidth="1.5" />

      {/* 转向传递路径 */}
      <rect x="50" y="90" width="100" height="40" rx="6" fill="url(#csi-sb-steer)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="114" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">方向盘</text>

      <path d="M150 110 L172 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-sb-arrow)" />

      <rect x="176" y="90" width="100" height="40" rx="6" fill="url(#csi-sb-steer)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="226" y="114" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">转向柱</text>

      <path d="M276 110 L298 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-sb-arrow)" />

      <rect x="50" y="145" width="100" height="40" rx="6" fill="url(#csi-sb-steer)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="169" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">转向器</text>

      <path d="M100 135 L100 143" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-sb-arrow)" />

      <path d="M150 165 L172 165" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-sb-arrow)" />

      <rect x="176" y="145" width="100" height="40" rx="6" fill="url(#csi-sb-steer)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="226" y="169" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">横拉杆</text>

      <path d="M276 165 L298 165" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-sb-arrow)" />

      <rect x="302" y="145" width="70" height="40" rx="6" fill="url(#csi-sb-steer)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="337" y="169" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">转向节</text>

      {/* 转向类型 */}
      <text x="205" y="212" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">两种助力转向</text>
      <text x="205" y="232" textAnchor="middle" fontSize="9" fill="#475569">EPS 电动助力：电机辅助转向轻便节能</text>
      <text x="205" y="248" textAnchor="middle" fontSize="9" fill="#475569">EHPS 电液助力：液压泵由电机驱动</text>
      <text x="205" y="266" textAnchor="middle" fontSize="9" fill="#475569">转向比 = 方向盘转角 / 车轮转角</text>

      {/* 制动系统 */}
      <text x="580" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">制动系统</text>

      <rect x="410" y="76" width="360" height="200" rx="8" fill="url(#csi-sb-brake)" opacity="0.06" stroke="#dc2626" strokeWidth="1.5" />

      {/* 制动传递路径 */}
      <rect x="430" y="90" width="90" height="40" rx="6" fill="url(#csi-sb-brake)" opacity="0.15" stroke="#dc2626" strokeWidth="1.5" />
      <text x="475" y="114" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">制动踏板</text>

      <path d="M520 110 L542 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-sb-arrow)" />

      <rect x="546" y="90" width="90" height="40" rx="6" fill="url(#csi-sb-brake)" opacity="0.15" stroke="#dc2626" strokeWidth="1.5" />
      <text x="591" y="114" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">制动主缸</text>

      <path d="M636 110 L658 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-sb-arrow)" />

      <rect x="662" y="90" width="90" height="40" rx="6" fill="url(#csi-sb-brake)" opacity="0.15" stroke="#dc2626" strokeWidth="1.5" />
      <text x="707" y="114" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">制动液</text>

      {/* 制动器类型 */}
      <text x="590" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">两种制动器</text>

      <rect x="430" y="170" width="160" height="56" rx="6" fill="url(#csi-sb-brake)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="510" y="190" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">盘式制动器</text>
      <text x="510" y="206" textAnchor="middle" fontSize="9" fill="#475569">刹车盘 + 卡钳</text>
      <text x="510" y="220" textAnchor="middle" fontSize="9" fill="#475569">散热好响应快</text>

      <rect x="600" y="170" width="160" height="56" rx="6" fill="url(#csi-sb-brake)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="680" y="190" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">鼓式制动器</text>
      <text x="680" y="206" textAnchor="middle" fontSize="9" fill="#475569">制动鼓 + 制动蹄</text>
      <text x="680" y="220" textAnchor="middle" fontSize="9" fill="#475569">制动力大成本低</text>

      {/* 制动辅助系统 */}
      <text x="590" y="248" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">电子辅助系统</text>
      <text x="590" y="266" textAnchor="middle" fontSize="9" fill="#475569">ABS 防抱死 / EBD 电子制动力分配</text>

      {/* ABS 工作原理 */}
      <text x="400" y="304" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">ABS 防抱死制动系统工作原理</text>

      <rect x="30" y="318" width="230" height="100" rx="8" fill="url(#csi-sb-abs)" opacity="0.1" stroke="#16a34a" strokeWidth="2" />
      <text x="145" y="340" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">阶段一：增压</text>
      <text x="145" y="360" textAnchor="middle" fontSize="9" fill="#475569">踩下踏板制动压力增大</text>
      <text x="145" y="376" textAnchor="middle" fontSize="9" fill="#475569">车轮减速正常制动</text>
      <text x="145" y="396" textAnchor="middle" fontSize="9" fill="#15803d">压力上升</text>

      <path d="M260 368 L282 368" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-sb-arrow)" />

      <rect x="286" y="318" width="230" height="100" rx="8" fill="url(#csi-sb-abs)" opacity="0.1" stroke="#16a34a" strokeWidth="2" />
      <text x="401" y="340" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">阶段二：保压</text>
      <text x="401" y="360" textAnchor="middle" fontSize="9" fill="#475569">车轮接近抱死临界点</text>
      <text x="401" y="376" textAnchor="middle" fontSize="9" fill="#475569">ABS 阀保持压力不变</text>
      <text x="401" y="396" textAnchor="middle" fontSize="9" fill="#15803d">压力恒定</text>

      <path d="M516 368 L538 368" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-sb-arrow)" />

      <rect x="542" y="318" width="230" height="100" rx="8" fill="url(#csi-sb-abs)" opacity="0.1" stroke="#16a34a" strokeWidth="2" />
      <text x="657" y="340" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">阶段三：减压</text>
      <text x="657" y="360" textAnchor="middle" fontSize="9" fill="#475569">车轮滑移率超阈值</text>
      <text x="657" y="376" textAnchor="middle" fontSize="9" fill="#475569">ABS 阀减压防止抱死</text>
      <text x="657" y="396" textAnchor="middle" fontSize="9" fill="#15803d">压力下降</text>

      <path d="M657 418 L657 426" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-sb-arrow)" />
      <path d="M657 426 L400 426 L400 418" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-sb-arrow)" />
      <text x="528" y="442" textAnchor="middle" fontSize="9" fill="#64748b">循环（每秒约 15-20 次）</text>

      {/* 底部总结 */}
      <rect x="30" y="458" width="740" height="36" rx="8" fill="url(#csi-sb-steer)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="480" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">转向：改变行驶方向；制动：减速停车。两者共同决定汽车的操控性与主动安全</text>

      <rect x="30" y="504" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="524" textAnchor="middle" fontSize="11" fill="#475569">ABS 核心目标：在紧急制动时保持车轮滚动而非滑动，维持转向能力，缩短制动距离</text>
    </svg>
  );
}
