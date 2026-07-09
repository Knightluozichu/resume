"use client";

export function TcgTrainingProcessDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="ChatGPT训练过程：预训练、监督微调、RLHF三阶段">
      <defs>
        <linearGradient id="tcg-tp-stage1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tcg-tp-stage2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tcg-tp-stage3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tcg-tp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">ChatGPT 的训练过程</text>

      {/* 三阶段训练 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三阶段训练流程</text>

      {/* 阶段1：预训练 */}
      <rect x="40" y="80" width="230" height="180" rx="10" fill="url(#tcg-tp-stage1)" opacity="0.08" stroke="#2563eb" strokeWidth="2" />
      <rect x="40" y="80" width="230" height="36" rx="10" fill="url(#tcg-tp-stage1)" opacity="0.9" />
      <text x="155" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段1：预训练</text>
      <text x="155" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">海量文本自监督学习</text>
      <text x="155" y="156" textAnchor="middle" fontSize="11" fill="#475569">数据：互联网海量文本</text>
      <text x="155" y="176" textAnchor="middle" fontSize="11" fill="#475569">目标：预测下一个token</text>
      <text x="155" y="196" textAnchor="middle" fontSize="11" fill="#475569">规模：数千亿token</text>
      <text x="155" y="216" textAnchor="middle" fontSize="11" fill="#475569">结果：学会语言规律</text>
      <text x="155" y="240" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">学会"接话"但不听指令</text>

      <path d="M270 170 L290 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-tp-arrow)" />

      {/* 阶段2：监督微调 */}
      <rect x="300" y="80" width="230" height="180" rx="10" fill="url(#tcg-tp-stage2)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <rect x="300" y="80" width="230" height="36" rx="10" fill="url(#tcg-tp-stage2)" opacity="0.9" />
      <text x="415" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段2：监督微调</text>
      <text x="415" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">指令-回答对训练</text>
      <text x="415" y="156" textAnchor="middle" fontSize="11" fill="#475569">数据：人工标注对话</text>
      <text x="415" y="176" textAnchor="middle" fontSize="11" fill="#475569">目标：学会跟随指令</text>
      <text x="415" y="196" textAnchor="middle" fontSize="11" fill="#475569">规模：数万条样本</text>
      <text x="415" y="216" textAnchor="middle" fontSize="11" fill="#475569">结果：能回答问题</text>
      <text x="415" y="240" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">学会"听指令回答"</text>

      <path d="M530 170 L550 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-tp-arrow)" />

      {/* 阶段3：RLHF */}
      <rect x="560" y="80" width="200" height="180" rx="10" fill="url(#tcg-tp-stage3)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <rect x="560" y="80" width="200" height="36" rx="10" fill="url(#tcg-tp-stage3)" opacity="0.9" />
      <text x="660" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段3：RLHF</text>
      <text x="660" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">人类反馈强化学习</text>
      <text x="660" y="156" textAnchor="middle" fontSize="11" fill="#475569">数据：人类偏好排序</text>
      <text x="660" y="176" textAnchor="middle" fontSize="11" fill="#475569">目标：对齐人类价值观</text>
      <text x="660" y="196" textAnchor="middle" fontSize="11" fill="#475569">方法：奖励模型+PPO</text>
      <text x="660" y="216" textAnchor="middle" fontSize="11" fill="#475569">结果：安全有用回答</text>
      <text x="660" y="240" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">学会"回答得好"</text>

      {/* RLHF详解 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">RLHF 三步详解</text>

      <rect x="40" y="306" width="230" height="100" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="155" y="330" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">步骤1：训练奖励模型</text>
      <text x="155" y="352" textAnchor="middle" fontSize="11" fill="#475569">人工对多个回答排序</text>
      <text x="155" y="372" textAnchor="middle" fontSize="11" fill="#475569">训练模型预测偏好分数</text>
      <text x="155" y="394" textAnchor="middle" fontSize="10" fill="#64748b">奖励模型 = 人类偏好代理</text>

      <path d="M270 356 L290 356" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-tp-arrow)" />

      <rect x="300" y="306" width="230" height="100" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="415" y="330" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">步骤2：生成回答</text>
      <text x="415" y="352" textAnchor="middle" fontSize="11" fill="#475569">模型对指令生成回答</text>
      <text x="415" y="372" textAnchor="middle" fontSize="11" fill="#475569">奖励模型打分</text>
      <text x="415" y="394" textAnchor="middle" fontSize="10" fill="#64748b">分数高 = 更符合人类偏好</text>

      <path d="M530 356 L550 356" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-tp-arrow)" />

      <rect x="560" y="306" width="200" height="100" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="330" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">步骤3：PPO优化</text>
      <text x="660" y="352" textAnchor="middle" fontSize="11" fill="#475569">用强化学习算法</text>
      <text x="660" y="372" textAnchor="middle" fontSize="11" fill="#475569">最大化奖励分数</text>
      <text x="660" y="394" textAnchor="middle" fontSize="10" fill="#64748b">迭代优化回答质量</text>

      {/* 训练目标对比 */}
      <text x="400" y="436" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三阶段训练目标对比</text>

      <rect x="40" y="452" width="230" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="474" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">预训练：学语言</text>
      <text x="155" y="494" textAnchor="middle" fontSize="10" fill="#475569">"文本接下来是什么"</text>

      <rect x="285" y="452" width="230" height="56" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="474" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">微调：学指令</text>
      <text x="400" y="494" textAnchor="middle" fontSize="10" fill="#475569">"人类问什么，我答什么"</text>

      <rect x="530" y="452" width="230" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="645" y="474" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">RLHF：学偏好</text>
      <text x="645" y="494" textAnchor="middle" fontSize="10" fill="#475569">"什么样的回答更好"</text>

      {/* 底部总结 */}
      <rect x="40" y="524" width="720" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="546" textAnchor="middle" fontSize="11" fill="#475569">预训练（学语言） → 监督微调（学指令） → RLHF（学偏好） = ChatGPT</text>
    </svg>
  );
}
