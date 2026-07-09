"use client";

export function LaePromptEngineeringDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="提示工程实战结构化提示设计与技术">
      <defs>
        <linearGradient id="lae-pe-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lae-pe-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lae-pe-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lae-pe-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lae-pe-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">提示工程实战：结构化提示设计</text>

      {/* 上半：提示词五要素 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">结构化提示五要素</text>

      <rect x="20" y="76" width="145" height="80" rx="8" fill="url(#lae-pe-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="92" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">指令</text>
      <text x="92" y="116" textAnchor="middle" fontSize="10" fill="#475569">明确任务要求</text>
      <text x="92" y="132" textAnchor="middle" fontSize="10" fill="#475569">"翻译以下文本</text>
      <text x="92" y="146" textAnchor="middle" fontSize="10" fill="#475569">为英文"</text>

      <rect x="175" y="76" width="145" height="80" rx="8" fill="url(#lae-pe-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="247" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">上下文</text>
      <text x="247" y="116" textAnchor="middle" fontSize="10" fill="#475569">背景信息</text>
      <text x="247" y="132" textAnchor="middle" fontSize="10" fill="#475569">领域知识</text>
      <text x="247" y="146" textAnchor="middle" fontSize="10" fill="#475569">约束条件</text>

      <rect x="330" y="76" width="145" height="80" rx="8" fill="url(#lae-pe-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="402" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">示例</text>
      <text x="402" y="116" textAnchor="middle" fontSize="10" fill="#475569">输入-输出对</text>
      <text x="402" y="132" textAnchor="middle" fontSize="10" fill="#475569">展示期望格式</text>
      <text x="402" y="146" textAnchor="middle" fontSize="10" fill="#475569">Few-shot引导</text>

      <rect x="485" y="76" width="145" height="80" rx="8" fill="url(#lae-pe-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="557" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">输入</text>
      <text x="557" y="116" textAnchor="middle" fontSize="10" fill="#475569">待处理数据</text>
      <text x="557" y="132" textAnchor="middle" fontSize="10" fill="#475569">用户问题</text>
      <text x="557" y="146" textAnchor="middle" fontSize="10" fill="#475569">原始文本</text>

      <rect x="640" y="76" width="140" height="80" rx="8" fill="url(#lae-pe-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="710" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">输出格式</text>
      <text x="710" y="116" textAnchor="middle" fontSize="10" fill="#475569">JSON/Markdown</text>
      <text x="710" y="132" textAnchor="middle" fontSize="10" fill="#475569">结构化约束</text>
      <text x="710" y="146" textAnchor="middle" fontSize="10" fill="#475569">便于解析</text>

      {/* 中部：四大提示技术 */}
      <text x="400" y="188" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心提示技术</text>

      <rect x="30" y="200" width="175" height="110" rx="8" fill="url(#lae-pe-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="117" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">零样本 Zero-shot</text>
      <text x="117" y="244" textAnchor="middle" fontSize="10" fill="#475569">仅给指令不给示例</text>
      <text x="117" y="260" textAnchor="middle" fontSize="10" fill="#475569">依赖模型已有能力</text>
      <text x="117" y="276" textAnchor="middle" fontSize="10" fill="#475569">适合简单任务</text>
      <text x="117" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">快速 / 低成本</text>

      <rect x="215" y="200" width="175" height="110" rx="8" fill="url(#lae-pe-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="302" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">少样本 Few-shot</text>
      <text x="302" y="244" textAnchor="middle" fontSize="10" fill="#475569">提供几个示例</text>
      <text x="302" y="260" textAnchor="middle" fontSize="10" fill="#475569">示例即"微调"</text>
      <text x="302" y="276" textAnchor="middle" fontSize="10" fill="#475569">格式/风格引导</text>
      <text x="302" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">稳定 / 可控</text>

      <rect x="400" y="200" width="175" height="110" rx="8" fill="url(#lae-pe-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">思维链 CoT</text>
      <text x="487" y="244" textAnchor="middle" fontSize="10" fill="#475569">"一步步思考"</text>
      <text x="487" y="260" textAnchor="middle" fontSize="10" fill="#475569">展示推理过程</text>
      <text x="487" y="276" textAnchor="middle" fontSize="10" fill="#475569">提升复杂推理</text>
      <text x="487" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">深度 / 准确</text>

      <rect x="585" y="200" width="175" height="110" rx="8" fill="url(#lae-pe-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="672" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">角色扮演</text>
      <text x="672" y="244" textAnchor="middle" fontSize="10" fill="#475569">"你是资深专家"</text>
      <text x="672" y="260" textAnchor="middle" fontSize="10" fill="#475569">设定人设/视角</text>
      <text x="672" y="276" textAnchor="middle" fontSize="10" fill="#475569">激发领域知识</text>
      <text x="672" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">专业 / 深入</text>

      {/* 下半：进阶技巧 */}
      <text x="400" y="338" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">进阶技巧</text>

      <rect x="30" y="352" width="350" height="66" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="205" y="374" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">自一致性 Self-Consistency</text>
      <text x="205" y="394" textAnchor="middle" fontSize="10" fill="#475569">多次采样取多数投票</text>
      <text x="205" y="408" textAnchor="middle" fontSize="10" fill="#475569">降低随机性，提升答案可靠性</text>

      <rect x="420" y="352" width="350" height="66" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="595" y="374" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">ReAct 推理+行动</text>
      <text x="595" y="394" textAnchor="middle" fontSize="10" fill="#475569">思考 → 行动 → 观察 循环</text>
      <text x="595" y="408" textAnchor="middle" fontSize="10" fill="#475569">结合工具调用增强推理</text>

      {/* 调参要素 */}
      <rect x="30" y="432" width="740" height="56" rx="8" fill="url(#lae-pe-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="454" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">生成参数控制</text>
      <text x="400" y="474" textAnchor="middle" fontSize="11" fill="#475569">温度(创造性) / top_p(核采样) / max_tokens(长度) / frequency_penalty(去重)</text>

      {/* 底部总结 */}
      <rect x="30" y="504" width="740" height="56" rx="8" fill="url(#lae-pe-green)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="400" y="526" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">提示工程核心原则</text>
      <text x="400" y="546" textAnchor="middle" fontSize="11" fill="#475569">明确具体 → 结构化 → 给示例 → 分步推理 → 迭代测试 → 控制输出格式</text>
    </svg>
  );
}
