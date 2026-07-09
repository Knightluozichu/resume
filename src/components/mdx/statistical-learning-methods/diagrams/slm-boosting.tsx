"use client";

export function SlmBoostingDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="提升方法AdaBoost与提升树">
      <defs>
        <linearGradient id="slm-bst-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="slm-bst-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="slm-bst-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="slm-bst-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="slm-bst-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">提升方法 · AdaBoost 与提升树</text>

      {/* 左侧：AdaBoost 算法流程 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">AdaBoost 算法</text>

      <rect x="40" y="84" width="320" height="44" rx="8" fill="url(#slm-bst-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="111" textAnchor="middle" fontSize="12" fill="#1e40af">1. 初始化样本权值 D1 = {1/N}</text>

      <path d="M200 128 L200 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-bst-arrow)" />

      <rect x="40" y="138" width="320" height="44" rx="8" fill="url(#slm-bst-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="200" y="165" textAnchor="middle" fontSize="12" fill="#5b21b6">2. 训练弱分类器 Gm(x)</text>

      <path d="M200 182 L200 190" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-bst-arrow)" />

      <rect x="40" y="192" width="320" height="44" rx="8" fill="url(#slm-bst-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="219" textAnchor="middle" fontSize="12" fill="#92400e">3. 计算误差 em，权值 αm</text>

      <path d="M200 236 L200 244" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-bst-arrow)" />

      <rect x="40" y="246" width="320" height="44" rx="8" fill="url(#slm-bst-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="273" textAnchor="middle" fontSize="12" fill="#92400e">4. 更新样本权值 Dm+1</text>

      <path d="M200 290 L200 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-bst-arrow)" />

      <rect x="40" y="300" width="320" height="44" rx="8" fill="url(#slm-bst-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="200" y="327" textAnchor="middle" fontSize="12" fill="#065f46">5. 组合：f(x) = Σ αm Gm(x)</text>

      {/* 右侧：前向分步算法与提升树 */}
      <text x="560" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">前向分步与提升树</text>

      <rect x="420" y="84" width="280" height="56" rx="8" fill="url(#slm-bst-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="560" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">前向分步算法</text>
      <text x="560" y="128" textAnchor="middle" fontSize="11" fill="#475569">f_m(x) = f_{m-1}(x) + αm Gm(x)</text>

      <path d="M560 140 L560 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-bst-arrow)" />

      <rect x="420" y="150" width="280" height="56" rx="8" fill="url(#slm-bst-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="560" y="174" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">AdaBoost = 前向分步</text>
      <text x="560" y="194" textAnchor="middle" fontSize="11" fill="#475569">指数损失的特殊情形</text>

      <path d="M560 206 L560 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-bst-arrow)" />

      <rect x="420" y="216" width="280" height="56" rx="8" fill="url(#slm-bst-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="560" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">提升树</text>
      <text x="560" y="260" textAnchor="middle" fontSize="11" fill="#475569">以决策树为基函数的前向分步</text>

      <path d="M560 272 L560 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-bst-arrow)" />

      <rect x="420" y="282" width="280" height="56" rx="8" fill="url(#slm-bst-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="306" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">梯度提升树</text>
      <text x="560" y="326" textAnchor="middle" fontSize="11" fill="#475569">用负梯度拟合残差，推广到一般损失</text>

      {/* 底部：AdaBoost 权值更新 */}
      <rect x="40" y="358" width="720" height="56" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="382" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">AdaBoost 核心公式</text>
      <text x="400" y="402" textAnchor="middle" fontSize="11" fill="#64748b">αm = 1/2 ln((1-em)/em)  /  Dm+1(i) = Dm(i)exp(-αm yi Gm(xi)) / Zm</text>

      {/* 底部：关键性质 */}
      <rect x="40" y="430" width="720" height="80" rx="10" fill="url(#slm-bst-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="454" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5b21b6">关键性质</text>
      <text x="400" y="474" textAnchor="middle" fontSize="11" fill="#64748b">1. 关注前一轮分错的样本（权值增大）  2. 弱分类器组合成强分类器</text>
      <text x="400" y="492" textAnchor="middle" fontSize="11" fill="#64748b">3. 训练误差随迭代指数下降  4. 前向分步加法模型的特例</text>
    </svg>
  );
}
