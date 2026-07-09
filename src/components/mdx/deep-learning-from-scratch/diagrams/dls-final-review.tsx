"use client";

export function DlsFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="全书知识整合与串联">
      <defs>
        <linearGradient id="dls-fr-basics" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dls-fr-nn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dls-fr-dl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dls-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dls-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深度学习入门 · 知识整合全景</text>

      {/* 中心：核心原理 */}
      <circle cx="400" cy="280" r="80" fill="url(#dls-fr-core)" opacity="0.9" />
      <text x="400" y="270" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">深度学习</text>
      <text x="400" y="290" textAnchor="middle" fontSize="12" fill="#cffafe">核心引擎</text>
      <text x="400" y="308" textAnchor="middle" fontSize="10" fill="#cffafe">前向+反向+优化</text>

      {/* 基础层（左侧） */}
      <text x="130" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">基础层</text>

      <rect x="50" y="92" width="160" height="40" rx="8" fill="url(#dls-fr-basics)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="116" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">NumPy 向量化</text>

      <rect x="50" y="140" width="160" height="40" rx="8" fill="url(#dls-fr-basics)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="164" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">感知机</text>

      <rect x="50" y="188" width="160" height="40" rx="8" fill="url(#dls-fr-basics)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="212" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">激活函数</text>

      <line x1="210" y1="152" x2="330" y2="240" stroke="#64748b" strokeWidth="1.5" opacity="0.5" markerEnd="url(#dls-fr-arrow)" />
      <line x1="210" y1="208" x2="330" y2="260" stroke="#64748b" strokeWidth="1.5" opacity="0.5" markerEnd="url(#dls-fr-arrow)" />

      {/* 神经网络层（顶部） */}
      <text x="400" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">神经网络层</text>

      <rect x="200" y="92" width="120" height="40" rx="8" fill="url(#dls-fr-nn)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="260" y="116" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">前向传播</text>

      <rect x="340" y="92" width="120" height="40" rx="8" fill="url(#dls-fr-nn)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="116" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">损失函数</text>

      <rect x="480" y="92" width="120" height="40" rx="8" fill="url(#dls-fr-nn)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="540" y="116" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">反向传播</text>

      <line x1="400" y1="132" x2="400" y2="198" stroke="#64748b" strokeWidth="1.5" opacity="0.5" markerEnd="url(#dls-fr-arrow)" />

      {/* 深度学习层（右侧） */}
      <text x="670" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">深度学习层</text>

      <rect x="590" y="92" width="160" height="40" rx="8" fill="url(#dls-fr-dl)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="670" y="116" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">CNN 卷积网络</text>

      <rect x="590" y="140" width="160" height="40" rx="8" fill="url(#dls-fr-dl)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="670" y="164" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">学习技巧</text>

      <rect x="590" y="188" width="160" height="40" rx="8" fill="url(#dls-fr-dl)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="670" y="212" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">框架与GPU</text>

      <line x1="590" y1="152" x2="470" y2="240" stroke="#64748b" strokeWidth="1.5" opacity="0.5" markerEnd="url(#dls-fr-arrow)" />
      <line x1="590" y1="208" x2="470" y2="260" stroke="#64748b" strokeWidth="1.5" opacity="0.5" markerEnd="url(#dls-fr-arrow)" />

      {/* 应用层（底部） */}
      <text x="400" y="410" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">应用层</text>

      <rect x="120" y="422" width="140" height="40" rx="8" fill="#059669" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="190" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">图像分类</text>

      <rect x="280" y="422" width="140" height="40" rx="8" fill="#059669" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="350" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">目标检测</text>

      <rect x="440" y="422" width="140" height="40" rx="8" fill="#059669" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="510" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">图像分割</text>

      <rect x="600" y="422" width="140" height="40" rx="8" fill="#059669" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="670" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">生成模型</text>

      <line x1="400" y1="362" x2="350" y2="420" stroke="#64748b" strokeWidth="1.5" opacity="0.5" markerEnd="url(#dls-fr-arrow)" />
      <line x1="400" y1="362" x2="510" y2="420" stroke="#64748b" strokeWidth="1.5" opacity="0.5" markerEnd="url(#dls-fr-arrow)" />

      {/* 底部学习路径总结 */}
      <rect x="50" y="482" width="700" height="60" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="506" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">全书核心思想：手写实现理解原理 → 层层递进构建系统</text>
      <text x="400" y="526" textAnchor="middle" fontSize="11" fill="#475569">NumPy → 感知机 → 神经网络 → 反向传播 → 学习技巧 → CNN → 框架 → 应用</text>
    </svg>
  );
}
