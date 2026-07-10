"use client";

export function OocLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="失控知识全景图与十章学习路径">
      <defs>
        <linearGradient id="ooc-lm-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ooc-lm-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="ooc-lm-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ooc-lm-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="ooc-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">失控 · 知识全景图</text>

      {/* 左侧：四大学习板块 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="78" width="240" height="50" rx="10" fill="url(#ooc-lm-1)" opacity="0.95" />
      <text x="160" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础认知</text>
      <text x="160" y="118" textAnchor="middle" fontSize="11" fill="#e0f2fe">全景图 / 生物与机器 / 涌现</text>

      <path d="M160 128 L160 132" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="40" y="136" width="240" height="50" rx="10" fill="url(#ooc-lm-2)" opacity="0.95" />
      <text x="160" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">进化机制</text>
      <text x="160" y="176" textAnchor="middle" fontSize="11" fill="#ede9fe">共同进化 / 生态系统</text>

      <path d="M160 186 L160 190" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="40" y="194" width="240" height="50" rx="10" fill="url(#ooc-lm-3)" opacity="0.95" />
      <text x="160" y="216" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">经济与智能</text>
      <text x="160" y="234" textAnchor="middle" fontSize="11" fill="#fef3c7">网络经济 / 群体智能</text>

      <path d="M160 244 L160 248" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="40" y="252" width="240" height="50" rx="10" fill="url(#ooc-lm-4)" opacity="0.95" />
      <text x="160" y="274" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">反思与整合</text>
      <text x="160" y="292" textAnchor="middle" fontSize="11" fill="#d1fae5">控制失败 / 未来启示 / 复习</text>

      <text x="160" y="324" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0ea5e9">从生物逻辑到机器文明</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="78" width="460" height="30" rx="8" fill="url(#ooc-lm-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="98" fontSize="12" fontWeight="600" fill="#0369a1">ch0</text>
      <text x="372" y="98" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 108 L550 112" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="320" y="114" width="460" height="30" rx="8" fill="url(#ooc-lm-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="134" fontSize="12" fontWeight="600" fill="#0369a1">ch1</text>
      <text x="372" y="134" fontSize="11" fill="#475569">生物与机器的融合——活系统</text>

      <path d="M550 144 L550 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="320" y="150" width="460" height="30" rx="8" fill="url(#ooc-lm-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="170" fontSize="12" fontWeight="600" fill="#0369a1">ch2</text>
      <text x="372" y="170" fontSize="11" fill="#475569">涌现与自组织——从简单到复杂</text>

      <path d="M550 180 L550 184" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="320" y="186" width="460" height="30" rx="8" fill="url(#ooc-lm-2)" opacity="0.12" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="338" y="206" fontSize="12" fontWeight="600" fill="#7c3aed">ch3</text>
      <text x="372" y="206" fontSize="11" fill="#475569">共同进化——物种间的协同舞</text>

      <path d="M550 216 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="320" y="222" width="460" height="30" rx="8" fill="url(#ooc-lm-2)" opacity="0.12" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="338" y="242" fontSize="12" fontWeight="600" fill="#7c3aed">ch4</text>
      <text x="372" y="242" fontSize="11" fill="#475569">生态系统——多样性与稳定性</text>

      <path d="M550 252 L550 256" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="320" y="258" width="460" height="30" rx="8" fill="url(#ooc-lm-3)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="278" fontSize="12" fontWeight="600" fill="#d97706">ch5</text>
      <text x="372" y="278" fontSize="11" fill="#475569">网络经济——分布式商业法则</text>

      <path d="M550 288 L550 292" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="320" y="294" width="460" height="30" rx="8" fill="url(#ooc-lm-3)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="314" fontSize="12" fontWeight="600" fill="#d97706">ch6</text>
      <text x="372" y="314" fontSize="11" fill="#475569">群体智能——蜂群与分布式智慧</text>

      <path d="M550 324 L550 328" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="320" y="330" width="460" height="30" rx="8" fill="url(#ooc-lm-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="338" y="350" fontSize="12" fontWeight="600" fill="#059669">ch7</text>
      <text x="372" y="350" fontSize="11" fill="#475569">控制的失败——为何失控即控制</text>

      <path d="M550 360 L550 364" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="320" y="366" width="460" height="30" rx="8" fill="url(#ooc-lm-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="338" y="386" fontSize="12" fontWeight="600" fill="#059669">ch8</text>
      <text x="372" y="386" fontSize="11" fill="#475569">未来趋势与启示——技术生物化</text>

      <path d="M550 396 L550 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-lm-arrow)" />

      <rect x="320" y="402" width="460" height="30" rx="8" fill="url(#ooc-lm-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="338" y="422" fontSize="12" fontWeight="600" fill="#059669">ch9</text>
      <text x="372" y="422" fontSize="11" fill="#475569">全书复习与知识整合——闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="450" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="470" textAnchor="middle" fontSize="10" fill="#475569">全景 → 融合 → 涌现 → 共同进化 → 生态 → 网络经济 → 群体智能 → 控制失败 → 未来 → 复习</text>

      {/* 底部核心脉络 */}
      <rect x="40" y="492" width="740" height="28" rx="8" fill="url(#ooc-lm-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="410" y="510" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：生物逻辑 → 涌现自组织 → 共同进化 → 分布式网络 → 失控即控制</text>

      {/* 底部三阶段对比 */}
      <rect x="40" y="528" width="240" height="32" rx="8" fill="url(#ooc-lm-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="160" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">生物逻辑：活系统法则</text>

      <rect x="300" y="528" width="240" height="32" rx="8" fill="url(#ooc-lm-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="420" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">网络经济：分布式涌现</text>

      <rect x="560" y="528" width="240" height="32" rx="8" fill="url(#ooc-lm-4)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="680" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">失控即控制：去中心化</text>
    </svg>
  );
}
