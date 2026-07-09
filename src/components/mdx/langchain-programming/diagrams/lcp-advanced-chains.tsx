"use client";

export function LcpAdvancedChainsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="高级链与路由 LCEL与动态分发">
      <defs>
        <linearGradient id="lcp-ac-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lcp-ac-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lcp-ac-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lcp-ac-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="lcp-ac-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="lcp-ac-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">高级链与路由：LCEL 与动态分发</text>

      {/* 上部：Router Chain 路由分发 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Router Chain 动态路由</text>

      <rect x="300" y="76" width="200" height="60" rx="10" fill="url(#lcp-ac-red)" opacity="0.9" />
      <text x="400" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Router LLM</text>
      <text x="400" y="120" textAnchor="middle" fontSize="9" fill="#fecaca">分析输入 → 选择目标链</text>

      <path d="M350 136 L180 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ac-arrow)" />
      <path d="M390 136 L370 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ac-arrow)" />
      <path d="M410 136 L490 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ac-arrow)" />
      <path d="M450 136 L620 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-ac-arrow)" />

      <rect x="80" y="172" width="160" height="60" rx="8" fill="url(#lcp-ac-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="196" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">物理链</text>
      <text x="160" y="216" textAnchor="middle" fontSize="9" fill="#475569">物理问题处理</text>

      <rect x="280" y="172" width="160" height="60" rx="8" fill="url(#lcp-ac-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="360" y="196" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">数学链</text>
      <text x="360" y="216" textAnchor="middle" fontSize="9" fill="#475569">数学问题处理</text>

      <rect x="440" y="172" width="160" height="60" rx="8" fill="url(#lcp-ac-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="520" y="196" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">历史链</text>
      <text x="520" y="216" textAnchor="middle" fontSize="9" fill="#475569">历史问题处理</text>

      <rect x="560" y="172" width="160" height="60" rx="8" fill="url(#lcp-ac-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="640" y="196" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">计算机链</text>
      <text x="640" y="216" textAnchor="middle" fontSize="9" fill="#475569">计算机问题处理</text>

      {/* 中部：LCEL 核心 Runnable */}
      <text x="400" y="264" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">LCEL 核心 Runnable 原语</text>

      <rect x="30" y="278" width="140" height="80" rx="8" fill="url(#lcp-ac-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="100" y="302" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">RunnableParallel</text>
      <text x="100" y="320" textAnchor="middle" fontSize="9" fill="#475569">并行执行多个</text>
      <text x="100" y="336" textAnchor="middle" fontSize="9" fill="#475569">Runnable</text>
      <text x="100" y="352" textAnchor="middle" fontSize="9" fill="#475569">结果合并</text>

      <rect x="185" y="278" width="140" height="80" rx="8" fill="url(#lcp-ac-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="255" y="302" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">RunnablePassthrough</text>
      <text x="255" y="320" textAnchor="middle" fontSize="9" fill="#475569">透传输入</text>
      <text x="255" y="336" textAnchor="middle" fontSize="9" fill="#475569">保留原始数据</text>
      <text x="255" y="352" textAnchor="middle" fontSize="9" fill="#475569">传递给下游</text>

      <rect x="340" y="278" width="140" height="80" rx="8" fill="url(#lcp-ac-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="302" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">RunnableLambda</text>
      <text x="410" y="320" textAnchor="middle" fontSize="9" fill="#475569">自定义函数</text>
      <text x="410" y="336" textAnchor="middle" fontSize="9" fill="#475569">包装为 Runnable</text>
      <text x="410" y="352" textAnchor="middle" fontSize="9" fill="#475569">灵活转换</text>

      <rect x="495" y="278" width="140" height="80" rx="8" fill="url(#lcp-ac-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="565" y="302" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">RunnableBranch</text>
      <text x="565" y="320" textAnchor="middle" fontSize="9" fill="#475569">条件分支</text>
      <text x="565" y="336" textAnchor="middle" fontSize="9" fill="#475569">动态路由</text>
      <text x="565" y="352" textAnchor="middle" fontSize="9" fill="#475569">替代 Router</text>

      <rect x="650" y="278" width="120" height="80" rx="8" fill="url(#lcp-ac-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="710" y="302" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">RunnableMap</text>
      <text x="710" y="320" textAnchor="middle" fontSize="9" fill="#475569">字典映射</text>
      <text x="710" y="336" textAnchor="middle" fontSize="9" fill="#475569">并行调度</text>
      <text x="710" y="352" textAnchor="middle" fontSize="9" fill="#475569">键值路由</text>

      {/* 下部：LCEL 优势 */}
      <text x="400" y="390" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">LCEL 四大优势</text>

      <rect x="30" y="404" width="180" height="70" rx="8" fill="url(#lcp-ac-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="428" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">流式原生</text>
      <text x="120" y="448" textAnchor="middle" fontSize="9" fill="#475569">stream 逐 Token 输出</text>
      <text x="120" y="464" textAnchor="middle" fontSize="9" fill="#475569">无需额外改造</text>

      <rect x="225" y="404" width="180" height="70" rx="8" fill="url(#lcp-ac-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="315" y="428" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">异步支持</text>
      <text x="315" y="448" textAnchor="middle" fontSize="9" fill="#475569">ainvoke / astream</text>
      <text x="315" y="464" textAnchor="middle" fontSize="9" fill="#475569">高并发场景</text>

      <rect x="420" y="404" width="180" height="70" rx="8" fill="url(#lcp-ac-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="510" y="428" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">批量处理</text>
      <text x="510" y="448" textAnchor="middle" fontSize="9" fill="#475569">batch 批量调用</text>
      <text x="510" y="464" textAnchor="middle" fontSize="9" fill="#475569">提升吞吐量</text>

      <rect x="615" y="404" width="155" height="70" rx="8" fill="url(#lcp-ac-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="692" y="428" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">可观测性</text>
      <text x="692" y="448" textAnchor="middle" fontSize="9" fill="#475569">LangSmith 追踪</text>
      <text x="692" y="464" textAnchor="middle" fontSize="9" fill="#475569">调试和监控</text>

      {/* 底部总结 */}
      <rect x="30" y="492" width="740" height="56" rx="8" fill="url(#lcp-ac-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="516" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">LCEL 本质：用管道符 | 组合 Runnable 原语，统一同步/异步/流式/批量四种调用模式</text>
      <text x="400" y="536" textAnchor="middle" fontSize="10" fill="#475569">路由模式：RunnableBranch 条件分发 / Router LLM 语义分发 / RunnableMap 并行调度</text>
    </svg>
  );
}
