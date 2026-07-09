"use client";

export function IneSafetyFutureDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="安全技术与未来趋势：高压安全 功能安全与智能化">
      <defs>
        <linearGradient id="ine-sf-safety" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="ine-sf-func" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ine-sf-future" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="ine-sf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">安全技术与未来趋势</text>

      {/* 高压安全 */}
      <rect x="20" y="56" width="240" height="200" rx="10" fill="url(#ine-sf-safety)" opacity="0.08" stroke="#dc2626" strokeWidth="2" />
      <rect x="20" y="56" width="240" height="32" rx="10" fill="url(#ine-sf-safety)" opacity="0.9" />
      <text x="140" y="77" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">高压安全</text>

      <rect x="40" y="100" width="200" height="24" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="140" y="116" textAnchor="middle" fontSize="9" fill="#b91c1c">绝缘检测（实时监测）</text>

      <rect x="40" y="132" width="200" height="24" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="140" y="148" textAnchor="middle" fontSize="9" fill="#b91c1c">高压互锁（HVIL）</text>

      <rect x="40" y="164" width="200" height="24" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="140" y="180" textAnchor="middle" fontSize="9" fill="#b91c1c">主动/被动放电</text>

      <rect x="40" y="196" width="200" height="24" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="140" y="212" textAnchor="middle" fontSize="9" fill="#b91c1c">碰撞断电（MSD 熔断）</text>

      <rect x="40" y="228" width="200" height="20" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="140" y="242" textAnchor="middle" fontSize="9" fill="#b91c1c">漏电保护 + 等电位</text>

      {/* 电池安全 */}
      <rect x="280" y="56" width="240" height="200" rx="10" fill="url(#ine-sf-func)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="280" y="56" width="240" height="32" rx="10" fill="url(#ine-sf-func)" opacity="0.9" />
      <text x="400" y="77" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">电池安全</text>

      <rect x="300" y="100" width="200" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="116" textAnchor="middle" fontSize="9" fill="#0369a1">热失控预警与防护</text>

      <rect x="300" y="132" width="200" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="148" textAnchor="middle" fontSize="9" fill="#0369a1">模组间隔热屏障</text>

      <rect x="300" y="164" width="200" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="180" textAnchor="middle" fontSize="9" fill="#0369a1">定向泄压阀（防爆）</text>

      <rect x="300" y="196" width="200" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="212" textAnchor="middle" fontSize="9" fill="#0369a1">云监控大数据预警</text>

      <rect x="300" y="228" width="200" height="20" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="242" textAnchor="middle" fontSize="9" fill="#0369a1">针刺/挤压测试标准</text>

      {/* 功能安全 */}
      <rect x="540" y="56" width="240" height="200" rx="10" fill="url(#ine-sf-future)" opacity="0.08" stroke="#9333ea" strokeWidth="2" />
      <rect x="540" y="56" width="240" height="32" rx="10" fill="url(#ine-sf-future)" opacity="0.9" />
      <text x="660" y="77" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">功能安全 ISO 26262</text>

      <rect x="560" y="100" width="200" height="24" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
      <text x="660" y="116" textAnchor="middle" fontSize="9" fill="#7e22ce">ASIL 安全等级 A-D</text>

      <rect x="560" y="132" width="200" height="24" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
      <text x="660" y="148" textAnchor="middle" fontSize="9" fill="#7e22ce">HARA 危害分析与风险评估</text>

      <rect x="560" y="164" width="200" height="24" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
      <text x="660" y="180" textAnchor="middle" fontSize="9" fill="#7e22ce">冗余设计（双MCU）</text>

      <rect x="560" y="196" width="200" height="24" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
      <text x="660" y="212" textAnchor="middle" fontSize="9" fill="#7e22ce">预期功能安全 SOTIF</text>

      <rect x="560" y="228" width="200" height="20" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
      <text x="660" y="242" textAnchor="middle" fontSize="9" fill="#7e22ce">网络安全 ISO 21434</text>

      {/* 热失控防护链 */}
      <text x="400" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">热失控防护链</text>

      <rect x="20" y="294" width="130" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="85" y="314" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">电芯级</text>
      <text x="85" y="330" textAnchor="middle" fontSize="8" fill="#475569">正温度系数</text>

      <path d="M152 316 L168 316" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-sf-arrow)" />

      <rect x="172" y="294" width="130" height="44" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="237" y="314" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">模组级</text>
      <text x="237" y="330" textAnchor="middle" fontSize="8" fill="#475569">隔热云母板</text>

      <path d="M304 316 L320 316" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-sf-arrow)" />

      <rect x="324" y="294" width="130" height="44" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="389" y="314" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">包级</text>
      <text x="389" y="330" textAnchor="middle" fontSize="8" fill="#475569">泄压阀+防火涂层</text>

      <path d="M456 316 L472 316" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-sf-arrow)" />

      <rect x="476" y="294" width="130" height="44" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="541" y="314" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">系统级</text>
      <text x="541" y="330" textAnchor="middle" fontSize="8" fill="#475569">BMS 熔断+报警</text>

      <path d="M608 316 L624 316" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-sf-arrow)" />

      <rect x="628" y="294" width="130" height="44" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="693" y="314" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">整车级</text>
      <text x="693" y="330" textAnchor="middle" fontSize="8" fill="#475569">乘员舱隔离5分钟</text>

      {/* 未来趋势 */}
      <text x="400" y="364" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">未来发展趋势</text>

      <rect x="20" y="376" width="180" height="80" rx="8" fill="url(#ine-sf-future)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="110" y="398" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">智能驾驶</text>
      <text x="110" y="416" textAnchor="middle" fontSize="9" fill="#475569">L2→L3→L4 演进</text>
      <text x="110" y="430" textAnchor="middle" fontSize="9" fill="#475569">感知+决策+执行</text>
      <text x="110" y="444" textAnchor="middle" fontSize="9" fill="#475569">域控制器集中化</text>

      <rect x="212" y="376" width="180" height="80" rx="8" fill="url(#ine-sf-future)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="302" y="398" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">固态电池</text>
      <text x="302" y="416" textAnchor="middle" fontSize="9" fill="#475569">能量密度 400+Wh/kg</text>
      <text x="302" y="430" textAnchor="middle" fontSize="9" fill="#475569">不可燃电解质</text>
      <text x="302" y="444" textAnchor="middle" fontSize="9" fill="#475569">2027+ 量产预期</text>

      <rect x="404" y="376" width="180" height="80" rx="8" fill="url(#ine-sf-future)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="494" y="398" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">800V/超充</text>
      <text x="494" y="416" textAnchor="middle" fontSize="9" fill="#475569">充电 5 分钟 200km</text>
      <text x="494" y="430" textAnchor="middle" fontSize="9" fill="#475569">SiC 功率器件普及</text>
      <text x="494" y="444" textAnchor="middle" fontSize="9" fill="#475569">兆瓦级超充网络</text>

      <rect x="596" y="376" width="184" height="80" rx="8" fill="url(#ine-sf-future)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="688" y="398" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">V2X 车网互联</text>
      <text x="688" y="416" textAnchor="middle" fontSize="9" fill="#475569">V2G 反向供电</text>
      <text x="688" y="430" textAnchor="middle" fontSize="9" fill="#475569">V2V 车车互充</text>
      <text x="688" y="444" textAnchor="middle" fontSize="9" fill="#475569">V2L 外放电</text>

      {/* E/E 架构演进 */}
      <text x="400" y="482" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">E/E 架构演进</text>

      <rect x="40" y="494" width="160" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="120" y="514" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">分布式架构</text>
      <text x="120" y="532" textAnchor="middle" fontSize="8" fill="#475569">ECU 100+ 个</text>
      <text x="120" y="544" textAnchor="middle" fontSize="8" fill="#475569">功能独立 · 线束复杂</text>

      <path d="M202 522 L218 522" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-sf-arrow)" />

      <rect x="222" y="494" width="160" height="56" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="302" y="514" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">域集中架构</text>
      <text x="302" y="532" textAnchor="middle" fontSize="8" fill="#475569">5大域控制器</text>
      <text x="302" y="544" textAnchor="middle" fontSize="8" fill="#475569">动力/底盘/座舱/智驾/车身</text>

      <path d="M384 522 L400 522" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-sf-arrow)" />

      <rect x="404" y="494" width="160" height="56" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="484" y="514" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">中央集中架构</text>
      <text x="484" y="532" textAnchor="middle" fontSize="8" fill="#475569">中央计算+区域控制</text>
      <text x="484" y="544" textAnchor="middle" fontSize="8" fill="#475569">以太网骨干 · SOA</text>

      <path d="M566 522 L582 522" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ine-sf-arrow)" />

      <rect x="586" y="494" width="160" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="666" y="514" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">车云一体架构</text>
      <text x="666" y="532" textAnchor="middle" fontSize="8" fill="#475569">云端大模型协同</text>
      <text x="666" y="544" textAnchor="middle" fontSize="8" fill="#475569">OTA 持续迭代</text>

      {/* 底部总结 */}
      <rect x="40" y="560" width="720" height="16" rx="6" fill="url(#ine-sf-future)" opacity="0.1" />
    </svg>
  );
}
