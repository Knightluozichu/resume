/**
 * <EcsParallelAsyncDiagram>：并行与异步最佳实践（条款 48-50）。
 *
 * 上：串行 await（总耗时 = 之和）vs 并行 Task.WhenAll（总耗时 = 最长者）
 * 下：async/await 要点——避免 async void、ConfigureAwait、异常聚合
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const danger = "var(--danger)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function EcsParallelAsyncDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并行与异步。上：串行 await 三个任务依次执行总耗时为三者之和；并行 Task.WhenAll 三个任务同时执行总耗时为最长者。下：async 要点避免 async void、ConfigureAwait、异常聚合。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ecs-pa-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            并行与异步
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            串行求和 · 并行取长——Task.WhenAll 提升吞吐
          </text>

          {/* 上左：串行 await */}
          <g>
            <rect x={40} y={76} width={316} height={150} rx="10" fill={danger} fillOpacity="0.05" stroke={danger} strokeWidth="1.6" />
            <text x={198} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>
              串行 await（慢）
            </text>
            <line x1={52} y1={108} x2={344} y2={108} stroke={border} strokeWidth="1" />
            <text x={56} y={128} fontSize="11" fontFamily="monospace" fill={primary}>{"var a = await GetA();"}</text>
            <text x={56} y={144} fontSize="11" fontFamily="monospace" fill={primary}>{"var b = await GetB();"}</text>
            <text x={56} y={160} fontSize="11" fontFamily="monospace" fill={primary}>{"var c = await GetC();"}</text>

            {/* 串行时间条 */}
            <rect x={56} y={172} width={70} height={16} rx="3" fill={danger} fillOpacity="0.5" />
            <text x={91} y={184} textAnchor="middle" fontSize="10" fill={primary}>A 1s</text>
            <rect x={128} y={172} width={70} height={16} rx="3" fill={danger} fillOpacity="0.5" />
            <text x={163} y={184} textAnchor="middle" fontSize="10" fill={primary}>B 1s</text>
            <rect x={200} y={172} width={70} height={16} rx="3" fill={danger} fillOpacity="0.5" />
            <text x={235} y={184} textAnchor="middle" fontSize="10" fill={primary}>C 1s</text>
            <text x={300} y={184} fontSize="11" fontWeight="700" fill={danger}>总 3s</text>
            <text x={56} y={212} fontSize="11" fill={secondary}>三个任务排队等，无并行</text>
          </g>

          {/* 上右：并行 WhenAll */}
          <g>
            <rect x={376} y={76} width={304} height={150} rx="10" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.6" />
            <text x={528} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
              并行 WhenAll（快）
            </text>
            <line x1={388} y1={108} x2={668} y2={108} stroke={border} strokeWidth="1" />
            <text x={392} y={128} fontSize="11" fontFamily="monospace" fill={primary}>{"var tasks = new[]{"}</text>
            <text x={392} y={144} fontSize="11" fontFamily="monospace" fill={primary}>{"  GetA(), GetB(), GetC() };"}</text>
            <text x={392} y={160} fontSize="11" fontFamily="monospace" fill={primary}>{"await Task.WhenAll(tasks);"}</text>

            {/* 并行时间条 */}
            <rect x={392} y={172} width={70} height={16} rx="3" fill={success} fillOpacity="0.5" />
            <text x={427} y={184} textAnchor="middle" fontSize="10" fill={primary}>A</text>
            <rect x={392} y={190} width={70} height={16} rx="3" fill={success} fillOpacity="0.5" />
            <text x={427} y={202} textAnchor="middle" fontSize="10" fill={primary}>B</text>
            <rect x={392} y={208} width={70} height={16} rx="3" fill={success} fillOpacity="0.5" />
            <text x={427} y={220} textAnchor="middle" fontSize="10" fill={primary}>C</text>
            <text x={486} y={202} fontSize="11" fontWeight="700" fill={success}>总 1s</text>
          </g>

          {/* 下：async 要点 */}
          <text x={VIEW_W / 2} y={258} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            async / await 三要点
          </text>
          {[
            { label: "避免 async void", desc: "异常无法捕获 · 用 Task", color: danger },
            { label: "ConfigureAwait", desc: "库代码 false 防死锁", color: warning },
            { label: "异常聚合", desc: "WhenAll 抛 AggregateException", color: accent },
          ].map((m, i) => {
            const bx = 40 + i * 216;
            return (
              <g key={m.label}>
                <rect x={bx} y={274} width={204} height={64} rx="8" fill={m.color} fillOpacity="0.07" stroke={m.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={bx + 102} y={296} textAnchor="middle" fontSize="12" fontWeight="700" fill={m.color}>
                  {m.label}
                </text>
                <text x={bx + 102} y={316} textAnchor="middle" fontSize="11" fill={secondary}>
                  {m.desc}
                </text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <line x1={32} y1={356} x2={VIEW_W - 32} y2={356} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={380} textAnchor="middle" fontSize="11" fill={secondary}>
            独立任务用 WhenAll 并行 · async void 是炸弹 · 库中 ConfigureAwait(false)
          </text>
          <text x={VIEW_W / 2} y={400} textAnchor="middle" fontSize="11" fill={secondary}>
            CPU 密集用 Task.Run · IO 密集用原生异步 API——别用 Task.Run 包 IO
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        串行 await 让独立任务排队等待，总耗时是各任务之和；用 Task.WhenAll 并行执行，总耗时取决于最慢的任务。async void 无法捕获异常，库代码应 ConfigureAwait(false) 防止死锁。
      </figcaption>
    </figure>
  );
}
