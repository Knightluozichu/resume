/**
 * <DujLockOptimizeDiagram>：锁升级与锁优化机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function DujLockOptimizeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="锁升级与锁优化机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            synchronized 锁升级：偏向 → 轻量级 → 重量级
          </text>

          {/* 锁升级路径 */}
          <rect x="30" y="50" width="200" height="110" rx="10" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">偏向锁（Biased）</text>
          <text x="130" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Mark Word 记录线程 ID</text>
          <text x="130" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无竞争：单线程独占</text>
          <text x="130" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CAS 都不需要</text>
          <text x="130" y="140" textAnchor="middle" fontSize="10" fill="var(--danger)">JDK 15 后逐步废弃</text>

          <text x="245" y="110" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="245" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">竞争出现</text>

          <rect x="270" y="50" width="200" height="110" rx="10" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">轻量级锁（Thin）</text>
          <text x="370" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CAS 自旋获取</text>
          <text x="370" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Mark Word 指向栈帧锁记录</text>
          <text x="370" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合短时间竞争</text>
          <text x="370" y="140" textAnchor="middle" fontSize="10" fill="var(--danger)">自旋消耗 CPU</text>

          <text x="485" y="110" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="485" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">自旋失败</text>

          <rect x="510" y="50" width="200" height="110" rx="10" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="610" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">重量级锁（Fat）</text>
          <text x="610" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">OS 互斥量（Mutex）</text>
          <text x="610" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">线程进入内核态阻塞</text>
          <text x="610" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Monitor ObjectWaiter 队列</text>
          <text x="610" y="140" textAnchor="middle" fontSize="10" fill="var(--danger)">上下文切换开销大</text>

          {/* Mark Word 状态 */}
          <text x={VIEW_W / 2} y="190" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">对象头 Mark Word 锁状态（64位）</text>

          <rect x="30" y="202" width="680" height="30" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="60" y="222" fontSize="10" fill="var(--success)">无锁</text>
          <text x="190" y="222" fontSize="10" fill="var(--text-secondary)">hashCode(31) + age(4) + 0(1) + 01(2)</text>

          <rect x="30" y="236" width="680" height="30" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="60" y="256" fontSize="10" fill="var(--success)">偏向锁</text>
          <text x="190" y="256" fontSize="10" fill="var(--text-secondary)">threadId(54) + epoch(2) + age(4) + 1(1) + 01(2)</text>

          <rect x="30" y="270" width="680" height="30" rx="4" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="60" y="290" fontSize="10" fill="var(--warning)">轻量级锁</text>
          <text x="190" y="290" fontSize="10" fill="var(--text-secondary)">指向栈中锁记录指针(62) + 00(2)</text>

          <rect x="30" y="304" width="680" height="30" rx="4" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="60" y="324" fontSize="10" fill="var(--danger)">重量级锁</text>
          <text x="190" y="324" fontSize="10" fill="var(--text-secondary)">指向 Monitor 对象指针(62) + 10(2)</text>

          <rect x="30" y="338" width="680" height="30" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="60" y="358" fontSize="10" fill="var(--accent)">GC 标记</text>
          <text x="190" y="358" fontSize="10" fill="var(--text-secondary)">空(62) + 11(2)</text>

          {/* 其他锁优化 */}
          <text x={VIEW_W / 2} y="394" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">其他锁优化技术</text>

          <rect x="30" y="406" width="215" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="137" y="430" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">自旋锁 / 适应性自旋</text>

          <rect x="262" y="406" width="215" height="40" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="369" y="430" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">锁消除（逃逸分析）</text>

          <rect x="494" y="406" width="215" height="40" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="601" y="430" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">锁粗化（合并相邻同步块）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        synchronized锁升级路径——偏向锁到轻量级锁到重量级锁，Mark Word记录锁状态，配合自旋、锁消除、锁粗化优化
      </figcaption>
    </figure>
  );
}
