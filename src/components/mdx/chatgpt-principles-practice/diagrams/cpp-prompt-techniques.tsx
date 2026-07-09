"use client";

export function CppPromptTechniquesDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="高级提示技巧 Zero-shot Few-shot CoT ToT ReAct 自洽">
      <defs>
        <linearGradient id="cpp-pt2-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cpp-pt2-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="cpp-pt2-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cpp-pt2-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="cpp-pt2-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="cpp-pt2-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">高级提示技巧 · 提示工程进阶阶梯</text>

      {/* 能力进阶阶梯 */}
      <text x="400" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">由易到难 · 能力递进</text>

      <rect x="40" y="72" width="145" height="100" rx="10" fill="url(#cpp-pt2-blue)" opacity="0.9" />
      <text x="112" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Zero-shot</text>
      <text x="112" y="120" textAnchor="middle" fontSize="10" fill="#bfdbfe">零样本</text>
      <text x="112" y="142" textAnchor="middle" fontSize="10" fill="#bfdbfe">直接提问</text>
      <text x="112" y="160" textAnchor="middle" fontSize="10" fill="#bfdbfe">依赖模型能力</text>

      <path d="M185 122 L203 122" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pt2-arrow)" />

      <rect x="207" y="72" width="145" height="100" rx="10" fill="url(#cpp-pt2-purple)" opacity="0.9" />
      <text x="280" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Few-shot</text>
      <text x="280" y="120" textAnchor="middle" fontSize="10" fill="#ede9fe">少样本</text>
      <text x="280" y="142" textAnchor="middle" fontSize="10" fill="#ede9fe">给几个示例</text>
      <text x="280" y="160" textAnchor="middle" fontSize="10" fill="#ede9fe">示范输出格式</text>

      <path d="M352 122 L370 122" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pt2-arrow)" />

      <rect x="374" y="72" width="145" height="100" rx="10" fill="url(#cpp-pt2-amber)" opacity="0.9" />
      <text x="447" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">CoT</text>
      <text x="447" y="120" textAnchor="middle" fontSize="10" fill="#fef3c7">链式思考</text>
      <text x="447" y="142" textAnchor="middle" fontSize="10" fill="#fef3c7">一步步推理</text>
      <text x="447" y="160" textAnchor="middle" fontSize="10" fill="#fef3c7">显式中间步骤</text>

      <path d="M519 122 L537 122" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pt2-arrow)" />

      <rect x="541" y="72" width="219" height="100" rx="10" fill="url(#cpp-pt2-green)" opacity="0.9" />
      <text x="650" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">ToT / ReAct / 自洽</text>
      <text x="650" y="120" textAnchor="middle" fontSize="10" fill="#d1fae5">树形思考 / 推理行动</text>
      <text x="650" y="142" textAnchor="middle" fontSize="10" fill="#d1fae5">多路径探索</text>
      <text x="650" y="160" textAnchor="middle" fontSize="10" fill="#d1fae5">外部工具协作</text>

      <path d="M400 172 L400 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pt2-arrow)" />

      {/* 三大高阶技巧详解 */}
      <text x="400" y="208" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三大高阶技巧</text>

      <rect x="40" y="220" width="235" height="170" rx="10" fill="url(#cpp-pt2-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="158" y="244" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">CoT 思维链</text>
      <text x="158" y="268" textAnchor="middle" fontSize="10" fill="#475569">触发：让我们一步步思考</text>
      <text x="158" y="288" textAnchor="middle" fontSize="10" fill="#475569">原理：引导模型展开</text>
      <text x="158" y="304" textAnchor="middle" fontSize="10" fill="#475569">中间推理过程</text>
      <text x="158" y="328" textAnchor="middle" fontSize="10" fill="#475569">Zero-shot-CoT：一句</text>
      <text x="158" y="344" textAnchor="middle" fontSize="10" fill="#475569">魔法提示即可触发</text>
      <text x="158" y="368" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">数学/逻辑/多步推理</text>
      <text x="158" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">效果显著提升</text>

      <rect x="283" y="220" width="235" height="170" rx="10" fill="url(#cpp-pt2-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="244" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">ReAct 推理+行动</text>
      <text x="400" y="268" textAnchor="middle" fontSize="10" fill="#475569">Thought 推理</text>
      <text x="400" y="284" textAnchor="middle" fontSize="10" fill="#475569">Action 调用工具</text>
      <text x="400" y="300" textAnchor="middle" fontSize="10" fill="#475569">Observation 观察结果</text>
      <text x="400" y="324" textAnchor="middle" fontSize="10" fill="#475569">循环直至得出答案</text>
      <text x="400" y="348" textAnchor="middle" fontSize="10" fill="#475569">推理与行动交替</text>
      <text x="400" y="372" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">结合内部推理与</text>
      <text x="400" y="388" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">外部工具/知识</text>

      <rect x="526" y="220" width="234" height="170" rx="10" fill="url(#cpp-pt2-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="643" y="244" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">自洽 Self-Consistency</text>
      <text x="643" y="268" textAnchor="middle" fontSize="10" fill="#475569">同一问题多次采样</text>
      <text x="643" y="288" textAnchor="middle" fontSize="10" fill="#475569">生成多条推理路径</text>
      <text x="643" y="308" textAnchor="middle" fontSize="10" fill="#475569">投票选最常见答案</text>
      <text x="643" y="332" textAnchor="middle" fontSize="10" fill="#475569">用多样性消除误差</text>
      <text x="643" y="356" textAnchor="middle" fontSize="10" fill="#475569">温度调高增多样性</text>
      <text x="643" y="380" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">以算力换准确率</text>

      <path d="M400 390 L400 398" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pt2-arrow)" />

      {/* 提示工程原则 */}
      <rect x="60" y="408" width="680" height="120" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="432" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">提示工程四原则</text>
      <text x="400" y="458" textAnchor="middle" fontSize="11" fill="#475569">明确具体：角色 + 任务 + 约束 + 输出格式</text>
      <text x="400" y="480" textAnchor="middle" fontSize="11" fill="#475569">结构清晰：分隔符划分输入 / 分点列举 / 模板化</text>
      <text x="400" y="502" textAnchor="middle" fontSize="11" fill="#475569">引导推理：复杂任务先拆解再 CoT 逐步推理</text>
      <text x="400" y="522" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">迭代优化：改提示 → 测试 → 对比 → 沉淀最佳实践</text>
    </svg>
  );
}
