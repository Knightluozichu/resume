/**
 * <RplTraitsDiagram>：trait 支持静态分发（泛型单态化零开销）和动态分发（dyn vtable 运行时查找）。
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

export function RplTraitsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Rust trait 定义与实现。静态分发（泛型单态化）零开销，动态分发（dyn Trait）通过 vtable 运行时查找。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`trait 与多态分发`}</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>{`静态分发（泛型单态化）vs 动态分发（dyn vtable）`}</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--accent)" strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">{`trait 定义`}</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`方法签名`}</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`默认实现`}</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`关联类型`}</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`孤儿规则`}</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--success)" strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">{`静态分发`}</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`泛型 + bound`}</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`单态化生成代码`}</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`零运行时开销`}</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`代码体积增大`}</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke="var(--success)" strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--warning)" strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">{`动态分发`}</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`&dyn Trait`}</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`vtable 查找`}</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`一次间接跳转`}</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`体积小可异构`}</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--success)" /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>{`性能关键用泛型（静态） · 需异构集合用 dyn（动态）`}</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>{`trait bound: T: Clone + Debug · where 子句复杂约束`}</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        trait 支持静态分发（泛型单态化零开销）和动态分发（dyn vtable 运行时查找）。
      </figcaption>
    </figure>
  );
}
