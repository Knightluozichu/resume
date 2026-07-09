"use client";

export function LaeLlmFoundationsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="大语言模型基础架构与训练流程">
      <defs>
        <linearGradient id="lae-lf-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lae-lf-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lae-lf-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lae-lf-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lae-lf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">大语言模型基础：从Token到生成</text>

      {/* 第一行：Token化 → 嵌入 → Transformer → 生成 */}
      <text x="400" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心处理链路</text>

      <rect x="20" y="76" width="170" height="66" rx="8" fill="url(#lae-lf-blue)" opacity="0.9" />
      <text x="105" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Token化</text>
      <text x="105" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">文本切分为token</text>
      <text x="105" y="132" textAnchor="middle" fontSize="10" fill="#bfdbfe">每个token有ID</text>

      <path d="M190 109 L210 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lf-arrow)" />

      <rect x="215" y="76" width="170" height="66" rx="8" fill="url(#lae-lf-purple)" opacity="0.9" />
      <text x="300" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">词嵌入</text>
      <text x="300" y="118" textAnchor="middle" fontSize="10" fill="#ede9fe">ID映射为向量</text>
      <text x="300" y="132" textAnchor="middle" fontSize="10" fill="#ede9fe">加位置编码</text>

      <path d="M385 109 L405 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lf-arrow)" />

      <rect x="410" y="76" width="170" height="66" rx="8" fill="url(#lae-lf-amber)" opacity="0.9" />
      <text x="495" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Transformer</text>
      <text x="495" y="118" textAnchor="middle" fontSize="10" fill="#fef3c7">自注意力机制</text>
      <text x="495" y="132" textAnchor="middle" fontSize="10" fill="#fef3c7">多层堆叠</text>

      <path d="M580 109 L600 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lf-arrow)" />

      <rect x="605" y="76" width="170" height="66" rx="8" fill="url(#lae-lf-green)" opacity="0.9" />
      <text x="690" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">自回归生成</text>
      <text x="690" y="118" textAnchor="middle" fontSize="10" fill="#d1fae5">预测下一个token</text>
      <text x="690" y="132" textAnchor="middle" fontSize="10" fill="#d1fae5">循环直至结束</text>

      {/* 第二行：Transformer架构详解 */}
      <text x="400" y="172" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Transformer 架构核心</text>

      <rect x="30" y="186" width="220" height="120" rx="8" fill="url(#lae-lf-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="140" y="208" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">多头自注意力</text>
      <text x="140" y="230" textAnchor="middle" fontSize="11" fill="#475569">Q-K-V 三路投影</text>
      <text x="140" y="248" textAnchor="middle" fontSize="11" fill="#475569">注意力权重 = softmax(QK)</text>
      <text x="140" y="266" textAnchor="middle" fontSize="11" fill="#475569">输出 = 权重加权和V</text>
      <text x="140" y="288" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">理解上下文关系</text>

      <rect x="290" y="186" width="220" height="120" rx="8" fill="url(#lae-lf-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="208" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">前馈网络 FFN</text>
      <text x="400" y="230" textAnchor="middle" fontSize="11" fill="#475569">两层线性变换</text>
      <text x="400" y="248" textAnchor="middle" fontSize="11" fill="#475569">中间非线性激活</text>
      <text x="400" y="266" textAnchor="middle" fontSize="11" fill="#475569">逐位置独立处理</text>
      <text x="400" y="288" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">特征非线性变换</text>

      <rect x="550" y="186" width="220" height="120" rx="8" fill="url(#lae-lf-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="660" y="208" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">残差 + 层归一化</text>
      <text x="660" y="230" textAnchor="middle" fontSize="11" fill="#475569">残差连接防梯度消失</text>
      <text x="660" y="248" textAnchor="middle" fontSize="11" fill="#475569">层归一化稳定训练</text>
      <text x="660" y="266" textAnchor="middle" fontSize="11" fill="#475569">N层堆叠形成深度</text>
      <text x="660" y="288" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">深度 + 稳定性</text>

      {/* 第三行：三阶段训练 */}
      <text x="400" y="338" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三阶段训练流程</text>

      <rect x="30" y="352" width="230" height="76" rx="8" fill="url(#lae-lf-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="374" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">预训练 Pre-training</text>
      <text x="145" y="394" textAnchor="middle" fontSize="10" fill="#475569">海量无标注文本</text>
      <text x="145" y="410" textAnchor="middle" fontSize="10" fill="#475569">目标：下一个token预测</text>
      <text x="145" y="424" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">学语言规律 + 世界知识</text>

      <path d="M260 390 L280 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lf-arrow)" />

      <rect x="285" y="352" width="230" height="76" rx="8" fill="url(#lae-lf-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="374" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">监督微调 SFT</text>
      <text x="400" y="394" textAnchor="middle" fontSize="10" fill="#475569">指令-回答对数据</text>
      <text x="400" y="410" textAnchor="middle" fontSize="10" fill="#475569">目标：跟随指令</text>
      <text x="400" y="424" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">学会按指令格式回答</text>

      <path d="M515 390 L535 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lf-arrow)" />

      <rect x="540" y="352" width="230" height="76" rx="8" fill="url(#lae-lf-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="655" y="374" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">RLHF 人类反馈对齐</text>
      <text x="655" y="394" textAnchor="middle" fontSize="10" fill="#475569">奖励模型 + PPO优化</text>
      <text x="655" y="410" textAnchor="middle" fontSize="10" fill="#475569">目标：对齐人类偏好</text>
      <text x="655" y="424" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">安全 + 有用 + 诚实</text>

      {/* 底部：能力涌现 */}
      <rect x="30" y="448" width="740" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="470" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">规模效应与能力涌现</text>
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#475569">参数量 + 数据量 + 算力增长 → 涌现推理、少样本学习、代码生成等新能力</text>

      {/* 底部总结 */}
      <rect x="30" y="520" width="740" height="40" rx="8" fill="url(#lae-lf-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="545" textAnchor="middle" fontSize="11" fill="#475569">核心脉络：Token化定义输入 → 嵌入定义表示 → Transformer定义架构 → 训练定义行为 → 生成定义输出</text>
    </svg>
  );
}
