/**
 * <DnmPinningDiagram>：对象固定使 GC 无法移动该对象，导致碎片无法整理；优化策略是缩短固定作用域或使用非托管内存。
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

export function DnmPinningDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="对象固定 Pinning 对 GC 压缩的影响。无固定对象时 GC 可正常压缩碎片；有固定对象时碎片被钉住无法整理。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>对象固定（Pinning）对 GC 压缩的影响</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>固定对象不可移动 → 阻碍碎片整理</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--accent)}>固定场景</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>P/Invoke 传指针</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>COM 互操作</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>fixed 语句</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>GCHandle.Pinned</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke={var(--accent)} strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--success)}>对 GC 的影响</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>无法移动固定对象</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>产生碎片空洞</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>Gen0/1 也碎片化</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>分配失败风险</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke={var(--success)} strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--warning)} strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--warning)}>优化策略</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>缩短 fixed 作用域</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>用非托管内存</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>fixed buffer 嵌入</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>[LibraryImport] 源生成</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--accent)} /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--success)} /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>短期固定影响小 · 长期固定阻碍压缩 · 集中固定减少碎片</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对象固定使 GC 无法移动该对象，导致碎片无法整理；优化策略是缩短固定作用域或使用非托管内存。
      </figcaption>
    </figure>
  );
}
