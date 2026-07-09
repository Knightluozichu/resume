"use client";

export function PrlLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="PRML模式识别与机器学习全书学习地图">
      <defs>
        <linearGradient id="prl-lm-fund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="prl-lm-linear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="prl-lm-advanced" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="prl-lm-model" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="prl-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="prl-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">模式识别与机器学习（PRML） · 知识体系全景</text>

      {/* 左侧：三大学习阶段 */}
      <text x="160" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">PRML 学习主线</text>

      <rect x="40" y="84" width="240" height="58" rx="10" fill="url(#prl-lm-fund)" opacity="0.95" />
      <text x="160" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">概率与推断基础</text>
      <text x="160" y="128" textAnchor="middle" fontSize="11" fill="#bfdbfe">概率论 / 贝叶斯推断 / 决策论</text>

      <path d="M160 142 L160 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="40" y="150" width="240" height="58" rx="10" fill="url(#prl-lm-linear)" opacity="0.95" />
      <text x="160" y="174" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">线性模型与神经网络</text>
      <text x="160" y="194" textAnchor="middle" fontSize="11" fill="#ede9fe">回归 / 分类 / 神经网络 / 核方法</text>

      <path d="M160 208 L160 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="40" y="216" width="240" height="58" rx="10" fill="url(#prl-lm-advanced)" opacity="0.95" />
      <text x="160" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">高级模型与推断</text>
      <text x="160" y="260" textAnchor="middle" fontSize="11" fill="#fef3c7">稀疏核 / 图模型 / 混合EM</text>

      <path d="M160 274 L160 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="40" y="282" width="240" height="58" rx="10" fill="url(#prl-lm-review)" opacity="0.95" />
      <text x="160" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">全书复习与整合</text>
      <text x="160" y="326" textAnchor="middle" fontSize="11" fill="#d1fae5">贝叶斯统一视角 / 知识闭环</text>

      <text x="160" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">贝叶斯推断 + 概率建模</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="84" width="460" height="38" rx="8" fill="url(#prl-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="108" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="108" fontSize="11" fill="#475569">全书学习地图——知识体系与学习路径</text>

      <path d="M550 122 L550 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="320" y="130" width="460" height="38" rx="8" fill="url(#prl-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="154" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="154" fontSize="11" fill="#475569">概率论基础——贝叶斯/分布/推断</text>

      <path d="M550 168 L550 174" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="320" y="176" width="460" height="38" rx="8" fill="url(#prl-lm-linear)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="200" fontSize="12" fontWeight="600" fill="#5b21b6">ch2</text>
      <text x="372" y="200" fontSize="11" fill="#475569">线性回归模型——基函数/贝叶斯回归</text>

      <path d="M550 214 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="320" y="222" width="460" height="38" rx="8" fill="url(#prl-lm-linear)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="246" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="246" fontSize="11" fill="#475569">线性分类模型——逻辑回归/生成模型</text>

      <path d="M550 260 L550 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="320" y="268" width="460" height="38" rx="8" fill="url(#prl-lm-linear)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="292" fontSize="12" fontWeight="600" fill="#5b21b6">ch4</text>
      <text x="372" y="292" fontSize="11" fill="#475569">神经网络——前馈网络/反向传播</text>

      <path d="M550 306 L550 312" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="320" y="314" width="460" height="38" rx="8" fill="url(#prl-lm-linear)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="338" fontSize="12" fontWeight="600" fill="#5b21b6">ch5</text>
      <text x="372" y="338" fontSize="11" fill="#475569">核方法——对偶表示/高斯过程</text>

      <path d="M550 352 L550 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="320" y="360" width="460" height="38" rx="8" fill="url(#prl-lm-advanced)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="384" fontSize="12" fontWeight="600" fill="#92400e">ch6</text>
      <text x="372" y="384" fontSize="11" fill="#475569">稀疏核机——支持向量机/最大间隔</text>

      <path d="M550 398 L550 404" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="320" y="406" width="460" height="38" rx="8" fill="url(#prl-lm-advanced)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="430" fontSize="12" fontWeight="600" fill="#92400e">ch7</text>
      <text x="372" y="430" fontSize="11" fill="#475569">图模型——贝叶斯网络/马尔可夫随机场</text>

      <path d="M550 444 L550 450" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="320" y="452" width="460" height="38" rx="8" fill="url(#prl-lm-advanced)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="476" fontSize="12" fontWeight="600" fill="#92400e">ch8</text>
      <text x="372" y="476" fontSize="11" fill="#475569">混合模型与EM——GMM/EM算法</text>

      <path d="M550 490 L550 496" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lm-arrow)" />

      <rect x="320" y="498" width="460" height="38" rx="8" fill="url(#prl-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="522" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="522" fontSize="11" fill="#475569">全书复习与知识整合——贝叶斯统一视角</text>

      {/* 底部学习路径 */}
      <rect x="40" y="550" width="740" height="26" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="567" textAnchor="middle" fontSize="11" fill="#475569">概率基础 → 线性回归 → 线性分类 → 神经网络 → 核方法 → 稀疏核 → 图模型 → 混合EM → 整合</text>
    </svg>
  );
}
