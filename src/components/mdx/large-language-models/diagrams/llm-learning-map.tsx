"use client";

export function LlmLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="大语言模型基础与前沿知识全景图与十章学习路径">
      <defs>
        <linearGradient id="llm-lm-fund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="llm-lm-train" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="llm-lm-align" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="llm-lm-infer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="llm-lm-fut" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="llm-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">大语言模型：基础与前沿 · 知识全景图</text>

      {/* 左侧：五大学习阶段 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="78" width="240" height="46" rx="10" fill="url(#llm-lm-fund)" opacity="0.95" />
      <text x="160" y="99" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础与架构</text>
      <text x="160" y="116" textAnchor="middle" fontSize="11" fill="#bfdbfe">数学基础 / Transformer / 注意力</text>

      <path d="M160 124 L160 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="40" y="132" width="240" height="46" rx="10" fill="url(#llm-lm-train)" opacity="0.95" />
      <text x="160" y="153" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">训练与数据</text>
      <text x="160" y="170" textAnchor="middle" fontSize="11" fill="#ede9fe">缩放律 / 涌现 / 预训练数据</text>

      <path d="M160 178 L160 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="40" y="186" width="240" height="46" rx="10" fill="url(#llm-lm-align)" opacity="0.95" />
      <text x="160" y="207" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">对齐与后训练</text>
      <text x="160" y="224" textAnchor="middle" fontSize="11" fill="#fef3c7">SFT / RLHF / DPO</text>

      <path d="M160 232 L160 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="40" y="240" width="240" height="46" rx="10" fill="url(#llm-lm-infer)" opacity="0.95" />
      <text x="160" y="261" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">推理与评估</text>
      <text x="160" y="278" textAnchor="middle" fontSize="11" fill="#d1fae5">推理优化 / 部署 / 评估基准</text>

      <path d="M160 286 L160 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="40" y="294" width="240" height="46" rx="10" fill="url(#llm-lm-fut)" opacity="0.95" />
      <text x="160" y="315" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">前沿与整合</text>
      <text x="160" y="332" textAnchor="middle" fontSize="11" fill="#fecaca">前沿方向 / 全书复习</text>

      <text x="160" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">从数学基础到前沿研究的大模型全链路</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="78" width="460" height="34" rx="8" fill="url(#llm-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="100" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="100" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 112 L550 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="320" y="118" width="460" height="34" rx="8" fill="url(#llm-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="140" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="140" fontSize="11" fill="#475569">语言模型数学基础——概率与梯度</text>

      <path d="M550 152 L550 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="320" y="158" width="460" height="34" rx="8" fill="url(#llm-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="180" fontSize="12" fontWeight="600" fill="#1e40af">ch2</text>
      <text x="372" y="180" fontSize="11" fill="#475569">Transformer与注意力机制——架构核心</text>

      <path d="M550 192 L550 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="320" y="198" width="460" height="34" rx="8" fill="url(#llm-lm-train)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="220" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="220" fontSize="11" fill="#475569">缩放定律与涌现能力——大力出奇迹</text>

      <path d="M550 232 L550 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="320" y="238" width="460" height="34" rx="8" fill="url(#llm-lm-train)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="260" fontSize="12" fontWeight="600" fill="#5b21b6">ch4</text>
      <text x="372" y="260" fontSize="11" fill="#475569">预训练数据工程——清洗与分词</text>

      <path d="M550 272 L550 276" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="320" y="278" width="460" height="34" rx="8" fill="url(#llm-lm-align)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="300" fontSize="12" fontWeight="600" fill="#92400e">ch5</text>
      <text x="372" y="300" fontSize="11" fill="#475569">后训练与对齐技术——SFT与RLHF</text>

      <path d="M550 312 L550 316" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="320" y="318" width="460" height="34" rx="8" fill="url(#llm-lm-infer)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="340" fontSize="12" fontWeight="600" fill="#065f46">ch6</text>
      <text x="372" y="340" fontSize="11" fill="#475569">推理优化与部署——KV缓存与量化</text>

      <path d="M550 352 L550 356" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="320" y="358" width="460" height="34" rx="8" fill="url(#llm-lm-infer)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="380" fontSize="12" fontWeight="600" fill="#065f46">ch7</text>
      <text x="372" y="380" fontSize="11" fill="#475569">评估方法与基准——能力度量</text>

      <path d="M550 392 L550 396" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="320" y="398" width="460" height="34" rx="8" fill="url(#llm-lm-fut)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="420" fontSize="12" fontWeight="600" fill="#991b1b">ch8</text>
      <text x="372" y="420" fontSize="11" fill="#475569">前沿研究方向——多模态与Agent</text>

      <path d="M550 432 L550 436" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-lm-arrow)" />

      <rect x="320" y="438" width="460" height="34" rx="8" fill="url(#llm-lm-fut)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="460" fontSize="12" fontWeight="600" fill="#991b1b">ch9</text>
      <text x="372" y="460" fontSize="11" fill="#475569">全书复习与知识整合——闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="500" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="520" textAnchor="middle" fontSize="11" fill="#475569">数学基础 → Transformer → 缩放律 → 数据工程 → 后训练对齐 → 推理优化 → 评估基准 → 前沿方向 → 知识整合</text>

      {/* 底部核心脉络 */}
      <rect x="40" y="542" width="740" height="28" rx="8" fill="url(#llm-lm-train)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：数学奠基 → 架构创新 → 规模扩展 → 数据驱动 → 对齐安全 → 工程落地 → 前沿探索</text>
    </svg>
  );
}
