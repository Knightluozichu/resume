"use client";

export function CsiHvacComfortDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="空调与舒适性系统：制冷循环与舒适性系统">
      <defs>
        <linearGradient id="csi-hc-cold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="csi-hc-hot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="csi-hc-compress" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="csi-hc-comfort" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="csi-hc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">空调与舒适性系统</text>

      {/* 制冷循环 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">制冷循环四大部件</text>

      {/* 压缩机 */}
      <rect x="30" y="76" width="140" height="80" rx="8" fill="url(#csi-hc-compress)" opacity="0.15" stroke="#16a34a" strokeWidth="2" />
      <text x="100" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">1. 压缩机</text>
      <text x="100" y="120" textAnchor="middle" fontSize="9" fill="#475569">低温低压气态</text>
      <text x="100" y="134" textAnchor="middle" fontSize="9" fill="#475569">压缩为高温高压</text>
      <text x="100" y="148" textAnchor="middle" fontSize="9" fill="#15803d">气态制冷剂</text>

      <path d="M170 116 L196 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-hc-arrow)" />

      {/* 冷凝器 */}
      <rect x="200" y="76" width="140" height="80" rx="8" fill="url(#csi-hc-hot)" opacity="0.12" stroke="#dc2626" strokeWidth="2" />
      <text x="270" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">2. 冷凝器</text>
      <text x="270" y="120" textAnchor="middle" fontSize="9" fill="#475569">散热至外界空气</text>
      <text x="270" y="134" textAnchor="middle" fontSize="9" fill="#475569">气态凝结为液态</text>
      <text x="270" y="148" textAnchor="middle" fontSize="9" fill="#b91c1c">高温高压液态</text>

      <path d="M340 116 L366 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-hc-arrow)" />

      {/* 膨胀阀 */}
      <rect x="370" y="76" width="140" height="80" rx="8" fill="url(#csi-hc-cold)" opacity="0.12" stroke="#0ea5e9" strokeWidth="2" />
      <text x="440" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">3. 膨胀阀</text>
      <text x="440" y="120" textAnchor="middle" fontSize="9" fill="#475569">节流降压</text>
      <text x="440" y="134" textAnchor="middle" fontSize="9" fill="#475569">液态变为雾状</text>
      <text x="440" y="148" textAnchor="middle" fontSize="9" fill="#0369a1">低温低压液态</text>

      <path d="M510 116 L536 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-hc-arrow)" />

      {/* 蒸发器 */}
      <rect x="540" y="76" width="140" height="80" rx="8" fill="url(#csi-hc-cold)" opacity="0.15" stroke="#0ea5e9" strokeWidth="2" />
      <text x="610" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">4. 蒸发器</text>
      <text x="610" y="120" textAnchor="middle" fontSize="9" fill="#475569">吸收车内热量</text>
      <text x="610" y="134" textAnchor="middle" fontSize="9" fill="#475569">液态蒸发为气态</text>
      <text x="610" y="148" textAnchor="middle" fontSize="9" fill="#0369a1">冷风吹入车内</text>

      {/* 循环回路 */}
      <path d="M610 156 L610 172 L100 172 L100 156" stroke="#64748b" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#csi-hc-arrow)" />
      <text x="355" y="188" textAnchor="middle" fontSize="10" fill="#64748b">制冷剂循环回路（R134a / R1234yf）</text>

      {/* 制热原理 */}
      <text x="400" y="214" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">制热原理</text>

      <rect x="30" y="228" width="350" height="56" rx="8" fill="url(#csi-hc-hot)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="205" y="250" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">燃油车：发动机余热制热</text>
      <text x="205" y="268" textAnchor="middle" fontSize="9" fill="#475569">冷却液热量经暖风水箱吹入车内</text>

      <rect x="420" y="228" width="350" height="56" rx="8" fill="url(#csi-hc-compress)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="595" y="250" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">电车：热泵制热（PTC辅助）</text>
      <text x="595" y="268" textAnchor="middle" fontSize="9" fill="#475569">制冷循环逆转，从外界吸热泵入车内</text>

      {/* 舒适性系统 */}
      <text x="400" y="312" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">舒适性系统</text>

      <rect x="30" y="326" width="170" height="72" rx="8" fill="url(#csi-hc-comfort)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="115" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">NVH 降噪</text>
      <text x="115" y="366" textAnchor="middle" fontSize="9" fill="#475569">隔声/吸声/隔振</text>
      <text x="115" y="382" textAnchor="middle" fontSize="9" fill="#475569">降低风噪/路噪/发动机</text>

      <rect x="215" y="326" width="170" height="72" rx="8" fill="url(#csi-hc-comfort)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="300" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">座椅舒适</text>
      <text x="300" y="366" textAnchor="middle" fontSize="9" fill="#475569">加热/通风/按摩</text>
      <text x="300" y="382" textAnchor="middle" fontSize="9" fill="#475569">电动调节/记忆</text>

      <rect x="400" y="326" width="170" height="72" rx="8" fill="url(#csi-hc-comfort)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="485" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">空气质量</text>
      <text x="485" y="366" textAnchor="middle" fontSize="9" fill="#475569">PM2.5 滤芯</text>
      <text x="485" y="382" textAnchor="middle" fontSize="9" fill="#475569">负离子/香氛</text>

      <rect x="585" y="326" width="185" height="72" rx="8" fill="url(#csi-hc-comfort)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="677" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">温控分区</text>
      <text x="677" y="366" textAnchor="middle" fontSize="9" fill="#475569">双区/三区/四区独立</text>
      <text x="677" y="382" textAnchor="middle" fontSize="9" fill="#475569">自动恒温控制</text>

      {/* 空调控制逻辑 */}
      <text x="400" y="424" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">自动空调控制逻辑</text>

      <rect x="30" y="438" width="740" height="36" rx="8" fill="url(#csi-hc-cold)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="460" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">设定温度 → 温度传感器反馈 → ECU 计算 → 调节风量/出风温度/压缩机功率 → 达到目标</text>

      {/* 底部总结 */}
      <rect x="30" y="488" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="508" textAnchor="middle" fontSize="11" fill="#475569">制冷循环：压缩机 → 冷凝器（散热）→ 膨胀阀（降压）→ 蒸发器（吸冷）→ 回到压缩机</text>

      <rect x="30" y="528" width="740" height="24" rx="8" fill="url(#csi-hc-comfort)" opacity="0.08" />
      <text x="400" y="544" textAnchor="middle" fontSize="10" fill="#7e22ce">舒适性 = 温度（18-26摄氏度）+ 湿度（40-60%）+ 空气质量 + NVH 静谧性 + 座椅触感</text>
    </svg>
  );
}
