"use client";

export function AupOptimizationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="优化与性能设计原则图">
      <defs>
        <linearGradient id="aup-op-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="aup-op-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="aup-op-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="aup-op-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="aup-op-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">优化与性能</text>

      {/* 优化原则 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">UNIX 优化三原则</text>

      <rect x="30" y="76" width="240" height="130" rx="10" fill="url(#aup-op-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="150" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">最迟优化</text>
      <text x="150" y="120" textAnchor="middle" fontSize="10" fill="#475569">先让程序正确运行</text>
      <text x="150" y="138" textAnchor="middle" fontSize="10" fill="#475569">再让程序优雅清晰</text>
      <text x="150" y="156" textAnchor="middle" fontSize="10" fill="#475569">最后才考虑性能</text>
      <text x="150" y="174" textAnchor="middle" fontSize="10" fill="#475569">「过早优化是万恶之源」</text>
      <text x="150" y="192" textAnchor="middle" fontSize="10" fill="#475569">——Knuth</text>
      <rect x="90" y="184" width="120" height="16" rx="4" fill="#0ea5e9" opacity="0.2" />
      <text x="150" y="196" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">先正确再快速</text>

      <rect x="280" y="76" width="240" height="130" rx="10" fill="url(#aup-op-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">测量驱动</text>
      <text x="400" y="120" textAnchor="middle" fontSize="10" fill="#475569">不要猜测，要测量</text>
      <text x="400" y="138" textAnchor="middle" fontSize="10" fill="#475569">用 profiler 找瓶颈</text>
      <text x="400" y="156" textAnchor="middle" fontSize="10" fill="#475569">90% 时间在 10% 代码</text>
      <text x="400" y="174" textAnchor="middle" fontSize="10" fill="#475569">优化热点而非全局</text>
      <text x="400" y="192" textAnchor="middle" fontSize="10" fill="#475569">建立基准测试</text>
      <rect x="340" y="184" width="120" height="16" rx="4" fill="#9333ea" opacity="0.2" />
      <text x="400" y="196" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">数据说话</text>

      <rect x="530" y="76" width="240" height="130" rx="10" fill="url(#aup-op-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="650" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">算法优先</text>
      <text x="650" y="120" textAnchor="middle" fontSize="10" fill="#475569">换算法胜过调参数</text>
      <text x="650" y="138" textAnchor="middle" fontSize="10" fill="#475569">O(n) 优于 O(n log n)</text>
      <text x="650" y="156" textAnchor="middle" fontSize="10" fill="#475569">空间换时间合理时</text>
      <text x="650" y="174" textAnchor="middle" fontSize="10" fill="#475569">缓存是银弹之一</text>
      <text x="650" y="192" textAnchor="middle" fontSize="10" fill="#475569">数据结构选对</text>
      <rect x="590" y="184" width="120" height="16" rx="4" fill="#16a34a" opacity="0.2" />
      <text x="650" y="196" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">根源入手</text>

      {/* 性能瓶颈分层 */}
      <text x="400" y="232" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">性能瓶颈分层（从高到低）</text>

      <rect x="100" y="246" width="600" height="32" rx="6" fill="url(#aup-op-4)" opacity="0.85" />
      <text x="400" y="266" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">架构层：分布式 vs 单机 / 同步 vs 异步</text>

      <rect x="100" y="280" width="600" height="32" rx="6" fill="url(#aup-op-4)" opacity="0.65" />
      <text x="400" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">算法层：时间复杂度 / 空间复杂度</text>

      <rect x="100" y="314" width="600" height="32" rx="6" fill="url(#aup-op-4)" opacity="0.45" />
      <text x="400" y="334" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">数据结构层：哈希表 / 树 / 数组</text>

      <rect x="100" y="348" width="600" height="32" rx="6" fill="url(#aup-op-4)" opacity="0.30" />
      <text x="400" y="368" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">内存层：缓存命中率 / 局部性</text>

      <rect x="100" y="382" width="600" height="32" rx="6" fill="url(#aup-op-4)" opacity="0.18" />
      <text x="400" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">指令层：分支预测 / 内联 / 向量化</text>

      <text x="400" y="432" textAnchor="middle" fontSize="10" fill="#64748b">越上层投入产出比越高——先解决架构，再考虑指令</text>

      {/* 优化流程 */}
      <text x="400" y="456" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">优化循环流程</text>

      <rect x="30" y="470" width="140" height="40" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="494" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">建立基准</text>

      <path d="M170 490 L194 490" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-op-arrow)" />

      <rect x="198" y="470" width="140" height="40" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="268" y="494" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">Profile 分析</text>

      <path d="M338 490 L362 490" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-op-arrow)" />

      <rect x="366" y="470" width="140" height="40" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="436" y="494" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">优化热点</text>

      <path d="M506 490 L530 490" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-op-arrow)" />

      <rect x="534" y="470" width="140" height="40" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="604" y="494" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">验证收益</text>

      <path d="M604 510 L604 524" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-op-arrow)" />
      <path d="M604 524 L100 524 L100 510" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-op-arrow)" />

      <text x="350" y="540" textAnchor="middle" fontSize="9" fill="#64748b">循环：基准 → 分析 → 优化 → 验证 → 回到基准</text>

      {/* 底部总结 */}
      <rect x="30" y="552" width="740" height="24" rx="6" fill="url(#aup-op-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="568" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心：先正确 → 测量驱动 → 算法优先 → 架构层入手——UNIX 优化的智慧</text>
    </svg>
  );
}
