/**
 * <CqcCollectionChoiceDiagram>：集合选择决策树。
 *
 * 从「需要什么操作」出发，通过一系列判断分支，
 * 引导开发者选择正确的集合类型：
 *   键值查找 → Dictionary / ConcurrentDictionary
 *   先进先出 → Queue
 *   后进先出 → Stack
 *   有序唯一 → SortedSet
 *   频繁插入删除 → LinkedList
 *   只读列表 → ImmutableList / ReadOnlyCollection
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CqcCollectionChoiceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="集合选择决策树。从需要什么操作出发，通过判断分支选择集合类型：键值查找选 Dictionary，先进先出选 Queue，后进先出选 Stack，有序唯一选 SortedSet，频繁插入删除选 LinkedList，只读选 ImmutableList。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            集合选择 · 决策树
          </text>

          {/* 根节点 */}
          <rect x="280" y="46" width="160" height="34" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="360" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">主要操作是什么？</text>

          {/* 第一层分支线 */}
          <line x1="360" y1="80" x2="360" y2="92" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="130" y1="92" x2="590" y2="92" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="130" y1="92" x2="130" y2="104" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="300" y1="92" x2="300" y2="104" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="460" y1="92" x2="460" y2="104" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="590" y1="92" x2="590" y2="104" stroke="var(--border)" strokeWidth="1.2" />

          {/* 分支1：键值查找 */}
          <rect x="60" y="104" width="140" height="30" rx="6" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.2" />
          <text x="130" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">键值查找</text>
          <line x1="130" y1="134" x2="130" y2="146" stroke="var(--border)" strokeWidth="1.2" />
          <rect x="50" y="146" width="160" height="34" rx="7" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.4" />
          <text x="130" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">Dictionary</text>
          <text x="130" y="175" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">O(1) 查找</text>

          {/* 分支2：顺序访问 */}
          <rect x="230" y="104" width="140" height="30" rx="6" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.2" />
          <text x="300" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">顺序访问</text>
          <line x1="300" y1="134" x2="300" y2="146" stroke="var(--border)" strokeWidth="1.2" />

          {/* 顺序访问子分支 */}
          <line x1="300" y1="146" x2="300" y2="156" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="230" y1="156" x2="370" y2="156" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="230" y1="156" x2="230" y2="166" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="370" y1="156" x2="370" y2="166" stroke="var(--border)" strokeWidth="1.2" />

          <rect x="175" y="166" width="110" height="30" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.3" />
          <text x="230" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">List</text>

          <rect x="320" y="166" width="120" height="30" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.3" />
          <text x="380" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">Array</text>

          {/* 分支3：频繁增删 */}
          <rect x="390" y="104" width="140" height="30" rx="6" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.2" />
          <text x="460" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">频繁增删</text>
          <line x1="460" y1="134" x2="460" y2="146" stroke="var(--border)" strokeWidth="1.2" />

          {/* 频繁增删子分支 */}
          <line x1="460" y1="146" x2="460" y2="156" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="410" y1="156" x2="520" y2="156" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="410" y1="156" x2="410" y2="166" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="520" y1="156" x2="520" y2="166" stroke="var(--border)" strokeWidth="1.2" />

          <rect x="355" y="166" width="110" height="30" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.3" />
          <text x="410" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">LinkedList</text>

          <rect x="465" y="166" width="110" height="30" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.3" />
          <text x="520" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">HashSet</text>

          {/* 分支4：队列/栈 */}
          <rect x="520" y="104" width="140" height="30" rx="6" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.2" />
          <text x="590" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">队列/栈</text>
          <line x1="590" y1="134" x2="590" y2="146" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="590" y1="146" x2="590" y2="156" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="540" y1="156" x2="640" y2="156" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="540" y1="156" x2="540" y2="166" stroke="var(--border)" strokeWidth="1.2" />
          <line x1="640" y1="156" x2="640" y2="166" stroke="var(--border)" strokeWidth="1.2" />

          <rect x="490" y="166" width="100" height="30" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.3" />
          <text x="540" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">Queue</text>

          <rect x="590" y="166" width="100" height="30" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.3" />
          <text x="640" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">Stack</text>

          {/* ===== 底部：并发场景 ===== */}
          <rect x="36" y="220" width={VIEW_W - 72} height="80" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="52" y="242" fontSize="12" fontWeight="700" fill="var(--success)">多线程并发场景</text>

          <text x="52" y="264" fontSize="11" fill="var(--text-secondary)">并发读写字典 → ConcurrentDictionary（细粒度锁，无锁读）</text>
          <text x="52" y="282" fontSize="11" fill="var(--text-secondary)">并发入队出队 → ConcurrentQueue / ConcurrentBag（无锁 CAS）</text>

          {/* ===== 底部：不可变场景 ===== */}
          <rect x="36" y="312" width={VIEW_W - 72} height="80" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="52" y="334" fontSize="12" fontWeight="700" fill="var(--accent)">不可变与只读场景</text>

          <text x="52" y="356" fontSize="11" fill="var(--text-secondary)">需要不可变快照 → ImmutableList / ImmutableArray（结构共享，修改返回新副本）</text>
          <text x="52" y="374" fontSize="11" fill="var(--text-secondary)">对外暴露只读 → ReadOnlyCollection 包装，防止外部修改内部集合</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        集合选择从操作类型出发：键值查找用 Dictionary，顺序访问用 List，频繁增删用 LinkedList，队列栈用 Queue/Stack，并发场景用 Concurrent 系列。
      </figcaption>
    </figure>
  );
}
