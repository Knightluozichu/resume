"use client";

export function CgptFinetuningPracticeDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="微调实战 全参LoRA QLoRA Prefix对比与流程">
      <defs>
        <linearGradient id="cpp-ft-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cpp-ft-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="cpp-ft-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cpp-ft-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="cpp-ft-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="cpp-ft-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">微调实战 · 让通用模型变成领域专家</text>

      {/* 流程管线 */}
      <text x="400" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">微调流程管线</text>

      <rect x="30" y="72" width="140" height="56" rx="8" fill="url(#cpp-ft-blue)" opacity="0.9" />
      <text x="100" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">数据准备</text>
      <text x="100" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">指令对/清洗</text>

      <path d="M170 100 L190 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ft-arrow)" />

      <rect x="194" y="72" width="140" height="56" rx="8" fill="url(#cpp-ft-blue)" opacity="0.9" />
      <text x="264" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">方法选择</text>
      <text x="264" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">全参/PEFT</text>

      <path d="M334 100 L354 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ft-arrow)" />

      <rect x="358" y="72" width="140" height="56" rx="8" fill="url(#cpp-ft-blue)" opacity="0.9" />
      <text x="428" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">训练</text>
      <text x="428" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">超参/显存</text>

      <path d="M498 100 L518 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ft-arrow)" />

      <rect x="522" y="72" width="124" height="56" rx="8" fill="url(#cpp-ft-blue)" opacity="0.9" />
      <text x="584" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">评估</text>
      <text x="584" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">指标/对比</text>

      <path d="M646 100 L666 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ft-arrow)" />

      <rect x="670" y="72" width="100" height="56" rx="8" fill="url(#cpp-ft-blue)" opacity="0.9" />
      <text x="720" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">部署</text>
      <text x="720" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">合并/服务</text>

      <path d="M400 128 L400 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ft-arrow)" />

      {/* 四种方法对比 */}
      <text x="400" y="166" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">四种微调方法对比</text>

      <rect x="30" y="178" width="185" height="180" rx="10" fill="url(#cpp-ft-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="122" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">全参微调</text>
      <text x="122" y="222" textAnchor="middle" fontSize="10" fill="#475569">Full Fine-Tuning</text>
      <text x="122" y="246" textAnchor="middle" fontSize="10" fill="#475569">更新所有参数</text>
      <text x="122" y="266" textAnchor="middle" fontSize="10" fill="#475569">效果上限最高</text>
      <text x="122" y="286" textAnchor="middle" fontSize="10" fill="#475569">显存开销巨大</text>
      <text x="122" y="306" textAnchor="middle" fontSize="10" fill="#475569">易灾难遗忘</text>
      <text x="122" y="338" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">预算充足 / 任务重</text>
      <text x="122" y="352" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">性能优先时用</text>

      <rect x="229" y="178" width="185" height="180" rx="10" fill="url(#cpp-ft-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="321" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">LoRA</text>
      <text x="321" y="222" textAnchor="middle" fontSize="10" fill="#475569">低秩适配</text>
      <text x="321" y="246" textAnchor="middle" fontSize="10" fill="#475569">冻结原参数</text>
      <text x="321" y="266" textAnchor="middle" fontSize="10" fill="#475569">旁路注入低秩矩阵</text>
      <text x="321" y="286" textAnchor="middle" fontSize="10" fill="#475569">可训练参数 1%</text>
      <text x="321" y="306" textAnchor="middle" fontSize="10" fill="#475569">效果接近全参</text>
      <text x="321" y="338" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">性价比之王</text>
      <text x="321" y="352" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">最主流选择</text>

      <rect x="428" y="178" width="185" height="180" rx="10" fill="url(#cpp-ft-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="520" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">QLoRA</text>
      <text x="520" y="222" textAnchor="middle" fontSize="10" fill="#475569">量化 + LoRA</text>
      <text x="520" y="246" textAnchor="middle" fontSize="10" fill="#475569">基座 4bit 量化</text>
      <text x="520" y="266" textAnchor="middle" fontSize="10" fill="#475569">LoRA 适配器训练</text>
      <text x="520" y="286" textAnchor="middle" fontSize="10" fill="#475569">显存再降 4 倍</text>
      <text x="520" y="306" textAnchor="middle" fontSize="10" fill="#475569">单卡可训大模型</text>
      <text x="520" y="338" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">消费级显卡</text>
      <text x="520" y="352" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">也能微调 70B</text>

      <rect x="627" y="178" width="143" height="180" rx="10" fill="url(#cpp-ft-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="698" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">Prefix</text>
      <text x="698" y="222" textAnchor="middle" fontSize="10" fill="#475569">前缀微调</text>
      <text x="698" y="246" textAnchor="middle" fontSize="10" fill="#475569">仅训练可学前缀</text>
      <text x="698" y="266" textAnchor="middle" fontSize="10" fill="#475569">参数量极小</text>
      <text x="698" y="286" textAnchor="middle" fontSize="10" fill="#475569">轻量高效</text>
      <text x="698" y="306" textAnchor="middle" fontSize="10" fill="#475569">生成任务略弱</text>
      <text x="698" y="338" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">多任务共享</text>
      <text x="698" y="352" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">低成本场景</text>

      <path d="M400 358 L400 366" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ft-arrow)" />

      {/* 关键决策 */}
      <rect x="60" y="372" width="680" height="92" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="396" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">微调 vs 提示 vs RAG · 如何选</text>
      <text x="400" y="420" textAnchor="middle" fontSize="11" fill="#475569">提示工程：零成本试错，优先尝试 · RAG：知识频繁更新、需溯源时用</text>
      <text x="400" y="442" textAnchor="middle" fontSize="11" fill="#475569">微调：固化风格格式、注入领域深度、降本提效时用</text>
      <text x="400" y="460" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">三者非互斥，实际项目常组合：RAG 提供事实 + 微调定型风格 + 提示调行为</text>

      {/* 底部 */}
      <rect x="60" y="488" width="680" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="510" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">PEFT 价值：少量参数 + 冻结基座 = 低显存、防遗忘、可插拔多任务适配器</text>
      <text x="400" y="530" textAnchor="middle" fontSize="11" fill="#475569">数据质量远比数量重要：1000 条精标数据胜过 10 万条噪声数据</text>
    </svg>
  );
}
