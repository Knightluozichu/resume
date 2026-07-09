"use client";

export function BlaOrchestrationFrameworksDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="编排框架与LangChain：核心组件与链式架构">
      <defs>
        <linearGradient id="bla-of-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bla-of-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bla-of-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bla-of-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bla-of-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">编排框架与LangChain</text>

      {/* 上半部分：LangChain 六大核心组件 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">LangChain 六大核心组件</text>

      <rect x="30" y="76" width="228" height="80" rx="10" fill="url(#bla-of-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="144" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">Models</text>
      <text x="144" y="118" textAnchor="middle" fontSize="10" fill="#475569">LLM / ChatModel</text>
      <text x="144" y="134" textAnchor="middle" fontSize="10" fill="#475569">Embedding Model</text>
      <text x="144" y="148" textAnchor="middle" fontSize="9" fill="#64748b">模型抽象与统一接口</text>

      <rect x="272" y="76" width="228" height="80" rx="10" fill="url(#bla-of-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="386" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">Prompts</text>
      <text x="386" y="118" textAnchor="middle" fontSize="10" fill="#475569">PromptTemplate</text>
      <text x="386" y="134" textAnchor="middle" fontSize="10" fill="#475569">FewShot / Output Parser</text>
      <text x="386" y="148" textAnchor="middle" fontSize="9" fill="#64748b">提示模板与输出解析</text>

      <rect x="514" y="76" width="256" height="80" rx="10" fill="url(#bla-of-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="642" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Memory</text>
      <text x="642" y="118" textAnchor="middle" fontSize="10" fill="#475569">ConversationBufferMemory</text>
      <text x="642" y="134" textAnchor="middle" fontSize="10" fill="#475569">Summary / Window Memory</text>
      <text x="642" y="148" textAnchor="middle" fontSize="9" fill="#64748b">对话记忆与上下文管理</text>

      <rect x="30" y="164" width="228" height="80" rx="10" fill="url(#bla-of-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="144" y="188" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">Chains</text>
      <text x="144" y="206" textAnchor="middle" fontSize="10" fill="#475569">LLMChain / Sequential</text>
      <text x="144" y="222" textAnchor="middle" fontSize="10" fill="#475569">Router / Transform</text>
      <text x="144" y="236" textAnchor="middle" fontSize="9" fill="#64748b">链式调用编排</text>

      <rect x="272" y="164" width="228" height="80" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="386" y="188" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">Agents</text>
      <text x="386" y="206" textAnchor="middle" fontSize="10" fill="#475569">ReAct / OpenAI Functions</text>
      <text x="386" y="222" textAnchor="middle" fontSize="10" fill="#475569">Self-Ask / Plan-and-Execute</text>
      <text x="386" y="236" textAnchor="middle" fontSize="9" fill="#64748b">自主决策与工具选择</text>

      <rect x="514" y="164" width="256" height="80" rx="10" fill="#f5f3ff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="642" y="188" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">Retrievers</text>
      <text x="642" y="206" textAnchor="middle" fontSize="10" fill="#475569">VectorStore Retriever</text>
      <text x="642" y="222" textAnchor="middle" fontSize="10" fill="#475569">Multi-Query / Compression</text>
      <text x="642" y="236" textAnchor="middle" fontSize="9" fill="#64748b">检索器与RAG集成</text>

      {/* 中间：链式调用流程 */}
      <text x="400" y="272" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">链式调用流程示例</text>

      <rect x="40" y="286" width="110" height="56" rx="8" fill="url(#bla-of-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="95" y="310" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">用户输入</text>
      <text x="95" y="326" textAnchor="middle" fontSize="9" fill="#64748b">Input</text>

      <path d="M154 314 L172 314" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-of-arrow)" />

      <rect x="176" y="286" width="110" height="56" rx="8" fill="url(#bla-of-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="231" y="310" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">Prompt模板</text>
      <text x="231" y="326" textAnchor="middle" fontSize="9" fill="#64748b">Template</text>

      <path d="M290 314 L308 314" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-of-arrow)" />

      <rect x="312" y="286" width="110" height="56" rx="8" fill="url(#bla-of-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="367" y="310" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">LLM调用</text>
      <text x="367" y="326" textAnchor="middle" fontSize="9" fill="#64748b">Model</text>

      <path d="M426 314 L444 314" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-of-arrow)" />

      <rect x="448" y="286" width="110" height="56" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <text x="503" y="310" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">输出解析</text>
      <text x="503" y="326" textAnchor="middle" fontSize="9" fill="#64748b">Parser</text>

      <path d="M562 314 L580 314" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-of-arrow)" />

      <rect x="584" y="286" width="110" height="56" rx="8" fill="url(#bla-of-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="639" y="310" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">记忆更新</text>
      <text x="639" y="326" textAnchor="middle" fontSize="9" fill="#64748b">Memory</text>

      <path d="M698 314 L716 314" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-of-arrow)" />

      <rect x="720" y="286" width="50" height="56" rx="8" fill="url(#bla-of-green)" opacity="0.2" stroke="#059669" strokeWidth="2" />
      <text x="745" y="320" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">输出</text>

      {/* 下半部分：LCEL 表达式语法 */}
      <text x="400" y="372" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">LangChain Expression Language (LCEL)</text>

      <rect x="60" y="386" width="680" height="68" rx="10" fill="#1e293b" />
      <text x="80" y="410" fontSize="11" fill="#93c5fd" fontFamily="monospace">chain = prompt | model | output_parser</text>
      <text x="80" y="428" fontSize="11" fill="#93c5fd" fontFamily="monospace">result = chain.invoke(&#123;"input": "... "&#125;)</text>
      <text x="80" y="446" fontSize="10" fill="#94a3b8">用管道符 | 串联组件，支持流式 / 批量 / 异步调用</text>

      {/* 底部：编排框架对比 */}
      <text x="400" y="482" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">编排框架对比</text>

      <rect x="40" y="496" width="228" height="64" rx="8" fill="url(#bla-of-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="154" y="518" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">LangChain</text>
      <text x="154" y="536" textAnchor="middle" fontSize="9" fill="#475569">生态最全，组件丰富</text>
      <text x="154" y="550" textAnchor="middle" fontSize="9" fill="#64748b">适合快速原型与Agent</text>

      <rect x="286" y="496" width="228" height="64" rx="8" fill="url(#bla-of-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="518" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">LlamaIndex</text>
      <text x="400" y="536" textAnchor="middle" fontSize="9" fill="#475569">RAG 专精，数据连接强</text>
      <text x="400" y="550" textAnchor="middle" fontSize="9" fill="#64748b">适合文档检索与知识库</text>

      <rect x="532" y="496" width="228" height="64" rx="8" fill="url(#bla-of-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="646" y="518" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">Haystack</text>
      <text x="646" y="536" textAnchor="middle" fontSize="9" fill="#475569">Pipeline 设计，类型安全</text>
      <text x="646" y="550" textAnchor="middle" fontSize="9" fill="#64748b">适合生产级 RAG 系统</text>
    </svg>
  );
}
