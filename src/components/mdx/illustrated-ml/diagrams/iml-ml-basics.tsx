"use client";

export function ImlMlBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="机器学习训练流程与三大范式">
      <defs>
        <linearGradient id="iml-mb-supervised" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iml-mb-unsupervised" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iml-mb-reinforcement" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iml-mb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">机器学习三大范式与训练流程</text>

      {/* 上半：三大范式 */}
      <text x="400" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三大学习范式</text>

      <rect x="40" y="82" width="230" height="80" rx="10" fill="url(#iml-mb-supervised)" opacity="0.95" />
      <text x="155" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">监督学习</text>
      <text x="155" y="128" textAnchor="middle" fontSize="11" fill="#bfdbfe">有标签 (X, y)</text>
      <text x="155" y="146" textAnchor="middle" fontSize="11" fill="#bfdbfe">学映射：分类 / 回归</text>

      <rect x="285" y="82" width="230" height="80" rx="10" fill="url(#iml-mb-unsupervised)" opacity="0.95" />
      <text x="400" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">无监督学习</text>
      <text x="400" y="128" textAnchor="middle" fontSize="11" fill="#fef3c7">无标签 X</text>
      <text x="400" y="146" textAnchor="middle" fontSize="11" fill="#fef3c7">找结构：聚类 / 降维</text>

      <rect x="530" y="82" width="230" height="80" rx="10" fill="url(#iml-mb-reinforcement)" opacity="0.95" />
      <text x="645" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">强化学习</text>
      <text x="645" y="128" textAnchor="middle" fontSize="11" fill="#cffafe">有奖励 (s, a, r)</text>
      <text x="645" y="146" textAnchor="middle" fontSize="11" fill="#cffafe">学策略：试错 / 优化</text>

      {/* 下半：训练流程 */}
      <text x="400" y="200" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">机器学习训练流程</text>

      <rect x="30" y="214" width="130" height="60" rx="8" fill="#f1f5f9" stroke="#2563eb" strokeWidth="1.5" />
      <text x="95" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">数据收集</text>
      <text x="95" y="258" textAnchor="middle" fontSize="10" fill="#64748b">采集 / 清洗 / 标注</text>

      <path d="M160 244 L178 244" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-mb-arrow)" />

      <rect x="182" y="214" width="130" height="60" rx="8" fill="#f1f5f9" stroke="#2563eb" strokeWidth="1.5" />
      <text x="247" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">特征工程</text>
      <text x="247" y="258" textAnchor="middle" fontSize="10" fill="#64748b">提取 / 选择 / 编码</text>

      <path d="M312 244 L330 244" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-mb-arrow)" />

      <rect x="334" y="214" width="130" height="60" rx="8" fill="#f1f5f9" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="399" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">模型训练</text>
      <text x="399" y="258" textAnchor="middle" fontSize="10" fill="#64748b">算法 / 损失函数</text>

      <path d="M464 244 L482 244" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-mb-arrow)" />

      <rect x="486" y="214" width="130" height="60" rx="8" fill="#f1f5f9" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="551" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">模型评估</text>
      <text x="551" y="258" textAnchor="middle" fontSize="10" fill="#64748b">验证集 / 测试集</text>

      <path d="M616 244 L634 244" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-mb-arrow)" />

      <rect x="638" y="214" width="130" height="60" rx="8" fill="#f1f5f9" stroke="#059669" strokeWidth="1.5" />
      <text x="703" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">部署监控</text>
      <text x="703" y="258" textAnchor="middle" fontSize="10" fill="#64748b">推理 / 数据漂移</text>

      {/* 反馈箭头 */}
      <path d="M703 274 Q703 310 400 310 Q95 310 95 274" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="6,4" markerEnd="url(#iml-mb-arrow)" />
      <text x="400" y="326" textAnchor="middle" fontSize="10" fill="#64748b">反馈迭代</text>

      {/* 底部：数据划分 */}
      <text x="400" y="362" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数据划分</text>

      <rect x="60" y="376" width="210" height="70" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="165" y="400" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">训练集 60-80%</text>
      <text x="165" y="420" textAnchor="middle" fontSize="10" fill="#475569">训练模型参数</text>
      <text x="165" y="436" textAnchor="middle" fontSize="10" fill="#475569">每次训练接触</text>

      <rect x="295" y="376" width="210" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="400" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">验证集 10-20%</text>
      <text x="400" y="420" textAnchor="middle" fontSize="10" fill="#475569">调超参数 / 选模型</text>
      <text x="400" y="436" textAnchor="middle" fontSize="10" fill="#475569">每次调参接触</text>

      <rect x="530" y="376" width="210" height="70" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      <text x="635" y="400" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">测试集 10-20%</text>
      <text x="635" y="420" textAnchor="middle" fontSize="10" fill="#475569">最终评估泛化能力</text>
      <text x="635" y="436" textAnchor="middle" fontSize="10" fill="#475569">仅最终用一次</text>

      {/* K折交叉验证标注 */}
      <rect x="60" y="462" width="680" height="26" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="479" textAnchor="middle" fontSize="11" fill="#475569">K 折交叉验证：分 K 份轮流验证，取平均，减少评估方差</text>
    </svg>
  );
}
