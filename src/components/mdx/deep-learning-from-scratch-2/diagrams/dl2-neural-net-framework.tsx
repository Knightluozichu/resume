"use client";

export function Dl2NeuralNetFrameworkDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="DeZero框架四层架构">
      <defs>
        <linearGradient id="dl2-nf-layer1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="dl2-nf-layer2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="dl2-nf-layer3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="dl2-nf-layer4" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <marker id="dl2-nf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">DeZero 四层架构</text>

      {/* 第4层：工程层 */}
      <rect x="180" y="56" width="440" height="60" rx="10" fill="url(#dl2-nf-layer4)" opacity="0.92" />
      <text x="400" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">第 4 层：工程层</text>
      <text x="400" y="100" textAnchor="middle" fontSize="11" fill="#d1fae5">Layer / Model / Optimizer —— 参数管理 · 网络组合 · 训练循环</text>

      <path d="M400 116 L400 124" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-nf-arrow)" />

      {/* 第3层：引擎层 */}
      <rect x="180" y="128" width="440" height="60" rx="10" fill="url(#dl2-nf-layer3)" opacity="0.92" />
      <text x="400" y="152" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">第 3 层：引擎层</text>
      <text x="400" y="172" textAnchor="middle" fontSize="11" fill="#fef3c7">backward —— 拓扑排序 · 梯度反向传播 · 自动求导</text>

      <path d="M400 188 L400 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-nf-arrow)" />

      {/* 第2层：运算层 */}
      <rect x="180" y="200" width="440" height="60" rx="10" fill="url(#dl2-nf-layer2)" opacity="0.92" />
      <text x="400" y="224" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">第 2 层：运算层</text>
      <text x="400" y="244" textAnchor="middle" fontSize="11" fill="#e9d5ff">Function 子类 —— forward / backward · 连接计算图</text>

      <path d="M400 260 L400 268" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-nf-arrow)" />

      {/* 第1层：数据层 */}
      <rect x="180" y="272" width="440" height="60" rx="10" fill="url(#dl2-nf-layer1)" opacity="0.92" />
      <text x="400" y="296" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">第 1 层：数据层</text>
      <text x="400" y="316" textAnchor="middle" fontSize="11" fill="#bfdbfe">Variable —— data / grad / creator · 记录计算图</text>

      {/* 底部：定义即计算图 */}
      <rect x="60" y="366" width="680" height="78" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="390" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心哲学：定义即计算图</text>
      <text x="400" y="410" textAnchor="middle" fontSize="11" fill="#64748b">x → square(x) → exp(a) → add(b, x) → y</text>
      <text x="400" y="430" textAnchor="middle" fontSize="11" fill="#64748b">用户只写前向计算，框架自动构建计算图并反向求导</text>
    </svg>
  );
}
