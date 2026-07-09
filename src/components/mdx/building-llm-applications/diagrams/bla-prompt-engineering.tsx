"use client";

export function BlaPromptEngineeringDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="提示工程实践：提示结构与策略矩阵">
      <defs>
        <linearGradient id="bla-pe-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bla-pe-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bla-pe-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="bla-pe-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">提示工程实践</text>

      {/* 上半部分：提示结构四要素 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">提示结构四要素</text>

      <rect x="40" y="76" width="170" height="80" rx="10" fill="url(#bla-pe-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="125" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">指令</text>
      <text x="125" y="118" textAnchor="middle" fontSize="10" fill="#475569">告诉模型做什么</text>
      <text x="125" y="134" textAnchor="middle" fontSize="9" fill="#64748b">翻译 / 总结 / 分析</text>
      <text x="125" y="148" textAnchor="middle" fontSize="9" fill="#64748b">角色设定</text>

      <rect x="230" y="76" width="170" height="80" rx="10" fill="url(#bla-pe-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="315" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">上下文</text>
      <text x="315" y="118" textAnchor="middle" fontSize="10" fill="#475569">提供背景信息</text>
      <text x="315" y="134" textAnchor="middle" fontSize="9" fill="#64748b">检索文档 / 历史对话</text>
      <text x="315" y="148" textAnchor="middle" fontSize="9" fill="#64748b">领域知识</text>

      <rect x="420" y="76" width="170" height="80" rx="10" fill="url(#bla-pe-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="505" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">示例</text>
      <text x="505" y="118" textAnchor="middle" fontSize="10" fill="#475569">展示期望输出</text>
      <text x="505" y="134" textAnchor="middle" fontSize="9" fill="#64748b">Few-shot 样本</text>
      <text x="505" y="148" textAnchor="middle" fontSize="9" fill="#64748b">输入输出对</text>

      <rect x="610" y="76" width="150" height="80" rx="10" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <text x="685" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">输出格式</text>
      <text x="685" y="118" textAnchor="middle" fontSize="10" fill="#475569">指定返回结构</text>
      <text x="685" y="134" textAnchor="middle" fontSize="9" fill="#64748b">JSON / 列表 / 表格</text>
      <text x="685" y="148" textAnchor="middle" fontSize="9" fill="#64748b">格式约束</text>

      <path d="M400 162 L400 168" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-pe-arrow)" />

      {/* 下半部分：提示策略矩阵 */}
      <text x="400" y="192" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">提示策略矩阵（由易到难）</text>

      {/* 策略1: Zero-shot */}
      <rect x="40" y="206" width="340" height="70" rx="10" fill="url(#bla-pe-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="228" fontSize="12" fontWeight="700" fill="#1e40af">Zero-shot</text>
      <text x="60" y="246" fontSize="10" fill="#475569">直接给指令，不给示例</text>
      <text x="60" y="262" fontSize="9" fill="#64748b">适用：简单任务、能力强的模型</text>

      {/* 策略2: Few-shot */}
      <rect x="420" y="206" width="340" height="70" rx="10" fill="url(#bla-pe-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="440" y="228" fontSize="12" fontWeight="700" fill="#5b21b6">Few-shot</text>
      <text x="440" y="246" fontSize="10" fill="#475569">给少量示例引导输出风格</text>
      <text x="440" y="262" fontSize="9" fill="#64748b">适用：格式控制、风格模仿</text>

      <path d="M210 280 L210 286" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-pe-arrow)" />
      <path d="M590 280 L590 286" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-pe-arrow)" />

      {/* 策略3: CoT */}
      <rect x="40" y="290" width="340" height="70" rx="10" fill="url(#bla-pe-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="312" fontSize="12" fontWeight="700" fill="#92400e">Chain-of-Thought (CoT)</text>
      <text x="60" y="330" fontSize="10" fill="#475569">引导模型逐步推理</text>
      <text x="60" y="346" fontSize="9" fill="#64748b">适用：数学推理、逻辑分析、多步任务</text>

      {/* 策略4: Self-consistency */}
      <rect x="420" y="290" width="340" height="70" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="440" y="312" fontSize="12" fontWeight="700" fill="#991b1b">Self-Consistency</text>
      <text x="440" y="330" fontSize="10" fill="#475569">多次采样取多数票</text>
      <text x="440" y="346" fontSize="9" fill="#64748b">适用：高准确率推理、降低随机性</text>

      <path d="M210 364 L210 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-pe-arrow)" />
      <path d="M590 364 L590 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-pe-arrow)" />

      {/* 策略5: ReAct */}
      <rect x="40" y="374" width="340" height="70" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="60" y="396" fontSize="12" fontWeight="700" fill="#065f46">ReAct</text>
      <text x="60" y="414" fontSize="10" fill="#475569">推理与行动交替执行</text>
      <text x="60" y="430" fontSize="9" fill="#64748b">适用：工具调用、Agent循环</text>

      {/* 策略6: 结构化输出 */}
      <rect x="420" y="374" width="340" height="70" rx="10" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="440" y="396" fontSize="12" fontWeight="700" fill="#7e22ce">Structured Output</text>
      <text x="440" y="414" fontSize="10" fill="#475569">用JSON Schema约束输出</text>
      <text x="440" y="430" fontSize="9" fill="#64748b">适用：API对接、数据提取</text>

      {/* 底部：最佳实践 */}
      <rect x="40" y="460" width="720" height="100" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="484" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">提示工程最佳实践</text>

      <text x="60" y="506" fontSize="10" fill="#475569">1. 明确具体——指令越清晰，输出越可控</text>
      <text x="60" y="524" fontSize="10" fill="#475569">2. 分步拆解——复杂任务拆为子任务链</text>
      <text x="60" y="542" fontSize="10" fill="#475569">3. 正面表述——说「做什么」而非「不做什么」</text>

      <text x="420" y="506" fontSize="10" fill="#475569">4. 示例引导——用 Few-shot 锚定输出格式</text>
      <text x="420" y="524" fontSize="10" fill="#475569">5. 迭代调优——A/B 测试 + bad case 回溯</text>
      <text x="420" y="542" fontSize="10" fill="#475569">6. 温度调控——创造性任务调高，事实任务调低</text>
    </svg>
  );
}
