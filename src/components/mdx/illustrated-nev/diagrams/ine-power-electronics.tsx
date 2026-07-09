"use client";

export function InePowerElectronicsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="电力电子与变换：逆变器 DC-DC 变换器与OBC">
      <defs>
        <linearGradient id="ine-pe-inv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="ine-pe-dcdc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ine-pe-obc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="ine-pe-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">电力电子：逆变器 · DC-DC · OBC</text>

      {/* 逆变器 */}
      <rect x="20" y="56" width="240" height="200" rx="10" fill="url(#ine-pe-inv)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <rect x="20" y="56" width="240" height="32" rx="10" fill="url(#ine-pe-inv)" opacity="0.9" />
      <text x="140" y="77" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">逆变器 Inverter</text>

      <rect x="40" y="100" width="200" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="140" y="118" textAnchor="middle" fontSize="10" fill="#15803d">DC → 三相 AC</text>

      <rect x="40" y="136" width="200" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="140" y="154" textAnchor="middle" fontSize="10" fill="#15803d">功率器件：IGBT / SiC MOSFET</text>

      <rect x="40" y="172" width="95" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="87" y="190" textAnchor="middle" fontSize="9" fill="#15803d">SVPWM 调制</text>
      <rect x="145" y="172" width="95" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="192" y="190" textAnchor="middle" fontSize="9" fill="#15803d">三相全桥</text>

      <rect x="40" y="208" width="200" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="140" y="226" textAnchor="middle" fontSize="10" fill="#15803d">驱动电机</text>

      <text x="140" y="250" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">效率 97%+ | 100-300kW</text>

      {/* DC-DC */}
      <rect x="280" y="56" width="240" height="200" rx="10" fill="url(#ine-pe-dcdc)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="280" y="56" width="240" height="32" rx="10" fill="url(#ine-pe-dcdc)" opacity="0.9" />
      <text x="400" y="77" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">DC-DC 变换器</text>

      <rect x="300" y="100" width="200" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="118" textAnchor="middle" fontSize="10" fill="#0369a1">高压 400V → 低压 12V</text>

      <rect x="300" y="136" width="200" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="154" textAnchor="middle" fontSize="10" fill="#0369a1">隔离型全桥 LLC</text>

      <rect x="300" y="172" width="95" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="347" y="190" textAnchor="middle" fontSize="9" fill="#0369a1">高频变压器</text>
      <rect x="405" y="172" width="95" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="452" y="190" textAnchor="middle" fontSize="9" fill="#0369a1">同步整流</text>

      <rect x="300" y="208" width="200" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="226" textAnchor="middle" fontSize="10" fill="#0369a1">12V 蓄电池 + 低压负载</text>

      <text x="400" y="250" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">效率 94%+ | 1.5-3kW</text>

      {/* OBC */}
      <rect x="540" y="56" width="240" height="200" rx="10" fill="url(#ine-pe-obc)" opacity="0.08" stroke="#9333ea" strokeWidth="2" />
      <rect x="540" y="56" width="240" height="32" rx="10" fill="url(#ine-pe-obc)" opacity="0.9" />
      <text x="660" y="77" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">车载充电机 OBC</text>

      <rect x="560" y="100" width="200" height="28" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
      <text x="660" y="118" textAnchor="middle" fontSize="10" fill="#7e22ce">AC 220V → DC 400V</text>

      <rect x="560" y="136" width="200" height="28" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
      <text x="660" y="154" textAnchor="middle" fontSize="10" fill="#7e22ce">PFC 功率因数校正</text>

      <rect x="560" y="172" width="95" height="28" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
      <text x="607" y="190" textAnchor="middle" fontSize="9" fill="#7e22ce">整流+升压</text>
      <rect x="665" y="172" width="95" height="28" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
      <text x="712" y="190" textAnchor="middle" fontSize="9" fill="#7e22ce">LLC 隔离</text>

      <rect x="560" y="208" width="200" height="28" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
      <text x="660" y="226" textAnchor="middle" fontSize="10" fill="#7e22ce">动力电池充电</text>

      <text x="660" y="250" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">效率 94%+ | 3.3-22kW</text>

      {/* 功率器件演进 */}
      <text x="400" y="284" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">功率器件演进</text>

      <rect x="40" y="298" width="220" height="80" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="150" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">硅基 IGBT</text>
      <text x="150" y="340" textAnchor="middle" fontSize="9" fill="#475569">成熟 · 低成本</text>
      <text x="150" y="358" textAnchor="middle" fontSize="9" fill="#475569">开关频率 10-20kHz</text>
      <text x="150" y="374" textAnchor="middle" fontSize="9" fill="#475569">主流方案（400V平台）</text>

      <path d="M262 338 L288 338" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-pe-arrow)" />

      <rect x="292" y="298" width="220" height="80" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="402" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">SiC MOSFET</text>
      <text x="402" y="340" textAnchor="middle" fontSize="9" fill="#475569">低损耗 · 高温</text>
      <text x="402" y="358" textAnchor="middle" fontSize="9" fill="#475569">开关频率 50-100kHz</text>
      <text x="402" y="374" textAnchor="middle" fontSize="9" fill="#475569">800V平台首选</text>

      <path d="M514 338 L540 338" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-pe-arrow)" />

      <rect x="544" y="298" width="216" height="80" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="652" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">GaN 氮化镓</text>
      <text x="652" y="340" textAnchor="middle" fontSize="9" fill="#475569">超高频 · 体积小</text>
      <text x="652" y="358" textAnchor="middle" fontSize="9" fill="#475569">开关频率 100kHz+</text>
      <text x="652" y="374" textAnchor="middle" fontSize="9" fill="#475569">小功率OBC探索</text>

      {/* 能量流 */}
      <text x="400" y="404" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">高压系统拓扑</text>

      <rect x="40" y="418" width="100" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="90" y="438" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">电池包</text>
      <text x="90" y="454" textAnchor="middle" fontSize="9" fill="#475569">400V/800V</text>

      <path d="M142 440 L190 440" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-pe-arrow)" />

      <rect x="194" y="418" width="70" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="229" y="444" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">逆变器</text>

      <path d="M266 440 L310 440" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-pe-arrow)" />

      <rect x="314" y="418" width="70" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="349" y="444" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">电机</text>

      <path d="M90 464 L90 490 L229 490 L229 464" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4,3" fill="none" markerEnd="url(#ine-pe-arrow)" />
      <text x="160" y="486" textAnchor="middle" fontSize="8" fill="#0369a1">DC-DC→12V</text>

      <rect x="430" y="418" width="80" height="44" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="470" y="438" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">OBC</text>
      <text x="470" y="454" textAnchor="middle" fontSize="8" fill="#475569">AC→DC</text>

      <path d="M470 418 L470 400 L90 400 L90 418" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="4,3" fill="none" markerEnd="url(#ine-pe-arrow)" />
      <text x="280" y="396" textAnchor="middle" fontSize="8" fill="#7e22ce">充电: 交流输入→OBC→电池</text>

      <rect x="540" y="418" width="70" height="44" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="575" y="444" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">DC快充</text>

      <path d="M575 418 L575 400 L90 400" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" fill="none" />

      <rect x="630" y="418" width="70" height="44" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="665" y="438" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">PTC</text>
      <text x="665" y="454" textAnchor="middle" fontSize="8" fill="#475569">加热器</text>

      <rect x="710" y="418" width="50" height="44" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="735" y="444" textAnchor="middle" fontSize="8" fontWeight="600" fill="#b91c1c">压缩机</text>

      {/* 底部总结 */}
      <rect x="40" y="510" width="720" height="56" rx="8" fill="url(#ine-pe-inv)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="532" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">三大核心：逆变器（DC→AC驱动电机）· DC-DC（高压→12V低压）· OBC（AC→DC充电）</text>
      <text x="400" y="552" textAnchor="middle" fontSize="10" fill="#475569">功率器件从 IGBT 向 SiC/GaN 演进，提升效率与功率密度，支撑 800V 高压平台快充</text>
    </svg>
  );
}
