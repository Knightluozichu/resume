/**
 * <RplErrorHandlingDiagram>：Rust 用 Result<T,E> 替代异常，? 运算符传播错误，thiserror/anyhow 分别用于库和应用。
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

export function RplErrorHandlingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Rust 错误处理。Result<T,E> 和 Option<T> 替代异常，? 运算符传播错误。thiserror 用于库，anyhow 用于应用。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>错误处理：Result 与 ?</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>无异常 · Result<T,E> 显式处理 · ? 传播 · thiserror/anyhow</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--accent)}>Result/Option</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>Result<T,E></text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>Ok(T)/Err(E)</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>Option<T></text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>Some(T)/None</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke={var(--accent)} strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--success)}>? 运算符</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>Err 自动返回</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>Ok 解包继续</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>None 自动返回</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>自动 From 转换</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke={var(--success)} strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke={var(--warning)} strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--warning)}>错误类型库</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>thiserror: 库</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>anyhow: 应用</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>derive 宏</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>From 自动转换</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--accent)} /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={var(--success)} /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>可恢复错误用 Result · 不可恢复用 panic! · ? 显式传播</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>库用 thiserror 定义精确错误类型 · 应用用 anyhow 装箱</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust 用 Result<T,E> 替代异常，? 运算符传播错误，thiserror/anyhow 分别用于库和应用。
      </figcaption>
    </figure>
  );
}
