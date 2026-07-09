"use client";

export function SlmFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="统计学习方法全书知识整合">
      <defs>
        <linearGradient id="slm-fr-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="slm-fr-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="slm-fr-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="slm-fr-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">统计学习方法 · 全书知识整合</text>

      {/* 方法对比表 */}
      <text x="400" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">监督学习方法对比</text>

      <rect x="20" y="80" width="760" height="32" rx="6" fill="url(#slm-fr-blue)" opacity="0.15" />
      <text x="40" y="100" fontSize="11" fontWeight="700" fill="#1e40af">方法</text>
      <text x="180" y="100" fontSize="11" fontWeight="700" fill="#1e40af">模型类型</text>
      <text x="330" y="100" fontSize="11" fontWeight="700" fill="#1e40af">策略（损失）</text>
      <text x="500" y="100" fontSize="11" fontWeight="700" fill="#1e40af">算法</text>
      <text x="640" y="100" fontSize="11" fontWeight="700" fill="#1e40af">特点</text>

      <rect x="20" y="112" width="760" height="28" rx="0" fill="url(#slm-fr-purple)" opacity="0.06" />
      <text x="40" y="131" fontSize="10" fill="#475569">感知机</text>
      <text x="180" y="131" fontSize="10" fill="#475569">判别 / 线性</text>
      <text x="330" y="131" fontSize="10" fill="#475569">误分类点距离</text>
      <text x="500" y="131" fontSize="10" fill="#475569">随机梯度下降</text>
      <text x="640" y="131" fontSize="10" fill="#475569">最简单线性模型</text>

      <rect x="20" y="140" width="760" height="28" rx="0" fill="url(#slm-fr-purple)" opacity="0.04" />
      <text x="40" y="159" fontSize="10" fill="#475569">k近邻</text>
      <text x="180" y="159" fontSize="10" fill="#475569">判别 / 非参数</text>
      <text x="330" y="159" fontSize="10" fill="#475569">多数表决</text>
      <text x="500" y="159" fontSize="10" fill="#475569">kd树搜索</text>
      <text x="640" y="159" fontSize="10" fill="#475569">惰性学习</text>

      <rect x="20" y="168" width="760" height="28" rx="0" fill="url(#slm-fr-purple)" opacity="0.06" />
      <text x="40" y="187" fontSize="10" fill="#475569">朴素贝叶斯</text>
      <text x="180" y="187" fontSize="10" fill="#475569">生成 / 概率</text>
      <text x="330" y="187" fontSize="10" fill="#475569">后验概率最大</text>
      <text x="500" y="187" fontSize="10" fill="#475569">极大似然估计</text>
      <text x="640" y="187" fontSize="10" fill="#475569">独立性假设</text>

      <rect x="20" y="196" width="760" height="28" rx="0" fill="url(#slm-fr-purple)" opacity="0.04" />
      <text x="40" y="215" fontSize="10" fill="#475569">决策树</text>
      <text x="180" y="215" fontSize="10" fill="#475569">判别 / 规则</text>
      <text x="330" y="215" fontSize="10" fill="#475569">信息增益/基尼</text>
      <text x="500" y="215" fontSize="10" fill="#475569">递归划分+剪枝</text>
      <text x="640" y="215" fontSize="10" fill="#475569">可解释性强</text>

      <rect x="20" y="224" width="760" height="28" rx="0" fill="url(#slm-fr-orange)" opacity="0.06" />
      <text x="40" y="243" fontSize="10" fill="#475569">逻辑斯谛回归</text>
      <text x="180" y="243" fontSize="10" fill="#475569">判别 / 概率</text>
      <text x="330" y="243" fontSize="10" fill="#475569">对数似然损失</text>
      <text x="500" y="243" fontSize="10" fill="#475569">梯度下降</text>
      <text x="640" y="243" fontSize="10" fill="#475569">输出概率值</text>

      <rect x="20" y="252" width="760" height="28" rx="0" fill="url(#slm-fr-orange)" opacity="0.04" />
      <text x="40" y="271" fontSize="10" fill="#475569">SVM</text>
      <text x="180" y="271" fontSize="10" fill="#475569">判别 / 间隔</text>
      <text x="330" y="271" fontSize="10" fill="#475569">hinge 损失</text>
      <text x="500" y="271" fontSize="10" fill="#475569">SMO / 凸优化</text>
      <text x="640" y="271" fontSize="10" fill="#475569">核技巧+全局最优</text>

      <rect x="20" y="280" width="760" height="28" rx="0" fill="url(#slm-fr-orange)" opacity="0.06" />
      <text x="40" y="299" fontSize="10" fill="#475569">AdaBoost</text>
      <text x="180" y="299" fontSize="10" fill="#475569">判别 / 集成</text>
      <text x="330" y="299" fontSize="10" fill="#475569">指数损失</text>
      <text x="500" y="299" fontSize="10" fill="#475569">前向分步加法</text>
      <text x="640" y="299" fontSize="10" fill="#475569">弱→强分类器</text>

      <rect x="20" y="308" width="760" height="28" rx="0" fill="url(#slm-fr-green)" opacity="0.04" />
      <text x="40" y="327" fontSize="10" fill="#475569">EM/HMM</text>
      <text x="180" y="327" fontSize="10" fill="#475569">生成 / 概率</text>
      <text x="330" y="327" fontSize="10" fill="#475569">对数似然</text>
      <text x="500" y="327" fontSize="10" fill="#475569">EM 迭代</text>
      <text x="640" y="327" fontSize="10" fill="#475569">含隐变量建模</text>

      {/* 底部：统计学习三要素串联 */}
      <rect x="20" y="354" width="760" height="70" rx="10" fill="url(#slm-fr-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="378" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">统计学习三要素串联</text>
      <text x="400" y="398" textAnchor="middle" fontSize="11" fill="#64748b">模型 = 假设空间（感知机/决策树/SVM/...）</text>
      <text x="400" y="416" textAnchor="middle" fontSize="11" fill="#64748b">策略 = 损失函数（0-1损失/平方损失/对数损失/hinge损失/...） → 算法 = 优化方法（梯度下降/SMO/EM/前向分步/...）</text>

      {/* 底部：生成式 vs 判别式 */}
      <rect x="20" y="440" width="370" height="70" rx="10" fill="url(#slm-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="205" y="464" textAnchor="middle" fontSize="13" fontWeight="600" fill="#065f46">生成式模型</text>
      <text x="205" y="484" textAnchor="middle" fontSize="11" fill="#64748b">建模 P(X,Y) = P(Y)P(X|Y)</text>
      <text x="205" y="500" textAnchor="middle" fontSize="11" fill="#64748b">朴素贝叶斯 / HMM</text>

      <rect x="410" y="440" width="370" height="70" rx="10" fill="url(#slm-fr-orange)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="595" y="464" textAnchor="middle" fontSize="13" fontWeight="600" fill="#92400e">判别式模型</text>
      <text x="595" y="484" textAnchor="middle" fontSize="11" fill="#64748b">直接建模 P(Y|X) 或决策函数</text>
      <text x="595" y="500" textAnchor="middle" fontSize="11" fill="#64748b">感知机/逻辑斯谛/SVM/决策树/AdaBoost</text>

      {/* 底部总结 */}
      <rect x="20" y="526" width="760" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#475569">模型 → 策略 → 算法：统贯全书的方法论主线</text>
    </svg>
  );
}
