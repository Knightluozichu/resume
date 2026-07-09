"use client";

export function LlmFrontiersDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="前沿研究方向 多模态 Agent MoE 长上下文">
      <defs>
        <linearGradient id="llm-fr-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="llm-fr-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="llm-fr-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="llm-fr-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="llm-fr-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="llm-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">前沿研究方向</text>

      {/* 六大前沿方向 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">六大前沿方向</text>

      {/* 多模态 */}
      <rect x="30" y="76" width="230" height="130" rx="10" fill="url(#llm-fr-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">多模态融合</text>
      <text x="145" y="120" textAnchor="middle" fontSize="10" fill="#475569">文本 + 图像 + 音频 + 视频</text>
      <text x="145" y="138" textAnchor="middle" fontSize="10" fill="#475569">统一跨模态理解与生成</text>
      <text x="145" y="156" textAnchor="middle" fontSize="10" fill="#475569">GPT-4V / Gemini / Claude</text>
      <text x="145" y="174" textAnchor="middle" fontSize="10" fill="#475569">视觉编码器 + LLM 对齐</text>
      <text x="145" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">突破纯文本限制</text>

      {/* Agent */}
      <rect x="285" y="76" width="230" height="130" rx="10" fill="url(#llm-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">Agent 自主智能体</text>
      <text x="400" y="120" textAnchor="middle" fontSize="10" fill="#475569">规划 + 工具 + 记忆</text>
      <text x="400" y="138" textAnchor="middle" fontSize="10" fill="#475569">ReAct / AutoGPT / LangGraph</text>
      <text x="400" y="156" textAnchor="middle" fontSize="10" fill="#475569">多步推理与自主决策</text>
      <text x="400" y="174" textAnchor="middle" fontSize="10" fill="#475569">环境交互与反馈循环</text>
      <text x="400" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">从对话到行动</text>

      {/* MoE */}
      <rect x="540" y="76" width="230" height="130" rx="10" fill="url(#llm-fr-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">混合专家 MoE</text>
      <text x="655" y="120" textAnchor="middle" fontSize="10" fill="#475569">稀疏激活：只激活部分专家</text>
      <text x="655" y="138" textAnchor="middle" fontSize="10" fill="#475569">以小推理成本获得大模型容量</text>
      <text x="655" y="156" textAnchor="middle" fontSize="10" fill="#475569">Mixtral / DeepSeek-MoE</text>
      <text x="655" y="174" textAnchor="middle" fontSize="10" fill="#475569">路由器动态分配 token</text>
      <text x="655" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">容量与效率兼得</text>

      {/* 长上下文 */}
      <rect x="30" y="220" width="230" height="130" rx="10" fill="url(#llm-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="145" y="242" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">长上下文窗口</text>
      <text x="145" y="264" textAnchor="middle" fontSize="10" fill="#475569">从 4K → 128K → 1M+ tokens</text>
      <text x="145" y="282" textAnchor="middle" fontSize="10" fill="#475569">RoPE 位置编码外推</text>
      <text x="145" y="300" textAnchor="middle" fontSize="10" fill="#475569">RingAttention / Flash Attn</text>
      <text x="145" y="318" textAnchor="middle" fontSize="10" fill="#475569">大海捞针 (NIAH) 评估</text>
      <text x="145" y="338" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">突破上下文长度限制</text>

      {/* 高效训练 */}
      <rect x="285" y="220" width="230" height="130" rx="10" fill="url(#llm-fr-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="242" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">高效训练技术</text>
      <text x="400" y="264" textAnchor="middle" fontSize="10" fill="#475569">分布式训练 (3D Parallel)</text>
      <text x="400" y="282" textAnchor="middle" fontSize="10" fill="#475569">ZeRO / FSDP 显存优化</text>
      <text x="400" y="300" textAnchor="middle" fontSize="10" fill="#475569">混合精度训练 (BF16/FP8)</text>
      <text x="400" y="318" textAnchor="middle" fontSize="10" fill="#475569">梯度检查点 / 卸载</text>
      <text x="400" y="338" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">让大模型训练可行</text>

      {/* 安全可信 */}
      <rect x="540" y="220" width="230" height="130" rx="10" fill="url(#llm-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="655" y="242" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">安全与可信</text>
      <text x="655" y="264" textAnchor="middle" fontSize="10" fill="#475569">可解释性 (Interpretability)</text>
      <text x="655" y="282" textAnchor="middle" fontSize="10" fill="#475569">幻觉缓解 (RAG / 事实约束)</text>
      <text x="655" y="300" textAnchor="middle" fontSize="10" fill="#475569">价值对齐 (Constitutional AI)</text>
      <text x="655" y="318" textAnchor="middle" fontSize="10" fill="#475569">水印与检测 (Watermarking)</text>
      <text x="655" y="338" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">让模型可靠可控</text>

      {/* 技术演进趋势 */}
      <text x="400" y="378" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">技术演进趋势</text>

      <rect x="30" y="392" width="120" height="40" rx="8" fill="url(#llm-fr-blue)" opacity="0.9" />
      <text x="90" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">单模态</text>

      <path d="M150 412 L168 412" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-fr-arrow)" />

      <rect x="172" y="392" width="120" height="40" rx="8" fill="url(#llm-fr-purple)" opacity="0.9" />
      <text x="232" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">多模态</text>

      <path d="M292 412 L310 412" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-fr-arrow)" />

      <rect x="314" y="392" width="120" height="40" rx="8" fill="url(#llm-fr-amber)" opacity="0.9" />
      <text x="374" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">工具增强</text>

      <path d="M434 412 L452 412" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-fr-arrow)" />

      <rect x="456" y="392" width="120" height="40" rx="8" fill="url(#llm-fr-green)" opacity="0.9" />
      <text x="516" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">Agent</text>

      <path d="M576 412 L594 412" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-fr-arrow)" />

      <rect x="598" y="392" width="172" height="40" rx="8" fill="url(#llm-fr-red)" opacity="0.9" />
      <text x="684" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">自主 AGI 探索</text>

      {/* 开源 vs 闭源 */}
      <text x="400" y="458" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">开源与闭源生态</text>

      <rect x="40" y="472" width="350" height="56" rx="8" fill="url(#llm-fr-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="215" y="492" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">闭源：GPT-4 / Claude / Gemini</text>
      <text x="215" y="512" textAnchor="middle" fontSize="10" fill="#475569">性能领先 / API 即服务 / 安全可控</text>

      <rect x="410" y="472" width="350" height="56" rx="8" fill="url(#llm-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="585" y="492" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">开源：LLaMA / Qwen / Mistral</text>
      <text x="585" y="512" textAnchor="middle" fontSize="10" fill="#475569">可自部署 / 可微调 / 社区生态</text>

      {/* 底部总结 */}
      <rect x="40" y="542" width="720" height="14" rx="6" fill="url(#llm-fr-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1" />
      <text x="400" y="554" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">核心：多模态扩展感知，Agent扩展行动，MoE提效，长上下文增记忆——大模型向通用智能演进</text>
    </svg>
  );
}
