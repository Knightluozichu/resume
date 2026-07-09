"use client";

export function LaeRagSystemDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="RAG检索增强生成系统架构与流程">
      <defs>
        <linearGradient id="lae-rag-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lae-rag-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lae-rag-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lae-rag-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lae-rag-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">RAG检索增强生成：离线索引 + 在线检索</text>

      {/* 左侧：离线索引流程 */}
      <text x="200" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">离线阶段：知识库构建</text>

      <rect x="30" y="76" width="340" height="44" rx="8" fill="url(#lae-rag-blue)" opacity="0.9" />
      <text x="200" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">文档加载</text>
      <text x="200" y="110" textAnchor="middle" fontSize="10" fill="#bfdbfe">PDF / HTML / Markdown / 数据库</text>

      <path d="M200 120 L200 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-rag-arrow)" />

      <rect x="30" y="128" width="340" height="44" rx="8" fill="url(#lae-rag-purple)" opacity="0.9" />
      <text x="200" y="146" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">文本分块 Chunking</text>
      <text x="200" y="162" textAnchor="middle" fontSize="10" fill="#ede9fe">按长度/语义切分 / 重叠窗口</text>

      <path d="M200 172 L200 178" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-rag-arrow)" />

      <rect x="30" y="180" width="340" height="44" rx="8" fill="url(#lae-rag-amber)" opacity="0.9" />
      <text x="200" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">向量化 Embedding</text>
      <text x="200" y="214" textAnchor="middle" fontSize="10" fill="#fef3c7">嵌入模型将文本转为向量</text>

      <path d="M200 224 L200 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-rag-arrow)" />

      <rect x="30" y="232" width="340" height="44" rx="8" fill="url(#lae-rag-green)" opacity="0.9" />
      <text x="200" y="250" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">存入向量数据库</text>
      <text x="200" y="266" textAnchor="middle" fontSize="10" fill="#d1fae5">Milvus / Pinecone / FAISS</text>

      {/* 右侧：在线检索流程 */}
      <text x="590" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">在线阶段：检索增强生成</text>

      <rect x="420" y="76" width="340" height="44" rx="8" fill="url(#lae-rag-blue)" opacity="0.9" />
      <text x="590" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">用户提问</text>
      <text x="590" y="110" textAnchor="middle" fontSize="10" fill="#bfdbfe">自然语言查询</text>

      <path d="M590 120 L590 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-rag-arrow)" />

      <rect x="420" y="128" width="340" height="44" rx="8" fill="url(#lae-rag-amber)" opacity="0.9" />
      <text x="590" y="146" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">查询向量化</text>
      <text x="590" y="162" textAnchor="middle" fontSize="10" fill="#fef3c7">同一嵌入模型编码问题</text>

      <path d="M590 172 L590 178" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-rag-arrow)" />

      <rect x="420" y="180" width="340" height="44" rx="8" fill="url(#lae-rag-purple)" opacity="0.9" />
      <text x="590" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">相似度检索 Top-K</text>
      <text x="590" y="214" textAnchor="middle" fontSize="10" fill="#ede9fe">余弦相似度 / 向量数据库查询</text>

      <path d="M590 224 L590 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-rag-arrow)" />

      <rect x="420" y="232" width="340" height="44" rx="8" fill="url(#lae-rag-green)" opacity="0.9" />
      <text x="590" y="250" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">构造增强提示</text>
      <text x="590" y="266" textAnchor="middle" fontSize="10" fill="#d1fae5">检索片段 + 用户问题 → LLM</text>

      {/* 中间连接：检索结果注入 */}
      <path d="M370 254 L420 254" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#lae-rag-arrow)" />
      <text x="395" y="248" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="600">检索</text>

      {/* 下半：核心组件 */}
      <text x="400" y="304" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">RAG系统核心组件</text>

      <rect x="30" y="318" width="175" height="86" rx="8" fill="url(#lae-rag-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="117" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">嵌入模型</text>
      <text x="117" y="360" textAnchor="middle" fontSize="10" fill="#475569">text-embedding</text>
      <text x="117" y="376" textAnchor="middle" fontSize="10" fill="#475569">将文本映射为向量</text>
      <text x="117" y="394" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">查询+文档共用</text>

      <rect x="215" y="318" width="175" height="86" rx="8" fill="url(#lae-rag-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="302" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">向量数据库</text>
      <text x="302" y="360" textAnchor="middle" fontSize="10" fill="#475569">ANN索引</text>
      <text x="302" y="376" textAnchor="middle" fontSize="10" fill="#475569">高效相似度搜索</text>
      <text x="302" y="394" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">存储+检索</text>

      <rect x="400" y="318" width="175" height="86" rx="8" fill="url(#lae-rag-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">重排序 Reranker</text>
      <text x="487" y="360" textAnchor="middle" fontSize="10" fill="#475569">交叉编码器精排</text>
      <text x="487" y="376" textAnchor="middle" fontSize="10" fill="#475569">提升相关性</text>
      <text x="487" y="394" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">精度优化</text>

      <rect x="585" y="318" width="175" height="86" rx="8" fill="url(#lae-rag-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="672" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">生成模型 LLM</text>
      <text x="672" y="360" textAnchor="middle" fontSize="10" fill="#475569">基于检索上下文</text>
      <text x="672" y="376" textAnchor="middle" fontSize="10" fill="#475569">生成准确回答</text>
      <text x="672" y="394" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">最终输出</text>

      {/* 优势 */}
      <rect x="30" y="420" width="740" height="66" rx="8" fill="url(#lae-rag-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="442" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">RAG核心优势</text>
      <text x="400" y="462" textAnchor="middle" fontSize="11" fill="#475569">无需重训模型即可接入新知识 / 减少幻觉 / 可追溯来源 / 数据私有可控</text>
      <text x="400" y="478" textAnchor="middle" fontSize="11" fill="#475569">相比微调：成本低、更新快、适合知识频繁变化的场景</text>

      {/* 底部总结 */}
      <rect x="30" y="500" width="740" height="56" rx="8" fill="url(#lae-rag-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="522" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">RAG vs 微调的选择</text>
      <text x="400" y="542" textAnchor="middle" fontSize="11" fill="#475569">知识更新频繁 → RAG / 需要改变模型行为风格 → 微调 / 两者可结合使用</text>
    </svg>
  );
}
