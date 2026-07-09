"use client";

export function CgptPluginToolsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="插件与工具调用 Function Calling工具循环">
      <defs>
        <linearGradient id="cpp-pl-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cpp-pl-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="cpp-pl-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cpp-pl-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="cpp-pl-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="cpp-pl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">插件与工具调用 · 让模型长出手脚</text>

      {/* 工具调用循环 */}
      <text x="400" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">工具调用循环 Tool-Use Loop</text>

      <rect x="60" y="72" width="200" height="64" rx="10" fill="url(#cpp-pl-blue)" opacity="0.9" />
      <text x="160" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">用户提问</text>
      <text x="160" y="120" textAnchor="middle" fontSize="10" fill="#bfdbfe">需要外部能力</text>

      <path d="M260 104 L284 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pl-arrow)" />

      <rect x="288" y="72" width="224" height="64" rx="10" fill="url(#cpp-pl-purple)" opacity="0.9" />
      <text x="400" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">LLM 推理决策</text>
      <text x="400" y="120" textAnchor="middle" fontSize="10" fill="#ede9fe">判断是否调工具 / 调哪个</text>

      <path d="M512 104 L536 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pl-arrow)" />

      <rect x="540" y="72" width="200" height="64" rx="10" fill="url(#cpp-pl-amber)" opacity="0.9" />
      <text x="640" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">调用工具</text>
      <text x="640" y="120" textAnchor="middle" fontSize="10" fill="#fef3c7">生成结构化参数</text>

      <path d="M640 136 L640 168" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pl-arrow)" />

      <rect x="540" y="172" width="200" height="64" rx="10" fill="url(#cpp-pl-green)" opacity="0.9" />
      <text x="640" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">执行工具</text>
      <text x="640" y="220" textAnchor="middle" fontSize="10" fill="#d1fae5">真实 API 调用</text>

      <path d="M540 204 L516 204" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pl-arrow)" />

      <rect x="288" y="172" width="224" height="64" rx="10" fill="url(#cpp-pl-red)" opacity="0.9" />
      <text x="400" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">观察结果回传</text>
      <text x="400" y="220" textAnchor="middle" fontSize="10" fill="#fecaca">工具输出注入上下文</text>

      <path d="M288 204 L264 204" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pl-arrow)" />

      <rect x="60" y="172" width="200" height="64" rx="10" fill="url(#cpp-pl-blue)" opacity="0.9" />
      <text x="160" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">继续推理或回答</text>
      <text x="160" y="220" textAnchor="middle" fontSize="10" fill="#bfdbfe">信息够则输出答案</text>

      {/* 回环箭头 */}
      <path d="M160 236 L160 252 L400 252 L400 236" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5,3" fill="none" markerEnd="url(#cpp-pl-arrow)" />
      <text x="280" y="270" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">循环直至信息充足</text>

      <path d="M400 276 L400 284" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pl-arrow)" />

      {/* Function Calling 结构 */}
      <text x="400" y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Function Calling 结构化调用</text>

      <rect x="60" y="324" width="680" height="110" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">工具声明（JSON Schema）：name / description / parameters</text>
      <text x="400" y="370" textAnchor="middle" fontSize="11" fill="#475569">模型输出：选择哪个工具 + 填充结构化参数（无需正则解析）</text>
      <text x="400" y="392" textAnchor="middle" fontSize="11" fill="#475569">应用执行：拿到参数调用真实函数，把返回值回传模型</text>
      <text x="400" y="414" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">并行调用：一次可请求多个工具，降低往返延迟</text>

      <path d="M400 434 L400 442" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pl-arrow)" />

      {/* 典型工具 */}
      <text x="400" y="470" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">典型工具生态</text>

      <rect x="40" y="482" width="180" height="56" rx="8" fill="url(#cpp-pl-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="130" y="506" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">检索类</text>
      <text x="130" y="526" textAnchor="middle" fontSize="10" fill="#475569">搜索 / 知识库</text>

      <rect x="232" y="482" width="180" height="56" rx="8" fill="url(#cpp-pl-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="322" y="506" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">执行类</text>
      <text x="322" y="526" textAnchor="middle" fontSize="10" fill="#475569">代码 / API / 数据库</text>

      <rect x="424" y="482" width="180" height="56" rx="8" fill="url(#cpp-pl-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="514" y="506" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">感知类</text>
      <text x="514" y="526" textAnchor="middle" fontSize="10" fill="#475569">视觉 / 语音 / 浏览</text>

      <rect x="616" y="482" width="144" height="56" rx="8" fill="url(#cpp-pl-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="688" y="506" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">安全</text>
      <text x="688" y="526" textAnchor="middle" fontSize="10" fill="#475569">权限校验沙箱</text>
    </svg>
  );
}
