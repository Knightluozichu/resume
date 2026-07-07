/**
 * <DcsPatternMatchingDiagram>：模式匹配类型与 switch 表达式。
 *
 * 上半：C# 7.0-9.0 模式匹配类型分类（类型/常量/属性/关系/逻辑模式）。
 * 下半：switch 表达式示例——从命令式 if-else 到声明式匹配。
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

interface PatternType {
  name: string;
  version: string;
  example: string;
  color: string;
}

const PATTERNS: readonly PatternType[] = [
  { name: "类型模式", version: "7.0", example: "o is string s", color: accent },
  { name: "常量模式", version: "7.0", example: "x is null", color: accent },
  { name: "属性模式", version: "8.0", example: "p is { Age: >= 18 }", color: success },
  { name: "位置模式", version: "8.0", example: "is Point(0, 0)", color: success },
  { name: "关系模式", version: "9.0", example: "x is > 5 and < 10", color: warning },
  { name: "逻辑模式", version: "9.0", example: "is not null", color: warning },
];

const PM_W = 200;
const PM_H = 52;
const pmX = (i: number) => 50 + (i % 3) * (PM_W + 20);
const pmY = (i: number) => 96 + Math.floor(i / 3) * (PM_H + 14);

export function DcsPatternMatchingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C# 模式匹配。上半展示六种模式类型：类型模式（7.0）、常量模式（7.0）、属性模式（8.0）、位置模式（8.0）、关系模式（9.0）、逻辑模式（9.0）。下半展示从命令式 if-else 到 switch 表达式的进化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            C# 模式匹配与 switch 表达式
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            声明式分支 · 类型/属性/关系/逻辑模式 · 从 if-else 到 switch 表达式
          </text>

          {/* 上半：模式类型网格 */}
          <text x={VIEW_W / 2} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            六种模式匹配类型
          </text>

          {PATTERNS.map((p, i) => {
            const x = pmX(i);
            const y = pmY(i);
            return (
              <g key={p.name}>
                <rect x={x} y={y} width={PM_W} height={PM_H} rx="6" fill={elevated} stroke={p.color} strokeWidth="1.2" strokeOpacity="0.4" />
                <text x={x + 12} y={y + 18} fontSize="12" fontWeight="700" fill={p.color}>
                  {p.name}
                </text>
                <text x={x + PM_W - 12} y={y + 18} textAnchor="end" fontSize="10" fill={secondary} fontFamily="monospace">
                  {`C# ${p.version}`}
                </text>
                <text x={x + 12} y={y + 38} fontSize="11" fill={primary} fontFamily="monospace">
                  {p.example}
                </text>
              </g>
            );
          })}

          {/* 分隔线 */}
          <line x1={32} y1={230} x2={VIEW_W - 32} y2={230} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：if-else vs switch 表达式 */}
          <text x={VIEW_W / 2} y={252} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            命令式 if-else 进化为声明式 switch 表达式
          </text>

          {/* 命令式（左） */}
          <rect x={40} y={266} width={305} height={108} rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.2" />
          <text x={192} y={286} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>命令式 if-else</text>
          <text x={54} y={306} fontSize="11" fill={primary} fontFamily="monospace">{"if (shape is Circle c)"}</text>
          <text x={54} y={322} fontSize="11" fill={secondary} fontFamily="monospace">{"  return $\"r={c.Radius}\";"}</text>
          <text x={54} y={338} fontSize="11" fill={primary} fontFamily="monospace">{"else if (shape is Rect r)"}</text>
          <text x={54} y={354} fontSize="11" fill={secondary} fontFamily="monospace">{"  return $\"{r.W}x{r.H}\";"}</text>
          <text x={54} y={370} fontSize="11" fill={secondary} fontFamily="monospace">{"else return \"?\";"}</text>

          {/* switch 表达式（右） */}
          <rect x={375} y={266} width={305} height={108} rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.2" />
          <text x={527} y={286} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>声明式 switch 表达式</text>
          <text x={389} y={306} fontSize="11" fill={primary} fontFamily="monospace">{"shape switch {"}</text>
          <text x={389} y={322} fontSize="11" fill={success} fontFamily="monospace">{"  Circle c    => ..."}</text>
          <text x={389} y={338} fontSize="11" fill={success} fontFamily="monospace">{"  Rectangle r => ..."}</text>
          <text x={389} y={354} fontSize="11" fill={success} fontFamily="monospace">{"  _           => \"?\""}</text>
          <text x={389} y={370} fontSize="11" fill={secondary} fontFamily="monospace">{"};"}</text>

          {/* 底部总结 */}
          <line x1={32} y1={390} x2={VIEW_W - 32} y2={390} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={408} textAnchor="middle" fontSize="11" fill={secondary}>
            模式可组合 · switch 表达式返回值 · 穷尽性检查 · 从命令式走向函数式
          </text>

          <defs />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C# 7.0-9.0 六种模式匹配类型与 switch 表达式的声明式分支。
      </figcaption>
    </figure>
  );
}
