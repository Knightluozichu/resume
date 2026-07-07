/**
 * <DcsLambdaClosureDiagram>：Lambda 闭包与变量捕获。
 *
 * 上半：Lambda 捕获外部变量的机制——编译器生成闭包类。
 * 下半：修改的闭包陷阱——for 循环变量捕获 vs 局部副本修复。
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

export function DcsLambdaClosureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lambda 与闭包。上半展示闭包机制：Lambda 捕获外部变量，编译器生成闭包类把变量提升为字段。下半展示修改的闭包陷阱：for 循环变量捕获导致所有 Lambda 看到最终值，用局部副本修复。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Lambda 闭包与变量捕获
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            按引用捕获 · 闭包类提升 · 修改的闭包陷阱
          </text>

          {/* 上半：闭包机制 */}
          <text x={VIEW_W / 2} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            闭包机制：捕获变量 = 提升到闭包类字段
          </text>

          {/* 原始代码 */}
          <rect x={40} y={94} width={200} height={90} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={140} y={114} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>原始代码</text>
          <text x={54} y={132} fontSize="11" fill={primary} fontFamily="monospace">{"int factor = 10;"}</text>
          <text x={54} y={148} fontSize="11" fill={success} fontFamily="monospace">{"Func<int,int> f ="}</text>
          <text x={54} y={164} fontSize="11" fill={success} fontFamily="monospace">{"  x => x * factor;"}</text>
          <text x={54} y={180} fontSize="11" fill={warning} fontFamily="monospace">{"factor = 20;"}</text>

          {/* 箭头 */}
          <line x1={245} y1={139} x2={285} y2={139} stroke={secondary} strokeWidth="1.4" markerEnd="url(#dcs-lc-arrow)" />
          <text x={265} y={131} textAnchor="middle" fontSize="10" fill={secondary}>编译</text>

          {/* 闭包类 */}
          <rect x={285} y={94} width={215} height={90} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={392} y={114} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>编译器生成的闭包类</text>
          <text x={299} y={132} fontSize="11" fill={primary} fontFamily="monospace">{"class Closure {"}</text>
          <text x={299} y={148} fontSize="11" fill={warning} fontFamily="monospace">{"  public int factor;"}</text>
          <text x={299} y={164} fontSize="11" fill={success} fontFamily="monospace">{"  int Mul(int x)"}</text>
          <text x={299} y={180} fontSize="11" fill={success} fontFamily="monospace">{"    => x * factor;"}</text>

          {/* 结果 */}
          <rect x={520} y={94} width={160} height={90} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={600} y={114} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>结果</text>
          <text x={600} y={138} textAnchor="middle" fontSize="12" fill={primary} fontFamily="monospace">{"f(5)"}</text>
          <text x={600} y={160} textAnchor="middle" fontSize="16" fontWeight="700" fill={danger}>{"= 100"}</text>
          <text x={600} y={178} textAnchor="middle" fontSize="10" fill={secondary}>不是 50 · 按引用</text>

          {/* 分隔线 */}
          <line x1={32} y1={210} x2={VIEW_W - 32} y2={210} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：修改的闭包陷阱 */}
          <text x={VIEW_W / 2} y={236} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>
            修改的闭包陷阱：for 循环变量捕获
          </text>

          {/* 陷阱（左） */}
          <rect x={40} y={252} width={305} height={120} rx="8" fill={danger} fillOpacity="0.05" stroke={danger} strokeWidth="1.2" />
          <text x={192} y={272} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>陷阱：捕获同一个 i</text>
          <text x={54} y={292} fontSize="11" fill={primary} fontFamily="monospace">{"for (int i = 0; i < 3; i++)"}</text>
          <text x={54} y={308} fontSize="11" fill={success} fontFamily="monospace">{"  actions.Add(() =>"}</text>
          <text x={54} y={324} fontSize="11" fill={success} fontFamily="monospace">{"    Console.WriteLine(i));"}</text>
          <line x1={54} y1={332} x2={330} y2={332} stroke={danger} strokeWidth="0.8" strokeDasharray="3 2" />
          <text x={54} y={348} fontSize="11" fill={danger} fontFamily="monospace">{"// 输出: 3  3  3"}</text>
          <text x={54} y={364} fontSize="10" fill={secondary}>三个 Lambda 共享同一个 i</text>

          {/* 修复（右） */}
          <rect x={375} y={252} width={305} height={120} rx="8" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.2" />
          <text x={527} y={272} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>修复：局部副本</text>
          <text x={389} y={292} fontSize="11" fill={primary} fontFamily="monospace">{"for (int i = 0; i < 3; i++)"}</text>
          <text x={389} y={308} fontSize="11" fill={primary} fontFamily="monospace">{"{"}</text>
          <text x={389} y={324} fontSize="11" fill={accent} fontFamily="monospace">{"  int local = i;  // 副本"}</text>
          <text x={389} y={340} fontSize="11" fill={success} fontFamily="monospace">{"  actions.Add(() =>"}</text>
          <text x={389} y={356} fontSize="11" fill={success} fontFamily="monospace">{"    Console.WriteLine(local));"}</text>
          <text x={389} y={372} fontSize="11" fill={success} fontFamily="monospace">{"// 输出: 0  1  2"}</text>

          {/* 底部总结 */}
          <line x1={32} y1={388} x2={VIEW_W - 32} y2={388} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={406} textAnchor="middle" fontSize="11" fill={secondary}>
            C# 按引用捕获变量 · for 循环的 i 是同一个 · foreach（C# 5.0+）每次迭代是新变量
          </text>

          <defs>
            <marker id="dcs-lc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lambda 闭包按引用捕获变量，循环变量捕获需用局部副本修复。
      </figcaption>
    </figure>
  );
}
