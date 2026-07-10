/**
 * <RplGenericsDiagram>：泛型通过单态化为每种类型生成独立代码，零运行时开销；关联类型表示一对一关系。
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

export function RplGenericsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Rust 泛型与单态化。编译器为每种具体类型生成独立代码，零运行时开销但代码体积增大。关联类型 vs 泛型参数。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`泛型与单态化`}</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>{`编译期为每种类型生成独立代码 · 零运行时开销`}</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--accent)" strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">{`泛型函数`}</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`fn f<T: Trait>`}</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`trait bound 约束`}</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`编译期验证操作`}</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`单态化生成`}</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--success)" strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">{`单态化`}</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`每种类型一份代码`}</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`直接调用无 vtable`}</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`零运行时开销`}</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`代码体积增大`}</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke="var(--success)" strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--warning)" strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">{`关联类型`}</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`trait Iterator`}</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`type Item`}</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`一对一关系`}</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`只能实现一次`}</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--success)" /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>{`泛型参数: 多对一（可多次实现） · 关联类型: 一对一（只能一次）`}</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>{`impl Trait 语法: fn f(x: impl Clone) 等价泛型 bound`}</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        泛型通过单态化为每种类型生成独立代码，零运行时开销；关联类型表示一对一关系。
      </figcaption>
    </figure>
  );
}
