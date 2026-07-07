/**
 * <CfpFunctionsFirstDiagram>：函数作为一等公民。
 *
 * 上半：函数是一等公民的三个体现——赋值给变量、作为参数传递、作为返回值。
 * 下半：从命令式循环到函数式声明式管道的进化。
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

const FEATURES = [
  { title: "赋值给变量", code: "Func<int,int> f = x => x * 2;", color: accent },
  { title: "作为参数传递", code: "nums.Where(x => x > 5)", color: success },
  { title: "作为返回值", code: "Func<int,int> Adder(int n) => x => x + n;", color: warning },
];

export function CfpFunctionsFirstDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="函数作为一等公民。上半展示三个体现：赋值给变量、作为参数传递、作为返回值。下半展示从命令式循环到函数式声明式管道的进化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            函数是一等公民（First-Class Citizen）
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            可赋值 · 可传参 · 可返回 · 与 int/string 同等地位
          </text>

          {/* 上半：三个体现 */}
          <text x={VIEW_W / 2} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            函数与数据享有同等权利
          </text>

          {FEATURES.map((f, i) => {
            const x = 40 + i * 220;
            return (
              <g key={f.title}>
                <rect x={x} y={94} width={200} height={86} rx="8" fill={f.color} fillOpacity="0.06" stroke={f.color} strokeWidth="1.2" strokeOpacity="0.4" />
                <text x={x + 100} y={116} textAnchor="middle" fontSize="12" fontWeight="700" fill={f.color}>
                  {f.title}
                </text>
                <text x={x + 100} y={142} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">
                  {f.code.length > 28 ? f.code.substring(0, 28) : f.code}
                </text>
                <text x={x + 100} y={166} textAnchor="middle" fontSize="10" fill={secondary}>
                  {i === 0 ? "函数即值" : i === 1 ? "函数即参数" : "函数即工厂"}
                </text>
              </g>
            );
          })}

          {/* 分隔线 */}
          <line x1={32} y1={208} x2={VIEW_W - 32} y2={208} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：命令式 vs 函数式 */}
          <text x={VIEW_W / 2} y={234} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            从命令式循环到函数式管道
          </text>

          {/* 命令式（左） */}
          <rect x={40} y={250} width={305} height={120} rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.2" />
          <text x={192} y={270} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>命令式：告诉机器每一步</text>
          <text x={54} y={290} fontSize="11" fill={primary} fontFamily="monospace">{"var result = new List<int>();"}</text>
          <text x={54} y={306} fontSize="11" fill={primary} fontFamily="monospace">{"foreach (var x in nums)"}</text>
          <text x={54} y={322} fontSize="11" fill={primary} fontFamily="monospace">{"  if (x > 5)"}</text>
          <text x={54} y={338} fontSize="11" fill={primary} fontFamily="monospace">{"    result.Add(x * 2);"}</text>
          <line x1={54} y1={346} x2={330} y2={346} stroke={danger} strokeWidth="0.8" strokeDasharray="3 2" />
          <text x={54} y={362} fontSize="10" fill={secondary}>循环 + 条件 + 手动累加</text>

          {/* 函数式（右） */}
          <rect x={375} y={250} width={305} height={120} rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.2" />
          <text x={527} y={270} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>函数式：描述做什么</text>
          <text x={389} y={294} fontSize="11" fill={success} fontFamily="monospace">{"nums"}</text>
          <text x={389} y={310} fontSize="11" fill={success} fontFamily="monospace">{"  .Where(x => x > 5)"}</text>
          <text x={389} y={326} fontSize="11" fill={success} fontFamily="monospace">{"  .Select(x => x * 2)"}</text>
          <text x={389} y={342} fontSize="11" fill={success} fontFamily="monospace">{"  .ToList();"}</text>
          <line x1={389} y1={350} x2={665} y2={350} stroke={success} strokeWidth="0.8" strokeDasharray="3 2" />
          <text x={389} y={366} fontSize="10" fill={secondary}>过滤 + 映射 · 声明式管道</text>

          {/* 底部总结 */}
          <line x1={32} y1={388} x2={VIEW_W - 32} y2={388} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={406} textAnchor="middle" fontSize="11" fill={secondary}>
            函数即数据 · 管道即流水线 · 描述 what 而非 how · LINQ 是 C# 函数式的心脏
          </text>

          <defs />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数作为一等公民的三个体现，以及从命令式到函数式的范式转变。
      </figcaption>
    </figure>
  );
}
