"use client";

export function BlaRagApplicationsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="RAG应用开发：检索增强生成全流程">
      <defs>
        <linearGradient id="bla-rag-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bla-rag-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bla-rag-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bla-rag-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bla-rag-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">RAG应用开发</text>

      {/* 上半部分：索引阶段（离线） */}
      <rect x="30" y="52" width="740" height="150" rx="10" fill="url(#bla-rag-blue)" opacity="0.06" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="400" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">索引阶段（离线构建）</text>

      <rect x="50" y="88" width="130" height="96" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="115" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">文档加载</text>
      <text x="115" y="128" textAnchor="middle" fontSize="9" fill="#475569">PDF / HTML</text>
      <text x="115" y="142" textAnchor="middle" fontSize="9" fill="#475569">Markdown / DB</text>
      <text x="115" y="164" textAnchor="middle" fontSize="9" fill="#64748b">Loader</text>

      <path d="M184 136 L202 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-rag-arrow)" />

      <rect x="206" y="88" width="130" height="96" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="271" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">分块</text>
      <text x="271" y="128" textAnchor="middle" fontSize="9" fill="#475569">固定长度</text>
      <text x="271" y="142" textAnchor="middle" fontSize="9" fill="#475569">语义分块</text>
      <text x="271" y="164" textAnchor="middle" fontSize="9" fill="#64748b">Chunking</text>

      <path d="M340 136 L358 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-rag-arrow)" />

      <rect x="362" y="88" width="130" height="96" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="427" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">嵌入</text>
      <text x="427" y="128" textAnchor="middle" fontSize="9" fill="#475569">向量化</text>
      <text x="427" y="142" textAnchor="middle" fontSize="9" fill="#475569">Embedding Model</text>
      <text x="427" y="164" textAnchor="middle" fontSize="9" fill="#64748b">text-embedding</text>

      <path d="M496 136 L514 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-rag-arrow)" />

      <rect x="518" y="88" width="130" height="96" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="583" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">存储</text>
      <text x="583" y="128" textAnchor="middle" fontSize="9" fill="#475569">向量数据库</text>
      <text x="583" y="142" textAnchor="middle" fontSize="9" fill="#475569">索引构建</text>
      <text x="583" y="164" textAnchor="middle" fontSize="9" fill="#64748b">FAISS / Chroma</text>

      <path d="M652 136 L670 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-rag-arrow)" />

      <rect x="674" y="88" width="90" height="96" rx="8" fill="url(#bla-rag-blue)" opacity="0.15" stroke="#2563eb" strokeWidth="2" />
      <text x="719" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">向量</text>
      <text x="719" y="146" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">索引库</text>

      {/* 中间分隔 */}
      <text x="400" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">检索阶段 + 生成阶段（在线查询）</text>

      {/* 下半部分：检索 + 生成阶段（在线） */}
      <rect x="30" y="232" width="740" height="220" rx="10" fill="url(#bla-rag-green)" opacity="0.06" stroke="#059669" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* 在线流程：用户查询 → 嵌入 → 检索 → 重排 → 拼接 → LLM → 回答 */}
      <rect x="50" y="250" width="100" height="60" rx="8" fill="url(#bla-rag-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="100" y="278" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">用户查询</text>
      <text x="100" y="294" textAnchor="middle" fontSize="9" fill="#64748b">Question</text>

      <path d="M154 280 L172 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-rag-arrow)" />

      <rect x="176" y="250" width="100" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="226" y="278" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">查询嵌入</text>
      <text x="226" y="294" textAnchor="middle" fontSize="9" fill="#64748b">Embed</text>

      <path d="M280 280 L298 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-rag-arrow)" />

      <rect x="302" y="250" width="100" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="352" y="278" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">向量检索</text>
      <text x="352" y="294" textAnchor="middle" fontSize="9" fill="#64748b">Top-K</text>

      <path d="M406 280 L424 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-rag-arrow)" />

      <rect x="428" y="250" width="100" height="60" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="478" y="278" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">重排序</text>
      <text x="478" y="294" textAnchor="middle" fontSize="9" fill="#64748b">Rerank</text>

      <path d="M532 280 L550 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-rag-arrow)" />

      <rect x="554" y="250" width="100" height="60" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="604" y="278" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">上下文拼接</text>
      <text x="604" y="294" textAnchor="middle" fontSize="9" fill="#64748b">Prompt</text>

      <path d="M658 280 L676 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-rag-arrow)" />

      <rect x="680" y="250" width="80" height="60" rx="8" fill="url(#bla-rag-green)" opacity="0.15" stroke="#059669" strokeWidth="2" />
      <text x="720" y="278" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">LLM</text>
      <text x="720" y="294" textAnchor="middle" fontSize="9" fill="#64748b">生成</text>

      {/* RAG 三种范式对比 */}
      <text x="400" y="338" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">RAG 三种范式对比</text>

      <rect x="50" y="352" width="220" height="84" rx="8" fill="url(#bla-rag-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="374" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Naive RAG</text>
      <text x="160" y="392" textAnchor="middle" fontSize="9" fill="#475569">检索 → 拼接 → 生成</text>
      <text x="160" y="408" textAnchor="middle" fontSize="9" fill="#64748b">简单直接，易实现</text>
      <text x="160" y="424" textAnchor="middle" fontSize="9" fill="#64748b">检索质量不稳定</text>

      <rect x="290" y="352" width="220" height="84" rx="8" fill="url(#bla-rag-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="374" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">Advanced RAG</text>
      <text x="400" y="392" textAnchor="middle" fontSize="9" fill="#475569">查询改写 + 重排序</text>
      <text x="400" y="408" textAnchor="middle" fontSize="9" fill="#64748b">检索前后优化</text>
      <text x="400" y="424" textAnchor="middle" fontSize="9" fill="#64748b">质量更高，复杂度增</text>

      <rect x="530" y="352" width="220" height="84" rx="8" fill="url(#bla-rag-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="640" y="374" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Modular RAG</text>
      <text x="640" y="392" textAnchor="middle" fontSize="9" fill="#475569">检索 + 记忆 + 路由</text>
      <text x="640" y="408" textAnchor="middle" fontSize="9" fill="#64748b">模块化可插拔</text>
      <text x="640" y="424" textAnchor="middle" fontSize="9" fill="#64748b">灵活但工程量大</text>

      {/* 底部：RAG vs 微调 */}
      <rect x="30" y="464" width="740" height="96" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="488" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">何时用 RAG vs 微调</text>
      <text x="60" y="510" fontSize="10" fill="#475569">RAG：知识频繁更新、需引用溯源、数据量大且多样——用检索补充实时知识</text>
      <text x="60" y="528" fontSize="10" fill="#475569">微调：固定领域风格、特定任务格式、低延迟推理——用训练内化能力</text>
      <text x="60" y="546" fontSize="10" fill="#475569">组合：先微调模型风格与格式，再叠加 RAG 补充领域知识——两者互补而非互斥</text>
    </svg>
  );
}
