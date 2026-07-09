"use client";

export function IneFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="全书复习：新能源汽车知识整合与系统闭环">
      <defs>
        <linearGradient id="ine-fr-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ine-fr-power" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="ine-fr-elec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="ine-fr-mgmt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="ine-fr-future" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="ine-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：新能源汽车知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="140" height="56" rx="8" fill="url(#ine-fr-found)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0-1 基础</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">全景+概览</text>

      <path d="M162 102 L182 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-fr-arrow)" />

      <rect x="186" y="74" width="140" height="56" rx="8" fill="url(#ine-fr-power)" opacity="0.9" />
      <text x="256" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch2-4 动力</text>
      <text x="256" y="116" textAnchor="middle" fontSize="9" fill="#dcfce7">电池+电机+电力电子</text>

      <path d="M328 102 L348 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-fr-arrow)" />

      <rect x="352" y="74" width="120" height="56" rx="8" fill="url(#ine-fr-elec)" opacity="0.9" />
      <text x="412" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 充电</text>
      <text x="412" y="116" textAnchor="middle" fontSize="9" fill="#fef9c3">充电+BMS+热管理</text>

      <path d="M474 102 L494 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-fr-arrow)" />

      <rect x="498" y="74" width="120" height="56" rx="8" fill="url(#ine-fr-mgmt)" opacity="0.9" />
      <text x="558" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch7 整车</text>
      <text x="558" y="116" textAnchor="middle" fontSize="9" fill="#f3e8ff">底盘+车身</text>

      <path d="M620 102 L640 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-fr-arrow)" />

      <rect x="644" y="74" width="116" height="56" rx="8" fill="url(#ine-fr-future)" opacity="0.9" />
      <text x="702" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch8-9 未来</text>
      <text x="702" y="116" textAnchor="middle" fontSize="9" fill="#fee2e2">安全+整合</text>

      {/* 五层系统视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五层系统视角</text>

      <rect x="20" y="176" width="148" height="150" rx="8" fill="url(#ine-fr-found)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="94" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">认知层</text>
      <text x="94" y="220" textAnchor="middle" fontSize="9" fill="#475569">NEV 三大类型</text>
      <text x="94" y="236" textAnchor="middle" fontSize="9" fill="#475569">BEV/PHEV/HEV</text>
      <text x="94" y="252" textAnchor="middle" fontSize="9" fill="#475569">三电系统概念</text>
      <text x="94" y="268" textAnchor="middle" fontSize="9" fill="#475569">学习路径全景</text>
      <text x="94" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">建立系统认知</text>

      <rect x="178" y="176" width="148" height="150" rx="8" fill="url(#ine-fr-power)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="252" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">动力层</text>
      <text x="252" y="220" textAnchor="middle" fontSize="9" fill="#475569">电池电芯到包</text>
      <text x="252" y="236" textAnchor="middle" fontSize="9" fill="#475569">PMSM 电机控制</text>
      <text x="252" y="252" textAnchor="middle" fontSize="9" fill="#475569">逆变器/DC-DC/OBC</text>
      <text x="252" y="268" textAnchor="middle" fontSize="9" fill="#475569">SiC 功率器件</text>
      <text x="252" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">定义能量转换</text>

      <rect x="336" y="176" width="148" height="150" rx="8" fill="url(#ine-fr-elec)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="410" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">管理层</text>
      <text x="410" y="220" textAnchor="middle" fontSize="9" fill="#475569">充电系统</text>
      <text x="410" y="236" textAnchor="middle" fontSize="9" fill="#475569">BMS 三层架构</text>
      <text x="410" y="252" textAnchor="middle" fontSize="9" fill="#475569">热管理液冷/加热</text>
      <text x="410" y="268" textAnchor="middle" fontSize="9" fill="#475569">SOC/SOH 估算</text>
      <text x="410" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">定义监控保护</text>

      <rect x="494" y="176" width="148" height="150" rx="8" fill="url(#ine-fr-mgmt)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="568" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">架构层</text>
      <text x="568" y="220" textAnchor="middle" fontSize="9" fill="#475569">纯电专属平台</text>
      <text x="568" y="236" textAnchor="middle" fontSize="9" fill="#475569">滑板底盘</text>
      <text x="568" y="252" textAnchor="middle" fontSize="9" fill="#475569">CTC 电池即车身</text>
      <text x="568" y="268" textAnchor="middle" fontSize="9" fill="#475569">底盘四大系统</text>
      <text x="568" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">定义整车结构</text>

      <rect x="652" y="176" width="128" height="150" rx="8" fill="url(#ine-fr-future)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="716" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">未来层</text>
      <text x="716" y="220" textAnchor="middle" fontSize="9" fill="#475569">高压安全</text>
      <text x="716" y="236" textAnchor="middle" fontSize="9" fill="#475569">功能安全</text>
      <text x="716" y="252" textAnchor="middle" fontSize="9" fill="#475569">智能驾驶</text>
      <text x="716" y="268" textAnchor="middle" fontSize="9" fill="#475569">固态电池/800V</text>
      <text x="716" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">定义安全演进</text>

      {/* 能量流动决策链 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">能量流动决策链</text>

      <rect x="20" y="364" width="110" height="56" rx="8" fill="#fffbeb" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="75" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">电网/充电</text>
      <text x="75" y="404" textAnchor="middle" fontSize="8" fill="#475569">AC/DC 输入</text>

      <path d="M130 392 L148 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-fr-arrow)" />

      <rect x="152" y="364" width="110" height="56" rx="8" fill="#eff6ff" stroke="#16a34a" strokeWidth="1.5" />
      <text x="207" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">电池包</text>
      <text x="207" y="404" textAnchor="middle" fontSize="8" fill="#475569">BMS 管控</text>

      <path d="M262 392 L280 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-fr-arrow)" />

      <rect x="284" y="364" width="110" height="56" rx="8" fill="#ecfeff" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="339" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">逆变器</text>
      <text x="339" y="404" textAnchor="middle" fontSize="8" fill="#475569">DC→AC</text>

      <path d="M394 392 L412 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-fr-arrow)" />

      <rect x="416" y="364" width="110" height="56" rx="8" fill="#f0fdf4" stroke="#9333ea" strokeWidth="1.5" />
      <text x="471" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">驱动电机</text>
      <text x="471" y="404" textAnchor="middle" fontSize="8" fill="#475569">电能→机械能</text>

      <path d="M526 392 L544 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-fr-arrow)" />

      <rect x="548" y="364" width="110" height="56" rx="8" fill="#fff7ed" stroke="#dc2626" strokeWidth="1.5" />
      <text x="603" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">减速器</text>
      <text x="603" y="404" textAnchor="middle" fontSize="8" fill="#475569">动力传递</text>

      <path d="M658 392 L676 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#ine-fr-arrow)" />

      <rect x="680" y="364" width="100" height="56" rx="8" fill="url(#ine-fr-future)" opacity="0.15" stroke="#dc2626" strokeWidth="1.5" />
      <text x="730" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">车轮驱动</text>
      <text x="730" y="404" textAnchor="middle" fontSize="8" fill="#475569">车辆行驶</text>

      {/* 核心能力与挑战 */}
      <text x="400" y="450" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心能力与挑战</text>

      <rect x="30" y="464" width="370" height="56" rx="8" fill="url(#ine-fr-power)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="215" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">能力跃迁路径</text>
      <text x="215" y="504" textAnchor="middle" fontSize="9" fill="#475569">理解类型 → 掌握电池 → 驱动电机 → 电力变换 → 充电管理 → 整车架构 → 安全趋势</text>

      <rect x="410" y="464" width="360" height="56" rx="8" fill="url(#ine-fr-future)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">核心挑战</text>
      <text x="590" y="504" textAnchor="middle" fontSize="9" fill="#475569">续航焦虑 / 充电速度 / 电池安全 / 成本控制 / 智能化水平</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#ine-fr-found)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：认知 → 电池 → 电机 → 电力电子 → 充电 → BMS热管理 → 底盘车身 → 安全趋势 → 系统闭环</text>

      <rect x="30" y="564" width="740" height="12" rx="6" fill="url(#ine-fr-found)" opacity="0.1" />
    </svg>
  );
}
