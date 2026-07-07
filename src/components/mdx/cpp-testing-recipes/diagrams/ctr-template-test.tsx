/**
 * <CtrTemplateTestDiagram>：模板类型推导三情形与 SFINAE→concepts 演进。
 *
 * 左面板：类型推导三情形（T& / T&& 万能引用 / T 按值）及 T 的推导结果。
 * 右面板：SFINAE（enable_if）到 C++20 concepts 的演进对照。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const LEFT_X = 32;
const LEFT_W = 340;
const RIGHT_X = 392;
const RIGHT_W = 296;

interface DeductionRow {
  param: string;
  arg: string;
  result: string;
  color: string;
}

const ROWS: readonly DeductionRow[] = [
  { param: "T& x（普通引用）", arg: "int&", result: "T = int", color: "var(--accent)" },
  { param: "T&& x（万能引用）", arg: "int&", result: "T = int&（折叠）", color: "var(--success)" },
  { param: "T x（按值）", arg: "const int&", result: "T = int（去 cv）", color: "var(--warning)" },
];

export function CtrTemplateTestDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="模板类型推导与 SFINAE 演进。左面板类型推导三情形：T& 普通引用传 int& 推导 T=int；T&& 万能引用传 int& 推导 T=int& 经引用折叠；T 按值传 const int& 推导 T=int 去 const 引用。右面板 SFINAE 到 concepts 演进：SFINAE 用 enable_if 约束错误晦涩，C++20 concepts 用 requires 错误友好。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            模板类型推导与约束演进
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            推导三情形 · SFINAE 到 C++20 concepts
          </text>

          {/* 左面板：类型推导三情形 */}
          <g>
            <rect x={LEFT_X} y={80} width={LEFT_W} height={300} rx="10" fill={elevated} stroke={border} strokeWidth="1.4" />
            <rect x={LEFT_X} y={80} width={LEFT_W} height={34} rx="10" fill="var(--accent)" fillOpacity="0.14" />
            <rect x={LEFT_X} y={104} width={LEFT_W} height={10} fill="var(--accent)" fillOpacity="0.14" />
            <text x={LEFT_X + LEFT_W / 2} y={102} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">
              类型推导三情形
            </text>

            {/* 表头 */}
            <text x={LEFT_X + 20} y={138} textAnchor="start" fontSize="11" fontWeight="700" fill={secondary}>ParamType</text>
            <text x={LEFT_X + 180} y={138} textAnchor="start" fontSize="11" fontWeight="700" fill={secondary}>实参→T</text>

            {ROWS.map((r, i) => {
              const y = 154 + i * 70;
              return (
                <g key={r.param}>
                  <rect x={LEFT_X + 14} y={y} width={LEFT_W - 28} height={56} rx="8" fill={r.color} fillOpacity="0.06" stroke={r.color} strokeWidth="1.3" strokeOpacity="0.5" />
                  <text x={LEFT_X + 24} y={y + 24} textAnchor="start" fontSize="11.5" fontWeight="600" fill={primary} fontFamily="monospace">{r.param}</text>
                  <text x={LEFT_X + 24} y={y + 44} textAnchor="start" fontSize="11" fill={secondary} fontFamily="monospace">{r.arg}</text>
                  <text x={LEFT_X + 180} y={y + 34} textAnchor="start" fontSize="12" fontWeight="700" fill={r.color} fontFamily="monospace">{r.result}</text>
                </g>
              );
            })}
          </g>

          {/* 右面板：SFINAE → concepts */}
          <g>
            <rect x={RIGHT_X} y={80} width={RIGHT_W} height={300} rx="10" fill={elevated} stroke={border} strokeWidth="1.4" />
            <rect x={RIGHT_X} y={80} width={RIGHT_W} height={34} rx="10" fill="var(--success)" fillOpacity="0.14" />
            <rect x={RIGHT_X} y={104} width={RIGHT_W} height={10} fill="var(--success)" fillOpacity="0.14" />
            <text x={RIGHT_X + RIGHT_W / 2} y={102} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">
              约束演进
            </text>

            {/* SFINAE */}
            <rect x={RIGHT_X + 14} y={134} width={RIGHT_W - 28} height={100} rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.3" strokeOpacity="0.5" />
            <text x={RIGHT_X + 24} y={156} textAnchor="start" fontSize="12.5" fontWeight="700" fill="var(--warning)">SFINAE（C++11）</text>
            <text x={RIGHT_X + 24} y={178} textAnchor="start" fontSize="11" fill={primary} fontFamily="monospace">enable_if_t&lt;cond&gt;</text>
            <text x={RIGHT_X + 24} y={198} textAnchor="start" fontSize="11" fill={secondary}>替换失败剔除重载</text>
            <text x={RIGHT_X + 24} y={218} textAnchor="start" fontSize="11" fill="var(--danger)">错误信息晦涩</text>

            {/* 向下箭头 */}
            <line x1={RIGHT_X + RIGHT_W / 2} y1={242} x2={RIGHT_X + RIGHT_W / 2} y2={258} stroke={secondary} strokeWidth="1.8" markerEnd="url(#ctr-tmpl-arr)" />

            {/* concepts */}
            <rect x={RIGHT_X + 14} y={266} width={RIGHT_W - 28} height={100} rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.3" strokeOpacity="0.5" />
            <text x={RIGHT_X + 24} y={288} textAnchor="start" fontSize="12.5" fontWeight="700" fill="var(--success)">concepts（C++20）</text>
            <text x={RIGHT_X + 24} y={310} textAnchor="start" fontSize="11" fill={primary} fontFamily="monospace">requires std::integral&lt;T&gt;</text>
            <text x={RIGHT_X + 24} y={330} textAnchor="start" fontSize="11" fill={secondary}>直接表达类型约束</text>
            <text x={RIGHT_X + 24} y={350} textAnchor="start" fontSize="11" fill="var(--success)">错误友好可组合</text>
          </g>

          <defs>
            <marker id="ctr-tmpl-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={408} x2={VIEW_W - 32} y2={408} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={432} textAnchor="middle" fontSize="12" fill={secondary}>
            万能引用靠引用折叠转发左右值 · 新代码优先 concepts 替代 SFINAE
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类型推导三情形（普通引用/万能引用/按值）决定 T 的推导结果；SFINAE 到 C++20 concepts 让类型约束更清晰。
      </figcaption>
    </figure>
  );
}
