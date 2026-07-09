"use client";

export function Dl2GradientBackpropDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="反向传播与梯度传递流程">
      <defs>
        <linearGradient id="dl2-gb-fwd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dl2-gb-bwd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="dl2-gb-farrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#2563eb" />
        </marker>
        <marker id="dl2-gb-barrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">反向传播：前向建图 + 反向传梯度</text>

      {/* 前向传播（蓝色） */}
      <text x="400" y="58" textAnchor="middle" fontSize="12" fill="#2563eb">前向传播：构建计算图</text>

      <rect x="60" y="72" width="80" height="44" rx="8" fill="url(#dl2-gb-fwd)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="100" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">x</text>
      <text x="100" y="106" textAnchor="middle" fontSize="9" fill="#3b82f6">gen=0</text>

      <path d="M140 94 L200 94" stroke="#2563eb" strokeWidth="2" markerEnd="url(#dl2-gb-farrow)" />

      <rect x="200" y="72" width="80" height="44" rx="8" fill="url(#dl2-gb-fwd)" opacity="0.25" stroke="#2563eb" strokeWidth="1.5" />
      <text x="240" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">square</text>
      <text x="240" y="106" textAnchor="middle" fontSize="9" fill="#3b82f6">gen=0</text>

      <path d="M280 94 L340 94" stroke="#2563eb" strokeWidth="2" markerEnd="url(#dl2-gb-farrow)" />

      <rect x="340" y="72" width="80" height="44" rx="8" fill="url(#dl2-gb-fwd)" opacity="0.35" stroke="#2563eb" strokeWidth="1.5" />
      <text x="380" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">a</text>
      <text x="380" y="106" textAnchor="middle" fontSize="9" fill="#3b82f6">gen=1</text>

      <path d="M420 94 L480 94" stroke="#2563eb" strokeWidth="2" markerEnd="url(#dl2-gb-farrow)" />

      <rect x="480" y="72" width="80" height="44" rx="8" fill="url(#dl2-gb-fwd)" opacity="0.45" stroke="#2563eb" strokeWidth="1.5" />
      <text x="520" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">exp</text>
      <text x="520" y="106" textAnchor="middle" fontSize="9" fill="#3b82f6">gen=1</text>

      <path d="M560 94 L620 94" stroke="#2563eb" strokeWidth="2" markerEnd="url(#dl2-gb-farrow)" />

      <rect x="620" y="72" width="80" height="44" rx="8" fill="url(#dl2-gb-fwd)" opacity="0.6" stroke="#2563eb" strokeWidth="1.5" />
      <text x="660" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">b</text>
      <text x="660" y="106" textAnchor="middle" fontSize="9" fill="#3b82f6">gen=2</text>

      {/* 反向传播（红色） */}
      <text x="400" y="148" textAnchor="middle" fontSize="12" fill="#dc2626">反向传播：按 generation 降序传递梯度</text>

      <rect x="620" y="162" width="80" height="44" rx="8" fill="url(#dl2-gb-bwd)" opacity="0.15" stroke="#dc2626" strokeWidth="1.5" />
      <text x="660" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="#991b1b">b</text>
      <text x="660" y="196" textAnchor="middle" fontSize="9" fill="#dc2626">grad=1</text>

      <path d="M620 184 L560 184" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dl2-gb-barrow)" />

      <rect x="480" y="162" width="80" height="44" rx="8" fill="url(#dl2-gb-bwd)" opacity="0.25" stroke="#dc2626" strokeWidth="1.5" />
      <text x="520" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="#991b1b">exp</text>
      <text x="520" y="196" textAnchor="middle" fontSize="9" fill="#dc2626">2t*1</text>

      <path d="M480 184 L420 184" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dl2-gb-barrow)" />

      <rect x="340" y="162" width="80" height="44" rx="8" fill="url(#dl2-gb-bwd)" opacity="0.35" stroke="#dc2626" strokeWidth="1.5" />
      <text x="380" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="#991b1b">a</text>
      <text x="380" y="196" textAnchor="middle" fontSize="9" fill="#dc2626">grad=b'</text>

      <path d="M340 184 L280 184" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dl2-gb-barrow)" />

      <rect x="200" y="162" width="80" height="44" rx="8" fill="url(#dl2-gb-bwd)" opacity="0.45" stroke="#dc2626" strokeWidth="1.5" />
      <text x="240" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="#991b1b">square</text>
      <text x="240" y="196" textAnchor="middle" fontSize="9" fill="#dc2626">2x*a'</text>

      <path d="M200 184 L140 184" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dl2-gb-barrow)" />

      <rect x="60" y="162" width="80" height="44" rx="8" fill="url(#dl2-gb-bwd)" opacity="0.6" stroke="#dc2626" strokeWidth="1.5" />
      <text x="100" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="#991b1b">x</text>
      <text x="100" y="196" textAnchor="middle" fontSize="9" fill="#dc2626">grad!</text>

      {/* backward 流程步骤 */}
      <rect x="40" y="240" width="720" height="140" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="400" y="264" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">backward 方法流程</text>
      <text x="60" y="288" fontSize="11" fill="#475569">1. 初始化输出端 grad = 1</text>
      <text x="60" y="308" fontSize="11" fill="#475569">2. 将 creator 加入 funcs 列表，按 generation 排序</text>
      <text x="60" y="328" fontSize="11" fill="#475569">3. 循环：取 generation 最大的 Function f</text>
      <text x="390" y="288" fontSize="11" fill="#475569">4. 收集 f 输出的 grad，调用 f.backward(gy)</text>
      <text x="390" y="308" fontSize="11" fill="#475569">5. 将输入梯度累加到 f.inputs 的 grad</text>
      <text x="390" y="328" fontSize="11" fill="#475569">6. 将 f.inputs 的 creator 加入 funcs，继续回溯</text>
      <text x="400" y="356" textAnchor="middle" fontSize="11" fontWeight="600" fill="#dc2626">梯度累加：x.grad = x.grad + gx（多路径求和）</text>

      {/* 梯度清零 */}
      <rect x="40" y="400" width="720" height="56" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="424" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">梯度清零（cleargrad）</text>
      <text x="400" y="444" textAnchor="middle" fontSize="11" fill="#78350f">每次 backward 前必须清零，否则梯度会累加上一轮残留</text>
    </svg>
  );
}
