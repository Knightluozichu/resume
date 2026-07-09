"use client";

export function SlmKnnDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="k近邻法三要素与kd树">
      <defs>
        <linearGradient id="slm-knn-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="slm-knn-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="slm-knn-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="slm-knn-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="slm-knn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">k近邻法 · 三要素与kd树</text>

      {/* 左侧：三要素 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">k近邻三要素</text>

      <rect x="40" y="84" width="320" height="70" rx="10" fill="url(#slm-knn-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="108" fontSize="13" fontWeight="600" fill="#1e40af">k 值选择</text>
      <text x="60" y="128" fontSize="11" fill="#475569">k 小 → 模型复杂（过拟合风险）</text>
      <text x="60" y="144" fontSize="11" fill="#475569">k 大 → 模型简单（欠拟合风险）</text>

      <path d="M200 154 L200 162" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-knn-arrow)" />

      <rect x="40" y="164" width="320" height="70" rx="10" fill="url(#slm-knn-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="188" fontSize="13" fontWeight="600" fill="#5b21b6">距离度量</text>
      <text x="60" y="208" fontSize="11" fill="#475569">Lp 距离: Lp(xi,xj) = (Σ|xi-xj|^p)^(1/p)</text>
      <text x="60" y="224" fontSize="11" fill="#475569">p=1 曼哈顿距离 / p=2 欧氏距离</text>

      <path d="M200 234 L200 242" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-knn-arrow)" />

      <rect x="40" y="244" width="320" height="70" rx="10" fill="url(#slm-knn-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="268" fontSize="13" fontWeight="600" fill="#92400e">分类决策规则</text>
      <text x="60" y="288" fontSize="11" fill="#475569">多数表决：少数服从多数</text>
      <text x="60" y="304" fontSize="11" fill="#475569">等价于经验风险最小化</text>

      {/* 右侧：kd树 */}
      <text x="560" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">kd树</text>

      <rect x="420" y="84" width="280" height="50" rx="8" fill="url(#slm-knn-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="114" textAnchor="middle" fontSize="12" fill="#065f46">构造：交替选坐标轴中位数切分</text>

      <path d="M560 134 L560 142" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-knn-arrow)" />

      <rect x="420" y="144" width="280" height="50" rx="8" fill="url(#slm-knn-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="174" textAnchor="middle" fontSize="12" fill="#065f46">搜索：从叶节点回溯找最近邻</text>

      <path d="M560 194 L560 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-knn-arrow)" />

      <rect x="420" y="204" width="280" height="50" rx="8" fill="url(#slm-knn-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="234" textAnchor="middle" fontSize="12" fill="#065f46">平均搜索复杂度 O(log N)</text>

      <path d="M560 254 L560 262" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-knn-arrow)" />

      <rect x="420" y="264" width="280" height="50" rx="8" fill="url(#slm-knn-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="294" textAnchor="middle" fontSize="12" fill="#065f46">适用于高维近邻搜索加速</text>

      {/* 底部：k近邻算法流程 */}
      <rect x="40" y="346" width="720" height="56" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="370" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">k近邻算法流程</text>
      <text x="400" y="390" textAnchor="middle" fontSize="11" fill="#64748b">输入 x → 计算与所有训练样本的距离 → 取距离最小的 k 个 → 多数表决 → 输出类别 y</text>

      {/* 底部：关键性质 */}
      <rect x="40" y="420" width="720" height="80" rx="10" fill="url(#slm-knn-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="444" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">关键性质</text>
      <text x="400" y="464" textAnchor="middle" fontSize="11" fill="#64748b">1. 没有显式的学习过程（惰性学习）</text>
      <text x="400" y="482" textAnchor="middle" fontSize="11" fill="#64748b">2. 三要素完全决定了模型行为  3. kd树将暴力搜索 O(N) 降至 O(log N)</text>
    </svg>
  );
}
