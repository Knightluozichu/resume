"use client";

export function OocControlFailuresDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="控制的失败集中式与分布式对比图">
      <defs>
        <linearGradient id="ooc-cf-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="ooc-cf-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ooc-cf-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="ooc-cf-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="ooc-cf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">控制的失败：为何失控即控制</text>

      {/* 集中式控制 vs 分布式控制 */}
      <text x="200" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626">集中式控制（失败）</text>
      <text x="600" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669">分布式控制（成功）</text>

      {/* 左侧：集中式控制树状图 */}
      <rect x="40" y="74" width="320" height="200" rx="10" fill="url(#ooc-cf-1)" opacity="0.06" stroke="#ef4444" strokeWidth="1.5" />
      {/* 中心节点 */}
      <circle cx="200" cy="104" r="22" fill="url(#ooc-cf-1)" opacity="0.8" />
      <text x="200" y="108" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">中心</text>
      {/* 连线到子节点 */}
      <line x1="200" y1="126" x2="100" y2="160" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
      <line x1="200" y1="126" x2="200" y2="160" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
      <line x1="200" y1="126" x2="300" y2="160" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="180" r="16" fill="#fca5a5" stroke="#ef4444" strokeWidth="1.5" />
      <circle cx="200" cy="180" r="16" fill="#fca5a5" stroke="#ef4444" strokeWidth="1.5" />
      <circle cx="300" cy="180" r="16" fill="#fca5a5" stroke="#ef4444" strokeWidth="1.5" />
      <line x1="100" y1="196" x2="80" y2="230" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
      <line x1="200" y1="196" x2="200" y2="230" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
      <line x1="300" y1="196" x2="320" y2="230" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
      <circle cx="80" cy="248" r="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <circle cx="200" cy="248" r="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <circle cx="320" cy="248" r="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />

      <text x="200" y="276" textAnchor="middle" fontSize="10" fill="#dc2626">单点故障 → 全盘崩溃</text>

      {/* 右侧：分布式控制网络图 */}
      <rect x="440" y="74" width="320" height="200" rx="10" fill="url(#ooc-cf-2)" opacity="0.06" stroke="#10b981" strokeWidth="1.5" />
      {/* 网络节点 */}
      <circle cx="520" cy="104" r="16" fill="url(#ooc-cf-2)" opacity="0.7" />
      <circle cx="680" cy="104" r="16" fill="url(#ooc-cf-2)" opacity="0.7" />
      <circle cx="480" cy="170" r="16" fill="#6ee7b7" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="600" cy="140" r="16" fill="#6ee7b7" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="720" cy="170" r="16" fill="#6ee7b7" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="540" cy="230" r="14" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="660" cy="230" r="14" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      {/* 连线 */}
      <line x1="520" y1="104" x2="600" y2="140" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
      <line x1="680" y1="104" x2="600" y2="140" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
      <line x1="680" y1="104" x2="720" y2="170" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
      <line x1="520" y1="104" x2="480" y2="170" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
      <line x1="480" y1="170" x2="540" y2="230" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
      <line x1="600" y1="140" x2="540" y2="230" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
      <line x1="600" y1="140" x2="660" y2="230" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
      <line x1="720" y1="170" x2="660" y2="230" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
      <line x1="540" y1="230" x2="660" y2="230" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
      <line x1="480" y1="170" x2="600" y2="140" stroke="#10b981" strokeWidth="1.5" opacity="0.3" />

      <text x="600" y="276" textAnchor="middle" fontSize="10" fill="#059669">单点失效 → 网络自愈</text>

      {/* 控制失败的三个原因 */}
      <text x="400" y="300" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">控制失败的三大原因</text>

      <rect x="40" y="314" width="235" height="90" rx="8" fill="url(#ooc-cf-1)" opacity="0.08" stroke="#ef4444" strokeWidth="1.5" />
      <text x="157" y="336" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">原因一：复杂性超载</text>
      <text x="157" y="358" textAnchor="middle" fontSize="9" fill="#475569">系统变量太多</text>
      <text x="157" y="376" textAnchor="middle" fontSize="9" fill="#475569">中心处理器信息过载</text>
      <text x="157" y="394" textAnchor="middle" fontSize="9" fill="#64748b">无法实时追踪所有变量</text>

      <rect x="283" y="314" width="235" height="90" rx="8" fill="url(#ooc-cf-3)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="336" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">原因二：延迟致命</text>
      <text x="400" y="358" textAnchor="middle" fontSize="9" fill="#475569">信息上传需要时间</text>
      <text x="400" y="376" textAnchor="middle" fontSize="9" fill="#475569">指令下达需要时间</text>
      <text x="400" y="394" textAnchor="middle" fontSize="9" fill="#64748b">等响应时情况已变</text>

      <rect x="526" y="314" width="234" height="90" rx="8" fill="url(#ooc-cf-4)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="643" y="336" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">原因三：单点脆弱</text>
      <text x="643" y="358" textAnchor="middle" fontSize="9" fill="#475569">中心节点是唯一瓶颈</text>
      <text x="643" y="376" textAnchor="middle" fontSize="9" fill="#475569">一旦失效全局瘫痪</text>
      <text x="643" y="394" textAnchor="middle" fontSize="9" fill="#64748b">无冗余路径可用</text>

      {/* 失控即控制的原则 */}
      <text x="400" y="426" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">失控即控制：去中心化的智慧</text>

      <rect x="40" y="440" width="235" height="100" rx="8" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
      <text x="157" y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">原则一： subsidiarity</text>
      <text x="157" y="484" textAnchor="middle" fontSize="9" fill="#475569">决策权下放到最低层</text>
      <text x="157" y="502" textAnchor="middle" fontSize="9" fill="#475569">能局部解决的不上报</text>
      <text x="157" y="520" textAnchor="middle" fontSize="9" fill="#64748b">中心只管规则不管操作</text>

      <rect x="283" y="440" width="235" height="100" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">原则二：冗余容错</text>
      <text x="400" y="484" textAnchor="middle" fontSize="9" fill="#475569">每个功能有多条路径</text>
      <text x="400" y="502" textAnchor="middle" fontSize="9" fill="#475569">故障时自动切换</text>
      <text x="400" y="520" textAnchor="middle" fontSize="9" fill="#64748b">不追求效率，追求韧性</text>

      <rect x="526" y="440" width="234" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="643" y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">原则三：边界管理</text>
      <text x="643" y="484" textAnchor="middle" fontSize="9" fill="#475569">管边界不管内部</text>
      <text x="643" y="502" textAnchor="middle" fontSize="9" fill="#475569">设规则让系统自组织</text>
      <text x="643" y="520" textAnchor="middle" fontSize="9" fill="#64748b">培育而非建造</text>

      {/* 底部核心洞察 */}
      <rect x="40" y="552" width="720" height="22" rx="8" fill="url(#ooc-cf-2)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="400" y="568" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">核心洞察：最可靠的控制是放弃控制——让系统自己找到平衡</text>
    </svg>
  );
}
