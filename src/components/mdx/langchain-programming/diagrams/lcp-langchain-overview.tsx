"use client";

export function LcpLangchainOverviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="LangChain框架概览架构与核心模块">
      <defs>
        <linearGradient id="lcp-ov-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lcp-ov-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lcp-ov-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lcp-ov-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="lcp-ov-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="lcp-ov-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">LangChain 框架概览：架构与核心模块</text>

      {/* 中心：LangChain 核心 */}
      <rect x="290" y="230" width="220" height="80" rx="12" fill="url(#lcp-ov-core)" opacity="0.95" />
      <text x="400" y="262" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">LangChain 核心</text>
      <text x="400" y="284" textAnchor="middle" fontSize="11" fill="#fecaca">Runnable 接口 / LCEL</text>
      <text x="400" y="300" textAnchor="middle" fontSize="11" fill="#fecaca">统一编排抽象</text>

      {/* 上方：Model I/O */}
      <rect x="100" y="60" width="180" height="80" rx="10" fill="url(#lcp-ov-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="190" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">Model I/O</text>
      <text x="190" y="104" textAnchor="middle" fontSize="10" fill="#475569">Prompts 提示模板</text>
      <text x="190" y="120" textAnchor="middle" fontSize="10" fill="#475569">LLMs / Chat Models</text>
      <text x="190" y="136" textAnchor="middle" fontSize="10" fill="#475569">Output Parsers 输出解析</text>
      <path d="M280 140 L340 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ov-arrow)" />

      {/* 右上：Retrieval */}
      <rect x="520" y="60" width="180" height="80" rx="10" fill="url(#lcp-ov-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="610" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">Retrieval</text>
      <text x="610" y="104" textAnchor="middle" fontSize="10" fill="#475569">Document Loaders</text>
      <text x="610" y="120" textAnchor="middle" fontSize="10" fill="#475569">Text Splitters</text>
      <text x="610" y="136" textAnchor="middle" fontSize="10" fill="#475569">Vector Stores / Embeddings</text>
      <path d="M520 140 L460 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ov-arrow)" />

      {/* 左下：Chains */}
      <rect x="60" y="340" width="170" height="80" rx="10" fill="url(#lcp-ov-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="145" y="366" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Chains</text>
      <text x="145" y="384" textAnchor="middle" fontSize="10" fill="#475569">LLMChain</text>
      <text x="145" y="400" textAnchor="middle" fontSize="10" fill="#475569">SequentialChain</text>
      <text x="145" y="416" textAnchor="middle" fontSize="10" fill="#475569">RouterChain</text>
      <path d="M230 340 L300 310" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ov-arrow)" />

      {/* 下方：Memory */}
      <rect x="315" y="380" width="170" height="70" rx="10" fill="url(#lcp-ov-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="406" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">Memory</text>
      <text x="400" y="424" textAnchor="middle" fontSize="10" fill="#475569">Buffer / Window</text>
      <text x="400" y="440" textAnchor="middle" fontSize="10" fill="#475569">Summary / KG</text>
      <path d="M400 380 L400 310" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ov-arrow)" />

      {/* 右下：Agents */}
      <rect x="570" y="340" width="170" height="80" rx="10" fill="url(#lcp-ov-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="366" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Agents</text>
      <text x="655" y="384" textAnchor="middle" fontSize="10" fill="#475569">Agent Types</text>
      <text x="655" y="400" textAnchor="middle" fontSize="10" fill="#475569">Tool Kits</text>
      <text x="655" y="416" textAnchor="middle" fontSize="10" fill="#475569">AgentExecutor</text>
      <path d="M570 340 L500 310" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ov-arrow)" />

      {/* 底部：设计理念 */}
      <text x="400" y="486" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心设计理念</text>

      <rect x="40" y="500" width="180" height="56" rx="8" fill="url(#lcp-ov-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="520" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">标准化抽象</text>
      <text x="130" y="538" textAnchor="middle" fontSize="9" fill="#475569">统一接口封装异构模型</text>

      <rect x="240" y="500" width="180" height="56" rx="8" fill="url(#lcp-ov-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="330" y="520" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">模块化组合</text>
      <text x="330" y="538" textAnchor="middle" fontSize="9" fill="#475569">组件可插拔自由编排</text>

      <rect x="440" y="500" width="160" height="56" rx="8" fill="url(#lcp-ov-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="520" y="520" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">LCEL 表达式</text>
      <text x="520" y="538" textAnchor="middle" fontSize="9" fill="#475569">管道语法流式原生</text>

      <rect x="620" y="500" width="140" height="56" rx="8" fill="url(#lcp-ov-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="690" y="520" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">生态集成</text>
      <text x="690" y="538" textAnchor="middle" fontSize="9" fill="#475569">数百种工具集成</text>
    </svg>
  );
}
