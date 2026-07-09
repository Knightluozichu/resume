"use client";

export function LcpToolsAgentsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="工具与智能体 Agent执行循环">
      <defs>
        <linearGradient id="lcp-ta-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lcp-ta-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lcp-ta-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lcp-ta-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="lcp-ta-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="lcp-ta-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">工具与智能体：Agent 执行循环</text>

      {/* 中心：AgentExecutor 循环 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">AgentExecutor 执行循环</text>

      {/* 循环框 */}
      <rect x="250" y="76" width="300" height="200" rx="12" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" />

      {/* 中心 Agent */}
      <rect x="320" y="146" width="160" height="60" rx="10" fill="url(#lcp-ta-red)" opacity="0.95" />
      <text x="400" y="172" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Agent (LLM)</text>
      <text x="400" y="192" textAnchor="middle" fontSize="10" fill="#fecaca">思考 + 决策</text>

      {/* 观察 → 思考 → 行动 → 观察 循环 */}
      <rect x="280" y="86" width="120" height="40" rx="8" fill="url(#lcp-ta-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="340" y="111" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">Thought 思考</text>

      <path d="M400 106 L460 146" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ta-arrow)" />

      <rect x="400" y="86" width="120" height="40" rx="8" fill="url(#lcp-ta-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="460" y="111" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">Action 行动</text>

      <path d="M460 126 L460 146" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ta-arrow)" />

      <rect x="400" y="226" width="120" height="40" rx="8" fill="url(#lcp-ta-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="460" y="251" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">Observation</text>

      <path d="M460 226 L460 206" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ta-arrow)" />

      <rect x="280" y="226" width="120" height="40" rx="8" fill="url(#lcp-ta-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="340" y="251" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">Tool 执行</text>

      <path d="M340 226 L340 206" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ta-arrow)" />
      <path d="M340 126 L340 146" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ta-arrow)" />

      {/* 左侧：输入输出 */}
      <rect x="30" y="96" width="160" height="50" rx="8" fill="url(#lcp-ta-blue)" opacity="0.95" />
      <text x="110" y="120" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">用户输入</text>
      <text x="110" y="138" textAnchor="middle" fontSize="9" fill="#bfdbfe">任务/问题</text>

      <path d="M190 121 L280 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ta-arrow)" />

      <rect x="30" y="196" width="160" height="50" rx="8" fill="url(#lcp-ta-green)" opacity="0.95" />
      <text x="110" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">最终输出</text>
      <text x="110" y="238" textAnchor="middle" fontSize="9" fill="#d1fae5">任务完成/答案</text>

      <path d="M280 246 L190 221" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ta-arrow)" />

      {/* 右侧：常用工具 */}
      <text x="640" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">常用工具</text>

      <rect x="570" y="92" width="200" height="40" rx="8" fill="url(#lcp-ta-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="670" y="117" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">Search 搜索引擎</text>

      <rect x="570" y="138" width="200" height="40" rx="8" fill="url(#lcp-ta-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="670" y="163" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">Calculator 计算器</text>

      <rect x="570" y="184" width="200" height="40" rx="8" fill="url(#lcp-ta-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="670" y="209" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">Python REPL 代码执行</text>

      <rect x="570" y="230" width="200" height="40" rx="8" fill="url(#lcp-ta-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="670" y="255" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">SQL Database 查询</text>

      <rect x="570" y="276" width="200" height="40" rx="8" fill="url(#lcp-ta-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="670" y="301" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">API Request HTTP请求</text>

      {/* 下部：Agent 类型对比 */}
      <text x="400" y="318" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Agent 类型对比</text>

      <rect x="30" y="332" width="240" height="100" rx="8" fill="url(#lcp-ta-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="356" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">ReAct Agent</text>
      <text x="150" y="376" textAnchor="middle" fontSize="9" fill="#475569">Reason + Act 交替执行</text>
      <text x="150" y="392" textAnchor="middle" fontSize="9" fill="#475569">Thought/Action/Observation</text>
      <text x="150" y="408" textAnchor="middle" fontSize="9" fill="#475569">通用性强，适合复杂推理</text>
      <text x="150" y="424" textAnchor="middle" fontSize="9" fill="#475569">缺点：轮次多 Token 消耗大</text>

      <rect x="285" y="332" width="240" height="100" rx="8" fill="url(#lcp-ta-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="405" y="356" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">OpenAI Functions</text>
      <text x="405" y="376" textAnchor="middle" fontSize="9" fill="#475569">Function Calling 原生</text>
      <text x="405" y="392" textAnchor="middle" fontSize="9" fill="#475569">结构化工具调用</text>
      <text x="405" y="408" textAnchor="middle" fontSize="9" fill="#475569">高效稳定，输出可靠</text>
      <text x="405" y="424" textAnchor="middle" fontSize="9" fill="#475569">缺点：依赖特定模型支持</text>

      <rect x="540" y="332" width="230" height="100" rx="8" fill="url(#lcp-ta-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="655" y="356" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">Tool Calling Agent</text>
      <text x="655" y="376" textAnchor="middle" fontSize="9" fill="#475569">新一代统一接口</text>
      <text x="655" y="392" textAnchor="middle" fontSize="9" fill="#475569">bind_tools + 调用</text>
      <text x="655" y="408" textAnchor="middle" fontSize="9" fill="#475569">支持并行工具调用</text>
      <text x="655" y="424" textAnchor="middle" fontSize="9" fill="#475569">推荐用于生产环境</text>

      {/* 底部总结 */}
      <rect x="30" y="452" width="740" height="90" rx="8" fill="url(#lcp-ta-red)" opacity="0.06" stroke="#dc2626" strokeWidth="2" />
      <text x="400" y="478" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">Agent 本质：LLM 作为推理引擎，自主选择工具、规划步骤、循环执行直到完成</text>
      <text x="400" y="500" textAnchor="middle" fontSize="10" fill="#475569">ReAct 循环：观察输入 → 思考策略 → 选择工具 → 执行行动 → 观察结果 → 继续或返回</text>
      <text x="400" y="520" textAnchor="middle" fontSize="10" fill="#475569">关键组件：Agent（决策器）+ Tools（工具集）+ AgentExecutor（执行循环+错误处理+最大轮次）</text>
    </svg>
  );
}
