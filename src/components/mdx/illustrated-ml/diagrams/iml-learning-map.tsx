"use client";

export function ImlLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="图解机器学习全书学习地图">
      <defs>
        <linearGradient id="iml-lm-foundation" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iml-lm-supervised" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iml-lm-advanced" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iml-lm-practice" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iml-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">图解机器学习 · 知识体系全景</text>

      {/* 左侧：四层架构 */}
      <text x="160" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">ML 知识四层架构</text>

      <rect x="40" y="84" width="240" height="58" rx="10" fill="url(#iml-lm-foundation)" opacity="0.95" />
      <text x="160" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础层：ML 基础概念</text>
      <text x="160" y="128" textAnchor="middle" fontSize="11" fill="#bfdbfe">三大范式 / 训练流程 / 数据划分</text>

      <path d="M160 142 L160 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="40" y="150" width="240" height="58" rx="10" fill="url(#iml-lm-supervised)" opacity="0.95" />
      <text x="160" y="174" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">监督模型层：回归 + 分类 + 树</text>
      <text x="160" y="194" textAnchor="middle" fontSize="11" fill="#e9d5ff">线性模型 / 逻辑回归 / 决策树</text>

      <path d="M160 208 L160 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="40" y="216" width="240" height="58" rx="10" fill="url(#iml-lm-advanced)" opacity="0.95" />
      <text x="160" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">进阶模型层：NN + SVM + 无监督</text>
      <text x="160" y="260" textAnchor="middle" fontSize="11" fill="#fef3c7">神经网络 / SVM / K-Means / PCA</text>

      <path d="M160 274 L160 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="40" y="282" width="240" height="58" rx="10" fill="url(#iml-lm-practice)" opacity="0.95" />
      <text x="160" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">实践与整合层：评估 + 复习</text>
      <text x="160" y="326" textAnchor="middle" fontSize="11" fill="#cffafe">模型评估 / 超参搜索 / 知识整合</text>

      <text x="160" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">从线性模型到神经网络</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="84" width="460" height="38" rx="8" fill="url(#iml-lm-practice)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="108" fontSize="12" fontWeight="600" fill="#065f46">ch0</text>
      <text x="372" y="108" fontSize="11" fill="#475569">全书学习地图——ML 知识体系与学习路径</text>

      <path d="M550 122 L550 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="320" y="130" width="460" height="38" rx="8" fill="url(#iml-lm-foundation)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="154" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="154" fontSize="11" fill="#475569">ML 基础概念——三大范式 / 训练流程</text>

      <path d="M550 168 L550 174" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="320" y="176" width="460" height="38" rx="8" fill="url(#iml-lm-supervised)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="200" fontSize="12" fontWeight="600" fill="#5b21b6">ch2</text>
      <text x="372" y="200" fontSize="11" fill="#475569">线性模型与回归——梯度下降 / 正则化</text>

      <path d="M550 214 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="320" y="222" width="460" height="38" rx="8" fill="url(#iml-lm-supervised)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="246" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="246" fontSize="11" fill="#475569">分类与逻辑回归——sigmoid / 交叉熵</text>

      <path d="M550 260 L550 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="320" y="268" width="460" height="38" rx="8" fill="url(#iml-lm-supervised)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="292" fontSize="12" fontWeight="600" fill="#5b21b6">ch4</text>
      <text x="372" y="292" fontSize="11" fill="#475569">决策树与集成学习——随机森林 / GBDT</text>

      <path d="M550 306 L550 312" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="320" y="314" width="460" height="38" rx="8" fill="url(#iml-lm-advanced)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="338" fontSize="12" fontWeight="600" fill="#92400e">ch5</text>
      <text x="372" y="338" fontSize="11" fill="#475569">神经网络基础——感知机 / 反向传播</text>

      <path d="M550 352 L550 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="320" y="360" width="460" height="38" rx="8" fill="url(#iml-lm-advanced)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="384" fontSize="12" fontWeight="600" fill="#92400e">ch6</text>
      <text x="372" y="384" fontSize="11" fill="#475569">支持向量机——最大间隔 / 核函数</text>

      <path d="M550 398 L550 404" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="320" y="406" width="460" height="38" rx="8" fill="url(#iml-lm-advanced)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="430" fontSize="12" fontWeight="600" fill="#92400e">ch7</text>
      <text x="372" y="430" fontSize="11" fill="#475569">无监督学习与聚类——K-Means / PCA</text>

      <path d="M550 444 L550 450" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="320" y="452" width="460" height="38" rx="8" fill="url(#iml-lm-practice)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="476" fontSize="12" fontWeight="600" fill="#065f46">ch8</text>
      <text x="372" y="476" fontSize="11" fill="#475569">模型评估与调优——指标 / 交叉验证</text>

      <path d="M550 490 L550 496" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-lm-arrow)" />

      <rect x="320" y="498" width="460" height="38" rx="8" fill="url(#iml-lm-practice)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="522" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="522" fontSize="11" fill="#475569">全书复习与知识整合——端到端串联</text>

      {/* 底部学习路径 */}
      <rect x="40" y="550" width="740" height="26" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="567" textAnchor="middle" fontSize="11" fill="#475569">基础 → 线性模型 → 分类 → 决策树 → 神经网络 → SVM → 无监督 → 评估 → 整合</text>
    </svg>
  );
}
