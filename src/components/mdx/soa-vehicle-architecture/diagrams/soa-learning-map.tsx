"use client";

export function SoaLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="SOA车载软件架构知识全景图与十章学习路径">
      <defs>
        <linearGradient id="soa-lm-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="soa-lm-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="soa-lm-design" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="soa-lm-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="soa-lm-prac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="soa-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">SOA 车载软件架构与开发 · 知识全景图</text>

      {/* 左侧：五大学习阶段 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="78" width="240" height="46" rx="10" fill="url(#soa-lm-found)" opacity="0.95" />
      <text x="160" y="99" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础认知</text>
      <text x="160" y="116" textAnchor="middle" fontSize="11" fill="#e0f2fe">全景图 / SOA基础 / 架构演进</text>

      <path d="M160 124 L160 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="40" y="132" width="240" height="46" rx="10" fill="url(#soa-lm-arch)" opacity="0.95" />
      <text x="160" y="153" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">服务设计</text>
      <text x="160" y="170" textAnchor="middle" fontSize="11" fill="#dcfce7">服务设计 / 通信协议</text>

      <path d="M160 178 L160 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="40" y="186" width="240" height="46" rx="10" fill="url(#soa-lm-design)" opacity="0.95" />
      <text x="160" y="207" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">中间件层</text>
      <text x="160" y="224" textAnchor="middle" fontSize="11" fill="#f3e8ff">服务发现 / 自适应平台AP</text>

      <path d="M160 232 L160 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="40" y="240" width="240" height="46" rx="10" fill="url(#soa-lm-mid)" opacity="0.95" />
      <text x="160" y="261" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">工程实践</text>
      <text x="160" y="278" textAnchor="middle" fontSize="11" fill="#fef9c3">方法论 / 工具链</text>

      <path d="M160 286 L160 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="40" y="294" width="240" height="46" rx="10" fill="url(#soa-lm-prac)" opacity="0.95" />
      <text x="160" y="315" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">案例与复习</text>
      <text x="160" y="332" textAnchor="middle" fontSize="11" fill="#fee2e2">案例分析 / 全书复习</text>

      <text x="160" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0ea5e9">从SOA基础到AP集成到工程实践的完整脉络</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="78" width="460" height="34" rx="8" fill="url(#soa-lm-found)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="100" fontSize="12" fontWeight="600" fill="#0369a1">ch0</text>
      <text x="372" y="100" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 112 L550 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="320" y="118" width="460" height="34" rx="8" fill="url(#soa-lm-found)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="140" fontSize="12" fontWeight="600" fill="#0369a1">ch1</text>
      <text x="372" y="140" fontSize="11" fill="#475569">SOA基础概念与原则——松耦合与契约</text>

      <path d="M550 152 L550 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="320" y="158" width="460" height="34" rx="8" fill="url(#soa-lm-arch)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="338" y="180" fontSize="12" fontWeight="600" fill="#15803d">ch2</text>
      <text x="372" y="180" fontSize="11" fill="#475569">车载软件架构演进——分布式到SOA</text>

      <path d="M550 192 L550 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="320" y="198" width="460" height="34" rx="8" fill="url(#soa-lm-arch)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="338" y="220" fontSize="12" fontWeight="600" fill="#15803d">ch3</text>
      <text x="372" y="220" fontSize="11" fill="#475569">服务设计与接口定义——IDL与事件</text>

      <path d="M550 232 L550 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="320" y="238" width="460" height="34" rx="8" fill="url(#soa-lm-arch)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="338" y="260" fontSize="12" fontWeight="600" fill="#15803d">ch4</text>
      <text x="372" y="260" fontSize="11" fill="#475569">通信协议——SOME/IP与DDS对比</text>

      <path d="M550 272 L550 276" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="320" y="278" width="460" height="34" rx="8" fill="url(#soa-lm-design)" opacity="0.12" stroke="#9333ea" strokeWidth="1.5" />
      <text x="338" y="300" fontSize="12" fontWeight="600" fill="#7e22ce">ch5</text>
      <text x="372" y="300" fontSize="11" fill="#475569">服务发现与中间件——SD协议</text>

      <path d="M550 312 L550 316" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="320" y="318" width="460" height="34" rx="8" fill="url(#soa-lm-design)" opacity="0.12" stroke="#9333ea" strokeWidth="1.5" />
      <text x="338" y="340" fontSize="12" fontWeight="600" fill="#7e22ce">ch6</text>
      <text x="372" y="340" fontSize="11" fill="#475569">自适应平台AP集成——ARA与FC</text>

      <path d="M550 352 L550 356" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="320" y="358" width="460" height="34" rx="8" fill="url(#soa-lm-mid)" opacity="0.12" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="338" y="380" fontSize="12" fontWeight="600" fill="#a16207">ch7</text>
      <text x="372" y="380" fontSize="11" fill="#475569">方法论与开发工具链——V模型</text>

      <path d="M550 392 L550 396" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="320" y="398" width="460" height="34" rx="8" fill="url(#soa-lm-prac)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="420" fontSize="12" fontWeight="600" fill="#b91c1c">ch8</text>
      <text x="372" y="420" fontSize="11" fill="#475569">案例分析与未来趋势——智能座舱</text>

      <path d="M550 432 L550 436" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-lm-arrow)" />

      <rect x="320" y="438" width="460" height="34" rx="8" fill="url(#soa-lm-prac)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="460" fontSize="12" fontWeight="600" fill="#b91c1c">ch9</text>
      <text x="372" y="460" fontSize="11" fill="#475569">全书复习与知识整合——系统闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="500" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="520" textAnchor="middle" fontSize="11" fill="#475569">全景 → SOA基础 → 架构演进 → 服务设计 → 通信协议 → 服务发现 → AP集成 → 工具链 → 案例 → 复习</text>

      {/* 底部核心脉络 */}
      <rect x="40" y="542" width="740" height="28" rx="8" fill="url(#soa-lm-found)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="410" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：SOA原则 → 架构演进 → 服务设计 → 通信 → 中间件 → AP → 工具链 → 知识闭环</text>
    </svg>
  );
}
