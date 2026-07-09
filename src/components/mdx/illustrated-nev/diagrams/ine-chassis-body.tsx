"use client";

export function IneChassisBodyDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="底盘与车身架构：平台化设计与滑板底盘">
      <defs>
        <linearGradient id="ine-cb-platform" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ine-cb-skate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="ine-cb-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="ine-cb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">底盘与车身架构：平台化设计</text>

      {/* 传统平台 vs 纯电平台 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">传统燃油平台 vs 纯电专属平台</text>

      {/* 传统燃油平台 */}
      <rect x="20" y="74" width="360" height="140" rx="10" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" opacity="0.6" />
      <rect x="20" y="74" width="360" height="28" rx="10" fill="#ca8a04" opacity="0.8" />
      <text x="200" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">传统燃油平台（油改电）</text>

      <rect x="40" y="112" width="150" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="115" y="130" textAnchor="middle" fontSize="9" fill="#a16207">发动机舱（前部）</text>

      <rect x="200" y="112" width="80" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="240" y="130" textAnchor="middle" fontSize="9" fill="#a16207">变速箱</text>

      <rect x="290" y="112" width="80" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="330" y="130" textAnchor="middle" fontSize="9" fill="#a16207">油箱位置</text>

      <rect x="40" y="148" width="150" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="115" y="166" textAnchor="middle" fontSize="9" fill="#a16207">排气管（底部贯穿）</text>

      <rect x="200" y="148" width="170" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="285" y="166" textAnchor="middle" fontSize="9" fill="#a16207">传动轴（中央通道）</text>

      <rect x="40" y="184" width="320" height="22" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="200" y="200" textAnchor="middle" fontSize="9" fill="#a16207">电池包受限于底盘形状，空间利用率低</text>

      {/* 纯电专属平台 */}
      <rect x="420" y="74" width="360" height="140" rx="10" fill="url(#ine-cb-platform)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="420" y="74" width="360" height="28" rx="10" fill="url(#ine-cb-platform)" opacity="0.9" />
      <text x="600" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">纯电专属平台</text>

      <rect x="440" y="112" width="100" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="490" y="130" textAnchor="middle" fontSize="9" fill="#0369a1">前备箱（储物）</text>

      <rect x="550" y="112" width="100" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="600" y="130" textAnchor="middle" fontSize="9" fill="#0369a1">电驱系统（紧凑）</text>

      <rect x="660" y="112" width="100" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="710" y="130" textAnchor="middle" fontSize="9" fill="#0369a1">后备箱（大）</text>

      <rect x="440" y="148" width="320" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="600" y="166" textAnchor="middle" fontSize="9" fill="#0369a1">平整电池包（满铺底盘，无中央通道）</text>

      <rect x="440" y="184" width="320" height="22" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="600" y="200" textAnchor="middle" fontSize="9" fill="#0369a1">轴距加长 · 重心降低 · 空间利用率高</text>

      {/* 滑板底盘 */}
      <text x="400" y="238" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">滑板底盘架构</text>

      <rect x="20" y="250" width="760" height="100" rx="10" fill="url(#ine-cb-skate)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />

      {/* 滑板底盘示意 */}
      <rect x="60" y="262" width="680" height="40" rx="8" fill="url(#ine-cb-skate)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="287" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">滑板底盘（电池+电机+底盘一体化）</text>

      <rect x="60" y="310" width="120" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="120" y="328" textAnchor="middle" fontSize="9" fill="#15803d">前轮转向/驱动</text>

      <rect x="190" y="310" width="140" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="260" y="328" textAnchor="middle" fontSize="9" fill="#15803d">CTC 电池即底盘</text>

      <rect x="340" y="310" width="140" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="410" y="328" textAnchor="middle" fontSize="9" fill="#15803d">线控底盘</text>

      <rect x="490" y="310" width="120" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="550" y="328" textAnchor="middle" fontSize="9" fill="#15803d">后轮驱动模块</text>

      <rect x="620" y="310" width="120" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="680" y="328" textAnchor="middle" fontSize="9" fill="#15803d">上车身可换</text>

      {/* 底盘核心系统 */}
      <text x="400" y="372" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">底盘四大系统</text>

      <rect x="20" y="384" width="180" height="80" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="110" y="406" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">驱动系统</text>
      <text x="110" y="424" textAnchor="middle" fontSize="9" fill="#475569">电机+减速器</text>
      <text x="110" y="438" textAnchor="middle" fontSize="9" fill="#475569">单电机/双电机</text>
      <text x="110" y="452" textAnchor="middle" fontSize="9" fill="#475569">前驱/后驱/四驱</text>

      <rect x="212" y="384" width="180" height="80" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="302" y="406" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">悬架系统</text>
      <text x="302" y="424" textAnchor="middle" fontSize="9" fill="#475569">前：麦弗逊/双叉臂</text>
      <text x="302" y="438" textAnchor="middle" fontSize="9" fill="#475569">后：多连杆/扭力梁</text>
      <text x="302" y="452" textAnchor="middle" fontSize="9" fill="#475569">空气悬架（高端）</text>

      <rect x="404" y="384" width="180" height="80" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="494" y="406" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">转向系统</text>
      <text x="494" y="424" textAnchor="middle" fontSize="9" fill="#475569">电动助力 EPS</text>
      <text x="494" y="438" textAnchor="middle" fontSize="9" fill="#475569">线控转向 SBW</text>
      <text x="494" y="452" textAnchor="middle" fontSize="9" fill="#475569">可变传动比</text>

      <rect x="596" y="384" width="184" height="80" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="688" y="406" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">制动系统</text>
      <text x="688" y="424" textAnchor="middle" fontSize="9" fill="#475569">液压盘式制动</text>
      <text x="688" y="438" textAnchor="middle" fontSize="9" fill="#475569">再生制动（能量回收）</text>
      <text x="688" y="452" textAnchor="middle" fontSize="9" fill="#475569">线控制动 One-Box</text>

      {/* 车身结构特点 */}
      <text x="400" y="486" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">车身结构特点</text>

      <rect x="40" y="498" width="220" height="56" rx="8" fill="url(#ine-cb-body)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="150" y="518" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">轻量化材料</text>
      <text x="150" y="538" textAnchor="middle" fontSize="9" fill="#475569">铝合金+高强钢+碳纤维</text>

      <rect x="290" y="498" width="220" height="56" rx="8" fill="url(#ine-cb-body)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="518" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">碰撞安全设计</text>
      <text x="400" y="538" textAnchor="middle" fontSize="9" fill="#475569">电池包防撞结构+溃缩吸能</text>

      <rect x="540" y="498" width="220" height="56" rx="8" fill="url(#ine-cb-body)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="650" y="518" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">空气动力学</text>
      <text x="650" y="538" textAnchor="middle" fontSize="9" fill="#475569">底盘平整化+主动进气+低风阻</text>

      {/* 底部总结 */}
      <rect x="40" y="562" width="720" height="14" rx="6" fill="url(#ine-cb-platform)" opacity="0.1" />
    </svg>
  );
}
