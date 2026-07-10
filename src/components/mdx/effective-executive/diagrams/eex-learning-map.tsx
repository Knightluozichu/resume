"use client";

export function EexLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="卓有成效的管理者知识全景图与十章学习路径">
      <defs>
        <linearGradient id="eex-lm-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="eex-lm-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="eex-lm-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eex-lm-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="eex-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">卓有成效的管理者 · 知识全景图</text>

      {/* 左侧：四大学习板块 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="78" width="240" height="50" rx="10" fill="url(#eex-lm-1)" opacity="0.95" />
      <text x="160" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">认识有效性</text>
      <text x="160" y="118" textAnchor="middle" fontSize="11" fill="#e0f2fe">全景图 / 有效性可学会</text>

      <path d="M160 128 L160 132" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="40" y="136" width="240" height="50" rx="10" fill="url(#eex-lm-2)" opacity="0.95" />
      <text x="160" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">资源管理</text>
      <text x="160" y="176" textAnchor="middle" fontSize="11" fill="#ede9fe">时间 / 贡献</text>

      <path d="M160 186 L160 190" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="40" y="194" width="240" height="50" rx="10" fill="url(#eex-lm-3)" opacity="0.95" />
      <text x="160" y="216" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">聚焦与取舍</text>
      <text x="160" y="234" textAnchor="middle" fontSize="11" fill="#fef3c7">长处 / 要事优先</text>

      <path d="M160 244 L160 248" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="40" y="252" width="240" height="50" rx="10" fill="url(#eex-lm-4)" opacity="0.95" />
      <text x="160" y="274" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">决策与整合</text>
      <text x="160" y="292" textAnchor="middle" fontSize="11" fill="#d1fae5">决策要素 / 有效决策 / 复习</text>

      <text x="160" y="324" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0ea5e9">从认识有效性到管理者之道</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="78" width="460" height="30" rx="8" fill="url(#eex-lm-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="98" fontSize="12" fontWeight="600" fill="#0369a1">ch0</text>
      <text x="372" y="98" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 108 L550 112" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="320" y="114" width="460" height="30" rx="8" fill="url(#eex-lm-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="134" fontSize="12" fontWeight="600" fill="#0369a1">ch1</text>
      <text x="372" y="134" fontSize="11" fill="#475569">卓有成效是可以学会的——有效性基础</text>

      <path d="M550 144 L550 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="320" y="150" width="460" height="30" rx="8" fill="url(#eex-lm-2)" opacity="0.12" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="338" y="170" fontSize="12" fontWeight="600" fill="#7c3aed">ch2</text>
      <text x="372" y="170" fontSize="11" fill="#475569">掌握自己的时间——记录管理与整块化</text>

      <path d="M550 180 L550 184" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="320" y="186" width="460" height="30" rx="8" fill="url(#eex-lm-2)" opacity="0.12" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="338" y="206" fontSize="12" fontWeight="600" fill="#7c3aed">ch3</text>
      <text x="372" y="206" fontSize="11" fill="#475569">我能贡献什么——从努力到成果</text>

      <path d="M550 216 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="320" y="222" width="460" height="30" rx="8" fill="url(#eex-lm-3)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="242" fontSize="12" fontWeight="600" fill="#d97706">ch4</text>
      <text x="372" y="242" fontSize="11" fill="#475569">发挥长处——用人所长而非补短</text>

      <path d="M550 252 L550 256" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="320" y="258" width="460" height="30" rx="8" fill="url(#eex-lm-3)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="278" fontSize="12" fontWeight="600" fill="#d97706">ch5</text>
      <text x="372" y="278" fontSize="11" fill="#475569">要事优先——集中精力于少数要务</text>

      <path d="M550 288 L550 292" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="320" y="294" width="460" height="30" rx="8" fill="url(#eex-lm-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="338" y="314" fontSize="12" fontWeight="600" fill="#059669">ch6</text>
      <text x="372" y="314" fontSize="11" fill="#475569">决策的要素——五步决策流程</text>

      <path d="M550 324 L550 328" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="320" y="330" width="460" height="30" rx="8" fill="url(#eex-lm-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="338" y="350" fontSize="12" fontWeight="600" fill="#059669">ch7</text>
      <text x="372" y="350" fontSize="11" fill="#475569">有效的决策——判断而非计算</text>

      <path d="M550 360 L550 364" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="320" y="366" width="460" height="30" rx="8" fill="url(#eex-lm-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="338" y="386" fontSize="12" fontWeight="600" fill="#059669">ch8</text>
      <text x="372" y="386" fontSize="11" fill="#475569">结论与管理者之道——有效性必须学会</text>

      <path d="M550 396 L550 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-lm-arrow)" />

      <rect x="320" y="402" width="460" height="30" rx="8" fill="url(#eex-lm-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="338" y="422" fontSize="12" fontWeight="600" fill="#059669">ch9</text>
      <text x="372" y="422" fontSize="11" fill="#475569">全书复习与知识整合——闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="450" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="470" textAnchor="middle" fontSize="10" fill="#475569">全景 → 有效性 → 时间 → 贡献 → 长处 → 要事优先 → 决策要素 → 有效决策 → 结论 → 复习</text>

      {/* 底部核心脉络 */}
      <rect x="40" y="492" width="740" height="28" rx="8" fill="url(#eex-lm-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="410" y="510" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：认识有效性 → 掌握时间 → 聚焦贡献 → 发挥长处 → 要事优先 → 有效决策</text>

      {/* 底部三阶段对比 */}
      <rect x="40" y="528" width="240" height="32" rx="8" fill="url(#eex-lm-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="160" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">做正确的事：有效性</text>

      <rect x="300" y="528" width="240" height="32" rx="8" fill="url(#eex-lm-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="420" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">聚焦所长：少数要务</text>

      <rect x="560" y="528" width="240" height="32" rx="8" fill="url(#eex-lm-4)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="680" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">有效决策：判断之道</text>
    </svg>
  );
}
