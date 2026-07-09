"use client";

export function Dl2TrainingEvaluationDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="训练与评估完整流程">
      <defs>
        <linearGradient id="dl2-tr-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dl2-tr-model" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dl2-tr-loss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dl2-tr-opt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dl2-tr-eval" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dl2-tr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">训练与评估完整流程</text>

      {/* 数据流 */}
      <rect x="30" y="60" width="120" height="50" rx="10" fill="url(#dl2-tr-data)" opacity="0.92" />
      <text x="90" y="82" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">DataLoader</text>
      <text x="90" y="100" textAnchor="middle" fontSize="10" fill="#bfdbfe">mini-batch</text>

      <path d="M150 85 L190 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-tr-arrow)" />

      {/* 模型 */}
      <rect x="190" y="60" width="120" height="50" rx="10" fill="url(#dl2-tr-model)" opacity="0.92" />
      <text x="250" y="82" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Model</text>
      <text x="250" y="100" textAnchor="middle" fontSize="10" fill="#e9d5ff">前向传播</text>

      <path d="M310 85 L350 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-tr-arrow)" />

      {/* 损失 */}
      <rect x="350" y="60" width="120" height="50" rx="10" fill="url(#dl2-tr-loss)" opacity="0.92" />
      <text x="410" y="82" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Loss</text>
      <text x="410" y="100" textAnchor="middle" fontSize="10" fill="#fecaca">softmax 交叉熵</text>

      <path d="M410 110 L410 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-tr-arrow)" />

      {/* 反向传播 */}
      <rect x="350" y="140" width="120" height="50" rx="10" fill="url(#dl2-tr-loss)" opacity="0.75" />
      <text x="410" y="162" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">backward</text>
      <text x="410" y="180" textAnchor="middle" fontSize="10" fill="#fecaca">梯度反向传播</text>

      <path d="M410 190 L410 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-tr-arrow)" />

      {/* 优化器 */}
      <rect x="350" y="220" width="120" height="50" rx="10" fill="url(#dl2-tr-opt)" opacity="0.92" />
      <text x="410" y="242" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Optimizer</text>
      <text x="410" y="260" textAnchor="middle" fontSize="10" fill="#fef3c7">update 参数</text>

      {/* 循环箭头 */}
      <path d="M350 245 L90 245 L90 110" stroke="#64748b" strokeWidth="2" strokeDasharray="5,3" fill="none" markerEnd="url(#dl2-tr-arrow)" />
      <text x="200" y="238" fontSize="10" fill="#64748b">下一轮 mini-batch</text>

      {/* 评估 */}
      <rect x="620" y="140" width="150" height="50" rx="10" fill="url(#dl2-tr-eval)" opacity="0.92" />
      <text x="695" y="162" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">评估 accuracy</text>
      <text x="695" y="180" textAnchor="middle" fontSize="10" fill="#d1fae5">测试集精度</text>

      <path d="M470 85 L620 85 L695 85 L695 140" stroke="#059669" strokeWidth="2" strokeDasharray="4,3" fill="none" markerEnd="url(#dl2-tr-arrow)" />
      <text x="560" y="78" fontSize="10" fill="#059669">定期评估</text>

      {/* 损失函数对比 */}
      <rect x="30" y="300" width="360" height="150" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="210" y="324" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">softmax 交叉熵</text>
      <text x="50" y="348" fontSize="10" fill="#475569">forward: softmax + 交叉熵</text>
      <text x="50" y="366" fontSize="10" fill="#475569">  y = -sum(log(softmax[t])) / N</text>
      <text x="50" y="390" fontSize="10" fill="#475569">backward: (softmax - onehot) / N</text>
      <text x="50" y="408" fontSize="10" fill="#475569">  预测正确 → 梯度小</text>
      <text x="50" y="426" fontSize="10" fill="#475569">  预测错误 → 梯度大</text>
      <text x="50" y="444" fontSize="10" fill="#991b1b">合并实现：梯度形式简洁</text>

      {/* 训练循环 */}
      <rect x="410" y="300" width="360" height="150" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="324" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">训练循环</text>
      <text x="430" y="348" fontSize="10" fill="#475569">for epoch in range(max_epoch):</text>
      <text x="430" y="366" fontSize="10" fill="#475569">  for x, t in train_loader:</text>
      <text x="430" y="384" fontSize="10" fill="#92400e">    y = model(x)</text>
      <text x="430" y="402" fontSize="10" fill="#92400e">    loss = criterion(y, t)</text>
      <text x="430" y="420" fontSize="10" fill="#92400e">    model.cleargrads(); loss.backward()</text>
      <text x="430" y="438" fontSize="10" fill="#92400e">    optimizer.update()</text>
    </svg>
  );
}
