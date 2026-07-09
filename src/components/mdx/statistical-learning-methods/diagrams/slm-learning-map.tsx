"use client";

export function SlmLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="统计学习方法全书学习地图">
      <defs>
        <linearGradient id="slm-lm-foundation" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="slm-lm-linear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="slm-lm-advanced" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="slm-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="slm-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">统计学习方法（李航） · 知识体系全景</text>

      {/* 左侧：统计学习三要素 */}
      <text x="160" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">统计学习三要素</text>

      <rect x="40" y="84" width="240" height="58" rx="10" fill="url(#slm-lm-foundation)" opacity="0.95" />
      <text x="160" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">模型</text>
      <text x="160" y="128" textAnchor="middle" fontSize="11" fill="#bfdbfe">假设空间 / 线性模型 / 非线性模型</text>

      <path d="M160 142 L160 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="40" y="150" width="240" height="58" rx="10" fill="url(#slm-lm-linear)" opacity="0.95" />
      <text x="160" y="174" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">策略</text>
      <text x="160" y="194" textAnchor="middle" fontSize="11" fill="#e9d5ff">损失函数 / 风险最小化 / 正则化</text>

      <path d="M160 208 L160 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="40" y="216" width="240" height="58" rx="10" fill="url(#slm-lm-advanced)" opacity="0.95" />
      <text x="160" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">算法</text>
      <text x="160" y="260" textAnchor="middle" fontSize="11" fill="#fef3c7">梯度下降 / SMO / EM / 前向分步</text>

      <path d="M160 274 L160 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="40" y="282" width="240" height="58" rx="10" fill="url(#slm-lm-review)" opacity="0.95" />
      <text x="160" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">全书整合</text>
      <text x="160" y="326" textAnchor="middle" fontSize="11" fill="#cffafe">监督学习方法串联与对比</text>

      <text x="160" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">从感知机到 EM/HMM</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="84" width="460" height="38" rx="8" fill="url(#slm-lm-foundation)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="108" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="108" fontSize="11" fill="#475569">全书学习地图——统计学习三要素与学习路径</text>

      <path d="M550 122 L550 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="320" y="130" width="460" height="38" rx="8" fill="url(#slm-lm-linear)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="154" fontSize="12" fontWeight="600" fill="#5b21b6">ch1</text>
      <text x="372" y="154" fontSize="11" fill="#475569">感知机——线性二分类 / 原始形式 / 对偶形式</text>

      <path d="M550 168 L550 174" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="320" y="176" width="460" height="38" rx="8" fill="url(#slm-lm-linear)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="200" fontSize="12" fontWeight="600" fill="#5b21b6">ch2</text>
      <text x="372" y="200" fontSize="11" fill="#475569">k近邻法——距离度量 / kd树</text>

      <path d="M550 214 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="320" y="222" width="460" height="38" rx="8" fill="url(#slm-lm-linear)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="246" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="246" fontSize="11" fill="#475569">朴素贝叶斯——贝叶斯估计 / 参数估计</text>

      <path d="M550 260 L550 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="320" y="268" width="460" height="38" rx="8" fill="url(#slm-lm-linear)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="292" fontSize="12" fontWeight="600" fill="#5b21b6">ch4</text>
      <text x="372" y="292" fontSize="11" fill="#475569">决策树——信息增益 / ID3 / C4.5 / CART</text>

      <path d="M550 306 L550 312" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="320" y="314" width="460" height="38" rx="8" fill="url(#slm-lm-advanced)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="338" fontSize="12" fontWeight="600" fill="#92400e">ch5</text>
      <text x="372" y="338" fontSize="11" fill="#475569">逻辑斯谛回归与最大熵——极大似然 / IIS</text>

      <path d="M550 352 L550 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="320" y="360" width="460" height="38" rx="8" fill="url(#slm-lm-advanced)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="384" fontSize="12" fontWeight="600" fill="#92400e">ch6</text>
      <text x="372" y="384" fontSize="11" fill="#475569">支持向量机——间隔最大化 / 核技巧 / SMO</text>

      <path d="M550 398 L550 404" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="320" y="406" width="460" height="38" rx="8" fill="url(#slm-lm-advanced)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="430" fontSize="12" fontWeight="600" fill="#92400e">ch7</text>
      <text x="372" y="430" fontSize="11" fill="#475569">提升方法——AdaBoost / 前向分步 / 提升树</text>

      <path d="M550 444 L550 450" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="320" y="452" width="460" height="38" rx="8" fill="url(#slm-lm-advanced)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="476" fontSize="12" fontWeight="600" fill="#92400e">ch8</text>
      <text x="372" y="476" fontSize="11" fill="#475569">EM算法与隐马尔可夫模型——EM / GMM / HMM</text>

      <path d="M550 490 L550 496" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-lm-arrow)" />

      <rect x="320" y="498" width="460" height="38" rx="8" fill="url(#slm-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="522" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="522" fontSize="11" fill="#475569">全书复习与知识整合——方法对比与串联</text>

      {/* 底部学习路径 */}
      <rect x="40" y="550" width="740" height="26" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="567" textAnchor="middle" fontSize="11" fill="#475569">感知机 → k近邻 → 朴素贝叶斯 → 决策树 → 逻辑斯谛回归 → SVM → 提升方法 → EM/HMM → 整合</text>
    </svg>
  );
}
