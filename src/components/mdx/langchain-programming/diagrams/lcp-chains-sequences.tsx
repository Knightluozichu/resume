"use client";

export function LcpChainsSequencesDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="链与序列操作 Chain类型与组合模式">
      <defs>
        <linearGradient id="lcp-cs-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lcp-cs-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lcp-cs-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lcp-cs-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lcp-cs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">链与序列操作：Chain 类型与组合</text>

      {/* 上部：LLMChain 基本结构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">LLMChain：最基础的链结构</text>

      <rect x="30" y="76" width="160" height="70" rx="8" fill="url(#lcp-cs-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="110" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">PromptTemplate</text>
      <text x="110" y="118" textAnchor="middle" fontSize="9" fill="#475569">格式化输入</text>
      <text x="110" y="134" textAnchor="middle" fontSize="9" fill="#475569">变量填充</text>

      <path d="M190 111 L230 111" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-cs-arrow)" />

      <rect x="235" y="76" width="140" height="70" rx="8" fill="url(#lcp-cs-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="305" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">LLM / ChatModel</text>
      <text x="305" y="118" textAnchor="middle" fontSize="9" fill="#475569">模型推理</text>
      <text x="305" y="134" textAnchor="middle" fontSize="9" fill="#475569">生成响应</text>

      <path d="M375 111 L415 111" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-cs-arrow)" />

      <rect x="420" y="76" width="160" height="70" rx="8" fill="url(#lcp-cs-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">OutputParser</text>
      <text x="500" y="118" textAnchor="middle" fontSize="9" fill="#475569">解析输出</text>
      <text x="500" y="134" textAnchor="middle" fontSize="9" fill="#475569">结构化结果</text>

      <path d="M580 111 L620 111" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-cs-arrow)" />

      <rect x="625" y="76" width="140" height="70" rx="8" fill="url(#lcp-cs-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="695" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">最终输出</text>
      <text x="695" y="118" textAnchor="middle" fontSize="9" fill="#475569">文本/JSON</text>
      <text x="695" y="134" textAnchor="middle" fontSize="9" fill="#475569">结构化对象</text>

      {/* 中部：序列链 */}
      <text x="400" y="180" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">SequentialChain：链的串行组合</text>

      <rect x="30" y="194" width="150" height="80" rx="8" fill="url(#lcp-cs-blue)" opacity="0.95" />
      <text x="105" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Chain 1</text>
      <text x="105" y="238" textAnchor="middle" fontSize="9" fill="#bfdbfe">输入 → 输出A</text>
      <text x="105" y="256" textAnchor="middle" fontSize="9" fill="#bfdbfe">如：问题分析</text>

      <path d="M180 234 L215 234" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-cs-arrow)" />

      <rect x="220" y="194" width="150" height="80" rx="8" fill="url(#lcp-cs-purple)" opacity="0.95" />
      <text x="295" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Chain 2</text>
      <text x="295" y="238" textAnchor="middle" fontSize="9" fill="#ede9fe">输出A → 输出B</text>
      <text x="295" y="256" textAnchor="middle" fontSize="9" fill="#ede9fe">如：信息检索</text>

      <path d="M370 234 L405 234" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-cs-arrow)" />

      <rect x="410" y="194" width="150" height="80" rx="8" fill="url(#lcp-cs-amber)" opacity="0.95" />
      <text x="485" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Chain 3</text>
      <text x="485" y="238" textAnchor="middle" fontSize="9" fill="#fef3c7">输出B → 输出C</text>
      <text x="485" y="256" textAnchor="middle" fontSize="9" fill="#fef3c7">如：答案生成</text>

      <path d="M560 234 L595 234" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-cs-arrow)" />

      <rect x="600" y="194" width="160" height="80" rx="8" fill="url(#lcp-cs-green)" opacity="0.95" />
      <text x="680" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">最终输出</text>
      <text x="680" y="238" textAnchor="middle" fontSize="9" fill="#d1fae5">综合结果</text>
      <text x="680" y="256" textAnchor="middle" fontSize="9" fill="#d1fae5">多步推理答案</text>

      {/* 下部：LCEL 管道语法 */}
      <text x="400" y="304" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">LCEL 管道语法（推荐）</text>

      <rect x="30" y="318" width="740" height="90" rx="8" fill="#0f172a" />
      <text x="50" y="346" fontSize="12" fontFamily="monospace" fill="#7dd3fc">chain = prompt | model | output_parser</text>
      <text x="50" y="372" fontSize="12" fontFamily="monospace" fill="#7dd3fc">result = chain.invoke("input")</text>
      <text x="50" y="394" fontSize="11" fontFamily="monospace" fill="#86efac"># | 管道符连接 Runnable 组件，自动传递数据</text>

      {/* 底部：链类型对比 */}
      <text x="400" y="434" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">链类型对比</text>

      <rect x="30" y="448" width="230" height="100" rx="8" fill="url(#lcp-cs-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="472" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">LLMChain</text>
      <text x="145" y="492" textAnchor="middle" fontSize="9" fill="#475569">单步：提示+模型+解析</text>
      <text x="145" y="510" textAnchor="middle" fontSize="9" fill="#475569">最简链，适合单轮任务</text>
      <text x="145" y="528" textAnchor="middle" fontSize="9" fill="#475569">已被 LCEL 管道替代</text>

      <rect x="275" y="448" width="230" height="100" rx="8" fill="url(#lcp-cs-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="390" y="472" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">SequentialChain</text>
      <text x="390" y="492" textAnchor="middle" fontSize="9" fill="#475569">串行：多链顺序执行</text>
      <text x="390" y="510" textAnchor="middle" fontSize="9" fill="#475569">前链输出作为后链输入</text>
      <text x="390" y="528" textAnchor="middle" fontSize="9" fill="#475569">需管理输入输出键名</text>

      <rect x="520" y="448" width="250" height="100" rx="8" fill="url(#lcp-cs-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="645" y="472" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">LCEL 管道（推荐）</text>
      <text x="645" y="492" textAnchor="middle" fontSize="9" fill="#475569">管道：Runnable | 连接</text>
      <text x="645" y="510" textAnchor="middle" fontSize="9" fill="#475569">原生流式/异步/批量</text>
      <text x="645" y="528" textAnchor="middle" fontSize="9" fill="#475569">可组合可追溯</text>
    </svg>
  );
}
