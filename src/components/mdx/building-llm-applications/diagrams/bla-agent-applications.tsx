"use client";

export function BlaAgentApplicationsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Agent应用构建：推理循环与工具调用架构">
      <defs>
        <linearGradient id="bla-ag-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bla-ag-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bla-ag-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bla-ag-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bla-ag-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bla-ag-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Agent应用构建</text>

      {/* 核心推理循环 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Agent 核心推理循环</text>

      {/* 中心：LLM 大脑 */}
      <rect x="310" y="200" width="180" height="100" rx="12" fill="url(#bla-ag-purple)" opacity="0.9" />
      <text x="400" y="232" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">LLM 大脑</text>
      <text x="400" y="252" textAnchor="middle" fontSize="11" fill="#ede9fe">推理 / 决策 / 规划</text>
      <text x="400" y="270" textAnchor="middle" fontSize="10" fill="#ede9fe">ReAct / Plan-Execute</text>
      <text x="400" y="286" textAnchor="middle" fontSize="9" fill="#c4b5fd">Function Calling</text>

      {/* 上方：感知输入 */}
      <rect x="310" y="86" width="180" height="56" rx="10" fill="url(#bla-ag-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">感知</text>
      <text x="400" y="128" textAnchor="middle" fontSize="9" fill="#475569">用户任务 / 环境状态</text>

      <path d="M400 146 L400 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ag-arrow)" />

      {/* 左侧：记忆 */}
      <rect x="60" y="210" width="150" height="80" rx="10" fill="url(#bla-ag-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="135" y="234" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">记忆</text>
      <text x="135" y="252" textAnchor="middle" fontSize="9" fill="#475569">短期：对话历史</text>
      <text x="135" y="268" textAnchor="middle" fontSize="9" fill="#475569">长期：向量存储</text>
      <text x="135" y="282" textAnchor="middle" fontSize="9" fill="#64748b">经验积累</text>

      <path d="M214 250 L306 250" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ag-arrow)" />
      <path d="M306 260 L214 260" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ag-arrow)" />

      {/* 右侧：工具集 */}
      <rect x="590" y="210" width="150" height="80" rx="10" fill="url(#bla-ag-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="665" y="234" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">工具集</text>
      <text x="665" y="252" textAnchor="middle" fontSize="9" fill="#475569">搜索 / 计算</text>
      <text x="665" y="268" textAnchor="middle" fontSize="9" fill="#475569">API / 代码执行</text>
      <text x="665" y="282" textAnchor="middle" fontSize="9" fill="#64748b">数据库查询</text>

      <path d="M494 250 L586 250" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ag-arrow)" />
      <path d="M586 260 L494 260" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ag-arrow)" />

      {/* 下方：行动输出 */}
      <path d="M400 302 L400 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ag-arrow)" />

      <rect x="250" y="324" width="300" height="56" rx="10" fill="url(#bla-ag-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">行动</text>
      <text x="400" y="366" textAnchor="middle" fontSize="9" fill="#475569">工具调用 / 回复用户 / 观察结果</text>

      {/* 观察反馈回环 */}
      <path d="M250 352 Q160 352 160 300 Q160 250 210 250" stroke="#64748b" strokeWidth="2" strokeDasharray="5 3" fill="none" markerEnd="url(#bla-ag-arrow)" />
      <text x="130" y="310" textAnchor="middle" fontSize="9" fill="#64748b">观察反馈</text>

      {/* 下半部分：Agent 类型 */}
      <text x="400" y="412" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Agent 类型与适用场景</text>

      <rect x="30" y="426" width="170" height="68" rx="8" fill="url(#bla-ag-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="115" y="448" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">ReAct Agent</text>
      <text x="115" y="466" textAnchor="middle" fontSize="9" fill="#475569">推理-行动交替</text>
      <text x="115" y="482" textAnchor="middle" fontSize="9" fill="#64748b">通用任务首选</text>

      <rect x="216" y="426" width="170" height="68" rx="8" fill="url(#bla-ag-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="301" y="448" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">Plan-and-Execute</text>
      <text x="301" y="466" textAnchor="middle" fontSize="9" fill="#475569">先规划再执行</text>
      <text x="301" y="482" textAnchor="middle" fontSize="9" fill="#64748b">复杂多步任务</text>

      <rect x="402" y="426" width="170" height="68" rx="8" fill="url(#bla-ag-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="448" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Multi-Agent</text>
      <text x="487" y="466" textAnchor="middle" fontSize="9" fill="#475569">多Agent协作</text>
      <text x="487" y="482" textAnchor="middle" fontSize="9" fill="#64748b">角色分工系统</text>

      <rect x="588" y="426" width="182" height="68" rx="8" fill="url(#bla-ag-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="679" y="448" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">Custom Agent</text>
      <text x="679" y="466" textAnchor="middle" fontSize="9" fill="#475569">自定义循环</text>
      <text x="679" y="482" textAnchor="middle" fontSize="9" fill="#64748b">特殊需求场景</text>

      {/* 底部：Agent 设计要点 */}
      <rect x="30" y="510" width="740" height="56" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="532" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Agent 设计要点</text>
      <text x="50" y="552" fontSize="10" fill="#475569">工具描述清晰 → 控制循环次数 → 错误处理与重试 → 结果验证 → 成本与延迟可控 → 人在回路兜底</text>
    </svg>
  );
}
