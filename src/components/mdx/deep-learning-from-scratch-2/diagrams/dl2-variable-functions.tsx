"use client";

export function Dl2VariableFunctionsDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="Variable与Function计算图连接机制">
      <defs>
        <linearGradient id="dl2-vf-var" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dl2-vf-func" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dl2-vf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="dl2-vf-creator" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">Variable 与 Function 的计算图连接</text>

      {/* 计算图示例：x → square → a → exp → b */}
      {/* x */}
      <rect x="60" y="80" width="100" height="50" rx="10" fill="url(#dl2-vf-var)" opacity="0.92" />
      <text x="110" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Variable</text>
      <text x="110" y="120" textAnchor="middle" fontSize="11" fill="#bfdbfe">x (data=2.0)</text>

      <path d="M160 105 L230 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-vf-arrow)" />
      <text x="195" y="98" textAnchor="middle" fontSize="9" fill="#475569">input</text>

      {/* square */}
      <rect x="230" y="80" width="100" height="50" rx="10" fill="url(#dl2-vf-func)" opacity="0.92" />
      <text x="280" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Function</text>
      <text x="280" y="120" textAnchor="middle" fontSize="11" fill="#e9d5ff">square</text>

      <path d="M330 105 L400 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-vf-arrow)" />

      {/* a */}
      <rect x="400" y="80" width="100" height="50" rx="10" fill="url(#dl2-vf-var)" opacity="0.92" />
      <text x="450" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Variable</text>
      <text x="450" y="120" textAnchor="middle" fontSize="11" fill="#bfdbfe">a (data=4.0)</text>

      <path d="M500 105 L570 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-vf-arrow)" />

      {/* exp */}
      <rect x="570" y="80" width="100" height="50" rx="10" fill="url(#dl2-vf-func)" opacity="0.92" />
      <text x="620" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Function</text>
      <text x="620" y="120" textAnchor="middle" fontSize="11" fill="#e9d5ff">exp</text>

      <path d="M670 105 L720 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-vf-arrow)" />

      {/* b */}
      <rect x="700" y="80" width="80" height="50" rx="10" fill="url(#dl2-vf-var)" opacity="0.92" />
      <text x="740" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Variable</text>
      <text x="740" y="120" textAnchor="middle" fontSize="10" fill="#bfdbfe">b</text>

      {/* creator 链（反向） */}
      <path d="M450 130 L450 155 L280 155 L280 130" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,3" fill="none" markerEnd="url(#dl2-vf-creator)" />
      <text x="365" y="172" textAnchor="middle" fontSize="10" fill="#dc2626">creator 链（反向回溯）</text>

      {/* Variable 属性 */}
      <rect x="40" y="200" width="340" height="120" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="210" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">Variable 类属性</text>
      <text x="60" y="244" fontSize="11" fill="#334155">data —— 前向值（NumPy 数组）</text>
      <text x="60" y="264" fontSize="11" fill="#334155">grad —— 梯度（反向传播后填入）</text>
      <text x="60" y="284" fontSize="11" fill="#334155">creator —— 产生它的 Function</text>
      <text x="60" y="304" fontSize="11" fill="#334155">generation —— 计算图深度代数</text>

      {/* Function 属性 */}
      <rect x="420" y="200" width="340" height="120" rx="10" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="590" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">Function 类方法</text>
      <text x="440" y="244" fontSize="11" fill="#334155">forward(x) —— 前向运算</text>
      <text x="440" y="264" fontSize="11" fill="#334155">backward(gy) —— 反向梯度</text>
      <text x="440" y="284" fontSize="11" fill="#334155">__call__ —— 连接计算图</text>
      <text x="440" y="304" fontSize="11" fill="#334155">inputs / outputs —— 保存 IO</text>

      {/* 底部：双向链接 */}
      <rect x="60" y="350" width="680" height="78" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="374" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">双向链接：计算图的边</text>
      <text x="400" y="396" textAnchor="middle" fontSize="11" fill="#475569">Function.inputs → Variable（正向引用）</text>
      <text x="400" y="414" textAnchor="middle" fontSize="11" fill="#475569">Variable.creator → Function（反向引用，反向传播回溯路径）</text>
    </svg>
  );
}
