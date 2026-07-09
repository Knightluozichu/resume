"use client";

export function CgptAlignmentRlhfDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="对齐与RLHF三阶段 SFT奖励模型PPO">
      <defs>
        <linearGradient id="cpp-ar-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cpp-ar-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="cpp-ar-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cpp-ar-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="cpp-ar-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="cpp-ar-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">对齐与 RLHF · 三阶段让模型听话又安全</text>

      {/* 基座模型 */}
      <rect x="60" y="52" width="680" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="77" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">起点：预训练基座模型（会续写但不会对话，可能产出有害内容）</text>

      <path d="M400 92 L400 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ar-arrow)" />

      {/* 阶段一 SFT */}
      <rect x="40" y="104" width="210" height="150" rx="10" fill="url(#cpp-ar-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="2" />
      <text x="145" y="128" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">阶段一 SFT</text>
      <text x="145" y="146" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">监督微调</text>
      <text x="145" y="168" textAnchor="middle" fontSize="10" fill="#475569">人工编写高质量</text>
      <text x="145" y="183" textAnchor="middle" fontSize="10" fill="#475569">指令-回答对</text>
      <text x="145" y="206" textAnchor="middle" fontSize="10" fill="#475569">监督学习微调</text>
      <text x="145" y="221" textAnchor="middle" fontSize="10" fill="#475569">学会对话格式</text>
      <text x="145" y="244" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">产出 SFT 模型</text>

      <path d="M250 179 L276 179" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ar-arrow)" />

      {/* 阶段二 RM */}
      <rect x="280" y="104" width="210" height="150" rx="10" fill="url(#cpp-ar-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="2" />
      <text x="385" y="128" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">阶段二 RM</text>
      <text x="385" y="146" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">训练奖励模型</text>
      <text x="385" y="168" textAnchor="middle" fontSize="10" fill="#475569">SFT 模型对同一</text>
      <text x="385" y="183" textAnchor="middle" fontSize="10" fill="#475569">问题生成多回答</text>
      <text x="385" y="206" textAnchor="middle" fontSize="10" fill="#475569">人工排序打分</text>
      <text x="385" y="221" textAnchor="middle" fontSize="10" fill="#475569">训练打分模型</text>
      <text x="385" y="244" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">产出奖励模型 RM</text>

      <path d="M490 179 L516 179" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ar-arrow)" />

      {/* 阶段三 PPO */}
      <rect x="520" y="104" width="240" height="150" rx="10" fill="url(#cpp-ar-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="2" />
      <text x="640" y="128" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">阶段三 RLHF</text>
      <text x="640" y="146" textAnchor="middle" fontSize="11" fontWeight="600" fill="#f59e0b">PPO 强化学习</text>
      <text x="640" y="168" textAnchor="middle" fontSize="10" fill="#475569">RM 给回答打分</text>
      <text x="640" y="183" textAnchor="middle" fontSize="10" fill="#475569">PPO 优化策略</text>
      <text x="640" y="206" textAnchor="middle" fontSize="10" fill="#475569">KL 散度约束</text>
      <text x="640" y="221" textAnchor="middle" fontSize="10" fill="#475569">防止偏离 SFT</text>
      <text x="640" y="244" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">产出对齐模型</text>

      <path d="M400 254 L400 262" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ar-arrow)" />

      {/* 人类反馈回路 */}
      <rect x="60" y="266" width="680" height="60" rx="10" fill="url(#cpp-ar-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="290" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">人类反馈回路 Human Feedback</text>
      <text x="400" y="312" textAnchor="middle" fontSize="11" fill="#475569">人工标注贯穿三阶段：编写示范 → 排序回答 → 迭代优化，把人类偏好注入模型</text>

      <path d="M400 326 L400 334" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ar-arrow)" />

      {/* 对齐目标 */}
      <text x="400" y="362" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三大对齐目标 3H</text>

      <rect x="60" y="376" width="210" height="90" rx="10" fill="url(#cpp-ar-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="165" y="400" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">Helpful 有用</text>
      <text x="165" y="422" textAnchor="middle" fontSize="10" fill="#475569">准确完成用户意图</text>
      <text x="165" y="440" textAnchor="middle" fontSize="10" fill="#475569">给出高质量回答</text>
      <text x="165" y="458" textAnchor="middle" fontSize="10" fill="#475569">拒绝无效请求</text>

      <rect x="295" y="376" width="210" height="90" rx="10" fill="url(#cpp-ar-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="400" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">Honest 诚实</text>
      <text x="400" y="422" textAnchor="middle" fontSize="10" fill="#475569">不编造事实</text>
      <text x="400" y="440" textAnchor="middle" fontSize="10" fill="#475569">承认不确定</text>
      <text x="400" y="458" textAnchor="middle" fontSize="10" fill="#475569">减少幻觉</text>

      <rect x="530" y="376" width="210" height="90" rx="10" fill="url(#cpp-ar-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="635" y="400" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">Harmless 无害</text>
      <text x="635" y="422" textAnchor="middle" fontSize="10" fill="#475569">拒绝有害请求</text>
      <text x="635" y="440" textAnchor="middle" fontSize="10" fill="#475569">不输出违法内容</text>
      <text x="635" y="458" textAnchor="middle" fontSize="10" fill="#475569">不产生偏见歧视</text>

      {/* 底部 */}
      <rect x="60" y="488" width="680" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="510" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">演进：RLHF → DPO（直接偏好优化，省去 RM 与 PPO，更简单稳定）</text>
      <text x="400" y="530" textAnchor="middle" fontSize="11" fill="#475569">对齐让模型从「会说话」变成「会做事、守规矩」——这是 ChatGPT 成功的关键</text>
    </svg>
  );
}
