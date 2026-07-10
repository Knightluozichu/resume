/**
 * <DnmFinalizationDiagram>：有 Finalizer 的对象需两次 GC 回收：先移入 freachable 队列等待终结，再第二次 GC 回收内存。
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

export function DnmFinalizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="终结化 Finalization 生命周期。有 Finalizer 的对象需两次 GC 回收：先移入 freachable 队列等待终结器线程调用，再第二次 GC 回收。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`终结化（Finalization）生命周期`}</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>{`Finalizer 对象需两次 GC 回收 · freachable 队列代价`}</text>
          <rect x={30} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--accent)" strokeWidth="1.2" />
          <text x={105} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">{`对象不可达`}</text>
          <text x={105} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`GC 发现无根引用`}</text>
          <text x={105} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`有 Finalizer`}</text>
          <text x={105} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`不直接回收`}</text>
          <line x1={180} y1={156} x2={200} y2={156} stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={200} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--success)" strokeWidth="1.2" />
          <text x={275} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">{`移入 freachable`}</text>
          <text x={275} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`队列本身是根`}</text>
          <text x={275} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`对象重新可达`}</text>
          <text x={275} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`等待终结器线程`}</text>
          <line x1={350} y1={156} x2={370} y2={156} stroke="var(--success)" strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={370} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--warning)" strokeWidth="1.2" />
          <text x={445} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">{`调用 Finalizer`}</text>
          <text x={445} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`终结器线程取出`}</text>
          <text x={445} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`执行 ~ClassName()`}</text>
          <text x={445} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`从队列移除`}</text>
          <line x1={520} y1={156} x2={540} y2={156} stroke="var(--warning)" strokeWidth="1.2" markerEnd="url(#fd-a-2)" />
          <rect x={540} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--danger)" strokeWidth="1.2" />
          <text x={615} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">{`第二次 GC`}</text>
          <text x={615} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`对象真正不可达`}</text>
          <text x={615} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`内存被回收`}</text>
          <text x={615} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`延迟释放`}</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--success)" /></marker>
            <marker id="fd-a-2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>{`推荐 Dispose 模式：using 主动释放 + GC.SuppressFinalize 取消 Finalizer`}</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>{`Finalizer 只作安全网 · 代价是延迟回收+两次 GC+单线程瓶颈`}</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        有 Finalizer 的对象需两次 GC 回收：先移入 freachable 队列等待终结，再第二次 GC 回收内存。
      </figcaption>
    </figure>
  );
}
