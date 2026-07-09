"use client";

export function LslDataPipelineDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="数据处理流水线 从原始数据到训练就绪的完整管线">
      <defs>
        <linearGradient id="lsl-dp-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lsl-dp-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lsl-dp-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lsl-dp-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lsl-dp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">数据处理流水线</text>

      {/* 数据流水线主流程 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">数据处理主流程</text>

      <rect x="20" y="74" width="130" height="56" rx="8" fill="url(#lsl-dp-blue)" opacity="0.9" />
      <text x="85" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">数据采集</text>
      <text x="85" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">网页/书籍/代码</text>

      <path d="M150 102 L168 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-dp-arrow)" />

      <rect x="173" y="74" width="130" height="56" rx="8" fill="url(#lsl-dp-purple)" opacity="0.9" />
      <text x="238" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">质量过滤</text>
      <text x="238" y="114" textAnchor="middle" fontSize="9" fill="#ede9fe">启发式/分类器</text>

      <path d="M303 102 L321 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-dp-arrow)" />

      <rect x="326" y="74" width="130" height="56" rx="8" fill="url(#lsl-dp-amber)" opacity="0.9" />
      <text x="391" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">去重清洗</text>
      <text x="391" y="114" textAnchor="middle" fontSize="9" fill="#fef3c7">MinHash/精确</text>

      <path d="M456 102 L474 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-dp-arrow)" />

      <rect x="479" y="74" width="130" height="56" rx="8" fill="url(#lsl-dp-green)" opacity="0.9" />
      <text x="544" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">分词编码</text>
      <text x="544" y="114" textAnchor="middle" fontSize="9" fill="#d1fae5">BPE/SentencePiece</text>

      <path d="M609 102 L627 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-dp-arrow)" />

      <rect x="632" y="74" width="148" height="56" rx="8" fill="url(#lsl-dp-blue)" opacity="0.9" />
      <text x="706" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">训练就绪</text>
      <text x="706" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">Token 序列</text>

      {/* 数据质量维度 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数据质量维度</text>

      <rect x="30" y="176" width="180" height="80" rx="8" fill="url(#lsl-dp-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">多样性</text>
      <text x="120" y="218" textAnchor="middle" fontSize="9" fill="#475569">领域覆盖 / 语言覆盖</text>
      <text x="120" y="234" textAnchor="middle" fontSize="9" fill="#475569">来源多样 / 时效性</text>
      <text x="120" y="250" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">避免分布偏斜</text>

      <rect x="220" y="176" width="180" height="80" rx="8" fill="url(#lsl-dp-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">准确性</text>
      <text x="310" y="218" textAnchor="middle" fontSize="9" fill="#475569">事实正确 / 无噪音</text>
      <text x="310" y="234" textAnchor="middle" fontSize="9" fill="#475569">低重复率 / 无乱码</text>
      <text x="310" y="250" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">高质量文本</text>

      <rect x="410" y="176" width="180" height="80" rx="8" fill="url(#lsl-dp-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">安全性</text>
      <text x="500" y="218" textAnchor="middle" fontSize="9" fill="#475569">有害内容过滤</text>
      <text x="500" y="234" textAnchor="middle" fontSize="9" fill="#475569">PII 隐私脱敏</text>
      <text x="500" y="250" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">合规可追溯</text>

      <rect x="600" y="176" width="170" height="80" rx="8" fill="url(#lsl-dp-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">规模量</text>
      <text x="685" y="218" textAnchor="middle" fontSize="9" fill="#475569">万亿 Token 级</text>
      <text x="685" y="234" textAnchor="middle" fontSize="9" fill="#475569">配比策略 / 混合</text>
      <text x="685" y="250" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">Chinchilla 最优</text>

      {/* 关键技术 */}
      <text x="400" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键处理技术</text>

      <rect x="30" y="302" width="240" height="100" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="324" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">质量过滤</text>
      <text x="150" y="344" textAnchor="middle" fontSize="9" fill="#475569">启发式规则（长度/符号率）</text>
      <text x="150" y="360" textAnchor="middle" fontSize="9" fill="#475569">轻量分类器过滤低质</text>
      <text x="150" y="376" textAnchor="middle" fontSize="9" fill="#475569">困惑度过滤（小模型打分）</text>
      <text x="150" y="394" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">挑战：误删高质量数据</text>

      <rect x="290" y="302" width="240" height="100" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="324" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">去重策略</text>
      <text x="410" y="344" textAnchor="middle" fontSize="9" fill="#475569">精确去重（哈希匹配）</text>
      <text x="410" y="360" textAnchor="middle" fontSize="9" fill="#475569">模糊去重（MinHash LSH）</text>
      <text x="410" y="376" textAnchor="middle" fontSize="9" fill="#475569">文档级 / 段落级去重</text>
      <text x="410" y="394" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">效果：减少记忆提升泛化</text>

      <rect x="550" y="302" width="220" height="100" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="660" y="324" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">分词器</text>
      <text x="660" y="344" textAnchor="middle" fontSize="9" fill="#475569">BPE 子词合并</text>
      <text x="660" y="360" textAnchor="middle" fontSize="9" fill="#475569">SentencePiece 多语言</text>
      <text x="660" y="376" textAnchor="middle" fontSize="9" fill="#475569">词表大小 32K-128K</text>
      <text x="660" y="394" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">压缩率与覆盖权衡</text>

      {/* 数据配比 */}
      <text x="400" y="432" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">预训练数据配比策略</text>

      <rect x="30" y="446" width="180" height="56" rx="8" fill="url(#lsl-dp-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="468" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">网页文本</text>
      <text x="120" y="488" textAnchor="middle" fontSize="9" fill="#475569">~50-67% 主体</text>

      <rect x="220" y="446" width="180" height="56" rx="8" fill="url(#lsl-dp-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="468" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">书籍文献</text>
      <text x="310" y="488" textAnchor="middle" fontSize="9" fill="#475569">~15-20% 长文本</text>

      <rect x="410" y="446" width="180" height="56" rx="8" fill="url(#lsl-dp-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="468" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">代码数据</text>
      <text x="500" y="488" textAnchor="middle" fontSize="9" fill="#475569">~5-10% 逻辑能力</text>

      <rect x="600" y="446" width="170" height="56" rx="8" fill="url(#lsl-dp-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="468" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">学术论文</text>
      <text x="685" y="488" textAnchor="middle" fontSize="9" fill="#475569">~2-5% 知识深度</text>

      {/* 底部总结 */}
      <rect x="30" y="520" width="740" height="32" rx="8" fill="url(#lsl-dp-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="540" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：采集 → 过滤 → 去重 → 分词 → 配比 → 训练就绪（数据质量决定模型上限）</text>

      <rect x="30" y="558" width="740" height="18" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="571" textAnchor="middle" fontSize="9" fill="#64748b">关键指标：数据量 / 质量 / 多样性 / 去重率 / 压缩率</text>
    </svg>
  );
}
