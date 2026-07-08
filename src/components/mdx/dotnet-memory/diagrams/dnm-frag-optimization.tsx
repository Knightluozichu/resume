/**
 * <DnmFragOptimizationDiagram>：通过 struct 栈分配、Span 零拷贝切片、ArrayPool 池化复用减少堆分配和碎片化。
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

export function DnmFragOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内存碎片优化策略。通过 struct 栈分配、Span 零拷贝、ArrayPool 池化复用减少堆分配和碎片。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>内存碎片优化策略</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>减少分配 · 池化复用 · 零拷贝切片</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--accent)}>分配优化</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>struct 替代 class</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>stackalloc 小数组</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>Span<T> 零拷贝</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>避免装箱</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke={var(--accent)} strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--success)}>池化复用</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>ArrayPool<T> 租用</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>StringBuilder 拼接</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>ObjectPool 复用</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>避免 LOH 分配</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke={var(--success)} strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--warning)} strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--warning)}>生命周期</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>缩短对象生命</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>避免 Gen2 晋升</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>using Dispose</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>SuppressFinalize</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--accent)} /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--success)} /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>struct 栈分配不进堆 · Span 切片零拷贝 · ArrayPool 复用避免 LOH</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>综合运用可将 GC 压力降低 90%+</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        通过 struct 栈分配、Span 零拷贝切片、ArrayPool 池化复用减少堆分配和碎片化。
      </figcaption>
    </figure>
  );
}
