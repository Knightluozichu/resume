/**
 * <Ec7LinqDiagram>：LINQ 查询流水线。
 *
 * 横向流水线：数据源 → Where 过滤 → OrderBy 排序 → Select 投影 → 结果
 * 每个阶段用一个圆角矩形表示，箭头连接，下方标注延迟执行与立即执行。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
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

const STAGES: { label: string; sub: string; color: string; items: string[] }[] = [
  { label: "数据源", sub: "Source", color: secondary, items: ["numbers", "[3,1,4,1,5,9,2,6]"] },
  { label: "Where", sub: "过滤", color: danger, items: ["x => x > 2", "[3,4,5,9,6]"] },
  { label: "OrderBy", sub: "排序", color: warning, items: ["x => x", "[3,4,5,6,9]"] },
  { label: "Select", sub: "投影", color: success, items: ["x => x * 10", "[30,40,50,60,90]"] },
];

const STAGE_W = 140;
const STAGE_H = 90;
const STAGE_GAP = 24;
const STAGE_START_X = 36;
const stageX = (i: number) => STAGE_START_X + i * (STAGE_W + STAGE_GAP);

export function Ec7LinqDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="LINQ 查询流水线。横向四个阶段：数据源 [3,1,4,1,5,9,2,6] 经过 Where 过滤大于 2 得到 [3,4,5,9,6]，OrderBy 排序得到 [3,4,5,6,9]，Select 投影乘以 10 得到 [30,40,50,60,90]。底部标注延迟执行与立即执行的区别。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ec7-linq-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            LINQ 查询流水线
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill={secondary}>
            Source → Where → OrderBy → Select —— 链式组合 · 延迟执行
          </text>

          {/* 流水线阶段 */}
          {STAGES.map((stage, i) => {
            const x = stageX(i);
            return (
              <g key={stage.label}>
                <rect x={x} y={80} width={STAGE_W} height={STAGE_H} rx="10" fill={stage.color} fillOpacity="0.08" stroke={stage.color} strokeWidth="1.6" />
                <text x={x + STAGE_W / 2} y={102} textAnchor="middle" fontSize="12" fontWeight="700" fill={stage.color}>
                  {stage.label}
                </text>
                <text x={x + STAGE_W / 2} y={118} textAnchor="middle" fontSize="10" fill={secondary}>
                  {stage.sub}
                </text>
                <line x1={x + 10} y1={128} x2={x + STAGE_W - 10} y2={128} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
                <text x={x + STAGE_W / 2} y={146} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>
                  {stage.items[0]}
                </text>
                <text x={x + STAGE_W / 2} y={164} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>
                  {stage.items[1]}
                </text>
              </g>
            );
          })}

          {/* 阶段间箭头 */}
          {[0, 1, 2].map((i) => (
            <line
              key={`arr-${i}`}
              x1={stageX(i) + STAGE_W + 3}
              y1={125}
              x2={stageX(i + 1) - 3}
              y2={125}
              stroke={secondary}
              strokeWidth="1.6"
              markerEnd="url(#ec7-linq-arrow)"
            />
          ))}

          {/* 两种语法对照 */}
          <line x1={32} y1={200} x2={VIEW_W - 32} y2={200} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={222} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            两种语法对照
          </text>

          {/* 查询语法 */}
          <g>
            <rect x={40} y={236} width={310} height={80} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={55} y={256} fontSize="11" fontWeight="700" fill={accent}>查询语法（Query Syntax）</text>
            <text x={55} y={276} fontSize="11" fontFamily="monospace" fill={primary}>{"from x in numbers"}</text>
            <text x={55} y={292} fontSize="11" fontFamily="monospace" fill={primary}>{"where x > 2 orderby x"}</text>
            <text x={55} y={308} fontSize="11" fontFamily="monospace" fill={primary}>{"select x * 10"}</text>
          </g>

          {/* 方法语法 */}
          <g>
            <rect x={370} y={236} width={310} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={385} y={256} fontSize="11" fontWeight="700" fill={success}>方法语法（Fluent Syntax）</text>
            <text x={385} y={276} fontSize="11" fontFamily="monospace" fill={primary}>numbers</text>
            <text x={385} y={292} fontSize="11" fontFamily="monospace" fill={primary}>{"  .Where(x => x > 2)"}</text>
            <text x={385} y={308} fontSize="11" fontFamily="monospace" fill={primary}>{"  .OrderBy(x => x).Select(x => x*10)"}</text>
          </g>

          {/* 执行模式 */}
          <line x1={32} y1={336} x2={VIEW_W - 32} y2={336} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={358} textAnchor="middle" fontSize="11" fill={secondary}>
            <tspan fill={warning} fontWeight="600">延迟执行</tspan>：Where / OrderBy / Select —— 枚举时才求值
          </text>
          <text x={VIEW_W / 2} y={378} textAnchor="middle" fontSize="11" fill={secondary}>
            <tspan fill={danger} fontWeight="600">立即执行</tspan>：ToList / Count / First —— 触发求值
          </text>
          <text x={VIEW_W / 2} y={400} textAnchor="middle" fontSize="11" fill={secondary}>
            延迟执行 = 按需计算 · 可多次枚举 · 链式组合中间不产生集合
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LINQ 把数据查询抽象为流水线：Where 过滤、OrderBy 排序、Select 投影链式组合，延迟执行到枚举时才求值。
      </figcaption>
    </figure>
  );
}
