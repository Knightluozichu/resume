/**
 * <EcsGenericConstraintsDiagram>：泛型约束最小化（条款 18-20）。
 *
 * 上：无约束 → T 只能当 object；加约束 → T 获得特定能力
 * 下：五种约束及其解锁的能力，强调「最小约束原则」
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const danger = "var(--danger)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const CONSTRAINTS: { label: string; unlock: string; color: string }[] = [
  { label: "where T : class", unlock: "引用类型 · 可赋 null", color: accent },
  { label: "where T : struct", unlock: "值类型 · 不可 null", color: success },
  { label: "where T : new()", unlock: "可 new T() 构造", color: warning },
  { label: "where T : IComparable<T>", unlock: "可调 CompareTo", color: accent },
  { label: "where T : Base", unlock: "可访问基类成员", color: success },
];

export function EcsGenericConstraintsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="泛型约束最小化。上：无约束时 T 只能当 object 不能调用任何方法；加约束后 T 获得特定能力。下：五种约束 class、struct、new、IComparable、Base 及各自解锁的能力，强调最小约束原则。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ecs-gc-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            泛型约束：用最小约束换最大复用
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            约束越多复用越窄 · 只约束你真正用到的能力
          </text>

          {/* 上：无约束 vs 有约束 */}
          <g>
            <rect x={40} y={76} width={300} height={92} rx="10" fill={danger} fillOpacity="0.05" stroke={danger} strokeWidth="1.6" />
            <text x={190} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>
              无约束
            </text>
            <text x={56} y={122} fontSize="11" fontFamily="monospace" fill={primary}>{"T Max<T>(T a, T b)"}</text>
            <text x={56} y={142} fontSize="11" fill={danger}>T 只能当 object · 不能调方法</text>
            <text x={56} y={160} fontSize="11" fill={secondary}>a.CompareTo(b) 编译报错</text>
          </g>

          <line x1={344} y1={122} x2={376} y2={122} stroke={secondary} strokeWidth="1.6" markerEnd="url(#ecs-gc-arrow)" />
          <text x={360} y={114} textAnchor="middle" fontSize="10" fill={secondary}>加约束</text>

          <g>
            <rect x={380} y={76} width={300} height={92} rx="10" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.6" />
            <text x={530} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
              有约束
            </text>
            <text x={396} y={122} fontSize="11" fontFamily="monospace" fill={primary}>{"T Max<T>(T a, T b)"}</text>
            <text x={396} y={138} fontSize="11" fontFamily="monospace" fill={success}>{"  where T : IComparable<T>"}</text>
            <text x={396} y={158} fontSize="11" fill={success}>编译器知道 T 有 CompareTo</text>
          </g>

          {/* 下：约束表 */}
          <text x={VIEW_W / 2} y={196} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            五种约束 · 解锁的能力
          </text>
          {CONSTRAINTS.map((c, i) => {
            const y = 214 + i * 30;
            return (
              <g key={c.label}>
                <rect x={80} y={y} width={220} height={24} rx="6" fill={c.color} fillOpacity="0.08" stroke={c.color} strokeWidth="1.2" strokeOpacity="0.4" />
                <text x={190} y={y + 17} textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="600" fill={c.color}>
                  {c.label}
                </text>
                <line x1={310} y1={y + 12} x2={330} y2={y + 12} stroke={secondary} strokeWidth="1.2" markerEnd="url(#ecs-gc-arrow)" />
                <text x={340} y={y + 17} fontSize="11" fill={primary}>
                  {c.unlock}
                </text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <line x1={32} y1={376} x2={VIEW_W - 32} y2={376} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>
            只约束你真正调用的成员 · 约束越少，能传入的类型越多，泛型越通用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        不加约束时 T 只能当 object；加约束让编译器知道 T 的能力，从而调用特定成员。Effective C# 强调最小约束：只约束你真正用到的能力，保持泛型的最大复用性。
      </figcaption>
    </figure>
  );
}
