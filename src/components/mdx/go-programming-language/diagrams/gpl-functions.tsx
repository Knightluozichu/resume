/**
 * <GplFunctionsDiagram>：Go 函数支持多返回值、defer 延迟调用（LIFO）、闭包捕获变量引用。
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

export function GplFunctionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Go 函数特性。多返回值、defer 延迟调用（LIFO）、闭包捕获变量引用。命名返回值可被 defer 修改。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`函数：多返回值 · defer · 闭包`}</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>{`多返回值+error · defer LIFO 延迟 · 闭包捕获引用`}</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--accent)" strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">{`多返回值`}</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`(int, error)`}</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`result, err := f()`}</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`_ 忽略`}</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`显式错误处理`}</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--success)" strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">{`defer`}</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`LIFO 后进先出`}</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`函数返回时执行`}</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`参数注册时求值`}</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`命名返回值可改`}</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke="var(--success)" strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--warning)" strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">{`闭包`}</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`捕获变量引用`}</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`非值拷贝`}</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`循环变量陷阱`}</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`Go 1.22 修复`}</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--success)" /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>{`defer 用途: 资源释放/锁释放/recover · 有微小性能开销`}</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>{`闭包捕获引用: 后续修改外部变量闭包内也变`}</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Go 函数支持多返回值、defer 延迟调用（LIFO）、闭包捕获变量引用。
      </figcaption>
    </figure>
  );
}
