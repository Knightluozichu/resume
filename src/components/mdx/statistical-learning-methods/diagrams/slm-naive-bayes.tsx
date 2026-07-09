"use client";

export function SlmNaiveBayesDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="朴素贝叶斯法模型与算法">
      <defs>
        <linearGradient id="slm-nb-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="slm-nb-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="slm-nb-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="slm-nb-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="slm-nb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">朴素贝叶斯 · 模型与算法</text>

      {/* 左侧：贝叶斯定理与独立性假设 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心原理</text>

      <rect x="40" y="84" width="320" height="70" rx="10" fill="url(#slm-nb-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="108" fontSize="13" fontWeight="600" fill="#1e40af">贝叶斯定理</text>
      <text x="60" y="128" fontSize="11" fill="#475569">P(Y|X) = P(X|Y)P(Y) / P(X)</text>
      <text x="60" y="144" fontSize="11" fill="#475569">后验 = 似然 x 先验 / 证据</text>

      <path d="M200 154 L200 162" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-nb-arrow)" />

      <rect x="40" y="164" width="320" height="70" rx="10" fill="url(#slm-nb-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="188" fontSize="13" fontWeight="600" fill="#5b21b6">条件独立性假设</text>
      <text x="60" y="208" fontSize="11" fill="#475569">P(X1,...,Xn | Y) = Π P(Xi | Y)</text>
      <text x="60" y="224" fontSize="11" fill="#475569">特征在给定类别下相互独立</text>

      <path d="M200 234 L200 242" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-nb-arrow)" />

      <rect x="40" y="244" width="320" height="70" rx="10" fill="url(#slm-nb-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="268" fontSize="13" fontWeight="600" fill="#92400e">分类规则</text>
      <text x="60" y="288" fontSize="11" fill="#475569">y = argmax_yk P(yk) Π P(Xi|yk)</text>
      <text x="60" y="304" fontSize="11" fill="#475569">后验概率最大的类别</text>

      {/* 右侧：参数估计 */}
      <text x="560" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">参数估计</text>

      <rect x="420" y="84" width="280" height="56" rx="8" fill="url(#slm-nb-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">极大似然估计</text>
      <text x="560" y="128" textAnchor="middle" fontSize="11" fill="#475569">先验: P(Y=yk) = ΣI(yi=yk) / N</text>

      <path d="M560 140 L560 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-nb-arrow)" />

      <rect x="420" y="150" width="280" height="56" rx="8" fill="url(#slm-nb-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="174" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">条件概率估计</text>
      <text x="560" y="194" textAnchor="middle" fontSize="11" fill="#475569">P(Xi|yk) = ΣI(...) / ΣI(yi=yk)</text>

      <path d="M560 206 L560 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-nb-arrow)" />

      <rect x="420" y="216" width="280" height="56" rx="8" fill="url(#slm-nb-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">贝叶斯估计（平滑）</text>
      <text x="560" y="260" textAnchor="middle" fontSize="11" fill="#475569">加 λ ≥ 0（λ=1 为拉普拉斯平滑）</text>

      <path d="M560 272 L560 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-nb-arrow)" />

      <rect x="420" y="282" width="280" height="56" rx="8" fill="url(#slm-nb-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="306" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">防止零概率问题</text>
      <text x="560" y="326" textAnchor="middle" fontSize="11" fill="#475569">避免连乘中某项为 0 导致整体为 0</text>

      {/* 底部：算法流程 */}
      <rect x="40" y="364" width="720" height="56" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="388" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">朴素贝叶斯算法流程</text>
      <text x="400" y="408" textAnchor="middle" fontSize="11" fill="#64748b">计算先验 → 计算条件概率 → 对新样本计算后验 → 取 argmax → 输出类别</text>

      {/* 底部：关键性质 */}
      <rect x="40" y="438" width="720" height="70" rx="10" fill="url(#slm-nb-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5b21b6">关键性质</text>
      <text x="400" y="482" textAnchor="middle" fontSize="11" fill="#64748b">1. 独立性假设是「朴素」的来源  2. 生成式模型：建模 P(X,Y) = P(Y)P(X|Y)</text>
      <text x="400" y="498" textAnchor="middle" fontSize="11" fill="#64748b">3. 拉普拉斯平滑保证概率非零</text>
    </svg>
  );
}
