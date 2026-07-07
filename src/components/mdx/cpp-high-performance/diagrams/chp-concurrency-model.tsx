/**
 * <ChpConcurrencyModelDiagram>：并发模型对比（cpp-high-performance 并发章）。
 *
 * 三列对比三种并发模型：
 *   裸线程（thread）/ 线程池（pool）/ 无锁（lock-free）
 * 每列顶部画模型示意（多线程抢锁 / 任务队列分发工人 / 原子 CAS 环形缓冲），
 * 中部列「吞吐 / 延迟 / 复杂度」三维评分，底部列典型场景与陷阱。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 三列主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const COL_W = 200;
const COL_GAP = 24;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);
const COL_TOP = 100;

type Model = {
  id: string;
  name: string;
  color: string;
  throughput: string;
  latency: string;
  complexity: string;
  fit: string;
  trap: string;
};

const MODELS: readonly Model[] = [
  { id: "thread", name: "裸线程 thread", color: "var(--warning)", throughput: "中（锁竞争）", latency: "中", complexity: "低", fit: "少量长任务", trap: "锁竞争 / 上下文切换" },
  { id: "pool", name: "线程池 pool", color: "var(--accent)", throughput: "高（复用线程）", latency: "低（无创建开销）", complexity: "中", fit: "海量短任务", trap: "任务依赖死锁" },
  { id: "lockfree", name: "无锁 lock-free", color: "var(--success)", throughput: "极高（无阻塞）", latency: "极低", complexity: "极高", fit: "热点共享数据", trap: "ABA / 内存序错误" },
];

export function ChpConcurrencyModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="三种并发模型对比。裸线程 thread：多线程抢锁，吞吐中（锁竞争），延迟中，复杂度低，适合少量长任务，陷阱是锁竞争与上下文切换；线程池 pool：任务队列分发工人，吞吐高（复用线程），延迟低（无创建开销），复杂度中，适合海量短任务，陷阱是任务依赖死锁；无锁 lock-free：原子 CAS 环形缓冲，吞吐极高（无阻塞），延迟极低，复杂度极高，适合热点共享数据，陷阱是 ABA 与内存序错误。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            并发模型 · 线程 / 线程池 / 无锁
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            默认上线程池；只有热点共享数据才值得无锁的复杂度代价
          </text>

          {/* ===== 三列 ===== */}
          {MODELS.map((m, ci) => {
            const x = colX(ci);
            const cx = x + COL_W / 2;
            return (
              <g key={m.id}>
                {/* 列头 pill */}
                <rect x={x} y={COL_TOP} width={COL_W} height="28" rx="8" fill={m.color} fillOpacity="0.12" stroke={m.color} strokeWidth="1.2" />
                <text x={cx} y={COL_TOP + 19} textAnchor="middle" fontSize="14" fontWeight="700" fill={m.color}>{m.name}</text>

                {/* 模型示意区 */}
                <rect x={x} y={COL_TOP + 40} width={COL_W} height="88" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                {m.id === "thread" && (
                  <>
                    {/* 锁 */}
                    <rect x={cx - 14} y={COL_TOP + 56} width="28" height="20" rx="4" fill={m.color} fillOpacity="0.25" stroke={m.color} strokeWidth="1.2" />
                    <text x={cx} y={COL_TOP + 70} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">mutex</text>
                    {/* 三个线程抢锁 */}
                    {[0, 1, 2].map((k) => (
                      <g key={k}>
                        <circle cx={x + 44 + k * 56} cy={COL_TOP + 108} r="9" fill={m.color} fillOpacity="0.25" stroke={m.color} strokeWidth="1.2" />
                        <line x1={x + 44 + k * 56} y1={COL_TOP + 100} x2={cx} y2={COL_TOP + 78} stroke={m.color} strokeWidth="1" strokeDasharray="3 2" />
                      </g>
                    ))}
                  </>
                )}
                {m.id === "pool" && (
                  <>
                    {/* 任务队列 */}
                    <rect x={x + 24} y={COL_TOP + 56} width={COL_W - 48} height="18" rx="4" fill={m.color} fillOpacity="0.12" stroke={m.color} strokeWidth="1.2" />
                    <text x={cx} y={COL_TOP + 69} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">任务队列</text>
                    {/* 工人 */}
                    {[0, 1, 2, 3].map((k) => (
                      <g key={k}>
                        <circle cx={x + 28 + k * 44} cy={COL_TOP + 108} r="8" fill={m.color} fillOpacity="0.25" stroke={m.color} strokeWidth="1.2" />
                        <line x1={x + 28 + k * 44} y1={COL_TOP + 100} x2={cx} y2={COL_TOP + 76} stroke={m.color} strokeWidth="1" strokeDasharray="3 2" />
                      </g>
                    ))}
                  </>
                )}
                {m.id === "lockfree" && (
                  <>
                    {/* 环形缓冲 */}
                    <circle cx={cx} cy={COL_TOP + 88} r="26" fill="none" stroke={m.color} strokeWidth="1.4" />
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
                      const ang = (k / 8) * Math.PI * 2 - Math.PI / 2;
                      return <circle key={k} cx={cx + Math.cos(ang) * 26} cy={COL_TOP + 88 + Math.sin(ang) * 26} r="3.5" fill={k === 0 ? m.color : "var(--bg)"} stroke={m.color} strokeWidth="1" />;
                    })}
                    <text x={cx} y={COL_TOP + 92} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CAS</text>
                    <text x={cx} y={COL_TOP + 124} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">原子操作环形队列</text>
                  </>
                )}

                {/* 性能评分卡 */}
                <rect x={x} y={COL_TOP + 140} width={COL_W} height="116" rx="8" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.8" />
                <text x={x + 12} y={COL_TOP + 160} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">吞吐：</tspan>
                  <tspan fill={m.color}>{m.throughput}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 182} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">延迟：</tspan>
                  <tspan fill={m.color}>{m.latency}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 204} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">复杂度：</tspan>
                  <tspan fill="var(--text-primary)">{m.complexity}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 226} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">适合：</tspan>
                  <tspan fill="var(--text-primary)">{m.fit}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 248} fontSize="11" fill="var(--danger)">
                  <tspan fontWeight="700">陷阱：</tspan>
                  <tspan>{m.trap}</tspan>
                </text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            无锁不是银弹：只在剖析定位的热点共享路径上用，否则复杂度与正确性代价远超收益
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        裸线程用锁保护共享数据，简单但锁竞争与上下文切换开销大；线程池复用线程、用任务队列分发，适合海量短任务；无锁用原子操作（如 CAS）避免阻塞，吞吐延迟最优但易出 ABA 与内存序 bug。工程默认选线程池，仅对剖析定位的热点才考虑无锁。
      </figcaption>
    </figure>
  );
}
