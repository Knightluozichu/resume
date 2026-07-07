/**
 * <EmcLambdaAnatomyDiagram>：Lambda 表达式结构解剖。
 *
 * 将一条 Lambda 拆成五个组成部件并逐段标注：
 *   [捕获] (参数) mutable -> 返回类型 { 函数体 }
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 440;

interface Part {
  label: string;
  color: string;
  x: number;
  w: number;
  desc: string;
}

const PARTS: readonly Part[] = [
  { label: "[捕获]", color: "var(--accent)", x: 60, w: 100, desc: "值捕获 / 引用捕获；默认捕获 [=]/[&] 谨慎用（条款 31）" },
  { label: "(参数)", color: "var(--success)", x: 168, w: 96, desc: "参数列表；无参时可省略" },
  { label: "mutable", color: "var(--warning)", x: 270, w: 92, desc: "允许修改值捕获的副本；省略则值捕获的副本为 const" },
  { label: "-> 返回", color: "var(--danger)", x: 370, w: 110, desc: "尾随返回类型；可省略，由 return 推导" },
  { label: "{ 函数体 }", color: "var(--accent)", x: 488, w: 170, desc: "实际逻辑；捕获的变量与参数在此使用" },
];

const BAR_Y = 150;
const BAR_H = 48;
const DESC_Y = 220;

export function EmcLambdaAnatomyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lambda 表达式结构解剖。将 Lambda 拆成五段：捕获列表方括号（紫色，值捕获或引用捕获）、参数列表圆括号（绿色）、mutable 关键字（暖色，允许修改值捕获副本）、尾随返回类型（红色，可省略）、函数体大括号（紫色，实际逻辑）。下方列出默认捕获陷阱与 init 捕获建议。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Lambda 表达式结构解剖
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            条款 31-34 · 捕获 · 参数 · 返回 · 函数体
          </text>

          {/* Lambda 整体框 */}
          <rect x={36} y={BAR_Y - 26} width={VIEW_W - 72} height={BAR_H + 52} rx="10" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1.2" />
          <text x={48} y={BAR_Y - 8} fontSize="11" fontWeight="700" fill="var(--text-secondary)" fontFamily="monospace">
            auto f =
          </text>

          {/* 五段 */}
          {PARTS.map((p) => (
            <g key={p.label}>
              <rect x={p.x} y={BAR_Y} width={p.w} height={BAR_H} rx="8" fill={p.color} fillOpacity="0.14" stroke={p.color} strokeWidth="1.6" />
              <text x={p.x + p.w / 2} y={BAR_Y + BAR_H / 2 + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill={p.color} fontFamily="monospace">
                {p.label}
              </text>

              {/* 引导线 + 说明 */}
              <line x1={p.x + p.w / 2} y1={BAR_Y + BAR_H} x2={p.x + p.w / 2} y2={DESC_Y - 8} stroke={p.color} strokeWidth="1.2" strokeOpacity="0.5" />
              <rect x={p.x - 4} y={DESC_Y} width={p.w + 8} height={66} rx="8" fill={p.color} fillOpacity="0.05" stroke={p.color} strokeWidth="1.1" strokeOpacity="0.4" />
              <text x={p.x + p.w / 2} y={DESC_Y + 24} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={p.color}>
                {p.label}
              </text>
              {/* 描述自动换行：分两行 */}
              <text x={p.x + p.w / 2} y={DESC_Y + 42} textAnchor="middle" fontSize="10" fill="var(--text-primary)">
                {p.desc.length > 18 ? p.desc.slice(0, 18) : p.desc}
              </text>
              <text x={p.x + p.w / 2} y={DESC_Y + 56} textAnchor="middle" fontSize="10" fill="var(--text-primary)">
                {p.desc.length > 18 ? p.desc.slice(18, 36) : ""}
              </text>
            </g>
          ))}

          {/* 底部陷阱与建议 */}
          <line x1={32} y1={324} x2={VIEW_W - 32} y2={324} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={48} y={346} fontSize="11.5" fontWeight="700" fill="var(--danger)">
            陷阱（条款 31）
          </text>
          <text x={48} y={366} fontSize="11" fill="var(--text-primary)">
            默认值捕获 [=] 不捕获 this 指针的解引用对象，悬空风险；默认引用捕获 [&] 易捕获局部变量的悬空引用
          </text>
          <text x={48} y={384} fontSize="11" fill="var(--text-primary)">
            捕获只能用于 Lambda 可见的作用域变量；成员变量需通过捕获 this 访问
          </text>
          <text x={48} y={408} fontSize="11.5" fontWeight="700" fill="var(--success)">
            建议（条款 32-34）
          </text>
          <text x={48} y={428} fontSize="11" fill="var(--text-primary)">
            用 init 捕获 [up = std::move(p)] 把对象移入闭包；泛型 Lambda 用 auto&amp;&amp; + decltype(forward)；优先 Lambda 而非 std::bind
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lambda 由捕获列表、参数列表、mutable、尾随返回类型、函数体五段组成。默认捕获模式有悬空风险，优先显式捕获与 init 捕获；优先 Lambda 而非 std::bind。
      </figcaption>
    </figure>
  );
}
