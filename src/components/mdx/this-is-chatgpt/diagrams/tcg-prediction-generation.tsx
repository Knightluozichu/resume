"use client";

export function TcgPredictionGenerationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="预测与文本生成：下一个token预测与采样策略">
      <defs>
        <linearGradient id="tcg-pg-input" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tcg-pg-pred" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tcg-pg-samp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tcg-pg-out" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tcg-pg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">预测与文本生成</text>

      {/* 生成流程 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">自回归生成流程</text>

      <rect x="40" y="80" width="180" height="70" rx="10" fill="url(#tcg-pg-input)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">输入上下文</text>
      <text x="130" y="128" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">"The cat sat"</text>
      <text x="130" y="144" textAnchor="middle" fontSize="10" fill="#64748b">已知token序列</text>

      <path d="M220 115 L240 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-pg-arrow)" />

      <rect x="250" y="80" width="170" height="70" rx="10" fill="url(#tcg-pg-pred)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="335" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">模型预测</text>
      <text x="335" y="128" textAnchor="middle" fontSize="11" fill="#475569">输出概率分布</text>
      <text x="335" y="144" textAnchor="middle" fontSize="10" fill="#64748b">每个token的可能性</text>

      <path d="M420 115 L440 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-pg-arrow)" />

      <rect x="450" y="80" width="140" height="70" rx="10" fill="url(#tcg-pg-samp)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="520" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">采样选择</text>
      <text x="520" y="128" textAnchor="middle" fontSize="11" fill="#475569">按策略选一个</text>
      <text x="520" y="144" textAnchor="middle" fontSize="10" fill="#64748b">token</text>

      <path d="M590 115 L610 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-pg-arrow)" />

      <rect x="620" y="80" width="140" height="70" rx="10" fill="url(#tcg-pg-out)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="690" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">追加输出</text>
      <text x="690" y="128" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">"on" → 序列</text>
      <text x="690" y="144" textAnchor="middle" fontSize="10" fill="#64748b">循环重复</text>

      {/* 概率分布示例 */}
      <text x="400" y="182" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">下一个token的概率分布</text>

      <rect x="40" y="198" width="720" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="222" fontSize="11" fontWeight="700" fill="#334155">输入："The cat sat"</text>

      <text x="60" y="248" fontSize="11" fill="#475569" fontFamily="monospace">"on"</text>
      <rect x="120" y="238" width="260" height="16" rx="3" fill="#7c3aed" opacity="0.8" />
      <text x="390" y="251" fontSize="11" fill="#475569">62%</text>

      <text x="60" y="272" fontSize="11" fill="#475569" fontFamily="monospace">"down"</text>
      <rect x="120" y="262" width="95" height="16" rx="3" fill="#7c3aed" opacity="0.5" />
      <text x="225" y="275" fontSize="11" fill="#475569">23%</text>

      <text x="60" y="296" fontSize="11" fill="#475569" fontFamily="monospace">"there"</text>
      <rect x="120" y="286" width="42" height="16" rx="3" fill="#7c3aed" opacity="0.35" />
      <text x="172" y="299" fontSize="11" fill="#475569">10%</text>

      <text x="60" y="314" fontSize="10" fill="#64748b">其他token... 各自概率很小</text>
      <rect x="120" y="304" width="20" height="12" rx="3" fill="#cbd5e1" />

      {/* 采样策略 */}
      <text x="400" y="348" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">采样策略：温度与控制</text>

      <rect x="40" y="364" width="230" height="90" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">温度 = 0（贪心）</text>
      <text x="155" y="410" textAnchor="middle" fontSize="11" fill="#475569">始终选概率最高的token</text>
      <text x="155" y="430" textAnchor="middle" fontSize="11" fill="#475569">输出确定、保守</text>
      <text x="155" y="446" textAnchor="middle" fontSize="10" fill="#64748b">适合：代码、 factual 回答</text>

      <rect x="285" y="364" width="230" height="90" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">温度 = 0.7（中等）</text>
      <text x="400" y="410" textAnchor="middle" fontSize="11" fill="#475569">大概率token更可能被选</text>
      <text x="400" y="430" textAnchor="middle" fontSize="11" fill="#475569">平衡多样性与连贯性</text>
      <text x="400" y="446" textAnchor="middle" fontSize="10" fill="#64748b">适合：对话、写作</text>

      <rect x="530" y="364" width="230" height="90" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="645" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">温度 = 1.0+（创意）</text>
      <text x="645" y="410" textAnchor="middle" fontSize="11" fill="#475569">概率分布趋近平坦</text>
      <text x="645" y="430" textAnchor="middle" fontSize="11" fill="#475569">更多随机性、创意</text>
      <text x="645" y="446" textAnchor="middle" fontSize="10" fill="#64748b">适合：创意写作、头脑风暴</text>

      {/* 生成循环 */}
      <text x="400" y="480" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">自回归：逐token生成</text>

      <rect x="40" y="496" width="720" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="518" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">[The] → [cat] → [sat] → [on] → [the] → [mat] → [.] → ...</text>
      <text x="400" y="538" textAnchor="middle" fontSize="10" fill="#64748b">每一步都将之前所有token作为输入，预测下一个 → 直到结束</text>
    </svg>
  );
}
