"use client";

export function MsgLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="终身成长知识全景图与十章学习路径">
      <defs>
        <linearGradient id="msg-lm-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="msg-lm-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="msg-lm-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="msg-lm-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="msg-lm-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="msg-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">终身成长 · 知识全景图</text>

      {/* 左侧：五大学习阶段 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="78" width="240" height="50" rx="10" fill="url(#msg-lm-1)" opacity="0.95" />
      <text x="160" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础认知</text>
      <text x="160" y="118" textAnchor="middle" fontSize="11" fill="#e0f2fe">全景图 / 两种思维模式</text>

      <path d="M160 128 L160 132" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="40" y="136" width="240" height="50" rx="10" fill="url(#msg-lm-2)" opacity="0.95" />
      <text x="160" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">思维剖析</text>
      <text x="160" y="176" textAnchor="middle" fontSize="11" fill="#fee2e2">固定型 / 成长型思维</text>

      <path d="M160 186 L160 190" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="40" y="194" width="240" height="50" rx="10" fill="url(#msg-lm-3)" opacity="0.95" />
      <text x="160" y="216" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">行动与成长</text>
      <text x="160" y="234" textAnchor="middle" fontSize="11" fill="#dcfce7">思维模式在行动</text>

      <path d="M160 244 L160 248" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="40" y="252" width="240" height="50" rx="10" fill="url(#msg-lm-4)" opacity="0.95" />
      <text x="160" y="274" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">领域应用</text>
      <text x="160" y="292" textAnchor="middle" fontSize="11" fill="#fef9c3">体育 / 商业 / 人际关系</text>

      <path d="M160 302 L160 306" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="40" y="310" width="240" height="50" rx="10" fill="url(#msg-lm-5)" opacity="0.95" />
      <text x="160" y="332" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">传递与整合</text>
      <text x="160" y="350" textAnchor="middle" fontSize="11" fill="#f3e8ff">父母与教师 / 全书复习</text>

      <text x="160" y="382" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0ea5e9">从两种思维模式到终身成长</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="78" width="460" height="30" rx="8" fill="url(#msg-lm-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="98" fontSize="12" fontWeight="600" fill="#0369a1">ch0</text>
      <text x="372" y="98" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 108 L550 112" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="320" y="114" width="460" height="30" rx="8" fill="url(#msg-lm-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="338" y="134" fontSize="12" fontWeight="600" fill="#0369a1">ch1</text>
      <text x="372" y="134" fontSize="11" fill="#475569">两种思维模式——核心分野</text>

      <path d="M550 144 L550 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="320" y="150" width="460" height="30" rx="8" fill="url(#msg-lm-2)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="170" fontSize="12" fontWeight="600" fill="#b91c1c">ch2</text>
      <text x="372" y="170" fontSize="11" fill="#475569">固定型思维——能力天定</text>

      <path d="M550 180 L550 184" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="320" y="186" width="460" height="30" rx="8" fill="url(#msg-lm-3)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="338" y="206" fontSize="12" fontWeight="600" fill="#15803d">ch3</text>
      <text x="372" y="206" fontSize="11" fill="#475569">成长型思维——能力可塑</text>

      <path d="M550 216 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="320" y="222" width="460" height="30" rx="8" fill="url(#msg-lm-3)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="338" y="242" fontSize="12" fontWeight="600" fill="#15803d">ch4</text>
      <text x="372" y="242" fontSize="11" fill="#475569">思维模式在行动——成功与失败</text>

      <path d="M550 252 L550 256" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="320" y="258" width="460" height="30" rx="8" fill="url(#msg-lm-4)" opacity="0.12" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="338" y="278" fontSize="12" fontWeight="600" fill="#a16207">ch5</text>
      <text x="372" y="278" fontSize="11" fill="#475569">体育与冠军——成长型冠军</text>

      <path d="M550 288 L550 292" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="320" y="294" width="460" height="30" rx="8" fill="url(#msg-lm-4)" opacity="0.12" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="338" y="314" fontSize="12" fontWeight="600" fill="#a16207">ch6</text>
      <text x="372" y="314" fontSize="11" fill="#475569">商业与领导力——组织思维</text>

      <path d="M550 324 L550 328" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="320" y="330" width="460" height="30" rx="8" fill="url(#msg-lm-4)" opacity="0.12" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="338" y="350" fontSize="12" fontWeight="600" fill="#a16207">ch7</text>
      <text x="372" y="350" fontSize="11" fill="#475569">人际关系——心与心的连接</text>

      <path d="M550 360 L550 364" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="320" y="366" width="460" height="30" rx="8" fill="url(#msg-lm-5)" opacity="0.12" stroke="#9333ea" strokeWidth="1.5" />
      <text x="338" y="386" fontSize="12" fontWeight="600" fill="#7e22ce">ch8</text>
      <text x="372" y="386" fontSize="11" fill="#475569">父母与教师——培育成长</text>

      <path d="M550 396 L550 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-lm-arrow)" />

      <rect x="320" y="402" width="460" height="30" rx="8" fill="url(#msg-lm-5)" opacity="0.12" stroke="#9333ea" strokeWidth="1.5" />
      <text x="338" y="422" fontSize="12" fontWeight="600" fill="#7e22ce">ch9</text>
      <text x="372" y="422" fontSize="11" fill="#475569">全书复习与知识整合——闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="450" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="470" textAnchor="middle" fontSize="10" fill="#475569">全景 → 两种思维 → 固定型 → 成长型 → 行动 → 体育 → 商业 → 人际 → 父母教师 → 复习</text>

      {/* 底部核心脉络 */}
      <rect x="40" y="492" width="740" height="28" rx="8" fill="url(#msg-lm-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="410" y="510" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：信念决定思维 → 思维驱动行为 → 行为塑造成就 → 成长型思维实现终身成长</text>

      {/* 底部两种思维对比 */}
      <rect x="40" y="528" width="360" height="32" rx="8" fill="url(#msg-lm-2)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="220" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">固定型：能力天定 → 证明自己 → 害怕失败</text>

      <rect x="420" y="528" width="360" height="32" rx="8" fill="url(#msg-lm-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">成长型：能力可塑 → 提升自己 → 拥抱挑战</text>
    </svg>
  );
}
