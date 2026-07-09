"use client";

export function LlmFoundationsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="语言模型数学基础 概率论 线性代数 优化 损失函数">
      <defs>
        <linearGradient id="llm-fd-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="llm-fd-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="llm-fd-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="llm-fd-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="llm-fd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">语言模型数学基础</text>

      {/* 四大数学支柱 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四大数学支柱</text>

      {/* 概率论 */}
      <rect x="30" y="76" width="180" height="130" rx="10" fill="url(#llm-fd-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">概率论</text>
      <text x="120" y="120" textAnchor="middle" fontSize="11" fill="#475569">条件概率 P(y|x)</text>
      <text x="120" y="138" textAnchor="middle" fontSize="11" fill="#475569">链式法则</text>
      <text x="120" y="156" textAnchor="middle" fontSize="11" fill="#475569">交叉熵</text>
      <text x="120" y="174" textAnchor="middle" fontSize="11" fill="#475569">Softmax</text>
      <text x="120" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">建模语言概率</text>

      {/* 线性代数 */}
      <rect x="230" y="76" width="180" height="130" rx="10" fill="url(#llm-fd-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="320" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">线性代数</text>
      <text x="320" y="120" textAnchor="middle" fontSize="11" fill="#475569">向量与矩阵</text>
      <text x="320" y="138" textAnchor="middle" fontSize="11" fill="#475569">矩阵乘法</text>
      <text x="320" y="156" textAnchor="middle" fontSize="11" fill="#475569">特征分解</text>
      <text x="320" y="174" textAnchor="middle" fontSize="11" fill="#475569">嵌入表示</text>
      <text x="320" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">表示语言为向量</text>

      {/* 优化理论 */}
      <rect x="430" y="76" width="180" height="130" rx="10" fill="url(#llm-fd-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="520" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">优化理论</text>
      <text x="520" y="120" textAnchor="middle" fontSize="11" fill="#475569">梯度下降</text>
      <text x="520" y="138" textAnchor="middle" fontSize="11" fill="#475569">反向传播</text>
      <text x="520" y="156" textAnchor="middle" fontSize="11" fill="#475569">学习率调度</text>
      <text x="520" y="174" textAnchor="middle" fontSize="11" fill="#475569">Adam优化器</text>
      <text x="520" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">最小化损失</text>

      {/* 信息论 */}
      <rect x="630" y="76" width="140" height="130" rx="10" fill="url(#llm-fd-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="700" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">信息论</text>
      <text x="700" y="120" textAnchor="middle" fontSize="11" fill="#475569">熵 H(x)</text>
      <text x="700" y="138" textAnchor="middle" fontSize="11" fill="#475569">KL散度</text>
      <text x="700" y="156" textAnchor="middle" fontSize="11" fill="#475569">困惑度 PPL</text>
      <text x="700" y="174" textAnchor="middle" fontSize="11" fill="#475569">互信息</text>
      <text x="700" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">度量不确定性</text>

      {/* 语言模型的概率视角 */}
      <text x="400" y="236" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">语言模型的概率链式分解</text>

      <rect x="40" y="250" width="720" height="50" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="272" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">P(x1, x2, ..., xn) = P(x1) * P(x2|x1) * ... * P(xn|x1,...,xn-1)</text>
      <text x="400" y="290" textAnchor="middle" fontSize="11" fill="#475569">联合概率 = 各 token 条件概率的连乘（自回归分解）</text>

      <path d="M400 300 L400 306" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-fd-arrow)" />

      {/* 损失函数与优化流程 */}
      <text x="400" y="328" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">训练流程：从概率到优化</text>

      <rect x="30" y="342" width="120" height="56" rx="8" fill="url(#llm-fd-blue)" opacity="0.9" />
      <text x="90" y="364" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">输入序列</text>
      <text x="90" y="382" textAnchor="middle" fontSize="9" fill="#bfdbfe">token化</text>

      <path d="M150 370 L168 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-fd-arrow)" />

      <rect x="172" y="342" width="120" height="56" rx="8" fill="url(#llm-fd-purple)" opacity="0.9" />
      <text x="232" y="364" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">模型预测</text>
      <text x="232" y="382" textAnchor="middle" fontSize="9" fill="#ede9fe">P(xi|context)</text>

      <path d="M292 370 L310 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-fd-arrow)" />

      <rect x="314" y="342" width="120" height="56" rx="8" fill="url(#llm-fd-amber)" opacity="0.9" />
      <text x="374" y="364" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">交叉熵损失</text>
      <text x="374" y="382" textAnchor="middle" fontSize="9" fill="#fef3c7">-log P(y_true)</text>

      <path d="M434 370 L452 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-fd-arrow)" />

      <rect x="456" y="342" width="120" height="56" rx="8" fill="url(#llm-fd-green)" opacity="0.9" />
      <text x="516" y="364" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">反向传播</text>
      <text x="516" y="382" textAnchor="middle" fontSize="9" fill="#d1fae5">计算梯度</text>

      <path d="M576 370 L594 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-fd-arrow)" />

      <rect x="598" y="342" width="172" height="56" rx="8" fill="url(#llm-fd-blue)" opacity="0.9" />
      <text x="684" y="364" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">参数更新</text>
      <text x="684" y="382" textAnchor="middle" fontSize="9" fill="#bfdbfe">theta = theta - lr * grad</text>

      {/* 底部：关键指标 */}
      <text x="400" y="424" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键评估指标</text>

      <rect x="60" y="438" width="200" height="56" rx="8" fill="url(#llm-fd-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="160" y="458" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">交叉熵损失</text>
      <text x="160" y="478" textAnchor="middle" fontSize="10" fill="#475569">越低越好，衡量预测偏差</text>

      <rect x="300" y="438" width="200" height="56" rx="8" fill="url(#llm-fd-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="458" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">困惑度 PPL</text>
      <text x="400" y="478" textAnchor="middle" fontSize="10" fill="#475569">exp(交叉熵)，越低越好</text>

      <rect x="540" y="438" width="200" height="56" rx="8" fill="url(#llm-fd-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="640" y="458" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">梯度范数</text>
      <text x="640" y="478" textAnchor="middle" fontSize="10" fill="#475569">监控训练稳定性</text>

      {/* 底部总结 */}
      <rect x="30" y="510" width="740" height="36" rx="8" fill="url(#llm-fd-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="532" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心思想：语言建模 = 概率估计 + 向量表示 + 梯度优化 + 信息度量</text>
    </svg>
  );
}
