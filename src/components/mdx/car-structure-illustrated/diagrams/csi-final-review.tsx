"use client";

export function CsiFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="全书复习：汽车构造知识整合与系统闭环">
      <defs>
        <linearGradient id="csi-fr-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="csi-fr-power" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="csi-fr-chassis" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="csi-fr-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="csi-fr-sys" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="csi-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：汽车构造知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="140" height="56" rx="8" fill="url(#csi-fr-found)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0 基础</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">全景图</text>

      <path d="M162 102 L182 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-fr-arrow)" />

      <rect x="186" y="74" width="140" height="56" rx="8" fill="url(#csi-fr-power)" opacity="0.9" />
      <text x="256" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch1-2 动力</text>
      <text x="256" y="116" textAnchor="middle" fontSize="9" fill="#dcfce7">发动机+变速传动</text>

      <path d="M328 102 L348 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-fr-arrow)" />

      <rect x="352" y="74" width="120" height="56" rx="8" fill="url(#csi-fr-chassis)" opacity="0.9" />
      <text x="412" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 底盘</text>
      <text x="412" y="116" textAnchor="middle" fontSize="9" fill="#fef9c3">悬架+转向制动</text>

      <path d="M474 102 L494 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-fr-arrow)" />

      <rect x="498" y="74" width="120" height="56" rx="8" fill="url(#csi-fr-body)" opacity="0.9" />
      <text x="558" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 车身</text>
      <text x="558" y="116" textAnchor="middle" fontSize="9" fill="#f3e8ff">内饰+电气电子</text>

      <path d="M620 102 L640 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-fr-arrow)" />

      <rect x="644" y="74" width="116" height="56" rx="8" fill="url(#csi-fr-sys)" opacity="0.9" />
      <text x="702" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch7-9 系统</text>
      <text x="702" y="116" textAnchor="middle" fontSize="9" fill="#fee2e2">空调+安全+整合</text>

      {/* 五层系统视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五层系统视角</text>

      <rect x="20" y="176" width="148" height="150" rx="8" fill="url(#csi-fr-found)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="94" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">认知层</text>
      <text x="94" y="220" textAnchor="middle" fontSize="9" fill="#475569">知识全景图</text>
      <text x="94" y="236" textAnchor="middle" fontSize="9" fill="#475569">汽车基本构成</text>
      <text x="94" y="252" textAnchor="middle" fontSize="9" fill="#475569">五大学习阶段</text>
      <text x="94" y="268" textAnchor="middle" fontSize="9" fill="#475569">学习路径总览</text>
      <text x="94" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">建立系统认知</text>

      <rect x="178" y="176" width="148" height="150" rx="8" fill="url(#csi-fr-power)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="252" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">动力层</text>
      <text x="252" y="220" textAnchor="middle" fontSize="9" fill="#475569">四冲程发动机</text>
      <text x="252" y="236" textAnchor="middle" fontSize="9" fill="#475569">两大机构五大系统</text>
      <text x="252" y="252" textAnchor="middle" fontSize="9" fill="#475569">四种变速器</text>
      <text x="252" y="268" textAnchor="middle" fontSize="9" fill="#475569">动力传递路径</text>
      <text x="252" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">定义能量转换</text>

      <rect x="336" y="176" width="148" height="150" rx="8" fill="url(#csi-fr-chassis)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="410" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">底盘层</text>
      <text x="410" y="220" textAnchor="middle" fontSize="9" fill="#475569">底盘四大系统</text>
      <text x="410" y="236" textAnchor="middle" fontSize="9" fill="#475569">四种悬架类型</text>
      <text x="410" y="252" textAnchor="middle" fontSize="9" fill="#475569">转向助力原理</text>
      <text x="410" y="268" textAnchor="middle" fontSize="9" fill="#475569">ABS制动防抱死</text>
      <text x="410" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">定义操控支撑</text>

      <rect x="494" y="176" width="148" height="150" rx="8" fill="url(#csi-fr-body)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="568" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">车身层</text>
      <text x="568" y="220" textAnchor="middle" fontSize="9" fill="#475569">承载/非承载车身</text>
      <text x="568" y="236" textAnchor="middle" fontSize="9" fill="#475569">三厢结构设计</text>
      <text x="568" y="252" textAnchor="middle" fontSize="9" fill="#475569">电源系统12V</text>
      <text x="568" y="268" textAnchor="middle" fontSize="9" fill="#475569">ECU+CAN总线</text>
      <text x="568" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">定义承载交互</text>

      <rect x="652" y="176" width="128" height="150" rx="8" fill="url(#csi-fr-sys)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="716" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">系统层</text>
      <text x="716" y="220" textAnchor="middle" fontSize="9" fill="#475569">空调制冷循环</text>
      <text x="716" y="236" textAnchor="middle" fontSize="9" fill="#475569">舒适性NVH</text>
      <text x="716" y="252" textAnchor="middle" fontSize="9" fill="#475569">主动安全ABS</text>
      <text x="716" y="268" textAnchor="middle" fontSize="9" fill="#475569">被动安全气囊</text>
      <text x="716" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">定义安全舒适</text>

      {/* 动力传递决策链 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">动力传递决策链</text>

      <rect x="20" y="364" width="100" height="56" rx="8" fill="#fffbeb" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="70" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">燃料供给</text>
      <text x="70" y="404" textAnchor="middle" fontSize="8" fill="#475569">化学能输入</text>

      <path d="M120 392 L138 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-fr-arrow)" />

      <rect x="142" y="364" width="100" height="56" rx="8" fill="#eff6ff" stroke="#16a34a" strokeWidth="1.5" />
      <text x="192" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">发动机</text>
      <text x="192" y="404" textAnchor="middle" fontSize="8" fill="#475569">四冲程做功</text>

      <path d="M242 392 L260 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-fr-arrow)" />

      <rect x="264" y="364" width="100" height="56" rx="8" fill="#ecfeff" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="314" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">变速器</text>
      <text x="314" y="404" textAnchor="middle" fontSize="8" fill="#475569">变扭变速</text>

      <path d="M364 392 L382 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-fr-arrow)" />

      <rect x="386" y="364" width="100" height="56" rx="8" fill="#f0fdf4" stroke="#9333ea" strokeWidth="1.5" />
      <text x="436" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">传动轴</text>
      <text x="436" y="404" textAnchor="middle" fontSize="8" fill="#475569">动力传递</text>

      <path d="M486 392 L504 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-fr-arrow)" />

      <rect x="508" y="364" width="100" height="56" rx="8" fill="#fff7ed" stroke="#dc2626" strokeWidth="1.5" />
      <text x="558" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">差速器</text>
      <text x="558" y="404" textAnchor="middle" fontSize="8" fill="#475569">分配动力</text>

      <path d="M608 392 L626 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-fr-arrow)" />

      <rect x="630" y="364" width="100" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="680" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">驱动轮</text>
      <text x="680" y="404" textAnchor="middle" fontSize="8" fill="#475569">车辆行驶</text>

      <path d="M680 420 L680 430 L70 430 L70 420" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x="375" y="446" textAnchor="middle" fontSize="9" fill="#64748b">制动时逆向：车轮 → 制动器 → 减速（能量耗散）</text>

      {/* 核心能力与挑战 */}
      <text x="400" y="470" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心能力与演进方向</text>

      <rect x="30" y="484" width="370" height="48" rx="8" fill="url(#csi-fr-power)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="215" y="504" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">能力跃迁路径</text>
      <text x="215" y="522" textAnchor="middle" fontSize="9" fill="#475569">构造概览 → 发动机 → 变速传动 → 底盘悬架 → 转向制动 → 车身内饰 → 电气电子 → 空调安全</text>

      <rect x="410" y="484" width="360" height="48" rx="8" fill="url(#csi-fr-sys)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="504" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">演进方向</text>
      <text x="590" y="522" textAnchor="middle" fontSize="9" fill="#475569">轻量化 / 电动化 / 智能化 / 网联化 / 共享化</text>

      {/* 底部总结 */}
      <rect x="30" y="542" width="740" height="32" rx="8" fill="url(#csi-fr-found)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：构造概览 → 发动机 → 变速传动 → 底盘悬架 → 转向制动 → 车身内饰 → 电气电子 → 空调舒适 → 安全系统 → 系统闭环</text>
    </svg>
  );
}
