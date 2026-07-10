/**
 * <GplGoroutinesDiagram>：goroutine 轻量（2KB 栈），GMP 模型调度；用 context 控制生命周期避免泄漏。
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

export function GplGoroutinesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="goroutine 轻量级协程。初始栈 2KB 可增长，GMP 调度模型。用 context 控制生命周期避免泄漏。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`goroutine 与 GMP 调度`}</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>{`轻量协程 2KB 栈 · GMP 三层调度 · context 控制`}</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--accent)" strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">{`goroutine`}</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`初始栈 2KB`}</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`可增长到 1GB`}</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`go func(){}()`}</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`百万级并发`}</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--success)" strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">{`GMP 调度`}</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`G: 协程`}</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`M: OS 线程`}</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`P: 逻辑处理器`}</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`work stealing`}</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke="var(--success)" strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--warning)" strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">{`生命周期`}</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`context 取消`}</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`ctx.Done() 退出`}</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`context.WithTimeout`}</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`避免泄漏`}</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--success)" /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>{`goroutine 无内置 ID · 用 context 或 done channel 控制退出`}</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>{`泄漏场景: goroutine 阻塞在 channel 但发送方已退出`}</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        goroutine 轻量（2KB 栈），GMP 模型调度；用 context 控制生命周期避免泄漏。
      </figcaption>
    </figure>
  );
}
