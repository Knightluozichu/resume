"use client";

export function CsiLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="汽车构造全图解知识全景图与十章学习路径">
      <defs>
        <linearGradient id="csi-lm-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="csi-lm-power" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="csi-lm-chassis" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="csi-lm-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="csi-lm-sys" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="csi-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">汽车构造与知识全图解 · 知识全景图</text>

      {/* 左侧：五大学习阶段 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="78" width="240" height="46" rx="10" fill="url(#csi-lm-found)" opacity="0.95" />
      <text x="160" y="99" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础认知</text>
      <text x="160" y="116" textAnchor="middle" fontSize="11" fill="#e0f2fe">全景图 / 构造概览</text>

      <path d="M160 124 L160 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="40" y="132" width="240" height="46" rx="10" fill="url(#csi-lm-power)" opacity="0.95" />
      <text x="160" y="153" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">动力传动</text>
      <text x="160" y="170" textAnchor="middle" fontSize="11" fill="#dcfce7">发动机 / 变速器 / 传动</text>

      <path d="M160 178 L160 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="40" y="186" width="240" height="46" rx="10" fill="url(#csi-lm-chassis)" opacity="0.95" />
      <text x="160" y="207" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">底盘系统</text>
      <text x="160" y="224" textAnchor="middle" fontSize="11" fill="#fef9c3">悬架 / 转向 / 制动</text>

      <path d="M160 232 L160 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="40" y="240" width="240" height="46" rx="10" fill="url(#csi-lm-body)" opacity="0.95" />
      <text x="160" y="261" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">车身电子</text>
      <text x="160" y="278" textAnchor="middle" fontSize="11" fill="#f3e8ff">车身 / 内饰 / 电气电子</text>

      <path d="M160 286 L160 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="40" y="294" width="240" height="46" rx="10" fill="url(#csi-lm-sys)" opacity="0.95" />
      <text x="160" y="315" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">系统与复习</text>
      <text x="160" y="332" textAnchor="middle" fontSize="11" fill="#fee2e2">空调 / 安全 / 知识整合</text>

      <text x="160" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0ea5e9">从发动机到车身到安全的完整脉络</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="78" width="460" height="34" rx="8" fill="url(#csi-lm-found)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="100" fontSize="12" fontWeight="600" fill="#0369a1">ch0</text>
      <text x="372" y="100" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 112 L550 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="320" y="118" width="460" height="34" rx="8" fill="url(#csi-lm-power)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="338" y="140" fontSize="12" fontWeight="600" fill="#15803d">ch1</text>
      <text x="372" y="140" fontSize="11" fill="#475569">发动机系统——四大冲程与机构</text>

      <path d="M550 152 L550 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="320" y="158" width="460" height="34" rx="8" fill="url(#csi-lm-power)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="338" y="180" fontSize="12" fontWeight="600" fill="#15803d">ch2</text>
      <text x="372" y="180" fontSize="11" fill="#475569">变速器与传动系统——动力传递</text>

      <path d="M550 192 L550 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="320" y="198" width="460" height="34" rx="8" fill="url(#csi-lm-chassis)" opacity="0.12" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="338" y="220" fontSize="12" fontWeight="600" fill="#a16207">ch3</text>
      <text x="372" y="220" fontSize="11" fill="#475569">底盘与悬架——支撑与减振</text>

      <path d="M550 232 L550 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="320" y="238" width="460" height="34" rx="8" fill="url(#csi-lm-chassis)" opacity="0.12" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="338" y="260" fontSize="12" fontWeight="600" fill="#a16207">ch4</text>
      <text x="372" y="260" fontSize="11" fill="#475569">转向与制动系统——操控与安全</text>

      <path d="M550 272 L550 276" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="320" y="278" width="460" height="34" rx="8" fill="url(#csi-lm-body)" opacity="0.12" stroke="#9333ea" strokeWidth="1.5" />
      <text x="338" y="300" fontSize="12" fontWeight="600" fill="#7e22ce">ch5</text>
      <text x="372" y="300" fontSize="11" fill="#475569">车身与内饰——结构与人机</text>

      <path d="M550 312 L550 316" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="320" y="318" width="460" height="34" rx="8" fill="url(#csi-lm-body)" opacity="0.12" stroke="#9333ea" strokeWidth="1.5" />
      <text x="338" y="340" fontSize="12" fontWeight="600" fill="#7e22ce">ch6</text>
      <text x="372" y="340" fontSize="11" fill="#475569">电气与电子系统——电源与ECU</text>

      <path d="M550 352 L550 356" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="320" y="358" width="460" height="34" rx="8" fill="url(#csi-lm-sys)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="380" fontSize="12" fontWeight="600" fill="#b91c1c">ch7</text>
      <text x="372" y="380" fontSize="11" fill="#475569">空调与舒适性系统——温控与NVH</text>

      <path d="M550 392 L550 396" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="320" y="398" width="460" height="34" rx="8" fill="url(#csi-lm-sys)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="420" fontSize="12" fontWeight="600" fill="#b91c1c">ch8</text>
      <text x="372" y="420" fontSize="11" fill="#475569">安全系统——主动与被动防护</text>

      <path d="M550 432 L550 436" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-lm-arrow)" />

      <rect x="320" y="438" width="460" height="34" rx="8" fill="url(#csi-lm-sys)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="460" fontSize="12" fontWeight="600" fill="#b91c1c">ch9</text>
      <text x="372" y="460" fontSize="11" fill="#475569">全书复习与知识整合——系统闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="500" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="520" textAnchor="middle" fontSize="11" fill="#475569">全景 → 发动机 → 变速传动 → 底盘悬架 → 转向制动 → 车身内饰 → 电气电子 → 空调舒适 → 安全系统 → 知识整合</text>

      {/* 底部核心脉络 */}
      <rect x="40" y="542" width="740" height="28" rx="8" fill="url(#csi-lm-found)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="410" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：构造概览 → 发动机 → 变速传动 → 底盘悬架 → 转向制动 → 车身内饰 → 电气电子 → 空调舒适 → 安全系统 → 知识闭环</text>
    </svg>
  );
}
