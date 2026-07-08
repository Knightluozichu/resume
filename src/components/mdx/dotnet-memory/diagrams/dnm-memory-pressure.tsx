/**
 * <DnmMemoryPressureDiagram>：GC 感知不到非托管内存，需 AddMemoryPressure 告知；SafeHandle 自动管理压力和释放。
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

export function DnmMemoryPressureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内存压力与 AddMemoryPressure。非托管内存 GC 感知不到，需通过 AddMemoryPressure 告知 GC，让其在调度回收时考虑非托管内存开销。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>内存压力（Memory Pressure）协调</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>AddMemoryPressure 让 GC 感知非托管内存 · SafeHandle 自动管理</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--accent)}>问题</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>P/Invoke malloc</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>GC 感知不到</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>不触发回收</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>OOM 风险</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke={var(--accent)} strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--success)}>解决方案</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>AddMemoryPressure</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>告知 GC 额外占用</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>GC 调度时考虑</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>更积极回收</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke={var(--success)} strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--warning)} strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--warning)}>SafeHandle</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>封装非托管句柄</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>自动 Finalizer</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>自动压力管理</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>引用计数保护</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--accent)} /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--success)} /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>AddMemoryPressure(size) 分配时调用 · RemoveMemoryPressure(size) 释放时调用</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>推荐用 SafeHandle 替代手动 IntPtr + AddMemoryPressure</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GC 感知不到非托管内存，需 AddMemoryPressure 告知；SafeHandle 自动管理压力和释放。
      </figcaption>
    </figure>
  );
}
