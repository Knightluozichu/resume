"use client";

export function IneBmsThermalDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="电池管理与热管理：BMS架构与温控系统">
      <defs>
        <linearGradient id="ine-bm-bms" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="ine-bm-cool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ine-bm-heat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="ine-bm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">电池管理 BMS 与热管理系统</text>

      {/* BMS 架构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">BMS 三层架构</text>

      <rect x="20" y="74" width="760" height="80" rx="10" fill="url(#ine-bm-bms)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />

      <rect x="40" y="86" width="220" height="56" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="150" y="106" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">BMU 电池管理主控</text>
      <text x="150" y="124" textAnchor="middle" fontSize="9" fill="#475569">SOC/SOH 估算</text>
      <text x="150" y="138" textAnchor="middle" fontSize="9" fill="#475569">均衡策略 · 通信管理</text>

      <path d="M262 114 L286 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-bm-arrow)" />

      <rect x="290" y="86" width="220" height="56" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="106" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">CMU 电池管理从控</text>
      <text x="400" y="124" textAnchor="middle" fontSize="9" fill="#475569">电压/温度采集</text>
      <text x="400" y="138" textAnchor="middle" fontSize="9" fill="#475569">模组级监控 · 故障上报</text>

      <path d="M512 114 L536 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-bm-arrow)" />

      <rect x="540" y="86" width="220" height="56" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="650" y="106" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">HVU 高压管理单元</text>
      <text x="650" y="124" textAnchor="middle" fontSize="9" fill="#475569">继电器控制</text>
      <text x="650" y="138" textAnchor="middle" fontSize="9" fill="#475569">绝缘检测 · 预充电</text>

      {/* BMS 核心功能 */}
      <text x="400" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">BMS 核心功能</text>

      <rect x="20" y="192" width="180" height="80" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="110" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">数据采集</text>
      <text x="110" y="232" textAnchor="middle" fontSize="9" fill="#475569">单体电压</text>
      <text x="110" y="246" textAnchor="middle" fontSize="9" fill="#475569">温度（NTC）</text>
      <text x="110" y="260" textAnchor="middle" fontSize="9" fill="#475569">总压/电流</text>

      <rect x="212" y="192" width="180" height="80" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="302" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">状态估算</text>
      <text x="302" y="232" textAnchor="middle" fontSize="9" fill="#475569">SOC 荷电状态</text>
      <text x="302" y="246" textAnchor="middle" fontSize="9" fill="#475569">SOH 健康状态</text>
      <text x="302" y="260" textAnchor="middle" fontSize="9" fill="#475569">SOP 功率状态</text>

      <rect x="404" y="192" width="180" height="80" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="494" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">安全保护</text>
      <text x="494" y="232" textAnchor="middle" fontSize="9" fill="#475569">过压/欠压保护</text>
      <text x="494" y="246" textAnchor="middle" fontSize="9" fill="#475569">过流/过温保护</text>
      <text x="494" y="260" textAnchor="middle" fontSize="9" fill="#475569">绝缘/短路保护</text>

      <rect x="596" y="192" width="184" height="80" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="688" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">能量管理</text>
      <text x="688" y="232" textAnchor="middle" fontSize="9" fill="#475569">被动/主动均衡</text>
      <text x="688" y="246" textAnchor="middle" fontSize="9" fill="#475569">充放电策略</text>
      <text x="688" y="260" textAnchor="middle" fontSize="9" fill="#475569">峰值功率限制</text>

      {/* 热管理系统 */}
      <text x="400" y="298" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">热管理系统：冷却与加热</text>

      {/* 冷却回路 */}
      <rect x="20" y="310" width="360" height="120" rx="10" fill="url(#ine-bm-cool)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="20" y="310" width="360" height="28" rx="10" fill="url(#ine-bm-cool)" opacity="0.9" />
      <text x="200" y="329" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">液冷回路（散热）</text>

      <rect x="40" y="348" width="80" height="32" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="80" y="368" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">电池包</text>

      <path d="M122 364 L140 364" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-bm-arrow)" />

      <rect x="144" y="348" width="80" height="32" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="184" y="368" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">液冷板</text>

      <path d="M226 364 L244 364" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-bm-arrow)" />

      <rect x="248" y="348" width="80" height="32" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="288" y="368" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">散热器</text>

      <path d="M330 364 L348 364" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-bm-arrow)" />

      <rect x="40" y="390" width="120" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="100" y="408" textAnchor="middle" fontSize="9" fill="#0369a1">电子水泵</text>

      <rect x="170" y="390" width="100" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="220" y="408" textAnchor="middle" fontSize="9" fill="#0369a1">膨胀阀</text>

      <rect x="280" y="390" width="80" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="320" y="408" textAnchor="middle" fontSize="9" fill="#0369a1">冷凝器</text>

      {/* 加热回路 */}
      <rect x="420" y="310" width="360" height="120" rx="10" fill="url(#ine-bm-heat)" opacity="0.08" stroke="#dc2626" strokeWidth="2" />
      <rect x="420" y="310" width="360" height="28" rx="10" fill="url(#ine-bm-heat)" opacity="0.9" />
      <text x="600" y="329" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">加热回路（低温）</text>

      <rect x="440" y="348" width="80" height="32" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="480" y="368" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">PTC 加热</text>

      <path d="M522 364 L540 364" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-bm-arrow)" />

      <rect x="544" y="348" width="80" height="32" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="584" y="368" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">热交换器</text>

      <path d="M626 364 L644 364" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-bm-arrow)" />

      <rect x="648" y="348" width="112" height="32" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="704" y="368" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">电池包升温</text>

      <rect x="440" y="390" width="150" height="28" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="515" y="408" textAnchor="middle" fontSize="9" fill="#b91c1c">低温: -30°C → 5°C</text>

      <rect x="600" y="390" width="160" height="28" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="680" y="408" textAnchor="middle" fontSize="9" fill="#b91c1c">最佳工作温度 20-35°C</text>

      {/* 温度影响 */}
      <text x="400" y="456" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">温度对电池性能的影响</text>

      <rect x="40" y="470" width="220" height="56" rx="8" fill="url(#ine-bm-cool)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="150" y="490" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">低温（&lt; 0°C）</text>
      <text x="150" y="508" textAnchor="middle" fontSize="9" fill="#475569">内阻增大 · 容量衰减</text>
      <text x="150" y="522" textAnchor="middle" fontSize="9" fill="#475569">析锂风险 · 禁止快充</text>

      <rect x="290" y="470" width="220" height="56" rx="8" fill="url(#ine-bm-bms)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="490" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">最佳温度（20-35°C）</text>
      <text x="400" y="508" textAnchor="middle" fontSize="9" fill="#475569">内阻最低 · 效率最高</text>
      <text x="400" y="522" textAnchor="middle" fontSize="9" fill="#475569">充放电性能最优</text>

      <rect x="540" y="470" width="220" height="56" rx="8" fill="url(#ine-bm-heat)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="650" y="490" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">高温（&gt; 45°C）</text>
      <text x="650" y="508" textAnchor="middle" fontSize="9" fill="#475569">寿命加速衰减</text>
      <text x="650" y="522" textAnchor="middle" fontSize="9" fill="#475569">热失控风险上升</text>

      {/* 底部总结 */}
      <rect x="40" y="538" width="720" height="32" rx="8" fill="url(#ine-bm-bms)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="558" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">BMS 监控+保护+均衡 · 热管理维持 20-35°C 最佳区间 · 冷却散热+加热升温协同保障安全与寿命</text>
    </svg>
  );
}
