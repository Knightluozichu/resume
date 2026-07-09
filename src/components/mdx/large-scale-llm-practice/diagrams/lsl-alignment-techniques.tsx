"use client";

export function LslAlignmentTechniquesDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="对齐技术实践 SFT RLHF DPO 三阶段对齐流程">
      <defs>
        <linearGradient id="lsl-at-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lsl-at-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lsl-at-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lsl-at-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lsl-at-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">对齐技术实践</text>

      {/* 三阶段对齐流程 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三阶段对齐流程</text>

      <rect x="20" y="74" width="240" height="80" rx="8" fill="url(#lsl-at-blue)" opacity="0.9" />
      <text x="140" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段一：SFT</text>
      <text x="140" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">监督微调</text>
      <text x="140" y="134" textAnchor="middle" fontSize="9" fill="#bfdbfe">指令-回答对训练</text>
      <text x="140" y="148" textAnchor="middle" fontSize="9" fill="#bfdbfe">学会指令遵循</text>

      <path d="M260 114 L278 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-at-arrow)" />

      <rect x="283" y="74" width="240" height="80" rx="8" fill="url(#lsl-at-purple)" opacity="0.9" />
      <text x="403" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段二：RLHF</text>
      <text x="403" y="118" textAnchor="middle" fontSize="10" fill="#ede9fe">人类反馈强化学习</text>
      <text x="403" y="134" textAnchor="middle" fontSize="9" fill="#ede9fe">奖励模型 + PPO</text>
      <text x="403" y="148" textAnchor="middle" fontSize="9" fill="#ede9fe">优化人类偏好</text>

      <path d="M523 114 L541 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-at-arrow)" />

      <rect x="546" y="74" width="234" height="80" rx="8" fill="url(#lsl-at-amber)" opacity="0.9" />
      <text x="663" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段三：DPO</text>
      <text x="663" y="118" textAnchor="middle" fontSize="10" fill="#fef3c7">直接偏好优化</text>
      <text x="663" y="134" textAnchor="middle" fontSize="9" fill="#fef3c7">无需奖励模型</text>
      <text x="663" y="148" textAnchor="middle" fontSize="9" fill="#fef3c7">简化对齐流程</text>

      {/* RLHF 详细流程 */}
      <text x="400" y="182" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">RLHF 详细流程</text>

      <rect x="20" y="196" width="130" height="56" rx="8" fill="url(#lsl-at-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="85" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">SFT 模型</text>
      <text x="85" y="238" textAnchor="middle" fontSize="9" fill="#475569">初始策略</text>

      <path d="M150 224 L168 224" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-at-arrow)" />

      <rect x="173" y="196" width="130" height="56" rx="8" fill="url(#lsl-at-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="238" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">偏好数据</text>
      <text x="238" y="238" textAnchor="middle" fontSize="9" fill="#475569">人工标注排序</text>

      <path d="M303 224 L321 224" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-at-arrow)" />

      <rect x="326" y="196" width="130" height="56" rx="8" fill="url(#lsl-at-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="391" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">奖励模型</text>
      <text x="391" y="238" textAnchor="middle" fontSize="9" fill="#475569">RM 训练</text>

      <path d="M456 224 L474 224" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-at-arrow)" />

      <rect x="479" y="196" width="130" height="56" rx="8" fill="url(#lsl-at-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="544" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">PPO 优化</text>
      <text x="544" y="238" textAnchor="middle" fontSize="9" fill="#475569">策略梯度更新</text>

      <path d="M609 224 L627 224" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-at-arrow)" />

      <rect x="632" y="196" width="148" height="56" rx="8" fill="url(#lsl-at-blue)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="706" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">对齐模型</text>
      <text x="706" y="238" textAnchor="middle" fontSize="9" fill="#475569">RLHF 输出</text>

      {/* 对齐技术对比 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">对齐方法对比</text>

      <rect x="20" y="294" width="250" height="120" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="316" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">SFT 监督微调</text>
      <text x="145" y="336" textAnchor="middle" fontSize="9" fill="#475569">数据：指令-回答对（1万-10万）</text>
      <text x="145" y="352" textAnchor="middle" fontSize="9" fill="#475569">方法：最大似然损失微调</text>
      <text x="145" y="368" textAnchor="middle" fontSize="9" fill="#475569">优点：简单稳定 / 快速起步</text>
      <text x="145" y="384" textAnchor="middle" fontSize="9" fill="#475569">缺点：上限受数据质量限制</text>
      <text x="145" y="402" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">定位：对齐必经第一步</text>

      <rect x="275" y="294" width="250" height="120" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="316" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">RLHF 强化学习</text>
      <text x="400" y="336" textAnchor="middle" fontSize="9" fill="#475569">数据：偏好排序对（5万-20万）</text>
      <text x="400" y="352" textAnchor="middle" fontSize="9" fill="#475569">方法：RM + PPO 策略优化</text>
      <text x="400" y="368" textAnchor="middle" fontSize="9" fill="#475569">优点：效果上限高 / ChatGPT 关键</text>
      <text x="400" y="384" textAnchor="middle" fontSize="9" fill="#475569">缺点：训练复杂 / 4 个模型同训</text>
      <text x="400" y="402" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">挑战：不稳定 / 成本高</text>

      <rect x="530" y="294" width="250" height="120" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="316" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">DPO 直接偏好</text>
      <text x="655" y="336" textAnchor="middle" fontSize="9" fill="#475569">数据：偏好对（同 RLHF）</text>
      <text x="655" y="352" textAnchor="middle" fontSize="9" fill="#475569">方法：直接用偏好对微调</text>
      <text x="655" y="368" textAnchor="middle" fontSize="9" fill="#475569">优点：无需 RM / 简单稳定</text>
      <text x="655" y="384" textAnchor="middle" fontSize="9" fill="#475569">缺点：效果略逊 RLHF</text>
      <text x="655" y="402" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">定位：RLHF 简化替代</text>

      {/* 3H 对齐目标 */}
      <text x="400" y="440" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">3H 对齐目标</text>

      <rect x="30" y="454" width="240" height="56" rx="8" fill="url(#lsl-at-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="476" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">Helpful 有用</text>
      <text x="150" y="496" textAnchor="middle" fontSize="9" fill="#475569">准确回答 / 完成任务</text>

      <rect x="280" y="454" width="240" height="56" rx="8" fill="url(#lsl-at-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="476" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">Honest 诚实</text>
      <text x="400" y="496" textAnchor="middle" fontSize="9" fill="#475569">不编造 / 知之为知之</text>

      <rect x="530" y="454" width="240" height="56" rx="8" fill="url(#lsl-at-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="650" y="476" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">Harmless 无害</text>
      <text x="650" y="496" textAnchor="middle" fontSize="9" fill="#475569">拒绝有害 / 安全护栏</text>

      {/* 底部总结 */}
      <rect x="30" y="524" width="740" height="32" rx="8" fill="url(#lsl-at-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="544" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：预训练基座 → SFT 学指令 → RLHF/DPO 优偏好 → 安全护栏 → 对齐模型</text>

      <rect x="30" y="560" width="740" height="16" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="572" textAnchor="middle" fontSize="9" fill="#64748b">关键挑战：奖励黑客 / 过度对齐 / 分布漂移 / 标注质量</text>
    </svg>
  );
}
