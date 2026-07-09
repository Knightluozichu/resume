"use client";

export function SlmLogisticRegressionDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="逻辑斯谛回归与最大熵模型">
      <defs>
        <linearGradient id="slm-lr-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="slm-lr-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="slm-lr-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="slm-lr-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="slm-lr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">逻辑斯谛回归与最大熵 · 模型对比</text>

      {/* 左侧：逻辑斯谛回归 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">逻辑斯谛回归</text>

      <rect x="40" y="84" width="320" height="56" rx="10" fill="url(#slm-lr-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="108" fontSize="13" fontWeight="600" fill="#1e40af">模型</text>
      <text x="60" y="128" fontSize="11" fill="#475569">P(Y=1|x) = exp(wx+b) / (1+exp(wx+b))</text>

      <path d="M200 140 L200 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lr-arrow)" />

      <rect x="40" y="150" width="320" height="56" rx="10" fill="url(#slm-lr-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="174" fontSize="13" fontWeight="600" fill="#5b21b6">对数几率</text>
      <text x="60" y="194" fontSize="11" fill="#475569">log P/(1-P) = wx + b（线性模型）</text>

      <path d="M200 206 L200 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lr-arrow)" />

      <rect x="40" y="216" width="320" height="56" rx="10" fill="url(#slm-lr-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="240" fontSize="13" fontWeight="600" fill="#92400e">学习算法</text>
      <text x="60" y="260" fontSize="11" fill="#475569">极大似然估计 → 梯度下降法</text>

      <path d="M200 272 L200 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lr-arrow)" />

      <rect x="40" y="282" width="320" height="56" rx="10" fill="url(#slm-lr-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="60" y="306" fontSize="13" fontWeight="600" fill="#065f46">多项逻辑斯谛回归</text>
      <text x="60" y="326" fontSize="11" fill="#475569">softmax：P(Y=yk) = exp(wk·x) / Σexp(wj·x)</text>

      {/* 右侧：最大熵模型 */}
      <text x="560" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">最大熵模型</text>

      <rect x="420" y="84" width="280" height="56" rx="8" fill="url(#slm-lr-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="560" y="108" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">最大熵原理</text>
      <text x="560" y="128" textAnchor="middle" fontSize="11" fill="#475569">在满足约束的条件下，熵最大</text>

      <path d="M560 140 L560 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lr-arrow)" />

      <rect x="420" y="150" width="280" height="56" rx="8" fill="url(#slm-lr-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="560" y="174" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5b21b6">等价形式</text>
      <text x="560" y="194" textAnchor="middle" fontSize="11" fill="#475569">Pw(y|x) = exp(Σwi fi(x,y)) / Zw(x)</text>

      <path d="M560 206 L560 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lr-arrow)" />

      <rect x="420" y="216" width="280" height="56" rx="8" fill="url(#slm-lr-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="560" y="240" textAnchor="middle" fontSize="13" fontWeight="600" fill="#92400e">学习算法</text>
      <text x="560" y="260" textAnchor="middle" fontSize="11" fill="#475569">改进的迭代尺度法（IIS）</text>

      <path d="M560 272 L560 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lr-arrow)" />

      <rect x="420" y="282" width="280" height="56" rx="8" fill="url(#slm-lr-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="306" textAnchor="middle" fontSize="13" fontWeight="600" fill="#065f46">特征函数</text>
      <text x="560" y="326" textAnchor="middle" fontSize="11" fill="#475569">fi(x,y) ∈ {0, 1}，约束经验期望=模型期望</text>

      {/* 底部：逻辑斯谛回归与最大熵的等价性 */}
      <rect x="40" y="358" width="720" height="56" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="382" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">逻辑斯谛回归与最大熵的等价性</text>
      <text x="400" y="402" textAnchor="middle" fontSize="11" fill="#64748b">二分类逻辑斯谛回归是最大熵模型的特例；最大熵模型的解与逻辑斯谛回归形式一致</text>

      {/* 底部：学习算法对比 */}
      <rect x="40" y="430" width="720" height="80" rx="10" fill="url(#slm-lr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="454" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5b21b6">学习算法</text>
      <text x="400" y="474" textAnchor="middle" fontSize="11" fill="#64748b">改进的迭代尺度法（IIS）：固定其他参数，逐个优化单个参数</text>
      <text x="400" y="492" textAnchor="middle" fontSize="11" fill="#64748b">梯度下降法：对所有参数同时迭代更新</text>
      <text x="400" y="506" textAnchor="middle" fontSize="11" fill="#64748b">拟牛顿法（BFGS/L-BFGS）：二阶优化，收敛更快</text>
    </svg>
  );
}
