"use client";

export function LlmScalingLawsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="缩放定律与涌现能力 模型损失随参数量数据量算力幂律下降">
      <defs>
        <linearGradient id="llm-sl-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="llm-sl-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="llm-sl-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="llm-sl-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="llm-sl-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="llm-sl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">缩放定律与涌现能力</text>

      {/* 左侧：缩放定律曲线 */}
      <text x="200" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Kapathy 缩放定律</text>

      {/* 坐标系 */}
      <line x1="80" y1="80" x2="80" y2="290" stroke="#475569" strokeWidth="2" />
      <line x1="80" y1="290" x2="340" y2="290" stroke="#475569" strokeWidth="2" />
      <text x="50" y="185" textAnchor="middle" fontSize="11" fill="#475569" transform="rotate(-90, 50, 185)">Loss (损失)</text>
      <text x="210" y="310" textAnchor="middle" fontSize="11" fill="#475569">参数量 / 数据量 / 算力</text>

      {/* 幂律曲线 */}
      <path d="M90 100 Q150 130 200 180 Q260 230 330 270" fill="none" stroke="url(#llm-sl-blue)" strokeWidth="3" />
      <text x="300" y="120" fontSize="10" fill="#2563eb" fontWeight="600">L = L_inf + (C/C_min)^(-alpha)</text>

      {/* 曲线标注 */}
      <circle cx="120" cy="115" r="4" fill="#2563eb" />
      <text x="135" y="112" fontSize="9" fill="#1e40af">小模型</text>
      <circle cx="200" cy="180" r="4" fill="#7c3aed" />
      <text x="215" y="177" fontSize="9" fill="#5b21b6">中等模型</text>
      <circle cx="300" cy="255" r="4" fill="#059669" />
      <text x="278" y="245" fontSize="9" fill="#065f46">大模型</text>

      {/* 关键信息 */}
      <rect x="60" y="326" width="280" height="36" rx="8" fill="url(#llm-sl-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">损失随规模呈幂律下降，可预测</text>

      {/* 右侧：涌现能力 */}
      <text x="560" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">涌现能力</text>

      <rect x="410" y="76" width="340" height="50" rx="8" fill="url(#llm-sl-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="580" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">定义</text>
      <text x="580" y="114" textAnchor="middle" fontSize="10" fill="#475569">小模型没有、大模型突然出现的能力</text>

      {/* 涌现能力列表 */}
      <rect x="410" y="136" width="160" height="44" rx="8" fill="url(#llm-sl-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="490" y="154" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">少样本学习</text>
      <text x="490" y="170" textAnchor="middle" fontSize="9" fill="#475569">Few-Shot Learning</text>

      <rect x="600" y="136" width="160" height="44" rx="8" fill="url(#llm-sl-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="680" y="154" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">思维链推理</text>
      <text x="680" y="170" textAnchor="middle" fontSize="9" fill="#475569">Chain-of-Thought</text>

      <rect x="410" y="190" width="160" height="44" rx="8" fill="url(#llm-sl-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="490" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">指令遵循</text>
      <text x="490" y="224" textAnchor="middle" fontSize="9" fill="#475569">Instruction Following</text>

      <rect x="600" y="190" width="160" height="44" rx="8" fill="url(#llm-sl-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="680" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">代码生成</text>
      <text x="680" y="224" textAnchor="middle" fontSize="9" fill="#475569">Code Generation</text>

      <rect x="410" y="244" width="160" height="44" rx="8" fill="url(#llm-sl-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="490" y="262" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">多语言理解</text>
      <text x="490" y="278" textAnchor="middle" fontSize="9" fill="#475569">Multilingual</text>

      <rect x="600" y="244" width="160" height="44" rx="8" fill="url(#llm-sl-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="680" y="262" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">数学推理</text>
      <text x="680" y="278" textAnchor="middle" fontSize="9" fill="#475569">Math Reasoning</text>

      <rect x="410" y="326" width="340" height="36" rx="8" fill="url(#llm-sl-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="580" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">能力在规模阈值处突然涌现，不可预测</text>

      {/* 底部：三大缩放维度 */}
      <text x="400" y="386" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三大缩放维度</text>

      <rect x="40" y="400" width="230" height="66" rx="8" fill="url(#llm-sl-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="422" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">参数量 (N)</text>
      <text x="155" y="440" textAnchor="middle" fontSize="10" fill="#475569">模型容量</text>
      <text x="155" y="456" textAnchor="middle" fontSize="10" fill="#475569">更多参数 = 更强表达能力</text>

      <rect x="285" y="400" width="230" height="66" rx="8" fill="url(#llm-sl-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="422" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">数据量 (D)</text>
      <text x="400" y="440" textAnchor="middle" fontSize="10" fill="#475569">训练数据</text>
      <text x="400" y="456" textAnchor="middle" fontSize="10" fill="#475569">更多数据 = 更广知识覆盖</text>

      <rect x="530" y="400" width="230" height="66" rx="8" fill="url(#llm-sl-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="645" y="422" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">算力 (C)</text>
      <text x="645" y="440" textAnchor="middle" fontSize="10" fill="#475569">计算资源</text>
      <text x="645" y="456" textAnchor="middle" fontSize="10" fill="#475569">更多算力 = 更充分训练</text>

      {/* 底部总结 */}
      <rect x="40" y="484" width="720" height="36" rx="8" fill="url(#llm-sl-red)" opacity="0.08" stroke="#dc2626" strokeWidth="2" />
      <text x="400" y="506" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">Chinchilla 最优律：参数与数据量应等比缩放，约 20 tokens / 参数</text>

      <rect x="40" y="530" width="720" height="22" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="546" textAnchor="middle" fontSize="10" fill="#475569">缩放律让训练可规划，涌现能力让大模型质变——「大力出奇迹」的科学基础</text>
    </svg>
  );
}
