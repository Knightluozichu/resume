"use client";

export function ImlModelEvaluationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="模型评估指标与交叉验证">
      <defs>
        <linearGradient id="iml-eval-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iml-eval-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iml-eval-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iml-eval-arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">模型评估与调优</text>

      {/* 左侧：混淆矩阵 */}
      <text x="200" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">混淆矩阵</text>

      {/* 矩阵 */}
      <rect x="120" y="82" width="160" height="40" rx="0" fill="#e2e8f0" />
      <text x="200" y="106" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155"></text>
      <text x="165" y="106" textAnchor="middle" fontSize="11" fill="#64748b">预测正</text>
      <text x="235" y="106" textAnchor="middle" fontSize="11" fill="#64748b">预测负</text>

      <rect x="80" y="122" width="40" height="80" rx="0" fill="#e2e8f0" />
      <text x="100" y="155" textAnchor="middle" fontSize="11" fill="#64748b" transform="rotate(-90, 100, 155)">真实正</text>
      <text x="100" y="190" textAnchor="middle" fontSize="11" fill="#64748b" transform="rotate(-90, 100, 190)">真实负</text>

      <rect x="120" y="122" width="80" height="40" rx="0" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="160" y="146" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">TP</text>

      <rect x="200" y="122" width="80" height="40" rx="0" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
      <text x="240" y="146" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">FN</text>

      <rect x="120" y="162" width="80" height="40" rx="0" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="160" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">FP</text>

      <rect x="200" y="162" width="80" height="40" rx="0" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
      <text x="240" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">TN</text>

      {/* 指标 */}
      <rect x="60" y="214" width="280" height="110" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="200" y="234" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">分类指标</text>
      <text x="75" y="252" fontSize="10" fill="#2563eb">准确率 = (TP+TN) / 总数</text>
      <text x="75" y="268" fontSize="10" fill="#2563eb">精确率 P = TP / (TP+FP)</text>
      <text x="75" y="284" fontSize="10" fill="#2563eb">召回率 R = TP / (TP+FN)</text>
      <text x="75" y="300" fontSize="10" fill="#2563eb">F1 = 2PR / (P+R)</text>
      <text x="75" y="316" fontSize="10" fill="#2563eb">AUC-ROC = ROC 曲线下面积</text>

      {/* 右侧：K折交叉验证 */}
      <text x="580" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">5 折交叉验证</text>

      {[0, 1, 2, 3, 4].map(fold => (
        <g key={`fold-${fold}`}>
          {[0, 1, 2, 3, 4].map(block => (
            <rect
              key={`fold-${fold}-block-${block}`}
              x={420 + block * 64}
              y={82 + fold * 32}
              width={60}
              height={28}
              rx={block === fold ? 4 : 2}
              fill={block === fold ? "url(#iml-eval-amber)" : "url(#iml-eval-blue)"}
              opacity={block === fold ? 0.85 : 0.3}
              stroke={block === fold ? "#d97706" : "#2563eb"}
              strokeWidth="1"
            />
          ))}
          <text x="410" y={100 + fold * 32} textAnchor="end" fontSize="10" fill="#475569">Fold {fold + 1}</text>
        </g>
      ))}

      {/* 图例 */}
      <rect x="420" y="252" width="16" height="12" rx="2" fill="url(#iml-eval-blue)" opacity="0.3" stroke="#2563eb" strokeWidth="1" />
      <text x="442" y="263" fontSize="10" fill="#475569">训练集</text>
      <rect x="500" y="252" width="16" height="12" rx="2" fill="url(#iml-eval-amber)" opacity="0.85" stroke="#d97706" strokeWidth="1" />
      <text x="522" y="263" fontSize="10" fill="#475569">验证集</text>

      <rect x="420" y="274" width="280" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="560" y="294" textAnchor="middle" fontSize="10" fill="#475569">每折用 4 份训练、1 份验证</text>
      <text x="560" y="310" textAnchor="middle" fontSize="10" fill="#475569">取 5 次结果平均 = 最终评估</text>

      {/* 底部：学习曲线 */}
      <text x="400" y="360" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习曲线：判断模型状态</text>

      {/* 坐标轴 */}
      <line x1="80" y1="530" x2="520" y2="530" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="80" y1="380" x2="80" y2="530" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="520" y="546" fontSize="11" fill="#64748b">训练样本数</text>
      <text x="72" y="376" textAnchor="end" fontSize="11" fill="#64748b">误差</text>

      {/* 训练误差曲线 */}
      <path d="M100 390 Q200 420 300 460 Q400 485 500 495" fill="none" stroke="url(#iml-eval-blue)" strokeWidth="2.5" />
      <text x="150" y="410" fontSize="10" fill="#2563eb">训练误差</text>

      {/* 验证误差曲线 */}
      <path d="M100 400 Q200 440 300 470 Q400 488 500 498" fill="none" stroke="url(#iml-eval-amber)" strokeWidth="2.5" />
      <text x="370" y="465" fontSize="10" fill="#f59e0b">验证误差</text>

      {/* 区域标注 */}
      <rect x="540" y="384" width="240" height="150" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="660" y="404" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">曲线解读</text>
      <text x="555" y="424" fontSize="10" fill="#ef4444">都高 → 欠拟合（加复杂度）</text>
      <text x="555" y="444" fontSize="10" fill="#ef4444">训练低验证高 → 过拟合</text>
      <text x="555" y="464" fontSize="10" fill="#059669">（加数据 / 正则化）</text>
      <text x="555" y="484" fontSize="10" fill="#2563eb">趋近有差距 → 加数据</text>
      <text x="555" y="504" fontSize="10" fill="#059669">趋近且低 → 理想状态</text>
      <text x="555" y="524" fontSize="10" fill="#64748b">验证曲线：选超参数值</text>
    </svg>
  );
}
