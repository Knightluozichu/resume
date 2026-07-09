"use client";

export function IneNevOverviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="新能源汽车概览：BEV PHEV HEV 三类架构对比">
      <defs>
        <linearGradient id="ine-ov-bev" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="ine-ov-phev" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ine-ov-hev" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="ine-ov-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">新能源汽车三大类型对比</text>

      {/* BEV */}
      <rect x="20" y="60" width="240" height="200" rx="10" fill="url(#ine-ov-bev)" opacity="0.1" stroke="#16a34a" strokeWidth="2" />
      <rect x="20" y="60" width="240" height="36" rx="10" fill="url(#ine-ov-bev)" opacity="0.9" />
      <text x="140" y="83" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">BEV 纯电动</text>

      <rect x="40" y="106" width="200" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="140" y="122" textAnchor="middle" fontSize="10" fill="#15803d">动力电池包（大容量）</text>

      <rect x="40" y="138" width="200" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="140" y="154" textAnchor="middle" fontSize="10" fill="#15803d">驱动电机（唯一动力源）</text>

      <rect x="40" y="170" width="200" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="140" y="186" textAnchor="middle" fontSize="10" fill="#15803d">逆变器 + 减速器</text>

      <rect x="40" y="202" width="200" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="140" y="218" textAnchor="middle" fontSize="10" fill="#15803d">充电接口（外接充电）</text>

      <text x="140" y="246" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">零排放 · 纯电驱动 · 无发动机</text>

      {/* PHEV */}
      <rect x="280" y="60" width="240" height="200" rx="10" fill="url(#ine-ov-phev)" opacity="0.1" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="280" y="60" width="240" height="36" rx="10" fill="url(#ine-ov-phev)" opacity="0.9" />
      <text x="400" y="83" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">PHEV 插电混动</text>

      <rect x="300" y="106" width="200" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="122" textAnchor="middle" fontSize="10" fill="#0369a1">动力电池（中等容量）</text>

      <rect x="300" y="138" width="200" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="154" textAnchor="middle" fontSize="10" fill="#0369a1">发动机 + 驱动电机</text>

      <rect x="300" y="170" width="200" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="186" textAnchor="middle" fontSize="10" fill="#0369a1">混动变速箱 + 逆变器</text>

      <rect x="300" y="202" width="200" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="218" textAnchor="middle" fontSize="10" fill="#0369a1">充电接口 + 加油口</text>

      <text x="400" y="246" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">双动力 · 可外充 · 串联/并联</text>

      {/* HEV */}
      <rect x="540" y="60" width="240" height="200" rx="10" fill="url(#ine-ov-hev)" opacity="0.1" stroke="#ca8a04" strokeWidth="2" />
      <rect x="540" y="60" width="240" height="36" rx="10" fill="url(#ine-ov-hev)" opacity="0.9" />
      <text x="660" y="83" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">HEV 油电混动</text>

      <rect x="560" y="106" width="200" height="24" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="660" y="122" textAnchor="middle" fontSize="10" fill="#a16207">动力电池（小容量）</text>

      <rect x="560" y="138" width="200" height="24" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="660" y="154" textAnchor="middle" fontSize="10" fill="#a16207">发动机（主动力）+ 电机</text>

      <rect x="560" y="170" width="200" height="24" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="660" y="186" textAnchor="middle" fontSize="10" fill="#a16207">混动变速箱 + 逆变器</text>

      <rect x="560" y="202" width="200" height="24" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="660" y="218" textAnchor="middle" fontSize="10" fill="#a16207">仅加油口（不可外充）</text>

      <text x="660" y="246" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">油为主 · 电辅助 · 不可外充</text>

      {/* 能量流对比 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">能量流动路径</text>

      {/* BEV 能量流 */}
      <rect x="40" y="306" width="60" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="70" y="322" textAnchor="middle" fontSize="9" fill="#15803d">电网</text>
      <path d="M102 318 L116 318" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-ov-arrow)" />
      <rect x="120" y="306" width="60" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="150" y="322" textAnchor="middle" fontSize="9" fill="#15803d">电池</text>
      <path d="M182 318 L196 318" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-ov-arrow)" />
      <rect x="200" y="306" width="60" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="230" y="322" textAnchor="middle" fontSize="9" fill="#15803d">电机</text>
      <text x="140" y="346" textAnchor="middle" fontSize="9" fill="#475569">BEV：电网→电池→电机→车轮</text>

      {/* PHEV 能量流 */}
      <rect x="300" y="306" width="50" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="325" y="322" textAnchor="middle" fontSize="9" fill="#0369a1">油/电</text>
      <path d="M352 318 L366 318" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-ov-arrow)" />
      <rect x="370" y="306" width="50" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="395" y="322" textAnchor="middle" fontSize="9" fill="#0369a1">电池</text>
      <path d="M422 318 L436 318" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-ov-arrow)" />
      <rect x="440" y="306" width="50" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="465" y="322" textAnchor="middle" fontSize="9" fill="#0369a1">双动力</text>
      <text x="400" y="346" textAnchor="middle" fontSize="9" fill="#475569">PHEV：油/电→电池→发动机/电机→车轮</text>

      {/* HEV 能量流 */}
      <rect x="560" y="306" width="50" height="24" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="585" y="322" textAnchor="middle" fontSize="9" fill="#a16207">燃油</text>
      <path d="M612 318 L626 318" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-ov-arrow)" />
      <rect x="630" y="306" width="50" height="24" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="655" y="322" textAnchor="middle" fontSize="9" fill="#a16207">发动机</text>
      <path d="M682 318 L696 318" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-ov-arrow)" />
      <rect x="700" y="306" width="50" height="24" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
      <text x="725" y="322" textAnchor="middle" fontSize="9" fill="#a16207">电机辅助</text>
      <text x="660" y="346" textAnchor="middle" fontSize="9" fill="#475569">HEV：燃油→发动机→电机辅助→车轮</text>

      {/* 核心特征对比表 */}
      <text x="400" y="380" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心特征对比</text>

      <rect x="40" y="394" width="720" height="32" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="140" y="414" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">类型</text>
      <text x="290" y="414" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">纯电续航</text>
      <text x="440" y="414" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">外接充电</text>
      <text x="590" y="414" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">发动机</text>
      <text x="720" y="414" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">排放</text>

      <rect x="40" y="430" width="720" height="28" rx="6" fill="#dcfce7" opacity="0.5" />
      <text x="140" y="448" textAnchor="middle" fontSize="10" fill="#15803d">BEV</text>
      <text x="290" y="448" textAnchor="middle" fontSize="10" fill="#475569">400-700km</text>
      <text x="440" y="448" textAnchor="middle" fontSize="10" fill="#475569">是</text>
      <text x="590" y="448" textAnchor="middle" fontSize="10" fill="#475569">无</text>
      <text x="720" y="448" textAnchor="middle" fontSize="10" fill="#475569">零排放</text>

      <rect x="40" y="462" width="720" height="28" rx="6" fill="#e0f2fe" opacity="0.5" />
      <text x="140" y="480" textAnchor="middle" fontSize="10" fill="#0369a1">PHEV</text>
      <text x="290" y="480" textAnchor="middle" fontSize="10" fill="#475569">50-150km</text>
      <text x="440" y="480" textAnchor="middle" fontSize="10" fill="#475569">是</text>
      <text x="590" y="480" textAnchor="middle" fontSize="10" fill="#475569">有</text>
      <text x="720" y="480" textAnchor="middle" fontSize="10" fill="#475569">低排放</text>

      <rect x="40" y="494" width="720" height="28" rx="6" fill="#fef9c3" opacity="0.5" />
      <text x="140" y="512" textAnchor="middle" fontSize="10" fill="#a16207">HEV</text>
      <text x="290" y="512" textAnchor="middle" fontSize="10" fill="#475569">1-5km</text>
      <text x="440" y="512" textAnchor="middle" fontSize="10" fill="#475569">否</text>
      <text x="590" y="512" textAnchor="middle" fontSize="10" fill="#475569">有</text>
      <text x="720" y="512" textAnchor="middle" fontSize="10" fill="#475569">较低排放</text>

      {/* 底部总结 */}
      <rect x="40" y="534" width="720" height="32" rx="8" fill="url(#ine-ov-bev)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="554" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">核心脉络：电池容量决定纯电续航 → 外接充电能力区分插混与油混 → 发动机有无决定能量来源</text>
    </svg>
  );
}
