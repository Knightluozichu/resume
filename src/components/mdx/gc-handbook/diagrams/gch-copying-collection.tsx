/**
 * <GchCopyingCollectionDiagram>：复制式回收 From/To半区与Cheney算法。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GchCopyingCollectionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="复制式回收 From/To半区与Cheney算法指针追踪"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            复制式回收：Cheney 广度优先指针追踪
          </text>

          {/* 回收前 */}
          <text x="185" y="54" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">回收前</text>
          <rect x="40" y="64" width="290" height="200" rx="8" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" />

          {/* From空间 */}
          <text x="100" y="84" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">From 半区</text>
          <rect x="50" y="92" width="120" height="160" rx="4" fill="none" stroke="var(--warning)" strokeWidth="1" strokeDasharray="3 3" />
          {/* 对象 */}
          <rect x="56" y="100" width="28" height="18" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="70" y="113" textAnchor="middle" fontSize="8" fill="var(--text-primary)">A</text>
          <rect x="88" y="100" width="28" height="18" fill="var(--danger)" fillOpacity="0.2" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="102" y="113" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">B</text>
          <rect x="56" y="122" width="28" height="18" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="70" y="135" textAnchor="middle" fontSize="8" fill="var(--text-primary)">C</text>
          <rect x="88" y="122" width="28" height="18" fill="var(--danger)" fillOpacity="0.2" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="102" y="135" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">D</text>
          <rect x="56" y="144" width="28" height="18" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="70" y="157" textAnchor="middle" fontSize="8" fill="var(--text-primary)">E</text>

          <text x="100" y="188" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">A→C, A→D</text>
          <text x="100" y="202" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">C→E</text>
          <text x="100" y="220" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">B,D 不可达 = 垃圾</text>
          <text x="100" y="238" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">scan=free=起点</text>

          {/* To空间（空） */}
          <text x="250" y="84" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">To 半区（空）</text>
          <rect x="200" y="92" width="120" height="160" rx="4" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="260" y="170" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">等待复制</text>

          {/* 箭头 */}
          <text x="370" y="160" textAnchor="middle" fontSize="20" fill="var(--accent)">&rarr;</text>
          <text x="370" y="180" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Cheney BFS</text>

          {/* 回收后 */}
          <text x="555" y="54" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">回收后</text>
          <rect x="410" y="64" width="290" height="200" rx="8" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" />

          {/* From空间（清空） */}
          <text x="470" y="84" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-tertiary)">From（已清空）</text>
          <rect x="420" y="92" width="120" height="160" rx="4" fill="none" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="480" y="170" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">整体可复用</text>

          {/* To空间（紧凑） */}
          <text x="620" y="84" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">To（紧凑无碎片）</text>
          <rect x="570" y="92" width="120" height="160" rx="4" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1" />
          <rect x="576" y="100" width="28" height="18" fill="var(--success)" fillOpacity="0.5" stroke="var(--success)" strokeWidth="0.8" />
          <text x="590" y="113" textAnchor="middle" fontSize="8" fill="var(--text-primary)">A'</text>
          <rect x="608" y="100" width="28" height="18" fill="var(--success)" fillOpacity="0.5" stroke="var(--success)" strokeWidth="0.8" />
          <text x="622" y="113" textAnchor="middle" fontSize="8" fill="var(--text-primary)">C'</text>
          <rect x="576" y="122" width="28" height="18" fill="var(--success)" fillOpacity="0.5" stroke="var(--success)" strokeWidth="0.8" />
          <text x="590" y="135" textAnchor="middle" fontSize="8" fill="var(--text-primary)">E'</text>

          <text x="620" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">A'→C', A'→D'</text>
          <text x="620" y="172" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">C'→E'</text>
          <text x="620" y="196" textAnchor="middle" fontSize="9" fill="var(--success)">无碎片</text>
          <text x="620" y="210" textAnchor="middle" fontSize="9" fill="var(--success)">引用自动更新</text>
          <text x="620" y="228" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">B,D 被丢弃</text>

          {/* Cheney算法步骤 */}
          <line x1="30" y1="290" x2="710" y2="290" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">Cheney 算法（广度优先复制）</text>

          <rect x="40" y="326" width="660" height="100" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" />

          <text x="60" y="348" fontSize="10" fontWeight="600" fill="var(--accent)">1. scan = free = To区起点</text>
          <text x="60" y="362" fontSize="9" fill="var(--text-secondary)">从根集合复制存活对象到To区，free指针推进</text>

          <text x="60" y="382" fontSize="10" fontWeight="600" fill="var(--accent)">2. while scan &lt; free:</text>
          <text x="60" y="396" fontSize="9" fill="var(--text-secondary)">取出scan处对象，将其引用的未复制对象复制到To区（free推进）</text>
          <text x="60" y="410" fontSize="9" fill="var(--text-secondary)">更新scan处对象的引用指向To区新地址；scan推进</text>

          <text x="400" y="382" fontSize="10" fontWeight="600" fill="var(--accent)">3. scan == free → 完成</text>
          <text x="400" y="396" fontSize="9" fill="var(--text-secondary)">所有存活对象已复制且引用已更新</text>
          <text x="400" y="410" fontSize="9" fill="var(--text-secondary)">交换From/To角色，原From区整体回收</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        复制式回收Chenney算法：From半区存活对象广度优先复制到To半区，无碎片且引用自动更新，代价是可用空间减半
      </figcaption>
    </figure>
  );
}
