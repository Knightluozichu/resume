"use client";

export function LlmPretrainingDataDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="预训练数据工程 数据采集清洗分词去重全流程">
      <defs>
        <linearGradient id="llm-pd-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="llm-pd-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="llm-pd-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="llm-pd-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="llm-pd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">预训练数据工程</text>

      {/* 数据流水线 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数据处理流水线</text>

      {/* Step 1: 数据采集 */}
      <rect x="30" y="76" width="120" height="56" rx="8" fill="url(#llm-pd-blue)" opacity="0.9" />
      <text x="90" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">数据采集</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">网页/书籍/代码</text>

      <path d="M150 104 L168 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-pd-arrow)" />

      {/* Step 2: 质量过滤 */}
      <rect x="172" y="76" width="120" height="56" rx="8" fill="url(#llm-pd-purple)" opacity="0.9" />
      <text x="232" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">质量过滤</text>
      <text x="232" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">去噪/过滤</text>

      <path d="M292 104 L310 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-pd-arrow)" />

      {/* Step 3: 去重 */}
      <rect x="314" y="76" width="120" height="56" rx="8" fill="url(#llm-pd-amber)" opacity="0.9" />
      <text x="374" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">去重</text>
      <text x="374" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">精确/模糊去重</text>

      <path d="M434 104 L452 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-pd-arrow)" />

      {/* Step 4: 分词 */}
      <rect x="456" y="76" width="120" height="56" rx="8" fill="url(#llm-pd-green)" opacity="0.9" />
      <text x="516" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">分词</text>
      <text x="516" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">BPE/SentencePiece</text>

      <path d="M576 104 L594 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-pd-arrow)" />

      {/* Step 5: 训练数据 */}
      <rect x="598" y="76" width="172" height="56" rx="8" fill="url(#llm-pd-blue)" opacity="0.9" />
      <text x="684" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">训练就绪数据</text>
      <text x="684" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">token序列</text>

      {/* 数据来源分布 */}
      <text x="200" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数据来源分布</text>

      <rect x="30" y="180" width="180" height="120" rx="8" fill="url(#llm-pd-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">网页数据</text>
      <text x="120" y="222" textAnchor="middle" fontSize="10" fill="#475569">Common Crawl</text>
      <text x="120" y="240" textAnchor="middle" fontSize="10" fill="#475569">占比最大</text>
      <text x="120" y="258" textAnchor="middle" fontSize="10" fill="#475569">覆盖面广</text>
      <text x="120" y="276" textAnchor="middle" fontSize="10" fill="#475569">质量参差</text>
      <text x="120" y="292" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">需重度清洗</text>

      <rect x="220" y="180" width="180" height="120" rx="8" fill="url(#llm-pd-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">书籍与论文</text>
      <text x="310" y="222" textAnchor="middle" fontSize="10" fill="#475569">Books / ArXiv</text>
      <text x="310" y="240" textAnchor="middle" fontSize="10" fill="#475569">高质量文本</text>
      <text x="310" y="258" textAnchor="middle" fontSize="10" fill="#475569">长篇推理</text>
      <text x="310" y="276" textAnchor="middle" fontSize="10" fill="#475569">学术深度</text>
      <text x="310" y="292" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">知识密集</text>

      <rect x="410" y="180" width="180" height="120" rx="8" fill="url(#llm-pd-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">代码数据</text>
      <text x="500" y="222" textAnchor="middle" fontSize="10" fill="#475569">GitHub</text>
      <text x="500" y="240" textAnchor="middle" fontSize="10" fill="#475569">结构化强</text>
      <text x="500" y="258" textAnchor="middle" fontSize="10" fill="#475569">逻辑训练</text>
      <text x="500" y="276" textAnchor="middle" fontSize="10" fill="#475569">编程能力</text>
      <text x="500" y="292" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">推理增强</text>

      <rect x="600" y="180" width="170" height="120" rx="8" fill="url(#llm-pd-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">对话数据</text>
      <text x="685" y="222" textAnchor="middle" fontSize="10" fill="#475569">Reddit / QA</text>
      <text x="685" y="240" textAnchor="middle" fontSize="10" fill="#475569">交互格式</text>
      <text x="685" y="258" textAnchor="middle" fontSize="10" fill="#475569">口语化</text>
      <text x="685" y="276" textAnchor="middle" fontSize="10" fill="#475569">多样性</text>
      <text x="685" y="292" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">对齐辅助</text>

      {/* 分词技术 */}
      <text x="400" y="326" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">分词技术对比</text>

      <rect x="30" y="340" width="230" height="70" rx="8" fill="url(#llm-pd-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">BPE 分词</text>
      <text x="145" y="378" textAnchor="middle" fontSize="10" fill="#475569">从字符逐步合并高频对</text>
      <text x="145" y="394" textAnchor="middle" fontSize="10" fill="#475569">GPT 系列使用</text>

      <rect x="285" y="340" width="230" height="70" rx="8" fill="url(#llm-pd-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">WordPiece 分词</text>
      <text x="400" y="378" textAnchor="middle" fontSize="10" fill="#475569">基于似然的子词划分</text>
      <text x="400" y="394" textAnchor="middle" fontSize="10" fill="#475569">BERT 系列使用</text>

      <rect x="540" y="340" width="230" height="70" rx="8" fill="url(#llm-pd-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="655" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">SentencePiece</text>
      <text x="655" y="378" textAnchor="middle" fontSize="10" fill="#475569">语言无关的分词框架</text>
      <text x="655" y="394" textAnchor="middle" fontSize="10" fill="#475569">支持多语言混合</text>

      {/* 数据质量原则 */}
      <text x="400" y="436" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数据质量原则</text>

      <rect x="40" y="450" width="160" height="44" rx="8" fill="url(#llm-pd-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="120" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">多样性</text>
      <text x="120" y="484" textAnchor="middle" fontSize="9" fill="#475569">覆盖多领域多格式</text>

      <rect x="220" y="450" width="160" height="44" rx="8" fill="url(#llm-pd-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="300" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">高质量</text>
      <text x="300" y="484" textAnchor="middle" fontSize="9" fill="#475569">过滤低质噪声内容</text>

      <rect x="400" y="450" width="160" height="44" rx="8" fill="url(#llm-pd-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="480" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">大规模</text>
      <text x="480" y="484" textAnchor="middle" fontSize="9" fill="#475569">万亿级 token 量</text>

      <rect x="580" y="450" width="180" height="44" rx="8" fill="url(#llm-pd-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="670" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">去污染</text>
      <text x="670" y="484" textAnchor="middle" fontSize="9" fill="#475569">排除测试集泄漏</text>

      {/* 底部总结 */}
      <rect x="40" y="510" width="720" height="36" rx="8" fill="url(#llm-pd-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="532" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心：数据质量决定模型上限——「Garbage In, Garbage Out」</text>
    </svg>
  );
}
