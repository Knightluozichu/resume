/**
 * <OpcConcurrencyDiagram>：并发优化（optimized-cpp 并发优化章）。
 *
 * 左右对比：左侧「锁竞争」（红）——多线程争抢同一把锁，串行化；
 * 右侧「false sharing」（橙）——不同线程写同一缓存行的不同变量，缓存失效。
 * 底部一行无锁/细粒度优化方案卡片。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

export function OpcConcurrencyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并发优化对比图。左侧红色：锁竞争——多线程争抢同一把锁导致串行化，吞吐等于单线程。右侧橙色：false sharing——不同线程写同一缓存行的不同变量，缓存行反复失效。底部三个优化方案卡片：细粒度锁、无锁数据结构、缓存行对齐。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            并发优化 · 锁竞争与 false sharing
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            多核性能的两大杀手：锁让线程串行，false sharing 让缓存失效
          </text>

          {/* ===== 左侧：锁竞争（红）===== */}
          <rect x="40" y="80" width="310" height="32" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="101" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">锁竞争：串行化</text>

          {/* 线程排队示意 */}
          <rect x="56" y="124" width="278" height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="195" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">线程1 → 锁 → 临界区</text>
          <text x="195" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">线程2 → 等待... → 锁 → 临界区</text>
          <text x="195" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">线程3 → 等待... → 等待... → 锁</text>
          <text x="195" y="200" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">线程4 → 等待... → 等待... → 等待</text>
          <text x="195" y="226" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">吞吐 = 单线程</text>

          {/* ===== 右侧：false sharing（橙）===== */}
          <rect x="370" y="80" width="310" height="32" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="525" y="101" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">false sharing：缓存失效</text>

          {/* 缓存行示意 */}
          <rect x="386" y="124" width="278" height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="525" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">同一个缓存行（64 字节）</text>
          <rect x="406" y="152" width="120" height="24" rx="4" fill="var(--warning)" fillOpacity="0.2" stroke="var(--warning)" strokeWidth="1" />
          <text x="466" y="169" textAnchor="middle" fontSize="11" fill="var(--text-primary)">变量 A（线程1写）</text>
          <rect x="530" y="152" width="120" height="24" rx="4" fill="var(--warning)" fillOpacity="0.2" stroke="var(--warning)" strokeWidth="1" />
          <text x="590" y="169" textAnchor="middle" fontSize="11" fill="var(--text-primary)">变量 B（线程2写）</text>
          <text x="525" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">线程1 写 A → 缓存行失效</text>
          <text x="525" y="214" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">线程2 写 B → 缓存行又失效</text>
          <text x="525" y="234" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">反复同步 = 极慢</text>

          {/* ===== 底部三方案卡片 ===== */}
          {[
            { x: 40, t: "细粒度锁", d: "拆成多把锁\n减少争抢面", c: "var(--accent)" },
            { x: 270, t: "无锁数据结构", d: "CAS 原子操作\n避免阻塞等待", c: "var(--success)" },
            { x: 500, t: "缓存行对齐", d: "alignas(64)\n消除 false sharing", c: "var(--warning)" },
          ].map((card) => (
            <g key={card.x}>
              <rect x={card.x} y="266" width="180" height="68" rx="8" fill="var(--bg)" stroke={card.c} strokeWidth="1" strokeOpacity="0.5" />
              <rect x={card.x} y="266" width="180" height="24" rx="8" fill={card.c} fillOpacity="0.12" />
              <text x={card.x + 90} y="283" textAnchor="middle" fontSize="12" fontWeight="700" fill={card.c}>{card.t}</text>
              {card.d.split("\n").map((line, li) => (
                <text key={li} x={card.x + 90} y={304 + li * 16} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{line}</text>
              ))}
            </g>
          ))}

          {/* ===== 底部总结 ===== */}
          <rect x="60" y="364" width={VIEW_W - 120} height="72" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="388" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            并发优化核心：减少共享、减少争抢、减少同步
          </text>
          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            锁竞争让多核退化单核；false sharing 让缓存变成负担
          </text>
          <text x={VIEW_W / 2} y="424" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            解法：细粒度锁缩小争抢面、无锁结构避免阻塞、缓存行对齐消除 false sharing
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并发优化的两大敌人：锁竞争让线程串行化（多核退化为单核），false sharing 让不同线程的写操作互相 invalidate 缓存行。解法是细粒度锁、无锁数据结构和缓存行对齐。
      </figcaption>
    </figure>
  );
}
