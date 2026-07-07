/**
 * <Ec7FinalReviewDiagram>：总复习思维导图（C# 7.0 本质论 收尾章）。
 *
 * 中心节点「C# 7.0 本质论」，四条分支辐射到四角：
 *   - C# 基础（accent 紫）：类型系统、运算符、控制流
 *   - 面向对象（success 绿）：类与对象、继承与接口
 *   - 泛型与委托（warning 暖）：泛型约束、委托与事件
 *   - 高级特性（danger 红）：LINQ、async/await
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

const CX = 360;
const CY = 210;

interface Branch {
  name: string;
  color: string;
  x: number;
  y: number;
  children: { label: string; x: number; y: number }[];
}

const BRANCHES: readonly Branch[] = [
  {
    name: "C# 基础",
    color: accent,
    x: 180,
    y: 110,
    children: [
      { label: "值类型/引用类型", x: 70, y: 70 },
      { label: "var 类型推断", x: 70, y: 100 },
      { label: "运算符优先级", x: 70, y: 130 },
    ],
  },
  {
    name: "面向对象",
    color: success,
    x: 540,
    y: 110,
    children: [
      { label: "封装/属性", x: 650, y: 70 },
      { label: "virtual/override", x: 650, y: 100 },
      { label: "接口多实现", x: 650, y: 130 },
    ],
  },
  {
    name: "泛型与委托",
    color: warning,
    x: 180,
    y: 310,
    children: [
      { label: "where 约束", x: 70, y: 290 },
      { label: "Func/Action", x: 70, y: 320 },
      { label: "event 发布订阅", x: 70, y: 350 },
    ],
  },
  {
    name: "高级特性",
    color: danger,
    x: 540,
    y: 310,
    children: [
      { label: "LINQ 流水线", x: 650, y: 290 },
      { label: "延迟执行", x: 650, y: 320 },
      { label: "async/await", x: 650, y: 350 },
    ],
  },
];

export function Ec7FinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C# 7.0 本质论总复习思维导图。中心节点 C# 7.0 本质论，四条分支辐射：左上 C# 基础（紫色，值类型引用类型、var 类型推断、运算符优先级）；右上面向对象（绿色，封装属性、virtual override、接口多实现）；左下泛型与委托（暖色，where 约束、Func Action、event 发布订阅）；右下高级特性（红色，LINQ 流水线、延迟执行、async await）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={24} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            C# 7.0 本质论 · 总复习
          </text>

          {/* 中心 → 分支 连线 */}
          {BRANCHES.map((b) => (
            <line key={`cb-${b.name}`} x1={CX} y1={CY} x2={b.x} y2={b.y} stroke={b.color} strokeWidth="2.2" strokeOpacity="0.55" />
          ))}

          {/* 分支 → 子节点 连线 + 子节点 */}
          {BRANCHES.map((b) => (
            <g key={`br-${b.name}`}>
              {b.children.map((c) => (
                <line key={`cl-${b.name}-${c.label}`} x1={b.x} y1={b.y} x2={c.x} y2={c.y} stroke={b.color} strokeWidth="1.4" strokeOpacity="0.4" />
              ))}
              {b.children.map((c) => (
                <g key={`cn-${b.name}-${c.label}`}>
                  <rect x={c.x - 58} y={c.y - 12} width="116" height="24" rx="12" fill={elevated} stroke={b.color} strokeWidth="1.4" strokeOpacity="0.6" />
                  <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                    {c.label}
                  </text>
                </g>
              ))}
            </g>
          ))}

          {/* 分支节点 */}
          {BRANCHES.map((b) => (
            <g key={`bn-${b.name}`}>
              <rect x={b.x - 62} y={b.y - 16} width="124" height="32" rx="10" fill={b.color} fillOpacity="0.16" stroke={b.color} strokeWidth="1.8" />
              <text x={b.x} y={b.y + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill={b.color}>
                {b.name}
              </text>
            </g>
          ))}

          {/* 中心节点 */}
          <circle cx={CX} cy={CY} r="62" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="2.4" />
          <text x={CX} y={CY - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            C# 7.0
          </text>
          <text x={CX} y={CY + 8} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            本质论
          </text>
          <text x={CX} y={CY + 26} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
            类型安全
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={390} x2={VIEW_W - 32} y2={390} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={408} textAnchor="middle" fontSize="11" fill={secondary}>
            四大板块一图收束：基础筑底，面向对象建骨，泛型委托强筋，高级特性冲刺
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习思维导图：中心「C# 7.0 本质论」辐射四分支——C# 基础（类型/运算符）、面向对象（封装/继承）、泛型与委托（约束/事件）、高级特性（LINQ/异步）。
      </figcaption>
    </figure>
  );
}
