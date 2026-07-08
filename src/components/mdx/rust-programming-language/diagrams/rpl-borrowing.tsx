/**
 * <RplBorrowingDiagram>：借用规则：不可变引用可多个，可变引用独占；NLL 让引用生命周期只到最后一次使用处。
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

export function RplBorrowingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Rust 借用规则。不可变引用 &T 可多个共存，可变引用 &mut T 独占，两者不能同时存在。NLL 优化借用检查。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>借用与引用规则</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>&T 可多个 · &mut T 独占 · NLL 优化生命周期</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--accent)}>&T 不可变</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>只读引用</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>可同时多个</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>不影响所有权</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>Copy 可复制</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke={var(--accent)} strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--success)}>&mut T 可变</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>可写引用</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>同一时间一个</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>原变量需 mut</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>不可 Copy</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke={var(--success)} strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--warning)} strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--warning)}>NLL 优化</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>引用活跃范围</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>到最后使用处</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>非作用域结束</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>更多代码通过</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--accent)} /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--success)} /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>借用规则防止数据竞争和悬空引用 · 编译期由借用检查器强制</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>&T 和 &mut T 不能共存 · 多个 &mut T 不能共存</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        借用规则：不可变引用可多个，可变引用独占；NLL 让引用生命周期只到最后一次使用处。
      </figcaption>
    </figure>
  );
}
