"use client";

export function IneMotorControlDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="驱动电机与控制：电机类型与控制原理">
      <defs>
        <linearGradient id="ine-mc-pmsm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="ine-mc-ind" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ine-mc-srm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="ine-mc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">驱动电机与控制系统</text>

      {/* 电机类型对比 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">主流电机类型</text>

      {/* PMSM */}
      <rect x="20" y="74" width="240" height="140" rx="10" fill="url(#ine-mc-pmsm)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <rect x="20" y="74" width="240" height="30" rx="10" fill="url(#ine-mc-pmsm)" opacity="0.9" />
      <text x="140" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">永磁同步 PMSM</text>

      <rect x="40" y="114" width="200" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="140" y="130" textAnchor="middle" fontSize="9" fill="#15803d">转子：永磁体</text>
      <rect x="40" y="144" width="200" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="140" y="160" textAnchor="middle" fontSize="9" fill="#15803d">效率：95-97%</text>
      <rect x="40" y="174" width="200" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="140" y="190" textAnchor="middle" fontSize="9" fill="#15803d">主流应用：绝大多数NEV</text>

      {/* 异步电机 */}
      <rect x="280" y="74" width="240" height="140" rx="10" fill="url(#ine-mc-ind)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="280" y="74" width="240" height="30" rx="10" fill="url(#ine-mc-ind)" opacity="0.9" />
      <text x="400" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">交流异步 ACIM</text>

      <rect x="300" y="114" width="200" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="130" textAnchor="middle" fontSize="9" fill="#0369a1">转子：鼠笼绕组</text>
      <rect x="300" y="144" width="200" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="160" textAnchor="middle" fontSize="9" fill="#0369a1">效率：90-93%</text>
      <rect x="300" y="174" width="200" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="190" textAnchor="middle" fontSize="9" fill="#0369a1">应用：Tesla早期双电机后轴</text>

      {/* SRM */}
      <rect x="540" y="74" width="240" height="140" rx="10" fill="url(#ine-mc-srm)" opacity="0.08" stroke="#ca8a04" strokeWidth="2" />
      <rect x="540" y="74" width="240" height="30" rx="10" fill="url(#ine-mc-srm)" opacity="0.9" />
      <text x="660" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">开关磁阻 SRM</text>

      <rect x="560" y="114" width="200" height="24" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="660" y="130" textAnchor="middle" fontSize="9" fill="#a16207">转子：凸极铁芯</text>
      <rect x="560" y="144" width="200" height="24" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="660" y="160" textAnchor="middle" fontSize="9" fill="#a16207">效率：88-92%</text>
      <rect x="560" y="174" width="200" height="24" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="660" y="190" textAnchor="middle" fontSize="9" fill="#a16207">应用：商用车探索阶段</text>

      {/* 电机控制原理 */}
      <text x="400" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">电机控制原理：FOC 矢量控制</text>

      {/* 控制链路 */}
      <rect x="20" y="254" width="100" height="56" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="70" y="276" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">速度指令</text>
      <text x="70" y="294" textAnchor="middle" fontSize="9" fill="#475569">油门踏板</text>

      <path d="M122 282 L138 282" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-mc-arrow)" />

      <rect x="142" y="254" width="100" height="56" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="192" y="276" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">PI 调节器</text>
      <text x="192" y="294" textAnchor="middle" fontSize="9" fill="#475569">误差→Iq</text>

      <path d="M244 282 L260 282" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-mc-arrow)" />

      <rect x="264" y="254" width="100" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="314" y="276" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">Park 逆变换</text>
      <text x="314" y="294" textAnchor="middle" fontSize="9" fill="#475569">dq→αβ</text>

      <path d="M366 282 L382 282" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-mc-arrow)" />

      <rect x="386" y="254" width="100" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="436" y="276" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">SVPWM</text>
      <text x="436" y="294" textAnchor="middle" fontSize="9" fill="#475569">空间矢量调制</text>

      <path d="M488 282 L504 282" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-mc-arrow)" />

      <rect x="508" y="254" width="100" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="558" y="276" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">逆变器</text>
      <text x="558" y="294" textAnchor="middle" fontSize="9" fill="#475569">IGBT/SiC</text>

      <path d="M610 282 L626 282" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-mc-arrow)" />

      <rect x="630" y="254" width="100" height="56" rx="8" fill="url(#ine-mc-pmsm)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="680" y="276" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">驱动电机</text>
      <text x="680" y="294" textAnchor="middle" fontSize="9" fill="#475569">三相输出</text>

      {/* 反馈环路 */}
      <path d="M680 312 L680 340 L70 340 L70 312" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" fill="none" markerEnd="url(#ine-mc-arrow)" />
      <text x="375" y="336" textAnchor="middle" fontSize="9" fill="#dc2626">反馈：编码器/旋变 → Park/Clarke 变换 → Id/Iq 实际值</text>

      {/* 电机特性对比 */}
      <text x="400" y="370" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键特性对比</text>

      <rect x="40" y="384" width="720" height="28" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="140" y="402" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">类型</text>
      <text x="290" y="402" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">功率密度</text>
      <text x="440" y="402" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">效率</text>
      <text x="590" y="402" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">成本</text>
      <text x="720" y="402" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">可靠性</text>

      <rect x="40" y="416" width="720" height="26" rx="6" fill="#dcfce7" opacity="0.4" />
      <text x="140" y="434" textAnchor="middle" fontSize="9" fill="#15803d">PMSM</text>
      <text x="290" y="434" textAnchor="middle" fontSize="9" fill="#475569">高</text>
      <text x="440" y="434" textAnchor="middle" fontSize="9" fill="#475569">最高</text>
      <text x="590" y="434" textAnchor="middle" fontSize="9" fill="#475569">高（稀土）</text>
      <text x="720" y="434" textAnchor="middle" fontSize="9" fill="#475569">高</text>

      <rect x="40" y="446" width="720" height="26" rx="6" fill="#e0f2fe" opacity="0.4" />
      <text x="140" y="464" textAnchor="middle" fontSize="9" fill="#0369a1">ACIM</text>
      <text x="290" y="464" textAnchor="middle" fontSize="9" fill="#475569">中</text>
      <text x="440" y="464" textAnchor="middle" fontSize="9" fill="#475569">中</text>
      <text x="590" y="464" textAnchor="middle" fontSize="9" fill="#475569">低</text>
      <text x="720" y="464" textAnchor="middle" fontSize="9" fill="#475569">很高</text>

      <rect x="40" y="476" width="720" height="26" rx="6" fill="#fef9c3" opacity="0.4" />
      <text x="140" y="494" textAnchor="middle" fontSize="9" fill="#a16207">SRM</text>
      <text x="290" y="494" textAnchor="middle" fontSize="9" fill="#475569">中</text>
      <text x="440" y="494" textAnchor="middle" fontSize="9" fill="#475569">中低</text>
      <text x="590" y="494" textAnchor="middle" fontSize="9" fill="#475569">最低</text>
      <text x="720" y="494" textAnchor="middle" fontSize="9" fill="#475569">很高</text>

      {/* 底部总结 */}
      <rect x="40" y="518" width="720" height="56" rx="8" fill="url(#ine-mc-pmsm)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="540" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">FOC 矢量控制：速度指令 → PI 调节 → Park 逆变换 → SVPWM → 逆变器 → 电机</text>
      <text x="400" y="560" textAnchor="middle" fontSize="10" fill="#475569">通过 Clarke/Park 变换将三相电流解耦为 Id（磁通）/Iq（转矩），实现直流电机级精确控制</text>
    </svg>
  );
}
