/**
 * <CtcParallelTplDiagram>：并行与 TPL——数据并行、PLINQ、任务并行。
 *
 * 上半：并行（Parallel.For，多核 CPU）vs 异步（async/await，不阻塞 I/O）的对比。
 * 下半：三种并行方式（Parallel.For / PLINQ / Task.Run）与线程安全策略。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function CtcParallelTplDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并行与 TPL。上半对比并行（多核 CPU 密集计算）与异步（不阻塞 I/O）。下半展示三种并行方式：Parallel.For 数据并行、PLINQ 声明式并行、Task.Run 任务并行，以及线程安全策略。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            并行与 TPL：数据并行 · PLINQ · 任务并行
          </text>

          {/* === 上半：并行 vs 异步 === */}
          <text x={180} y={50} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            并行（Parallelism）
          </text>
          <text x={540} y={50} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            异步（Asynchrony）
          </text>

          {/* 并行：多核 */}
          <rect x={40} y={60} width={280} height={80} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={60} y={80} textAnchor="start" fontSize="10" fontWeight="600" fill={accent} fontFamily="monospace">CPU 密集型</text>
          {/* 多核示意 */}
          <rect x="60" y="86" width="50" height="14" rx="2" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="1" />
          <rect x="116" y="86" width="50" height="14" rx="2" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="1" />
          <rect x="172" y="86" width="50" height="14" rx="2" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="1" />
          <rect x="228" y="86" width="50" height="14" rx="2" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="1" />
          <text x={180} y={116} textAnchor="middle" fontSize="10" fill={secondary}>多个核心同时计算</text>
          <text x={180} y={132} textAnchor="middle" fontSize="10" fill={secondary}>Parallel.For / PLINQ / Task.Run</text>

          {/* 异步：不阻塞 */}
          <rect x={400} y={60} width={280} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={420} y={80} textAnchor="start" fontSize="10" fontWeight="600" fill={success} fontFamily="monospace">I/O 密集型</text>
          {/* 线程释放示意 */}
          <rect x="420" y="86" width="30" height="14" rx="2" fill={success} fillOpacity="0.6" stroke={success} strokeWidth="1" />
          <rect x="456" y="86" width="160" height="14" rx="2" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" strokeDasharray="3 2" />
          <rect x="620" y="86" width="30" height="14" rx="2" fill={success} fillOpacity="0.6" stroke={success} strokeWidth="1" />
          <text x={540} y={116} textAnchor="middle" fontSize="10" fill={secondary}>线程释放 · I/O 完成后恢复</text>
          <text x={540} y={132} textAnchor="middle" fontSize="10" fill={secondary}>async/await · 不占 CPU</text>

          {/* 分隔线 */}
          <line x1={32} y1={156} x2={VIEW_W - 32} y2={156} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* === 下半：三种并行方式 === */}
          <text x={VIEW_W / 2} y={176} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>
            三种并行方式与线程安全
          </text>

          {/* Parallel.For */}
          <rect x={40} y={188} width={200} height={100} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={140} y={208} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>数据并行</text>
          <text x={140} y={226} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">Parallel.For</text>
          <text x={140} y={244} textAnchor="middle" fontSize="10" fill={secondary}>循环迭代分到多核</text>
          <text x={140} y={260} textAnchor="middle" fontSize="10" fill={secondary}>自动分区 · 无需手动</text>
          <text x={140} y={278} textAnchor="middle" fontSize="10" fill={warning}>迭代体须线程安全</text>

          {/* PLINQ */}
          <rect x={260} y={188} width={200} height={100} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={360} y={208} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>声明式并行</text>
          <text x={360} y={226} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">.AsParallel()</text>
          <text x={360} y={244} textAnchor="middle" fontSize="10" fill={secondary}>LINQ 语法并行查询</text>
          <text x={360} y={260} textAnchor="middle" fontSize="10" fill={secondary}>自动分区+合并</text>
          <text x={360} y={278} textAnchor="middle" fontSize="10" fill={warning}>控制粒度较粗</text>

          {/* Task.Run */}
          <rect x={480} y={188} width={200} height={100} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={580} y={208} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>任务并行</text>
          <text x={580} y={226} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">Task.Run + WhenAll</text>
          <text x={580} y={244} textAnchor="middle" fontSize="10" fill={secondary}>卸载 CPU 计算到线程池</text>
          <text x={580} y={260} textAnchor="middle" fontSize="10" fill={secondary}>协调多个独立任务</text>
          <text x={580} y={278} textAnchor="middle" fontSize="10" fill={danger}>不要包装 I/O</text>

          {/* 线程安全策略 */}
          <rect x={40} y={300} width={640} height="60" rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={60} y={320} textAnchor="start" fontSize="11" fontWeight="600" fill={accent}>线程安全策略</text>
          <text x={60} y={338} textAnchor="start" fontSize="10" fill={secondary}>
            <tspan fontWeight="600" fill={success}>Interlocked</tspan> 原子操作 ｜ <tspan fontWeight="600" fill={success}>lock</tspan> 互斥锁 ｜ <tspan fontWeight="600" fill={success}>ConcurrentDictionary</tspan> 并发集合
          </text>
          <text x={60} y={354} textAnchor="start" fontSize="10" fill={success}>
            无共享设计（最佳）：每个线程写不同索引，最后串行合并
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={374} x2={VIEW_W - 32} y2={374} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill={secondary}>
            并行利用多核 CPU · 异步避免 I/O 阻塞 · 两者正交 · 先测量再并行
          </text>
          <text x={VIEW_W / 2} y={410} textAnchor="middle" fontSize="11" fill={secondary}>
            Task.Run 只用于 CPU 密集 · 共享状态需线程安全 · 无共享设计最佳
          </text>

          <defs>
            <marker id="ctc-pt-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并行利用多核 CPU 执行计算密集任务，异步避免 I/O 等待阻塞线程。Parallel.For 做数据并行，PLINQ 做声明式并行，Task.Run 做任务并行。共享状态需线程安全，无共享设计最佳。
      </figcaption>
    </figure>
  );
}
