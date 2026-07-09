"use client";

export function TcgContextAttentionDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="上下文与注意力机制：上下文窗口与信息流">
      <defs>
        <linearGradient id="tcg-ca-ctx" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tcg-ca-attn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tcg-ca-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tcg-ca-out" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tcg-ca-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">上下文与注意力机制</text>

      {/* 上下文窗口 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">上下文窗口：模型的"记忆"范围</text>

      <rect x="40" y="80" width="720" height="110" rx="10" fill="url(#tcg-ca-ctx)" opacity="0.06" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">上下文窗口（如 4096 / 8192 / 128K tokens）</text>

      <rect x="60" y="116" width="100" height="30" rx="6" fill="#2563eb" opacity="0.6" />
      <text x="110" y="136" textAnchor="middle" fontSize="11" fill="#fff">token 1</text>

      <rect x="170" y="116" width="100" height="30" rx="6" fill="#2563eb" opacity="0.6" />
      <text x="220" y="136" textAnchor="middle" fontSize="11" fill="#fff">token 2</text>

      <rect x="280" y="116" width="100" height="30" rx="6" fill="#2563eb" opacity="0.6" />
      <text x="330" y="136" textAnchor="middle" fontSize="11" fill="#fff">token 3</text>

      <text x="400" y="136" textAnchor="middle" fontSize="14" fill="#94a3b8">. . .</text>

      <rect x="430" y="116" width="100" height="30" rx="6" fill="#7c3aed" opacity="0.7" />
      <text x="480" y="136" textAnchor="middle" fontSize="11" fill="#fff">token N-1</text>

      <rect x="540" y="116" width="100" height="30" rx="6" fill="#f59e0b" opacity="0.8" />
      <text x="590" y="136" textAnchor="middle" fontSize="11" fill="#fff">当前token</text>

      <text x="670" y="136" textAnchor="middle" fontSize="11" fill="#64748b">→ 预测</text>

      <text x="400" y="168" textAnchor="middle" fontSize="11" fill="#475569">窗口内所有token同时被处理，窗口外的信息"看不见"</text>
      <text x="400" y="184" textAnchor="middle" fontSize="10" fill="#64748b">更大的窗口 = 更长的记忆 = 更强的上下文理解能力</text>

      {/* 注意力权重可视化 */}
      <text x="400" y="218" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">注意力权重：当前token关注谁</text>

      <rect x="40" y="234" width="350" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="215" y="258" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">示例："The cat sat on the [mat]"</text>
      <text x="60" y="282" fontSize="11" fill="#475569">预测 "mat" 时：</text>
      <text x="60" y="302" fontSize="11" fill="#475569">→ 关注 "sat" (0.35)</text>
      <text x="60" y="322" fontSize="11" fill="#475569">→ 关注 "on" (0.25)</text>
      <text x="60" y="342" fontSize="11" fill="#475569">→ 关注 "the" (0.20)</text>

      <rect x="410" y="234" width="350" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="585" y="258" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">示例："it was raining so I took [umbrella]"</text>
      <text x="430" y="282" fontSize="11" fill="#475569">预测 "umbrella" 时：</text>
      <text x="430" y="302" fontSize="11" fill="#475569">→ 关注 "raining" (0.45)</text>
      <text x="430" y="322" fontSize="11" fill="#475569">→ 关注 "took" (0.20)</text>
      <text x="430" y="342" fontSize="11" fill="#475569">→ 长程依赖：跨越多个token</text>

      {/* 上下文如何影响生成 */}
      <text x="400" y="380" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">上下文如何决定生成</text>

      <rect x="40" y="396" width="230" height="90" rx="10" fill="url(#tcg-ca-ctx)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="420" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">上下文提供信息</text>
      <text x="155" y="442" textAnchor="middle" fontSize="11" fill="#475569">之前的token序列</text>
      <text x="155" y="462" textAnchor="middle" fontSize="11" fill="#475569">是预测的唯一依据</text>
      <text x="155" y="480" textAnchor="middle" fontSize="10" fill="#64748b">没有上下文 = 没有方向</text>

      <path d="M270 441 L290 441" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-ca-arrow)" />

      <rect x="300" y="396" width="230" height="90" rx="10" fill="url(#tcg-ca-attn)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="415" y="420" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">注意力筛选信息</text>
      <text x="415" y="442" textAnchor="middle" fontSize="11" fill="#475569">自动决定关注哪些</text>
      <text x="415" y="462" textAnchor="middle" fontSize="11" fill="#475569">token、忽略哪些</text>
      <text x="415" y="480" textAnchor="middle" fontSize="10" fill="#64748b">不同头关注不同模式</text>

      <path d="M530 441 L550 441" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-ca-arrow)" />

      <rect x="560" y="396" width="200" height="90" rx="10" fill="url(#tcg-ca-out)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="420" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">生成有依据的输出</text>
      <text x="660" y="442" textAnchor="middle" fontSize="11" fill="#475569">基于上下文信息</text>
      <text x="660" y="462" textAnchor="middle" fontSize="11" fill="#475569">预测最合理的续写</text>
      <text x="660" y="480" textAnchor="middle" fontSize="10" fill="#64748b">上下文越长 = 理解越深</text>

      {/* 上下文的局限性 */}
      <text x="400" y="508" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">上下文窗口的影响</text>

      <rect x="40" y="524" width="350" height="36" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="215" y="546" textAnchor="middle" fontSize="11" fill="#475569">窗口内：完整理解，注意力捕获长程依赖</text>

      <rect x="410" y="524" width="350" height="36" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="585" y="546" textAnchor="middle" fontSize="11" fill="#475569">窗口外：信息丢失，需要摘要或检索补充</text>
    </svg>
  );
}
