/**
 * <CfpMonadsDiagram>：Monad 链式组合。
 *
 * 上半：Maybe/Option Monad——Some/None 的链式操作。
 * 下半：Bind 操作——接受值，返回包装值，自动短路 None。
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

export function CfpMonadsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
         aria-label="Monad链式组合。上半展示Maybe/Option的Some/None链式操作。下半展示Bind操作：接受值返回包装值，遇到None自动短路。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Monad 与链式组合
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            包装值 · Bind 链式 · 短路传播 · 消除嵌套 if-null
          </text>

          {/* 上半：Some 链 vs None 短路 */}
          <text x={VIEW_W / 2} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            Maybe Monad：Some 链 vs None 短路
          </text>

          {/* Some 路径（上） */}
          <rect x={40} y={92} width={640} height={56} rx="6" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1" />
          <text x={56} y={110} fontSize="11" fontWeight="700" fill={success}>Some 路径：</text>

          <rect x={150} y={100} width={70} height={32} rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={185} y={121} textAnchor="middle" fontSize="11" fill={success} fontFamily="monospace">Some(5)</text>

          <line x1={225} y1={116} x2={245} y2={116} stroke={success} strokeWidth="1.2" markerEnd="url(#cfp-mo-arrow)" />
          <text x={235} y={110} textAnchor="middle" fontSize="9" fill={secondary}>Bind</text>
          <text x={235} y={132} textAnchor="middle" fontSize="8" fill={secondary}>x2</text>

          <rect x={250} y={100} width={70} height={32} rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={285} y={121} textAnchor="middle" fontSize="11" fill={success} fontFamily="monospace">Some(10)</text>

          <line x1={325} y1={116} x2={345} y2={116} stroke={success} strokeWidth="1.2" markerEnd="url(#cfp-mo-arrow)" />
          <text x={335} y={110} textAnchor="middle" fontSize="9" fill={secondary}>Bind</text>
          <text x={335} y={132} textAnchor="middle" fontSize="8" fill={secondary}>+1</text>

          <rect x={350} y={100} width={70} height={32} rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={385} y={121} textAnchor="middle" fontSize="11" fill={success} fontFamily="monospace">Some(11)</text>

          <line x1={425} y1={116} x2={445} y2={116} stroke={success} strokeWidth="1.2" markerEnd="url(#cfp-mo-arrow)" />
          <text x={435} y={110} textAnchor="middle" fontSize="9" fill={secondary}>Bind</text>
          <text x={435} y={132} textAnchor="middle" fontSize="8" fill={secondary}>toString</text>

          <rect x={450} y={100} width={80} height={32} rx="4" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.4" />
          <text x={490} y={121} textAnchor="middle" fontSize="11" fill={success} fontFamily="monospace">{"Some(\"11\")"}</text>

          <text x={560} y={121} fontSize="10" fill={secondary}>全链执行</text>

          {/* None 路径（下） */}
          <rect x={40} y={158} width={640} height={56} rx="6" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1" />
          <text x={56} y={176} fontSize="11" fontWeight="700" fill={danger}>None 路径：</text>

          <rect x={150} y={166} width={70} height={32} rx="4" fill={elevated} stroke={danger} strokeWidth="1" />
          <text x={185} y={187} textAnchor="middle" fontSize="11" fill={danger} fontFamily="monospace">None</text>

          <line x1={225} y1={182} x2={245} y2={182} stroke={danger} strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#cfp-mo-arrow)" />

          <rect x={250} y={166} width={70} height={32} rx="4" fill={elevated} stroke={danger} strokeWidth="1" strokeDasharray="3 2" />
          <text x={285} y={187} textAnchor="middle" fontSize="11" fill={danger} fontFamily="monospace">None</text>

          <line x1={325} y1={182} x2={345} y2={182} stroke={danger} strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#cfp-mo-arrow)" />

          <rect x={350} y={166} width={70} height={32} rx="4" fill={elevated} stroke={danger} strokeWidth="1" strokeDasharray="3 2" />
          <text x={385} y={187} textAnchor="middle" fontSize="11" fill={danger} fontFamily="monospace">None</text>

          <line x1={425} y1={182} x2={445} y2={182} stroke={danger} strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#cfp-mo-arrow)" />

          <rect x={450} y={166} width={80} height={32} rx="4" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1.4" strokeDasharray="3 2" />
          <text x={490} y={187} textAnchor="middle" fontSize="11" fill={danger} fontFamily="monospace">None</text>

          <text x={560} y={187} fontSize="10" fill={danger}>短路传播</text>

          {/* 分隔线 */}
          <line x1={32} y1={234} x2={VIEW_W - 32} y2={234} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：命令式 vs Monad */}
          <text x={VIEW_W / 2} y={260} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            命令式 if-null 嵌套 vs Monad 链式
          </text>

          {/* 命令式（左） */}
          <rect x={40} y={274} width={305} height={86} rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.2" />
          <text x={192} y={294} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>命令式：嵌套 if-null</text>
          <text x={54} y={314} fontSize="11" fill={primary} fontFamily="monospace">{"if (a != null)"}</text>
          <text x={54} y={330} fontSize="11" fill={primary} fontFamily="monospace">{"  if (a.B != null)"}</text>
          <text x={54} y={346} fontSize="11" fill={primary} fontFamily="monospace">{"    return a.B.C;"}</text>
          <text x={54} y={356} fontSize="10" fill={danger}>3 层嵌套 · 可读性差</text>

          {/* Monad（右） */}
          <rect x={375} y={274} width={305} height={86} rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.2" />
          <text x={527} y={294} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>Monad：链式 Bind</text>
          <text x={389} y={314} fontSize="11" fill={success} fontFamily="monospace">{"return Maybe.From(a)"}</text>
          <text x={389} y={330} fontSize="11" fill={success} fontFamily="monospace">{"  .Bind(x => x.B)"}</text>
          <text x={389} y={346} fontSize="11" fill={success} fontFamily="monospace">{"  .Bind(x => x.C);"}</text>
          <text x={389} y={356} fontSize="10" fill={success}>扁平链式 · None 自动短路</text>

          {/* 底部总结 */}
          <line x1={32} y1={378} x2={VIEW_W - 32} y2={378} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={396} textAnchor="middle" fontSize="11" fill={secondary}>
            Monad = 包装值 + Bind 操作 · Bind 接受函数返回新 Monad · None 短路传播
          </text>
          <text x={VIEW_W / 2} y={412} textAnchor="middle" fontSize="10" fill={secondary}>
            C# 中 SelectMany 是 Monad 的 Bind · LINQ 查询语法天然支持 Monad 链
          </text>

          <defs>
            <marker id="cfp-mo-arrow" markerWidth="6" markerHeight="6" refX="5" refY="2" orient="auto">
              <path d="M0 0 L5 2 L0 4 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Maybe Monad 的 Some 链式传播与 None 短路，消除嵌套 if-null。
      </figcaption>
    </figure>
  );
}
