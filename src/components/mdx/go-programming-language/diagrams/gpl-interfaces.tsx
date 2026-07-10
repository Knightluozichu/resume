/**
 * <GplInterfacesDiagram>：Go 接口隐式实现，拥有方法即满足；小接口原则（1-3 个方法）可组合。
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

export function GplInterfacesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Go 接口隐式实现。只要类型拥有接口所有方法就自动满足，不需声明 implements。小接口原则。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`接口：隐式实现与类型断言`}</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>{`不需 implements · 拥有方法即满足 · 小接口原则`}</text>
          <rect x={115} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--accent)" strokeWidth="1.2" />
          <text x={190} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">{`隐式实现`}</text>
          <text x={190} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`拥有方法即满足`}</text>
          <text x={190} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`不需声明 implements`}</text>
          <text x={190} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`已有类型可满足新接口`}</text>
          <text x={190} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`鸭子类型安全版`}</text>
          <line x1={265} y1={156} x2={285} y2={156} stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#fd-a-0)" />
          <rect x={285} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--success)" strokeWidth="1.2" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">{`类型断言`}</text>
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`v := i.(int)`}</text>
          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`v, ok := i.(int)`}</text>
          <text x={360} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`type switch`}</text>
          <text x={360} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`空接口 any`}</text>
          <line x1={435} y1={156} x2={455} y2={156} stroke="var(--success)" strokeWidth="1.2" markerEnd="url(#fd-a-1)" />
          <rect x={455} y={76} width={150} height={160} rx="8" fill={elevated} stroke="var(--warning)" strokeWidth="1.2" />
          <text x={530} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">{`接口内部`}</text>
          <text x={530} y={118} textAnchor="middle" fontSize="10" fill={secondary}>{`(type, value)`}</text>
          <text x={530} y={136} textAnchor="middle" fontSize="10" fill={secondary}>{`nil 接口 (nil,nil)`}</text>
          <text x={530} y={154} textAnchor="middle" fontSize="10" fill={secondary}>{`值为 nil 的接口`}</text>
          <text x={530} y={172} textAnchor="middle" fontSize="10" fill={secondary}>{`陷阱: type 非 nil`}</text>
          <defs>
            <marker id="fd-a-0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" /></marker>
            <marker id="fd-a-1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--success)" /></marker>
          </defs>
          <line x1={32} y1={264} x2={VIEW_W - 32} y2={264} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>{`小接口原则: 1-3 个方法 · 组合小接口成大接口 · 消费者定义`}</text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>{`io.Reader(Read) · io.Writer(Write) · fmt.Stringer(String)`}</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Go 接口隐式实现，拥有方法即满足；小接口原则（1-3 个方法）可组合。
      </figcaption>
    </figure>
  );
}
