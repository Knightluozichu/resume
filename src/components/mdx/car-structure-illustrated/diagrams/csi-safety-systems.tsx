"use client";

export function CsiSafetySystemsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="安全系统：主动安全与被动安全系统">
      <defs>
        <linearGradient id="csi-ss-active" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="csi-ss-passive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="csi-ss-adas" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="csi-ss-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">安全系统：主动与被动防护</text>

      {/* 主动安全 vs 被动安全 */}
      <text x="200" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0369a1">主动安全（预防事故）</text>
      <text x="600" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#b91c1c">被动安全（减轻伤害）</text>

      {/* 主动安全 */}
      <rect x="30" y="76" width="370" height="230" rx="8" fill="url(#csi-ss-active)" opacity="0.06" stroke="#0ea5e9" strokeWidth="1.5" />

      <rect x="50" y="90" width="160" height="48" rx="6" fill="url(#csi-ss-active)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="130" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">ABS 防抱死</text>
      <text x="130" y="128" textAnchor="middle" fontSize="9" fill="#475569">制动时保持转向能力</text>

      <rect x="220" y="90" width="160" height="48" rx="6" fill="url(#csi-ss-active)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="300" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">EBD 制动力分配</text>
      <text x="300" y="128" textAnchor="middle" fontSize="9" fill="#475569">前后轮制动力优化</text>

      <rect x="50" y="148" width="160" height="48" rx="6" fill="url(#csi-ss-active)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="130" y="170" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">ESC 车身稳定</text>
      <text x="130" y="186" textAnchor="middle" fontSize="9" fill="#475569">防侧滑/甩尾</text>

      <rect x="220" y="148" width="160" height="48" rx="6" fill="url(#csi-ss-active)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="300" y="170" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">TCS 牵引力控制</text>
      <text x="300" y="186" textAnchor="middle" fontSize="9" fill="#475569">防驱动轮打滑</text>

      <rect x="50" y="206" width="160" height="48" rx="6" fill="url(#csi-ss-active)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="130" y="228" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">BA 制动辅助</text>
      <text x="130" y="244" textAnchor="middle" fontSize="9" fill="#475569">紧急制动增压</text>

      <rect x="220" y="206" width="160" height="48" rx="6" fill="url(#csi-ss-active)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="300" y="228" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">TPMS 胎压监测</text>
      <text x="300" y="244" textAnchor="middle" fontSize="9" fill="#475569">实时胎压预警</text>

      <text x="215" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">核心目标：避免事故发生</text>
      <text x="215" y="296" textAnchor="middle" fontSize="9" fill="#64748b">通过电子系统实时监测干预车辆动态</text>

      {/* 被动安全 */}
      <rect x="410" y="76" width="360" height="230" rx="8" fill="url(#csi-ss-passive)" opacity="0.06" stroke="#dc2626" strokeWidth="1.5" />

      <rect x="430" y="90" width="150" height="48" rx="6" fill="url(#csi-ss-passive)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="505" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">安全带</text>
      <text x="505" y="128" textAnchor="middle" fontSize="9" fill="#475569">预紧器+限力器</text>

      <rect x="590" y="90" width="160" height="48" rx="6" fill="url(#csi-ss-passive)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="670" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">安全气囊</text>
      <text x="670" y="128" textAnchor="middle" fontSize="9" fill="#475569">正面/侧面/窗帘/膝部</text>

      <rect x="430" y="148" width="150" height="48" rx="6" fill="url(#csi-ss-passive)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="505" y="170" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">车身刚性结构</text>
      <text x="505" y="186" textAnchor="middle" fontSize="9" fill="#475569">高强度钢乘员舱</text>

      <rect x="590" y="148" width="160" height="48" rx="6" fill="url(#csi-ss-passive)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="670" y="170" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">溃缩吸能区</text>
      <text x="670" y="186" textAnchor="middle" fontSize="9" fill="#475569">前后纵梁变形吸能</text>

      <rect x="430" y="206" width="150" height="48" rx="6" fill="url(#csi-ss-passive)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="505" y="228" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">车门防撞梁</text>
      <text x="505" y="244" textAnchor="middle" fontSize="9" fill="#475569">侧面碰撞防护</text>

      <rect x="590" y="206" width="160" height="48" rx="6" fill="url(#csi-ss-passive)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="670" y="228" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">头枕/座椅</text>
      <text x="670" y="244" textAnchor="middle" fontSize="9" fill="#475569">防鞭打+固定保护</text>

      <text x="590" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">核心目标：事故时保护乘员</text>
      <text x="590" y="296" textAnchor="middle" fontSize="9" fill="#64748b">通过结构变形与约束系统减轻冲击</text>

      {/* ADAS 高级驾驶辅助 */}
      <text x="400" y="332" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">ADAS 高级驾驶辅助系统（主动安全进阶）</text>

      <rect x="30" y="346" width="740" height="100" rx="8" fill="url(#csi-ss-adas)" opacity="0.06" stroke="#16a34a" strokeWidth="1.5" />

      <rect x="50" y="358" width="140" height="76" rx="6" fill="url(#csi-ss-adas)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="120" y="380" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">ACC 自适应巡航</text>
      <text x="120" y="398" textAnchor="middle" fontSize="9" fill="#475569">雷达/摄像头</text>
      <text x="120" y="414" textAnchor="middle" fontSize="9" fill="#475569">自动跟车保持</text>
      <text x="120" y="428" textAnchor="middle" fontSize="9" fill="#475569">车距控制</text>

      <rect x="200" y="358" width="140" height="76" rx="6" fill="url(#csi-ss-adas)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="270" y="380" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">AEB 自动刹车</text>
      <text x="270" y="398" textAnchor="middle" fontSize="9" fill="#475569">前向碰撞预警</text>
      <text x="270" y="414" textAnchor="middle" fontSize="9" fill="#475569">紧急自动制动</text>
      <text x="270" y="428" textAnchor="middle" fontSize="9" fill="#475569">避免追尾</text>

      <rect x="350" y="358" width="140" height="76" rx="6" fill="url(#csi-ss-adas)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="420" y="380" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">LKA 车道保持</text>
      <text x="420" y="398" textAnchor="middle" fontSize="9" fill="#475569">车道偏离预警</text>
      <text x="420" y="414" textAnchor="middle" fontSize="9" fill="#475569">转向辅助纠偏</text>
      <text x="420" y="428" textAnchor="middle" fontSize="9" fill="#475569">居中行驶</text>

      <rect x="500" y="358" width="140" height="76" rx="6" fill="url(#csi-ss-adas)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="570" y="380" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">BSD 盲区监测</text>
      <text x="570" y="398" textAnchor="middle" fontSize="9" fill="#475569">侧后方雷达</text>
      <text x="570" y="414" textAnchor="middle" fontSize="9" fill="#475569">变道辅助</text>
      <text x="570" y="428" textAnchor="middle" fontSize="9" fill="#475569">后方来车预警</text>

      <rect x="650" y="358" width="110" height="76" rx="6" fill="url(#csi-ss-adas)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="705" y="380" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">APA 自动泊车</text>
      <text x="705" y="398" textAnchor="middle" fontSize="9" fill="#475569">超声波雷达</text>
      <text x="705" y="414" textAnchor="middle" fontSize="9" fill="#475569">车位识别</text>
      <text x="705" y="428" textAnchor="middle" fontSize="9" fill="#475569">自动转向泊入</text>

      {/* 底部总结 */}
      <rect x="30" y="468" width="740" height="36" rx="8" fill="url(#csi-ss-active)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="490" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">安全理念：主动预防优先于被动保护，从「减少事故」到「避免事故」到「零伤亡」层层递进</text>

      <rect x="30" y="514" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="534" textAnchor="middle" fontSize="11" fill="#475569">主动安全（ABS/ESC/ADAS）预防事故 → 被动安全（安全带/气囊/车身结构）减轻伤害，两者协同构成完整安全体系</text>
    </svg>
  );
}
