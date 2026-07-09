"use client";

export function LlmPosttrainingDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="后训练与对齐技术 SFT RLHF DPO三阶段对齐流程">
      <defs>
        <linearGradient id="llm-pt-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="llm-pt-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="llm-pt-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="llm-pt-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="llm-pt-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="llm-pt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">后训练与对齐技术</text>

      {/* 三阶段对齐流程 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三阶段对齐流程</text>

      {/* 基座模型 */}
      <rect x="30" y="76" width="120" height="50" rx="8" fill="url(#llm-pt-blue)" opacity="0.9" />
      <text x="90" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">预训练基座</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">通用语言能力</text>

      <path d="M150 101 L168 101" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-pt-arrow)" />

      {/* SFT */}
      <rect x="172" y="76" width="120" height="50" rx="8" fill="url(#llm-pt-purple)" opacity="0.9" />
      <text x="232" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">SFT 监督微调</text>
      <text x="232" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">指令-回答对</text>

      <path d="M292 101 L310 101" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-pt-arrow)" />

      {/* RM */}
      <rect x="314" y="76" width="120" height="50" rx="8" fill="url(#llm-pt-amber)" opacity="0.9" />
      <text x="374" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">RM 奖励模型</text>
      <text x="374" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">学习人类偏好</text>

      <path d="M434 101 L452 101" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-pt-arrow)" />

      {/* RLHF/PPO */}
      <rect x="456" y="76" width="120" height="50" rx="8" fill="url(#llm-pt-green)" opacity="0.9" />
      <text x="516" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">RLHF 强化学习</text>
      <text x="516" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">PPO 优化策略</text>

      <path d="M576 101 L594 101" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-pt-arrow)" />

      {/* 对齐模型 */}
      <rect x="598" y="76" width="172" height="50" rx="8" fill="url(#llm-pt-red)" opacity="0.9" />
      <text x="684" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">对齐后模型</text>
      <text x="684" y="116" textAnchor="middle" fontSize="9" fill="#fecaca">有用/诚实/安全</text>

      {/* 三大对齐方法详解 */}
      <text x="400" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三大对齐方法</text>

      {/* SFT 详解 */}
      <rect x="30" y="172" width="230" height="160" rx="10" fill="url(#llm-pt-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="145" y="194" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">SFT 监督微调</text>
      <text x="145" y="216" textAnchor="middle" fontSize="11" fill="#475569">数据：指令-回答对</text>
      <text x="145" y="234" textAnchor="middle" fontSize="11" fill="#475569">方式：监督学习</text>
      <text x="145" y="252" textAnchor="middle" fontSize="11" fill="#475569">目标：学会指令遵循</text>
      <text x="145" y="270" textAnchor="middle" fontSize="11" fill="#475569">成本：中等（万级数据）</text>
      <text x="145" y="288" textAnchor="middle" fontSize="11" fill="#475569">效果：格式规范</text>
      <text x="145" y="310" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">教模型「怎么回答」</text>

      {/* RLHF 详解 */}
      <rect x="285" y="172" width="230" height="160" rx="10" fill="url(#llm-pt-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="194" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">RLHF 人类反馈强化学习</text>
      <text x="400" y="216" textAnchor="middle" fontSize="11" fill="#475569">数据：人类偏好排序</text>
      <text x="400" y="234" textAnchor="middle" fontSize="11" fill="#475569">方式：RM + PPO</text>
      <text x="400" y="252" textAnchor="middle" fontSize="11" fill="#475569">目标：优化人类偏好</text>
      <text x="400" y="270" textAnchor="middle" fontSize="11" fill="#475569">成本：高（标注+训练）</text>
      <text x="400" y="288" textAnchor="middle" fontSize="11" fill="#475569">效果：质量显著提升</text>
      <text x="400" y="310" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">教模型「什么更好」</text>

      {/* DPO 详解 */}
      <rect x="540" y="172" width="230" height="160" rx="10" fill="url(#llm-pt-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="655" y="194" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">DPO 直接偏好优化</text>
      <text x="655" y="216" textAnchor="middle" fontSize="11" fill="#475569">数据：偏好对（好/差）</text>
      <text x="655" y="234" textAnchor="middle" fontSize="11" fill="#475569">方式：直接策略优化</text>
      <text x="655" y="252" textAnchor="middle" fontSize="11" fill="#475569">目标：简化 RLHF 流程</text>
      <text x="655" y="270" textAnchor="middle" fontSize="11" fill="#475569">成本：低（无需RM）</text>
      <text x="655" y="288" textAnchor="middle" fontSize="11" fill="#475569">效果：接近RLHF</text>
      <text x="655" y="310" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">跳过RM直接优化</text>

      {/* 3H 对齐目标 */}
      <text x="400" y="358" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">3H 对齐目标</text>

      <rect x="60" y="372" width="200" height="56" rx="8" fill="url(#llm-pt-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="392" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">Helpful 有用</text>
      <text x="160" y="412" textAnchor="middle" fontSize="10" fill="#475569">准确回答用户问题</text>

      <rect x="300" y="372" width="200" height="56" rx="8" fill="url(#llm-pt-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="392" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Honest 诚实</text>
      <text x="400" y="412" textAnchor="middle" fontSize="10" fill="#475569">不编造不 hallucination</text>

      <rect x="540" y="372" width="200" height="56" rx="8" fill="url(#llm-pt-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="640" y="392" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">Harmless 安全</text>
      <text x="640" y="412" textAnchor="middle" fontSize="10" fill="#475569">不输出有害内容</text>

      {/* 安全与护栏 */}
      <text x="400" y="456" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">安全护栏机制</text>

      <rect x="40" y="470" width="160" height="44" rx="8" fill="url(#llm-pt-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="120" y="488" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">红队测试</text>
      <text x="120" y="504" textAnchor="middle" fontSize="9" fill="#475569">主动发现漏洞</text>

      <rect x="220" y="470" width="160" height="44" rx="8" fill="url(#llm-pt-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="300" y="488" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">宪法AI</text>
      <text x="300" y="504" textAnchor="middle" fontSize="9" fill="#475569">规则约束行为</text>

      <rect x="400" y="470" width="160" height="44" rx="8" fill="url(#llm-pt-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="480" y="488" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">内容过滤</text>
      <text x="480" y="504" textAnchor="middle" fontSize="9" fill="#475569">输入输出双层</text>

      <rect x="580" y="470" width="180" height="44" rx="8" fill="url(#llm-pt-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="670" y="488" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">拒绝训练</text>
      <text x="670" y="504" textAnchor="middle" fontSize="9" fill="#475569">学会拒绝有害请求</text>

      {/* 底部总结 */}
      <rect x="40" y="530" width="720" height="36" rx="8" fill="url(#llm-pt-red)" opacity="0.08" stroke="#dc2626" strokeWidth="2" />
      <text x="400" y="552" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">核心：预训练给能力，后训练给规矩——对齐让模型从「能说话」变成「说对话」</text>

      <rect x="40" y="574" width="720" height="18" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="588" textAnchor="middle" fontSize="10" fill="#475569">SFT 教格式 → RM 学偏好 → RLHF/DPO 优化策略 → 安全护栏兜底</text>
    </svg>
  );
}
