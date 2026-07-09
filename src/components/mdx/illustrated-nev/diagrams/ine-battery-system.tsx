"use client";

export function IneBatterySystemDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="电池系统：从电芯到模组到电池包的三级结构">
      <defs>
        <linearGradient id="ine-bt-cell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="ine-bt-module" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ine-bt-pack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="ine-bt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">电池系统：电芯 → 模组 → 电池包</text>

      {/* 电芯层 */}
      <rect x="20" y="60" width="220" height="180" rx="10" fill="url(#ine-bt-cell)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <rect x="20" y="60" width="220" height="32" rx="10" fill="url(#ine-bt-cell)" opacity="0.9" />
      <text x="130" y="81" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">电芯 Cell</text>

      {/* 圆柱电芯 */}
      <circle cx="60" cy="120" r="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="60" y="124" textAnchor="middle" fontSize="8" fill="#15803d">+</text>
      <circle cx="92" cy="120" r="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="92" y="124" textAnchor="middle" fontSize="8" fill="#15803d">-</text>
      <text x="130" y="124" textAnchor="middle" fontSize="9" fill="#475569">圆柱</text>

      {/* 方形电芯 */}
      <rect x="44" y="148" width="30" height="30" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="80" y="148" width="30" height="30" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="130" y="166" textAnchor="middle" fontSize="9" fill="#475569">方形</text>

      {/* 软包电芯 */}
      <rect x="48" y="192" width="58" height="22" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="130" y="206" textAnchor="middle" fontSize="9" fill="#475569">软包</text>

      <text x="130" y="228" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">最小单元 ~3.7V</text>

      {/* 箭头 */}
      <path d="M244 150 L270 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-bt-arrow)" />
      <text x="257" y="140" textAnchor="middle" fontSize="9" fill="#64748b">串并联</text>

      {/* 模组层 */}
      <rect x="276" y="60" width="240" height="180" rx="10" fill="url(#ine-bt-module)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="276" y="60" width="240" height="32" rx="10" fill="url(#ine-bt-module)" opacity="0.9" />
      <text x="396" y="81" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">模组 Module</text>

      {/* 模组结构 */}
      <rect x="300" y="104" width="192" height="56" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="396" y="122" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">电芯组（4P12S 等）</text>
      <text x="396" y="140" textAnchor="middle" fontSize="9" fill="#475569">多个电芯串并联组合</text>

      <rect x="300" y="168" width="92" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="346" y="186" textAnchor="middle" fontSize="9" fill="#0369a1">汇流排</text>

      <rect x="400" y="168" width="92" height="28" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="446" y="186" textAnchor="middle" fontSize="9" fill="#0369a1">采样板</text>

      <rect x="300" y="204" width="192" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="396" y="220" textAnchor="middle" fontSize="9" fill="#0369a1">模组框架 + 热管理管路</text>

      <text x="396" y="238" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">中间单元 ~48V</text>

      {/* 箭头 */}
      <path d="M520 150 L546 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-bt-arrow)" />
      <text x="533" y="140" textAnchor="middle" fontSize="9" fill="#64748b">组合</text>

      {/* 电池包层 */}
      <rect x="552" y="60" width="228" height="180" rx="10" fill="url(#ine-bt-pack)" opacity="0.08" stroke="#9333ea" strokeWidth="2" />
      <rect x="552" y="60" width="228" height="32" rx="10" fill="url(#ine-bt-pack)" opacity="0.9" />
      <text x="666" y="81" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">电池包 Pack</text>

      <rect x="572" y="104" width="188" height="28" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="666" y="122" textAnchor="middle" fontSize="9" fill="#7e22ce">多个模组（12-24个）</text>

      <rect x="572" y="140" width="90" height="28" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="617" y="158" textAnchor="middle" fontSize="9" fill="#7e22ce">BMS 采集板</text>

      <rect x="670" y="140" width="90" height="28" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="715" y="158" textAnchor="middle" fontSize="9" fill="#7e22ce">高压分配盒</text>

      <rect x="572" y="176" width="90" height="28" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="617" y="194" textAnchor="middle" fontSize="9" fill="#7e22ce">液冷管路</text>

      <rect x="670" y="176" width="90" height="28" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="715" y="194" textAnchor="middle" fontSize="9" fill="#7e22ce">上盖 + 下箱体</text>

      <rect x="572" y="212" width="188" height="20" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="666" y="226" textAnchor="middle" fontSize="9" fill="#7e22ce">防护结构（IP67+）</text>

      <text x="666" y="238" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">完整总成 ~400V</text>

      {/* 电芯化学体系对比 */}
      <text x="400" y="276" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">主流电芯化学体系对比</text>

      <rect x="40" y="290" width="720" height="28" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="120" y="308" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">体系</text>
      <text x="260" y="308" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">能量密度</text>
      <text x="400" y="308" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">安全性</text>
      <text x="540" y="308" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">成本</text>
      <text x="680" y="308" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">典型应用</text>

      <rect x="40" y="322" width="720" height="28" rx="6" fill="#dcfce7" opacity="0.4" />
      <text x="120" y="340" textAnchor="middle" fontSize="10" fill="#15803d">磷酸铁锂 LFP</text>
      <text x="260" y="340" textAnchor="middle" fontSize="10" fill="#475569">中 (160Wh/kg)</text>
      <text x="400" y="340" textAnchor="middle" fontSize="10" fill="#475569">高</text>
      <text x="540" y="340" textAnchor="middle" fontSize="10" fill="#475569">低</text>
      <text x="680" y="340" textAnchor="middle" fontSize="10" fill="#475569">经济型车型</text>

      <rect x="40" y="354" width="720" height="28" rx="6" fill="#e0f2fe" opacity="0.4" />
      <text x="120" y="372" textAnchor="middle" fontSize="10" fill="#0369a1">三元锂 NCM</text>
      <text x="260" y="372" textAnchor="middle" fontSize="10" fill="#475569">高 (250Wh/kg)</text>
      <text x="400" y="372" textAnchor="middle" fontSize="10" fill="#475569">中</text>
      <text x="540" y="372" textAnchor="middle" fontSize="10" fill="#475569">高</text>
      <text x="680" y="372" textAnchor="middle" fontSize="10" fill="#475569">长续航车型</text>

      <rect x="40" y="386" width="720" height="28" rx="6" fill="#fef9c3" opacity="0.4" />
      <text x="120" y="404" textAnchor="middle" fontSize="10" fill="#a16207">半固态/固态</text>
      <text x="260" y="404" textAnchor="middle" fontSize="10" fill="#475569">极高 (350+)</text>
      <text x="400" y="404" textAnchor="middle" fontSize="10" fill="#475569">极高</text>
      <text x="540" y="404" textAnchor="middle" fontSize="10" fill="#475569">很高</text>
      <text x="680" y="404" textAnchor="middle" fontSize="10" fill="#475569">未来量产</text>

      {/* CTP/CTC 技术 */}
      <text x="400" y="442" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">结构创新：CTP 与 CTC 技术</text>

      <rect x="40" y="456" width="340" height="56" rx="8" fill="url(#ine-bt-module)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="210" y="478" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">CTP (Cell to Pack)</text>
      <text x="210" y="498" textAnchor="middle" fontSize="9" fill="#475569">跳过模组，电芯直集成到电池包</text>

      <rect x="420" y="456" width="340" height="56" rx="8" fill="url(#ine-bt-pack)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="590" y="478" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">CTC (Cell to Chassis)</text>
      <text x="590" y="498" textAnchor="middle" fontSize="9" fill="#475569">电芯直集成到车身底盘，电池即车身</text>

      {/* 底部总结 */}
      <rect x="40" y="528" width="720" height="32" rx="8" fill="url(#ine-bt-cell)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">核心脉络：电芯（化学能↔电能）→ 模组（串并联+管理）→ 电池包（高压总成+防护+热管理）</text>
    </svg>
  );
}
