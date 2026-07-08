/**
 * <FlpClosuresDecoratorsDiagram>：装饰器与闭包机制。
 *
 * 展示 @timer 三阶段（定义 → 装饰 → 调用）与 wrapper 作为闭包捕获 func 引用。
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

const STAGES = [
  { x: 36, w: 200, color: accent, title: "① 定义", lines: ["def greet():", "    print('hi')"] },
  { x: 260, w: 200, color: success, title: "② 装饰", lines: ["@timer", "def greet(): ...", "", "≡ greet = timer(greet)"] },
  { x: 484, w: 200, color: warning, title: "③ 调用", lines: ["greet()", "→ 实际执行 wrapper", "  （原函数已被包装）"] },
];

const STAGE_Y = 86;
const STAGE_H = 132;

export function FlpClosuresDecoratorsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="装饰器三阶段：定义函数、用@timer装饰等价于greet=timer(greet)、调用greet实际执行wrapper闭包。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            装饰器 = 接收函数、返回函数的高阶函数
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            @timer 把 greet 换成 wrapper；wrapper 是闭包，捕获原 func 引用
          </text>

          {/* 三阶段 */}
          {STAGES.map((s, i) => (
            <g key={s.title}>
              <rect x={s.x} y={STAGE_Y} width={s.w} height={STAGE_H} rx="10" fill={s.color} fillOpacity="0.06" stroke={s.color} strokeWidth="1.4" strokeOpacity="0.55" />
              <text x={s.x + s.w / 2} y={STAGE_Y + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill={s.color}>
                {s.title}
              </text>
              <line x1={s.x + 12} y1={STAGE_Y + 36} x2={s.x + s.w - 12} y2={STAGE_Y + 36} stroke={border} strokeWidth="1" />
              {s.lines.map((ln, li) => (
                <text key={li} x={s.x + s.w / 2} y={STAGE_Y + 60 + li * 22} textAnchor="middle" fontSize="11" fontWeight={li === s.lines.length - 1 ? "600" : "400"} fill={li === s.lines.length - 1 ? s.color : primary}>
                  {ln || " "}
                </text>
              ))}
              {i < STAGES.length - 1 && (
                <line x1={s.x + s.w + 2} y1={STAGE_Y + STAGE_H / 2} x2={STAGES[i + 1].x - 6} y2={STAGE_Y + STAGE_H / 2} stroke={accent} strokeWidth="1.6" markerEnd="url(#flp-cd-arrow)" />
              )}
            </g>
          ))}

          {/* wrapper 内部结构 */}
          <rect x={120} y={244} width={480} height={92} rx="10" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={360} y={268} textAnchor="middle" fontSize="12" fontWeight="700" fill={secondary}>
            wrapper 内部（闭包，捕获 func 引用）
          </text>
          <text x={160} y={294} fontSize="12" fontWeight="600" fill={accent}>start = time()</text>
          <text x={320} y={294} fontSize="12" fontWeight="600" fill={success}>func()  ← 调用原函数</text>
          <text x={520} y={294} fontSize="12" fontWeight="600" fill={warning}>print(用时)</text>
          <line x1={160} y1={300} x2={180} y2={300} stroke={border} strokeWidth="1" />
          <text x={360} y={320} textAnchor="middle" fontSize="11" fill={secondary}>
            func 是闭包捕获的变量引用，wrapper 不需要它作参数
          </text>

          <defs>
            <marker id="flp-cd-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={356} x2={VIEW_W - 32} y2={356} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={378} textAnchor="middle" fontSize="11" fill={secondary}>
            闭包捕获的是变量而非值——延迟绑定，循环里的闭包要小心「全取最后一个」
          </text>
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill={secondary}>
            functools.wraps 保留原函数元信息（名字、文档），装饰器标配
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        装饰器的三阶段与 wrapper 闭包结构。
      </figcaption>
    </figure>
  );
}
