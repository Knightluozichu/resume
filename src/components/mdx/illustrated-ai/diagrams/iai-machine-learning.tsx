"use client";

export function IaiMachineLearningDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="机器学习分类与训练流程图">
      <defs>
        <linearGradient id="iai-ml-supervised" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iai-ml-unsupervised" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iai-ml-rl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iai-ml-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iai-ml-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">机器学习：三大范式与训练流程</text>

      {/* 上半部分：三大范式 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习范式分类</text>

      {/* 监督学习 */}
      <rect x="40" y="76" width="230" height="120" rx="10" fill="url(#iai-ml-supervised)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">监督学习</text>
      <text x="155" y="120" textAnchor="middle" fontSize="11" fill="#475569">有标签数据 (X, y)</text>
      <text x="155" y="138" textAnchor="middle" fontSize="10" fill="#64748b">分类：离散标签</text>
      <text x="155" y="154" textAnchor="middle" fontSize="10" fill="#64748b">回归：连续标签</text>
      <text x="155" y="172" textAnchor="middle" fontSize="10" fill="#64748b">代表：SVM / 决策树 / 线性回归</text>
      <text x="155" y="188" textAnchor="middle" fontSize="10" fill="#64748b">例：垃圾邮件分类</text>

      {/* 无监督学习 */}
      <rect x="285" y="76" width="230" height="120" rx="10" fill="url(#iai-ml-unsupervised)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">无监督学习</text>
      <text x="400" y="120" textAnchor="middle" fontSize="11" fill="#475569">无标签数据 X</text>
      <text x="400" y="138" textAnchor="middle" fontSize="10" fill="#64748b">聚类：发现分组结构</text>
      <text x="400" y="154" textAnchor="middle" fontSize="10" fill="#64748b">降维：PCA / t-SNE</text>
      <text x="400" y="172" textAnchor="middle" fontSize="10" fill="#64748b">代表：K-Means / DBSCAN</text>
      <text x="400" y="188" textAnchor="middle" fontSize="10" fill="#64748b">例：用户群体分群</text>

      {/* 强化学习 */}
      <rect x="530" y="76" width="230" height="120" rx="10" fill="url(#iai-ml-rl)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="645" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">强化学习</text>
      <text x="645" y="120" textAnchor="middle" fontSize="11" fill="#475569">试错 + 奖励信号</text>
      <text x="645" y="138" textAnchor="middle" fontSize="10" fill="#64748b">策略：状态 → 动作映射</text>
      <text x="645" y="154" textAnchor="middle" fontSize="10" fill="#64748b">价值：长期回报估计</text>
      <text x="645" y="172" textAnchor="middle" fontSize="10" fill="#64748b">代表：Q-learning / DQN</text>
      <text x="645" y="188" textAnchor="middle" fontSize="10" fill="#64748b">例：AlphaGo / 机器人</text>

      {/* 下半部分：训练流程 */}
      <text x="400" y="224" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">机器学习训练流程</text>

      <rect x="40" y="238" width="140" height="56" rx="10" fill="url(#iai-ml-flow)" opacity="0.9" />
      <text x="110" y="262" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">数据收集</text>
      <text x="110" y="280" textAnchor="middle" fontSize="10" fill="#cffafe">采集 + 清洗</text>

      <path d="M180 266 L200 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-ml-arrow)" />

      <rect x="200" y="238" width="140" height="56" rx="10" fill="url(#iai-ml-flow)" opacity="0.9" />
      <text x="270" y="262" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">特征工程</text>
      <text x="270" y="280" textAnchor="middle" fontSize="10" fill="#cffae">提取 / 选择 / 编码</text>

      <path d="M340 266 L360 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-ml-arrow)" />

      <rect x="360" y="238" width="140" height="56" rx="10" fill="url(#iai-ml-flow)" opacity="0.9" />
      <text x="430" y="262" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">模型训练</text>
      <text x="430" y="280" textAnchor="middle" fontSize="10" fill="#cffae">最小化损失函数</text>

      <path d="M500 266 L520 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-ml-arrow)" />

      <rect x="520" y="238" width="120" height="56" rx="10" fill="url(#iai-ml-flow)" opacity="0.9" />
      <text x="580" y="262" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">模型评估</text>
      <text x="580" y="280" textAnchor="middle" fontSize="10" fill="#cffae">验证集 / 测试集</text>

      <path d="M640 266 L660 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-ml-arrow)" />

      <rect x="660" y="238" width="100" height="56" rx="10" fill="url(#iai-ml-flow)" opacity="0.9" />
      <text x="710" y="262" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">部署</text>
      <text x="710" y="280" textAnchor="middle" fontSize="10" fill="#cffae">在线推理</text>

      {/* 评估指标 */}
      <rect x="40" y="316" width="360" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="340" fontSize="13" fontWeight="700" fill="#0f172a">分类评估指标</text>
      <text x="60" y="360" fontSize="11" fill="#475569">准确率 = (TP+TN) / (TP+TN+FP+FN)</text>
      <text x="60" y="378" fontSize="11" fill="#475569">精确率 = TP / (TP+FP)（预测为正中真为正的比例）</text>
      <text x="60" y="396" fontSize="11" fill="#475569">召回率 = TP / (TP+FN)（真实正例中被召回的比例）</text>
      <text x="60" y="414" fontSize="11" fill="#475569">F1 = 2 * P * R / (P + R)（精确率与召回率的调和均值）</text>

      {/* 过拟合与欠拟合 */}
      <rect x="420" y="316" width="340" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="440" y="340" fontSize="13" fontWeight="700" fill="#0f172a">偏差-方差权衡</text>
      <text x="440" y="360" fontSize="11" fill="#475569">欠拟合：训练误差高 = 偏差大（模型太简单）</text>
      <text x="440" y="378" fontSize="11" fill="#475569">过拟合：训练低但泛化差 = 方差大（模型太复杂）</text>
      <text x="440" y="396" fontSize="11" fill="#475569">正则化：L1 / L2 / Dropout 抑制过拟合</text>
      <text x="440" y="414" fontSize="11" fill="#475569">交叉验证：K 折评估泛化能力</text>

      {/* 损失函数 */}
      <rect x="40" y="452" width="720" height="80" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="476" fontSize="13" fontWeight="700" fill="#92400e">常见损失函数</text>
      <text x="60" y="496" fontSize="11" fill="#475569">MSE（回归）：L = (1/n) * sum((y_i - y_hat_i)^2)</text>
      <text x="60" y="514" fontSize="11" fill="#475569">交叉熵（分类）：L = -sum(y_i * log(p_i))，衡量预测分布与真实分布的差异</text>
    </svg>
  );
}
