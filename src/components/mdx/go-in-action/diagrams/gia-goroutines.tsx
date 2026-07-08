/**
 * <GiaGoroutinesDiagram>：Goroutine 与 M:N 调度模型。
 *
 * 展示 G-M-P 调度器、goroutine 轻量本质与 OS 线程对比。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function GiaGoroutinesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Goroutine 的 G-M-P 调度模型：M 个 goroutine 在 N 个 OS 线程上调度，轻量且高效。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Goroutine：M:N 调度（G-M-P 模型）
          </text>

          {/* Goroutines 队列 */}
          <rect x={36} y={52} width={200} height={150} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={136} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>G — Goroutines</text>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={56} y={84 + i * 22} width={160} height={18} rx="3" fill={elevated} stroke={border} />
          ))}
          <text x={136} y={200} textAnchor="middle" fontSize="10" fill={secondary}>~2KB 栈 · 用户态 · 数十万并发</text>

          {/* P 处理器 */}
          <rect x={280} y={52} width={160} height={150} rx="10" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={360} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>P — 处理器</text>
          <text x={360} y={92} textAnchor="middle" fontSize="10" fill={secondary}>本地运行队列 LRQ</text>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={310} y={104 + i * 30} width={100} height={24} rx="4" fill={warning} fillOpacity="0.15" stroke={warning} />
          ))}
          <text x={360} y={200} textAnchor="middle" fontSize="10" fill={secondary}>数量 = GOMAXPROCS</text>

          {/* M 线程 */}
          <rect x={484} y={52} width={200} height={150} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={584} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>M — OS 线程</text>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={514} y={104 + i * 34} width={140} height={28} rx="4" fill={elevated} stroke={success} />
          ))}
          <text x={584} y={200} textAnchor="middle" fontSize="10" fill={secondary}>内核调度 · 阻塞时挂起</text>

          {/* 连线 */}
          <line x1={236} y1={120} x2={280} y2={120} stroke={accent} strokeWidth="1.4" markerEnd="url(#gia-gr-a)" />
          <text x={258} y={112} textAnchor="middle" fontSize="9" fill={secondary}>调度</text>
          <line x1={440} y1={120} x2={484} y2={120} stroke={warning} strokeWidth="1.4" markerEnd="url(#gia-gr-w)" />
          <text x={462} y={112} textAnchor="middle" fontSize="9" fill={secondary}>绑定</text>

          {/* 对比 */}
          <line x1={36} y1={224} x2={684} y2={224} stroke={border} strokeWidth="1" />
          <text x={360} y={246} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>Goroutine vs OS 线程</text>
          <g>
            <rect x={60} y={262} width={290} height={118} rx="8" fill={danger} fillOpacity="0.05" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={205} y={284} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>OS 线程</text>
            <text x={205} y={304} textAnchor="middle" fontSize="10" fill={secondary}>栈 ~1-8MB · 内核调度</text>
            <text x={205} y={322} textAnchor="middle" fontSize="10" fill={secondary}>创建/切换成本高</text>
            <text x={205} y={340} textAnchor="middle" fontSize="10" fill={secondary}>万级已是上限</text>
            <text x={205} y={362} textAnchor="middle" fontSize="10" fill={secondary}>阻塞整线程</text>
          </g>
          <g>
            <rect x={370} y={262} width={290} height={118} rx="8" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={515} y={284} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Goroutine</text>
            <text x={515} y={304} textAnchor="middle" fontSize="10" fill={secondary}>栈 ~2KB 起步 · 用户态调度</text>
            <text x={515} y={322} textAnchor="middle" fontSize="10" fill={secondary}>创建/切换成本极低</text>
            <text x={515} y={340} textAnchor="middle" fontSize="10" fill={secondary}>数十万并发轻松</text>
            <text x={515} y={362} textAnchor="middle" fontSize="10" fill={secondary}>阻塞只挂起 G，M 可跑其他 G</text>
          </g>
          <text x={360} y={394} textAnchor="middle" fontSize="10" fill={secondary}>go func(){}() 即创建——G 挂在 P 的本地队列，M 执行</text>

          <defs>
            <marker id="gia-gr-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker id="gia-gr-w" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Goroutine 通过 G-M-P 模型在少量 OS 线程上调度数十万协程，2KB 栈起步极轻量。
      </figcaption>
    </figure>
  );
}
