"use client";

export function DlsDeepLearningDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="深度学习实践全景">
      <defs>
        <linearGradient id="dls-dl-framework" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dls-dl-gpu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dls-dl-train" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dls-dl-deploy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dls-dl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深度学习实践：从手写到框架</text>

      {/* 框架迁移 */}
      <text x="200" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">框架迁移</text>

      <rect x="60" y="84" width="280" height="48" rx="8" fill="url(#dls-dl-framework)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="104" fontSize="11" fontWeight="600" fill="#1e40af">本书手写实现</text>
      <text x="80" y="122" fontSize="10" fill="#475569">NumPy 全部从零，理解原理</text>

      <path d="M200 132 L200 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-dl-arrow)" />

      <rect x="60" y="140" width="280" height="48" rx="8" fill="url(#dls-dl-framework)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="160" fontSize="11" fontWeight="600" fill="#1e40af">DeeperNetWriter（本书框架）</text>
      <text x="80" y="178" fontSize="10" fill="#475569">类层级封装：Layer / Model / Trainer</text>

      <path d="M200 188 L200 194" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-dl-arrow)" />

      <rect x="60" y="196" width="280" height="48" rx="8" fill="url(#dls-dl-framework)" opacity="0.18" stroke="#2563eb" strokeWidth="2" />
      <text x="80" y="216" fontSize="11" fontWeight="600" fill="#1e40af">工业框架</text>
      <text x="80" y="234" fontSize="10" fill="#475569">PyTorch / TensorFlow / Keras</text>

      {/* GPU 加速 */}
      <text x="620" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">GPU 加速</text>

      <rect x="480" y="84" width="280" height="48" rx="8" fill="url(#dls-dl-gpu)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="500" y="104" fontSize="11" fontWeight="600" fill="#5b21b6">CPU 瓶颈</text>
      <text x="500" y="122" fontSize="10" fill="#475569">矩阵乘法在 CPU 上速度有限</text>

      <path d="M620 132 L620 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-dl-arrow)" />

      <rect x="480" y="140" width="280" height="48" rx="8" fill="url(#dls-dl-gpu)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="500" y="160" fontSize="11" fontWeight="600" fill="#5b21b6">CUDA 并行</text>
      <text x="500" y="178" fontSize="10" fill="#475569">数千核心并行执行矩阵运算</text>

      <path d="M620 188 L620 194" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-dl-arrow)" />

      <rect x="480" y="196" width="280" height="48" rx="8" fill="url(#dls-dl-gpu)" opacity="0.18" stroke="#7c3aed" strokeWidth="2" />
      <text x="500" y="216" fontSize="11" fontWeight="600" fill="#5b21b6">框架自动加速</text>
      <text x="500" y="234" fontSize="10" fill="#475569">PyTorch/TensorFlow 自动调度 GPU</text>

      {/* 训练流程 */}
      <text x="400" y="280" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">完整训练流程</text>

      <rect x="60" y="292" width="120" height="50" rx="8" fill="url(#dls-dl-train)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="120" y="314" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">数据加载</text>
      <text x="120" y="330" textAnchor="middle" fontSize="9" fill="#475569">MNIST / CIFAR</text>

      <line x1="180" y1="317" x2="200" y2="317" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-dl-arrow)" />

      <rect x="200" y="292" width="120" height="50" rx="8" fill="url(#dls-dl-train)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="260" y="314" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">mini-batch</text>
      <text x="260" y="330" textAnchor="middle" fontSize="9" fill="#475569">随机抽取批</text>

      <line x1="320" y1="317" x2="340" y2="317" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-dl-arrow)" />

      <rect x="340" y="292" width="120" height="50" rx="8" fill="url(#dls-dl-train)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="314" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">梯度计算</text>
      <text x="400" y="330" textAnchor="middle" fontSize="9" fill="#475569">前向 + 反向</text>

      <line x1="460" y1="317" x2="480" y2="317" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-dl-arrow)" />

      <rect x="480" y="292" width="120" height="50" rx="8" fill="url(#dls-dl-train)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="540" y="314" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">参数更新</text>
      <text x="540" y="330" textAnchor="middle" fontSize="9" fill="#475569">优化器 SGD/Adam</text>

      <line x1="600" y1="317" x2="620" y2="317" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-dl-arrow)" />

      <rect x="620" y="292" width="120" height="50" rx="8" fill="url(#dls-dl-train)" opacity="0.18" stroke="#f59e0b" strokeWidth="2" />
      <text x="680" y="314" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">学习率衰减</text>
      <text x="680" y="330" textAnchor="middle" fontSize="9" fill="#475569">指数 / 余弦衰减</text>

      {/* 底部总结 */}
      <rect x="60" y="370" width="340" height="50" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="230" y="392" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">类层级封装（DeeperNetWriter）</text>
      <text x="230" y="410" textAnchor="middle" fontSize="10" fill="#475569">Affine/ReLU/Softmax/Conv → 逐层组合</text>

      <rect x="420" y="370" width="340" height="50" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="392" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">Trainer 训练器</text>
      <text x="590" y="410" textAnchor="middle" fontSize="10" fill="#475569">封装训练循环 / 损失记录 / 精度评估</text>

      <rect x="60" y="440" width="700" height="46" rx="10" fill="url(#dls-dl-deploy)" opacity="0.95" />
      <text x="410" y="468" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">从手写理解原理 → 框架提高效率 → GPU 规模化训练</text>
    </svg>
  );
}
