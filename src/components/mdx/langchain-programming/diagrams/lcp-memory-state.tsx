"use client";

export function LcpMemoryStateDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="记忆与状态管理 Memory类型与工作流程">
      <defs>
        <linearGradient id="lcp-ms-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lcp-ms-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lcp-ms-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lcp-ms-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lcp-ms-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">记忆与状态管理：Memory 类型与流程</text>

      {/* 上部：记忆工作流程 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">记忆工作流程</text>

      <rect x="30" y="76" width="140" height="70" rx="8" fill="url(#lcp-ms-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="100" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">用户输入</text>
      <text x="100" y="120" textAnchor="middle" fontSize="9" fill="#475569">新问题</text>

      <path d="M170 111 L210 111" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ms-arrow)" />

      <rect x="215" y="76" width="140" height="70" rx="8" fill="url(#lcp-ms-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="285" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">Memory</text>
      <text x="285" y="120" textAnchor="middle" fontSize="9" fill="#475569">加载历史</text>
      <text x="285" y="136" textAnchor="middle" fontSize="9" fill="#475569">load_memory_variables</text>

      <path d="M355 111 L395 111" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ms-arrow)" />

      <rect x="400" y="76" width="140" height="70" rx="8" fill="url(#lcp-ms-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="470" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Chain/LLM</text>
      <text x="470" y="120" textAnchor="middle" fontSize="9" fill="#475569">带上下文推理</text>

      <path d="M540 111 L580 111" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ms-arrow)" />

      <rect x="585" y="76" width="180" height="70" rx="8" fill="url(#lcp-ms-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="675" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">保存 + 输出</text>
      <text x="675" y="120" textAnchor="middle" fontSize="9" fill="#475569">save_context</text>
      <text x="675" y="136" textAnchor="middle" fontSize="9" fill="#475569">返回响应</text>

      {/* 中部：四种记忆类型 */}
      <text x="400" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四种核心记忆类型</text>

      <rect x="30" y="194" width="180" height="130" rx="8" fill="url(#lcp-ms-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">BufferMemory</text>
      <text x="120" y="242" textAnchor="middle" fontSize="9" fill="#475569">完整历史记录</text>
      <text x="120" y="260" textAnchor="middle" fontSize="9" fill="#475569">保存所有对话</text>
      <text x="120" y="278" textAnchor="middle" fontSize="9" fill="#475569">优点：信息完整</text>
      <text x="120" y="296" textAnchor="middle" fontSize="9" fill="#475569">缺点：Token 消耗大</text>
      <text x="120" y="314" textAnchor="middle" fontSize="9" fill="#475569">场景：短对话</text>

      <rect x="225" y="194" width="180" height="130" rx="8" fill="url(#lcp-ms-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="315" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">WindowMemory</text>
      <text x="315" y="242" textAnchor="middle" fontSize="9" fill="#475569">滑动窗口</text>
      <text x="315" y="260" textAnchor="middle" fontSize="9" fill="#475569">只保留最近 N 轮</text>
      <text x="315" y="278" textAnchor="middle" fontSize="9" fill="#475569">优点：Token 可控</text>
      <text x="315" y="296" textAnchor="middle" fontSize="9" fill="#475569">缺点：丢失早期信息</text>
      <text x="315" y="314" textAnchor="middle" fontSize="9" fill="#475569">场景：中等对话</text>

      <rect x="420" y="194" width="180" height="130" rx="8" fill="url(#lcp-ms-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="510" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">SummaryMemory</text>
      <text x="510" y="242" textAnchor="middle" fontSize="9" fill="#475569">摘要记忆</text>
      <text x="510" y="260" textAnchor="middle" fontSize="9" fill="#475569">LLM 总结历史</text>
      <text x="510" y="278" textAnchor="middle" fontSize="9" fill="#475569">优点：Token 节省</text>
      <text x="510" y="296" textAnchor="middle" fontSize="9" fill="#475569">缺点：摘要损失细节</text>
      <text x="510" y="314" textAnchor="middle" fontSize="9" fill="#475569">场景：长对话</text>

      <rect x="615" y="194" width="155" height="130" rx="8" fill="url(#lcp-ms-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="692" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">KGMemory</text>
      <text x="692" y="242" textAnchor="middle" fontSize="9" fill="#475569">知识图谱记忆</text>
      <text x="692" y="260" textAnchor="middle" fontSize="9" fill="#475569">提取实体关系</text>
      <text x="692" y="278" textAnchor="middle" fontSize="9" fill="#475569">优点：结构化查询</text>
      <text x="692" y="296" textAnchor="middle" fontSize="9" fill="#475569">缺点：抽取开销大</text>
      <text x="692" y="314" textAnchor="middle" fontSize="9" fill="#475569">场景：知识管理</text>

      {/* 下部：存储后端 */}
      <text x="400" y="356" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">记忆存储后端</text>

      <rect x="30" y="370" width="180" height="70" rx="8" fill="url(#lcp-ms-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="394" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">In-Memory</text>
      <text x="120" y="414" textAnchor="middle" fontSize="9" fill="#475569">进程内存存储</text>
      <text x="120" y="430" textAnchor="middle" fontSize="9" fill="#475569">开发调试用，重启丢失</text>

      <rect x="225" y="370" width="180" height="70" rx="8" fill="url(#lcp-ms-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="315" y="394" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">Redis</text>
      <text x="315" y="414" textAnchor="middle" fontSize="9" fill="#475569">键值缓存存储</text>
      <text x="315" y="430" textAnchor="middle" fontSize="9" fill="#475569">高性能，支持 TTL 过期</text>

      <rect x="420" y="370" width="180" height="70" rx="8" fill="url(#lcp-ms-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="510" y="394" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">PostgreSQL</text>
      <text x="510" y="414" textAnchor="middle" fontSize="9" fill="#475569">关系数据库存储</text>
      <text x="510" y="430" textAnchor="middle" fontSize="9" fill="#475569">持久化，支持复杂查询</text>

      <rect x="615" y="370" width="155" height="70" rx="8" fill="url(#lcp-ms-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="692" y="394" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">Vector Store</text>
      <text x="692" y="414" textAnchor="middle" fontSize="9" fill="#475569">向量语义检索</text>
      <text x="692" y="430" textAnchor="middle" fontSize="9" fill="#475569">相似度召回相关历史</text>

      {/* 底部总结 */}
      <rect x="30" y="462" width="740" height="80" rx="8" fill="url(#lcp-ms-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="488" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">记忆本质：在多轮对话中维护上下文状态，让模型"记住"之前说过的话</text>
      <text x="400" y="510" textAnchor="middle" fontSize="10" fill="#475569">选择策略：短对话用 Buffer / 中等用 Window / 长对话用 Summary / 知识管理用 KG</text>
      <text x="400" y="528" textAnchor="middle" fontSize="10" fill="#475569">生产环境需配合持久化后端（Redis/Postgres），并控制 Token 消耗</text>
    </svg>
  );
}
