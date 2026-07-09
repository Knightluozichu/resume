"use client";

export function IaiFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="全书知识整合图">
      <defs>
        <linearGradient id="iai-fr-foundation" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iai-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iai-fr-application" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iai-fr-future" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iai-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">图解人工智能 · 全书知识整合</text>

      {/* 四层知识金字塔 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">AI 知识金字塔：从基础到应用</text>

      {/* 第一层：基础 */}
      <polygon points="300,80 500,80 460,130 340,130" fill="url(#iai-fr-foundation)" opacity="0.85" />
      <text x="400" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">基础层</text>
      <text x="400" y="120" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch1 AI 历史 + ch2 搜索算法</text>

      {/* 第二层：核心 */}
      <polygon points="340,134 460,134 420,184 380,184" fill="url(#iai-fr-core)" opacity="0.85" />
      <text x="400" y="156" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">核心层</text>
      <text x="400" y="174" textAnchor="middle" fontSize="10" fill="#e9d5ff">ch3 ML + ch4 DL</text>

      {/* 第三层：应用 */}
      <polygon points="380,188 420,188 410,238 390,238" fill="url(#iai-fr-application)" opacity="0.85" />
      <text x="400" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">应用</text>
      <text x="400" y="226" textAnchor="middle" fontSize="9" fill="#fef3c7">ch5-7</text>

      {/* 塔尖：伦理 */}
      <polygon points="390,242 410,242 400,262" fill="url(#iai-fr-future)" opacity="0.85" />
      <text x="400" y="258" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">伦理</text>

      {/* 左侧：知识链路 */}
      <rect x="30" y="80" width="250" height="200" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="50" y="104" fontSize="13" fontWeight="700" fill="#0f172a">知识演进链路</text>
      <text x="50" y="126" fontSize="11" fill="#1e40af">ch1 符号→连接主义范式</text>
      <text x="50" y="142" fontSize="10" fill="#64748b">  AI 从规则推理到数据学习</text>
      <text x="50" y="162" fontSize="11" fill="#1e40af">ch2 搜索是早期 AI 核心</text>
      <text x="50" y="178" fontSize="10" fill="#64748b">  BFS/DFS/A* → 博弈搜索</text>
      <text x="50" y="198" fontSize="11" fill="#5b21b6">ch3 ML 三范式奠定基础</text>
      <text x="50" y="214" fontSize="10" fill="#64748b">  监督/无监督/强化</text>
      <text x="50" y="234" fontSize="11" fill="#5b21b6">ch4 DL 用多层网络突破</text>
      <text x="50" y="250" fontSize="10" fill="#64748b">  CNN/RNN/反向传播</text>
      <text x="50" y="270" fontSize="11" fill="#92400e">ch5-7 三大应用领域</text>

      {/* 右侧：核心公式与概念 */}
      <rect x="520" y="80" width="250" height="200" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="540" y="104" fontSize="13" fontWeight="700" fill="#0f172a">核心公式速查</text>
      <text x="540" y="126" fontSize="11" fill="#475569">A*：f(n) = g(n) + h(n)</text>
      <text x="540" y="146" fontSize="11" fill="#475569">梯度下降：W -= lr * dL/dW</text>
      <text x="540" y="166" fontSize="11" fill="#475569">交叉熵：L = -sum(y log p)</text>
      <text x="540" y="186" fontSize="11" fill="#475569">卷积：out = (W-K+2P)/S+1</text>
      <text x="540" y="206" fontSize="11" fill="#475569">注意力：softmax(QK^T/sqrt(d))V</text>
      <text x="540" y="226" fontSize="11" fill="#475569">F1 = 2PR/(P+R)</text>
      <text x="540" y="246" fontSize="11" fill="#475569">贝尔曼：V=max[R+gamma*V']</text>
      <text x="540" y="266" fontSize="11" fill="#475569">IoU = 交集 / 并集</text>

      {/* 底部：跨章节关联 */}
      <rect x="30" y="300" width="740" height="110" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="50" y="324" fontSize="13" fontWeight="700" fill="#065f46">跨章节核心关联</text>
      <text x="50" y="346" fontSize="11" fill="#475569">搜索 → ML：A* 是启发式搜索，ML 的超参搜索也是优化问题</text>
      <text x="50" y="364" fontSize="11" fill="#475569">ML → DL：深度学习是机器学习子集，用多层神经网络自动提取特征</text>
      <text x="50" y="382" fontSize="11" fill="#475569">DL → NLP/CV：Transformer 和 CNN 分别是 NLP 和 CV 的核心架构</text>
      <text x="50" y="400" fontSize="11" fill="#475569">RL → 伦理：RLHF（人类反馈强化学习）是价值对齐的关键技术</text>

      {/* 底部：能力地图 */}
      <rect x="30" y="424" width="740" height="110" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="50" y="448" fontSize="13" fontWeight="700" fill="#0f172a">学习后的能力地图</text>
      <text x="50" y="470" fontSize="11" fill="#475569">认知：理解 AI 三次浪潮、两大范式、ML/DL 本质区别</text>
      <text x="50" y="488" fontSize="11" fill="#475569">分析：能评估模型（准确率/F1/mAP/IoU），理解偏差-方差权衡</text>
      <text x="50" y="506" fontSize="11" fill="#475569">应用：掌握 NLP/CV/RL 核心任务与代表模型，能选型与调优</text>
      <text x="50" y="524" fontSize="11" fill="#475569">思辨：理解 AI 伦理风险，能从技术/制度/文化层面思考治理路径</text>
    </svg>
  );
}
