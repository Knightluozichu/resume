/**
 * <RplAsyncDiagram>：async fn 编译为状态机 Future，需 runtime 轮询 poll；await 是状态机的暂停/恢复点。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
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

export function RplAsyncDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Rust async/await。async fn 编译为状态机 Future，await 是暂停/恢复点。Future 惰性需 runtime 轮询 poll。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>async/await 与 Future 状态机</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>async fn → 状态机 · Future 惰性需 runtime poll</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--accent)}>async fn</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>编译为状态机</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>每个 await 一状态</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>保存跨 await 变量</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>不自动执行</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke={var(--accent)} strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--success)}>Future + poll</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>poll 推进执行</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>Ready/Pending</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>Waker 注册通知</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>runtime 轮询</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke={var(--success)} strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--warning)} strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--warning)}>Runtime (tokio)</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>任务队列调度</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>IO 事件循环</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>spawn 创建 task</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>Waker 唤醒重 poll</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--accent)} /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--success)} /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>Rust async 协作式（需 await 让出） · Go goroutine 抢占式</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>Future 零开销 · 状态机在堆上大小固定 · 无独立栈</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        async fn 编译为状态机 Future，需 runtime 轮询 poll；await 是状态机的暂停/恢复点。
      </figcaption>
    </figure>
  );
}
