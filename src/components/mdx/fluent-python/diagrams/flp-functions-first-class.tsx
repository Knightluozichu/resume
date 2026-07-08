/**
 * <FlpFunctionsFirstClassDiagram>：函数作为一等公民的三种能力。
 *
 * 展示函数可被赋值、作为参数传递、作为返回值返回。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const PANELS = [
  {
    x: 36,
    w: 208,
    color: accent,
    title: "赋值给变量",
    code: ["f = len", "f([1, 2, 3])", "→ 3"],
    note: "函数即值，可存变量",
  },
  {
    x: 256,
    w: 208,
    color: success,
    title: "作为参数传递",
    code: ["sorted(words,", "  key=len)", "按词长排序"],
    note: "高阶函数接收函数",
  },
  {
    x: 476,
    w: 208,
    color: warning,
    title: "作为返回值",
    code: ["def adder(n):", "  return lambda x:x+n", "adder(2)(3) → 5"],
    note: "工厂产出新函数",
  },
];

const PANEL_Y = 84;
const PANEL_H = 232;

export function FlpFunctionsFirstClassDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="函数作为一等公民的三种能力：赋值给变量、作为参数传递给高阶函数、作为返回值从工厂函数产出。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            函数是一等公民
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            与 int、str 同等——可赋值、可传参、可返回
          </text>

          {/* 三面板 */}
          {PANELS.map((p) => (
            <g key={p.title}>
              <rect x={p.x} y={PANEL_Y} width={p.w} height={PANEL_H} rx="10" fill={p.color} fillOpacity="0.06" stroke={p.color} strokeWidth="1.4" strokeOpacity="0.5" />
              <text x={p.x + p.w / 2} y={PANEL_Y + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill={p.color}>
                {p.title}
              </text>
              <line x1={p.x + 16} y1={PANEL_Y + 42} x2={p.x + p.w - 16} y2={PANEL_Y + 42} stroke={border} strokeWidth="1" />
              {p.code.map((c, i) => (
                <text key={i} x={p.x + p.w / 2} y={PANEL_Y + 76 + i * 26} textAnchor="middle" fontSize="12" fontWeight={i === p.code.length - 1 ? "700" : "500"} fill={i === p.code.length - 1 ? p.color : primary}>
                  {c}
                </text>
              ))}
              <text x={p.x + p.w / 2} y={PANEL_Y + PANEL_H - 22} textAnchor="middle" fontSize="11" fill={secondary}>
                {p.note}
              </text>
            </g>
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={346} x2={VIEW_W - 32} y2={346} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={368} textAnchor="middle" fontSize="11" fill={secondary}>
            高阶函数（map / sorted / filter）建立在「函数即值」之上，是函数式管道的引擎
          </text>
          <text x={VIEW_W / 2} y={386} textAnchor="middle" fontSize="11" fill={secondary}>
            可调用对象都实现 __call__，函数只是最常见的一种
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数作为一等公民的三种使用方式。
      </figcaption>
    </figure>
  );
}
