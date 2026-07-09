"use client";

export function SlmPerceptronDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="感知机模型与学习算法">
      <defs>
        <linearGradient id="slm-perc-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="slm-perc-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="slm-perc-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="slm-perc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">感知机 · 模型与学习算法</text>

      {/* 左侧：感知机模型示意 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">模型结构</text>

      <rect x="60" y="84" width="280" height="80" rx="10" fill="url(#slm-perc-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="108" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">线性分类模型</text>
      <text x="200" y="128" textAnchor="middle" fontSize="12" fill="#475569">f(x) = sign(w·x + b)</text>
      <text x="200" y="148" textAnchor="middle" fontSize="11" fill="#64748b">w 为权值向量，b 为偏置</text>

      <path d="M200 164 L200 172" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-perc-arrow)" />

      <rect x="60" y="176" width="280" height="80" rx="10" fill="url(#slm-perc-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="200" y="200" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5b21b6">损失函数</text>
      <text x="200" y="220" textAnchor="middle" fontSize="12" fill="#475569">L(w,b) = -Σ yi(w·xi + b)</text>
      <text x="200" y="240" textAnchor="middle" fontSize="11" fill="#64748b">仅对误分类点求和</text>

      <path d="M200 256 L200 264" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-perc-arrow)" />

      <rect x="60" y="268" width="280" height="80" rx="10" fill="url(#slm-perc-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="292" textAnchor="middle" fontSize="13" fontWeight="600" fill="#92400e">超平面</text>
      <text x="200" y="312" textAnchor="middle" fontSize="12" fill="#475569">w·x + b = 0</text>
      <text x="200" y="332" textAnchor="middle" fontSize="11" fill="#64748b">法向量 w 决定方向，b 决定截距</text>

      {/* 右侧：学习算法流程 */}
      <text x="560" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">原始形式学习算法</text>

      <rect x="420" y="84" width="280" height="44" rx="8" fill="url(#slm-perc-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="560" y="111" textAnchor="middle" fontSize="12" fill="#1e40af">1. 选取初始 w0, b0</text>

      <path d="M560 128 L560 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-perc-arrow)" />

      <rect x="420" y="138" width="280" height="44" rx="8" fill="url(#slm-perc-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="560" y="165" textAnchor="middle" fontSize="12" fill="#5b21b6">2. 选取误分类点 (xi, yi)</text>

      <path d="M560 182 L560 190" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-perc-arrow)" />

      <rect x="420" y="192" width="280" height="44" rx="8" fill="url(#slm-perc-orange)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="560" y="219" textAnchor="middle" fontSize="12" fill="#92400e">3. 更新 w ← w + ηyi xi</text>

      <path d="M560 236 L560 244" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-perc-arrow)" />

      <rect x="420" y="246" width="280" height="44" rx="8" fill="url(#slm-perc-orange)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="560" y="273" textAnchor="middle" fontSize="12" fill="#92400e">   b ← b + ηyi</text>

      <path d="M560 290 L560 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-perc-arrow)" />

      <rect x="420" y="300" width="280" height="44" rx="8" fill="url(#slm-perc-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="560" y="327" textAnchor="middle" fontSize="12" fill="#1e40af">4. 直至无误分类点</text>

      {/* 底部：对偶形式 */}
      <rect x="60" y="370" width="680" height="56" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="394" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">对偶形式</text>
      <text x="400" y="414" textAnchor="middle" fontSize="11" fill="#64748b">w = Σ αi yi xi（用 Gram 矩阵加速）→ 分类判别 sign(Σ αj yj xj·x + b)</text>

      {/* 底部：Novikoff 定理 */}
      <rect x="60" y="444" width="680" height="56" rx="10" fill="url(#slm-perc-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="468" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5b21b6">Novikoff 收敛定理</text>
      <text x="400" y="488" textAnchor="middle" fontSize="11" fill="#64748b">误分类次数有上界 k ≤ (R/γ)²，故算法在线性可分数据上必收敛</text>
    </svg>
  );
}
