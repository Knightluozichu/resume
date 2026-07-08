/**
 * <GplSelectDiagram>：select 多路复用：多 case 就绪随机选，default 非阻塞，nil channel 动态禁用分支。
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

export function GplSelectDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="select 多路复用。多 case 就绪随机选一个，default 非阻塞，nil channel 禁用分支。超时控制。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>select：多路复用与超时</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>随机选择 · default 非阻塞 · nil channel 动态禁用</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--accent)}>多路复用</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>监听多 channel</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>就绪随机选一</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>无 default 阻塞</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>有 default 非阻塞</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke={var(--accent)} strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--success)}>超时控制</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>time.After(d)</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>case <-timer</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>防止永久阻塞</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>或 context.WithTimeout</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke={var(--success)} strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--warning)} strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--warning)}>nil channel</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>发送接收永阻塞</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>select 中禁用该 case</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>动态启停分支</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>ch=nil/ch=real</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--accent)} /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--success)} /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>default 用途: 非阻塞接收/发送 · select 成为非阻塞多路复用器</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>Go select 不支持优先级 · 嵌套 select 模拟</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        select 多路复用：多 case 就绪随机选，default 非阻塞，nil channel 动态禁用分支。
      </figcaption>
    </figure>
  );
}
