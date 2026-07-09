"use client";

export function LaeAgentDevelopmentDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Agent开发实践核心循环与组件架构">
      <defs>
        <linearGradient id="lae-ag-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lae-ag-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lae-ag-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lae-ag-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lae-ag-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Agent开发实践：感知-规划-行动循环</text>

      {/* 上半：Agent核心循环 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Agent核心执行循环 (ReAct模式)</text>

      <rect x="100" y="80" width="160" height="66" rx="8" fill="url(#lae-ag-blue)" opacity="0.9" />
      <text x="180" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">思考 Thought</text>
      <text x="180" y="122" textAnchor="middle" fontSize="10" fill="#bfdbfe">分析当前状态</text>
      <text x="180" y="136" textAnchor="middle" fontSize="10" fill="#bfdbfe">推理下一步</text>

      <path d="M260 113 L290 113" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ag-arrow)" />

      <rect x="295" y="80" width="160" height="66" rx="8" fill="url(#lae-ag-purple)" opacity="0.9" />
      <text x="375" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">行动 Action</text>
      <text x="375" y="122" textAnchor="middle" fontSize="10" fill="#ede9fe">调用工具/API</text>
      <text x="375" y="136" textAnchor="middle" fontSize="10" fill="#ede9fe">执行具体操作</text>

      <path d="M455 113 L485 113" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ag-arrow)" />

      <rect x="490" y="80" width="160" height="66" rx="8" fill="url(#lae-ag-amber)" opacity="0.9" />
      <text x="570" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">观察 Observation</text>
      <text x="570" y="122" textAnchor="middle" fontSize="10" fill="#fef3c7">获取工具返回</text>
      <text x="570" y="136" textAnchor="middle" fontSize="10" fill="#fef3c7">更新记忆</text>

      {/* 循环箭头 */}
      <path d="M570 80 Q570 50 375 50 Q180 50 180 80" stroke="#dc2626" strokeWidth="2" fill="none" strokeDasharray="5,3" markerEnd="url(#lae-ag-arrow)" />
      <text x="375" y="44" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="600">循环直至任务完成</text>

      {/* 中部：Agent四大核心组件 */}
      <text x="400" y="178" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Agent四大核心组件</text>

      <rect x="30" y="192" width="175" height="120" rx="8" fill="url(#lae-ag-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="117" y="214" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">规划器 Planner</text>
      <text x="117" y="236" textAnchor="middle" fontSize="10" fill="#475569">任务分解</text>
      <text x="117" y="252" textAnchor="middle" fontSize="10" fill="#475569">步骤排序</text>
      <text x="117" y="268" textAnchor="middle" fontSize="10" fill="#475569">目标导向推理</text>
      <text x="117" y="284" textAnchor="middle" fontSize="10" fill="#475569">动态调整计划</text>
      <text x="117" y="302" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">LLM驱动决策</text>

      <rect x="215" y="192" width="175" height="120" rx="8" fill="url(#lae-ag-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="302" y="214" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">记忆 Memory</text>
      <text x="302" y="236" textAnchor="middle" fontSize="10" fill="#475569">短期：对话历史</text>
      <text x="302" y="252" textAnchor="middle" fontSize="10" fill="#475569">长期：向量存储</text>
      <text x="302" y="268" textAnchor="middle" fontSize="10" fill="#475569">工作记忆：当前状态</text>
      <text x="302" y="284" textAnchor="middle" fontSize="10" fill="#475569">检索相关经验</text>
      <text x="302" y="302" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">上下文管理</text>

      <rect x="400" y="192" width="175" height="120" rx="8" fill="url(#lae-ag-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="214" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">工具 Tools</text>
      <text x="487" y="236" textAnchor="middle" fontSize="10" fill="#475569">搜索/计算器</text>
      <text x="487" y="252" textAnchor="middle" fontSize="10" fill="#475569">代码执行</text>
      <text x="487" y="268" textAnchor="middle" fontSize="10" fill="#475569">数据库查询</text>
      <text x="487" y="284" textAnchor="middle" fontSize="10" fill="#475569">API调用</text>
      <text x="487" y="302" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">能力扩展接口</text>

      <rect x="585" y="192" width="175" height="120" rx="8" fill="url(#lae-ag-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="672" y="214" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">执行器 Executor</text>
      <text x="672" y="236" textAnchor="middle" fontSize="10" fill="#475569">调度工具调用</text>
      <text x="672" y="252" textAnchor="middle" fontSize="10" fill="#475569">参数提取</text>
      <text x="672" y="268" textAnchor="middle" fontSize="10" fill="#475569">结果解析</text>
      <text x="672" y="284" textAnchor="middle" fontSize="10" fill="#475569">错误处理</text>
      <text x="672" y="302" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">行动落地</text>

      {/* 下半：Agent类型 */}
      <text x="400" y="338" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Agent架构模式</text>

      <rect x="30" y="352" width="175" height="76" rx="8" fill="url(#lae-ag-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="117" y="374" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">ReAct</text>
      <text x="117" y="394" textAnchor="middle" fontSize="10" fill="#475569">推理+行动交替</text>
      <text x="117" y="410" textAnchor="middle" fontSize="10" fill="#475569">通用任务解决</text>
      <text x="117" y="422" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">最经典模式</text>

      <rect x="215" y="352" width="175" height="76" rx="8" fill="url(#lae-ag-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="302" y="374" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">Plan-and-Execute</text>
      <text x="302" y="394" textAnchor="middle" fontSize="10" fill="#475569">先规划再执行</text>
      <text x="302" y="410" textAnchor="middle" fontSize="10" fill="#475569">减少LLM调用</text>
      <text x="302" y="422" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">成本优化</text>

      <rect x="400" y="352" width="175" height="76" rx="8" fill="url(#lae-ag-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="374" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">多Agent协作</text>
      <text x="487" y="394" textAnchor="middle" fontSize="10" fill="#475569">角色分工合作</text>
      <text x="487" y="410" textAnchor="middle" fontSize="10" fill="#475569">讨论/审查/汇总</text>
      <text x="487" y="422" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">复杂任务</text>

      <rect x="585" y="352" width="175" height="76" rx="8" fill="url(#lae-ag-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="672" y="374" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">Function Calling</text>
      <text x="672" y="394" textAnchor="middle" fontSize="10" fill="#475569">结构化工具调用</text>
      <text x="672" y="410" textAnchor="middle" fontSize="10" fill="#475569">模型原生支持</text>
      <text x="672" y="422" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">最可靠方案</text>

      {/* 关键挑战 */}
      <rect x="30" y="444" width="740" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="466" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Agent开发关键挑战</text>
      <text x="400" y="486" textAnchor="middle" fontSize="11" fill="#475569">循环控制(防止无限循环) / 错误恢复 / 上下文窗口管理 / 工具选择准确性 / 成本控制</text>

      {/* 底部总结 */}
      <rect x="30" y="514" width="740" height="46" rx="8" fill="url(#lae-ag-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="536" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">Agent = LLM(大脑) + 规划(决策) + 记忆(经验) + 工具(手脚) + 循环(自主)</text>
      <text x="400" y="552" textAnchor="middle" fontSize="10" fill="#475569">从被动问答到主动执行：Agent是大模型从"回答者"到"行动者"的关键跃迁</text>
    </svg>
  );
}
