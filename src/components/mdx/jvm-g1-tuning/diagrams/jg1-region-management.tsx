/**
 * <Jg1RegionManagementDiagram>：Region管理与内存布局——Region状态机图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function Jg1RegionManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Region管理与内存布局——Region状态机图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            G1 Region 状态机——Free → Eden → Survivor → Old → Free
          </text>

          {/* Region内部结构 */}
          <text x="40" y="58" fontSize="13" fontWeight="600" fill="var(--accent)">HeapRegion 内部结构</text>
          <rect x="40" y="70" width="660" height="48" rx="6" fill="var(--bg-elevated)" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="280" y1="70" x2="280" y2="118" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="500" y1="70" x2="500" y2="118" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 2" />
          <text x="160" y="90" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">_bottom（起始地址）</text>
          <text x="160" y="106" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">已分配区</text>
          <text x="390" y="90" textAnchor="middle" fontSize="11" fill="var(--warning)">_top（分配指针）</text>
          <text x="390" y="106" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">未分配区</text>
          <text x="600" y="90" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">_end（结束地址）</text>
          <text x="600" y="106" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">RegionSize: 1-32MB</text>

          {/* 状态机节点 */}
          {/* Free */}
          <rect x="60" y="160" width="120" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="120" y="184" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-tertiary)">Free</text>
          <text x="120" y="202" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">空闲可用</text>

          {/* Eden */}
          <rect x="230" y="160" width="120" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="290" y="184" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Eden</text>
          <text x="290" y="202" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">新对象分配</text>

          {/* Survivor */}
          <rect x="400" y="160" width="120" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.5" />
          <text x="460" y="184" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Survivor</text>
          <text x="460" y="202" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">存活暂存</text>

          {/* Old */}
          <rect x="570" y="160" width="120" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="630" y="184" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Old</text>
          <text x="630" y="202" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">长期存活</text>

          <defs>
            <marker id="arrRm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 箭头：Free→Eden */}
          <line x1="180" y1="188" x2="228" y2="188" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrRm)" />
          <text x="204" y="180" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">分配</text>

          {/* 箭头：Eden→Survivor */}
          <line x1="350" y1="188" x2="398" y2="188" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrRm)" />
          <text x="374" y="180" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">Young GC</text>

          {/* 箭头：Survivor→Old */}
          <line x1="520" y1="188" x2="568" y2="188" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrRm)" />
          <text x="544" y="180" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">晋升</text>

          {/* 箭头：Eden→Free (回收) */}
          <path d="M 290 216 Q 290 260 200 260 Q 120 260 120 216" fill="none" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrRm)" />
          <text x="180" y="252" textAnchor="middle" fontSize="11" fill="var(--danger)">Young GC 回收</text>

          {/* 箭头：Old→Free (Mixed GC回收) */}
          <path d="M 630 216 Q 630 300 350 300 Q 120 300 120 216" fill="none" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrRm)" />
          <text x="350" y="292" textAnchor="middle" fontSize="11" fill="var(--danger)">Mixed GC 回收</text>

          {/* Humongous */}
          <rect x="230" y="330" width="460" height="56" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="460" y="354" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Humongous（大对象 &gt; RegionSize/2）</text>
          <text x="460" y="372" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Humongous Start (H) → Humongous Continuation (HC) → ... 连续多个 Region</text>

          <line x1="120" y1="358" x2="228" y2="358" stroke="var(--danger)" strokeWidth="1.5" markerEnd="url(#arrRm)" />
          <text x="174" y="350" textAnchor="middle" fontSize="11" fill="var(--danger)">大对象分配</text>

          {/* Region大小公式 */}
          <rect x="40" y="410" width="660" height="50" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="55" y="432" fontSize="12" fontWeight="600" fill="var(--accent)">Region 大小计算</text>
          <text x="55" y="450" fontSize="11" fill="var(--text-secondary)">RegionSize = 堆大小 / 2048（向上取整到 2 的幂，范围 1-32MB）  |  4GB→2MB  8GB→4MB  32GB→16MB</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        G1 Region管理与内存布局——HeapRegion内部结构、Free/Eden/Survivor/Old/Humongous状态机流转
      </figcaption>
    </figure>
  );
}
