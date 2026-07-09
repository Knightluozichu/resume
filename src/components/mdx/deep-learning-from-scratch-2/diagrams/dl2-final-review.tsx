"use client";

export function Dl2FinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="全书知识整合与DeZero架构全景">
      <defs>
        <linearGradient id="dl2-fr-engine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dl2-fr-autodiff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dl2-fr-eng" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dl2-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="dl2-fr-rev" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">全书知识整合：DeZero 架构全景</text>

      {/* 训练流程闭环 */}
      <rect x="40" y="60" width="720" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">一次完整训练：知识串联</text>

      {/* 流程节点 */}
      <rect x="60" y="104" width="120" height="44" rx="8" fill="url(#dl2-fr-engine)" opacity="0.85" />
      <text x="120" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Variable</text>
      <text x="120" y="138" textAnchor="middle" fontSize="9" fill="#bfdbfe">ch3 数据容器</text>

      <path d="M180 126 L210 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-fr-arrow)" />

      <rect x="210" y="104" width="120" height="44" rx="8" fill="url(#dl2-fr-eng)" opacity="0.85" />
      <text x="270" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Layer/Model</text>
      <text x="270" y="138" textAnchor="middle" fontSize="9" fill="#fef3c7">ch6-7 网络封装</text>

      <path d="M330 126 L360 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-fr-arrow)" />

      <rect x="360" y="104" width="120" height="44" rx="8" fill="url(#dl2-fr-engine)" opacity="0.7" />
      <text x="420" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Function</text>
      <text x="420" y="138" textAnchor="middle" fontSize="9" fill="#bfdbfe">ch3 前向运算</text>

      <path d="M480 126 L510 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-fr-arrow)" />

      <rect x="510" y="104" width="120" height="44" rx="8" fill="url(#dl2-fr-autodiff)" opacity="0.85" />
      <text x="570" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Loss</text>
      <text x="570" y="138" textAnchor="middle" fontSize="9" fill="#e9d5ff">ch8 损失计算</text>

      <path d="M630 126 L660 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-fr-arrow)" />

      <rect x="660" y="104" width="90" height="44" rx="8" fill="url(#dl2-fr-eng)" opacity="0.7" />
      <text x="705" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">accuracy</text>
      <text x="705" y="138" textAnchor="middle" fontSize="9" fill="#fef3c7">ch8 评估</text>

      {/* 反向流程 */}
      <path d="M570 148 L570 180 L120 180 L120 148" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3" fill="none" markerEnd="url(#dl2-fr-rev)" />

      <rect x="180" y="168" width="100" height="32" rx="6" fill="url(#dl2-fr-autodiff)" opacity="0.3" stroke="#7c3aed" strokeWidth="1" />
      <text x="230" y="188" textAnchor="middle" fontSize="10" fill="#5b21b6">backward ch4</text>

      <rect x="300" y="168" width="100" height="32" rx="6" fill="url(#dl2-fr-eng)" opacity="0.3" stroke="#f59e0b" strokeWidth="1" />
      <text x="350" y="188" textAnchor="middle" fontSize="10" fill="#92400e">update ch5</text>

      <text x="570" y="188" textAnchor="middle" fontSize="10" fill="#dc2626">反向传播 + 参数更新</text>

      {/* 四层架构 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">DeZero 四层架构</text>

      <rect x="100" y="296" width="600" height="44" rx="8" fill="url(#dl2-fr-eng)" opacity="0.85" />
      <text x="400" y="318" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">工程层：Layer / Model / Optimizer —— 参数管理 · 网络组合 · 训练</text>

      <rect x="100" y="344" width="600" height="44" rx="8" fill="url(#dl2-fr-autodiff)" opacity="0.85" />
      <text x="400" y="366" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">引擎层：backward —— 拓扑排序 · 梯度反向传播 · 自动求导</text>

      <rect x="100" y="392" width="600" height="44" rx="8" fill="url(#dl2-fr-engine)" opacity="0.7" />
      <text x="400" y="414" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">运算层：Function —— forward / backward · 连接计算图</text>

      <rect x="100" y="440" width="600" height="44" rx="8" fill="url(#dl2-fr-engine)" opacity="0.55" />
      <text x="400" y="462" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">数据层：Variable —— data / grad / creator · 记录计算图</text>

      {/* 迁移提示 */}
      <text x="400" y="508" textAnchor="middle" fontSize="12" fontWeight="600" fill="#059669">理解 DeZero → 迁移 PyTorch：核心概念一一对应，机制通用</text>
    </svg>
  );
}
