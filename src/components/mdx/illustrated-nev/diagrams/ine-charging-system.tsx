"use client";

export function IneChargingSystemDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="充电系统：交流慢充与直流快充对比">
      <defs>
        <linearGradient id="ine-cs-ac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ine-cs-dc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="ine-cs-super" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="ine-cs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">充电系统：交流慢充与直流快充</text>

      {/* 交流充电 */}
      <rect x="20" y="56" width="360" height="200" rx="10" fill="url(#ine-cs-ac)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="20" y="56" width="360" height="32" rx="10" fill="url(#ine-cs-ac)" opacity="0.9" />
      <text x="200" y="77" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">交流充电 AC（慢充）</text>

      <rect x="40" y="100" width="100" height="40" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="90" y="118" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">交流桩</text>
      <text x="90" y="132" textAnchor="middle" fontSize="8" fill="#475569">220V/380V</text>

      <path d="M142 120 L160 120" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-cs-arrow)" />

      <rect x="164" y="100" width="100" height="40" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="214" y="118" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">车载 OBC</text>
      <text x="214" y="132" textAnchor="middle" fontSize="8" fill="#475569">AC→DC 整流</text>

      <path d="M266 120 L284 120" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-cs-arrow)" />

      <rect x="288" y="100" width="72" height="40" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="324" y="118" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">电池包</text>
      <text x="324" y="132" textAnchor="middle" fontSize="8" fill="#475569">充电</text>

      <rect x="40" y="152" width="160" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="120" y="168" textAnchor="middle" fontSize="9" fill="#0369a1">充电接口：Type2 / GB/T</text>

      <rect x="210" y="152" width="150" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="285" y="168" textAnchor="middle" fontSize="9" fill="#0369a1">功率：3.3-22kW</text>

      <rect x="40" y="184" width="160" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="120" y="200" textAnchor="middle" fontSize="9" fill="#0369a1">充电时间：6-10小时</text>

      <rect x="210" y="184" width="150" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="285" y="200" textAnchor="middle" fontSize="9" fill="#0369a1">场景：家用/停车场</text>

      <text x="200" y="228" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">特点：成本低 · 对电网冲击小 · 电池寿命友好</text>
      <text x="200" y="246" textAnchor="middle" fontSize="9" fill="#475569">交流电经车载OBC转为直流后充入电池</text>

      {/* 直流充电 */}
      <rect x="420" y="56" width="360" height="200" rx="10" fill="url(#ine-cs-dc)" opacity="0.08" stroke="#dc2626" strokeWidth="2" />
      <rect x="420" y="56" width="360" height="32" rx="10" fill="url(#ine-cs-dc)" opacity="0.9" />
      <text x="600" y="77" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">直流充电 DC（快充）</text>

      <rect x="440" y="100" width="100" height="40" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="490" y="118" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">直流桩</text>
      <text x="490" y="132" textAnchor="middle" fontSize="8" fill="#475569">380V+ 整流</text>

      <path d="M542 120 L560 120" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-cs-arrow)" />

      <rect x="564" y="100" width="100" height="40" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="614" y="118" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">桩内变换器</text>
      <text x="614" y="132" textAnchor="middle" fontSize="8" fill="#475569">AC→DC 大功率</text>

      <path d="M666 120 L684 120" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-cs-arrow)" />

      <rect x="688" y="100" width="72" height="40" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="724" y="118" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">电池包</text>
      <text x="724" y="132" textAnchor="middle" fontSize="8" fill="#475569">快充</text>

      <rect x="440" y="152" width="160" height="24" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="520" y="168" textAnchor="middle" fontSize="9" fill="#b91c1c">充电接口：CCS / GB/T DC / CHAdeMO</text>

      <rect x="610" y="152" width="150" height="24" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="685" y="168" textAnchor="middle" fontSize="9" fill="#b91c1c">功率：60-350kW</text>

      <rect x="440" y="184" width="160" height="24" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="520" y="200" textAnchor="middle" fontSize="9" fill="#b91c1c">充电时间：20-60分钟</text>

      <rect x="610" y="184" width="150" height="24" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="685" y="200" textAnchor="middle" fontSize="9" fill="#b91c1c">场景：高速服务区/充电站</text>

      <text x="600" y="228" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">特点：功率大 · 充电快 · 成本高 · 需大功率电网</text>
      <text x="600" y="246" textAnchor="middle" fontSize="9" fill="#475569">直流电直接充入电池，跳过车载OBC</text>

      {/* 充电标准对比 */}
      <text x="400" y="284" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">充电标准与协议</text>

      <rect x="20" y="298" width="180" height="72" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="110" y="318" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">GB/T（国标）</text>
      <text x="110" y="338" textAnchor="middle" fontSize="9" fill="#475569">中国标准</text>
      <text x="110" y="356" textAnchor="middle" fontSize="9" fill="#475569">AC: GB/T 20234</text>
      <text x="110" y="366" textAnchor="middle" fontSize="9" fill="#475569">DC: GB/T 20234.3</text>

      <rect x="212" y="298" width="180" height="72" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="302" y="318" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">CCS（组合充电）</text>
      <text x="302" y="338" textAnchor="middle" fontSize="9" fill="#475569">欧美标准</text>
      <text x="302" y="356" textAnchor="middle" fontSize="9" fill="#475569">CCS Type 1（美）</text>
      <text x="302" y="366" textAnchor="middle" fontSize="9" fill="#475569">CCS Type 2（欧）</text>

      <rect x="404" y="298" width="180" height="72" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="494" y="318" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">CHAdeMO</text>
      <text x="494" y="338" textAnchor="middle" fontSize="9" fill="#475569">日本标准</text>
      <text x="494" y="356" textAnchor="middle" fontSize="9" fill="#475569">仅 DC 快充</text>
      <text x="494" y="366" textAnchor="middle" fontSize="9" fill="#475569">最大功率 400kW</text>

      <rect x="596" y="298" width="184" height="72" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="688" y="318" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">NACS / Tesla</text>
      <text x="688" y="338" textAnchor="middle" fontSize="9" fill="#475569">北美统一标准</text>
      <text x="688" y="356" textAnchor="middle" fontSize="9" fill="#475569">AC+DC 一体接口</text>
      <text x="688" y="366" textAnchor="middle" fontSize="9" fill="#475569">V4 超充 350kW+</text>

      {/* 充电曲线 */}
      <text x="400" y="400" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">快充曲线与电池保护</text>

      <rect x="40" y="414" width="720" height="80" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      <rect x="60" y="424" width="80" height="20" rx="4" fill="url(#ine-cs-dc)" opacity="0.6" />
      <text x="100" y="438" textAnchor="middle" fontSize="8" fill="#fff">恒流快充</text>

      <rect x="146" y="424" width="240" height="20" rx="4" fill="url(#ine-cs-dc)" opacity="0.4" />
      <text x="266" y="438" textAnchor="middle" fontSize="8" fill="#b91c1c">恒流阶段（SOC 10-80%）大电流</text>

      <rect x="392" y="424" width="180" height="20" rx="4" fill="url(#ine-cs-ac)" opacity="0.5" />
      <text x="482" y="438" textAnchor="middle" fontSize="8" fill="#0369a1">恒压阶段（80-95%）电流递减</text>

      <rect x="580" y="424" width="120" height="20" rx="4" fill="url(#ine-cs-ac)" opacity="0.7" />
      <text x="640" y="438" textAnchor="middle" fontSize="8" fill="#fff">涓流（95-100%）</text>

      <text x="100" y="460" textAnchor="middle" fontSize="8" fill="#475569">10%</text>
      <text x="266" y="460" textAnchor="middle" fontSize="8" fill="#475569">80%</text>
      <text x="482" y="460" textAnchor="middle" fontSize="8" fill="#475569">95%</text>
      <text x="640" y="460" textAnchor="middle" fontSize="8" fill="#475569">100%</text>

      <text x="400" y="480" textAnchor="middle" fontSize="9" fill="#475569">恒流大功率快充 → 恒压降流保护 → 涓流补满，BMS 全程监控温度与电压防过充</text>

      {/* 800V 高压快充 */}
      <rect x="40" y="506" width="340" height="56" rx="8" fill="url(#ine-cs-super)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="210" y="528" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">800V 高压平台快充</text>
      <text x="210" y="548" textAnchor="middle" fontSize="9" fill="#475569">提升电压→降低电流→减少线损→支持更高充电功率</text>

      <rect x="420" y="506" width="340" height="56" rx="8" fill="url(#ine-cs-dc)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="528" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">V2G 双向充放电</text>
      <text x="590" y="548" textAnchor="middle" fontSize="9" fill="#475569">车辆电池反向供电给电网，参与调峰与能源管理</text>
    </svg>
  );
}
