/**
 * <GplChannelsDiagram>：channel 无缓冲同步握手，有缓冲异步解耦；close 通知接收方不会有更多数据。
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

export function GplChannelsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="channel 类型化管道。无缓冲同步握手，有缓冲异步解耦。close 通知无更多数据。CSP 通信模型。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>channel：类型化通信管道</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>无缓冲同步 · 有缓冲异步 · close 通知</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--accent)}>无缓冲</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>make(chan T)</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>发送阻塞等接收</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>接收阻塞等发送</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>同步握手</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke={var(--accent)} strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--success)}>有缓冲</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>make(chan T, N)</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>满则发送阻塞</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>空则接收阻塞</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>异步解耦</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke={var(--success)} strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--warning)} strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--warning)}>关闭规则</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>close(ch)</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>发送到已关闭 panic</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>接收返回零值+false</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>只有发送方关闭</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--accent)} /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--success)} /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>CSP 模型: 不要通过共享内存通信, 通过通信共享内存</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>for v := range ch 自动在关闭且空时退出</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        channel 无缓冲同步握手，有缓冲异步解耦；close 通知接收方不会有更多数据。
      </figcaption>
    </figure>
  );
}
