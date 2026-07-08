/**
 * <RplOwnershipDiagram>：Rust 所有权系统：move 语义转移所有权避免 double-free，drop 在离开作用域时自动释放内存。
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

export function RplOwnershipDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Rust 所有权系统。move 语义：赋值时所有权转移原变量失效；drop 在离开作用域时自动释放内存。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>Rust 所有权系统：Move 与 Drop</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>每个值有唯一所有者 · move 转移所有权 · drop 自动释放</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--accent)}>分配</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>String::from()</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>堆上分配数据</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>栈上存三元组</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>变量是所有者</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke={var(--accent)} strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--success)}>Move 转移</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>let s2 = s1</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>栈三元组复制</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>s1 失效</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>避免 double-free</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke={var(--success)} strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--warning)} strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--warning)}>Drop 释放</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>离开作用域</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>自动调用 drop</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>释放堆内存</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>无需手动 free</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--accent)} /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--success)} /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>Copy 类型（i32 等）赋值时复制不 move · String 等有堆数据的类型 move</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>所有权是 Rust 内存安全的基础 · 编译期保证无泄漏无 double-free</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust 所有权系统：move 语义转移所有权避免 double-free，drop 在离开作用域时自动释放内存。
      </figcaption>
    </figure>
  );
}
