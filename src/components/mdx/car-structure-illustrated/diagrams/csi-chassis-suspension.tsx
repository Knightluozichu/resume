"use client";

export function CsiChassisSuspensionDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="底盘与悬架：四大悬架类型与底盘四大系统">
      <defs>
        <linearGradient id="csi-cs-mac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="csi-cs-multi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="csi-cs-torsion" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="csi-cs-leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="csi-cs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">底盘与悬架系统</text>

      {/* 底盘四大系统 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">底盘四大系统</text>

      <rect x="30" y="76" width="170" height="64" rx="8" fill="url(#csi-cs-mac)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="115" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">传动系统</text>
      <text x="115" y="116" textAnchor="middle" fontSize="9" fill="#475569">离合器/变速器/传动轴</text>
      <text x="115" y="130" textAnchor="middle" fontSize="9" fill="#475569">传递动力至驱动轮</text>

      <rect x="220" y="76" width="170" height="64" rx="8" fill="url(#csi-cs-multi)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="305" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">行驶系统</text>
      <text x="305" y="116" textAnchor="middle" fontSize="9" fill="#475569">车架/车桥/悬架/车轮</text>
      <text x="305" y="130" textAnchor="middle" fontSize="9" fill="#475569">支撑整车缓冲振动</text>

      <rect x="410" y="76" width="170" height="64" rx="8" fill="url(#csi-cs-torsion)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="495" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">转向系统</text>
      <text x="495" y="116" textAnchor="middle" fontSize="9" fill="#475569">方向盘/转向器/拉杆</text>
      <text x="495" y="130" textAnchor="middle" fontSize="9" fill="#475569">改变行驶方向</text>

      <rect x="600" y="76" width="170" height="64" rx="8" fill="url(#csi-cs-leaf)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="685" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">制动系统</text>
      <text x="685" y="116" textAnchor="middle" fontSize="9" fill="#475569">刹车盘/卡钳/ABS</text>
      <text x="685" y="130" textAnchor="middle" fontSize="9" fill="#475569">减速停车保障安全</text>

      {/* 四种悬架类型 */}
      <text x="400" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四种独立悬架类型</text>

      {/* 麦弗逊悬架 */}
      <rect x="30" y="184" width="175" height="150" rx="8" fill="url(#csi-cs-mac)" opacity="0.1" stroke="#0ea5e9" strokeWidth="2" />
      <text x="117" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">麦弗逊式</text>
      <line x1="117" y1="220" x2="117" y2="265" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="108" y="265" width="18" height="30" rx="4" fill="#0ea5e9" opacity="0.4" />
      <circle cx="117" cy="302" r="8" fill="#0ea5e9" opacity="0.6" />
      <text x="117" y="325" textAnchor="middle" fontSize="9" fill="#475569">结构简单紧凑</text>
      <text x="117" y="338" textAnchor="middle" fontSize="9" fill="#475569">前驱车广泛使用</text>

      {/* 双叉臂悬架 */}
      <rect x="220" y="184" width="175" height="150" rx="8" fill="url(#csi-cs-multi)" opacity="0.1" stroke="#16a34a" strokeWidth="2" />
      <text x="307" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">双叉臂式</text>
      <line x1="280" y1="225" x2="335" y2="245" stroke="#16a34a" strokeWidth="2" />
      <line x1="280" y1="270" x2="335" y2="285" stroke="#16a34a" strokeWidth="2" />
      <rect x="298" y="250" width="18" height="22" rx="4" fill="#16a34a" opacity="0.4" />
      <text x="307" y="325" textAnchor="middle" fontSize="9" fill="#475569">操控精准</text>
      <text x="307" y="338" textAnchor="middle" fontSize="9" fill="#475569">运动车型首选</text>

      {/* 多连杆悬架 */}
      <rect x="410" y="184" width="175" height="150" rx="8" fill="url(#csi-cs-torsion)" opacity="0.1" stroke="#ca8a04" strokeWidth="2" />
      <text x="497" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">多连杆式</text>
      <line x1="460" y1="225" x2="497" y2="265" stroke="#ca8a04" strokeWidth="1.5" />
      <line x1="480" y1="225" x2="497" y2="265" stroke="#ca8a04" strokeWidth="1.5" />
      <line x1="515" y1="225" x2="497" y2="265" stroke="#ca8a04" strokeWidth="1.5" />
      <line x1="535" y1="225" x2="497" y2="265" stroke="#ca8a04" strokeWidth="1.5" />
      <rect x="488" y="265" width="18" height="22" rx="4" fill="#ca8a04" opacity="0.4" />
      <text x="497" y="325" textAnchor="middle" fontSize="9" fill="#475569">舒适性好</text>
      <text x="497" y="338" textAnchor="middle" fontSize="9" fill="#475569">定位可调性强</text>

      {/* 扭力梁悬架 */}
      <rect x="600" y="184" width="175" height="150" rx="8" fill="url(#csi-cs-leaf)" opacity="0.1" stroke="#9333ea" strokeWidth="2" />
      <text x="687" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">扭力梁式</text>
      <rect x="630" y="250" width="120" height="14" rx="4" fill="#9333ea" opacity="0.3" stroke="#9333ea" strokeWidth="1.5" />
      <circle cx="645" cy="290" r="8" fill="#9333ea" opacity="0.5" />
      <circle cx="735" cy="290" r="8" fill="#9333ea" opacity="0.5" />
      <text x="687" y="325" textAnchor="middle" fontSize="9" fill="#475569">非独立悬架</text>
      <text x="687" y="338" textAnchor="middle" fontSize="9" fill="#475569">成本低空间小</text>

      {/* 悬架核心组成 */}
      <text x="400" y="360" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">悬架核心组成</text>

      <rect x="30" y="374" width="180" height="64" rx="8" fill="url(#csi-cs-mac)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="396" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">弹性元件</text>
      <text x="120" y="414" textAnchor="middle" fontSize="9" fill="#475569">螺旋弹簧/钢板弹簧</text>
      <text x="120" y="428" textAnchor="middle" fontSize="9" fill="#475569">吸收冲击能量</text>

      <rect x="225" y="374" width="180" height="64" rx="8" fill="url(#csi-cs-multi)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="315" y="396" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">减振器</text>
      <text x="315" y="414" textAnchor="middle" fontSize="9" fill="#475569">筒式液压减振</text>
      <text x="315" y="428" textAnchor="middle" fontSize="9" fill="#475569">抑制弹簧振荡</text>

      <rect x="420" y="374" width="180" height="64" rx="8" fill="url(#csi-cs-torsion)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="510" y="396" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">导向机构</text>
      <text x="510" y="414" textAnchor="middle" fontSize="9" fill="#475569">控制臂/摆臂/拉杆</text>
      <text x="510" y="428" textAnchor="middle" fontSize="9" fill="#475569">控制车轮运动轨迹</text>

      <rect x="615" y="374" width="155" height="64" rx="8" fill="url(#csi-cs-leaf)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="692" y="396" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">横向稳定杆</text>
      <text x="692" y="414" textAnchor="middle" fontSize="9" fill="#475569">抑制车身侧倾</text>
      <text x="692" y="428" textAnchor="middle" fontSize="9" fill="#475569">过弯稳定性</text>

      {/* 底部总结 */}
      <rect x="30" y="458" width="740" height="36" rx="8" fill="url(#csi-cs-mac)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="480" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">悬架作用：支撑车身 + 缓冲冲击 + 抑制振荡 + 保证轮胎接地 + 控制车轮运动轨迹</text>

      <rect x="30" y="504" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="524" textAnchor="middle" fontSize="11" fill="#475569">独立悬架（两侧车轮独立运动）vs 非独立悬架（两侧车轮刚性连接），舒适性与成本的核心权衡</text>
    </svg>
  );
}
