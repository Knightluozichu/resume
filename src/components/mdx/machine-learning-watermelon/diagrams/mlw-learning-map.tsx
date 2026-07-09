"use client";

export function MlwLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="机器学习西瓜书全书学习地图">
      <defs>
        <linearGradient id="mlw-lm-foundation" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mlw-lm-supervised" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mlw-lm-unsupervised" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mlw-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="mlw-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">机器学习（西瓜书） · 知识体系全景</text>

      {/* 左侧：三大学习范式 */}
      <text x="160" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">ML 三大学习范式</text>

      <rect x="40" y="84" width="240" height="58" rx="10" fill="url(#mlw-lm-foundation)" opacity="0.95" />
      <text x="160" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础概念层</text>
      <text x="160" y="128" textAnchor="middle" fontSize="11" fill="#bfdbfe">假设空间 / 归纳偏好 / 评估</text>

      <path d="M160 142 L160 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="40" y="150" width="240" height="58" rx="10" fill="url(#mlw-lm-supervised)" opacity="0.95" />
      <text x="160" y="174" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">监督学习层</text>
      <text x="160" y="194" textAnchor="middle" fontSize="11" fill="#e9d5ff">线性模型 / 决策树 / 神经网络 / SVM / 贝叶斯</text>

      <path d="M160 208 L160 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="40" y="216" width="240" height="58" rx="10" fill="url(#mlw-lm-unsupervised)" opacity="0.95" />
      <text x="160" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">进阶与无监督层</text>
      <text x="160" y="260" textAnchor="middle" fontSize="11" fill="#fef3c7">集成学习 / 聚类 / 降维</text>

      <path d="M160 274 L160 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="40" y="282" width="240" height="58" rx="10" fill="url(#mlw-lm-review)" opacity="0.95" />
      <text x="160" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">整合与复习层</text>
      <text x="160" y="326" textAnchor="middle" fontSize="11" fill="#cffafe">全书知识串联与整合</text>

      <text x="160" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">从假设空间到聚类降维</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="84" width="460" height="38" rx="8" fill="url(#mlw-lm-foundation)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="108" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="108" fontSize="11" fill="#475569">全书学习地图——ML 知识体系与学习路径</text>

      <path d="M550 122 L550 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="320" y="130" width="460" height="38" rx="8" fill="url(#mlw-lm-foundation)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="154" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="154" fontSize="11" fill="#475569">假设空间与归纳偏好——版本空间 / No Free Lunch</text>

      <path d="M550 168 L550 174" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="320" y="176" width="460" height="38" rx="8" fill="url(#mlw-lm-supervised)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="200" fontSize="12" fontWeight="600" fill="#5b21b6">ch2</text>
      <text x="372" y="200" fontSize="11" fill="#475569">线性模型——线性回归 / 逻辑回归 / LDA</text>

      <path d="M550 214 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="320" y="222" width="460" height="38" rx="8" fill="url(#mlw-lm-supervised)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="246" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="246" fontSize="11" fill="#475569">决策树——信息增益 / 剪枝 / CART</text>

      <path d="M550 260 L550 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="320" y="268" width="460" height="38" rx="8" fill="url(#mlw-lm-supervised)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="292" fontSize="12" fontWeight="600" fill="#5b21b6">ch4</text>
      <text x="372" y="292" fontSize="11" fill="#475569">神经网络——感知机 / BP 算法 / 激活函数</text>

      <path d="M550 306 L550 312" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="320" y="314" width="460" height="38" rx="8" fill="url(#mlw-lm-supervised)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="338" fontSize="12" fontWeight="600" fill="#5b21b6">ch5</text>
      <text x="372" y="338" fontSize="11" fill="#475569">支持向量机——间隔 / 核函数 / 软间隔</text>

      <path d="M550 352 L550 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="320" y="360" width="460" height="38" rx="8" fill="url(#mlw-lm-supervised)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="384" fontSize="12" fontWeight="600" fill="#5b21b6">ch6</text>
      <text x="372" y="384" fontSize="11" fill="#475569">贝叶斯分类——贝叶斯定理 / 朴素贝叶斯 / EM</text>

      <path d="M550 398 L550 404" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="320" y="406" width="460" height="38" rx="8" fill="url(#mlw-lm-unsupervised)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="430" fontSize="12" fontWeight="600" fill="#92400e">ch7</text>
      <text x="372" y="430" fontSize="11" fill="#475569">集成学习——Boosting / Bagging / 随机森林</text>

      <path d="M550 444 L550 450" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="320" y="452" width="460" height="38" rx="8" fill="url(#mlw-lm-unsupervised)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="476" fontSize="12" fontWeight="600" fill="#92400e">ch8</text>
      <text x="372" y="476" fontSize="11" fill="#475569">聚类与降维——K-Means / 层次聚类 / PCA</text>

      <path d="M550 490 L550 496" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" />

      <rect x="320" y="498" width="460" height="38" rx="8" fill="url(#mlw-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="522" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="522" fontSize="11" fill="#475569">全书复习与知识整合——端到端串联</text>

      {/* 底部学习路径 */}
      <rect x="40" y="550" width="740" height="26" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="567" textAnchor="middle" fontSize="11" fill="#475569">假设空间 → 线性模型 → 决策树 → 神经网络 → SVM → 贝叶斯 → 集成 → 聚类降维 → 整合</text>
    </svg>
  );
}
