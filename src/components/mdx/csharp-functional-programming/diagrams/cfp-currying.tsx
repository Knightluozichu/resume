/**
 * <CfpCurryingDiagram>：柯里化与偏应用。
 *
 * 上半：多参数函数 vs 柯里化函数的类型对比。
 * 下半：偏应用——固定部分参数生成新函数。
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

export function CfpCurryingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="柯里化与偏应用。上半展示多参数函数 Add(a,b) 转为柯里化 Add(a)(b) 的过程。下半展示偏应用：固定第一个参数生成新函数。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            柯里化与偏应用
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            多参数拆成单参数链 · 固定部分参数生成新函数
          </text>

          {/* 上半：多参数 vs 柯里化 */}
          <text x={VIEW_W / 2} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            多参数函数 转为 柯里化函数
          </text>

          {/* 多参数（左） */}
          <rect x={40} y={94} width={290} height={90} rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.2" />
          <text x={185} y={114} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>多参数函数</text>
          <text x={54} y={136} fontSize="11" fill={primary} fontFamily="monospace">{"Func<int, int, int> Add ="}</text>
          <text x={54} y={152} fontSize="11" fill={primary} fontFamily="monospace">{"  (a, b) => a + b;"}</text>
          <line x1={54} y1={160} x2={316} y2={160} stroke={danger} strokeWidth="0.8" strokeDasharray="3 2" />
          <text x={54} y={176} fontSize="11" fill={danger} fontFamily="monospace">{"Add(3, 4)  // 7"}</text>

          {/* 箭头 */}
          <line x1={335} y1={139} x2={385} y2={139} stroke={secondary} strokeWidth="1.4" markerEnd="url(#cfp-cur-arrow)" />
          <text x={360} y={131} textAnchor="middle" fontSize="10" fill={secondary}>柯里化</text>

          {/* 柯里化（右） */}
          <rect x={385} y={94} width={295} height={90} rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.2" />
          <text x={532} y={114} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>柯里化函数</text>
          <text x={399} y={136} fontSize="11" fill={primary} fontFamily="monospace">{"Func<int, Func<int, int>>"}</text>
          <text x={399} y={152} fontSize="11" fill={primary} fontFamily="monospace">{"  CurriedAdd = a => b => a + b;"}</text>
          <line x1={399} y1={160} x2={666} y2={160} stroke={success} strokeWidth="0.8" strokeDasharray="3 2" />
          <text x={399} y={176} fontSize="11" fill={success} fontFamily="monospace">{"CurriedAdd(3)(4)  // 7"}</text>

          {/* 分隔线 */}
          <line x1={32} y1={212} x2={VIEW_W - 32} y2={212} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：偏应用 */}
          <text x={VIEW_W / 2} y={238} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            偏应用：固定部分参数，生成新函数
          </text>

          {/* 偏应用流程 */}
          <rect x={40} y={254} width={200} height={100} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={140} y={274} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>原始函数</text>
          <text x={54} y={296} fontSize="11" fill={primary} fontFamily="monospace">{"Func<int, int, int>"}</text>
          <text x={54} y={312} fontSize="11" fill={primary} fontFamily="monospace">{"  Add = (a,b) => a+b"}</text>
          <text x={54} y={332} fontSize="10" fill={secondary}>需要两个参数</text>
          <text x={54} y={346} fontSize="10" fill={secondary}>Add(3, 4) = 7</text>

          {/* 箭头 */}
          <line x1={245} y1={304} x2={290} y2={304} stroke={secondary} strokeWidth="1.4" markerEnd="url(#cfp-cur-arrow)" />
          <text x={268} y={296} textAnchor="middle" fontSize="10" fill={warning}>固定 a=3</text>

          {/* 偏应用结果 */}
          <rect x={290} y={254} width={200} height={100} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" />
          <text x={390} y={274} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>偏应用函数</text>
          <text x={304} y={296} fontSize="11" fill={primary} fontFamily="monospace">{"Func<int, int>"}</text>
          <text x={304} y={312} fontSize="11" fill={warning} fontFamily="monospace">{"  Add3 = Add(3, ?)"}</text>
          <text x={304} y={332} fontSize="10" fill={secondary}>只需一个参数</text>
          <text x={304} y={346} fontSize="10" fill={secondary}>Add3(4) = 7</text>

          {/* 应用示例 */}
          <rect x={510} y={254} width={170} height={100} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" />
          <text x={595} y={274} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>实际应用</text>
          <text x={524} y={296} fontSize="11" fill={primary} fontFamily="monospace">{"var add10 ="}</text>
          <text x={524} y={312} fontSize="11" fill={accent} fontFamily="monospace">{"  Partial(Add, 10);"}</text>
          <text x={524} y={332} fontSize="10" fill={secondary}>复用：add10(5)=15</text>
          <text x={524} y={346} fontSize="10" fill={secondary}>add10(20)=30</text>

          {/* 底部总结 */}
          <line x1={32} y1={380} x2={VIEW_W - 32} y2={380} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>
            柯里化：拆参数链 · 偏应用：固定部分参数 · 两者都返回新函数 · 实现函数复用
          </text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="10" fill={secondary}>
            C# 原生不支持自动柯里化，需手写或用库；偏应用可通过闭包实现
          </text>

          <defs>
            <marker id="cfp-cur-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        柯里化把多参数函数拆成单参数链，偏应用固定部分参数生成可复用的新函数。
      </figcaption>
    </figure>
  );
}
