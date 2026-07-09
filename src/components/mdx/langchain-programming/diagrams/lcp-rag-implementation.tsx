"use client";

export function LcpRagImplementationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="RAG系统实现 检索增强生成完整流程">
      <defs>
        <linearGradient id="lcp-rg-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lcp-rg-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lcp-rg-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lcp-rg-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lcp-rg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">RAG 系统实现：检索增强生成</text>

      {/* 左侧：离线索引阶段 */}
      <text x="170" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">离线索引阶段</text>

      <rect x="30" y="76" width="280" height="50" rx="8" fill="url(#lcp-rg-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="170" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">1. Document Loaders</text>
      <text x="170" y="116" textAnchor="middle" fontSize="9" fill="#475569">PDF / Word / HTML / Markdown 加载</text>

      <path d="M170 126 L170 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-rg-arrow)" />

      <rect x="30" y="138" width="280" height="50" rx="8" fill="url(#lcp-rg-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="170" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">2. Text Splitters</text>
      <text x="170" y="178" textAnchor="middle" fontSize="9" fill="#475569">RecursiveCharacterTextSplitter 分块</text>

      <path d="M170 188 L170 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-rg-arrow)" />

      <rect x="30" y="200" width="280" height="50" rx="8" fill="url(#lcp-rg-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="170" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">3. Embeddings</text>
      <text x="170" y="240" textAnchor="middle" fontSize="9" fill="#475569">OpenAIEmbeddings 向量化</text>

      <path d="M170 250 L170 258" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-rg-arrow)" />

      <rect x="30" y="262" width="280" height="50" rx="8" fill="url(#lcp-rg-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="170" y="284" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">4. Vector Store</text>
      <text x="170" y="302" textAnchor="middle" fontSize="9" fill="#475569">Chroma / FAISS / Milvus 存储</text>

      {/* 右侧：在线检索阶段 */}
      <text x="600" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">在线检索阶段</text>

      <rect x="460" y="76" width="280" height="50" rx="8" fill="url(#lcp-rg-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">1. 用户提问</text>
      <text x="600" y="116" textAnchor="middle" fontSize="9" fill="#475569">问题输入 + 向量化</text>

      <path d="M600 126 L600 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-rg-arrow)" />

      <rect x="460" y="138" width="280" height="50" rx="8" fill="url(#lcp-rg-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">2. similarity_search</text>
      <text x="600" y="178" textAnchor="middle" fontSize="9" fill="#475569">向量相似度检索 Top-K</text>

      <path d="M600 188 L600 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-rg-arrow)" />

      <rect x="460" y="200" width="280" height="50" rx="8" fill="url(#lcp-rg-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">3. Context 构造</text>
      <text x="600" y="240" textAnchor="middle" fontSize="9" fill="#475569">检索片段 + 问题组装提示</text>

      <path d="M600 250 L600 258" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-rg-arrow)" />

      <rect x="460" y="262" width="280" height="50" rx="8" fill="url(#lcp-rg-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="284" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">4. LLM 生成</text>
      <text x="600" y="302" textAnchor="middle" fontSize="9" fill="#475569">基于检索内容生成回答</text>

      {/* 中间连接 */}
      <path d="M310 287 L460 160" stroke="#64748b" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#lcp-rg-arrow)" />
      <text x="385" y="210" textAnchor="middle" fontSize="9" fill="#64748b">检索查询</text>

      {/* 下部：LCEL RAG 链 */}
      <text x="400" y="338" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">LCEL 实现 RAG 链</text>

      <rect x="30" y="352" width="740" height="70" rx="8" fill="#0f172a" />
      <text x="50" y="376" fontSize="11" fontFamily="monospace" fill="#7dd3fc">retriever = vectorstore.as_retriever(search_kwargs=k)</text>
      <text x="50" y="396" fontSize="11" fontFamily="monospace" fill="#7dd3fc">chain = (retriever | prompt | model | output_parser)</text>
      <text x="50" y="414" fontSize="10" fontFamily="monospace" fill="#86efac"># 管道连接检索器-提示-模型-解析器</text>

      {/* 底部：关键优化 */}
      <text x="400" y="446" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">关键优化策略</text>

      <rect x="30" y="460" width="180" height="80" rx="8" fill="url(#lcp-rg-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="120" y="484" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">分块策略</text>
      <text x="120" y="502" textAnchor="middle" fontSize="9" fill="#475569">chunk_size 500-1000</text>
      <text x="120" y="518" textAnchor="middle" fontSize="9" fill="#475569">overlap 10%-20%</text>
      <text x="120" y="534" textAnchor="middle" fontSize="9" fill="#475569">语义分块更优</text>

      <rect x="225" y="460" width="180" height="80" rx="8" fill="url(#lcp-rg-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="315" y="484" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">混合检索</text>
      <text x="315" y="502" textAnchor="middle" fontSize="9" fill="#475569">向量 + BM25 关键词</text>
      <text x="315" y="518" textAnchor="middle" fontSize="9" fill="#475569">EnsembleRetriever</text>
      <text x="315" y="534" textAnchor="middle" fontSize="9" fill="#475569">提升召回率</text>

      <rect x="420" y="460" width="170" height="80" rx="8" fill="url(#lcp-rg-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="505" y="484" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">重排序</text>
      <text x="505" y="502" textAnchor="middle" fontSize="9" fill="#475569">Cross-Encoder 重排</text>
      <text x="505" y="518" textAnchor="middle" fontSize="9" fill="#475569">ContextualCompression</text>
      <text x="505" y="534" textAnchor="middle" fontSize="9" fill="#475569">提升精确度</text>

      <rect x="605" y="460" width="165" height="80" rx="8" fill="url(#lcp-rg-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="687" y="484" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">Multi-Query</text>
      <text x="687" y="502" textAnchor="middle" fontSize="9" fill="#475569">多角度查询扩展</text>
      <text x="687" y="518" textAnchor="middle" fontSize="9" fill="#475569">MultiQueryRetriever</text>
      <text x="687" y="534" textAnchor="middle" fontSize="9" fill="#475569">覆盖更多语义</text>
    </svg>
  );
}
