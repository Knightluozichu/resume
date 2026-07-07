/**
 * <CfpPatternMatchingFpDiagram>：函数式模式匹配与 switch 表达式。
 *
 * 上半：switch 表达式 vs if-else 链——声明式 vs 命令式。
 * 下半：模式匹配类型网格——类型/属性/关系/逻辑模式。
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

const PATTERNS = [
  { name: "类型模式", example: "is string s", color: accent },
  { name: "属性模式", example: "is { Length: > 0 }", color: success },
  { name: "关系模式", example: "is > 0 and < 100", color: warning },
  { name: "逻辑模式", example: "is not null", color: danger },
];

export function CfpPatternMatchingFpDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="函数式模式匹配。上半展示 switch 表达式替代 if-else 链。下半展示四种模式匹配类型：类型模式、属性模式、关系模式、逻辑模式。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            函数式模式匹配与 switch 表达式
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            声明式分支 · 模式可组合 · 返回值 · 穷尽性检查
          </text>

          {/* 上半：if-else vs switch 表达式 */}
          <text x={VIEW_W / 2} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            从 if-else 链到 switch 表达式
          </text>

          {/* if-else（左） */}
          <rect x={40} y={94} width={305} height={104} rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.2" />
          <text x={192} y={114} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>命令式 if-else 链</text>
          <text x={54} y={134} fontSize="11" fill={primary} fontFamily="monospace">{"if (score >= 90)"}</text>
          <text x={54} y={150} fontSize="11" fill={secondary} fontFamily="monospace">{"  grade = \"A\";"}</text>
          <text x={54} y={166} fontSize="11" fill={primary} fontFamily="monospace">{"else if (score >= 80)"}</text>
          <text x={54} y={182} fontSize="11" fill={secondary} fontFamily="monospace">{"  grade = \"B\";"}</text>
          <text x={54} y={194} fontSize="10" fill={danger}>赋值式 · 语句不返回值</text>

          {/* switch 表达式（右） */}
          <rect x={375} y={94} width={305} height={104} rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.2" />
          <text x={527} y={114} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>声明式 switch 表达式</text>
          <text x={389} y={134} fontSize="11" fill={primary} fontFamily="monospace">{"var grade = score switch"}</text>
          <text x={389} y={150} fontSize="11" fill={success} fontFamily="monospace">{"{ >= 90 => \"A\","}</text>
          <text x={389} y={166} fontSize="11" fill={success} fontFamily="monospace">{"  >= 80 => \"B\","}</text>
          <text x={389} y={182} fontSize="11" fill={success} fontFamily="monospace">{"  _ => \"F\" };"}</text>
          <text x={389} y={194} fontSize="10" fill={success}>表达式返回值 · 可组合 · 穷尽检查</text>

          {/* 分隔线 */}
          <line x1={32} y1={222} x2={VIEW_W - 32} y2={222} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：模式类型 */}
          <text x={VIEW_W / 2} y={248} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            四种模式匹配类型
          </text>

          {PATTERNS.map((p, i) => {
            const x = 40 + i * 165;
            return (
              <g key={p.name}>
                <rect x={x} y={262} width={150} height={76} rx="6" fill={p.color} fillOpacity="0.06" stroke={p.color} strokeWidth="1.2" strokeOpacity="0.4" />
                <text x={x + 75} y={284} textAnchor="middle" fontSize="12" fontWeight="700" fill={p.color}>
                  {p.name}
                </text>
                <text x={x + 75} y={308} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">
                  {p.example}
                </text>
                <text x={x + 75} y={326} textAnchor="middle" fontSize="10" fill={secondary}>
                  {i === 0 ? "匹配类型并提取" : i === 1 ? "匹配属性值" : i === 2 ? "比较大小关系" : "组合/否定模式"}
                </text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={32} y1={362} x2={VIEW_W - 32} y2={362} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={380} textAnchor="middle" fontSize="11" fill={secondary}>
            switch 表达式返回值 · 模式可组合（and/or/not）· 穷尽性检查 · _ 是弃元通配
          </text>
          <text x={VIEW_W / 2} y={396} textAnchor="middle" fontSize="10" fill={secondary}>
            模式匹配把控制流变成值表达式 · 从命令式分支走向声明式匹配
          </text>
          <text x={VIEW_W / 2} y={412} textAnchor="middle" fontSize="10" fill={secondary}>
            是函数式编程「用表达式替代语句」的核心体现
          </text>

          <defs />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        switch 表达式与四种模式匹配类型，把控制流变成可组合的值表达式。
      </figcaption>
    </figure>
  );
}
